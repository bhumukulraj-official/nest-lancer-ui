/**
 * UI Constants
 * UI constants including sizes, animations, breakpoints, and design tokens
 */

// Breakpoints
export const BREAKPOINTS = {
  XS: '0px',
  SM: '576px',
  MD: '768px',
  LG: '992px',
  XL: '1200px',
  XXL: '1400px',
} as const

// Container Sizes
export const CONTAINER_SIZES = {
  XS: '100%',
  SM: '540px',
  MD: '720px',
  LG: '960px',
  XL: '1140px',
  XXL: '1320px',
} as const

// Spacing Scale
export const SPACING = {
  XS: '0.25rem', // 4px
  SM: '0.5rem',  // 8px
  MD: '1rem',    // 16px
  LG: '1.5rem',  // 24px
  XL: '2rem',    // 32px
  XXL: '3rem',   // 48px
  XXXL: '4rem',  // 64px
} as const

// Font Sizes
export const FONT_SIZES = {
  XS: '0.75rem',   // 12px
  SM: '0.875rem',  // 14px
  MD: '1rem',      // 16px
  LG: '1.125rem',  // 18px
  XL: '1.25rem',   // 20px
  XXL: '1.5rem',   // 24px
  XXXL: '1.875rem', // 30px
  H1: '2.25rem',   // 36px
  H2: '1.875rem',  // 30px
  H3: '1.5rem',    // 24px
  H4: '1.25rem',   // 20px
  H5: '1.125rem',  // 18px
  H6: '1rem',      // 16px
} as const

// Font Weights
export const FONT_WEIGHTS = {
  LIGHT: 300,
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
} as const

// Line Heights
export const LINE_HEIGHTS = {
  TIGHT: 1.25,
  NORMAL: 1.5,
  RELAXED: 1.75,
} as const

// Border Radius
export const BORDER_RADIUS = {
  NONE: '0',
  SM: '0.125rem',  // 2px
  MD: '0.25rem',   // 4px
  LG: '0.5rem',    // 8px
  XL: '0.75rem',   // 12px
  XXL: '1rem',     // 16px
  FULL: '9999px',
} as const

// Shadows
export const SHADOWS = {
  NONE: 'none',
  SM: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  XXL: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  INNER: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const

// Z-Index Scale
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: '150ms',
  NORMAL: '300ms',
  SLOW: '500ms',
  SLOWER: '1000ms',
} as const

// Animation Easing
export const ANIMATION_EASING = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  EASE_IN_CUBIC: 'cubic-bezier(0.4, 0, 1, 1)',
  EASE_OUT_CUBIC: 'cubic-bezier(0, 0, 0.2, 1)',
  EASE_IN_OUT_CUBIC: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// Animation Delays
export const ANIMATION_DELAYS = {
  NONE: '0ms',
  SHORT: '100ms',
  MEDIUM: '200ms',
  LONG: '300ms',
} as const

// Component Sizes
export const COMPONENT_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const

// Button Sizes
export const BUTTON_SIZES = {
  XS: {
    height: '1.5rem',
    padding: '0.25rem 0.5rem',
    fontSize: FONT_SIZES.XS,
  },
  SM: {
    height: '2rem',
    padding: '0.375rem 0.75rem',
    fontSize: FONT_SIZES.SM,
  },
  MD: {
    height: '2.5rem',
    padding: '0.5rem 1rem',
    fontSize: FONT_SIZES.MD,
  },
  LG: {
    height: '3rem',
    padding: '0.75rem 1.5rem',
    fontSize: FONT_SIZES.LG,
  },
  XL: {
    height: '3.5rem',
    padding: '1rem 2rem',
    fontSize: FONT_SIZES.XL,
  },
} as const

// Input Sizes
export const INPUT_SIZES = {
  XS: {
    height: '1.5rem',
    padding: '0.25rem 0.5rem',
    fontSize: FONT_SIZES.XS,
  },
  SM: {
    height: '2rem',
    padding: '0.375rem 0.75rem',
    fontSize: FONT_SIZES.SM,
  },
  MD: {
    height: '2.5rem',
    padding: '0.5rem 1rem',
    fontSize: FONT_SIZES.MD,
  },
  LG: {
    height: '3rem',
    padding: '0.75rem 1.5rem',
    fontSize: FONT_SIZES.LG,
  },
} as const

// Card Sizes
export const CARD_SIZES = {
  SM: {
    padding: SPACING.SM,
    borderRadius: BORDER_RADIUS.MD,
  },
  MD: {
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.LG,
  },
  LG: {
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.XL,
  },
} as const

// Modal Sizes
export const MODAL_SIZES = {
  SM: '300px',
  MD: '500px',
  LG: '800px',
  XL: '1200px',
  FULL: '100vw',
} as const

// Table Sizes
export const TABLE_SIZES = {
  SM: {
    cellPadding: SPACING.SM,
    fontSize: FONT_SIZES.SM,
  },
  MD: {
    cellPadding: SPACING.MD,
    fontSize: FONT_SIZES.MD,
  },
  LG: {
    cellPadding: SPACING.LG,
    fontSize: FONT_SIZES.LG,
  },
} as const

// Form Sizes
export const FORM_SIZES = {
  SM: {
    labelFontSize: FONT_SIZES.SM,
    inputFontSize: FONT_SIZES.SM,
    spacing: SPACING.SM,
  },
  MD: {
    labelFontSize: FONT_SIZES.MD,
    inputFontSize: FONT_SIZES.MD,
    spacing: SPACING.MD,
  },
  LG: {
    labelFontSize: FONT_SIZES.LG,
    inputFontSize: FONT_SIZES.LG,
    spacing: SPACING.LG,
  },
} as const

// Loading States
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

// Toast Positions
export const TOAST_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
} as const

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const

// Pagination Sizes
export const PAGINATION_SIZES = {
  SM: 5,
  MD: 10,
  LG: 20,
  XL: 50,
} as const

// Grid Columns
export const GRID_COLUMNS = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  12: '12',
} as const

// Flex Directions
export const FLEX_DIRECTIONS = {
  ROW: 'row',
  COLUMN: 'column',
  ROW_REVERSE: 'row-reverse',
  COLUMN_REVERSE: 'column-reverse',
} as const

// Flex Wraps
export const FLEX_WRAPS = {
  NOWRAP: 'nowrap',
  WRAP: 'wrap',
  WRAP_REVERSE: 'wrap-reverse',
} as const

// Justify Content
export const JUSTIFY_CONTENT = {
  START: 'flex-start',
  END: 'flex-end',
  CENTER: 'center',
  BETWEEN: 'space-between',
  AROUND: 'space-around',
  EVENLY: 'space-evenly',
} as const

// Align Items
export const ALIGN_ITEMS = {
  START: 'flex-start',
  END: 'flex-end',
  CENTER: 'center',
  BASELINE: 'baseline',
  STRETCH: 'stretch',
} as const

// Text Align
export const TEXT_ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
  JUSTIFY: 'justify',
} as const

// Text Transform
export const TEXT_TRANSFORM = {
  NONE: 'none',
  UPPERCASE: 'uppercase',
  LOWERCASE: 'lowercase',
  CAPITALIZE: 'capitalize',
} as const

// Text Decoration
export const TEXT_DECORATION = {
  NONE: 'none',
  UNDERLINE: 'underline',
  OVERLINE: 'overline',
  LINE_THROUGH: 'line-through',
} as const

// Overflow
export const OVERFLOW = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
  SCROLL: 'scroll',
  AUTO: 'auto',
} as const

// Position
export const POSITION = {
  STATIC: 'static',
  RELATIVE: 'relative',
  ABSOLUTE: 'absolute',
  FIXED: 'fixed',
  STICKY: 'sticky',
} as const

// Display
export const DISPLAY = {
  BLOCK: 'block',
  INLINE: 'inline',
  INLINE_BLOCK: 'inline-block',
  FLEX: 'flex',
  INLINE_FLEX: 'inline-flex',
  GRID: 'grid',
  INLINE_GRID: 'inline-grid',
  NONE: 'none',
} as const

// Cursor
export const CURSOR = {
  AUTO: 'auto',
  DEFAULT: 'default',
  POINTER: 'pointer',
  WAIT: 'wait',
  TEXT: 'text',
  MOVE: 'move',
  HELP: 'help',
  NOT_ALLOWED: 'not-allowed',
} as const

// User Select
export const USER_SELECT = {
  NONE: 'none',
  AUTO: 'auto',
  TEXT: 'text',
  ALL: 'all',
} as const

// Pointer Events
export const POINTER_EVENTS = {
  AUTO: 'auto',
  NONE: 'none',
} as const

// Resize
export const RESIZE = {
  NONE: 'none',
  BOTH: 'both',
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const

// White Space
export const WHITE_SPACE = {
  NORMAL: 'normal',
  NOWRAP: 'nowrap',
  PRE: 'pre',
  PRE_LINE: 'pre-line',
  PRE_WRAP: 'pre-wrap',
} as const

// Word Break
export const WORD_BREAK = {
  NORMAL: 'normal',
  BREAK_ALL: 'break-all',
  KEEP_ALL: 'keep-all',
} as const

// Word Wrap
export const WORD_WRAP = {
  NORMAL: 'normal',
  BREAK_WORD: 'break-word',
} as const
