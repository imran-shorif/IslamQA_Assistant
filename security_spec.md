# Security Specification: IslamQA Assistant Firestore Rules

## 1. Data Invariants
1. **User Profile Ownership**: A user profile document `/users/{userId}` can only be read, created, or updated by the authenticated user whose `request.auth.uid == userId`. Blanket reads and third-party access to PII (email, profile) are strictly forbidden.
2. **User History Isolation**: A history document `/users/{userId}/history/{historyId}` can only be read, created, or deleted by the user whose `request.auth.uid == userId` and whose `userId` field inside the document matches `request.auth.uid`.
3. **Immutability of Identity & Timestamps**: The `uid` and `createdAt` fields in `/users/{userId}` and `userId`, `id`, and `createdAt` in `/users/{userId}/history/{historyId}` cannot be changed upon update.
4. **Temporal Server Timestamps**: `createdAt` must strictly equal `request.time` on create. `updatedAt` must equal `request.time` on update.
5. **Path ID Hardening**: Document IDs `userId`, `historyId`, `statId`, and `sessionId` must be valid safe alphanumeric identifiers (`^[a-zA-Z0-9_\-]+$` up to 128 characters).
6. **Site Stats Counter Integrity & Public Read**: The public statistics document `/stats/site_stats` can be read via single document `get` by any visitor (to display lifetime visitor count on the homepage). Listing the `/stats` collection is strictly forbidden (`allow list: if false`).
7. **Site Stats Monotonicity & Anti-Tampering**: On `create` or `update`, incoming payloads must strictly match `totalVisitors` (non-negative number) and `updatedAt == request.time`. Updates must be strictly non-decreasing (`incoming().totalVisitors >= existing().totalVisitors`) with no extra/shadow fields. Deletion of stats is strictly forbidden (`allow delete: if false`).
8. **Active Session Presence & Anti-Tampering**: Heartbeats at `/active_sessions/{sessionId}` can be created or updated by visitors to report active status. `lastSeen` must strictly equal `request.time`. Incoming sessionId must match the path ID `sessionId`. Extraneous schema keys are rejected. Deletion is permitted so visitors can cleanly unregister upon leaving.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Read on Profile**: User without auth attempts `get /users/user123` -> Rejected.
2. **Unauthenticated Read on History**: User without auth attempts `list /users/user123/history` -> Rejected.
3. **Cross-User Profile Read**: User `alice` attempts `get /users/bob` -> Rejected.
4. **Cross-User History Write**: User `alice` attempts `create /users/bob/history/h1` -> Rejected.
5. **Spoofed User History Payload**: User `alice` writes to `/users/alice/history/h1` with `userId: "bob"` -> Rejected.
6. **Path Injection / Junk ID**: Attacker attempts document ID with malicious characters or oversized length -> Rejected.
7. **Oversized String Injection (Denial of Wallet)**: Client attempts sending a 1MB summary string in history -> Rejected.
8. **Client Fake Timestamp**: Client creates profile with client-generated `createdAt` instead of `request.time` -> Rejected.
9. **Identity Mutation on Update**: User `alice` attempts `update /users/alice` changing `uid` to `bob` -> Rejected.
10. **Ghost Field Injection (Shadow Update)**: User attempts adding unapproved field `isAdmin: true` -> Rejected.
11. **History Update Prohibition**: History items are append-only / delete-only records; update attempts are rejected -> Rejected.
12. **Blanket Query Scraping on Users**: Client queries `/users` collection without scoping -> Rejected by rules.
13. **Stats Decrement / Reset Attack**: Malicious client attempts updating `/stats/site_stats` with a decremented count or negative number -> Rejected.
14. **Stats Ghost Fields / Denial-of-Wallet Attack**: Malicious client attempts injecting junk fields into `/stats/site_stats` -> Rejected.
15. **Active Session Fake Timestamp**: Client attempts writing active session with a spoofed timestamp instead of `request.time` -> Rejected.
16. **Active Session ID Mismatch**: Client writes document at `/active_sessions/sessionA` with `sessionId: "sessionB"` -> Rejected.
