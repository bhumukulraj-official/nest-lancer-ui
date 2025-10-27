/**
 * Test Utilities
 * Custom render function and test helpers
 */

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { defaultTheme as theme } from '@/styles/theme'

/**
 * Create a test QueryClient with default options
 */
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })

/**
 * Custom render function that includes all necessary providers
 */
interface CustomRenderOptions extends RenderOptions {
  theme?: typeof theme
  queryClient?: ReturnType<typeof createTestQueryClient>
  withRouter?: boolean
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const Wrapper = options?.wrapper || AllTheProviders

  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react'

// Override render method
export { customRender as render }

/**
 * Wait for async operations to complete
 */
export const waitForAsync = () =>
  new Promise(resolve => setTimeout(resolve, 0))

/**
 * Create a mock Event object
 */
export const createMockEvent = (
  type: string,
  options?: Partial<Event>
): Event => {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.assign(event, options)
  return event
}

/**
 * Mock localStorage
 */
export const createMockLocalStorage = () => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
}

/**
 * Mock sessionStorage
 */
export const createMockSessionStorage = () => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
}

