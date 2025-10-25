/**
 * Theme Context
 * React context for theme state management
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// Theme Types
export type Theme = 'light' | 'dark' | 'auto'
export type ColorScheme = 'light' | 'dark'

// Theme State Interface
interface ThemeState {
  theme: Theme
  colorScheme: ColorScheme
  isSystemTheme: boolean
}

// Theme Actions
type ThemeAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_COLOR_SCHEME'; payload: ColorScheme }
  | { type: 'TOGGLE_THEME' }

// Initial State
const initialState: ThemeState = {
  theme: 'auto',
  colorScheme: 'light',
  isSystemTheme: true,
}

// Theme Reducer
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
        isSystemTheme: action.payload === 'auto',
        colorScheme: action.payload === 'auto' 
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : action.payload,
      }
    case 'SET_COLOR_SCHEME':
      return {
        ...state,
        colorScheme: action.payload,
      }
    case 'TOGGLE_THEME':
      const newTheme = state.colorScheme === 'light' ? 'dark' : 'light'
      return {
        ...state,
        theme: newTheme,
        colorScheme: newTheme,
        isSystemTheme: false,
      }
    default:
      return state
  }
}

// Theme Context Interface
interface ThemeContextType {
  state: ThemeState
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDark: boolean
  isLight: boolean
}

// Create Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Theme Provider Props
interface ThemeProviderProps {
  children: ReactNode
}

// Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme })
    }
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    if (state.isSystemTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = (e: MediaQueryListEvent) => {
        dispatch({ 
          type: 'SET_COLOR_SCHEME', 
          payload: e.matches ? 'dark' : 'light' 
        })
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [state.isSystemTheme])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.colorScheme)
    document.documentElement.classList.toggle('dark', state.colorScheme === 'dark')
  }, [state.colorScheme])

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', state.theme)
  }, [state.theme])

  // Set theme function
  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme })
  }

  // Toggle theme function
  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' })
  }

  const value: ThemeContextType = {
    state,
    setTheme,
    toggleTheme,
    isDark: state.colorScheme === 'dark',
    isLight: state.colorScheme === 'light',
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Export context for advanced usage
export { ThemeContext }
