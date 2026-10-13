# Security Specification: IslamQA Assistant Firestore Rules

## 1. Data Invariants
1. **User Profile Ownership**: A user profile document `/users/{userId}` can only be read, created, or updated by the authenticated user whose `request.auth.uid == userId`. Blanket reads and third-party access to PII (email, profile) are strictly forbidden.
2. **User History Isolation**: A history document `/users/{userId}/history/{historyId}` can only be read, created, or deleted by the user whose `request.auth.uid == userId` and whose `userId` field inside the document matches `request.auth.uid`.
3. **Immutability of Identity & Timestamps**: The `uid` and `createdAt` fields in `/users/{userId}` and `userId`, `id`, and `createdAt` in `/users/{userId}/history/{historyId}` cannot be changed upon update.
4. **Temporal Server Timestamps**: `createdAt` must strictly equal `request.time` on create. `updatedAt` must equal `request.time` on update.
5. **Path ID Hardening**: Document IDs `userId` and `historyId` must be valid safe alphanumeric identifiers (`^[a-zA-Z0-9_\\-]+$` up to 128 characters).

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
12. **Blanket Query Scraping**: Client queries `/users` collection without scoping to `uid` -> Rejected by default catch-all deny.
