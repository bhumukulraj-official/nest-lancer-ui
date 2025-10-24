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
│   ├── services/                           # API services and external integrations
│   │   ├── core/                            # Core infrastructure services
│   │   │   ├── routerService.ts             # Router service for navigation
│   │   │   ├── errorService.ts              # Error handling service
│   │   │   ├── permissionsService.ts        # Permissions and access control service
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── client.ts                   # Axios instance configuration
│   │   │   ├── interceptors.ts             # Request/response interceptors
│   │   │   ├── endpoints.ts                # API endpoint constants
│   │   │   └── index.ts
│   │   ├── auth/
│   │   │   ├── authService.ts
│   │   │   ├── tokenService.ts
│   │   │   └── index.ts
│   │   ├── user/
│   │   │   ├── userService.ts
│   │   │   ├── profileService.ts
│   │   │   └── index.ts
│   │   ├── project/
│   │   │   ├── projectService.ts
│   │   │   └── index.ts
│   │   ├── request/
│   │   │   ├── requestService.ts
│   │   │   └── index.ts
│   │   ├── quote/
│   │   │   ├── quoteService.ts
│   │   │   └── index.ts
│   │   ├── payment/
│   │   │   ├── paymentService.ts
│   │   │   ├── razorpayService.ts
│   │   │   └── index.ts
│   │   ├── media/
│   │   │   ├── mediaService.ts
│   │   │   ├── cloudinaryService.ts
│   │   │   └── index.ts
│   │   ├── messaging/
│   │   │   ├── messagingService.ts
│   │   │   └── index.ts
│   │   ├── notification/
│   │   │   ├── notificationService.ts
│   │   │   └── index.ts
│   │   ├── blog/
│   │   │   ├── blogService.ts
│   │   │   └── index.ts
│   │   ├── contact/
│   │   │   ├── contactService.ts
│   │   │   └── index.ts
│   │   ├── progress/
│   │   │   ├── progressService.ts
│   │   │   └── index.ts
│   │   ├── portfolio/
│   │   │   ├── portfolioService.ts
│   │   │   └── index.ts
│   │   ├── admin/
│   │   │   ├── adminService.ts
│   │   │   ├── analyticsService.ts
│   │   │   ├── auditService.ts
│   │   │   ├── webhookService.ts
│   │   │   └── index.ts
│   │   ├── websocket/
│   │   │   ├── socketService.ts
│   │   │   ├── socketHandlers.ts
│   │   │   └── index.ts
│   │   ├── storage/
│   │   │   ├── localStorageService.ts
│   │   │   ├── sessionStorageService.ts
│   │   │   └── index.ts
│   │   └── analytics/
│   │       ├── googleAnalyticsService.ts
│   │       ├── sentryService.ts
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
│   ├── utils/                              # Utility functions
│   │   ├── validation/
│   │   │   ├── authValidation.ts
│   │   │   ├── projectValidation.ts
│   │   │   ├── requestValidation.ts
│   │   │   ├── quoteValidation.ts
│   │   │   ├── paymentValidation.ts
│   │   │   └── index.ts
│   │   ├── formatters/
│   │   │   ├── dateFormatter.ts
│   │   │   ├── currencyFormatter.ts
│   │   │   ├── textFormatter.ts
│   │   │   └── index.ts
│   │   ├── helpers/
│   │   │   ├── errorHelper.ts
│   │   │   ├── routeHelper.ts
│   │   │   ├── permissionHelper.ts
│   │   │   ├── fileHelper.ts
│   │   │   └── index.ts
│   │   ├── security/
│   │   │   ├── encryption.ts
│   │   │   ├── sanitization.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── constants/                          # Application constants
│   │   ├── api.constants.ts                # API URLs and endpoints
│   │   ├── routes.constants.ts             # Route paths
│   │   ├── validation.constants.ts         # Validation rules
│   │   ├── config.constants.ts             # App configuration
│   │   ├── messages.constants.ts           # User-facing messages
│   │   ├── theme.constants.ts              # Theme configuration
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
- **core/**: Core infrastructure services (router, error handling, permissions)
- **api/**: API service layer for backend communication
- External service integrations (Razorpay, Cloudinary, Analytics)
- WebSocket connection management

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
- **validation/**: Validation schemas and functions
- **formatters/**: Data formatting utilities
- **helpers/**: General helper functions
- **security/**: Security-related utilities

### **src/constants/**
- Application-wide constants
- API endpoints, routes, validation rules, messages

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

1. **Modular Structure**: Organized by feature and domain
2. **Separation of Concerns**: Clear separation between UI, logic, and data
3. **Type Safety**: Comprehensive TypeScript types
4. **Scalability**: Easy to add new features and modules
5. **Maintainability**: Consistent patterns and organization
6. **Reusability**: Shared components and utilities

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Services**: camelCase with `Service` suffix (e.g., `authService.ts`)
- **Stores**: camelCase with `Store` suffix (e.g., `authStore.ts`)
- **Types**: PascalCase with `.types.ts` suffix
- **Constants**: UPPER_SNAKE_CASE in `.constants.ts` files
- **Utils**: camelCase with descriptive names

## 🚀 Development Workflow

1. Start with route definitions in `src/routes/`
2. Create page components in `src/pages/`
3. Build feature-specific components in `src/components/features/`
4. Implement services in `src/services/`
5. Add state management in `src/stores/`
6. Create custom hooks in `src/hooks/`
7. Define types in `src/types/`

---

*This directory structure is designed to support a scalable, maintainable, and well-organized frontend application that integrates seamlessly with the NestLancer backend API.*

