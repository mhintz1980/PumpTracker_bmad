# Security & Authentication

## Authentication Flow

1. Unauthenticated visit triggers middleware redirect to **/login**.
2. User selects “Login with Google”.
3. **Firebase Auth** handles OAuth popup/redirect.
4. On success the client receives a JWT; SDK auto‑refreshes tokens.
5. A matching `users` document is created if absent.
6. The client attaches the ID token with each **Server Action** invocation.

## Authorization (RBAC)

- **Server Actions** read the caller’s `UserProfile` to verify role before mutations.
- **Firestore Security Rules** enforce least privilege at the database level.
- **middleware.ts** protects routes based on auth state and role.

