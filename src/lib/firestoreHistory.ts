import {
  db,
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  serverTimestamp,
  handleFirestoreError,
  OperationType,
} from "./firebase";
import { ChatHistoryItem } from "../types";

export async function saveHistoryItemToFirestore(
  userId: string,
  item: ChatHistoryItem,
  lang: string = "bn"
): Promise<void> {
  if (!userId || !item?.id) return;
  const path = `users/${userId}/history/${item.id}`;
  try {
    const docRef = doc(db, "users", userId, "history", item.id);
    await setDoc(docRef, {
      id: item.id,
      userId: userId,
      question: item.question.slice(0, 1000),
      summary: (item.answer || "").slice(0, 5000),
      language: lang.slice(0, 10),
      timestamp: item.timestamp || Date.now(),
      sourcesCount: item.sources?.length || 0,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function fetchUserHistoryFromFirestore(
  userId: string
): Promise<ChatHistoryItem[]> {
  if (!userId) return [];
  const path = `users/${userId}/history`;
  try {
    const colRef = collection(db, "users", userId, "history");
    const snapshot = await getDocs(colRef);
    const items: ChatHistoryItem[] = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: data.id || docSnap.id,
        question: data.question || "",
        answer: data.summary || "",
        sources: [],
        timestamp: data.timestamp || Date.now(),
      });
    });

    // Sort by timestamp descending
    return items.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function deleteHistoryItemFromFirestore(
  userId: string,
  itemId: string
): Promise<void> {
  if (!userId || !itemId) return;
  const path = `users/${userId}/history/${itemId}`;
  try {
    const docRef = doc(db, "users", userId, "history", itemId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function clearUserHistoryFromFirestore(
  userId: string,
  itemIds: string[]
): Promise<void> {
  if (!userId || !itemIds.length) return;
  const path = `users/${userId}/history`;
  try {
    await Promise.all(
      itemIds.map((id) => deleteDoc(doc(db, "users", userId, "history", id)))
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
