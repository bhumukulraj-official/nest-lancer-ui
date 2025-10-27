/**
 * Main App Component
 * Root application component with theme provider, routing setup, and global providers
 */

import { ThemeProvider, CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import ErrorBoundary from '@/components/shared/ErrorBoundaries/ErrorBoundary'
import { envConfig, isDevelopment } from '@/config'
import AppRoutes from '@/routes/AppRoutes'
import { defaultTheme } from '@/styles/theme'

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
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppRoutes />

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
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
