/**
 * Application Routes
 * Main routing configuration for the NestLancer application
 * Handles authenticated and public routes with role-based access
 */

import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

// Providers and Layout
import { theme } from '@/styles/theme'
import { initializeAuth } from '@/stores/authStore'
import { ToastProvider } from '@/components/shared/Toast'
import { ErrorBoundary } from '@/components/shared/ErrorBoundaries'
import { AppLayout } from '@/components/layout/AppLayout'

// Route Components
import AuthRoutes from './AuthRoutes'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

// Page Components (Lazy loaded)
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
  <div className="page-loader">
    <div className="loader-spinner" />
    <p>Loading...</p>
  </div>
)

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastProvider position="top-right" />
          
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                  <PublicRoute>
                    <Navigate to="/portfolio" replace />
                  </PublicRoute>
                } />
                
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
          </BrowserRouter>
          
          {/* React Query DevTools (development only) */}
          {import.meta.env.DEV && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default AppRoutes
