/**
 * Validation Constants
 * Validation rules and messages
 */

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/.+/,
  SLUG: /^[a-z0-9-]+$/,
} as const

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PHONE: 'Please enter a valid phone number',
  PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  URL: 'Please enter a valid URL',
  MIN_LENGTH: 'Must be at least {min} characters',
  MAX_LENGTH: 'Must be no more than {max} characters',
  MATCH: 'Values do not match',
} as const

export const VALIDATION_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 50,
  EMAIL_MAX: 255,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  DESCRIPTION_MAX: 1000,
  TITLE_MAX: 200,
} as const
