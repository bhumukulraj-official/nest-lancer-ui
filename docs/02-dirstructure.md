# Directory Structure - NestLancer Frontend

## 🎯 Overview
Complete directory structure for the NestLancer frontend application based on the architecture and technology stack.

```
nest-lancer-frontend/
│
├── public/                                 # Static assets served directly
│   ├── favicon.ico
│   ├── logo.svg
│   ├── manifest.json
│   └── robots.txt
│
├── src/                                    # Source code directory
│   │
│   ├── assets/                             # Static assets (images, fonts, icons)
│   │   ├── images/
│   │   │   ├── logo/
│   │   │   ├── icons/
│   │   │   └── illustrations/
│   │   ├── fonts/
│   │   └── videos/
│   │
│   ├── components/                         # Reusable UI components
│   │   │
│   │   ├── shared/                         # Shared components used across the app
│   │   │   ├── LoadingStates/
│   │   │   │   ├── Spinner.tsx
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   └── ProgressBar.tsx
│   │   │   ├── ErrorBoundaries/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── ErrorFallback.tsx
│   │   │   ├── FormControls/
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── TextArea.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Checkbox.tsx
│   │   │   │   ├── Radio.tsx
│   │   │   │   ├── DatePicker.tsx
│   │   │   │   └── FileUpload.tsx
│   │   │   ├── DataDisplay/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Avatar.tsx
│   │   │   │   ├── Chip.tsx
│   │   │   │   └── Tooltip.tsx
│   │   │   ├── Navigation/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   ├── Tabs.tsx
│   │   │   │   └── Pagination.tsx
│   │   │   ├── Guards/
│   │   │   │   ├── RoleGuard.tsx
│   │   │   │   ├── AdminGuard.tsx
│   │   │   │   └── AuthGuard.tsx
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Dialog.tsx
│   │   │   │   └── Drawer.tsx
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── IconButton.tsx
│   │   │   │   └── LoadingButton.tsx
│   │   │   └── Toast/
│   │   │       └── Toast.tsx
│   │   │   ├── Chart/
│   │   │   │   ├── LineChart.tsx
│   │   │   │   ├── BarChart.tsx
│   │   │   │   ├── PieChart.tsx
│   │   │   │   ├── AreaChart.tsx
│   │   │   │   └── ChartContainer.tsx
│   │   │   └── Table/
│   │   │       ├── DataTable.tsx
│   │   │       ├── DataGrid.tsx
│   │   │       ├── TableFilters.tsx
│   │   │       └── TablePagination.tsx
│   │   │
│   │   ├── layout/                         # Layout components
│   │   │   ├── AppLayout/
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── AuthLayout/
│   │   │   │   ├── AuthLayout.tsx
│   │   │   │   └── AuthHeader.tsx
│   │   │   ├── UserLayout/
│   │   │   │   ├── UserLayout.tsx
│   │   │   │   ├── UserHeader.tsx
│   │   │   │   ├── UserSidebar.tsx
│   │   │   │   └── UserContent.tsx
│   │   │   └── AdminLayout/
│   │   │       ├── AdminLayout.tsx
│   │   │       ├── AdminHeader.tsx
│   │   │       ├── AdminSidebar.tsx
│   │   │       ├── AdminContent.tsx
│   │   │       └── AdminNavigation.tsx
│   │   │
│   │   └── features/                       # Feature-specific components
│   │       ├── auth/                        # Authentication components
│   │       │   ├── LoginForm.tsx
│   │       │   ├── RegisterForm.tsx
│   │       │   ├── ForgotPasswordForm.tsx
│   │       │   ├── ResetPasswordForm.tsx
│   │       │   └── EmailVerificationForm.tsx
│   │       ├── dashboard/                   # Dashboard components
│   │       │   ├── DashboardOverview.tsx
│   │       │   ├── ActivityFeed.tsx
│   │       │   ├── StatsCards.tsx
│   │       │   └── RecentActivity.tsx
│   │       ├── profile/                     # Profile management components
│   │       │   ├── ProfileForm.tsx
│   │       │   ├── AvatarUpload.tsx
│   │       │   ├── SettingsForm.tsx
│   │       │   └── ProfileCard.tsx
│   │       ├── projects/                    # Project components
│   │       │   ├── ProjectCard.tsx
│   │       │   ├── ProjectList.tsx
│   │       │   ├── ProjectDetail.tsx
│   │       │   ├── ProjectGallery.tsx
│   │       │   ├── ProjectSearch.tsx
│   │       │   └── ProjectFilters.tsx
│   │       ├── requests/                    # Request components
│   │       │   ├── RequestCard.tsx
│   │       │   ├── RequestList.tsx
│   │       │   ├── RequestDetail.tsx
│   │       │   ├── RequestForm.tsx
│   │       │   ├── RequestTracking.tsx
│   │       │   └── RequestStatus.tsx
│   │       ├── quotes/                      # Quote components
│   │       │   ├── QuoteCard.tsx
│   │       │   ├── QuoteList.tsx
│   │       │   ├── QuoteDetail.tsx
│   │       │   ├── QuoteForm.tsx
│   │       │   └── QuoteAcceptance.tsx
│   │       ├── payments/                    # Payment components
│   │       │   ├── PaymentForm.tsx
│   │       │   ├── PaymentMethods.tsx
│   │       │   ├── PaymentHistory.tsx
│   │       │   ├── PaymentReceipt.tsx
│   │       │   └── RazorpayCheckout.tsx
│   │       ├── progress/                    # Progress & milestones components
│   │       │   ├── ProgressTimeline.tsx
│   │       │   ├── MilestoneCard.tsx
│   │       │   ├── ProgressTracker.tsx
│   │       │   └── MilestoneForm.tsx
│   │       ├── portfolio/                   # Portfolio components
│   │       │   ├── PortfolioView.tsx
│   │       │   ├── FeaturedProjects.tsx
│   │       │   ├── PortfolioStats.tsx
│   │       │   ├── TechnologyStack.tsx
│   │       │   └── PortfolioCard.tsx
│   │       ├── media/                       # Media management components
│   │       │   ├── MediaUpload.tsx
│   │       │   ├── MediaGallery.tsx
│   │       │   ├── MediaEditor.tsx
│   │       │   ├── MediaBrowser.tsx
│   │       │   └── CloudinaryWidget.tsx
│   │       ├── messaging/                   # Messaging components
│   │       │   ├── ChatInterface.tsx
│   │       │   ├── ConversationList.tsx
│   │       │   ├── MessageComposer.tsx
│   │       │   ├── MessageBubble.tsx
│   │       │   └── TypingIndicator.tsx
│   │       ├── notifications/               # Notification components
│   │       │   ├── NotificationCenter.tsx
│   │       │   ├── NotificationBell.tsx
│   │       │   ├── NotificationItem.tsx
│   │       │   └── NotificationBadge.tsx
│   │       ├── blog/                        # Blog components
│   │       │   ├── BlogCard.tsx
│   │       │   ├── BlogList.tsx
│   │       │   ├── BlogPost.tsx
│   │       │   ├── BlogComments.tsx
│   │       │   └── BlogEditor.tsx
│   │       ├── contact/                     # Contact components
│   │       │   ├── ContactForm.tsx
│   │       │   └── ContactInfo.tsx
│   │       └── admin/                       # Admin components
│   │           ├── dashboard/               # Admin dashboard components
│   │           │   ├── AdminOverview.tsx
│   │           │   ├── SystemMetrics.tsx
│   │           │   ├── RealTimeStats.tsx
│   │           │   └── HealthMonitor.tsx
│   │           ├── analytics/               # Admin analytics components
│   │           │   ├── UserAnalytics.tsx
│   │           │   ├── RequestAnalytics.tsx
│   │           │   ├── PaymentAnalytics.tsx
│   │           │   ├── QuoteAnalytics.tsx
│   │           │   ├── RateLimitAnalytics.tsx
│   │           │   └── AnalyticsCharts.tsx
│   │           ├── users/                   # User management components
│   │           │   ├── UserList.tsx
│   │           │   ├── UserDetail.tsx
│   │           │   ├── UserEditForm.tsx
│   │           │   ├── UserStatusManager.tsx
│   │           │   └── BulkUserActions.tsx
│   │           ├── projects/                # Project management components
│   │           │   ├── ProjectCreateForm.tsx
│   │           │   ├── ProjectEditForm.tsx
│   │           │   ├── ProjectDeleteDialog.tsx
│   │           │   ├── ProjectRestoreDialog.tsx
│   │           │   ├── BulkProjectActions.tsx
│   │           │   ├── ProjectTechStack.tsx
│   │           │   └── ProjectTestimonials.tsx
│   │           ├── requests/                # Request management components
│   │           │   ├── RequestListAdmin.tsx
│   │           │   ├── RequestDetailAdmin.tsx
│   │           │   ├── RequestStatusManager.tsx
│   │           │   └── BulkRequestActions.tsx
│   │           ├── quotes/                  # Quote management components
│   │           │   ├── QuoteListAdmin.tsx
│   │           │   ├── QuoteDetailAdmin.tsx
│   │           │   ├── QuoteStatusManager.tsx
│   │           │   └── BulkQuoteActions.tsx
│   │           ├── payments/                # Payment management components
│   │           │   ├── PaymentListAdmin.tsx
│   │           │   ├── PaymentDetailAdmin.tsx
│   │           │   ├── RefundManager.tsx
│   │           │   └── PaymentAnalyticsAdmin.tsx
│   │           ├── progress/                # Progress management components
│   │           │   ├── ProgressUpdates.tsx
│   │           │   ├── MilestoneManager.tsx
│   │           │   └── ProgressAnalytics.tsx
│   │           ├── media/                   # Media management components
│   │           │   ├── MediaListAdmin.tsx
│   │           │   ├── MediaDetailAdmin.tsx
│   │           │   ├── MediaVisibilityManager.tsx
│   │           │   ├── BulkMediaActions.tsx
│   │           │   └── StorageAdmin.tsx
│   │           ├── blog/                    # Blog management components
│   │           │   ├── BlogCreateForm.tsx
│   │           │   ├── BlogEditForm.tsx
│   │           │   ├── BlogDeleteDialog.tsx
│   │           │   └── BlogCommentsManager.tsx
│   │           ├── contact/                 # Contact management components
│   │           │   ├── ContactMessages.tsx
│   │           │   ├── MessageInbox.tsx
│   │           │   ├── MessageStatusManager.tsx
│   │           │   └── ContactAnalytics.tsx
│   │           ├── system/                  # System administration components
│   │           │   ├── SystemConfigForm.tsx
│   │           │   ├── ApiKeyManager.tsx
│   │           │   ├── SystemInfo.tsx
│   │           │   ├── SystemHealth.tsx
│   │           │   └── EnvironmentConfig.tsx
│   │           ├── audit/                   # Audit & monitoring components
│   │           │   ├── AuditLogs.tsx
│   │           │   ├── AuditFilters.tsx
│   │           │   ├── AuditExport.tsx
│   │           │   └── AuditAnalytics.tsx
│   │           └── webhooks/                # Webhook management components
│   │               ├── WebhookLogs.tsx
│   │               ├── WebhookConfig.tsx
│   │               ├── WebhookMonitoring.tsx
│   │               └── WebhookRetry.tsx
│   │
│   ├── pages/                              # Page components (routes)
│   │   │
│   │   ├── auth/                           # Authentication pages
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   ├── ResetPasswordPage.tsx
│   │   │   └── EmailVerificationPage.tsx
│   │   │
│   │   ├── user/                           # User-facing pages
│   │   │   ├── dashboard/
│   │   │   │   ├── UserDashboardPage.tsx
│   │   │   │   ├── OverviewSection.tsx
│   │   │   │   ├── ActivitySection.tsx
│   │   │   │   └── StatsSection.tsx
│   │   │   ├── profile/
│   │   │   │   ├── ProfilePage.tsx
│   │   │   │   ├── ProfileEditPage.tsx
│   │   │   │   └── SettingsPage.tsx
│   │   │   ├── projects/
│   │   │   │   ├── ProjectListPage.tsx
│   │   │   │   ├── ProjectDetailPage.tsx
│   │   │   │   ├── ProjectGalleryPage.tsx
│   │   │   │   └── ProjectSearchPage.tsx
│   │   │   ├── requests/
│   │   │   │   ├── RequestListPage.tsx
│   │   │   │   ├── RequestDetailPage.tsx
│   │   │   │   ├── RequestCreatePage.tsx
│   │   │   │   └── RequestTrackingPage.tsx
│   │   │   ├── quotes/
│   │   │   │   ├── QuoteListPage.tsx
│   │   │   │   ├── QuoteDetailPage.tsx
│   │   │   │   └── QuoteAcceptPage.tsx
│   │   │   ├── payments/
│   │   │   │   ├── PaymentFormPage.tsx
│   │   │   │   ├── PaymentMethodsPage.tsx
│   │   │   │   ├── PaymentHistoryPage.tsx
│   │   │   │   └── PaymentReceiptsPage.tsx
│   │   │   ├── progress/
│   │   │   │   ├── ProgressTimelinePage.tsx
│   │   │   │   └── MilestoneTrackingPage.tsx
│   │   │   ├── portfolio/
│   │   │   │   ├── PortfolioPage.tsx
│   │   │   │   ├── FeaturedProjectsPage.tsx
│   │   │   │   └── PortfolioStatsPage.tsx
│   │   │   ├── media/
│   │   │   │   ├── MediaUploadPage.tsx
│   │   │   │   ├── MediaGalleryPage.tsx
│   │   │   │   └── MediaBrowserPage.tsx
│   │   │   ├── messaging/
│   │   │   │   ├── MessagingPage.tsx
│   │   │   │   ├── ConversationListPage.tsx
│   │   │   │   └── ChatInterfacePage.tsx
│   │   │   ├── notifications/
│   │   │   │   └── NotificationCenterPage.tsx
│   │   │   ├── blog/
│   │   │   │   ├── BlogListPage.tsx
│   │   │   │   └── BlogPostPage.tsx
│   │   │   └── contact/
│   │   │       └── ContactPage.tsx
│   │   │
│   │   ├── admin/                          # Admin-only pages
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboardPage.tsx
│   │   │   │   ├── SystemMetricsSection.tsx
│   │   │   │   ├── RealTimeStatsSection.tsx
│   │   │   │   └── HealthMonitoringSection.tsx
│   │   │   ├── analytics/
│   │   │   │   ├── UserAnalyticsPage.tsx
│   │   │   │   ├── RequestAnalyticsPage.tsx
│   │   │   │   ├── PaymentAnalyticsPage.tsx
│   │   │   │   ├── QuoteAnalyticsPage.tsx
│   │   │   │   └── RateLimitAnalyticsPage.tsx
│   │   │   ├── users/
│   │   │   │   ├── UserListPage.tsx
│   │   │   │   ├── UserDetailPage.tsx
│   │   │   │   └── UserEditPage.tsx
│   │   │   ├── projects/
│   │   │   │   ├── ProjectListPage.tsx
│   │   │   │   ├── ProjectCreatePage.tsx
│   │   │   │   ├── ProjectEditPage.tsx
│   │   │   │   └── ProjectManagementPage.tsx
│   │   │   ├── requests/
│   │   │   │   ├── RequestListPage.tsx
│   │   │   │   └── RequestDetailPage.tsx
│   │   │   ├── quotes/
│   │   │   │   ├── QuoteListPage.tsx
│   │   │   │   └── QuoteDetailPage.tsx
│   │   │   ├── payments/
│   │   │   │   ├── PaymentListPage.tsx
│   │   │   │   ├── PaymentDetailPage.tsx
│   │   │   │   └── RefundManagementPage.tsx
│   │   │   ├── progress/
│   │   │   │   ├── ProgressUpdatesPage.tsx
│   │   │   │   └── MilestoneManagementPage.tsx
│   │   │   ├── media/
│   │   │   │   ├── MediaListPage.tsx
│   │   │   │   ├── MediaDetailPage.tsx
│   │   │   │   └── StorageAdminPage.tsx
│   │   │   ├── blog/
│   │   │   │   ├── BlogListPage.tsx
│   │   │   │   ├── BlogCreatePage.tsx
│   │   │   │   └── BlogEditPage.tsx
│   │   │   ├── contact/
│   │   │   │   ├── ContactMessagesPage.tsx
│   │   │   │   └── MessageInboxPage.tsx
│   │   │   ├── system/
│   │   │   │   ├── SystemConfigPage.tsx
│   │   │   │   ├── ApiKeyManagementPage.tsx
│   │   │   │   ├── SystemInfoPage.tsx
│   │   │   │   └── EnvironmentConfigPage.tsx
│   │   │   ├── audit/
│   │   │   │   ├── AuditLogsPage.tsx
│   │   │   │   └── AuditAnalyticsPage.tsx
│   │   │   └── webhooks/
│   │   │       ├── WebhookLogsPage.tsx
│   │   │       ├── WebhookConfigPage.tsx
│   │   │       └── WebhookMonitoringPage.tsx
│   │   │
│   │   ├── NotFoundPage.tsx                # 404 page
│   │   └── HomePage.tsx                    # Landing page
│   │
│   ├── hooks/                              # Custom React hooks
│   │   ├── auth/
│   │   │   ├── useAuth.ts
│   │   │   ├── useLogin.ts
│   │   │   ├── useRegister.ts
│   │   │   ├── useLogout.ts
│   │   │   └── useAuthGuard.ts
│   │   ├── api/
│   │   │   ├── useQuery.ts
│   │   │   ├── useMutation.ts
│   │   │   ├── useInfiniteQuery.ts
│   │   │   └── useApiError.ts
│   │   ├── ui/
│   │   │   ├── useModal.ts
│   │   │   ├── useToast.ts
│   │   │   ├── useTheme.ts
│   │   │   ├── useBreakpoint.ts
│   │   │   └── useDebounce.ts
│   │   ├── form/
│   │   │   ├── useForm.ts
│   │   │   ├── useFormValidation.ts
│   │   │   └── useFileUpload.ts
│   │   ├── admin/
│   │   │   ├── useAdminGuard.ts
│   │   │   ├── useSystemMetrics.ts
│   │   │   └── useAdminAnalytics.ts
│   │   ├── features/
│   │   │   ├── useProjects.ts
│   │   │   ├── useRequests.ts
│   │   │   ├── useQuotes.ts
│   │   │   ├── usePayments.ts
│   │   │   ├── useMessaging.ts
│   │   │   ├── useNotifications.ts
│   │   │   └── useWebSocket.ts
│   │   └── common/
│   │       ├── useLocalStorage.ts
│   │       ├── useSessionStorage.ts
│   │       ├── useCopyToClipboard.ts
│   │       └── useDocumentTitle.ts
│   │
│   ├── services/                           # UI-only API services (no business logic)
│   │   ├── api/                            # Core API communication
│   │   │   ├── client.ts                   # Axios HTTP client configuration
│   │   │   ├── interceptors.ts             # Request/response interceptors (token, errors)
│   │   │   ├── endpoints.ts                # API endpoint URL constants
│   │   │   └── index.ts
│   │   ├── auth/                           # Authentication API calls only
│   │   │   ├── authApiService.ts           # Login/logout/register API calls only
│   │   │   ├── tokenService.ts             # JWT token storage/retrieval only
│   │   │   └── index.ts
│   │   ├── user/                           # User data API calls
│   │   │   ├── userApiService.ts           # User CRUD API calls only
│   │   │   ├── profileApiService.ts        # Profile API calls only
│   │   │   └── index.ts
│   │   ├── project/                        # Project data API calls
│   │   │   ├── projectApiService.ts        # Project API calls only
│   │   │   └── index.ts
│   │   ├── request/                        # Request data API calls
│   │   │   ├── requestApiService.ts        # Request API calls only
│   │   │   └── index.ts
│   │   ├── quote/                          # Quote data API calls
│   │   │   ├── quoteApiService.ts          # Quote API calls only
│   │   │   └── index.ts
│   │   ├── payment/                        # Payment UI integration
│   │   │   ├── paymentApiService.ts        # Payment API calls only
│   │   │   ├── razorpayUIService.ts        # Razorpay UI integration only
│   │   │   └── index.ts
│   │   ├── media/                          # Media upload UI integration
│   │   │   ├── mediaApiService.ts          # Media API calls only
│   │   │   ├── cloudinaryUIService.ts      # Cloudinary UI widget integration only
│   │   │   └── index.ts
│   │   ├── messaging/                      # Messaging API calls
│   │   │   ├── messagingApiService.ts      # Messaging API calls only
│   │   │   └── index.ts
│   │   ├── notification/                   # Notification API calls
│   │   │   ├── notificationApiService.ts   # Notification API calls only
│   │   │   └── index.ts
│   │   ├── blog/                           # Blog API calls
│   │   │   ├── blogApiService.ts           # Blog API calls only
│   │   │   └── index.ts
│   │   ├── contact/                        # Contact API calls
│   │   │   ├── contactApiService.ts        # Contact form API calls only
│   │   │   └── index.ts
│   │   ├── progress/                       # Progress data API calls
│   │   │   ├── progressApiService.ts       # Progress API calls only
│   │   │   └── index.ts
│   │   ├── portfolio/                      # Portfolio data API calls
│   │   │   ├── portfolioApiService.ts      # Portfolio API calls only
│   │   │   └── index.ts
│   │   ├── admin/                          # Admin API calls (display backend data)
│   │   │   ├── adminApiService.ts          # Admin API calls only
│   │   │   ├── analyticsApiService.ts      # Analytics data fetching only
│   │   │   ├── auditApiService.ts          # Audit logs API calls only
│   │   │   ├── webhookApiService.ts        # Webhook data API calls only
│   │   │   └── index.ts
│   │   ├── websocket/                      # Real-time UI updates only
│   │   │   ├── socketClient.ts             # WebSocket connection only
│   │   │   ├── socketEventHandlers.ts      # UI update handlers only
│   │   │   └── index.ts
│   │   └── ui/                             # UI-only services
│   │       ├── storageService.ts           # Browser storage wrapper only
│   │       ├── routerService.ts            # Navigation helpers only
│   │       ├── errorUIService.ts           # Error display helpers only
│   │       ├── analyticsUIService.ts       # UI analytics tracking only
│   │       └── index.ts
│   │
│   ├── stores/                             # Zustand state management stores
│   │   ├── authStore.ts                    # Authentication state
│   │   ├── userStore.ts                    # User profile state
│   │   ├── uiStore.ts                      # UI state (modals, drawers, etc.)
│   │   ├── notificationStore.ts            # Notifications state
│   │   ├── cacheStore.ts                   # Client-side cache
│   │   ├── adminStore.ts                   # Admin-specific state
│   │   ├── projectStore.ts                 # Projects state
│   │   ├── requestStore.ts                 # Requests state
│   │   ├── quoteStore.ts                   # Quotes state
│   │   ├── paymentStore.ts                 # Payments state
│   │   ├── messagingStore.ts               # Messaging state
│   │   └── index.ts
│   │
│   ├── types/                              # TypeScript type definitions
│   │   ├── api/
│   │   │   ├── request.types.ts
│   │   │   ├── response.types.ts
│   │   │   └── error.types.ts
│   │   ├── models/
│   │   │   ├── user.types.ts
│   │   │   ├── project.types.ts
│   │   │   ├── request.types.ts
│   │   │   ├── quote.types.ts
│   │   │   ├── payment.types.ts
│   │   │   ├── media.types.ts
│   │   │   ├── message.types.ts
│   │   │   ├── notification.types.ts
│   │   │   ├── blog.types.ts
│   │   │   ├── contact.types.ts
│   │   │   ├── progress.types.ts
│   │   │   └── portfolio.types.ts
│   │   ├── enums/
│   │   │   ├── userRole.enum.ts
│   │   │   ├── requestStatus.enum.ts
│   │   │   ├── quoteStatus.enum.ts
│   │   │   ├── paymentStatus.enum.ts
│   │   │   └── notificationType.enum.ts
│   │   ├── forms/
│   │   │   ├── auth.form.types.ts
│   │   │   ├── project.form.types.ts
│   │   │   ├── request.form.types.ts
│   │   │   ├── quote.form.types.ts
│   │   │   └── payment.form.types.ts
│   │   └── index.ts
│   │
│   ├── utils/                              # UI utility functions only
│   │   ├── validation/                     # UI form validation only (UX feedback)
│   │   │   ├── formValidation.ts           # Basic form field validation for UX
│   │   │   ├── inputFormatting.ts          # Input formatting and masking
│   │   │   └── index.ts
│   │   ├── formatters/                     # Data display formatting
│   │   │   ├── dateFormatter.ts            # Date display formatting
│   │   │   ├── currencyFormatter.ts        # Currency display formatting
│   │   │   ├── textFormatter.ts            # Text display formatting
│   │   │   ├── numberFormatter.ts          # Number display formatting
│   │   │   └── index.ts
│   │   ├── helpers/                        # UI helper functions
│   │   │   ├── errorDisplayHelper.ts       # Error message display helpers
│   │   │   ├── routeHelper.ts              # Route generation helpers
│   │   │   ├── uiStateHelper.ts            # UI state management helpers
│   │   │   ├── fileDisplayHelper.ts        # File display helpers (icons, names)
│   │   │   ├── urlHelper.ts                # URL manipulation helpers
│   │   │   └── index.ts
│   │   ├── ui/                             # UI-specific utilities
│   │   │   ├── domHelper.ts                # DOM manipulation helpers
│   │   │   ├── animationHelper.ts          # Animation utilities
│   │   │   ├── responsiveHelper.ts         # Responsive design helpers
│   │   │   ├── accessibilityHelper.ts      # A11y helper functions
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── constants/                          # UI application constants
│   │   ├── api.constants.ts                # API endpoint URLs only
│   │   ├── routes.constants.ts             # Frontend route paths
│   │   ├── ui.constants.ts                 # UI constants (colors, sizes, etc.)
│   │   ├── messages.constants.ts           # User-facing display messages
│   │   ├── theme.constants.ts              # Theme and styling constants
│   │   ├── status.constants.ts             # Status display constants
│   │   └── index.ts
│   │
│   ├── styles/                             # Global styles and theme
│   │   ├── theme/
│   │   │   ├── palette.ts
│   │   │   ├── typography.ts
│   │   │   ├── shadows.ts
│   │   │   ├── breakpoints.ts
│   │   │   └── index.ts
│   │   ├── globals.css                     # Global CSS styles
│   │   ├── variables.css                   # CSS variables
│   │   └── animations.css                  # Animation classes
│   │
│   ├── routes/                             # Route configuration
│   │   ├── AppRoutes.tsx                   # Main route configuration
│   │   ├── UserRoutes.tsx                  # User routes
│   │   ├── AdminRoutes.tsx                 # Admin routes
│   │   ├── AuthRoutes.tsx                  # Auth routes
│   │   ├── ProtectedRoute.tsx              # Protected route wrapper
│   │   └── index.ts
│   │
│   ├── config/                             # Configuration files
│   │   ├── env.config.ts                   # Environment variables
│   │   ├── api.config.ts                   # API configuration
│   │   ├── router.config.ts                # Router configuration
│   │   ├── theme.config.ts                 # Theme configuration
│   │   ├── role.config.ts                  # Role-based access configuration
│   │   ├── analytics.config.ts             # Analytics configuration
│   │   ├── sentry.config.ts                # Sentry configuration
│   │   └── index.ts
│   │
│   ├── lib/                                # Third-party library configurations
│   │   ├── reactQuery.ts                   # React Query configuration
│   │   ├── axios.ts                        # Axios configuration
│   │   ├── socketio.ts                     # Socket.io configuration
│   │   ├── cloudinary.ts                   # Cloudinary configuration
│   │   ├── razorpay.ts                     # Razorpay configuration
│   │   ├── yup.ts                          # Form validation configuration
│   │   ├── framerMotion.ts                 # Animation library configuration
│   │   ├── dompurify.ts                    # XSS protection configuration
│   │   ├── workbox.ts                      # PWA service worker configuration
│   │   ├── webVitals.ts                    # Performance monitoring configuration
│   │   └── i18n.ts                         # i18n configuration
│   │
│   ├── context/                            # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── index.ts
│   │
│   ├── App.tsx                             # Main App component
│   ├── main.tsx                            # Application entry point
│   └── vite-env.d.ts                       # Vite environment types
│
├── .env.development                        # Development environment variables
├── .env.production                         # Production environment variables
├── .env.example                            # Example environment variables
├── .gitignore                              # Git ignore rules
├── .eslintrc.json                          # ESLint configuration
├── .prettierrc                             # Prettier configuration
├── .prettierignore                         # Prettier ignore rules
├── tsconfig.json                           # TypeScript configuration
├── tsconfig.node.json                      # TypeScript config for Node
├── vite.config.ts                          # Vite configuration
├── package.json                            # NPM dependencies and scripts
├── package-lock.json                       # NPM lock file
├── README.md                               # Project documentation
├── Dockerfile                              # Docker configuration
├── docker-compose.yml                      # Docker Compose configuration
├── nginx.conf                              # Nginx configuration
├── .dockerignore                           # Docker ignore rules
├── 01-frontend-architecture.md             # Frontend architecture documentation
└── technology-stack.md                     # Technology stack documentation
```

## 📋 Directory Purpose Summary

### **Root Level**
- Configuration files for build tools, linting, and deployment
- Documentation files for architecture and tech stack

### **public/**
- Static assets served directly without processing
- PWA manifest and meta files

### **src/assets/**
- Images, fonts, videos, and other media assets
- Organized by asset type

### **src/components/**
- **shared/**: Reusable components used across the entire application
- **layout/**: Layout wrappers for different sections (app, auth, user, admin)
- **features/**: Feature-specific components grouped by domain

### **src/pages/**
- Route-level page components
- **auth/**: Authentication and authorization pages
- **user/**: User-facing pages organized by feature
- **admin/**: Admin-only pages for system management

### **src/hooks/**
- Custom React hooks for reusable logic
- Organized by domain (auth, api, ui, form, admin, features)

### **src/services/**
- **api/**: Core API communication layer (HTTP requests only)
- **UI-only services**: Services that only handle API calls and UI integrations
- **No business logic**: All business logic remains in backend
- **External UI integrations**: Razorpay UI, Cloudinary widgets, WebSocket client

### **src/stores/**
- Zustand stores for global state management
- Organized by domain with dedicated stores

### **src/types/**
- TypeScript type definitions and interfaces
- **api/**: API request/response types
- **models/**: Domain model types
- **enums/**: Enumeration types
- **forms/**: Form data types

### **src/utils/**
- **validation/**: UI form validation for user experience only
- **formatters/**: Data display formatting utilities
- **helpers/**: UI helper functions for display and navigation
- **ui/**: UI-specific utilities (DOM, animations, responsive design)

### **src/constants/**
- UI application constants
- API endpoint URLs, frontend routes, display messages, theme constants

### **src/styles/**
- Global styles and theme configuration
- MUI theme customization
- CSS variables and animations

### **src/routes/**
- Route configuration and route guards
- Separated by user type (user, admin, auth)

### **src/config/**
- Application configuration
- Environment-specific settings

### **src/lib/**
- Third-party library setup and configuration
- Configured instances of external libraries

### **src/context/**
- React Context providers for global state
- Theme, auth, and notification contexts

## 🎯 Key Features

1. **UI-Only Architecture**: Frontend focuses exclusively on user interface
2. **API-First Design**: All data operations through backend APIs
3. **Modular Structure**: Organized by feature and UI domain
4. **Type Safety**: Comprehensive TypeScript types for UI components
5. **Scalability**: Easy to add new UI features and display components
6. **Maintainability**: Consistent UI patterns and display-only logic
7. **Reusability**: Shared UI components and display utilities
8. **No Business Logic**: All business logic handled by backend services

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Services**: camelCase with `ApiService` or `UIService` suffix (e.g., `authApiService.ts`, `razorpayUIService.ts`)
- **Stores**: camelCase with `Store` suffix (e.g., `authStore.ts`)
- **Types**: PascalCase with `.types.ts` suffix
- **Constants**: UPPER_SNAKE_CASE in `.constants.ts` files
- **Utils**: camelCase with descriptive names

## 🚀 Development Workflow (UI-First Approach)

1. Start with route definitions in `src/routes/` for UI navigation
2. Create page components in `src/pages/` that display backend data
3. Build feature-specific UI components in `src/components/features/`
4. Implement API services in `src/services/` for backend communication only
5. Add UI state management in `src/stores/` (no business logic)
6. Create custom hooks in `src/hooks/` for UI logic only
7. Define types in `src/types/` for API responses and UI props
8. Focus on displaying backend data, not processing it

---

*This directory structure is designed to support a UI-only frontend application that displays backend data through APIs, with no business logic duplication and complete separation of concerns between frontend and backend.*

