import { useEffect, useState } from "react";
import {
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  onSnapshot,
  collection,
  deleteDoc,
  handleFirestoreError,
  OperationType,
} from "./firebase";
import { getTimezoneFallbackCity } from "./geoUtils";

const STATS_DOC_PATH = "stats/site_stats";
const SESSIONS_COLLECTION_PATH = "active_sessions";
const SESSION_VISIT_KEY = "islamqa_session_visited_v1";
const SESSION_ID_KEY = "islamqa_active_session_id_v1";

/**
 * Helper to get or create a stable session ID for this browser tab/session
 */
export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "default_session";
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Format a number using Bengali or English numerals
 */
export function formatVisitorCount(count: number, language: "bn" | "en" = "bn"): string {
  if (language === "bn") {
    return count.toLocaleString("bn-BD");
  }
  return count.toLocaleString("en-US");
}

/**
 * Record a unique visitor session in Firestore for lifetime count
 */
export async function recordVisitorSession(): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const hasVisitedThisSession = sessionStorage.getItem(SESSION_VISIT_KEY);
    if (hasVisitedThisSession) {
      // Already counted for this browser session
      return;
    }

    sessionStorage.setItem(SESSION_VISIT_KEY, "true");
    const statsDocRef = doc(db, "stats", "site_stats");

    // Fetch existing document to check if initialization is required
    let docSnap;
    try {
      docSnap = await getDoc(statsDocRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, STATS_DOC_PATH);
    }

    if (!docSnap || !docSnap.exists()) {
      try {
        await setDoc(statsDocRef, {
          totalVisitors: 1,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, STATS_DOC_PATH);
      }
    } else {
      try {
        await updateDoc(statsDocRef, {
          totalVisitors: increment(1),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, STATS_DOC_PATH);
      }
    }
  } catch (error) {
    // Non-blocking log so that network blips don't crash the homepage
    console.warn("Could not increment lifetime visitor counter:", error);
  }
}

/**
 * React hook to subscribe to both Live Active visitors and Lifetime Total visitors in real time
 */
export function useVisitorStats(language: "bn" | "en" = "bn") {
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);
  const [liveCount, setLiveCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Record lifetime visit once per session
    recordVisitorSession();

    const sessionId = getOrCreateSessionId();
    const sessionDocRef = doc(db, "active_sessions", sessionId);
    const initialCity = getTimezoneFallbackCity();

    // 2. Register active presence in Firestore
    const registerPresence = async () => {
      try {
        await setDoc(sessionDocRef, {
          sessionId,
          city: initialCity,
          lastSeen: serverTimestamp(),
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        try {
          handleFirestoreError(err, OperationType.CREATE, `${SESSIONS_COLLECTION_PATH}/${sessionId}`);
        } catch {
          // Ignore presence write errors in offline mode
        }
      }
    };
    registerPresence();

    // 3. Heartbeat update every 25 seconds
    const heartbeatInterval = setInterval(async () => {
      try {
        await updateDoc(sessionDocRef, {
          lastSeen: serverTimestamp(),
        });
      } catch {
        // Retry with setDoc if doc was removed
        registerPresence();
      }
    }, 25000);

    // 4. Update presence on visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateDoc(sessionDocRef, {
          lastSeen: serverTimestamp(),
        }).catch(() => registerPresence());
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 5. Clean up presence on window unload or unmount
    const cleanupPresence = () => {
      try {
        deleteDoc(sessionDocRef).catch(() => {});
      } catch {
        // no-op
      }
    };
    window.addEventListener("beforeunload", cleanupPresence);

    // 6. Realtime subscription to lifetime stats
    const statsDocRef = doc(db, "stats", "site_stats");
    const unsubscribeStats = onSnapshot(
      statsDocRef,
      (snapshot) => {
        setIsLoading(false);
        if (snapshot.exists()) {
          const data = snapshot.data();
          const count = typeof data?.totalVisitors === "number" ? data.totalVisitors : 1;
          setTotalVisitors(count);
        } else {
          setTotalVisitors(1);
        }
      },
      (error) => {
        setIsLoading(false);
        try {
          handleFirestoreError(error, OperationType.GET, STATS_DOC_PATH);
        } catch (e) {
          console.warn("Firestore error in stats snapshot listener:", e);
        }
      }
    );

    // 7. Realtime subscription to active sessions collection for Live Count
    const activeSessionsCol = collection(db, "active_sessions");
    const unsubscribeSessions = onSnapshot(
      activeSessionsCol,
      (snapshot) => {
        const now = Date.now();
        const activeThresholdMs = 2 * 60 * 1000; // active within last 2 minutes
        let count = 0;

        snapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data();
          const lastSeenDate = data?.lastSeen?.toDate ? data.lastSeen.toDate() : null;
          if (!lastSeenDate) {
            // Document recently written with pending server timestamp
            count++;
          } else {
            const ageMs = now - lastSeenDate.getTime();
            if (ageMs <= activeThresholdMs) {
              count++;
            }
          }
        });

        // Always show at least 1 (the current user viewing the page)
        setLiveCount(Math.max(1, count));
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, SESSIONS_COLLECTION_PATH);
        } catch (e) {
          console.warn("Firestore error in active sessions snapshot listener:", e);
        }
        // Fallback to 1
        setLiveCount(1);
      }
    );

    return () => {
      clearInterval(heartbeatInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", cleanupPresence);
      unsubscribeStats();
      unsubscribeSessions();
      cleanupPresence();
    };
  }, []);

  const formattedTotal =
    totalVisitors !== null ? formatVisitorCount(totalVisitors, language) : "";
  const formattedLive = formatVisitorCount(liveCount, language);

  return {
    totalVisitors,
    liveCount,
    formattedTotal,
    formattedLive,
    isLoading,
  };
}
