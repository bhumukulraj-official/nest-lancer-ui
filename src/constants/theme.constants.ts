/**
 * Theme Constants
 * Theme and styling constants
 */

export const THEME = {
  // Color Palette
  COLORS: {
    PRIMARY: '#3399cc',
    SECONDARY: '#6c757d',
    SUCCESS: '#28a745',
    WARNING: '#ffc107',
    ERROR: '#dc3545',
    INFO: '#17a2b8',
    LIGHT: '#f8f9fa',
    DARK: '#343a40',
  },
  
  // Typography
  FONT_FAMILY: {
    PRIMARY: '"Inter", sans-serif',
    SECONDARY: '"Roboto", sans-serif',
    MONOSPACE: '"Fira Code", monospace',
  },
  
  // Spacing
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
  },
  
  // Border Radius
  BORDER_RADIUS: {
    SM: '0.25rem',
    MD: '0.5rem',
    LG: '1rem',
  },
  
  // Shadows
  SHADOWS: {
    SM: '0 1px 2px rgba(0,0,0,0.1)',
    MD: '0 4px 6px rgba(0,0,0,0.1)',
    LG: '0 10px 15px rgba(0,0,0,0.1)',
  },
} as const
