/**
 * Form Validation Hook
 * Custom hook for form validation logic
 * UI-only hook - no business logic processing
 */

import { useCallback, useMemo } from 'react'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  email?: boolean
  url?: boolean
  phone?: boolean
  custom?: (value: any) => string | undefined
}

export interface ValidationRules<T = any> {
  [K in keyof T]?: ValidationRule
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface UseFormValidationOptions<T = any> {
  rules: ValidationRules<T>
  validateOnChange?: boolean
  validateOnBlur?: boolean
}

export function useFormValidation<T = any>(options: UseFormValidationOptions<T>) {
  const { rules, validateOnChange = true, validateOnBlur = true } = options

  // Validation functions
  const validateRequired = useCallback((value: any): string | undefined => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required'
    }
    return undefined
  }, [])

  const validateMinLength = useCallback((value: string, minLength: number): string | undefined => {
    if (value && value.length < minLength) {
      return `Minimum length is ${minLength} characters`
    }
    return undefined
  }, [])

  const validateMaxLength = useCallback((value: string, maxLength: number): string | undefined => {
    if (value && value.length > maxLength) {
      return `Maximum length is ${maxLength} characters`
    }
    return undefined
  }, [])

  const validateMin = useCallback((value: number, min: number): string | undefined => {
    if (value !== null && value !== undefined && value < min) {
      return `Minimum value is ${min}`
    }
    return undefined
  }, [])

  const validateMax = useCallback((value: number, max: number): string | undefined => {
    if (value !== null && value !== undefined && value > max) {
      return `Maximum value is ${max}`
    }
    return undefined
  }, [])

  const validatePattern = useCallback((value: string, pattern: RegExp): string | undefined => {
    if (value && !pattern.test(value)) {
      return 'Invalid format'
    }
    return undefined
  }, [])

  const validateEmail = useCallback((value: string): string | undefined => {
    if (value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(value)) {
        return 'Invalid email address'
      }
    }
    return undefined
  }, [])

  const validateUrl = useCallback((value: string): string | undefined => {
    if (value) {
      try {
        new URL(value)
      } catch {
        return 'Invalid URL'
      }
    }
    return undefined
  }, [])

  const validatePhone = useCallback((value: string): string | undefined => {
    if (value) {
      const phonePattern = /^[\+]?[1-9][\d]{0,15}$/
      if (!phonePattern.test(value.replace(/[\s\-\(\)]/g, ''))) {
        return 'Invalid phone number'
      }
    }
    return undefined
  }, [])

  // Main validation function
  const validateField = useCallback((field: keyof T, value: any): string | undefined => {
    const rule = rules[field]
    if (!rule) return undefined

    // Required validation
    if (rule.required) {
      const requiredError = validateRequired(value)
      if (requiredError) return requiredError
    }

    // Skip other validations if value is empty and not required
    if (!value && !rule.required) return undefined

    // Min length validation
    if (rule.minLength && typeof value === 'string') {
      const minLengthError = validateMinLength(value, rule.minLength)
      if (minLengthError) return minLengthError
    }

    // Max length validation
    if (rule.maxLength && typeof value === 'string') {
      const maxLengthError = validateMaxLength(value, rule.maxLength)
      if (maxLengthError) return maxLengthError
    }

    // Min value validation
    if (rule.min !== undefined && typeof value === 'number') {
      const minError = validateMin(value, rule.min)
      if (minError) return minError
    }

    // Max value validation
    if (rule.max !== undefined && typeof value === 'number') {
      const maxError = validateMax(value, rule.max)
      if (maxError) return maxError
    }

    // Pattern validation
    if (rule.pattern && typeof value === 'string') {
      const patternError = validatePattern(value, rule.pattern)
      if (patternError) return patternError
    }

    // Email validation
    if (rule.email && typeof value === 'string') {
      const emailError = validateEmail(value)
      if (emailError) return emailError
    }

    // URL validation
    if (rule.url && typeof value === 'string') {
      const urlError = validateUrl(value)
      if (urlError) return urlError
    }

    // Phone validation
    if (rule.phone && typeof value === 'string') {
      const phoneError = validatePhone(value)
      if (phoneError) return phoneError
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value)
      if (customError) return customError
    }

    return undefined
  }, [rules, validateRequired, validateMinLength, validateMaxLength, validateMin, validateMax, validatePattern, validateEmail, validateUrl, validatePhone])

  // Validate all fields
  const validateForm = useCallback((values: T): ValidationResult => {
    const errors: Record<string, string> = {}
    let isValid = true

    Object.keys(rules).forEach(field => {
      const fieldKey = field as keyof T
      const error = validateField(fieldKey, values[fieldKey])
      if (error) {
        errors[field] = error
        isValid = false
      }
    })

    return { isValid, errors }
  }, [rules, validateField])

  // Validate specific fields
  const validateFields = useCallback((fields: (keyof T)[], values: T): ValidationResult => {
    const errors: Record<string, string> = {}
    let isValid = true

    fields.forEach(field => {
      const error = validateField(field, values[field])
      if (error) {
        errors[field as string] = error
        isValid = false
      }
    })

    return { isValid, errors }
  }, [validateField])

  // Get validation rules for a field
  const getFieldRules = useCallback((field: keyof T): ValidationRule | undefined => {
    return rules[field]
  }, [rules])

  // Check if field has specific rule
  const hasRule = useCallback((field: keyof T, ruleName: keyof ValidationRule): boolean => {
    const rule = rules[field]
    return rule ? rule[ruleName] !== undefined : false
  }, [rules])

  // Get error message for field
  const getFieldError = useCallback((field: keyof T, value: any): string | undefined => {
    return validateField(field, value)
  }, [validateField])

  // Validation helpers
  const validationHelpers = useMemo(() => ({
    isRequired: (field: keyof T) => hasRule(field, 'required'),
    getMinLength: (field: keyof T) => rules[field]?.minLength,
    getMaxLength: (field: keyof T) => rules[field]?.maxLength,
    getMin: (field: keyof T) => rules[field]?.min,
    getMax: (field: keyof T) => rules[field]?.max,
    getPattern: (field: keyof T) => rules[field]?.pattern,
    isEmail: (field: keyof T) => hasRule(field, 'email'),
    isUrl: (field: keyof T) => hasRule(field, 'url'),
    isPhone: (field: keyof T) => hasRule(field, 'phone'),
    hasCustomValidation: (field: keyof T) => hasRule(field, 'custom')
  }), [rules, hasRule])

  return {
    validateField,
    validateForm,
    validateFields,
    getFieldRules,
    hasRule,
    getFieldError,
    validationHelpers,
    validateOnChange,
    validateOnBlur
  }
}

export default useFormValidation
