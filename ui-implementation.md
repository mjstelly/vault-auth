# vault-auth — UI Implementation

Picks up after the foundation is committed. Dev server runs clean,
redirect logic works, TypeScript has zero errors.

---

## Prompt 5 — Design tokens

```
Create src/styles/tokens.css with these exact CSS custom properties:

:root {
  /* Color */
  --color-primary:        #0F62FE;
  --color-primary-dark:   #001D6C;
  --color-text-primary:   #21272A;
  --color-text-muted:     #697077;
  --color-input-bg:       #F2F4F8;
  --color-input-border:   #C1C7CD;
  --color-separator:      #DDE1E6;
  --color-checkbox-border:#121619;
  --color-page-bg:        #F2F4F8;
  --color-white:          #FFFFFF;
  --color-error:          #DA1E28;

  /* Typography scale */
  --font-family:           'Roboto', sans-serif;
  --text-heading-size:     42px;
  --text-heading-weight:   700;
  --text-heading-lh:       110%;
  --text-paragraph-size:   18px;
  --text-button-size:      16px;
  --text-button-weight:    500;
  --text-button-ls:        0.5px;
  --text-label-size:       14px;
  --text-label-weight:     400;
  --text-body-size:        16px;
  --text-description-size: 12px;

  /* Spacing */
  --content-padding: 80px;
  --section-gap:     48px;
  --form-gap:        16px;
  --field-gap:       8px;

  /* Components */
  --input-height:   48px;
  --input-padding:  12px 16px;
  --button-height:  48px;
  --button-padding: 16px 12px;
  --border-radius:  0px;
}

Add a Google Fonts import for Roboto (weights 400, 500, 700) at the top
of tokens.css:
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

Import tokens.css into src/main.tsx so it's globally available.

Add a global CSS reset in src/styles/tokens.css:
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font-family); color: var(--color-text-primary); }
```

---

## Prompt 6 — Expand routing

```
Update src/App.tsx to add two new public routes:
  /forgot-password — ForgotPasswordPage
  /signup          — SignupPage

Create src/pages/ForgotPasswordPage.tsx:
  Stub only — <h1>Forgot Password</h1> and "form goes here".

Create src/pages/SignupPage.tsx:
  Stub only — <h1>Sign Up</h1> and "form goes here".

Full route map after this change:
  /                  → redirect to /login
  /login             → LoginPage (public)
  /forgot-password   → ForgotPasswordPage (public)
  /signup            → SignupPage (public)
  /dashboard         → DashboardPage (protected by ProtectedRoute)

Confirm dev server runs clean with no TypeScript errors.
```

---

## Prompt 7 — LoginPage UI

```
Replace the LoginPage stub with full static markup.
All styles in LoginPage.module.css colocated with the page file.
No logic yet — static markup only.

Layout:
- Full viewport height, flex row
- Left column: 50% width, full height, background #DDE1E6,
  centered placeholder text "Image" in var(--color-text-muted)
- Right column: 50% width, padding var(--content-padding),
  flex column, gap var(--section-gap), justify-content center

Right column sections:

Section 1 — Headline:
  <h1> "Sign In"
  font-size var(--text-heading-size), font-weight var(--text-heading-weight),
  line-height var(--text-heading-lh), color var(--color-text-primary)

Section 2 — Form (flex column, gap var(--form-gap), width 100%):

  Username field:
    Label "Username": font-size var(--text-label-size),
      color var(--color-text-primary)
    Input: height var(--input-height), padding var(--input-padding),
      width 100%, background var(--color-input-bg),
      border: none, border-bottom: 1px solid var(--color-input-border),
      border-radius: var(--border-radius),
      font-size var(--text-body-size), color var(--color-text-muted),
      placeholder "Username"

  Password field:
    Label "Password": same as username label
    Input: same styles, type="password", placeholder "Password"

  Checkbox row (flex row, justify-content space-between, align-items center):
    Left side: checkbox (16x16, border 1px solid var(--color-checkbox-border),
      border-radius 0, appearance none) + label "Remember me"
      (font-size var(--text-label-size), color var(--color-text-primary))
      wrapped in flex row with gap 8px
    Right side: <a> "Forgot password?" — React Router Link to /forgot-password,
      color var(--color-primary-dark), font-size var(--text-label-size),
      text-decoration none

  Primary button:
    type="submit", full width, height var(--button-height),
    padding var(--button-padding), background var(--color-primary),
    border: 2px solid var(--color-primary), border-radius var(--border-radius),
    color var(--color-white), font-size var(--text-button-size),
    font-weight var(--text-button-weight), letter-spacing var(--text-button-ls),
    cursor pointer
    Text: "Sign In"

  Social buttons row (flex row, gap 16px):
    Two equal-width buttons (flex: 1 each)
    Both: height var(--button-height), border: 2px solid var(--color-primary),
      background transparent, border-radius var(--border-radius),
      color var(--color-primary), font-size var(--text-button-size),
      font-weight var(--text-button-weight), letter-spacing var(--text-button-ls),
      cursor pointer
    Left: "Continue with Google"
    Right: "Continue with Apple"

  Separator: <hr>, border: none,
    border-top: 1px solid var(--color-separator), width 100%, margin 0

  Sign up line:
    React Router Link to /signup, text "No account yet? Sign Up"
    font-size var(--text-label-size), color var(--color-primary-dark),
    text-decoration none

CRITICAL — enforce these rules from the Figma design:
- border-bottom only on inputs, never a full box border
- border-radius is 0 on every element — inputs, buttons, checkboxes
- No component library styles may override these
```

---

## Prompt 8 — ForgotPasswordPage UI and logic

```
Replace the ForgotPasswordPage stub with full UI and form logic.
All styles in ForgotPasswordPage.module.css.

Layout:
- Full viewport, background var(--color-page-bg) (#F2F4F8)
- Centered card: width 680px, padding 80px,
  background var(--color-white), border: 1px solid var(--color-separator),
  flex column, align-items center, gap 24px

Card contents:

Section 1 — Headline block (flex column, align-items center, gap 8px):
  <h1> "Forgot Password?"
  font-size var(--text-heading-size), font-weight var(--text-heading-weight),
  line-height var(--text-heading-lh), color var(--color-text-primary),
  text-align center

  <p> "Enter your email address and we'll send you a link to reset
  your password."
  font-size var(--text-paragraph-size), font-weight 400, line-height 140%,
  color var(--color-text-primary), text-align center

Section 2 — Form (flex column, gap var(--form-gap), width 100%,
  padding-top 24px):

  Email field:
    Label "Email": font-size var(--text-label-size),
      color var(--color-text-primary)
    Input type="email": height var(--input-height),
      padding var(--input-padding), width 100%,
      background var(--color-input-bg),
      border: none, border-bottom: 1px solid var(--color-input-border),
      border-radius var(--border-radius),
      font-size var(--text-body-size), color var(--color-text-muted),
      placeholder "Email address"

  Primary button:
    Full width, height var(--button-height), padding var(--button-padding),
    background var(--color-primary), border: 2px solid var(--color-primary),
    border-radius var(--border-radius), color var(--color-white),
    font-size var(--text-button-size), font-weight var(--text-button-weight),
    letter-spacing var(--text-button-ls), cursor pointer
    Text: "Reset Password"

  Back link:
    React Router Link to /login, text "Back to Sign In"
    font-size var(--text-label-size), color var(--color-primary-dark),
    text-decoration none, text-align center, width 100%, display block

Form logic (useState):
- email: string
- isSubmitting: boolean
- isSubmitted: boolean

On submit:
  If email is empty: show inline error "Please enter your email address"
    below the input, color var(--color-error),
    font-size var(--text-description-size)
  If email is not empty:
    Set isSubmitting true
    Simulate a 1000ms async delay (setTimeout in a Promise)
    Set isSubmitted true, isSubmitting false

When isSubmitted is true:
  Replace the form entirely with a success message inside the card:
  <p> "If an account exists for {email}, you'll receive a reset
  link shortly."
  font-size var(--text-paragraph-size), text-align center,
  color var(--color-text-primary)
  Below it: React Router Link to /login, "Back to Sign In",
  same link styles as above

Button behavior while isSubmitting:
  disabled, text "Sending...", opacity 0.7

CRITICAL: border-radius 0 everywhere, border-bottom only on input.
```

---

## Prompt 9 — SignupPage UI

```
Replace the SignupPage stub with full static markup.
All styles in SignupPage.module.css.
No logic yet — static markup only.

Layout: identical two-column structure as LoginPage.
- Left column: 50% width, full height, background #DDE1E6,
  centered placeholder text "Image" in var(--color-text-muted)
- Right column: 50% width, padding var(--content-padding),
  flex column, gap var(--section-gap), justify-content center

Right column sections:

Section 1 — Headline:
  <h1> "Sign Up"
  font-size var(--text-heading-size), font-weight var(--text-heading-weight),
  line-height var(--text-heading-lh), color var(--color-text-primary)

Section 2 — Form (flex column, gap var(--form-gap), width 100%):

  Name row (flex row, gap 16px, width 100%):
    First Name field (flex: 1):
      Label "First Name": font-size var(--text-label-size),
        color var(--color-text-primary)
      Input: height var(--input-height), padding var(--input-padding),
        width 100%, background var(--color-input-bg),
        border: none, border-bottom: 1px solid var(--color-input-border),
        border-radius var(--border-radius),
        font-size var(--text-body-size), color var(--color-text-muted),
        placeholder "First name"
    Last Name field (flex: 1): same structure, placeholder "Last name"

  Email field (full width):
    Label "Email": same label styles
    Input type="email": same input styles, placeholder "Email address"

  Password field (full width):
    Label "Password": same label styles
    Input type="password": same input styles, placeholder "Password"

  Checkbox row (flex row, align-items center, gap 8px):
    Checkbox: 16x16, border 1px solid var(--color-checkbox-border),
      border-radius 0, appearance none
    Label "I agree to the terms and conditions":
      font-size var(--text-label-size), color var(--color-text-primary)

  Primary button:
    Full width, height var(--button-height), padding var(--button-padding),
    background var(--color-primary), border: 2px solid var(--color-primary),
    border-radius var(--border-radius), color var(--color-white),
    font-size var(--text-button-size), font-weight var(--text-button-weight),
    letter-spacing var(--text-button-ls), cursor pointer
    Text: "Sign Up"

  Social buttons row (flex row, gap 16px): identical to LoginPage
    Left: "Continue with Google"
    Right: "Continue with Apple"

  Separator: <hr>, border: none,
    border-top: 1px solid var(--color-separator), width 100%, margin 0

  Sign in line:
    React Router Link to /login, text "Already have an account? Sign In"
    font-size var(--text-label-size), color var(--color-primary-dark),
    text-decoration none

CRITICAL: border-radius 0 everywhere, border-bottom only on all inputs.
```

---

## Prompt 10 — Wire LoginPage to AuthContext

```
Update LoginPage to connect the form to the auth layer.

Form state (useState):
- username: string
- password: string
- isSubmitting: boolean

On submit:
- Set isSubmitting true
- Call login({ username, password }) from useAuth()
- On success: navigate to /dashboard
- On failure: display error string from AuthContext below the primary
  button — font-size var(--text-description-size), color var(--color-error)
- Set isSubmitting false in both cases

If location.state?.signupSuccess is true (passed from SignupPage on
successful registration), show a success banner above the form:
  "Account created successfully. Sign in to continue."
  background var(--color-input-bg), padding 12px 16px,
  font-size var(--text-label-size), color var(--color-text-primary)
  border-left: 3px solid var(--color-primary)

Button while isSubmitting:
  disabled, text "Signing in...", opacity 0.7

Social buttons: not wired. On click show inline message below social row:
  "Social login not available in this demo"
  font-size var(--text-description-size), color var(--color-text-muted)

Clear AuthContext error on any input change.

Confirm: "emilys" / "emilyspass" redirects to /dashboard.
Bad credentials surface the DummyJSON error message.
```

---

## Prompt 11 — Wire SignupPage to DummyJSON

```
Update SignupPage to connect the form to DummyJSON /users/add.

Form state (useState):
- firstName: string
- lastName: string
- email: string
- password: string
- isSubmitting: boolean
- error: string | null

On submit:
- Validate client-side: all four fields must be non-empty.
  If any are empty, set error "All fields are required." and stop.
- Set isSubmitting true, error null
- POST to https://dummyjson.com/users/add with body:
  { firstName, lastName, email, password, username: email }
  Content-Type: application/json
- On success (2xx): navigate to /login with state { signupSuccess: true }
- On failure: parse the error message from the response body and set error
- Set isSubmitting false in both cases

Display error below the primary button:
  font-size var(--text-description-size), color var(--color-error)

Button while isSubmitting:
  disabled, text "Creating account...", opacity 0.7

Social buttons: same as LoginPage — not wired, show inline demo message
on click.

Confirm: submitting valid data navigates to /login and the success
banner appears. Empty field submission shows the validation error.
```

---

## Prompt 12 — Dashboard with authenticated data

```
Replace the DashboardPage stub with a real authenticated view.

Layout: full page, background var(--color-white), padding 48px,
flex column, gap 32px.

Section 1 — Header bar (flex row, justify-content space-between,
  align-items center):
  Left: "Dashboard" — font-size 24px, font-weight 700,
    color var(--color-text-primary)
  Right: "Sign Out" button — border: 2px solid var(--color-primary),
    background transparent, color var(--color-primary),
    padding 8px 16px, border-radius 0,
    font-size var(--text-label-size), cursor pointer
    On click: call logout() from useAuth(), navigate to /login

Section 2 — User profile card (flex row, align-items center, gap 16px,
  padding 24px, background var(--color-input-bg)):
  Fetch GET https://dummyjson.com/auth/me with TanStack Query (useQuery).
  Pass accessToken from AuthContext user object as Authorization: Bearer header.

  Loading state: three skeleton bars —
    height 16px, background #DDE1E6, border-radius 0,
    opacity pulse animation (keyframes 0.5s ease-in-out alternate infinite)
  Error state: "Failed to load profile. Try signing out and back in."
    color var(--color-error)
  Success state:
    <img> src={user.image} alt={user.username}
      width 64, height 64, border-radius 50%
      (avatar is the one exception to zero border-radius)
    Flex column: "{firstName} {lastName}" font-weight 700,
      email below in color var(--color-text-muted),
      font-size var(--text-label-size)

Section 3 — Products grid:
  Fetch GET https://dummyjson.com/auth/products?limit=6 with TanStack Query.
  Authorization: Bearer <accessToken>.

  Label "Products": font-size 18px, font-weight 700,
    color var(--color-text-primary), margin-bottom 16px

  Loading state: 6 skeleton cards — same pulse animation as above,
    height 120px, background #DDE1E6, border-radius 0
  Error state: "Failed to load products." + Retry button that calls refetch()
    Retry: border: 1px solid var(--color-primary), background transparent,
      color var(--color-primary), padding 6px 12px, border-radius 0,
      cursor pointer
  Success state: CSS grid, 3 columns, gap 16px
    Each card: padding 16px, border: 1px solid var(--color-separator),
      border-radius 0, flex column, gap 8px
      - product.title: font-weight 500, font-size var(--text-body-size)
      - product.category: font-size var(--text-description-size),
        color var(--color-text-muted)
      - "$" + product.price: font-weight 700, color var(--color-primary)

Confirm: signing in redirects here, both fetches load successfully,
sign out returns to /login.
```

---

## Prompt 13 — README and final checks

```
Before writing the README, do a final sweep:

1. Confirm every input across all pages has border-bottom only
2. Confirm border-radius is 0 on all inputs, buttons, cards, checkboxes
3. Confirm Roboto loads from Google Fonts
4. Confirm no TypeScript errors
5. Confirm full flow:
   /login → /dashboard → sign out → /login
   /login → /forgot-password → submit → success state → /login
   /login → /signup → submit → /login with success banner

Then create README.md at the repo root:

## vault-auth

One paragraph: what this is and what it demonstrates.

## Stack
- Vite + React + TypeScript
- TanStack Query v5
- React Router v6
- Deployed on Vercel: [live link]

## Running locally
npm install
npm run dev

## Screens
- /login — Sign in with DummyJSON credentials
- /forgot-password — Email submission with simulated success state
- /signup — Registration wired to DummyJSON /users/add
- /dashboard — Authenticated view, gated behind real JWT

## Decisions

1. Framework: Vite + React + TS — standard web React, zero-friction
   Vercel deploy, native CSS for pixel-accurate Figma fidelity.

2. Auth approach: DummyJSON /auth/login returns a real JWT. Token
   lives in React context only — not localStorage. /auth/me and
   /auth/products are fetched with the Bearer token, making the
   dashboard a genuinely gated view, not a fake one.

3. Data fetching: TanStack Query manages loading, error, and stale
   states declaratively. The assignment grades data-fetching and UI
   state explicitly — this makes those states first-class rather than
   manually managed booleans.

4. Forgot password: no DummyJSON endpoint exists for this. The screen
   simulates a 1-second async operation and renders an inline success
   state. Deliberately vague response copy matches real-world security
   practice for password reset flows.

5. Signup redirect: DummyJSON /users/add returns a user object with no
   access token. Rather than fake an auth session, signup redirects to
   /login with a success message. This is the correct real-world pattern.

6. Social login: Google and Apple buttons are rendered faithfully per
   the Figma design. They are not wired — DummyJSON has no OAuth
   endpoints. An inline message communicates this without omitting the
   buttons.

7. Design fidelity: the source is an IBM Carbon-influenced wireframe kit.
   Rules enforced throughout: bottom-border-only inputs, zero border-radius
   on all form elements and cards, Roboto at exact weights and sizes
   from the Figma inspect output.

## What I'd add with more time
- Token refresh via /auth/refresh before expiry
- Client-side form validation before submit (required fields,
  password min-length, email format)
- Accessible error announcements via aria-live regions
- E2E tests with Playwright covering all three flows
```

---

## Execution order

5.  Tokens — CSS variables, Roboto, global reset
6.  Routing — add /forgot-password and /signup, stub pages
7.  LoginPage UI — static markup
8.  ForgotPasswordPage UI + logic — static + simulated submit
9.  SignupPage UI — static markup
10. Wire Login — connect to AuthContext
11. Wire Signup — connect to /users/add
12. Dashboard — authenticated data via TanStack Query
13. README + final checks

After Prompt 13, deploy to Vercel, add the live URL to the README,
and the submission is ready.
