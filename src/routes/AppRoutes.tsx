/**
 * Application Routes
 * Main routing configuration for the NestLancer application
 * Handles authenticated and public routes with role-based access
 */

import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'

// Providers and Layout
import { initializeAuth } from '@/stores/authStore'
import { ErrorBoundary } from '@/components/shared/ErrorBoundaries'
import { AppLayout } from '@/components/layout/AppLayout'

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
          
          {/* Protected Application Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <AppLayout />
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
          <Route path="/admin/*" element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          } />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default AppRoutes