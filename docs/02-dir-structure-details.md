# NestLancer Frontend - Directory Structure Implementation Details

## 🎯 Project Overview

NestLancer is a UI-only freelancing platform frontend built with React 18, TypeScript, and Material-UI (MUI v5). The application provides a user interface for freelancers and clients to interact with the NestJS backend through APIs only. The frontend displays backend data, handles UI interactions, and integrates with external UI services (Razorpay, Cloudinary) without any business logic processing.

### Key UI Features (Display Backend Data Only):
- **User Interface**: Authentication forms, profile displays (backend handles all auth logic)
- **Project Display**: Project galleries, portfolio views (backend manages all project data)
- **Request UI**: Service request forms, quote displays (backend processes all business logic)
- **Payment UI**: Razorpay checkout interface (backend handles payment processing)
- **Real-time Updates**: WebSocket UI updates (backend manages all message processing)
- **Media Display**: Cloudinary upload widgets, image galleries (backend handles file processing)
- **Analytics Display**: Charts showing backend-calculated data (no frontend calculations)
- **Admin UI**: System administration interfaces displaying backend data
- **Progressive Web App**: PWA capabilities for better user experience
- **Internationalization**: Multi-language UI support
- **Performance Monitoring**: Frontend performance tracking
- **Component Documentation**: UI component library documentation
- **Testing Framework**: UI component and integration testing
- **Development Tools**: Code quality tools for frontend development

## 🏗️ UI-Only Architecture Overview

The NestLancer frontend follows a UI-only architecture with complete separation from business logic:

### Core UI Infrastructure
- **State Management**: Zustand for UI state only, React Query for API data caching
- **Routing**: React Router v6 with UI-based route protection (backend enforces security)
- **UI Framework**: Material-UI v5 with custom theme and component library
- **API Layer**: Axios for HTTP requests only (no business logic processing)
- **Real-time**: Socket.io client for UI updates only (backend handles all message logic)

### UI-Only Feature Organization
- **Shared Components**: Reusable UI display components
- **Layout Components**: UI layouts for different user types and contexts
- **Feature Components**: UI components that display backend data
- **Pages**: Route-level components that render UI and fetch backend data
- **Hooks**: Custom React hooks for UI logic and API data fetching only
- **Services**: API communication services only (no business logic)
- **Stores**: Zustand stores for UI state management only
- **Types**: TypeScript types for API responses and UI props
- **Utils**: UI utility functions for display formatting and helpers only
- **Constants**: Frontend constants for routes, messages, and UI settings

## 📋 Complete File List

### Root Level Configuration Files
- `.env.development`
- `.env.production`
- `.env.example`
- `.gitignore`
- `.eslintrc.json`
- `.prettierrc`
- `.prettierignore`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `package.json`
- `package-lock.json`
- `README.md`
- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`
- `.dockerignore`
- `01-frontend-architecture.md` - Frontend architecture overview
- `technology-stack.md`

### Public Directory
- `public/favicon.ico`
- `public/logo.svg`
- `public/manifest.json`
- `public/robots.txt`

### Source Directory (src/)

#### Assets
- `src/assets/images/logo/`
- `src/assets/images/icons/`
- `src/assets/images/illustrations/`
- `src/assets/fonts/`
- `src/assets/videos/`

#### Components - Shared
- `src/components/shared/LoadingStates/Spinner.tsx`
- `src/components/shared/LoadingStates/Skeleton.tsx`
- `src/components/shared/LoadingStates/ProgressBar.tsx`
- `src/components/shared/ErrorBoundaries/ErrorBoundary.tsx`
- `src/components/shared/ErrorBoundaries/ErrorFallback.tsx`
- `src/components/shared/FormControls/Input.tsx`
- `src/components/shared/FormControls/TextArea.tsx`
- `src/components/shared/FormControls/Select.tsx`
- `src/components/shared/FormControls/Checkbox.tsx`
- `src/components/shared/FormControls/Radio.tsx`
- `src/components/shared/FormControls/DatePicker.tsx`
- `src/components/shared/FormControls/FileUpload.tsx`
- `src/components/shared/DataDisplay/Card.tsx`
- `src/components/shared/DataDisplay/Badge.tsx`
- `src/components/shared/DataDisplay/Avatar.tsx`
- `src/components/shared/DataDisplay/Chip.tsx`
- `src/components/shared/DataDisplay/Tooltip.tsx`
- `src/components/shared/Navigation/Navbar.tsx`
- `src/components/shared/Navigation/Sidebar.tsx`
- `src/components/shared/Navigation/Breadcrumbs.tsx`
- `src/components/shared/Navigation/Tabs.tsx`
- `src/components/shared/Navigation/Pagination.tsx`
- `src/components/shared/Guards/RoleGuard.tsx`
- `src/components/shared/Guards/AdminGuard.tsx`
- `src/components/shared/Guards/AuthGuard.tsx`
- `src/components/shared/Modal/Modal.tsx`
- `src/components/shared/Modal/Dialog.tsx`
- `src/components/shared/Modal/Drawer.tsx`
- `src/components/shared/Button/Button.tsx`
- `src/components/shared/Button/IconButton.tsx`
- `src/components/shared/Button/LoadingButton.tsx`
- `src/components/shared/Toast/Toast.tsx`
- `src/components/shared/Chart/LineChart.tsx`
- `src/components/shared/Chart/BarChart.tsx`
- `src/components/shared/Chart/PieChart.tsx`
- `src/components/shared/Chart/AreaChart.tsx`
- `src/components/shared/Chart/ChartContainer.tsx`
- `src/components/shared/Table/DataTable.tsx`
- `src/components/shared/Table/DataGrid.tsx`
- `src/components/shared/Table/TableFilters.tsx`
- `src/components/shared/Table/TablePagination.tsx`

#### Components - Layout
- `src/components/layout/AppLayout/AppLayout.tsx`
- `src/components/layout/AppLayout/Header.tsx`
- `src/components/layout/AppLayout/Footer.tsx`
- `src/components/layout/AppLayout/Sidebar.tsx`
- `src/components/layout/AuthLayout/AuthLayout.tsx`
- `src/components/layout/AuthLayout/AuthHeader.tsx`
- `src/components/layout/UserLayout/UserLayout.tsx`
- `src/components/layout/UserLayout/UserHeader.tsx`
- `src/components/layout/UserLayout/UserSidebar.tsx`
- `src/components/layout/UserLayout/UserContent.tsx`
- `src/components/layout/AdminLayout/AdminLayout.tsx`
- `src/components/layout/AdminLayout/AdminHeader.tsx`
- `src/components/layout/AdminLayout/AdminSidebar.tsx`
- `src/components/layout/AdminLayout/AdminContent.tsx`
- `src/components/layout/AdminLayout/AdminNavigation.tsx`

#### Components - Features/Auth
- `src/components/features/auth/LoginForm.tsx`
- `src/components/features/auth/RegisterForm.tsx`
- `src/components/features/auth/ForgotPasswordForm.tsx`
- `src/components/features/auth/ResetPasswordForm.tsx`
- `src/components/features/auth/EmailVerificationForm.tsx`

#### Components - Features/Dashboard
- `src/components/features/dashboard/DashboardOverview.tsx`
- `src/components/features/dashboard/ActivityFeed.tsx`
- `src/components/features/dashboard/StatsCards.tsx`
- `src/components/features/dashboard/RecentActivity.tsx`

#### Components - Features/Profile
- `src/components/features/profile/ProfileForm.tsx`
- `src/components/features/profile/AvatarUpload.tsx`
- `src/components/features/profile/SettingsForm.tsx`
- `src/components/features/profile/ProfileCard.tsx`

#### Components - Features/Projects
- `src/components/features/projects/ProjectCard.tsx`
- `src/components/features/projects/ProjectList.tsx`
- `src/components/features/projects/ProjectDetail.tsx`
- `src/components/features/projects/ProjectGallery.tsx`
- `src/components/features/projects/ProjectSearch.tsx`
- `src/components/features/projects/ProjectFilters.tsx`

#### Components - Features/Requests
- `src/components/features/requests/RequestCard.tsx`
- `src/components/features/requests/RequestList.tsx`
- `src/components/features/requests/RequestDetail.tsx`
- `src/components/features/requests/RequestForm.tsx`
- `src/components/features/requests/RequestTracking.tsx`
- `src/components/features/requests/RequestStatus.tsx`

#### Components - Features/Quotes
- `src/components/features/quotes/QuoteCard.tsx`
- `src/components/features/quotes/QuoteList.tsx`
- `src/components/features/quotes/QuoteDetail.tsx`
- `src/components/features/quotes/QuoteForm.tsx`
- `src/components/features/quotes/QuoteAcceptance.tsx`

#### Components - Features/Payments
- `src/components/features/payments/PaymentForm.tsx`
- `src/components/features/payments/PaymentMethods.tsx`
- `src/components/features/payments/PaymentHistory.tsx`
- `src/components/features/payments/PaymentReceipt.tsx`
- `src/components/features/payments/RazorpayCheckout.tsx`

#### Components - Features/Progress
- `src/components/features/progress/ProgressTimeline.tsx`
- `src/components/features/progress/MilestoneCard.tsx`
- `src/components/features/progress/ProgressTracker.tsx`
- `src/components/features/progress/MilestoneForm.tsx`

#### Components - Features/Portfolio
- `src/components/features/portfolio/PortfolioView.tsx`
- `src/components/features/portfolio/FeaturedProjects.tsx`
- `src/components/features/portfolio/PortfolioStats.tsx`
- `src/components/features/portfolio/TechnologyStack.tsx`
- `src/components/features/portfolio/PortfolioCard.tsx`

#### Components - Features/Media
- `src/components/features/media/MediaUpload.tsx`
- `src/components/features/media/MediaGallery.tsx`
- `src/components/features/media/MediaEditor.tsx`
- `src/components/features/media/MediaBrowser.tsx`
- `src/components/features/media/CloudinaryWidget.tsx`

#### Components - Features/Messaging
- `src/components/features/messaging/ChatInterface.tsx`
- `src/components/features/messaging/ConversationList.tsx`
- `src/components/features/messaging/MessageComposer.tsx`
- `src/components/features/messaging/MessageBubble.tsx`
- `src/components/features/messaging/TypingIndicator.tsx`

#### Components - Features/Notifications
- `src/components/features/notifications/NotificationCenter.tsx`
- `src/components/features/notifications/NotificationBell.tsx`
- `src/components/features/notifications/NotificationItem.tsx`
- `src/components/features/notifications/NotificationBadge.tsx`

#### Components - Features/Blog
- `src/components/features/blog/BlogCard.tsx`
- `src/components/features/blog/BlogList.tsx`
- `src/components/features/blog/BlogPost.tsx`
- `src/components/features/blog/BlogComments.tsx`
- `src/components/features/blog/BlogEditor.tsx`

#### Components - Features/Contact
- `src/components/features/contact/ContactForm.tsx`
- `src/components/features/contact/ContactInfo.tsx`

#### Components - Features/Admin/Dashboard
- `src/components/features/admin/dashboard/AdminOverview.tsx`
- `src/components/features/admin/dashboard/SystemMetrics.tsx`
- `src/components/features/admin/dashboard/RealTimeStats.tsx`
- `src/components/features/admin/dashboard/HealthMonitor.tsx`

#### Components - Features/Admin/Analytics
- `src/components/features/admin/analytics/UserAnalytics.tsx`
- `src/components/features/admin/analytics/RequestAnalytics.tsx`
- `src/components/features/admin/analytics/PaymentAnalytics.tsx`
- `src/components/features/admin/analytics/QuoteAnalytics.tsx`
- `src/components/features/admin/analytics/RateLimitAnalytics.tsx`
- `src/components/features/admin/analytics/AnalyticsCharts.tsx`

#### Components - Features/Admin/Users
- `src/components/features/admin/users/UserList.tsx`
- `src/components/features/admin/users/UserDetail.tsx`
- `src/components/features/admin/users/UserEditForm.tsx`
- `src/components/features/admin/users/UserStatusManager.tsx`
- `src/components/features/admin/users/BulkUserActions.tsx`

#### Components - Features/Admin/Projects
- `src/components/features/admin/projects/ProjectCreateForm.tsx`
- `src/components/features/admin/projects/ProjectEditForm.tsx`
- `src/components/features/admin/projects/ProjectDeleteDialog.tsx`
- `src/components/features/admin/projects/ProjectRestoreDialog.tsx`
- `src/components/features/admin/projects/BulkProjectActions.tsx`
- `src/components/features/admin/projects/ProjectTechStack.tsx`
- `src/components/features/admin/projects/ProjectTestimonials.tsx`

#### Components - Features/Admin/Requests
- `src/components/features/admin/requests/RequestListAdmin.tsx`
- `src/components/features/admin/requests/RequestDetailAdmin.tsx`
- `src/components/features/admin/requests/RequestStatusManager.tsx`
- `src/components/features/admin/requests/BulkRequestActions.tsx`

#### Components - Features/Admin/Quotes
- `src/components/features/admin/quotes/QuoteListAdmin.tsx`
- `src/components/features/admin/quotes/QuoteDetailAdmin.tsx`
- `src/components/features/admin/quotes/QuoteStatusManager.tsx`
- `src/components/features/admin/quotes/BulkQuoteActions.tsx`

#### Components - Features/Admin/Payments
- `src/components/features/admin/payments/PaymentListAdmin.tsx`
- `src/components/features/admin/payments/PaymentDetailAdmin.tsx`
- `src/components/features/admin/payments/RefundManager.tsx`
- `src/components/features/admin/payments/PaymentAnalyticsAdmin.tsx`

#### Components - Features/Admin/Progress
- `src/components/features/admin/progress/ProgressUpdates.tsx`
- `src/components/features/admin/progress/MilestoneManager.tsx`
- `src/components/features/admin/progress/ProgressAnalytics.tsx`

#### Components - Features/Admin/Media
- `src/components/features/admin/media/MediaListAdmin.tsx`
- `src/components/features/admin/media/MediaDetailAdmin.tsx`
- `src/components/features/admin/media/MediaVisibilityManager.tsx`
- `src/components/features/admin/media/BulkMediaActions.tsx`
- `src/components/features/admin/media/StorageAdmin.tsx`

#### Components - Features/Admin/Blog
- `src/components/features/admin/blog/BlogCreateForm.tsx`
- `src/components/features/admin/blog/BlogEditForm.tsx`
- `src/components/features/admin/blog/BlogDeleteDialog.tsx`
- `src/components/features/admin/blog/BlogCommentsManager.tsx`

#### Components - Features/Admin/Contact
- `src/components/features/admin/contact/ContactMessages.tsx`
- `src/components/features/admin/contact/MessageInbox.tsx`
- `src/components/features/admin/contact/MessageStatusManager.tsx`
- `src/components/features/admin/contact/ContactAnalytics.tsx`

#### Components - Features/Admin/System
- `src/components/features/admin/system/SystemConfigForm.tsx`
- `src/components/features/admin/system/ApiKeyManager.tsx`
- `src/components/features/admin/system/SystemInfo.tsx`
- `src/components/features/admin/system/SystemHealth.tsx`
- `src/components/features/admin/system/EnvironmentConfig.tsx`

#### Components - Features/Admin/Audit
- `src/components/features/admin/audit/AuditLogs.tsx`
- `src/components/features/admin/audit/AuditFilters.tsx`
- `src/components/features/admin/audit/AuditExport.tsx`
- `src/components/features/admin/audit/AuditAnalytics.tsx`

#### Components - Features/Admin/Webhooks
- `src/components/features/admin/webhooks/WebhookLogs.tsx`
- `src/components/features/admin/webhooks/WebhookConfig.tsx`
- `src/components/features/admin/webhooks/WebhookMonitoring.tsx`
- `src/components/features/admin/webhooks/WebhookRetry.tsx`

#### Pages - Auth
- `src/pages/auth/LoginPage.tsx`
- `src/pages/auth/RegisterPage.tsx`
- `src/pages/auth/ForgotPasswordPage.tsx`
- `src/pages/auth/ResetPasswordPage.tsx`
- `src/pages/auth/EmailVerificationPage.tsx`

#### Pages - User/Dashboard
- `src/pages/user/dashboard/UserDashboardPage.tsx`
- `src/pages/user/dashboard/OverviewSection.tsx`
- `src/pages/user/dashboard/ActivitySection.tsx`
- `src/pages/user/dashboard/StatsSection.tsx`

#### Pages - User/Profile
- `src/pages/user/profile/ProfilePage.tsx`
- `src/pages/user/profile/ProfileEditPage.tsx`
- `src/pages/user/profile/SettingsPage.tsx`

#### Pages - User/Projects
- `src/pages/user/projects/ProjectListPage.tsx`
- `src/pages/user/projects/ProjectDetailPage.tsx`
- `src/pages/user/projects/ProjectGalleryPage.tsx`
- `src/pages/user/projects/ProjectSearchPage.tsx`

#### Pages - User/Requests
- `src/pages/user/requests/RequestListPage.tsx`
- `src/pages/user/requests/RequestDetailPage.tsx`
- `src/pages/user/requests/RequestCreatePage.tsx`
- `src/pages/user/requests/RequestTrackingPage.tsx`

#### Pages - User/Quotes
- `src/pages/user/quotes/QuoteListPage.tsx`
- `src/pages/user/quotes/QuoteDetailPage.tsx`
- `src/pages/user/quotes/QuoteAcceptPage.tsx`

#### Pages - User/Payments
- `src/pages/user/payments/PaymentFormPage.tsx`
- `src/pages/user/payments/PaymentMethodsPage.tsx`
- `src/pages/user/payments/PaymentHistoryPage.tsx`
- `src/pages/user/payments/PaymentReceiptsPage.tsx`

#### Pages - User/Progress
- `src/pages/user/progress/ProgressTimelinePage.tsx`
- `src/pages/user/progress/MilestoneTrackingPage.tsx`

#### Pages - User/Portfolio
- `src/pages/user/portfolio/PortfolioPage.tsx`
- `src/pages/user/portfolio/FeaturedProjectsPage.tsx`
- `src/pages/user/portfolio/PortfolioStatsPage.tsx`

#### Pages - User/Media
- `src/pages/user/media/MediaUploadPage.tsx`
- `src/pages/user/media/MediaGalleryPage.tsx`
- `src/pages/user/media/MediaBrowserPage.tsx`

#### Pages - User/Messaging
- `src/pages/user/messaging/MessagingPage.tsx`
- `src/pages/user/messaging/ConversationListPage.tsx`
- `src/pages/user/messaging/ChatInterfacePage.tsx`

#### Pages - User/Notifications
- `src/pages/user/notifications/NotificationCenterPage.tsx`

#### Pages - User/Blog
- `src/pages/user/blog/BlogListPage.tsx`
- `src/pages/user/blog/BlogPostPage.tsx`

#### Pages - User/Contact
- `src/pages/user/contact/ContactPage.tsx`

#### Pages - Admin/Dashboard
- `src/pages/admin/dashboard/AdminDashboardPage.tsx`
- `src/pages/admin/dashboard/SystemMetricsSection.tsx`
- `src/pages/admin/dashboard/RealTimeStatsSection.tsx`
- `src/pages/admin/dashboard/HealthMonitoringSection.tsx`

#### Pages - Admin/Analytics
- `src/pages/admin/analytics/UserAnalyticsPage.tsx`
- `src/pages/admin/analytics/RequestAnalyticsPage.tsx`
- `src/pages/admin/analytics/PaymentAnalyticsPage.tsx`
- `src/pages/admin/analytics/QuoteAnalyticsPage.tsx`
- `src/pages/admin/analytics/RateLimitAnalyticsPage.tsx`

#### Pages - Admin/Users
- `src/pages/admin/users/UserListPage.tsx`
- `src/pages/admin/users/UserDetailPage.tsx`
- `src/pages/admin/users/UserEditPage.tsx`

#### Pages - Admin/Projects
- `src/pages/admin/projects/ProjectListPage.tsx`
- `src/pages/admin/projects/ProjectCreatePage.tsx`
- `src/pages/admin/projects/ProjectEditPage.tsx`
- `src/pages/admin/projects/ProjectManagementPage.tsx`

#### Pages - Admin/Requests
- `src/pages/admin/requests/RequestListPage.tsx`
- `src/pages/admin/requests/RequestDetailPage.tsx`

#### Pages - Admin/Quotes
- `src/pages/admin/quotes/QuoteListPage.tsx`
- `src/pages/admin/quotes/QuoteDetailPage.tsx`

#### Pages - Admin/Payments
- `src/pages/admin/payments/PaymentListPage.tsx`
- `src/pages/admin/payments/PaymentDetailPage.tsx`
- `src/pages/admin/payments/RefundManagementPage.tsx`

#### Pages - Admin/Progress
- `src/pages/admin/progress/ProgressUpdatesPage.tsx`
- `src/pages/admin/progress/MilestoneManagementPage.tsx`

#### Pages - Admin/Media
- `src/pages/admin/media/MediaListPage.tsx`
- `src/pages/admin/media/MediaDetailPage.tsx`
- `src/pages/admin/media/StorageAdminPage.tsx`

#### Pages - Admin/Blog
- `src/pages/admin/blog/BlogListPage.tsx`
- `src/pages/admin/blog/BlogCreatePage.tsx`
- `src/pages/admin/blog/BlogEditPage.tsx`

#### Pages - Admin/Contact
- `src/pages/admin/contact/ContactMessagesPage.tsx`
- `src/pages/admin/contact/MessageInboxPage.tsx`

#### Pages - Admin/System
- `src/pages/admin/system/SystemConfigPage.tsx`
- `src/pages/admin/system/ApiKeyManagementPage.tsx`
- `src/pages/admin/system/SystemInfoPage.tsx`
- `src/pages/admin/system/EnvironmentConfigPage.tsx`

#### Pages - Admin/Audit
- `src/pages/admin/audit/AuditLogsPage.tsx`
- `src/pages/admin/audit/AuditAnalyticsPage.tsx`

#### Pages - Admin/Webhooks
- `src/pages/admin/webhooks/WebhookLogsPage.tsx`
- `src/pages/admin/webhooks/WebhookConfigPage.tsx`
- `src/pages/admin/webhooks/WebhookMonitoringPage.tsx`

#### General Pages
- `src/pages/NotFoundPage.tsx`
- `src/pages/HomePage.tsx`

#### Hooks - Auth
- `src/hooks/auth/useAuth.ts`
- `src/hooks/auth/useLogin.ts`
- `src/hooks/auth/useRegister.ts`
- `src/hooks/auth/useLogout.ts`
- `src/hooks/auth/useAuthGuard.ts`

#### Hooks - API
- `src/hooks/api/useQuery.ts`
- `src/hooks/api/useMutation.ts`
- `src/hooks/api/useInfiniteQuery.ts`
- `src/hooks/api/useApiError.ts`

#### Hooks - UI
- `src/hooks/ui/useModal.ts`
- `src/hooks/ui/useToast.ts`
- `src/hooks/ui/useTheme.ts`
- `src/hooks/ui/useBreakpoint.ts`
- `src/hooks/ui/useDebounce.ts`

#### Hooks - Form
- `src/hooks/form/useForm.ts`
- `src/hooks/form/useFormValidation.ts`
- `src/hooks/form/useFileUpload.ts`

#### Hooks - Admin
- `src/hooks/admin/useAdminGuard.ts`
- `src/hooks/admin/useSystemMetrics.ts`
- `src/hooks/admin/useAdminAnalytics.ts`

#### Hooks - Features
- `src/hooks/features/useProjects.ts`
- `src/hooks/features/useRequests.ts`
- `src/hooks/features/useQuotes.ts`
- `src/hooks/features/usePayments.ts`
- `src/hooks/features/useMessaging.ts`
- `src/hooks/features/useNotifications.ts`
- `src/hooks/features/useWebSocket.ts`

#### Hooks - Common
- `src/hooks/common/useLocalStorage.ts`
- `src/hooks/common/useSessionStorage.ts`
- `src/hooks/common/useCopyToClipboard.ts`
- `src/hooks/common/useDocumentTitle.ts`

#### Services - API (Core Communication)
- `src/services/api/client.ts`
- `src/services/api/interceptors.ts`
- `src/services/api/endpoints.ts`
- `src/services/api/index.ts`

#### Services - Auth (API Calls Only)
- `src/services/auth/authApiService.ts`
- `src/services/auth/tokenService.ts`
- `src/services/auth/index.ts`

#### Services - User (API Calls Only)
- `src/services/user/userApiService.ts`
- `src/services/user/profileApiService.ts`
- `src/services/user/index.ts`

#### Services - Project (API Calls Only)
- `src/services/project/projectApiService.ts`
- `src/services/project/index.ts`

#### Services - Request (API Calls Only)
- `src/services/request/requestApiService.ts`
- `src/services/request/index.ts`

#### Services - Quote (API Calls Only)
- `src/services/quote/quoteApiService.ts`
- `src/services/quote/index.ts`

#### Services - Payment (UI Integration Only)
- `src/services/payment/paymentApiService.ts`
- `src/services/payment/razorpayUIService.ts`
- `src/services/payment/index.ts`

#### Services - Media (UI Integration Only)
- `src/services/media/mediaApiService.ts`
- `src/services/media/cloudinaryUIService.ts`
- `src/services/media/index.ts`

#### Services - Messaging (API Calls Only)
- `src/services/messaging/messagingApiService.ts`
- `src/services/messaging/index.ts`

#### Services - Notification (API Calls Only)
- `src/services/notification/notificationApiService.ts`
- `src/services/notification/index.ts`

#### Services - Blog (API Calls Only)
- `src/services/blog/blogApiService.ts`
- `src/services/blog/index.ts`

#### Services - Contact (API Calls Only)
- `src/services/contact/contactApiService.ts`
- `src/services/contact/index.ts`

#### Services - Progress (API Calls Only)
- `src/services/progress/progressApiService.ts`
- `src/services/progress/index.ts`

#### Services - Portfolio (API Calls Only)
- `src/services/portfolio/portfolioApiService.ts`
- `src/services/portfolio/index.ts`

#### Services - Admin (Display Backend Data Only)
- `src/services/admin/adminApiService.ts`
- `src/services/admin/analyticsApiService.ts`
- `src/services/admin/auditApiService.ts`
- `src/services/admin/webhookApiService.ts`
- `src/services/admin/index.ts`

#### Services - WebSocket (UI Updates Only)
- `src/services/websocket/socketClient.ts`
- `src/services/websocket/socketEventHandlers.ts`
- `src/services/websocket/index.ts`

#### Services - UI Only
- `src/services/ui/storageService.ts`
- `src/services/ui/routerService.ts`
- `src/services/ui/errorUIService.ts`
- `src/services/ui/analyticsUIService.ts`
- `src/services/ui/index.ts`

#### Stores
- `src/stores/authStore.ts`
- `src/stores/userStore.ts`
- `src/stores/uiStore.ts`
- `src/stores/notificationStore.ts`
- `src/stores/cacheStore.ts`
- `src/stores/adminStore.ts`
- `src/stores/projectStore.ts`
- `src/stores/requestStore.ts`
- `src/stores/quoteStore.ts`
- `src/stores/paymentStore.ts`
- `src/stores/messagingStore.ts`
- `src/stores/index.ts`

#### Types - API
- `src/types/api/request.types.ts`
- `src/types/api/response.types.ts`
- `src/types/api/error.types.ts`

#### Types - Models
- `src/types/models/user.types.ts`
- `src/types/models/project.types.ts`
- `src/types/models/request.types.ts`
- `src/types/models/quote.types.ts`
- `src/types/models/payment.types.ts`
- `src/types/models/media.types.ts`
- `src/types/models/message.types.ts`
- `src/types/models/notification.types.ts`
- `src/types/models/blog.types.ts`
- `src/types/models/contact.types.ts`
- `src/types/models/progress.types.ts`
- `src/types/models/portfolio.types.ts`

#### Types - Enums
- `src/types/enums/userRole.enum.ts`
- `src/types/enums/requestStatus.enum.ts`
- `src/types/enums/quoteStatus.enum.ts`
- `src/types/enums/paymentStatus.enum.ts`
- `src/types/enums/notificationType.enum.ts`

#### Types - Forms
- `src/types/forms/auth.form.types.ts`
- `src/types/forms/project.form.types.ts`
- `src/types/forms/request.form.types.ts`
- `src/types/forms/quote.form.types.ts`
- `src/types/forms/payment.form.types.ts`

#### Types - Index
- `src/types/index.ts`

#### Utils - Validation (UI Form Validation Only)
- `src/utils/validation/formValidation.ts`
- `src/utils/validation/inputFormatting.ts`
- `src/utils/validation/index.ts`

#### Utils - Formatters (Display Formatting Only)
- `src/utils/formatters/dateFormatter.ts`
- `src/utils/formatters/currencyFormatter.ts`
- `src/utils/formatters/textFormatter.ts`
- `src/utils/formatters/numberFormatter.ts`
- `src/utils/formatters/index.ts`

#### Utils - Helpers (UI Helpers Only)
- `src/utils/helpers/errorDisplayHelper.ts`
- `src/utils/helpers/routeHelper.ts`
- `src/utils/helpers/uiStateHelper.ts`
- `src/utils/helpers/fileDisplayHelper.ts`
- `src/utils/helpers/urlHelper.ts`
- `src/utils/helpers/index.ts`

#### Utils - UI Specific
- `src/utils/ui/domHelper.ts`
- `src/utils/ui/animationHelper.ts`
- `src/utils/ui/responsiveHelper.ts`
- `src/utils/ui/accessibilityHelper.ts`
- `src/utils/ui/index.ts`

#### Utils - Index
- `src/utils/index.ts`

#### Constants (UI Constants Only)
- `src/constants/api.constants.ts`
- `src/constants/routes.constants.ts`
- `src/constants/ui.constants.ts`
- `src/constants/messages.constants.ts`
- `src/constants/theme.constants.ts`
- `src/constants/status.constants.ts`
- `src/constants/index.ts`

#### Styles - Theme
- `src/styles/theme/palette.ts`
- `src/styles/theme/typography.ts`
- `src/styles/theme/shadows.ts`
- `src/styles/theme/breakpoints.ts`
- `src/styles/theme/index.ts`

#### Styles - Global
- `src/styles/globals.css`
- `src/styles/variables.css`
- `src/styles/animations.css`

#### Routes
- `src/routes/AppRoutes.tsx`
- `src/routes/UserRoutes.tsx`
- `src/routes/AdminRoutes.tsx`
- `src/routes/AuthRoutes.tsx`
- `src/routes/ProtectedRoute.tsx`
- `src/routes/index.ts`

#### Config
- `src/config/env.config.ts`
- `src/config/api.config.ts`
- `src/config/router.config.ts`
- `src/config/theme.config.ts`
- `src/config/role.config.ts`
- `src/config/analytics.config.ts`
- `src/config/sentry.config.ts`
- `src/config/index.ts`

#### Lib
- `src/lib/reactQuery.ts`
- `src/lib/axios.ts`
- `src/lib/socketio.ts`
- `src/lib/cloudinary.ts`
- `src/lib/razorpay.ts`
- `src/lib/yup.ts`
- `src/lib/framerMotion.ts`
- `src/lib/dompurify.ts`
- `src/lib/workbox.ts`
- `src/lib/webVitals.ts`
- `src/lib/i18n.ts`

#### Context
- `src/context/AuthContext.tsx`
- `src/context/ThemeContext.tsx`
- `src/context/NotificationContext.tsx`
- `src/context/index.ts`

#### Main Application Files
- `src/App.tsx`
- `src/main.tsx`
- `src/vite-env.d.ts`

#### Testing Files
- `src/__tests__/setup.ts`
- `src/__tests__/mocks/handlers.ts`
- `src/__tests__/utils/test-utils.tsx`
- `src/__tests__/components/shared/Button.test.tsx`
- `src/__tests__/components/shared/Input.test.tsx`
- `src/__tests__/hooks/useAuth.test.ts`
- `src/__tests__/services/authService.test.ts`
- `src/__tests__/stores/authStore.test.ts`

#### Storybook Files
- `.storybook/main.ts`
- `.storybook/preview.ts`
- `.storybook/manager.ts`
- `src/stories/Button.stories.tsx`
- `src/stories/Input.stories.tsx`
- `src/stories/ProjectCard.stories.tsx`
- `src/stories/UserProfile.stories.tsx`
- `src/stories/AdminDashboard.stories.tsx`

#### Additional Configuration Files
- `.storybook/`
- `src/__tests__/`
- `src/stories/`
- `jest.config.js`
- `jest.setup.js`
- `setupTests.ts`
- `msw.config.js`

---

## 📁 Directory Structure Details

This section provides detailed implementation instructions for each file and directory in the NestLancer frontend project. Each entry includes specific implementation requirements, technology integrations, and development guidelines to ensure consistent and high-quality code implementation.

## 📋 Implementation Instructions

Below are detailed instructions for what should be implemented in each file. These are high-level implementation guidelines without actual code.

### Root Level Configuration Files

#### `.env.development`
- Define client-safe environment variables (Vite only exposes variables prefixed with VITE_); do not include secrets
- Backend API base URL (e.g., VITE_API_BASE_URL=http://localhost:3000/api)
- Razorpay public key only (VITE_RAZORPAY_KEY_ID). Do not include any secret keys
- Cloudinary public config (VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET)
- WebSocket URL for UI updates (VITE_WS_URL=ws://localhost:3000)
- Google Analytics tracking ID (VITE_GA_TRACKING_ID)
- Sentry public DSN (VITE_SENTRY_DSN)
- UI feature flags (e.g., VITE_ENABLE_DEV_TOOLS=true)
- PWA toggle (VITE_PWA_ENABLED=false)
- i18n defaults (VITE_DEFAULT_LOCALE, VITE_FALLBACK_LOCALE)

#### `.env.production`
- Define client-safe environment variables for production (no secrets in frontend)
- Backend API base URL
- Razorpay public key only (no secret in frontend)
- Cloudinary public config
- WebSocket URL for UI updates
- Google Analytics tracking ID
- Sentry public DSN
- UI feature flags and performance toggles

#### `.env.example`
- Provide template for client-safe variables only with examples and comments
- Explicitly document that sensitive secrets (JWT secrets, Razorpay secret, API keys) must live in backend only
- Document environment-specific notes relevant to the UI

#### `.gitignore`
- Specify files and directories to exclude from version control
- Include build outputs, dependencies, environment files, and IDE settings
- Add platform-specific exclusions for different operating systems

#### `.eslintrc.json`
- Configure ESLint rules for React, TypeScript, and project standards
- Set up import sorting, accessibility rules, and code quality checks
- Define custom rules for the NestLancer project conventions

#### `.prettierrc`
- Configure Prettier formatting rules
- Set code style preferences for indentation, quotes, and line breaks
- Define formatting rules that work well with React and TypeScript

#### `.prettierignore`
- Specify files and directories that should not be formatted by Prettier
- Include generated files, dependencies, and build outputs
- Exclude files that have specific formatting requirements

#### `tsconfig.json`
- Configure TypeScript compiler options for the project
- Set strict type checking and module resolution settings
- Define path mappings for clean imports and better organization

#### `tsconfig.node.json`
- Configure TypeScript for Node.js build tools and configuration files
- Set appropriate compiler options for Vite, ESLint, and other tools
- Ensure compatibility with build pipeline requirements

#### `vite.config.ts`
- Configure Vite build tool with React and TypeScript plugins using @vitejs/plugin-react
- Set up development server with HMR and proxy configuration for NestJS backend API calls
- Configure build optimization with code splitting, asset handling, and tree shaking
- Set up path aliases for clean imports (@/components, @/services, @/hooks, @/types, @/utils, @/stores, @/config, @/lib, @/context, @/routes, @/styles, @/constants, @/assets)
- Configure environment variable loading and validation with Vite's built-in env handling
- Set up PWA plugin configuration for service worker using vite-plugin-pwa
- Configure build output optimization for production deployment with minification and compression
- Set up ESLint integration for development workflow
- Configure CSS preprocessing and PostCSS for styling optimization
- Set up asset optimization for images, fonts, and other static resources

#### `package.json`
- Define project metadata, dependencies, and scripts for NestLancer frontend
- List all required packages from the technology stack:
  - Core: React 18.2.0+, TypeScript 5.0+, Vite 4.4.0+
  - UI: Material-UI v5.14.0+, Emotion 11.11.0+, React Hook Form 7.45.0+
  - State: Zustand 4.4.0+, React Query 4.32.0+
  - Routing: React Router v6.15.0+
  - HTTP: Axios 1.5.0+
  - Auth: JWT Decode 3.1.2+, Crypto-js 4.1.1+
  - Payments: Razorpay React 1.3.0+
  - Media: Cloudinary React 1.3.0+, React Dropzone 14.2.0+
  - Charts: Recharts 2.7.0+, React Table 8.10.0+
  - Real-time: Socket.io Client 4.7.0+
  - Responsive: React Responsive 9.0.0+
  - Testing: Jest 29.6.0+, React Testing Library 13.4.0+, MSW 1.3.0+
  - Dev Tools: ESLint 8.47.0+, Prettier 3.0.0+, Husky 8.0.0+
  - Analytics: Google Analytics 4, Sentry 7.60.0+
  - Utils: Lodash 4.17.21+, Date-fns 2.30.0+, React Hot Toast 2.4.0+, React Helmet 6.1.0+
  - Validation: Yup 1.2.0+
  - Animation: Framer Motion 10.16.0+
  - Security: DOMPurify 3.0.0+
  - PWA: Workbox 7.0.0+
  - i18n: React i18next 13.2.0+
  - Performance: Web Vitals 3.4.0+
- Set up development scripts (dev, build, test, lint, format, preview)
- Configure build and deployment scripts for different environments
- Include all necessary dependencies for state management, routing, and UI components
- Set up scripts for Docker containerization and deployment
- Configure workspace settings for monorepo structure if needed

#### `package-lock.json`
- Lock exact versions of all dependencies
- Ensure reproducible builds across different environments
- Generated automatically by npm - contains dependency tree

#### `README.md`
- Provide comprehensive project documentation
- Include setup instructions, architecture overview, and development guidelines
- Document available scripts and deployment procedures

#### `Dockerfile`
- Define Docker image for containerized deployment
- Set up Node.js environment and dependency installation
- Configure build process and production-ready image

#### `docker-compose.yml`
- Define frontend container and optional reverse-proxy for local dev
- Do not include database or cache services for a UI-only app
- Configure networking and static asset serving as needed

#### `nginx.conf`
- Configure Nginx as reverse proxy and static file server
- Set up load balancing, SSL termination, and caching rules
- Define routing rules for the React SPA

#### `.dockerignore`
- Specify files to exclude from Docker build context
- Include unnecessary files to reduce image size and build time
- Exclude development-only files and sensitive data

### Public Directory Files

#### `public/favicon.ico`
- Create application favicon in ICO format
- Design should match NestLancer branding
- Include multiple sizes for different devices

#### `public/logo.svg`
- Create scalable vector logo for the application
- Use clean, professional design matching brand guidelines
- Ensure logo works well in different sizes and contexts

#### `public/manifest.json`
- Define PWA manifest with NestLancer app metadata
- Configure app icons, theme colors, and display preferences for mobile installation
- Set up offline capabilities and installation prompts for PWA functionality
- Include app name, description, and branding information
- Configure display modes and orientation preferences

#### `public/robots.txt`
- Configure web crawler access and indexing rules for NestLancer platform
- Define which pages should be crawled (public projects, blog posts) and which should be excluded (admin, user dashboards)
- Set crawling delays and sitemap references for SEO optimization
- Include rules for different user types and protected content areas

### Source Directory Implementation

#### Assets Organization
- Organize images, fonts, and videos in logical folder structure for NestLancer platform
- Optimize assets for web delivery (compression, formats) for better performance
- Implement lazy loading and CDN integration where appropriate
- Include project thumbnails, user avatars, and platform illustrations
- Organize icons for different features (projects, payments, messaging, etc.)
- Include video assets for tutorials and platform demonstrations

#### Components - Shared Implementation

##### Loading States
- **Spinner.tsx**: Implement Material-UI based loading spinner with size variants (small, medium, large) for different contexts (buttons, pages, modals) using CircularProgress component with customizable colors and animation
- **Skeleton.tsx**: Create skeleton loading components for different content types (project cards, user profiles, data tables) using MUI Skeleton component with proper spacing and animation effects
- **ProgressBar.tsx**: Build linear progress indicators for file uploads, project completion, and payment processing using MUI LinearProgress with determinate/indeterminate states and custom styling

##### Error Boundaries
- **ErrorBoundary.tsx**: Implement React error boundary with fallback UI for graceful error handling
- **ErrorFallback.tsx**: Create user-friendly error display component with retry options and error reporting

##### Form Controls
- **Input.tsx**: Build text input component with validation states, icons, and error handling for user forms using MUI TextField with React Hook Form integration, custom validation, and accessibility features
- **TextArea.tsx**: Create multi-line text input with character counting for project descriptions and messages using MUI TextField with multiline prop, character limit display, and auto-resize functionality
- **Select.tsx**: Implement dropdown select with search and multi-select capabilities for categories and skills using MUI Select with Autocomplete for search functionality and multiple selection support
- **Checkbox.tsx**: Build checkbox component with custom styling for terms acceptance and preferences using MUI Checkbox with FormControlLabel, custom colors, and indeterminate state support
- **Radio.tsx**: Create radio button group component for payment methods and project types using MUI RadioGroup with FormControl and FormLabel for proper grouping and accessibility
- **DatePicker.tsx**: Implement date picker with localization support for project deadlines and milestones using MUI DatePicker with date-fns for formatting and React i18next for localization
- **FileUpload.tsx**: Build drag-and-drop file upload component with Cloudinary integration for project files using React Dropzone with MUI styling, file validation, progress tracking, and Cloudinary upload widget integration

##### Data Display
- **Card.tsx**: Create versatile card component for content display (project cards, user profiles, dashboard widgets) using MUI Card with CardContent, CardActions, and CardMedia, with hover effects and customizable styling
- **Badge.tsx**: Implement badge component for status indicators (project status, payment status, user roles) using MUI Badge with custom colors, positioning, and animation effects
- **Avatar.tsx**: Build user avatar component with fallback images and online status indicators using MUI Avatar with fallback to initials, online status dot, and Cloudinary image integration
- **Chip.tsx**: Create chip component for tags and selections (skills, categories, project tags) using MUI Chip with deletable, clickable, and filterable variants, custom colors, and icon support
- **Tooltip.tsx**: Implement tooltip component with positioning for help text and additional information using MUI Tooltip with custom positioning, delay, and styling options

##### Navigation
- **Navbar.tsx**: Build main navigation bar with responsive design and user authentication state using MUI AppBar with responsive drawer, user menu, notifications, and role-based navigation items
- **Sidebar.tsx**: Create collapsible sidebar navigation for user and admin dashboards using MUI Drawer with nested navigation, role-based menu items, and responsive behavior
- **Breadcrumbs.tsx**: Implement breadcrumb navigation component for deep navigation using MUI Breadcrumbs with custom separators, clickable items, and responsive design
- **Tabs.tsx**: Build tab navigation with content switching for project details and user profiles using MUI Tabs with TabPanel components, lazy loading, and keyboard navigation
- **Pagination.tsx**: Create pagination component for data tables (projects, users, payments) using MUI Pagination with page size selection, total count display, and accessibility features

##### Guards
- **RoleGuard.tsx**: UI-only gating that shows/hides components based on role received from backend via auth store; provide fallback UI for unauthorized access
- **AdminGuard.tsx**: UI-only gating for admin features based on backend-provided role; perform UI redirects only
- **AuthGuard.tsx**: Check client auth state (e.g., token presence/UI flag) and handle redirects; do not perform token validation in frontend

##### Modal System
- **Modal.tsx**: Create base modal component with overlay for project details and user interactions using MUI Modal with custom backdrop, focus management, and accessibility features
- **Dialog.tsx**: Build dialog component for confirmations and alerts (delete confirmations, payment confirmations) using MUI Dialog with custom actions, responsive design, and keyboard navigation
- **Drawer.tsx**: Implement slide-out drawer component for mobile navigation and quick actions using MUI Drawer with swipe gestures, backdrop control, and responsive behavior

##### Button System
- **Button.tsx**: Build primary button component with variants for different actions (submit, cancel, primary, secondary)
- **IconButton.tsx**: Create icon-only button component for actions like edit, delete, and navigation
- **LoadingButton.tsx**: Implement button with loading states for form submissions and API calls

##### Toast System
- **Toast.tsx**: Build toast notification system using React Hot Toast for success, error, and info messages with customizable positioning, duration, and styling options

##### Chart System
- **LineChart.tsx**: Implement line chart using Recharts for project progress and analytics with customizable data points, tooltips, legends, and responsive design for different screen sizes
- **BarChart.tsx**: Create bar chart component for user statistics and project comparisons with horizontal/vertical orientation, data labels, and interactive features
- **PieChart.tsx**: Build pie chart component for payment methods and project categories with donut chart support, percentage labels, and click interactions
- **AreaChart.tsx**: Implement area chart component for revenue and user growth analytics with gradient fills, multiple data series, and time-based filtering
- **ChartContainer.tsx**: Create wrapper component for chart styling and responsive behavior with loading states, error handling, and export functionality

##### Table System
- **DataTable.tsx**: Build data table using React Table for project lists and user management with sorting, filtering, pagination, row selection, and column resizing capabilities
- **DataGrid.tsx**: Implement advanced data grid with MUI Data Grid for admin panels and analytics with virtual scrolling, column grouping, export functionality, and real-time data updates
- **TableFilters.tsx**: Create table filtering component for search and filter functionality with multiple filter types (text, select, date range, numeric), filter persistence, and clear all functionality
- **TablePagination.tsx**: Build table pagination controls for large datasets with page size selection, total count display, page navigation, and accessibility features

#### Components - Layout Implementation

##### App Layout
- **AppLayout.tsx**: Create main application layout wrapper with responsive design, theme provider integration, and global navigation structure using MUI Container and Box components with proper spacing and breakpoint handling
- **Header.tsx**: Build application header with responsive navigation, user authentication state, notification bell, user menu dropdown, and mobile hamburger menu using MUI AppBar with Toolbar and responsive drawer integration
- **Footer.tsx**: Implement application footer with company information, social links, legal pages, and responsive design using MUI Grid system with proper spacing and typography hierarchy
- **Sidebar.tsx**: Create main application sidebar with collapsible navigation, role-based menu items, and responsive behavior using MUI Drawer with List components and proper icon integration

##### Auth Layout
- **AuthLayout.tsx**: Build authentication pages layout with centered forms, background styling, and responsive design using MUI Container with maxWidth and proper spacing for login/register forms
- **AuthHeader.tsx**: Create auth-specific header with logo, navigation links, and minimal design using MUI AppBar with transparent background and centered content

##### User Layout
- **UserLayout.tsx**: Implement user dashboard layout with sidebar navigation, header, and main content area using MUI Grid system with responsive breakpoints and proper spacing
- **UserHeader.tsx**: Build user-specific header with user profile, notifications, settings menu, and logout functionality using MUI AppBar with user avatar and dropdown menus
- **UserSidebar.tsx**: Create user navigation sidebar with dashboard sections, project management, messaging, and profile links using MUI List with nested navigation and role-based visibility
- **UserContent.tsx**: Build user content area wrapper with proper padding, responsive design, and breadcrumb integration using MUI Container with dynamic content loading

##### Admin Layout
- **AdminLayout.tsx**: Create admin dashboard layout with admin-specific navigation, header, and content area using MUI Grid with admin color scheme and proper spacing
- **AdminHeader.tsx**: Build admin-specific header with admin tools, system status, user management shortcuts, and admin-only navigation using MUI AppBar with admin branding
- **AdminSidebar.tsx**: Implement admin navigation sidebar with system management, user administration, analytics, and audit sections using MUI List with admin-specific icons and permissions
- **AdminContent.tsx**: Create admin content area with data tables, analytics dashboards, and management interfaces using MUI Container with admin-specific styling and responsive design
- **AdminNavigation.tsx**: Build admin navigation component with breadcrumbs, quick actions, and admin-specific navigation patterns using MUI Breadcrumbs and Button components

#### Components - Features Implementation

##### Auth Components
- **LoginForm.tsx**: Build login form with validation for freelancers and clients using React Hook Form with Yup validation, MUI TextField components, role-based form fields, and integration with auth service for JWT token handling
- **RegisterForm.tsx**: Create user registration form with role selection, profile setup, and multi-step form process using MUI Stepper with form validation, file upload for avatar, and terms acceptance using MUI Checkbox
- **ForgotPasswordForm.tsx**: Implement forgot password form with email validation using MUI TextField with email validation, loading states, and success/error feedback using toast notifications
- **ResetPasswordForm.tsx**: Build password reset form with password strength indicator and confirmation field using MUI TextField with password visibility toggle; backend validates the reset token
- **EmailVerificationForm.tsx**: Create email verification component for account activation with resend functionality, countdown timer, and verification status display using MUI components with real-time updates

##### Dashboard Components
- **DashboardOverview.tsx**: Build user dashboard overview with project summaries, quick actions, and personalized widgets using MUI Grid with responsive cards, charts integration, and real-time data updates from React Query
- **ActivityFeed.tsx**: Create activity feed component for recent projects, messages, and notifications using MUI List with timeline design, infinite scroll, and real-time updates via WebSocket integration
- **StatsCards.tsx**: Implement statistics cards for earnings, completed projects, and active requests using MUI Card with animated counters, trend indicators, and click-through navigation to detailed views
- **RecentActivity.tsx**: Build recent activity display for project updates and system notifications using MUI List with avatar integration, timestamp formatting, and action buttons for quick responses

##### Profile Components
- **ProfileForm.tsx**: Create profile editing form for personal information, skills, and portfolio using MUI Grid with form sections, skill tags with autocomplete, portfolio items with drag-and-drop reordering, and real-time validation
- **AvatarUpload.tsx**: Build avatar upload component with Cloudinary integration, image cropping using react-image-crop, preview functionality, and fallback to user initials using MUI Avatar with upload progress indicators
- **SettingsForm.tsx**: Implement user settings form for notifications, privacy, and account preferences using MUI Tabs with form sections, toggle switches for preferences, and integration with user service for settings persistence
- **ProfileCard.tsx**: Create profile display card for user profiles and freelancer showcases using MUI Card with profile information, skill chips, rating display, and action buttons for contact and portfolio viewing

##### Project Components
- **ProjectCard.tsx**: Build project display card with thumbnails, status indicators, and quick actions using MUI Card with CardMedia, status badges, action buttons, and hover effects for project browsing
- **ProjectList.tsx**: Create project list component with pagination, sorting, and grid/list view toggle using MUI Grid with virtual scrolling, infinite scroll, and responsive design for large project datasets
- **ProjectDetail.tsx**: Implement project detail view with full information, progress tracking, and interactive elements using MUI Tabs with project information, timeline, files, and team members sections
- **ProjectGallery.tsx**: Build project image gallery with lightbox, media management, and image optimization using MUI Grid with react-image-gallery integration and Cloudinary transformations
- **ProjectSearch.tsx**: Create project search component with filters, sorting options, and search suggestions using MUI Autocomplete with debounced search, filter chips, and search history
- **ProjectFilters.tsx**: Implement project filtering by category, budget, timeline, and skills using MUI Accordion with filter controls, range sliders, and multi-select components with filter persistence

##### Request Components
- **RequestCard.tsx**: Build request display card with status indicators, budget information, and timeline using MUI Card with status badges, progress indicators, and action buttons for request management
- **RequestList.tsx**: Create request list component with filtering, sorting, and status-based organization using MUI DataGrid with custom filters, status grouping, and bulk actions for request management
- **RequestDetail.tsx**: Implement request detail view with full information, response management, and collaboration features using MUI Tabs with request details, responses, timeline, and file attachments
- **RequestForm.tsx**: Build request creation form with project requirements, budget settings, and skill matching using MUI Stepper with multi-step form, file uploads, and real-time validation
- **RequestTracking.tsx**: Create request tracking component for status updates and progress monitoring using MUI Timeline with status updates, milestone tracking, and real-time notifications
- **RequestStatus.tsx**: Implement request status display with timeline and status indicators using MUI Stepper with status badges, progress indicators, and status change history

##### Quote Components
- **QuoteCard.tsx**: Build quote display card with pricing information, timeline, and status using MUI Card with pricing breakdown, status badges, and action buttons for quote management
- **QuoteList.tsx**: Create quote list component with filtering, sorting, and status management using MUI DataGrid with quote status filters, pricing sorting, and bulk actions for quote processing
- **QuoteDetail.tsx**: Implement quote detail view with full pricing breakdown, terms, and acceptance workflow using MUI Tabs with quote details, terms and conditions, and acceptance interface
- **QuoteForm.tsx**: Build quote creation form UI that captures inputs for pricing and terms; backend performs all calculations and validation
- **QuoteAcceptance.tsx**: Create quote acceptance component with terms review, payment integration, and contract generation using MUI Dialog with terms display, acceptance workflow, and payment gateway integration

##### Payment Components
- **PaymentForm.tsx**: Build payment form UI with Razorpay integration and method selection; backend creates orders and processes payments
- **PaymentMethods.tsx**: Create payment method selection with saved methods, new method addition, and payment method management using MUI List with payment method cards, add new method dialog, and method validation
- **PaymentHistory.tsx**: Implement payment history display with filtering, search, and detailed transaction information using MUI DataGrid with transaction details, status indicators, and export functionality
- **PaymentReceipt.tsx**: Build payment receipt component with transaction details, invoice generation, and download functionality using MUI Card with receipt layout, QR codes, and print-friendly design
- **RazorpayCheckout.tsx**: Integrate Razorpay SDK to open the checkout UI using order details received from backend; backend handles order creation and payment verification

##### Progress Components
- **ProgressTimeline.tsx**: Build project progress timeline with milestone tracking, status updates, and interactive timeline using MUI Timeline with milestone cards, progress indicators, and real-time updates
- **MilestoneCard.tsx**: Create milestone display card with progress information, status indicators, and milestone management using MUI Card with progress bars, status badges, and action buttons
- **ProgressTracker.tsx**: Implement progress tracking component with overall project progress, milestone completion, and progress analytics using MUI LinearProgress with milestone breakdown and progress charts
- **MilestoneForm.tsx**: Build milestone creation form with milestone details, timeline estimation, and progress tracking setup using MUI Dialog with form fields, date pickers, and milestone validation

##### Portfolio Components
- **PortfolioView.tsx**: Create portfolio overview with project showcase, skills display, and portfolio statistics using MUI Grid with project cards, skill chips, and portfolio analytics
- **FeaturedProjects.tsx**: Build featured projects display with project highlights, case studies, and project showcases using MUI Card with project images, descriptions, and technology tags
- **PortfolioStats.tsx**: Implement portfolio statistics with project metrics, skill analytics, and performance indicators using MUI Grid with statistics cards, charts, and progress indicators
- **TechnologyStack.tsx**: Create technology stack display with skill categories, proficiency levels, and technology icons using MUI Grid with skill cards, progress bars, and technology logos
- **PortfolioCard.tsx**: Build portfolio item card with project information, technology stack, and project details using MUI Card with project thumbnails, technology chips, and action buttons

##### Media Components
- **MediaUpload.tsx**: Build file upload component with Cloudinary integration, drag-and-drop functionality, and progress tracking using React Dropzone with MUI styling, file validation, and upload progress indicators
- **MediaGallery.tsx**: Create media gallery display with image grid, lightbox functionality, and media management using MUI Grid with react-image-gallery integration and Cloudinary transformations
- **MediaEditor.tsx**: Implement media editing tools with image cropping, resizing, and basic editing features using react-image-crop with MUI Dialog and editing controls
- **MediaBrowser.tsx**: Build media file browser with file organization, search functionality, and media management using MUI DataGrid with file preview, metadata display, and bulk actions
- **CloudinaryWidget.tsx**: Create Cloudinary upload widget with advanced upload options, image transformations, and media library integration using Cloudinary React SDK with custom UI and upload presets

##### Messaging Components
- **ChatInterface.tsx**: Build real-time chat interface with message history, file sharing, and real-time updates using Socket.io with MUI List, message bubbles, and WebSocket integration
- **ConversationList.tsx**: Create conversation list component with conversation management, search functionality, and unread message indicators using MUI List with conversation cards and status indicators
- **MessageComposer.tsx**: Implement message composition with text input, file attachments, and message sending using MUI TextField with file upload, emoji picker, and message formatting
- **MessageBubble.tsx**: Build message display bubble with message content, timestamp, and status indicators using MUI Card with message styling, avatar integration, and message status
- **TypingIndicator.tsx**: Create typing indicator component with real-time typing status and user identification using MUI Chip with typing animation and user avatar display

##### Notification Components
- **NotificationCenter.tsx**: Build notification center with notification management, filtering, and real-time updates using MUI Drawer with notification list, filter controls, and notification actions
- **NotificationBell.tsx**: Create notification bell with badge showing unread count and notification status using MUI IconButton with Badge component and notification dropdown
- **NotificationItem.tsx**: Implement notification item display with notification content, timestamp, and action buttons using MUI ListItem with notification styling and interaction controls
- **NotificationBadge.tsx**: Build notification badge component with unread count display and notification status using MUI Badge with custom styling and notification indicators

##### Blog Components
- **BlogCard.tsx**: Create blog post card with post preview, author information, and reading time using MUI Card with post thumbnail, excerpt, and metadata display
- **BlogList.tsx**: Build blog post list with pagination, filtering, and search functionality using MUI Grid with blog cards, filter controls, and infinite scroll
- **BlogPost.tsx**: Implement blog post detail view with full content, author information, and social sharing using MUI Container with post content, author card, and sharing buttons
- **BlogComments.tsx**: Create blog comments section with comment display, reply functionality, and comment moderation using MUI List with comment threads, reply forms, and moderation controls
- **BlogEditor.tsx**: Build blog post editor with rich text editing, image upload, and post publishing using MUI Dialog with rich text editor, file upload, and publishing controls

##### Contact Components
- **ContactForm.tsx**: Create contact form component with form validation, file attachments, and contact submission using MUI Stepper with form fields, file upload, and submission handling
- **ContactInfo.tsx**: Build contact information display with company information, contact details, and social media links using MUI Grid with contact cards, map integration, and social media buttons

##### Admin Components - Dashboard
- **AdminOverview.tsx**: Build admin dashboard overview with system statistics, user metrics, and quick actions using MUI Grid with statistics cards, charts, and admin navigation shortcuts
- **SystemMetrics.tsx**: Create system metrics display with server performance, database statistics, and system health indicators using MUI Card with metrics charts, status indicators, and performance graphs
- **RealTimeStats.tsx**: Implement real-time statistics with live user activity, system performance, and real-time updates using WebSocket integration with MUI components and live data visualization
- **HealthMonitor.tsx**: Build system health monitoring with service status, performance metrics, and alert system using MUI Grid with health status cards, performance indicators, and alert notifications

##### Admin Components - Analytics
- **UserAnalytics.tsx**: Create user analytics dashboard with user growth, activity patterns, and user behavior analysis using Recharts with user metrics, growth charts, and user segmentation
- **RequestAnalytics.tsx**: Build request analytics with request trends, category analysis, and request performance metrics using MUI Grid with analytics charts, trend analysis, and request statistics
- **PaymentAnalytics.tsx**: Implement payment analytics with revenue tracking, payment method analysis, and financial reporting using Recharts with payment trends, revenue charts, and financial metrics
- **QuoteAnalytics.tsx**: Create quote analytics with quote conversion rates, pricing analysis, and quote performance metrics using MUI Card with quote statistics, conversion charts, and pricing trends
- **RateLimitAnalytics.tsx**: Build rate limiting analytics with API usage patterns, rate limit violations, and system performance metrics using MUI Grid with rate limit monitoring, usage charts, and performance indicators
- **AnalyticsCharts.tsx**: Implement analytics chart components with reusable chart configurations, data visualization, and chart customization using Recharts with chart types, data formatting, and interactive features

##### Admin Components - Users
- **UserList.tsx**: Build admin user list with DataGrid including user management, filtering, and bulk operations using MUI DataGrid with user data, status management, and admin actions
- **UserDetail.tsx**: Create detailed user view with user information, activity history, and user management options using MUI Tabs with user profile, activity logs, and admin controls
- **UserEditForm.tsx**: Implement user editing form with user information updates, role management, and user status changes using MUI Dialog with form fields, role selection, and validation
- **UserStatusManager.tsx**: Build user status management with user activation, deactivation, and status tracking using MUI Card with status controls, user actions, and status history
- **BulkUserActions.tsx**: Create bulk user operations with multi-user selection, bulk actions, and operation confirmation using MUI Dialog with bulk action controls, confirmation dialogs, and operation feedback

##### Admin Components - Projects
- **ProjectCreateForm.tsx**: Build project creation form with project details, technology stack, and project configuration using MUI Stepper with form sections, technology selection, and project validation
- **ProjectEditForm.tsx**: Implement project editing with project information updates, technology stack management, and project status changes using MUI Dialog with form fields, technology tags, and project controls
- **ProjectDeleteDialog.tsx**: Create project deletion dialog with deletion confirmation, project information display, and deletion consequences using MUI Dialog with confirmation controls, project details, and deletion warnings
- **ProjectRestoreDialog.tsx**: Build project restoration with restoration confirmation, project history, and restoration options using MUI Dialog with restoration controls, project history, and restoration feedback
- **BulkProjectActions.tsx**: Implement bulk project operations with multi-project selection, bulk actions, and operation confirmation using MUI Dialog with bulk action controls, project selection, and operation feedback
- **ProjectTechStack.tsx**: Create technology stack management with technology categories, skill management, and technology updates using MUI Grid with technology cards, skill management, and technology controls
- **ProjectTestimonials.tsx**: Build testimonials management with testimonial display, approval system, and testimonial moderation using MUI Card with testimonial content, approval controls, and moderation features

##### Admin Components - Requests
- **RequestListAdmin.tsx**: Build admin request list with request management, filtering, and bulk operations using MUI DataGrid with request data, status management, and admin actions
- **RequestDetailAdmin.tsx**: Create admin request detail view with request information, response management, and admin controls using MUI Tabs with request details, responses, and admin actions
- **RequestStatusManager.tsx**: Implement request status management with status updates, request tracking, and status history using MUI Card with status controls, request actions, and status tracking
- **BulkRequestActions.tsx**: Build bulk request operations with multi-request selection, bulk actions, and operation confirmation using MUI Dialog with bulk action controls, request selection, and operation feedback

##### Admin Components - Quotes
- **QuoteListAdmin.tsx**: Create admin quote list with quote management, filtering, and bulk operations using MUI DataGrid with quote data, status management, and admin actions
- **QuoteDetailAdmin.tsx**: Build admin quote detail view with quote information, pricing details, and admin controls using MUI Tabs with quote details, pricing breakdown, and admin actions
- **QuoteStatusManager.tsx**: Implement quote status management with status updates, quote tracking, and status history using MUI Card with status controls, quote actions, and status tracking
- **BulkQuoteActions.tsx**: Create bulk quote operations with multi-quote selection, bulk actions, and operation confirmation using MUI Dialog with bulk action controls, quote selection, and operation feedback

##### Admin Components - Payments
- **PaymentListAdmin.tsx**: Build admin payment list with payment management, filtering, and bulk operations using MUI DataGrid with payment data, status management, and admin actions
- **PaymentDetailAdmin.tsx**: Create payment detail view with payment information, transaction details, and admin controls using MUI Tabs with payment details, transaction history, and admin actions
- **RefundManager.tsx**: Implement refund request UI that submits to backend, with refund tracking and history display using MUI components
- **PaymentAnalyticsAdmin.tsx**: Build payment analytics for admin with payment trends, revenue analysis, and financial reporting using Recharts with payment analytics, revenue charts, and financial metrics

##### Admin Components - Progress
- **ProgressUpdates.tsx**: Create progress update management with progress tracking, milestone updates, and progress monitoring using MUI Timeline with progress updates, milestone tracking, and progress analytics
- **MilestoneManager.tsx**: Build milestone management with milestone creation, milestone tracking, and milestone analytics using MUI Card with milestone controls, milestone tracking, and milestone analytics
- **ProgressAnalytics.tsx**: Implement progress analytics with progress trends, milestone analysis, and progress reporting using Recharts with progress analytics, milestone charts, and progress metrics

##### Admin Components - Media
- **MediaListAdmin.tsx**: Build admin media list with media management, filtering, and bulk operations using MUI DataGrid with media data, visibility management, and admin actions
- **MediaDetailAdmin.tsx**: Create media detail view with media information, metadata display, and admin controls using MUI Tabs with media details, metadata, and admin actions
- **MediaVisibilityManager.tsx**: Implement media visibility controls with visibility settings, access control, and visibility tracking using MUI Card with visibility controls, access management, and visibility tracking
- **BulkMediaActions.tsx**: Build bulk media operations with multi-media selection, bulk actions, and operation confirmation using MUI Dialog with bulk action controls, media selection, and operation feedback
- **StorageAdmin.tsx**: Create storage administration with storage management, storage analytics, and storage optimization using MUI Grid with storage controls, storage analytics, and storage optimization

##### Admin Components - Blog
- **BlogCreateForm.tsx**: Build blog post creation with rich text editing, image upload, and post publishing using MUI Dialog with rich text editor, file upload, and publishing controls
- **BlogEditForm.tsx**: Implement blog post editing with post updates, content management, and post status changes using MUI Dialog with form fields, content editor, and post controls
- **BlogDeleteDialog.tsx**: Create blog deletion dialog with deletion confirmation, post information display, and deletion consequences using MUI Dialog with confirmation controls, post details, and deletion warnings
- **BlogCommentsManager.tsx**: Build comment management with comment moderation, comment approval, and comment analytics using MUI Card with comment controls, moderation features, and comment analytics

##### Admin Components - Contact
- **ContactMessages.tsx**: Create contact message management with message display, message filtering, and message management using MUI DataGrid with message data, status management, and admin actions
- **MessageInbox.tsx**: Build message inbox with message organization, message filtering, and message management using MUI List with message cards, inbox organization, and message controls
- **MessageStatusManager.tsx**: Implement message status management with status updates, message tracking, and status history using MUI Card with status controls, message actions, and status tracking
- **ContactAnalytics.tsx**: Create contact analytics with contact trends, message analysis, and contact reporting using Recharts with contact analytics, message charts, and contact metrics

##### Admin Components - System
- **SystemConfigForm.tsx**: Build system configuration form with application settings, feature flags, and system parameters using MUI Stepper with form sections, configuration controls, and validation
- **ApiKeyManager.tsx**: Implement API key management with key generation, rotation, and access control using MUI DataGrid with key management, expiration tracking, and security controls
- **SystemInfo.tsx**: Create system information display with server details, version information, and system status using MUI Card with system metrics, version display, and status indicators
- **SystemHealth.tsx**: Build system health monitoring with service status, performance metrics, and health checks using MUI Grid with health status cards, performance indicators, and alert system
- **EnvironmentConfig.tsx**: Implement environment configuration with environment variables, configuration management, and deployment settings using MUI Dialog with configuration forms, environment selection, and validation

##### Admin Components - Audit
- **AuditLogs.tsx**: Create audit log viewer with log filtering, search functionality, and log details using MUI DataGrid with log entries, filter controls, and detailed log information
- **AuditFilters.tsx**: Build audit log filtering with date range, user filtering, and action filtering using MUI Accordion with filter controls, date pickers, and filter persistence
- **AuditExport.tsx**: Implement audit log export with export formats, date range selection, and export processing using MUI Dialog with export options, format selection, and export progress
- **AuditAnalytics.tsx**: Create audit analytics with audit trends, user activity analysis, and audit reporting using Recharts with audit metrics, trend analysis, and audit statistics

##### Admin Components - Webhooks
- **WebhookLogs.tsx**: Build webhook log viewer with webhook event tracking, response monitoring, and error analysis using MUI DataGrid with webhook events, response details, and error tracking
- **WebhookConfig.tsx**: Implement webhook configuration with webhook setup, endpoint configuration, and webhook management using MUI Stepper with webhook forms, endpoint configuration, and validation
- **WebhookMonitoring.tsx**: Create webhook monitoring with real-time webhook status, performance tracking, and alert system using MUI Grid with webhook status, performance metrics, and monitoring controls
- **WebhookRetry.tsx**: Build webhook retry management with failed webhook retry, retry scheduling, and retry analytics using MUI Card with retry controls, retry scheduling, and retry statistics

#### Pages Implementation

##### Auth Pages
- **LoginPage.tsx**: Create login page with authentication form, role selection, and redirect handling using AuthLayout with LoginForm component, form validation, and authentication state management
- **RegisterPage.tsx**: Build user registration page with multi-step registration process, role selection, and profile setup using AuthLayout with RegisterForm component, form validation, and user creation workflow
- **ForgotPasswordPage.tsx**: Implement forgot password page with email input, validation, and password reset request using AuthLayout with ForgotPasswordForm component and email validation
- **ResetPasswordPage.tsx**: Create password reset page with token validation, new password form, and password confirmation using AuthLayout with ResetPasswordForm component and token validation
- **EmailVerificationPage.tsx**: Build email verification page with verification status, resend functionality, and verification success handling using AuthLayout with EmailVerificationForm component and verification workflow

##### User Pages - Dashboard
- **UserDashboardPage.tsx**: Create main user dashboard with overview, activity feed, and statistics sections using UserLayout with DashboardOverview, ActivityFeed, and StatsCards components, real-time data updates, and responsive design
- **OverviewSection.tsx**: Build dashboard overview section with project summaries, quick actions, and personalized widgets using MUI Grid with overview cards, action buttons, and data visualization
- **ActivitySection.tsx**: Implement activity feed section with recent activities, notifications, and system updates using MUI List with activity timeline, real-time updates, and interactive elements
- **StatsSection.tsx**: Create statistics section with user metrics, project statistics, and performance indicators using MUI Grid with statistics cards, charts, and trend indicators

##### User Pages - Profile
- **ProfilePage.tsx**: Build user profile page with profile information, portfolio display, and user statistics using UserLayout with ProfileCard, PortfolioView, and user profile components, responsive design, and profile management
- **ProfileEditPage.tsx**: Create profile editing page with profile form, avatar upload, and settings management using UserLayout with ProfileForm, AvatarUpload, and profile editing components, form validation, and real-time updates
- **SettingsPage.tsx**: Implement user settings page with account settings, notification preferences, and privacy controls using UserLayout with SettingsForm and user preferences components, settings management, and preference persistence

##### User Pages - Projects
- **ProjectListPage.tsx**: Create project listing page with project grid, filtering, sorting, and pagination using UserLayout with ProjectList, ProjectFilters, and project management components, responsive design, and project browsing
- **ProjectDetailPage.tsx**: Build project detail page with project information, progress tracking, and project management using UserLayout with ProjectDetail, ProgressTimeline, and project detail components, project data display, and interactive elements
- **ProjectGalleryPage.tsx**: Implement project gallery page with image gallery, media management, and project showcase using UserLayout with ProjectGallery, MediaGallery, and gallery components, image optimization, and media browsing
- **ProjectSearchPage.tsx**: Create project search page with search functionality, filters, and search results using UserLayout with ProjectSearch, ProjectFilters, and search components, search optimization, and result display

##### User Pages - Requests
- **RequestListPage.tsx**: Build request listing page with request grid, filtering, sorting, and status management using UserLayout with RequestList, RequestFilters, and request management components, request data display, and request actions
- **RequestDetailPage.tsx**: Create request detail page with request information, response management, and request tracking using UserLayout with RequestDetail, RequestTracking, and request detail components, request data display, and interactive elements
- **RequestCreatePage.tsx**: Implement request creation page with request form, project requirements, and request submission using UserLayout with RequestForm and request creation components, form validation, and request workflow
- **RequestTrackingPage.tsx**: Build request tracking page with request status, progress tracking, and request updates using UserLayout with RequestTracking, ProgressTimeline, and tracking components, real-time updates, and status monitoring

##### User Pages - Quotes
- **QuoteListPage.tsx**: Create quote listing page with quote grid, filtering, sorting, and status management using UserLayout with QuoteList, QuoteFilters, and quote management components, quote data display, and quote actions
- **QuoteDetailPage.tsx**: Build quote detail page with quote information, pricing details, and quote management using UserLayout with QuoteDetail, QuoteForm, and quote detail components, quote data display, and interactive elements
- **QuoteAcceptPage.tsx**: Implement quote acceptance page with quote review, terms acceptance, and payment integration using UserLayout with QuoteAcceptance, PaymentForm, and quote acceptance components, payment workflow, and contract generation

##### User Pages - Payments
- **PaymentFormPage.tsx**: Create payment form page with payment processing, payment method selection, and payment confirmation using UserLayout with PaymentForm, RazorpayCheckout, and payment components, payment gateway integration, and payment processing
- **PaymentMethodsPage.tsx**: Build payment methods page with saved payment methods, new method addition, and payment method management using UserLayout with PaymentMethods and payment management components, payment method management, and security controls
- **PaymentHistoryPage.tsx**: Implement payment history page with transaction history, payment details, and payment analytics using UserLayout with PaymentHistory and payment tracking components, payment data display, and payment analytics
- **PaymentReceiptsPage.tsx**: Create payment receipts page with receipt generation, invoice management, and receipt download using UserLayout with PaymentReceipt and receipt management components, receipt generation, and invoice management

##### User Pages - Progress
- **ProgressTimelinePage.tsx**: Build progress timeline page with project progress, milestone tracking, and progress visualization using UserLayout with ProgressTimeline, MilestoneCard, and progress tracking components, real-time updates, and progress analytics
- **MilestoneTrackingPage.tsx**: Create milestone tracking page with milestone management, progress monitoring, and milestone analytics using UserLayout with MilestoneManager, ProgressTracker, and milestone components, milestone tracking, and progress monitoring

##### User Pages - Portfolio
- **PortfolioPage.tsx**: Create portfolio overview page with portfolio display, project showcase, and portfolio statistics using UserLayout with PortfolioView, FeaturedProjects, and portfolio components, portfolio management, and project showcase
- **FeaturedProjectsPage.tsx**: Build featured projects page with project highlights, case studies, and project showcases using UserLayout with FeaturedProjects, ProjectCard, and project showcase components, project highlighting, and case study display
- **PortfolioStatsPage.tsx**: Implement portfolio stats page with portfolio metrics, skill analytics, and performance indicators using UserLayout with PortfolioStats, TechnologyStack, and analytics components, portfolio analytics, and performance tracking

##### User Pages - Media
- **MediaUploadPage.tsx**: Create media upload page with file upload, media management, and upload progress tracking using UserLayout with MediaUpload, CloudinaryWidget, and media upload components, file validation, and upload processing
- **MediaGalleryPage.tsx**: Build media gallery page with image gallery, media browsing, and media management using UserLayout with MediaGallery, MediaBrowser, and gallery components, image optimization, and media browsing
- **MediaBrowserPage.tsx**: Implement media browser page with file organization, media search, and media management using UserLayout with MediaBrowser, MediaEditor, and media management components, file organization, and media search

##### User Pages - Messaging
- **MessagingPage.tsx**: Create messaging page with chat interface, conversation management, and real-time messaging using UserLayout with ChatInterface, ConversationList, and messaging components, WebSocket integration, and real-time communication
- **ConversationListPage.tsx**: Build conversation list page with conversation management, search functionality, and conversation organization using UserLayout with ConversationList and conversation management components, conversation filtering, and conversation search
- **ChatInterfacePage.tsx**: Implement chat interface page with real-time chat, message history, and file sharing using UserLayout with ChatInterface, MessageComposer, and chat components, real-time messaging, and file sharing

##### User Pages - Notifications
- **NotificationCenterPage.tsx**: Create notification center page with notification management, filtering, and real-time updates using UserLayout with NotificationCenter, NotificationItem, and notification components, notification management, and real-time updates

##### User Pages - Blog
- **BlogListPage.tsx**: Build blog listing page with blog posts, filtering, and search functionality using UserLayout with BlogList, BlogCard, and blog components, blog browsing, and content management
- **BlogPostPage.tsx**: Create blog post page with blog content, comments, and social sharing using UserLayout with BlogPost, BlogComments, and blog components, blog content display, and comment system

##### User Pages - Contact
- **ContactPage.tsx**: Create contact page with contact form, company information, and contact management using UserLayout with ContactForm, ContactInfo, and contact components, contact form handling, and contact information display

##### Admin Pages - Dashboard
- **AdminDashboardPage.tsx**: Build admin dashboard page with system overview, metrics, and admin tools using AdminLayout with AdminOverview, SystemMetrics, and admin dashboard components, system monitoring, and admin navigation
- **SystemMetricsSection.tsx**: Create system metrics section with server performance, database statistics, and system health indicators using MUI Grid with metrics cards, performance charts, and system status indicators
- **RealTimeStatsSection.tsx**: Implement real-time stats section with live user activity, system performance, and real-time updates using WebSocket integration with MUI components and live data visualization
- **HealthMonitoringSection.tsx**: Build health monitoring section with service status, performance metrics, and alert system using MUI Grid with health status cards, performance indicators, and monitoring controls

##### Admin Pages - Analytics
- **UserAnalyticsPage.tsx**: Create user analytics page with user growth, activity patterns, and user behavior analysis using AdminLayout with UserAnalytics and analytics components, user metrics, and growth charts
- **RequestAnalyticsPage.tsx**: Build request analytics page with request trends, category analysis, and request performance metrics using AdminLayout with RequestAnalytics and analytics components, request statistics, and trend analysis
- **PaymentAnalyticsPage.tsx**: Implement payment analytics page with revenue tracking, payment method analysis, and financial reporting using AdminLayout with PaymentAnalytics and analytics components, payment trends, and revenue charts
- **QuoteAnalyticsPage.tsx**: Create quote analytics page with quote conversion rates, pricing analysis, and quote performance metrics using AdminLayout with QuoteAnalytics and analytics components, quote statistics, and conversion charts
- **RateLimitAnalyticsPage.tsx**: Build rate limit analytics page with API usage patterns, rate limit violations, and system performance metrics using AdminLayout with RateLimitAnalytics and analytics components, rate limit monitoring, and usage charts

##### Admin Pages - Users
- **UserListPage.tsx**: Create user list page with user management, filtering, and bulk operations using AdminLayout with UserList, UserStatusManager, and user management components, user data display, and admin actions
- **UserDetailPage.tsx**: Build user detail page with user information, activity history, and user management options using AdminLayout with UserDetail, UserEditForm, and user detail components, user profile display, and admin controls
- **UserEditPage.tsx**: Implement user edit page with user information updates, role management, and user status changes using AdminLayout with UserEditForm and user editing components, user data editing, and role management

##### Admin Pages - Projects
- **ProjectListPage.tsx**: Create project list page with project management, filtering, and bulk operations using AdminLayout with ProjectCreateForm, ProjectEditForm, and project management components, project data display, and admin actions
- **ProjectCreatePage.tsx**: Build project creation page with project details, technology stack, and project configuration using AdminLayout with ProjectCreateForm and project creation components, project setup, and technology management
- **ProjectEditPage.tsx**: Implement project editing page with project information updates, technology stack management, and project status changes using AdminLayout with ProjectEditForm and project editing components, project data editing, and project controls
- **ProjectManagementPage.tsx**: Create project management page with project administration, project analytics, and project management tools using AdminLayout with project management components, project administration, and project analytics

##### Admin Pages - Requests
- **RequestListPage.tsx**: Build request list page with request management, filtering, and bulk operations using AdminLayout with RequestListAdmin, RequestStatusManager, and request management components, request data display, and admin actions
- **RequestDetailPage.tsx**: Create request detail page with request information, response management, and admin controls using AdminLayout with RequestDetailAdmin and request detail components, request data display, and admin actions

##### Admin Pages - Quotes
- **QuoteListPage.tsx**: Create quote list page with quote management, filtering, and bulk operations using AdminLayout with QuoteListAdmin, QuoteStatusManager, and quote management components, quote data display, and admin actions
- **QuoteDetailPage.tsx**: Build quote detail page with quote information, pricing details, and admin controls using AdminLayout with QuoteDetailAdmin and quote detail components, quote data display, and admin actions

##### Admin Pages - Payments
- **PaymentListPage.tsx**: Create payment list page with payment management, filtering, and bulk operations using AdminLayout with PaymentListAdmin, RefundManager, and payment management components, payment data display, and admin actions
- **PaymentDetailPage.tsx**: Build payment detail page with payment information, transaction details, and admin controls using AdminLayout with PaymentDetailAdmin and payment detail components, payment data display, and admin actions
- **RefundManagementPage.tsx**: Implement refund management page with refund processing, refund tracking, and refund history using AdminLayout with RefundManager and refund management components, refund processing, and refund analytics

##### Admin Pages - Progress
- **ProgressUpdatesPage.tsx**: Create progress updates page with progress tracking, milestone updates, and progress monitoring using AdminLayout with ProgressUpdates, MilestoneManager, and progress management components, progress tracking, and milestone management
- **MilestoneManagementPage.tsx**: Build milestone management page with milestone creation, milestone tracking, and milestone analytics using AdminLayout with MilestoneManager, ProgressAnalytics, and milestone components, milestone management, and progress analytics

##### Admin Pages - Media
- **MediaListPage.tsx**: Create media list page with media management, filtering, and bulk operations using AdminLayout with MediaListAdmin, MediaVisibilityManager, and media management components, media data display, and admin actions
- **MediaDetailPage.tsx**: Build media detail page with media information, metadata display, and admin controls using AdminLayout with MediaDetailAdmin and media detail components, media data display, and admin actions
- **StorageAdminPage.tsx**: Implement storage admin page with storage management, storage analytics, and storage optimization using AdminLayout with StorageAdmin and storage management components, storage administration, and storage analytics

##### Admin Pages - Blog
- **BlogListPage.tsx**: Create blog list page with blog management, filtering, and bulk operations using AdminLayout with BlogCreateForm, BlogEditForm, and blog management components, blog data display, and admin actions
- **BlogCreatePage.tsx**: Build blog creation page with blog post creation, content management, and publishing using AdminLayout with BlogCreateForm and blog creation components, blog post creation, and content management
- **BlogEditPage.tsx**: Implement blog editing page with blog post updates, content management, and post status changes using AdminLayout with BlogEditForm and blog editing components, blog post editing, and content management

##### Admin Pages - Contact
- **ContactMessagesPage.tsx**: Create contact messages page with message management, filtering, and message handling using AdminLayout with ContactMessages, MessageStatusManager, and contact management components, message data display, and admin actions
- **MessageInboxPage.tsx**: Build message inbox page with message organization, message filtering, and message management using AdminLayout with MessageInbox and message management components, message organization, and message controls

##### Admin Pages - System
- **SystemConfigPage.tsx**: Create system config page with system configuration, application settings, and system parameters using AdminLayout with SystemConfigForm and system configuration components, system settings, and configuration management
- **ApiKeyManagementPage.tsx**: Build API key management page with key generation, rotation, and access control using AdminLayout with ApiKeyManager and API key management components, key management, and security controls
- **SystemInfoPage.tsx**: Implement system info page with system information, version details, and system status using AdminLayout with SystemInfo and system information components, system details, and status display
- **EnvironmentConfigPage.tsx**: Create environment config page with environment variables, configuration management, and deployment settings using AdminLayout with EnvironmentConfig and environment configuration components, environment management, and configuration settings

##### Admin Pages - Audit
- **AuditLogsPage.tsx**: Build audit logs page with audit log viewing, filtering, and log analysis using AdminLayout with AuditLogs, AuditFilters, and audit management components, audit log display, and log analysis
- **AuditAnalyticsPage.tsx**: Create audit analytics page with audit trends, user activity analysis, and audit reporting using AdminLayout with AuditAnalytics and audit analytics components, audit metrics, and trend analysis

##### Admin Pages - Webhooks
- **WebhookLogsPage.tsx**: Create webhook logs page with webhook event tracking, response monitoring, and error analysis using AdminLayout with WebhookLogs and webhook management components, webhook events, and response tracking
- **WebhookConfigPage.tsx**: Build webhook config page with webhook setup, endpoint configuration, and webhook management using AdminLayout with WebhookConfig and webhook configuration components, webhook setup, and endpoint management
- **WebhookMonitoringPage.tsx**: Implement webhook monitoring page with real-time webhook status, performance tracking, and alert system using AdminLayout with WebhookMonitoring and webhook monitoring components, webhook status, and performance tracking

##### General Pages
- **NotFoundPage.tsx**: Create 404 not found page with error display, navigation options, and user-friendly error handling using AppLayout with error components, navigation links, and error recovery options
- **HomePage.tsx**: Build application home/landing page with platform overview, feature highlights, and user onboarding using AppLayout with landing page components, feature showcase, and call-to-action elements

#### Hooks Implementation

##### Auth Hooks
- **useAuth.ts**: Create authentication state management hook with user authentication state, token management, and authentication status using Zustand auth store, JWT token handling, and authentication state persistence
- **useLogin.ts**: Implement login functionality hook with login form handling, authentication API calls, and login state management using React Query mutations, form validation, and error handling
- **useRegister.ts**: Build user registration hook with registration form handling, user creation API calls, and registration state management using React Query mutations, form validation, and user creation workflow
- **useLogout.ts**: Create logout functionality hook with logout functionality, token cleanup, and session management using auth service, token removal, and redirect handling
- **useAuthGuard.ts**: Implement authentication guard hook with route protection, authentication checking, and redirect logic using authentication state, route guards, and access control

##### API Hooks
- **useQuery.ts**: Create custom query hook with React Query integration, caching, and data fetching using React Query client, query configuration, and data management
- **useMutation.ts**: Implement mutation hook for API calls with mutation handling, optimistic updates, and error management using React Query mutations, API service integration, and state management
- **useInfiniteQuery.ts**: Build infinite scroll query hook with pagination, infinite loading, and data accumulation using React Query infinite queries, pagination logic, and data management
- **useApiError.ts**: Create API error handling hook with error processing, error display, and error recovery using error service, error handling logic, and user feedback

##### UI Hooks
- **useModal.ts**: Implement modal state management hook with modal state, modal controls, and modal management using Zustand UI store, modal state persistence, and modal lifecycle management
- **useToast.ts**: Create toast notification hook with toast state, toast controls, and notification management using React Hot Toast, toast state management, and notification handling
- **useTheme.ts**: Build theme management hook with theme state, theme switching, and theme persistence using MUI theme provider, theme state management, and theme customization
- **useBreakpoint.ts**: Implement responsive breakpoint hook with breakpoint detection, responsive behavior, and media query handling using React Responsive, breakpoint state, and responsive logic
- **useDebounce.ts**: Create debounce utility hook with debounced values, debounce timing, and performance optimization using debounce logic, value management, and optimization techniques

##### Form Hooks
- **useForm.ts**: Build form management hook with form state, form controls, and form handling using React Hook Form, form validation, and form state management
- **useFormValidation.ts**: Implement form validation hook with validation rules, validation state, and validation handling using Yup validation schemas, form validation logic, and error management
- **useFileUpload.ts**: Create file upload hook with file handling, upload progress, and file management using React Dropzone, Cloudinary integration, and file upload processing

##### Admin Hooks
- **useAdminGuard.ts**: Build admin access guard hook with admin role checking, access control, and admin route protection using authentication state, role validation, and admin access logic
- **useSystemMetrics.ts**: Implement system metrics hook with system performance data, metrics collection, and system monitoring using admin service, metrics API calls, and system data management
- **useAdminAnalytics.ts**: Create admin analytics hook with analytics data, analytics processing, and analytics visualization using analytics service, data processing, and analytics management

##### Feature Hooks
- **useProjects.ts**: Build project management hook with project data, project operations, and project state management using project service, React Query, and project state management
- **useRequests.ts**: Implement request management hook with request data, request operations, and request state management using request service, React Query, and request state management
- **useQuotes.ts**: Create quote management hook with quote data, quote operations, and quote state management using quote service, React Query, and quote state management
- **usePayments.ts**: Build payment management hook with payment data, payment operations, and payment state management using payment service, React Query, and payment state management
- **useMessaging.ts**: Implement messaging functionality hook with messaging data, messaging operations, and messaging state management using messaging service, WebSocket integration, and messaging state management
- **useNotifications.ts**: Create notification management hook with notification data, notification operations, and notification state management using notification service, WebSocket integration, and notification state management
- **useWebSocket.ts**: Build WebSocket connection hook with WebSocket connection, event handling, and real-time communication using Socket.io client, WebSocket state management, and real-time data handling

##### Common Hooks
- **useLocalStorage.ts**: Create localStorage utility hook with localStorage operations, data persistence, and storage management using localStorage API, data serialization, and storage state management
- **useSessionStorage.ts**: Implement sessionStorage hook with sessionStorage operations, session data management, and storage persistence using sessionStorage API, data serialization, and session state management
- **useCopyToClipboard.ts**: Build clipboard functionality hook with clipboard operations, copy functionality, and clipboard state management using Clipboard API, copy operations, and clipboard state handling
- **useDocumentTitle.ts**: Create document title management hook with document title updates, title management, and title state handling using document title API, title updates, and title state management

#### Services Implementation

##### UI Services (No Business Logic)
- **routerService.ts**: UI navigation helpers only - route generation, navigation utilities (no route validation)
- **errorUIService.ts**: Error display helpers only - format backend errors for UI display (no error processing)
- **storageService.ts**: Browser storage wrapper only - localStorage/sessionStorage utilities for UI state

##### API Services
- **client.ts**: Configure Axios instance with interceptors, base URL configuration, and HTTP client setup using Axios configuration, request/response interceptors, and API client management
- **interceptors.ts**: Implement request/response interceptors with authentication headers, error normalization for UI display, and minimal transformation (no business logic)
- **endpoints.ts**: Define all API endpoint constants with endpoint URLs, API routes, and endpoint configuration using endpoint constants, API route definitions, and endpoint management

##### Auth Services (API Calls Only)
- **authApiService.ts**: Authentication API calls only - login, register, logout HTTP requests (backend handles all auth logic)
- **tokenService.ts**: JWT token storage/retrieval only - localStorage/sessionStorage operations (backend validates tokens)

##### User Services (API Calls Only)
- **userApiService.ts**: User CRUD API calls only - HTTP requests to backend user endpoints (backend handles all user logic)
- **profileApiService.ts**: Profile API calls only - HTTP requests to backend profile endpoints (backend handles all profile logic)

##### Domain Services (API Calls Only - No Business Logic)
- **projectApiService.ts**: Project API calls only - HTTP requests to backend project endpoints
- **requestApiService.ts**: Request API calls only - HTTP requests to backend request endpoints  
- **quoteApiService.ts**: Quote API calls only - HTTP requests to backend quote endpoints
- **paymentApiService.ts**: Payment API calls only - HTTP requests to backend payment endpoints
- **razorpayUIService.ts**: Razorpay UI integration only - frontend payment widget (backend processes payments)
- **mediaApiService.ts**: Media API calls only - HTTP requests to backend media endpoints
- **cloudinaryUIService.ts**: Cloudinary UI widgets only - frontend upload interface (backend processes files)
- **messagingApiService.ts**: Messaging API calls only - HTTP requests to backend messaging endpoints
- **notificationApiService.ts**: Notification API calls only - HTTP requests to backend notification endpoints
- **blogApiService.ts**: Blog API calls only - HTTP requests to backend blog endpoints
- **contactApiService.ts**: Contact API calls only - HTTP requests to backend contact endpoints
- **progressApiService.ts**: Progress API calls only - HTTP requests to backend progress endpoints
- **portfolioApiService.ts**: Portfolio API calls only - HTTP requests to backend portfolio endpoints

##### Admin Services (Display Backend Data Only)
- **adminApiService.ts**: Admin API calls only - HTTP requests to backend admin endpoints (display backend data)
- **analyticsApiService.ts**: Analytics data fetching only - HTTP requests to get backend-calculated analytics (no frontend calculations)
- **auditApiService.ts**: Audit logs API calls only - HTTP requests to backend audit endpoints (display backend audit data)
- **webhookApiService.ts**: Webhook data API calls only - HTTP requests to backend webhook endpoints (display backend webhook data)

##### Infrastructure Services (UI Only)
- **socketClient.ts**: WebSocket connection only - Socket.io client for UI updates (backend handles all message processing)
- **socketEventHandlers.ts**: UI update handlers only - update UI state from WebSocket events (no message processing)
- **analyticsUIService.ts**: UI analytics tracking only - frontend performance tracking with Google Analytics/Sentry

#### Stores Implementation

##### Zustand Stores (UI State Only - No Business Logic)
- **authStore.ts**: Authentication UI state only - token, user data from API, isAuthenticated boolean (no auth logic)
- **userStore.ts**: User profile UI state only - profile data from API, UI preferences (no profile processing)
- **uiStore.ts**: UI state management only - modal states, drawer states, loading states, theme settings
- **notificationStore.ts**: Notification UI state only - notification display state, UI notification queue (no notification processing)
- **cacheStore.ts**: Client-side API cache only - cached API responses for performance (no data processing)
- **adminStore.ts**: Admin UI state only - admin dashboard state, UI settings (no admin logic)
- **projectStore.ts**: Project UI state only - selected projects, UI filters, display preferences (no project logic)
- **requestStore.ts**: Request UI state only - selected requests, UI filters, form state (no request processing)
- **quoteStore.ts**: Quote UI state only - selected quotes, UI filters, display state (no quote calculations)
- **paymentStore.ts**: Payment UI state only - payment form state, UI payment status (no payment processing)
- **messagingStore.ts**: Messaging UI state only - chat UI state, selected conversations (no message processing)

#### Types Implementation

##### API Types
- **request.types.ts**: Define API request type definitions with request interfaces, request parameters, and request data types using TypeScript interfaces, request type definitions, and API request types
- **response.types.ts**: Create API response type definitions with response interfaces, response data, and response types using TypeScript interfaces, response type definitions, and API response types
- **error.types.ts**: Implement API error type definitions with error interfaces, error data, and error types using TypeScript interfaces, error type definitions, and API error types

##### Model Types
- **user.types.ts**: Define user model types with user interfaces, user data types, and user model definitions using TypeScript interfaces, user type definitions, and user model types
- **project.types.ts**: Create project model types with project interfaces, project data types, and project model definitions using TypeScript interfaces, project type definitions, and project model types
- **request.types.ts**: Build request model types with request interfaces, request data types, and request model definitions using TypeScript interfaces, request type definitions, and request model types
- **quote.types.ts**: Implement quote model types with quote interfaces, quote data types, and quote model definitions using TypeScript interfaces, quote type definitions, and quote model types
- **payment.types.ts**: Create payment model types with payment interfaces, payment data types, and payment model definitions using TypeScript interfaces, payment type definitions, and payment model types
- **media.types.ts**: Build media model types with media interfaces, media data types, and media model definitions using TypeScript interfaces, media type definitions, and media model types
- **message.types.ts**: Implement message model types with message interfaces, message data types, and message model definitions using TypeScript interfaces, message type definitions, and message model types
- **notification.types.ts**: Create notification model types with notification interfaces, notification data types, and notification model definitions using TypeScript interfaces, notification type definitions, and notification model types
- **blog.types.ts**: Build blog model types with blog interfaces, blog data types, and blog model definitions using TypeScript interfaces, blog type definitions, and blog model types
- **contact.types.ts**: Implement contact model types with contact interfaces, contact data types, and contact model definitions using TypeScript interfaces, contact type definitions, and contact model types
- **progress.types.ts**: Create progress model types with progress interfaces, progress data types, and progress model definitions using TypeScript interfaces, progress type definitions, and progress model types
- **portfolio.types.ts**: Build portfolio model types with portfolio interfaces, portfolio data types, and portfolio model definitions using TypeScript interfaces, portfolio type definitions, and portfolio model types

##### Enum Types
- **userRole.enum.ts**: Define user role enumerations with user role constants, role definitions, and role types using TypeScript enums, role constants, and role type definitions
- **requestStatus.enum.ts**: Create request status enumerations with request status constants, status definitions, and status types using TypeScript enums, status constants, and status type definitions
- **quoteStatus.enum.ts**: Implement quote status enumerations with quote status constants, status definitions, and status types using TypeScript enums, status constants, and status type definitions
- **paymentStatus.enum.ts**: Build payment status enumerations with payment status constants, status definitions, and status types using TypeScript enums, status constants, and status type definitions
- **notificationType.enum.ts**: Create notification type enumerations with notification type constants, type definitions, and type types using TypeScript enums, type constants, and type type definitions

##### Form Types
- **auth.form.types.ts**: Define authentication form types with authentication form interfaces, form data types, and form validation types using TypeScript interfaces, form type definitions, and validation types
- **project.form.types.ts**: Create project form types with project form interfaces, form data types, and form validation types using TypeScript interfaces, form type definitions, and validation types
- **request.form.types.ts**: Build request form types with request form interfaces, form data types, and form validation types using TypeScript interfaces, form type definitions, and validation types
- **quote.form.types.ts**: Implement quote form types with quote form interfaces, form data types, and form validation types using TypeScript interfaces, form type definitions, and validation types
- **payment.form.types.ts**: Create payment form types with payment form interfaces, form data types, and form validation types using TypeScript interfaces, form type definitions, and validation types

#### Utils Implementation

##### UI Validation Utils (UX Only - No Business Logic)
- **formValidation.ts**: Basic form field validation for UX feedback only - required fields, format checking (backend handles all business validation)
- **inputFormatting.ts**: Input formatting and masking for better UX - phone numbers, dates, currency display formatting

##### Formatter Utils (Display Only)
- **dateFormatter.ts**: Date display formatting utilities - relative time, timezone display, date formatting for UI
- **currencyFormatter.ts**: Currency display formatting - locale-specific currency display for UI components
- **textFormatter.ts**: Text display formatting - truncation, content sanitization for display, markdown rendering for UI
- **numberFormatter.ts**: Number display formatting - percentage, decimal formatting for UI display

##### Helper Utils (UI Only)
- **errorDisplayHelper.ts**: Error message display helpers - format backend errors for user-friendly UI display
- **routeHelper.ts**: Route generation helpers - URL building, navigation utilities (no route validation)
- **uiStateHelper.ts**: UI state management helpers - component state utilities, UI state transformations
- **fileDisplayHelper.ts**: File display helpers - file icons, file name formatting, file size display
- **urlHelper.ts**: URL manipulation helpers - query string utilities, URL formatting for UI

##### UI-Specific Utils
- **domHelper.ts**: DOM manipulation helpers - scroll utilities, focus management, element utilities
- **animationHelper.ts**: Animation utilities - transition helpers, animation configurations
- **responsiveHelper.ts**: Responsive design helpers - breakpoint utilities, responsive behavior
- **accessibilityHelper.ts**: A11y helper functions - ARIA utilities, keyboard navigation helpers

#### Constants Implementation

##### UI Constants (Frontend Only)
- **api.constants.ts**: API endpoint URL constants only - backend endpoint URLs, timeout values for HTTP requests
- **routes.constants.ts**: Frontend route path constants - client-side route definitions, route parameters for navigation
- **ui.constants.ts**: UI constants - component sizes, spacing values, animation durations, breakpoint values
- **messages.constants.ts**: User-facing display messages - success messages, error display text, UI labels for internationalization
- **theme.constants.ts**: Theme and styling constants - color values, typography settings, design system tokens
- **status.constants.ts**: Status display constants - status labels, status colors, status icons for UI display

#### Styles Implementation

##### Theme Configuration
- **palette.ts**: Define color palette for the application with primary, secondary, and neutral colors, dark/light mode support, semantic color tokens, and accessibility-compliant color combinations for consistent visual design
- **typography.ts**: Create typography configuration with font families, font sizes, line heights, font weights, and typography scales for consistent text styling and readability across the application
- **shadows.ts**: Implement shadow definitions with elevation levels, shadow depths, and shadow variations for Material Design compliance and visual hierarchy in components and layouts
- **breakpoints.ts**: Build responsive breakpoint definitions with mobile, tablet, and desktop breakpoints, custom breakpoint values, and responsive design utilities for consistent responsive behavior

##### Global Styles
- **globals.css**: Create global CSS styles with CSS reset, base styles, global typography, and cross-browser compatibility styles for consistent styling foundation across the application
- **variables.css**: Define CSS custom properties with design tokens, color variables, spacing variables, and theme variables for dynamic theming and consistent design system implementation
- **animations.css**: Implement CSS animations with transition definitions, animation keyframes, loading animations, and micro-interactions for enhanced user experience and visual feedback

#### Routes Implementation

##### Route Configuration
- **AppRoutes.tsx**: Create main application routing configuration with React Router v6, route definitions, nested routing, lazy loading, and route protection for the entire application structure
- **UserRoutes.tsx**: Build user-specific routes with user dashboard routes, feature-specific routes, protected user routes, and role-based route access for authenticated users
- **AdminRoutes.tsx**: Implement admin-specific routes with admin dashboard routes, system management routes, admin-only features, and role-based admin access control
- **AuthRoutes.tsx**: Create authentication routes with login, register, password reset routes, public authentication routes, and authentication flow management
- **ProtectedRoute.tsx**: Build route protection wrapper with authentication checking, role-based access control, redirect logic, and route guard functionality for secure route access

#### Config Implementation

##### Application Configuration
- **env.config.ts**: Create environment variable configuration with environment-specific settings, API URLs, feature flags, and configuration validation for different deployment environments
- **api.config.ts**: Build API configuration with API endpoints, request configurations, timeout settings, and API client setup for consistent API communication
- **router.config.ts**: Implement router configuration with route definitions, navigation settings, route guards, and routing behavior configuration for application navigation
- **theme.config.ts**: Create theme configuration with theme settings, color schemes, typography configurations, and design system settings for consistent visual design
- **role.config.ts**: Define UI-only role configuration used to show/hide features based on backend-provided roles; backend enforces permissions
- **analytics.config.ts**: Implement analytics configuration with Google Analytics settings, event tracking, user analytics, and performance monitoring configuration
- **sentry.config.ts**: Create Sentry configuration with error tracking settings, performance monitoring, release tracking, and error reporting configuration for application monitoring

#### Lib Implementation

##### Third-party Library Configuration
- **reactQuery.ts**: Configure React Query client with query defaults, cache settings, error handling, and React Query DevTools integration for server state management
- **axios.ts**: Set up Axios instance configuration with base URL, interceptors, timeout settings, and request/response transformation for HTTP client setup
- **socketio.ts**: Configure Socket.io client with connection settings, event handlers, reconnection logic, and WebSocket communication setup for real-time features
- **cloudinary.ts**: Set up Cloudinary integration with upload presets, transformation settings, media management, and image optimization configuration
- **razorpay.ts**: Configure Razorpay SDK loading and client UI options; backend owns payment settings, webhooks, and processing
- **yup.ts**: Set up form validation schemas with validation rules, error messages, and form validation configuration for consistent form validation
- **framerMotion.ts**: Configure animation library with animation presets, transition settings, and animation configuration for smooth user interactions
- **dompurify.ts**: Set up HTML sanitization with sanitization rules, allowed tags, and XSS protection configuration for secure content rendering
- **workbox.ts**: Configure PWA service worker with caching strategies, offline support, and service worker management for progressive web app functionality
- **webVitals.ts**: Set up performance monitoring with Core Web Vitals tracking, performance metrics, and user experience monitoring configuration
- **i18n.ts**: Configure internationalization with language settings, translation management, and localization setup for multi-language support

#### Context Implementation

##### React Contexts
- **AuthContext.tsx**: Create authentication context provider with authentication state, user data, login/logout functionality, and authentication state management for global authentication access
- **ThemeContext.tsx**: Build theme context provider with theme state, theme switching, dark/light mode support, and theme persistence for global theme management
- **NotificationContext.tsx**: Implement notification context provider with notification state, notification management, toast notifications, and notification system for global notification handling

#### Main Application Files

##### Core Application
- **App.tsx**: Create main React application component with routing setup, theme provider, context providers, error boundaries, and global state initialization
- **main.tsx**: Build application entry point with React 18 createRoot API, service worker registration, performance monitoring setup, and development tools integration
- **vite-env.d.ts**: Define Vite environment type definitions for import.meta.env variables, module declarations, and global type extensions

#### Testing Implementation

##### Test Setup
- **setup.ts**: Configure Jest testing environment with React Testing Library setup, MSW handlers, custom matchers, and global test utilities
- **handlers.ts**: Define MSW request handlers for API mocking with realistic response data, error scenarios, and network delay simulation
- **test-utils.tsx**: Create custom testing utilities with providers wrapper, user event setup, and common test helpers for component testing

##### Component Tests
- **Button.test.tsx**: Test button component with different variants, loading states, click handlers, and accessibility features
- **Input.test.tsx**: Test input component with validation states, error handling, and user interactions
- **useAuth.test.ts**: Test authentication hook with login/logout functionality, token management, and error handling
- **authService.test.ts**: Test authentication service with API calls, token storage, and error scenarios
- **authStore.test.ts**: Test Zustand auth store with state updates, persistence, and middleware functionality

#### Storybook Implementation

##### Storybook Configuration
- **main.ts**: Configure Storybook with React, TypeScript, and MUI addons, webpack configuration, and story discovery patterns
- **preview.ts**: Set up global decorators, parameters, and addon configurations for consistent story rendering
- **manager.ts**: Configure Storybook manager UI with custom themes, addon panels, and toolbar customization

##### Component Stories
- **Button.stories.tsx**: Create stories for button component with different variants, sizes, states, and interactive controls
- **Input.stories.tsx**: Create stories for input component with validation states, error messages, and user interactions
- **ProjectCard.stories.tsx**: Create stories for project card component with different project types, statuses, and actions
- **UserProfile.stories.tsx**: Create stories for user profile component with different user roles and profile states
- **AdminDashboard.stories.tsx**: Create stories for admin dashboard components with different data scenarios and user permissions

---

## 🚀 Implementation Guidelines

### Development Approach
1. **Start with Core Infrastructure**: Begin with configuration files, types, constants, and basic services
2. **Implement Authentication First**: Build auth system before other features
3. **Follow Feature-Based Organization**: Implement features one by one following the directory structure
4. **Use Progressive Enhancement**: Start with basic functionality, then add advanced features
5. **Maintain Consistent Patterns**: Follow established patterns for similar components and services
6. **Implement Testing Early**: Write tests alongside feature development for better code quality
7. **Document Components**: Use Storybook for component documentation and design system
8. **Focus on Performance**: Implement lazy loading, code splitting, and optimization from the start

### Code Quality Standards
1. **TypeScript Strict Mode**: Ensure all code follows strict TypeScript rules
2. **Component Composition**: Use composition over inheritance for reusable components
3. **Custom Hooks**: Extract reusable logic into custom hooks
4. **Error Boundaries**: Wrap feature components with error boundaries
5. **Accessibility**: Ensure all components meet WCAG guidelines
6. **Performance**: Implement lazy loading, memoization, and optimization techniques

### Testing Strategy
1. **Unit Tests**: Test individual components, hooks, and utilities with Jest and React Testing Library
2. **Integration Tests**: Test component interactions and API calls with MSW for API mocking
3. **E2E Tests**: Test complete user flows with Cypress or Playwright for critical user journeys
4. **Visual Regression**: Use tools like Chromatic for visual testing and component documentation
5. **Accessibility Tests**: Ensure components meet WCAG guidelines with automated accessibility testing
6. **Performance Tests**: Monitor component performance and bundle size with Web Vitals
7. **Storybook Testing**: Use Storybook for visual testing and component isolation

### Deployment Considerations
1. **Environment Configuration**: Properly configure different environments
2. **Build Optimization**: Implement code splitting and asset optimization
3. **Performance Monitoring**: Set up Web Vitals and error tracking
4. **Security Headers**: Configure proper security headers in Nginx
5. **CDN Integration**: Set up CDN for static assets

### Maintenance Guidelines
1. **Documentation**: Keep code well-documented with JSDoc comments and Storybook stories
2. **Code Reviews**: Implement thorough code review processes with automated checks
3. **Version Control**: Use proper branching and release strategies with semantic versioning
4. **Dependency Management**: Regularly update dependencies and audit for security vulnerabilities
5. **Monitoring**: Set up comprehensive monitoring and alerting with Sentry and analytics
6. **Performance Monitoring**: Track Core Web Vitals and user experience metrics
7. **Accessibility Audits**: Regular accessibility testing and compliance checks
8. **Security Updates**: Keep security dependencies updated and follow security best practices

### Additional Configuration Files

#### Jest Configuration
- **jest.config.js**: Configure Jest testing framework with React Testing Library setup, MSW integration, coverage reporting, and test environment configuration
- **jest.setup.js**: Set up Jest testing environment with global test utilities, custom matchers, and test configuration
- **setupTests.ts**: Configure testing environment with React Testing Library setup, MSW handlers, and global test utilities

#### MSW Configuration
- **msw.config.js**: Configure Mock Service Worker for API mocking with request handlers, response scenarios, and network simulation

### Development Workflow Enhancements

#### Pre-commit Hooks
- **Husky Configuration**: Set up pre-commit hooks for linting, formatting, and testing
- **Lint-staged**: Configure staged file linting and formatting before commits

#### CI/CD Pipeline
- **GitHub Actions**: Set up automated testing, building, and deployment workflows
- **Quality Gates**: Implement code quality checks, test coverage requirements, and security scanning

### Performance Optimization

#### Bundle Analysis
- **Bundle Analyzer**: Configure webpack bundle analyzer for optimization insights
- **Code Splitting**: Implement route-based and component-based code splitting
- **Lazy Loading**: Set up lazy loading for routes and heavy components

#### Caching Strategy
- **Service Worker**: Configure Workbox for offline support and caching strategies
- **React Query**: Implement intelligent caching and background updates
- **Local Storage**: Use Zustand persistence for client-side state caching

This implementation guide provides a comprehensive roadmap for building the NestLancer frontend application. Follow the directory structure and implementation instructions to create a scalable, maintainable, and feature-rich application with modern development practices, comprehensive testing, and performance optimization.
