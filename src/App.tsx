/**
 * Main App Component
 * Root application component with theme provider, routing setup, and global providers
 */

import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import { defaultTheme } from '@/styles/theme'
import { envConfig, isDevelopment } from '@/config'
import AppLayout from '@/components/layout/AppLayout/AppLayout'
import ErrorBoundary from '@/components/shared/ErrorBoundaries/ErrorBoundary'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

const App: FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <BrowserRouter>
            <AppLayout>
              {/* Temporary welcome content - will be replaced with routing */}
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <h1 style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem',
                  background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Welcome to {envConfig.APP_NAME}
                </h1>
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: '#666',
                  maxWidth: '600px',
                  lineHeight: 1.6
                }}>
                  {envConfig.APP_DESCRIPTION}
                </p>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#999',
                  marginTop: '2rem'
                }}>
                  Phase 0: Foundation & Shared Components ✅
                </p>
                <div style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#555'
                }}>
                  <strong>Environment:</strong> {isDevelopment() ? 'Development' : 'Production'}<br />
                  <strong>API URL:</strong> {envConfig.API_BASE_URL}<br />
                  <strong>Version:</strong> {envConfig.APP_VERSION}
                </div>
              </div>
            </AppLayout>
          </BrowserRouter>
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          
          {/* React Query DevTools (development only) */}
          {isDevelopment() && envConfig.ENABLE_DEV_TOOLS && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
