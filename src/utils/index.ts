/**
 * Utils Index
 * Central export file for all utility functions
 */

// Validation utilities - explicit exports to avoid conflicts
export {
  validateEmail,
  validatePassword,
  validateRequired,
  validateLength,
  validateUrl,
  validateForm
} from './validation'

export {
  validatePhone,
  formatPhoneNumber,
  formatCreditCard,
  formatSSN,
  formatCardExpiry,
  formatPostalCode,
  formatSlug,
  formatTitleCase,
  formatCamelCase,
  formatPascalCase,
  formatSnakeCase,
  formatKebabCase,
  createInputMask,
  removeMasking
} from './validation'

// Formatter utilities - explicit exports to avoid conflicts
export {
  formatDate,
  formatRelativeTime,
  formatDuration
} from './formatters'

export {
  formatCurrency,
  formatCurrencyWithOptions,
  formatCompactCurrency,
  parseCurrency
} from './formatters'

export {
  formatFileSize
} from './formatters'

export {
  formatNumberWithCommas,
  formatDecimal,
  formatOrdinal,
  formatRange
} from './formatters'

export * from './helpers'
