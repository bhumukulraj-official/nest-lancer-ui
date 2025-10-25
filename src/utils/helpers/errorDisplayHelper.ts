/**
 * Error Display Helper Utilities
 * Error message display helpers
 */

import { ApiError, ValidationError, NetworkError } from '../../types'

// Format API Error
export const formatApiError = (error: ApiError): string => {
  if (error.validationErrors) {
    const errors = Object.values(error.validationErrors).flat()
    return errors.join(', ')
  }
  
  return error.message || 'An unexpected error occurred'
}

// Format Validation Error
export const formatValidationError = (error: ValidationError): string => {
  if (error.validationErrors) {
    const errors = Object.values(error.validationErrors).flat()
    return errors.join(', ')
  }
  
  return error.message || 'Validation failed'
}

// Format Network Error
export const formatNetworkError = (error: NetworkError): string => {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Network connection failed. Please check your internet connection.'
    case 'TIMEOUT_ERROR':
      return 'Request timed out. Please try again.'
    case 'CONNECTION_ERROR':
      return 'Connection error. Please try again later.'
    default:
      return error.message || 'Network error occurred'
  }
}

// Get Error Severity
export const getErrorSeverity = (error: ApiError): 'low' | 'medium' | 'high' => {
  if (error.status >= 500) return 'high'
  if (error.status >= 400) return 'medium'
  return 'low'
}

// Get Error Icon
export const getErrorIcon = (error: ApiError): string => {
  const severity = getErrorSeverity(error)
  
  switch (severity) {
    case 'high':
      return '⚠️'
    case 'medium':
      return '⚠️'
    case 'low':
      return 'ℹ️'
    default:
      return '❌'
  }
}

// Get Error Color
export const getErrorColor = (error: ApiError): string => {
  const severity = getErrorSeverity(error)
  
  switch (severity) {
    case 'high':
      return '#dc3545' // Red
    case 'medium':
      return '#ffc107' // Yellow
    case 'low':
      return '#17a2b8' // Blue
    default:
      return '#6c757d' // Gray
  }
}
