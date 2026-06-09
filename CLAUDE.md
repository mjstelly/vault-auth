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
