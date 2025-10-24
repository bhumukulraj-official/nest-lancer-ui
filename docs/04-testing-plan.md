### 04 - Testing Plan


#### Testing Principles
- UI-only frontend: verify rendering, API wiring, loading/error states, and role-based visibility.
- No business logic tests in frontend; assert backend responses are displayed and flows succeed.
- Deterministic tests: mock network for unit/integration; use real backend for e2e.


### Step 1 — Unit Testing (Components, Hooks, Stores)

Scope
- Components in `src/components/**` and feature components in `src/components/features/**`.
- Hooks in `src/hooks/**`.
- Zustand stores in `src/stores/**`.

Setup
- Framework: Vitest + React Testing Library + MSW (for isolated hook tests).
- Config: `vitest.config.ts`, test utils in `src/test/test-utils.tsx` (providers for Theme, Router, QueryClient).

Test Cases
1. Shared UI
   - Loading: `Spinner`, `Skeleton`, `ProgressBar` render/ARIA.
   - ErrorBoundary: renders fallback on thrown error.
   - FormControls: controlled/uncontrolled value changes and a11y labels.
   - Modal/Toast: open/close behavior.
2. Layouts
   - `AppLayout`, `AuthLayout`, `UserLayout`, `AdminLayout` render slots and nav.
3. Guards
   - `AuthGuard`, `RoleGuard`: render children or fallback based on provided store state.
4. Hooks (API)
   - `useQuery` wrappers: initial loading, success state mapping, error propagation (with MSW).
   - Mutations: success and error toasts fired via `errorUIService`.
5. Stores
   - `authStore`: login/logout updates, token persistence calls.
   - `uiStore`, `notificationStore`: toggle and enqueue/dequeue actions.

Exit Criteria
- 95%+ line coverage of `src/components/shared`, 80%+ for feature components.
- All unit suites pass in CI.


### Step 2 — Integration Testing (Pages + Navigation + API Contracts)

Scope
- Route-level pages under `src/pages/**` and flows that cross components.
- With mocked network via MSW to validate UI contracts and loading/error behaviors.

Setup
- Render pages using real `AppRoutes.tsx` with MemoryRouter.
- Provide `QueryClientProvider` and mocked `authStore` state.

Scenarios
1. Auth
   - Login success redirects to user dashboard; invalid creds show backend error message from MSW.
   - Register → email verify instruction displayed.
2. User flows
   - Dashboard loads cards with data; loading skeletons disappear after success.
   - Profile edit submits and refetches; success toast appears.
   - Projects list pagination and search debouncing reflect query params.
   - Requests create → navigates to detail; errors are rendered from backend response.
   - Quotes accept mutation updates list status.
   - Payments: order creation from API then Razorpay UI open (mock SDK interface).
 - Payments: payment intent creation from API then Razorpay UI open (mock SDK interface).
3. Messaging
   - Conversation list loads; sending a message calls POST and appends to thread.
   - WebSocket event mocked to append incoming message to store and re-render.
4. Admin views
   - Admin guard hides pages for non-admin role; visible for admin role.
   - Users table fetches, filters, and opens edit form; submit triggers refetch.
   - Analytics pages render charts from backend-provided series (no client calc).

Exit Criteria
- Critical journeys green with MSW.
- All API contracts used by UI covered by at least one integration test.


### Step 3 — End-to-End (E2E) Testing with Real Backend

Scope
- Happy-path scenarios across user and admin roles using real backend server.

Environment
- Backend URL from `.env.e2e` (non-prod). Test users and seed data available.
- Use Playwright for cross-browser.

Preparations
- Seed backend: create test users (admin, user), projects, requests, quotes, payments.
- Configure test env vars: API base, WS URL, Razorpay test key.

Scenarios
1. Authentication
   - Login as user → lands on dashboard; token persisted; role badges visible.
2. User journeys
   - Update profile avatar; see updated avatar on dashboard.
   - Create request; view request detail; see tracking timeline populate.
   - Accept quote; verify payments page shows payable item; complete Razorpay test flow; receipt displays.
   - Messaging: open conversation with admin; send message; receive response (real-time).
3. Admin journeys
   - Login as admin; dashboard metrics render; health and realtime sections load.
   - Manage users: edit status; verify change persists and appears in table.
   - Refund a payment; verify status displayed and analytics update.
   - Audit logs visible and filterable; webhook logs show entries.
4. Navigation and guards
   - Direct navigation to admin route as user shows not-authorized page.
   - Refresh preserves session and returns to current route.

Data Hygiene
- Use unique test prefixes; teardown or nightly cleanup job in backend.

Exit Criteria
- All e2e scenarios pass in CI against staging backend.
- Screenshots on failure stored as artifacts; video enabled for flaky analysis.


### Tooling and CI/CD
- Commands
  - Unit: `vitest run --coverage`
  - Integration: `vitest run --config vitest.integration.config.ts`
  - E2E: `playwright test --config playwright.config.ts`
- CI Jobs
  - Lint → Unit → Integration (MSW) → Build → E2E (staging URL)
- Artifacts
  - Coverage reports, junit XML, screenshots/videos from Playwright.


### Test Data and Mocking Strategy
- Unit/Integration: MSW handlers per feature module mirroring `docs/api-docs.json` shapes.
- E2E: rely on staging fixtures/seed scripts; avoid intercepting real APIs except third-party UI SDK shims.


### Quality Gates
- Coverage thresholds: 80% statements/branches global; 95% for shared/ui.
- Zero console errors in tests; a11y smoke checks on key pages using axe-core.
- Flake rate < 1% over last 50 CI runs.
