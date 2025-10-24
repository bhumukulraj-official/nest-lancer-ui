/**
 * Color Palette Configuration
 * Defines the color system for the NestLancer application
 * Includes primary, secondary, semantic colors, and accessibility-compliant combinations
 */

import type { PaletteOptions } from '@mui/material/styles'

/**
 * Primary brand colors
 */
export const primaryColors = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3', // Main primary
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
}

/**
 * Secondary brand colors
 */
export const secondaryColors = {
  50: '#f3e5f5',
  100: '#e1bee7',
  200: '#ce93d8',
  300: '#ba68c8',
  400: '#ab47bc',
  500: '#9c27b0', // Main secondary
  600: '#8e24aa',
  700: '#7b1fa2',
  800: '#6a1b9a',
  900: '#4a148c',
}

/**
 * Success colors (green)
 */
export const successColors = {
  50: '#e8f5e8',
  100: '#c8e6c8',
  200: '#a5d6a5',
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50', // Main success
  600: '#43a047',
  700: '#388e3c',
  800: '#2e7d32',
  900: '#1b5e20',
}

/**
 * Error colors (red)
 */
export const errorColors = {
  50: '#ffebee',
  100: '#ffcdd2',
  200: '#ef9a9a',
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336', // Main error
  600: '#e53935',
  700: '#d32f2f',
  800: '#c62828',
  900: '#b71c1c',
}

/**
 * Warning colors (orange)
 */
export const warningColors = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800', // Main warning
  600: '#fb8c00',
  700: '#f57c00',
  800: '#ef6c00',
  900: '#e65100',
}

/**
 * Info colors (cyan)
 */
export const infoColors = {
  50: '#e0f2f1',
  100: '#b2dfdb',
  200: '#80cbc4',
  300: '#4db6ac',
  400: '#26a69a',
  500: '#009688', // Main info
  600: '#00897b',
  700: '#00796b',
  800: '#00695c',
  900: '#004d40',
}

/**
 * Grey scale colors
 */
export const greyColors = {
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
}

/**
 * Light mode palette configuration
 */
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    light: primaryColors[300],
    main: primaryColors[500],
    dark: primaryColors[700],
    contrastText: '#ffffff',
  },
  secondary: {
    light: secondaryColors[300],
    main: secondaryColors[500],
    dark: secondaryColors[700],
    contrastText: '#ffffff',
  },
  error: {
    light: errorColors[300],
    main: errorColors[500],
    dark: errorColors[700],
    contrastText: '#ffffff',
  },
  warning: {
    light: warningColors[300],
    main: warningColors[500],
    dark: warningColors[700],
    contrastText: '#ffffff',
  },
  info: {
    light: infoColors[300],
    main: infoColors[500],
    dark: infoColors[700],
    contrastText: '#ffffff',
  },
  success: {
    light: successColors[300],
    main: successColors[500],
    dark: successColors[700],
    contrastText: '#ffffff',
  },
  grey: greyColors,
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
  text: {
    primary: greyColors[900],
    secondary: greyColors[600],
    disabled: greyColors[400],
  },
  divider: greyColors[200],
  action: {
    active: greyColors[600],
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: greyColors[300],
    disabledBackground: greyColors[100],
    focus: 'rgba(0, 0, 0, 0.12)',
  },
}

/**
 * Dark mode palette configuration
 */
export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    light: primaryColors[300],
    main: primaryColors[400],
    dark: primaryColors[600],
    contrastText: '#ffffff',
  },
  secondary: {
    light: secondaryColors[300],
    main: secondaryColors[400],
    dark: secondaryColors[600],
    contrastText: '#ffffff',
  },
  error: {
    light: errorColors[300],
    main: errorColors[400],
    dark: errorColors[600],
    contrastText: '#ffffff',
  },
  warning: {
    light: warningColors[300],
    main: warningColors[400],
    dark: warningColors[600],
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    light: infoColors[300],
    main: infoColors[400],
    dark: infoColors[600],
    contrastText: '#ffffff',
  },
  success: {
    light: successColors[300],
    main: successColors[400],
    dark: successColors[600],
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  grey: greyColors,
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  action: {
    active: '#ffffff',
    hover: 'rgba(255, 255, 255, 0.04)',
    selected: 'rgba(255, 255, 255, 0.08)',
    disabled: 'rgba(255, 255, 255, 0.26)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
  },
}

/**
 * Custom color utilities
 */
export const customColors = {
  // Status colors
  online: '#4caf50',
  offline: '#757575',
  away: '#ff9800',
  busy: '#f44336',
  
  // Priority colors
  high: errorColors[500],
  medium: warningColors[500],
  low: successColors[500],
  
  // Project status colors
  draft: greyColors[500],
  active: primaryColors[500],
  completed: successColors[500],
  cancelled: errorColors[500],
  
  // Payment status colors
  pending: warningColors[500],
  paid: successColors[500],
  failed: errorColors[500],
  refunded: infoColors[500],
}
