# vault-auth

Authentication workflow built with Vite, React, and TypeScript, consuming
DummyJSON as a real auth backend. Implements four screens from the Wireframes
Kit — Sign In, Forgot Password, Sign Up, and a protected Dashboard — with
login state in React context and TanStack Query handling all data fetching,
loading, and error states.

## Stack

- Vite + React + TypeScript
- TanStack Query v5
- React Router v7
- Deployed on Vercel

## Running locally

```bash
npm install
npm run dev
```

## Screens

- `/login` — Sign in against DummyJSON `/auth/login`
- `/forgot-password` — Email submission with simulated async success state
- `/signup` — Registration via DummyJSON `/users/add`
- `/dashboard` — JWT-gated view with authenticated user profile and products

## Decisions

**Auth is real, not faked.** DummyJSON exposes `/auth/login`, `/auth/me`,
and `/auth/products` — a complete token-based auth cycle. The token is held in React context only and passed as a Bearer header on every
authenticated request. The dashboard is genuinely gated: hitting `/dashboard`
without a token redirects to `/login`.

**TanStack Query for data fetching.** Loading, error, and stale states are
managed declaratively rather than with manually tracked booleans. The
dashboard renders animated skeleton bars while the profile loads and a
6-card skeleton grid while products load. Each error state is surfaced
inline — the products error includes a Retry button that calls `refetch()`.
Using TanStack Query made these states first-class rather than something
wired by hand with `useEffect` and `useState`.

**Signup redirects to login, not the dashboard.** DummyJSON's `/users/add`
returns a user object with no access token. Faking a session after signup
would misrepresent the auth state. Redirecting to `/login` with a success
banner is the correct real-world pattern for registration flows.

**Forgot password is simulated.** No DummyJSON endpoint exists for password
reset. The screen runs a short async delay and renders a deliberately vague
success state — standard security practice for reset flows regardless of
whether the submitted email is registered.

**Social login buttons are rendered, not wired.** Google and Apple buttons
appear per the Figma design. DummyJSON has no OAuth endpoints. An inline
message on click communicates this rather than hiding the buttons or
silently failing.

**Login - 1 was chosen over the card-centered Login - 3 variant.** The kit
includes a second login screen ("Welcome Back") that implies an established
relationship with a returning user — smaller social options, a Twitter button
added, the form as the clear primary path. Login - 1 is the acquisition
context: a user who may not have an account yet, social options at full
prominence, a sign-up link at the bottom. Login - 1 better fits a demo
where no prior relationship exists.

**Design tokens from Figma inspect.** The source is an IBM Carbon-influenced
wireframe kit. Two rules enforced throughout: bottom-border-only inputs
(never a full box border) and zero border-radius on every element. Both are
defined in `tokens.css` as CSS custom properties so no browser defaults or
resets can override them.

## What I'd add with more time

- Token refresh via `/auth/refresh` before expiry
- Client-side validation before submit (required fields, email format,
  password minimum length)
- Accessible error announcements via `aria-live` regions
- E2E coverage with Playwright for all three flows
