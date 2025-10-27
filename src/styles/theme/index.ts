/**
 * Theme System Index
 * Central export for all theme configuration modules
 * Combines palette, typography, breakpoints, and shadows into complete themes
 */

import { createTheme } from '@mui/material/styles'

// Import theme modules
import breakpointsOptions from './breakpoints'
import { lightPalette, darkPalette } from './palette'
import baseShadows, { darkShadows } from './shadows'
import typographyOptions from './typography'

// Re-export individual modules
export * from './palette'
export * from './typography'
export * from './breakpoints'
export * from './shadows'

/**
 * Complete light theme configuration
 */
export const lightTheme = createTheme({
  palette: lightPalette,
  typography: typographyOptions,
  breakpoints: breakpointsOptions,
  shadows: baseShadows,
  
  // Shape configuration
  shape: {
    borderRadius: 8,
  },
  
  // Spacing configuration
  spacing: 8,
  
  // Z-index configuration
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  
  // Transitions configuration
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  
  // Component overrides
  components: {
    // Button customizations
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '6px 12px',
          fontSize: '0.875rem',
        },
      },
    },
    
    // Card customizations
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
    
    // TextField customizations
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    
    // AppBar customizations
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
    
    // Drawer customizations
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          boxShadow: '2px 0px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    
    // Chip customizations
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    
    // Alert customizations
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    
    // Paper customizations
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})

/**
 * Complete dark theme configuration
 */
export const darkTheme = createTheme({
  ...lightTheme,
  palette: darkPalette,
  shadows: darkShadows,
})

/**
 * Default theme (light mode)
 */
export const defaultTheme = lightTheme

/**
 * Theme configuration options
 */
export const themeConfig = {
  defaultMode: 'light' as const,
  enableDarkMode: true,
  enableSystemPreference: true,
  storageKey: 'nestlancer-theme-mode',
  
  // Animation preferences
  enableAnimations: true,
  reducedMotion: false,
  
  // Performance settings
  enableRipple: true,
  enableTransitions: true,
}

/**
 * Theme utility functions
 */
export const themeUtils = {
  // Get theme based on mode
  getTheme: (mode: 'light' | 'dark') => (mode === 'dark' ? darkTheme : lightTheme),
  
  // Check if dark mode is enabled
  isDarkMode: (mode: 'light' | 'dark') => mode === 'dark',
  
  // Get system preference
  getSystemPreference: (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  },
  
  // Get stored preference
  getStoredPreference: (): 'light' | 'dark' | null => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(themeConfig.storageKey)
    return stored === 'light' || stored === 'dark' ? stored : null
  },
  
  // Store theme preference
  storePreference: (mode: 'light' | 'dark') => {
    if (typeof window === 'undefined') return
    localStorage.setItem(themeConfig.storageKey, mode)
  },
}

// Export theme instances
export { lightTheme as theme }
export default defaultTheme
