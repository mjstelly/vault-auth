# vault-auth — Foundation

## CLAUDE.md (repo root)

Drop this file at the root of the repo before running any prompts.
Claude Code reads it automatically as persistent project context.

```markdown
# vault-auth

Take-home assignment for Vault. Authentication workflow app.

## Stack
- Vite + React + TypeScript (strict mode)
- TanStack Query v5
- React Router v7
- Vercel deployment target

## API
Base: https://dummyjson.com

POST /auth/login
  body: { username: string, password: string, expiresInMins?: number }
  response: { id, username, email, firstName, lastName, image, accessToken, refreshToken }

GET /auth/me
  headers: { Authorization: "Bearer <accessToken>" }
  response: same user shape as login

Test credentials: username "emilys" / password "emilyspass"

## Auth Pattern
- JWT stored in memory (AuthContext), not localStorage
- accessToken passed as Bearer header on authenticated requests
- Unauthenticated users redirected to /login via ProtectedRoute
- Authenticated users redirected away from /login to /dashboard

## Target Folder Structure
src/
  api/
    auth.ts
  context/
    AuthContext.tsx
  hooks/
    useAuth.ts
  pages/
    LoginPage.tsx
    DashboardPage.tsx
  routes/
    ProtectedRoute.tsx
  App.tsx
  main.tsx
```

---

## Prompt 1 — Project init and deps

```
This repo needs Vite + React + TypeScript initialized if not already done.
If package.json exists but Vite is not configured, scaffold it. If it is
already initialized, skip that step.

Install these dependencies:
- react-router-dom
- @tanstack/react-query
- @tanstack/react-query-devtools

Confirm the dev server runs clean with no TypeScript errors before stopping.
```

---

## Prompt 2 — API layer

```
Create src/api/auth.ts.

Define these TypeScript types:
- LoginCredentials: { username: string; password: string; expiresInMins?: number }
- AuthUser: { id: number; username: string; email: string; firstName: string;
  lastName: string; image: string; accessToken: string; refreshToken: string }
- AuthError: { message: string }

Implement these functions using native fetch, no axios:
- login(credentials: LoginCredentials): Promise<AuthUser>
  POST https://dummyjson.com/auth/login
  Throws with the API error message on non-2xx response

- getMe(token: string): Promise<Omit<AuthUser, 'accessToken' | 'refreshToken'>>
  GET https://dummyjson.com/auth/me
  Authorization: Bearer <token>
  Throws with the API error message on non-2xx response

No default exports. Named exports only.
```

---

## Prompt 3 — AuthContext and useAuth

```
Create src/context/AuthContext.tsx.

State held in context:
- user: AuthUser | null
- isAuthenticated: boolean (derived from user !== null)
- isLoading: boolean (true during login call)
- error: string | null

Actions:
- login(credentials: LoginCredentials): Promise<boolean>
  Calls api/auth login, sets user and returns true on success, sets error and returns false on failure
- logout(): void
  Clears user and error
- clearError(): void
  Clears error without affecting user state

Token lives in context only — no localStorage, no sessionStorage.

Create src/hooks/useAuth.ts:
  Exports useAuth() which calls useContext(AuthContext) and throws if
  used outside AuthProvider.

AuthProvider should wrap children and expose the context value.
Named exports only.
```

---

## Prompt 4 — Routing, ProtectedRoute, page stubs, and provider wiring

```
Create src/routes/ProtectedRoute.tsx:
  If isAuthenticated is false, redirect to /login.
  If isAuthenticated is true, render <Outlet />.
  Use useAuth() for auth state.

Create src/pages/LoginPage.tsx:
  Stub only — an <h1> that says "Login" and the text "form goes here".
  If already authenticated, redirect to /dashboard.

Create src/pages/DashboardPage.tsx:
  Stub only — an <h1> that says "Dashboard" and the text "content goes here".

Update src/App.tsx:
  Routes:
    / — redirects to /login
    /login — LoginPage
    /dashboard — protected by ProtectedRoute, renders DashboardPage

Update src/main.tsx:
  Wrap the app in: QueryClientProvider > AuthProvider > BrowserRouter
  Include ReactQueryDevtools in development only.

Confirm no TypeScript errors and the dev server runs clean.
```

---

## Execution order

1. Add `CLAUDE.md` to repo root
2. Run Prompt 1 — init and deps
3. Run Prompt 2 — API layer
4. Run Prompt 3 — AuthContext and useAuth
5. Run Prompt 4 — routing, guards, stubs, provider wiring

After Prompt 4 passes, the foundation is done. The dev server should run clean,
the redirect logic should work end to end, and there should be zero TypeScript
errors. Figma implementation starts after this checkpoint.
