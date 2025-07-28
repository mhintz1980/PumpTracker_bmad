# Unified Project Structure

```plaintext
/
├── src/
│   ├── app/
│   │   ├── (auth)/               # Auth routes
│   │   ├── (main)/               # Protected app routes
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx      # Main dashboard
│   │   │   └── layout.tsx
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Root page (redirect logic)
│   ├── components/
│   │   ├── ui/                   # ShadCN primitives
│   │   └── dashboard/            # Feature components
│   ├── lib/
│   │   ├── actions/              # Server Actions (jobActions.ts etc.)
│   │   ├── firebase/             # Firebase client/admin SDK
│   │   ├── genkit/               # Genkit flows
│   │   └── types/                # Shared interfaces
│   └── middleware.ts             # Auth & RBAC
├── .env.local                    # Env vars
├── next.config.mjs
└── tsconfig.json
```

---
