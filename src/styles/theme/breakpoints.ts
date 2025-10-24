/**
 * Breakpoints Configuration
 * Defines responsive breakpoints for the NestLancer application
 * Mobile-first approach with consistent breakpoint system
 */

import type { BreakpointsOptions } from '@mui/material/styles'

/**
 * Breakpoint values in pixels
 * Following Material-UI conventions with custom adjustments
 */
export const breakpointValues = {
  xs: 0,      // Extra small devices (phones, 0px and up)
  sm: 600,    // Small devices (phones, 600px and up)
  md: 900,    // Medium devices (tablets, 900px and up)
  lg: 1200,   // Large devices (desktops, 1200px and up)
  xl: 1536,   // Extra large devices (large desktops, 1536px and up)
}

/**
 * Custom breakpoint names for specific use cases
 */
export const customBreakpoints = {
  mobile: breakpointValues.xs,     // 0px
  tablet: breakpointValues.sm,     // 600px
  desktop: breakpointValues.md,    // 900px
  largeDesktop: breakpointValues.lg, // 1200px
  extraLarge: breakpointValues.xl, // 1536px
}

/**
 * Breakpoints configuration for Material-UI theme
 */
export const breakpointsOptions: BreakpointsOptions = {
  values: breakpointValues,
}

/**
 * Media query helpers
 * Pre-built media queries for common responsive patterns
 */
export const mediaQueries = {
  // Up from breakpoint (min-width)
  up: {
    xs: `@media (min-width: ${breakpointValues.xs}px)`,
    sm: `@media (min-width: ${breakpointValues.sm}px)`,
    md: `@media (min-width: ${breakpointValues.md}px)`,
    lg: `@media (min-width: ${breakpointValues.lg}px)`,
    xl: `@media (min-width: ${breakpointValues.xl}px)`,
  },
  
  // Down to breakpoint (max-width)
  down: {
    xs: `@media (max-width: ${breakpointValues.sm - 1}px)`, // 0-599px
    sm: `@media (max-width: ${breakpointValues.md - 1}px)`, // 600-899px
    md: `@media (max-width: ${breakpointValues.lg - 1}px)`, // 900-1199px
    lg: `@media (max-width: ${breakpointValues.xl - 1}px)`, // 1200-1535px
    xl: `@media (min-width: ${breakpointValues.xl}px)`,     // 1536px+
  },
  
  // Between breakpoints
  between: {
    xsToSm: `@media (min-width: ${breakpointValues.xs}px) and (max-width: ${breakpointValues.md - 1}px)`,
    smToMd: `@media (min-width: ${breakpointValues.sm}px) and (max-width: ${breakpointValues.lg - 1}px)`,
    mdToLg: `@media (min-width: ${breakpointValues.md}px) and (max-width: ${breakpointValues.xl - 1}px)`,
    lgToXl: `@media (min-width: ${breakpointValues.lg}px)`,
  },
  
  // Orientation queries
  orientation: {
    landscape: '@media (orientation: landscape)',
    portrait: '@media (orientation: portrait)',
  },
  
  // Device-specific queries
  device: {
    mobile: `@media (max-width: ${breakpointValues.sm - 1}px)`,
    tablet: `@media (min-width: ${breakpointValues.sm}px) and (max-width: ${breakpointValues.lg - 1}px)`,
    desktop: `@media (min-width: ${breakpointValues.lg}px)`,
    
    // Touch devices
    touch: '@media (hover: none) and (pointer: coarse)',
    hover: '@media (hover: hover) and (pointer: fine)',
    
    // High DPI displays
    retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  },
}

/**
 * Container max-widths for different breakpoints
 * Ensures content doesn't get too wide on large screens
 */
export const containerMaxWidths = {
  xs: '100%',
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
}

/**
 * Grid system configuration
 * Responsive grid columns and gutters
 */
export const gridSystem = {
  // Number of columns at different breakpoints
  columns: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 12,
    xl: 12,
  },
  
  // Gutter spacing (space between grid items)
  gutters: {
    xs: 16, // 16px
    sm: 20, // 20px
    md: 24, // 24px
    lg: 32, // 32px
    xl: 40, // 40px
  },
  
  // Margin spacing (space around containers)
  margins: {
    xs: 16, // 16px
    sm: 24, // 24px
    md: 32, // 32px
    lg: 40, // 40px
    xl: 48, // 48px
  },
}

/**
 * Responsive spacing scale
 * Consistent spacing that adapts to screen size
 */
export const responsiveSpacing = {
  // Component spacing
  component: {
    xs: 8,  // 8px
    sm: 12, // 12px
    md: 16, // 16px
    lg: 20, // 20px
    xl: 24, // 24px
  },
  
  // Section spacing
  section: {
    xs: 32,  // 32px
    sm: 48,  // 48px
    md: 64,  // 64px
    lg: 80,  // 80px
    xl: 96,  // 96px
  },
  
  // Page spacing
  page: {
    xs: 16,  // 16px
    sm: 24,  // 24px
    md: 32,  // 32px
    lg: 48,  // 48px
    xl: 64,  // 64px
  },
}

/**
 * Responsive utilities
 * Helper functions for responsive design
 */
export const responsiveUtils = {
  // Check if current breakpoint matches
  isBreakpoint: (breakpoint: keyof typeof breakpointValues) => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(mediaQueries.up[breakpoint]).matches
  },
  
  // Get current breakpoint
  getCurrentBreakpoint: (): keyof typeof breakpointValues => {
    if (typeof window === 'undefined') return 'xs'
    
    const width = window.innerWidth
    if (width >= breakpointValues.xl) return 'xl'
    if (width >= breakpointValues.lg) return 'lg'
    if (width >= breakpointValues.md) return 'md'
    if (width >= breakpointValues.sm) return 'sm'
    return 'xs'
  },
  
  // Check if device is mobile
  isMobile: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpointValues.sm
  },
  
  // Check if device is tablet
  isTablet: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= breakpointValues.sm && window.innerWidth < breakpointValues.lg
  },
  
  // Check if device is desktop
  isDesktop: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= breakpointValues.lg
  },
}

/**
 * Component-specific breakpoint configurations
 */
export const componentBreakpoints = {
  // Navigation drawer
  drawer: {
    permanent: breakpointValues.lg, // Show permanent drawer on lg+ screens
    temporary: breakpointValues.md, // Show temporary drawer on md- screens
  },
  
  // Data tables
  table: {
    responsive: breakpointValues.md, // Switch to mobile table view below md
    horizontal: breakpointValues.sm, // Allow horizontal scroll below sm
  },
  
  // Cards and layouts
  card: {
    stackVertical: breakpointValues.sm, // Stack cards vertically below sm
    reduceSpacing: breakpointValues.md, // Reduce spacing below md
  },
  
  // Forms
  form: {
    stackFields: breakpointValues.sm, // Stack form fields below sm
    fullWidth: breakpointValues.md,   // Make form full width below md
  },
}

export default breakpointsOptions
