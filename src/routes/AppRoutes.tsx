/**
 * Application Routes
 * Main routing configuration for the NestLancer application
 * Handles authenticated and public routes with role-based access
 */

import { Box, CircularProgress, Typography } from '@mui/material'
import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Providers and Layout
import { AppLayout } from '@/components/layout/AppLayout'
import { UserLayout } from '@/components/layout/UserLayout'
import { ErrorBoundary } from '@/components/shared/ErrorBoundaries'
import { initializeAuth } from '@/stores/authStore'

// Route Components
import AuthRoutes from './AuthRoutes'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

// Page Components (Lazy loaded)
const HomePage = React.lazy(() => import('@/pages/Home/HomePage'))
const DashboardPage = React.lazy(() => import('@/pages/Dashboard/DashboardPage'))
const ProfilePage = React.lazy(() => import('@/pages/Profile/ProfilePage'))
const ProjectsPage = React.lazy(() => import('@/pages/Projects/ProjectsPage'))
const RequestsPage = React.lazy(() => import('@/pages/Requests/RequestsPage'))
const QuotesPage = React.lazy(() => import('@/pages/Quotes/QuotesPage'))
const PaymentsPage = React.lazy(() => import('@/pages/Payments/PaymentsPage'))
const PortfolioPage = React.lazy(() => import('@/pages/Portfolio/PortfolioPage'))
const BlogPage = React.lazy(() => import('@/pages/Blog/BlogPage'))
const ContactPage = React.lazy(() => import('@/pages/Contact/ContactPage'))
const AdminPage = React.lazy(() => import('@/pages/Admin/AdminPage'))
const NotFoundPage = React.lazy(() => import('@/pages/NotFound/NotFoundPage'))

// User Pages (Lazy loaded)
const UserDashboardPage = React.lazy(() => import('@/pages/user/dashboard/UserDashboardPage'))
const UserProjectsPage = React.lazy(() => import('@/pages/user/projects/ProjectListPage'))
const UserRequestsPage = React.lazy(() => import('@/pages/user/requests/RequestListPage'))
const UserQuotesPage = React.lazy(() => import('@/pages/user/quotes/QuoteListPage'))
const UserPaymentsPage = React.lazy(() => import('@/pages/user/payments/PaymentHistoryPage'))
const UserMessagingPage = React.lazy(() => import('@/pages/user/messaging/MessagingPage'))
const UserSettingsPage = React.lazy(() => import('@/pages/user/profile/SettingsPage'))
const UserProfilePage = React.lazy(() => import('@/pages/user/profile/ProfilePage'))
const UserProfileEditPage = React.lazy(() => import('@/pages/user/profile/ProfileEditPage'))
const UserMediaPage = React.lazy(() => import('@/pages/user/media/MediaGalleryPage'))
const UserProgressPage = React.lazy(() => import('@/pages/user/progress/ProgressTimelinePage'))
const UserNotificationsPage = React.lazy(() => import('@/pages/user/notifications/NotificationCenterPage'))
const UserPortfolioPage = React.lazy(() => import('@/pages/user/portfolio/PortfolioPage'))
const UserBlogPage = React.lazy(() => import('@/pages/user/blog/BlogListPage'))
const UserContactPage = React.lazy(() => import('@/pages/user/contact/ContactPage'))

// User Request Pages
const UserRequestCreatePage = React.lazy(() => import('@/pages/user/requests/RequestCreatePage'))
const UserRequestDetailPage = React.lazy(() => import('@/pages/user/requests/RequestDetailPage'))

// User Quote Pages
const UserQuoteDetailPage = React.lazy(() => import('@/pages/user/quotes/QuoteDetailPage'))
const UserQuoteAcceptPage = React.lazy(() => import('@/pages/user/quotes/QuoteAcceptPage'))

// User Project Pages
const UserProjectDetailPage = React.lazy(() => import('@/pages/user/projects/ProjectDetailPage'))

// User Media Pages
const UserMediaUploadPage = React.lazy(() => import('@/pages/user/media/MediaUploadPage'))
const UserMediaBrowserPage = React.lazy(() => import('@/pages/user/media/MediaBrowserPage'))

// User Progress Pages
const UserMilestoneTrackingPage = React.lazy(() => import('@/pages/user/progress/MilestoneTrackingPage'))

// User Blog Pages
const UserBlogPostPage = React.lazy(() => import('@/pages/user/blog/BlogPostPage'))

// Loading component
const PageLoader: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      gap: 2,
    }}
  >
    <CircularProgress size={48} />
    <Typography variant="body1" color="text.secondary">
      Loading...
    </Typography>
  </Box>
)

/**
 * Application Routes Component
 * Main routing configuration with providers
 */
export const AppRoutes: React.FC = () => {
  // Initialize auth state on app start
  React.useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Portfolio (Public) */}
          <Route path="/portfolio" element={
            <PublicRoute>
              <PortfolioPage />
            </PublicRoute>
          } />
          
          {/* Blog (Public) */}
          <Route path="/blog/*" element={
            <PublicRoute>
              <BlogPage />
            </PublicRoute>
          } />
          
          {/* Contact (Public) */}
          <Route path="/contact" element={
            <PublicRoute>
              <ContactPage />
            </PublicRoute>
          } />
          
          {/* Authentication Routes */}
          <Route path="/auth/*" element={<AuthRoutes />} />

          {/* User Routes */}
          <Route path="/user" element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }>
            {/* Dashboard */}
            <Route index element={<Navigate to="/user/dashboard" replace />} />
            <Route path="dashboard" element={<UserDashboardPage />} />

            {/* Profile */}
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="profile/edit" element={<UserProfileEditPage />} />

            {/* Projects */}
            <Route path="projects" element={<UserProjectsPage />} />
            <Route path="projects/:id" element={<UserProjectDetailPage />} />

            {/* Requests */}
            <Route path="requests" element={<UserRequestsPage />} />
            <Route path="requests/create" element={<UserRequestCreatePage />} />
            <Route path="requests/:id" element={<UserRequestDetailPage />} />

            {/* Quotes */}
            <Route path="quotes" element={<UserQuotesPage />} />
            <Route path="quotes/:id" element={<UserQuoteDetailPage />} />
            <Route path="quotes/:id/accept" element={<UserQuoteAcceptPage />} />

            {/* Payments */}
            <Route path="payments" element={<UserPaymentsPage />} />

            {/* Messaging */}
            <Route path="messages" element={<UserMessagingPage />} />

            {/* Media */}
            <Route path="media" element={<UserMediaPage />} />
            <Route path="media/upload" element={<UserMediaUploadPage />} />
            <Route path="media/browser" element={<UserMediaBrowserPage />} />

            {/* Progress */}
            <Route path="progress" element={<UserProgressPage />} />
            <Route path="progress/milestones" element={<UserMilestoneTrackingPage />} />

            {/* Notifications */}
            <Route path="notifications" element={<UserNotificationsPage />} />

            {/* Portfolio */}
            <Route path="portfolio" element={<UserPortfolioPage />} />

            {/* Blog */}
            <Route path="blog" element={<UserBlogPage />} />
            <Route path="blog/:id" element={<UserBlogPostPage />} />

            {/* Settings */}
            <Route path="settings" element={<UserSettingsPage />} />

            {/* Contact */}
            <Route path="contact" element={<UserContactPage />} />
          </Route>

          {/* Protected Application Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <AppLayout showSidebar={true} />
            </ProtectedRoute>
          }>
            {/* Dashboard */}
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            
            {/* Profile */}
            <Route path="profile" element={<ProfilePage />} />
            
            {/* Projects */}
            <Route path="projects/*" element={<ProjectsPage />} />
            
            {/* Requests */}
            <Route path="requests/*" element={<RequestsPage />} />
            
            {/* Quotes */}
            <Route path="quotes/*" element={<QuotesPage />} />
            
            {/* Payments */}
            <Route path="payments/*" element={<PaymentsPage />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AppLayout showSidebar={true} />
            </ProtectedRoute>
          }>
            <Route index element={<AdminPage />} />
          </Route>
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default AppRoutes