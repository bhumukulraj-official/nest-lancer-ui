/**
 * Theme Configuration
 * Material-UI theme configuration with responsive design system
 * Includes palette, typography, spacing, and component customizations
 */

import { createTheme, ThemeOptions } from '@mui/material/styles'

/**
 * Custom breakpoints for responsive design
 */
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
}

/**
 * Color palette configuration
 */
const palette = {
  primary: {
    light: '#42a5f5',
    main: '#1976d2',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#ba68c8',
    main: '#9c27b0',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
  },
  error: {
    light: '#ef5350',
    main: '#f44336',
    dark: '#c62828',
    contrastText: '#ffffff',
  },
  warning: {
    light: '#ff9800',
    main: '#ed6c02',
    dark: '#e65100',
    contrastText: '#ffffff',
  },
  info: {
    light: '#03dac6',
    main: '#0097a7',
    dark: '#00695c',
    contrastText: '#ffffff',
  },
  success: {
    light: '#4caf50',
    main: '#2e7d32',
    dark: '#1b5e20',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
}

/**
 * Typography configuration
 */
const typography = {
  fontFamily: [
    'Inter',
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textTransform: 'none' as const,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.4,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
}

/**
 * Component customizations
 */
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 500,
        padding: '8px 16px',
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
        padding: '4px 8px',
        fontSize: '0.75rem',
      },
    },
  },
  
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.05)',
      },
    },
  },
  
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
        },
      },
    },
  },
  
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      },
    },
  },
  
  MuiDrawer: {
    styleOverrides: {
      paper: {
        border: 'none',
        boxShadow: '2px 0px 8px rgba(0,0,0,0.1)',
      },
    },
  },
  
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        fontWeight: 500,
      },
    },
  },
  
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      elevation1: {
        boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
      },
      elevation2: {
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
      },
      elevation3: {
        boxShadow: '0px 3px 12px rgba(0,0,0,0.1)',
      },
    },
  },
}

/**
 * Spacing configuration
 */
const spacing = (factor: number) => `${factor * 8}px`

/**
 * Light theme configuration
 */
const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    ...palette,
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd',
    },
  },
  typography,
  breakpoints,
  spacing,
  components,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0,0,0,0.1)',
    '0px 2px 6px rgba(0,0,0,0.1)',
    '0px 3px 12px rgba(0,0,0,0.1)',
    '0px 4px 16px rgba(0,0,0,0.1)',
    '0px 6px 20px rgba(0,0,0,0.1)',
    '0px 8px 24px rgba(0,0,0,0.1)',
    '0px 12px 28px rgba(0,0,0,0.1)',
    '0px 16px 32px rgba(0,0,0,0.1)',
    '0px 20px 40px rgba(0,0,0,0.1)',
    '0px 24px 48px rgba(0,0,0,0.1)',
    '0px 28px 56px rgba(0,0,0,0.1)',
    '0px 32px 64px rgba(0,0,0,0.1)',
    '0px 36px 72px rgba(0,0,0,0.1)',
    '0px 40px 80px rgba(0,0,0,0.1)',
    '0px 44px 88px rgba(0,0,0,0.1)',
    '0px 48px 96px rgba(0,0,0,0.1)',
    '0px 52px 104px rgba(0,0,0,0.1)',
    '0px 56px 112px rgba(0,0,0,0.1)',
    '0px 60px 120px rgba(0,0,0,0.1)',
    '0px 64px 128px rgba(0,0,0,0.1)',
    '0px 68px 136px rgba(0,0,0,0.1)',
    '0px 72px 144px rgba(0,0,0,0.1)',
    '0px 76px 152px rgba(0,0,0,0.1)',
    '0px 80px 160px rgba(0,0,0,0.1)',
  ],
}

/**
 * Dark theme configuration
 */
const darkThemeOptions: ThemeOptions = {
  ...lightThemeOptions,
  palette: {
    mode: 'dark',
    ...palette,
    primary: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
      disabled: '#666666',
    },
  },
}

/**
 * Create theme instances
 */
export const lightTheme = createTheme(lightThemeOptions)
export const darkTheme = createTheme(darkThemeOptions)

/**
 * Default theme (light mode)
 */
export const defaultTheme = lightTheme

/**
 * Theme configuration for the application
 */
export const themeConfig = {
  defaultMode: 'light' as const,
  enableDarkMode: true,
  enableSystemPreference: true,
  storageKey: 'nestlancer-theme-mode',
}

export default defaultTheme
