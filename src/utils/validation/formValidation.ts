/**
 * Form Validation Utilities
 * Basic form validation helpers for UX feedback
 */

import { VALIDATION_RULES, VALIDATION_MESSAGES, VALIDATION_LIMITS } from '../../constants'

// Validation Result Interface
export interface ValidationResult {
  isValid: boolean
  message?: string
}

// Email Validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED }
  }
  
  if (!VALIDATION_RULES.EMAIL.test(email)) {
    return { isValid: false, message: VALIDATION_MESSAGES.EMAIL }
  }
  
  if (email.length > VALIDATION_LIMITS.EMAIL_MAX) {
    return { isValid: false, message: VALIDATION_MESSAGES.MAX_LENGTH.replace('{max}', VALIDATION_LIMITS.EMAIL_MAX.toString()) }
  }
  
  return { isValid: true }
}

// Password Validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED }
  }
  
  if (password.length < VALIDATION_LIMITS.PASSWORD_MIN) {
    return { isValid: false, message: VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', VALIDATION_LIMITS.PASSWORD_MIN.toString()) }
  }
  
  if (password.length > VALIDATION_LIMITS.PASSWORD_MAX) {
    return { isValid: false, message: VALIDATION_MESSAGES.MAX_LENGTH.replace('{max}', VALIDATION_LIMITS.PASSWORD_MAX.toString()) }
  }
  
  if (!VALIDATION_RULES.PASSWORD.test(password)) {
    return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD }
  }
  
  return { isValid: true }
}

// Name Validation
export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED }
  }
  
  if (name.length < VALIDATION_LIMITS.NAME_MIN) {
    return { isValid: false, message: VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', VALIDATION_LIMITS.NAME_MIN.toString()) }
  }
  
  if (name.length > VALIDATION_LIMITS.NAME_MAX) {
    return { isValid: false, message: VALIDATION_MESSAGES.MAX_LENGTH.replace('{max}', VALIDATION_LIMITS.NAME_MAX.toString()) }
  }
  
  return { isValid: true }
}

// Phone Validation
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: true } // Phone is optional
  }
  
  if (!VALIDATION_RULES.PHONE.test(phone)) {
    return { isValid: false, message: VALIDATION_MESSAGES.PHONE }
  }
  
  return { isValid: true }
}

// URL Validation
export const validateUrl = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: true } // URL is optional
  }
  
  if (!VALIDATION_RULES.URL.test(url)) {
    return { isValid: false, message: VALIDATION_MESSAGES.URL }
  }
  
  return { isValid: true }
}

// Required Field Validation
export const validateRequired = (value: any): ValidationResult => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED }
  }
  
  return { isValid: true }
}

// Length Validation
export const validateLength = (value: string, min?: number, max?: number): ValidationResult => {
  if (!value) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED }
  }
  
  if (min && value.length < min) {
    return { isValid: false, message: VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', min.toString()) }
  }
  
  if (max && value.length > max) {
    return { isValid: false, message: VALIDATION_MESSAGES.MAX_LENGTH.replace('{max}', max.toString()) }
  }
  
  return { isValid: true }
}

// Match Validation
export const validateMatch = (value1: any, value2: any): ValidationResult => {
  if (value1 !== value2) {
    return { isValid: false, message: VALIDATION_MESSAGES.MATCH }
  }
  
  return { isValid: true }
}

// Form Validation Helper
export const validateForm = (formData: Record<string, any>, rules: Record<string, (value: any) => ValidationResult>): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  Object.keys(rules).forEach(field => {
    const validator = rules[field]
    const result = validator(formData[field])
    
    if (!result.isValid && result.message) {
      errors[field] = result.message
    }
  })
  
  return errors
}
