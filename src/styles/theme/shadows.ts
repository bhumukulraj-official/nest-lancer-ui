/**
 * Shadows Configuration
 * Defines shadow system for the NestLancer application
 * Material Design-compliant elevation shadows with custom variations
 */

import type { Shadows } from '@mui/material/styles'

/**
 * Base shadow configuration
 * Material Design elevation shadows (0-24 levels)
 */
export const baseShadows: Shadows = [
  'none', // 0: No shadow
  '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)', // 1: Very subtle
  '0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.20)', // 2: Subtle
  '0px 1px 8px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 3px 3px rgba(0, 0, 0, 0.20)', // 3: Small
  '0px 2px 4px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.20)', // 4: Small-medium
  '0px 3px 5px rgba(0, 0, 0, 0.12), 0px 5px 8px rgba(0, 0, 0, 0.14), 0px 1px 14px rgba(0, 0, 0, 0.20)', // 5: Medium
  '0px 3px 5px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.20)', // 6: Medium-large
  '0px 4px 5px rgba(0, 0, 0, 0.12), 0px 7px 10px rgba(0, 0, 0, 0.14), 0px 2px 16px rgba(0, 0, 0, 0.20)', // 7: Large
  '0px 5px 5px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.20)', // 8: Large-extra
  '0px 5px 6px rgba(0, 0, 0, 0.12), 0px 9px 12px rgba(0, 0, 0, 0.14), 0px 3px 16px rgba(0, 0, 0, 0.20)', // 9: Extra large
  '0px 6px 6px rgba(0, 0, 0, 0.12), 0px 10px 14px rgba(0, 0, 0, 0.14), 0px 4px 18px rgba(0, 0, 0, 0.20)', // 10
  '0px 6px 7px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.14), 0px 4px 20px rgba(0, 0, 0, 0.20)', // 11
  '0px 7px 8px rgba(0, 0, 0, 0.12), 0px 12px 17px rgba(0, 0, 0, 0.14), 0px 5px 22px rgba(0, 0, 0, 0.20)', // 12
  '0px 7px 8px rgba(0, 0, 0, 0.12), 0px 13px 19px rgba(0, 0, 0, 0.14), 0px 5px 24px rgba(0, 0, 0, 0.20)', // 13
  '0px 7px 9px rgba(0, 0, 0, 0.12), 0px 14px 21px rgba(0, 0, 0, 0.14), 0px 5px 26px rgba(0, 0, 0, 0.20)', // 14
  '0px 8px 9px rgba(0, 0, 0, 0.12), 0px 15px 22px rgba(0, 0, 0, 0.14), 0px 6px 28px rgba(0, 0, 0, 0.20)', // 15
  '0px 8px 10px rgba(0, 0, 0, 0.12), 0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.20)', // 16
  '0px 8px 11px rgba(0, 0, 0, 0.12), 0px 17px 26px rgba(0, 0, 0, 0.14), 0px 6px 32px rgba(0, 0, 0, 0.20)', // 17
  '0px 9px 11px rgba(0, 0, 0, 0.12), 0px 18px 28px rgba(0, 0, 0, 0.14), 0px 7px 34px rgba(0, 0, 0, 0.20)', // 18
  '0px 9px 12px rgba(0, 0, 0, 0.12), 0px 19px 29px rgba(0, 0, 0, 0.14), 0px 7px 36px rgba(0, 0, 0, 0.20)', // 19
  '0px 10px 13px rgba(0, 0, 0, 0.12), 0px 20px 31px rgba(0, 0, 0, 0.14), 0px 8px 38px rgba(0, 0, 0, 0.20)', // 20
  '0px 10px 13px rgba(0, 0, 0, 0.12), 0px 21px 33px rgba(0, 0, 0, 0.14), 0px 8px 40px rgba(0, 0, 0, 0.20)', // 21
  '0px 10px 14px rgba(0, 0, 0, 0.12), 0px 22px 35px rgba(0, 0, 0, 0.14), 0px 8px 42px rgba(0, 0, 0, 0.20)', // 22
  '0px 11px 14px rgba(0, 0, 0, 0.12), 0px 23px 36px rgba(0, 0, 0, 0.14), 0px 9px 44px rgba(0, 0, 0, 0.20)', // 23
  '0px 11px 15px rgba(0, 0, 0, 0.12), 0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.20)', // 24: Maximum
]

/**
 * Custom shadow variations
 * Specialized shadows for specific use cases
 */
export const customShadows = {
  // Colored shadows for interactive elements
  primary: '0px 4px 20px rgba(25, 118, 210, 0.25)',
  secondary: '0px 4px 20px rgba(156, 39, 176, 0.25)',
  success: '0px 4px 20px rgba(76, 175, 80, 0.25)',
  error: '0px 4px 20px rgba(244, 67, 54, 0.25)',
  warning: '0px 4px 20px rgba(255, 152, 0, 0.25)',
  info: '0px 4px 20px rgba(0, 150, 136, 0.25)',
  
  // Directional shadows
  top: '0px -4px 20px rgba(0, 0, 0, 0.1)',
  bottom: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  left: '-4px 0px 20px rgba(0, 0, 0, 0.1)',
  right: '4px 0px 20px rgba(0, 0, 0, 0.1)',
  
  // Inset shadows
  inset: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
  insetDeep: 'inset 0px 4px 8px rgba(0, 0, 0, 0.15)',
  
  // Glow effects
  glow: '0px 0px 20px rgba(25, 118, 210, 0.3)',
  glowLarge: '0px 0px 40px rgba(25, 118, 210, 0.2)',
  
  // Focus shadows
  focus: '0px 0px 0px 2px rgba(25, 118, 210, 0.3)',
  focusError: '0px 0px 0px 2px rgba(244, 67, 54, 0.3)',
  focusSuccess: '0px 0px 0px 2px rgba(76, 175, 80, 0.3)',
  
  // Card shadows
  cardHover: '0px 8px 30px rgba(0, 0, 0, 0.12)',
  cardPressed: '0px 2px 10px rgba(0, 0, 0, 0.15)',
  
  // Navigation shadows
  navbar: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  drawer: '2px 0px 8px rgba(0, 0, 0, 0.1)',
  
  // Modal shadows
  modal: '0px 11px 15px rgba(0, 0, 0, 0.2), 0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12)',
  backdrop: '0px 0px 20px rgba(0, 0, 0, 0.5)',
}

/**
 * Shadow presets for common components
 */
export const shadowPresets = {
  // Buttons
  button: {
    rest: baseShadows[2],
    hover: baseShadows[4],
    active: baseShadows[8],
    disabled: 'none',
  },
  
  // Cards
  card: {
    rest: baseShadows[1],
    hover: baseShadows[4],
    active: baseShadows[8],
  },
  
  // Panels
  panel: {
    flat: 'none',
    raised: baseShadows[1],
    floating: baseShadows[6],
  },
  
  // Navigation
  navigation: {
    appBar: baseShadows[4],
    drawer: customShadows.drawer,
    menu: baseShadows[8],
  },
  
  // Overlays
  overlay: {
    modal: customShadows.modal,
    dropdown: baseShadows[8],
    tooltip: baseShadows[6],
    popover: baseShadows[12],
  },
  
  // Form elements
  form: {
    input: baseShadows[1],
    inputFocus: customShadows.focus,
    inputError: customShadows.focusError,
  },
}

/**
 * Dark mode shadow adjustments
 * Lighter shadows for dark backgrounds
 */
export const darkShadows: Shadows = [
  'none',
  '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.4)',
  '0px 1px 5px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 3px 1px rgba(0, 0, 0, 0.35)',
  '0px 1px 8px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.24), 0px 3px 3px rgba(0, 0, 0, 0.35)',
  '0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.24), 0px 1px 10px rgba(0, 0, 0, 0.35)',
  '0px 3px 5px rgba(0, 0, 0, 0.2), 0px 5px 8px rgba(0, 0, 0, 0.24), 0px 1px 14px rgba(0, 0, 0, 0.35)',
  '0px 3px 5px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.24), 0px 1px 18px rgba(0, 0, 0, 0.35)',
  '0px 4px 5px rgba(0, 0, 0, 0.2), 0px 7px 10px rgba(0, 0, 0, 0.24), 0px 2px 16px rgba(0, 0, 0, 0.35)',
  '0px 5px 5px rgba(0, 0, 0, 0.2), 0px 8px 10px rgba(0, 0, 0, 0.24), 0px 3px 14px rgba(0, 0, 0, 0.35)',
  '0px 5px 6px rgba(0, 0, 0, 0.2), 0px 9px 12px rgba(0, 0, 0, 0.24), 0px 3px 16px rgba(0, 0, 0, 0.35)',
  '0px 6px 6px rgba(0, 0, 0, 0.2), 0px 10px 14px rgba(0, 0, 0, 0.24), 0px 4px 18px rgba(0, 0, 0, 0.35)',
  '0px 6px 7px rgba(0, 0, 0, 0.2), 0px 11px 15px rgba(0, 0, 0, 0.24), 0px 4px 20px rgba(0, 0, 0, 0.35)',
  '0px 7px 8px rgba(0, 0, 0, 0.2), 0px 12px 17px rgba(0, 0, 0, 0.24), 0px 5px 22px rgba(0, 0, 0, 0.35)',
  '0px 7px 8px rgba(0, 0, 0, 0.2), 0px 13px 19px rgba(0, 0, 0, 0.24), 0px 5px 24px rgba(0, 0, 0, 0.35)',
  '0px 7px 9px rgba(0, 0, 0, 0.2), 0px 14px 21px rgba(0, 0, 0, 0.24), 0px 5px 26px rgba(0, 0, 0, 0.35)',
  '0px 8px 9px rgba(0, 0, 0, 0.2), 0px 15px 22px rgba(0, 0, 0, 0.24), 0px 6px 28px rgba(0, 0, 0, 0.35)',
  '0px 8px 10px rgba(0, 0, 0, 0.2), 0px 16px 24px rgba(0, 0, 0, 0.24), 0px 6px 30px rgba(0, 0, 0, 0.35)',
  '0px 8px 11px rgba(0, 0, 0, 0.2), 0px 17px 26px rgba(0, 0, 0, 0.24), 0px 6px 32px rgba(0, 0, 0, 0.35)',
  '0px 9px 11px rgba(0, 0, 0, 0.2), 0px 18px 28px rgba(0, 0, 0, 0.24), 0px 7px 34px rgba(0, 0, 0, 0.35)',
  '0px 9px 12px rgba(0, 0, 0, 0.2), 0px 19px 29px rgba(0, 0, 0, 0.24), 0px 7px 36px rgba(0, 0, 0, 0.35)',
  '0px 10px 13px rgba(0, 0, 0, 0.2), 0px 20px 31px rgba(0, 0, 0, 0.24), 0px 8px 38px rgba(0, 0, 0, 0.35)',
  '0px 10px 13px rgba(0, 0, 0, 0.2), 0px 21px 33px rgba(0, 0, 0, 0.24), 0px 8px 40px rgba(0, 0, 0, 0.35)',
  '0px 10px 14px rgba(0, 0, 0, 0.2), 0px 22px 35px rgba(0, 0, 0, 0.24), 0px 8px 42px rgba(0, 0, 0, 0.35)',
  '0px 11px 14px rgba(0, 0, 0, 0.2), 0px 23px 36px rgba(0, 0, 0, 0.24), 0px 9px 44px rgba(0, 0, 0, 0.35)',
  '0px 11px 15px rgba(0, 0, 0, 0.2), 0px 24px 38px rgba(0, 0, 0, 0.24), 0px 9px 46px rgba(0, 0, 0, 0.35)',
]

/**
 * Shadow utility functions
 */
export const shadowUtils = {
  // Generate custom shadow with specific color
  createColoredShadow: (color: string, opacity = 0.25, blur = 20) =>
    `0px 4px ${blur}px ${color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)}`,
  
  // Combine multiple shadows
  combineShadows: (...shadows: string[]) => shadows.join(', '),
  
  // Create focus shadow with custom color
  createFocusShadow: (color: string, opacity = 0.3) =>
    `0px 0px 0px 2px ${color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)}`,
}

export default baseShadows
