# ⚠️ ARCHIVED - Implementation Plan (UI-Only Frontend)

> **NOTE**: This file has been **ARCHIVED**. 
> 
> **Use `docs/05-priority-implementation-plan.md` instead** - it provides a better phased approach focused on getting core functionality working first.
>
> This file remains for reference but should not be used for active development.

---

### 03 - Implementation Plan (UI-Only Frontend)


#### Guiding Principles
- Frontend is UI-only: no business logic, no security logic, no data processing beyond display and UX validation.
- All data comes from backend APIs; all commands are API calls. WebSocket used only for real-time UI updates.
- Role-based UI is display-only; backend enforces authorization.


### Phase 0: Project Setup
1. Initialize project scaffold
   - Create `src/` tree per `docs/02-dir-structure-details.md`.
   - Add base configs in `src/config/` (env, api, router, theme).
   - Configure `src/lib/` providers (react-query, axios, socket, i18n, analytics).
2. Routing and layouts
   - Implement `src/routes/AppRoutes.tsx` with `AuthRoutes`, `UserRoutes`, `AdminRoutes`.
   - Build base layouts in `src/components/layout/*` and wire to routes.
3. Core services
   - Implement `services/api/client.ts`, `interceptors.ts`, and `endpoints.ts`.
   - Add `services/websocket/socketClient.ts` and simple event relay to stores.
4. State stores
   - Create minimal Zustand stores: `authStore`, `uiStore`, `notificationStore`, `cacheStore`.
5. Shared UI
   - Build shared components: Loading, ErrorBoundary, FormControls, DataDisplay, Modal, Toast.
   - Add utility helpers: formatters, validation (UX only), route helper.


### Phase 1: Authentication UI
Scope: login, register, forgot/reset password, email verification; role-aware navigation.

Steps
1. Pages and routes
   - Add `pages/auth/*` mapped via `AuthRoutes.tsx`.
2. Components
   - Implement forms in `components/features/auth/*` using shared FormControls.
3. Hooks and services
   - Add `hooks/auth/useLogin`, `useRegister`, `useLogout`, `useAuth`.
   - Use `services/auth/authApiService.ts` and `tokenService.ts` for token storage only.
4. Guards
   - Implement `components/shared/Guards/AuthGuard.tsx` and `RoleGuard.tsx` (display-only).
5. Layout and nav
   - Update `AppLayout` navbar to reflect auth state and role-based links.
6. Success criteria
   - End-to-end navigation works; token stored; role shown; no business logic.


### Phase 2: User Feature Set
Core focus: read/display backend data; simple forms submit directly to APIs.

2.1 Dashboard
- Components: `DashboardOverview`, `ActivityFeed`, `StatsCards`.
- Hook: `hooks/features/useProjects`, `useRequests`, `useNotifications` for fetching summaries.
- Data: read-only from `/users/me/*` endpoints.

2.2 Profile
- Pages: `ProfilePage`, `ProfileEditPage`, `SettingsPage`.
- Components: `ProfileForm`, `AvatarUpload`, `SettingsForm`.
- Services: `userApiService`, `profileApiService` for CRUD; store updated on success.

2.3 Projects
- Pages: `ProjectListPage`, `ProjectDetailPage`, `ProjectGalleryPage`, `ProjectSearchPage`.
- Components: `ProjectList`, `ProjectDetail`, `ProjectCard`, `ProjectFilters`, `ProjectGallery`.
- Hooks: `useProjects` using `projectApiService` (list, search, get by id).

2.4 Requests
- Pages: list/detail/create/tracking.
- Components: `RequestForm` (submit only), `RequestTracking` (display progress).
- Services: `requestApiService` for CRUD.

2.5 Quotes
- Pages: list/detail/accept.
- Components: `QuoteList`, `QuoteDetail`, `QuoteAcceptance` (submit acceptance to API).
- Services: `quoteApiService`.

2.6 Payments
- Pages: form/methods/history/receipts.
- Components: `PaymentForm`, `PaymentMethods`, `PaymentHistory`, `PaymentReceipt`, `RazorpayCheckout` (UI SDK only).
- Services: `paymentApiService` and `razorpayUIService` (no pricing logic; backend provides payment intent).

2.7 Progress and Portfolio
- Progress: `ProgressTimeline`, `MilestoneCard`, using `/projects/:id/progress`.
- Portfolio: `PortfolioView`, `FeaturedProjects`, `PortfolioStats`, `TechnologyStack` via `portfolioApiService`.

2.8 Media
- Components: `MediaUpload`, `MediaGallery`, `MediaBrowser`.
- Services: `mediaApiService` and `cloudinaryUIService` for widget only.

2.9 Messaging
- Components: `ChatInterface`, `ConversationList`, `MessageComposer`, `TypingIndicator`.
- Rules: only UI; backend restricts messaging (users→admins only). No client-side rule calc.
- Realtime: WebSocket updates update `messagingStore` for live thread.

2.10 Notifications
- Components: `NotificationCenter`, `NotificationBell`, `NotificationItem`.
- Source: API + WebSocket badge updates; display-only.


### Phase 3: Admin Feature Set
Strategy: display backend analytics; manage entities via forms that call APIs.

3.1 Admin Dashboard
- Components: `AdminOverview`, `SystemMetrics`, `RealTimeStats`, `HealthMonitor` using analytics endpoints.

3.2 Analytics
- Components: `UserAnalytics`, `RequestAnalytics`, `PaymentAnalytics`, `QuoteAnalytics`, `RateLimitAnalytics`.
- Charts: use `ChartContainer` and render backend-provided series.

3.3 User Management
- List, detail, edit, status, bulk actions using `adminApiService` and `userApiService`.
- No validations beyond UX; backend enforces RBAC and rules.

3.4 Project/Request/Quote/Payment Management
- Create/edit/delete/restore, status transitions, refund management via respective admin APIs.
- Use `DataGrid` + `TableFilters` for display; mutate via forms and refresh lists.

3.5 Progress/Media/Blog/Contact/System/Audit/Webhooks/Storage
- Implement pages/components per `docs/02-dir-structure-details.md` under `components/features/admin/*`.
- Each module: read lists, open form modals, submit, refetch; no client computations.


### Phase 4: Cross-Cutting Enhancements
1. Error handling
   - Global `ErrorBoundary`, `useApiError`, and `errorUIService` for toast/dialog.
2. Loading states
   - Skeletons and spinners for all API queries and mutations.
3. Role-based UI
   - `RoleGuard` wraps admin routes; navbar adapts; server role drives visibility.
4. WebSocket hygiene
   - Connect on auth, disconnect on logout; handlers update stores only.
5. Accessibility and i18n
   - Implement a11y helpers and i18n keys for all user-facing strings.
6. Performance
   - React Query caching, pagination, infinite lists where applicable.


### Phase 5: Hardening and Delivery
1. Configuration
   - Verify `.env` for API base URL, WebSocket URL, Razorpay key.
2. Observability
   - Integrate analytics UI tracking and optional Sentry config.
3. Security boundaries
   - Confirm no business logic leaked into UI; all validations server-side.
4. Final pass
   - UX polish, empty states, error states, and responsive checks.


### Role-Based Delivery Plan
- User
  - Auth, Dashboard, Profile, Projects, Requests, Quotes, Payments, Progress, Portfolio, Media, Messaging, Notifications.
- Admin
  - Dashboard, Analytics, Users, Projects, Requests, Quotes, Payments, Progress, Media, Blog, Contact, System, Audit, Webhooks, Storage.


### Definition of Done (Per Feature)
- Routes wired; pages render within correct layout.
- Data fetched via API hooks; loading and error states implemented.
- Forms submit directly to API and handle success/error UI.
- No client-side business logic or security enforcement beyond display.
- Unit tests for components/hooks; integration tests for page flows; e2e happy-path with backend.
