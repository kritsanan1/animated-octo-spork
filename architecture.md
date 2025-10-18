# System Architecture


Below is a Mermaid diagram describing the architecture. You can render it on GitHub or with Mermaid-compatible tools. For a PNG export, paste into https://mermaid.live and export.


```mermaid
flowchart LR
  subgraph FE[Frontend (Expo Router + RN Web)]
    R[Routes\n/splash,/login,/signup,/dashboard,/messages,/upload,/connect,/subscription,/calendar,/comments,/profile,/settings]
    P[Providers\nTRPC Provider, React Query, AppProvider]
    C[UI Components\nButton, Card, PlatformIcon, Spinner, Theme]
  end


  subgraph API[Backend (Hono + tRPC) at /api]
    AR[appRouter]
    subgraph ROU[Routers]
      EX[example.hi]
      AY[ayrshare\ncreatePost,getHistory,getAnalytics,getProfiles,getPost,updatePost,deletePost,generateJWT]
      US[user\ngetProfile,updateProfile]
      PO[posts\ncreate,get,update,delete]
      MS[messages\nget,markAsRead]
      AN[analytics\ngetDashboardStats]
    end
    MW[Middleware\nauth, rate-limit, logging, error-handler]
    CTX[Context\ncreateContext: env, supabase, token]
  end


  subgraph DB[Supabase (Postgres)]
    T[(users, posts, messages, analytics, social_accounts)]
  end


  AYR[Ayrshare API]


  R -->|TRPC| AR
  P --> AR
  C --> R


  AR --> ROU
  ROU --> MW --> CTX


  CTX --> DB
  ROU -->|server fetch| AYR
```


Legend
- FE → API via tRPC over /api/trpc
- API uses Supabase and optionally calls Ayrshare
- Client persistence via AsyncStorage (in AppProvider)


PNG export: Use mermaid.live to render this diagram and export as PNG.

