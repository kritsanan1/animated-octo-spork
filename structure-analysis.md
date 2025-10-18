# Structure Analysis


## Current Organization
- Routing: Expo Router with a root stack and a 5-tab layout under app/(tabs).
- State: React Query provider present, but most data is local via contexts/AppContext with AsyncStorage and mock data.
- Backend: Hono server + tRPC under backend/, with Supabase used when env is provided. Routes grouped by domain.
- UI: Components under components/; theme and tokens under constants/theme.ts; translations under constants/i18n.ts.
- Services: Ayrshare REST client in services/.


Strengths
- Clear separation of frontend routes and backend API.
- tRPC strongly typed boundary and superjson configured.
- Modular TRPC routes by feature area.
- Theming and i18n already centralized.


Gaps
- Mixed concerns in AppContext: persistence, mock data, and domain logic combined.
- Some legacy constants (constants/colors.ts) are redundant with theme.ts.
- Limited testing hooks (no test ids, limited error boundaries).
- Web-specific fallbacks not consistently applied where native-only APIs might be added later.


## Recommended Organization (Feature-based)


Feature-first structure:


```
app/
  (tabs)/
    dashboard/
      index.tsx
      components/
      hooks/
    messages/
      index.tsx
      components/
      hooks/
    upload/
      index.tsx
    connect/
      index.tsx
    subscription/
      index.tsx
  auth/
    login.tsx
    signup.tsx
  profile/
    index.tsx
  settings/
    index.tsx
  calendar/
    index.tsx


features/
  posts/
    api/ (trpc hooks wrappers)
    components/
    hooks/
    types.ts
  messages/
  analytics/
  social/


providers/
  app/ (context broken down: user, preferences, ui)

