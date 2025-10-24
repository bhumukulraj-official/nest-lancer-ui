/**
 * Typography Configuration
 * Defines the typography system for the NestLancer application
 * Includes font families, sizes, weights, and responsive typography
 */

import type { TypographyOptions } from '@mui/material/styles/createTypography'

/**
 * Font family stacks
 */
export const fontFamilies = {
  primary: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  
  secondary: [
    '"Roboto"',
    '"Helvetica"',
    '"Arial"',
    'sans-serif',
  ].join(','),
  
  monospace: [
    '"Fira Code"',
    '"SF Mono"',
    '"Monaco"',
    '"Inconsolata"',
    '"Roboto Mono"',
    '"Source Code Pro"',
    'monospace',
  ].join(','),
}

/**
 * Font weights
 */
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
}

/**
 * Base typography configuration
 */
export const baseTypography = {
  fontFamily: fontFamilies.primary,
  fontWeightLight: fontWeights.light,
  fontWeightRegular: fontWeights.regular,
  fontWeightMedium: fontWeights.medium,
  fontWeightBold: fontWeights.bold,
}

/**
 * Typography scale and hierarchy
 */
export const typographyOptions: TypographyOptions = {
  ...baseTypography,
  
  // Headings
  h1: {
    fontFamily: fontFamilies.primary,
    fontSize: '2.5rem', // 40px
    fontWeight: fontWeights.bold,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    '@media (max-width:600px)': {
      fontSize: '2rem', // 32px on mobile
    },
  },
  
  h2: {
    fontFamily: fontFamilies.primary,
    fontSize: '2rem', // 32px
    fontWeight: fontWeights.bold,
    lineHeight: 1.25,
    letterSpacing: '-0.015em',
    '@media (max-width:600px)': {
      fontSize: '1.75rem', // 28px on mobile
    },
  },
  
  h3: {
    fontFamily: fontFamilies.primary,
    fontSize: '1.5rem', // 24px
    fontWeight: fontWeights.semiBold,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    '@media (max-width:600px)': {
      fontSize: '1.375rem', // 22px on mobile
    },
  },
  
  h4: {
    fontFamily: fontFamilies.primary,
    fontSize: '1.25rem', // 20px
    fontWeight: fontWeights.semiBold,
    lineHeight: 1.35,
    letterSpacing: '-0.005em',
    '@media (max-width:600px)': {
      fontSize: '1.125rem', // 18px on mobile
    },
  },
  
  h5: {
    fontFamily: fontFamilies.primary,
    fontSize: '1.125rem', // 18px
    fontWeight: fontWeights.semiBold,
    lineHeight: 1.4,
    letterSpacing: '0em',
  },
  
  h6: {
    fontFamily: fontFamilies.primary,
    fontSize: '1rem', // 16px
    fontWeight: fontWeights.semiBold,
    lineHeight: 1.4,
    letterSpacing: '0.01em',
  },
  
  // Subtitles
  subtitle1: {
    fontFamily: fontFamilies.primary,
    fontSize: '1rem', // 16px
    fontWeight: fontWeights.medium,
    lineHeight: 1.5,
    letterSpacing: '0.009em',
  },
  
  subtitle2: {
    fontFamily: fontFamilies.primary,
    fontSize: '0.875rem', // 14px
    fontWeight: fontWeights.medium,
    lineHeight: 1.43,
    letterSpacing: '0.01em',
  },
  
  // Body text
  body1: {
    fontFamily: fontFamilies.primary,
    fontSize: '1rem', // 16px
    fontWeight: fontWeights.regular,
    lineHeight: 1.6,
    letterSpacing: '0.009em',
  },
  
  body2: {
    fontFamily: fontFamilies.primary,
    fontSize: '0.875rem', // 14px
    fontWeight: fontWeights.regular,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  
  // Interactive elements
  button: {
    fontFamily: fontFamilies.primary,
    fontSize: '0.875rem', // 14px
    fontWeight: fontWeights.medium,
    lineHeight: 1.43,
    letterSpacing: '0.02em',
    textTransform: 'none' as const,
  },
  
  // Small text
  caption: {
    fontFamily: fontFamilies.primary,
    fontSize: '0.75rem', // 12px
    fontWeight: fontWeights.regular,
    lineHeight: 1.4,
    letterSpacing: '0.03em',
  },
  
  overline: {
    fontFamily: fontFamilies.primary,
    fontSize: '0.75rem', // 12px
    fontWeight: fontWeights.medium,
    lineHeight: 1.4,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
}

/**
 * Custom typography variants
 * Extended typography for specific use cases
 */
export const customTypographyVariants = {
  // Display text (hero sections)
  display1: {
    fontFamily: fontFamilies.primary,
    fontSize: '3.5rem', // 56px
    fontWeight: fontWeights.bold,
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    '@media (max-width:900px)': {
      fontSize: '2.75rem', // 44px on tablet
    },
    '@media (max-width:600px)': {
      fontSize: '2.25rem', // 36px on mobile
    },
  },
  
  display2: {
    fontFamily: fontFamilies.primary,
    fontSize: '3rem', // 48px
    fontWeight: fontWeights.bold,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    '@media (max-width:900px)': {
      fontSize: '2.5rem', // 40px on tablet
    },
    '@media (max-width:600px)': {
      fontSize: '2rem', // 32px on mobile
    },
  },
  
  // Large body text (lead paragraphs)
  lead: {
    fontFamily: fontFamilies.primary,
    fontSize: '1.125rem', // 18px
    fontWeight: fontWeights.regular,
    lineHeight: 1.6,
    letterSpacing: '0.005em',
    '@media (max-width:600px)': {
      fontSize: '1rem', // 16px on mobile
    },
  },
  
  // Small body text
  small: {
    fontFamily: fontFamilies.primary,
    fontSize: '0.813rem', // 13px
    fontWeight: fontWeights.regular,
    lineHeight: 1.46,
    letterSpacing: '0.01em',
  },
  
  // Code text
  code: {
    fontFamily: fontFamilies.monospace,
    fontSize: '0.875rem', // 14px
    fontWeight: fontWeights.regular,
    lineHeight: 1.43,
    letterSpacing: '0em',
  },
  
  // Labels and tags
  label: {
    fontFamily: fontFamilies.primary,
    fontSize: '0.75rem', // 12px
    fontWeight: fontWeights.medium,
    lineHeight: 1.4,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
}

/**
 * Responsive typography helpers
 */
export const responsiveTypography = {
  // Screen size breakpoints for typography
  breakpoints: {
    mobile: '@media (max-width:600px)',
    tablet: '@media (max-width:900px)',
    desktop: '@media (min-width:900px)',
  },
  
  // Fluid typography scale
  fluidScale: (minSize: number, maxSize: number, minViewport = 320, maxViewport = 1200) => ({
    fontSize: `clamp(${minSize}rem, ${minSize}rem + ${maxSize - minSize} * ((100vw - ${minViewport}px) / ${maxViewport - minViewport}), ${maxSize}rem)`,
  }),
}

/**
 * Typography utility functions
 */
export const typographyUtils = {
  // Convert px to rem
  pxToRem: (px: number, base = 16) => `${px / base}rem`,
  
  // Line height calculation
  calculateLineHeight: (fontSize: number, targetHeight: number) => targetHeight / fontSize,
  
  // Letter spacing calculation (typical values)
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

export default typographyOptions
