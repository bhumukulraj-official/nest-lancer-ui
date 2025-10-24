/**
 * Error UI Service
 * Error display helpers for user-friendly error handling
 * UI-only service - formats backend errors for display
 */

import { ApiError } from '@/types/api/error.types'

// Error severity levels for UI display
export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical'

// UI Error Display Format
export interface UIError {
  id: string
  title: string
  message: string
  severity: ErrorSeverity
  code?: string
  timestamp: string
  dismissible: boolean
  actionable: boolean
  actions?: UIErrorAction[]
  details?: string
  context?: Record<string, any>
}

export interface UIErrorAction {
  label: string
  action: () => void | Promise<void>
  variant?: 'primary' | 'secondary' | 'danger'
}

class ErrorUIService {
  private errorCounter = 0

  /**
   * Transform API error to UI-friendly error format
   */
  formatApiError(apiError: ApiError, context?: Record<string, any>): UIError {
    const errorId = this.generateErrorId()
    const severity = this.determineSeverity(apiError.status, apiError.code)
    
    return {
      id: errorId,
      title: this.getErrorTitle(apiError.status, apiError.code),
      message: this.getDisplayMessage(apiError),
      severity,
      code: apiError.code,
      timestamp: apiError.timestamp || new Date().toISOString(),
      dismissible: this.isDismissible(severity),
      actionable: this.isActionable(apiError.status),
      actions: this.getErrorActions(apiError),
      details: this.formatErrorDetails(apiError),
      context,
    }
  }

  /**
   * Format general error for UI display
   */
  formatError(
    error: Error | string, 
    options: {
      title?: string
      severity?: ErrorSeverity
      code?: string
      actionable?: boolean
      actions?: UIErrorAction[]
    } = {}
  ): UIError {
    const message = typeof error === 'string' ? error : error.message
    const errorId = this.generateErrorId()
    
    return {
      id: errorId,
      title: options.title || 'Error',
      message: this.sanitizeMessage(message),
      severity: options.severity || 'error',
      code: options.code,
      timestamp: new Date().toISOString(),
      dismissible: true,
      actionable: options.actionable || false,
      actions: options.actions,
    }
  }

  /**
   * Format validation errors for forms
   */
  formatValidationErrors(errors: Record<string, string[]>): UIError[] {
    return Object.entries(errors).map(([field, messages]) => ({
      id: this.generateErrorId(),
      title: `${this.capitalizeField(field)} Error`,
      message: messages.join(', '),
      severity: 'warning' as ErrorSeverity,
      code: 'VALIDATION_ERROR',
      timestamp: new Date().toISOString(),
      dismissible: true,
      actionable: false,
      context: { field },
    }))
  }

  /**
   * Create network error for display
   */
  createNetworkError(): UIError {
    return {
      id: this.generateErrorId(),
      title: 'Connection Error',
      message: 'Unable to connect to the server. Please check your internet connection.',
      severity: 'error',
      code: 'NETWORK_ERROR',
      timestamp: new Date().toISOString(),
      dismissible: true,
      actionable: true,
      actions: [
        {
          label: 'Retry',
          action: () => window.location.reload(),
          variant: 'primary',
        },
        {
          label: 'Check Connection',
          action: () => {
            const windowRef = window.open('https://www.google.com', '_blank')
            if (windowRef) {
              windowRef.focus()
            }
          },
          variant: 'secondary',
        },
      ],
    }
  }

  /**
   * Create timeout error for display
   */
  createTimeoutError(): UIError {
    return {
      id: this.generateErrorId(),
      title: 'Request Timeout',
      message: 'The request took too long to complete. Please try again.',
      severity: 'warning',
      code: 'TIMEOUT_ERROR',
      timestamp: new Date().toISOString(),
      dismissible: true,
      actionable: true,
      actions: [
        {
          label: 'Try Again',
          action: () => window.location.reload(),
          variant: 'primary',
        },
      ],
    }
  }

  /**
   * Get user-friendly error title based on status and code
   */
  private getErrorTitle(status: number, code?: string): string {
    if (code) {
      switch (code) {
        case 'VALIDATION_ERROR':
          return 'Validation Error'
        case 'AUTHENTICATION_ERROR':
          return 'Authentication Required'
        case 'AUTHORIZATION_ERROR':
          return 'Access Denied'
        case 'RATE_LIMIT_ERROR':
          return 'Too Many Requests'
        case 'NETWORK_ERROR':
          return 'Connection Error'
        case 'TIMEOUT_ERROR':
          return 'Request Timeout'
        default:
          break
      }
    }

    switch (status) {
      case 400:
        return 'Invalid Request'
      case 401:
        return 'Authentication Required'
      case 403:
        return 'Access Denied'
      case 404:
        return 'Not Found'
      case 409:
        return 'Conflict'
      case 422:
        return 'Validation Error'
      case 429:
        return 'Rate Limited'
      case 500:
        return 'Server Error'
      case 502:
        return 'Service Unavailable'
      case 503:
        return 'Maintenance Mode'
      default:
        return 'Error'
    }
  }

  /**
   * Determine error severity based on status code
   */
  private determineSeverity(status: number, code?: string): ErrorSeverity {
    if (code === 'VALIDATION_ERROR') return 'warning'
    if (code === 'RATE_LIMIT_ERROR') return 'warning'
    
    if (status >= 500) return 'critical'
    if (status >= 400) return 'error'
    return 'warning'
  }

  /**
   * Get display message with fallbacks
   */
  private getDisplayMessage(apiError: ApiError): string {
    if (apiError.message) {
      return this.sanitizeMessage(apiError.message)
    }
    
    // Fallback messages
    switch (apiError.status) {
      case 400:
        return 'The request was invalid. Please check your input and try again.'
      case 401:
        return 'Please log in to continue.'
      case 403:
        return 'You do not have permission to perform this action.'
      case 404:
        return 'The requested resource was not found.'
      case 500:
        return 'A server error occurred. Our team has been notified.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  /**
   * Format error details for expandable error display
   */
  private formatErrorDetails(apiError: ApiError): string {
    const details: string[] = []
    
    if (apiError.code) {
      details.push(`Error Code: ${apiError.code}`)
    }
    
    if (apiError.path) {
      details.push(`Endpoint: ${apiError.path}`)
    }
    
    if (apiError.timestamp) {
      details.push(`Time: ${new Date(apiError.timestamp).toLocaleString()}`)
    }
    
    if (apiError.validationErrors) {
      details.push('Validation Errors:')
      Object.entries(apiError.validationErrors).forEach(([field, messages]) => {
        details.push(`  ${field}: ${messages.join(', ')}`)
      })
    }
    
    return details.join('\n')
  }

  /**
   * Determine if error should be dismissible
   */
  private isDismissible(severity: ErrorSeverity): boolean {
    return severity !== 'critical'
  }

  /**
   * Determine if error is actionable (has possible user actions)
   */
  private isActionable(status: number): boolean {
    return [401, 403, 404, 429, 500, 502, 503].includes(status)
  }

  /**
   * Get contextual actions for errors
   */
  private getErrorActions(apiError: ApiError): UIErrorAction[] {
    const actions: UIErrorAction[] = []
    
    switch (apiError.status) {
      case 401:
        actions.push({
          label: 'Log In',
          action: () => { window.location.href = '/auth/login' },
          variant: 'primary',
        })
        break
        
      case 403:
        actions.push({
          label: 'Go Home',
          action: () => { window.location.href = '/' },
          variant: 'secondary',
        })
        break
        
      case 404:
        actions.push({
          label: 'Go Back',
          action: () => window.history.back(),
          variant: 'secondary',
        })
        break
        
      case 429:
        actions.push({
          label: 'Try Again Later',
          action: () => window.location.reload(),
          variant: 'primary',
        })
        break
        
      case 500:
      case 502:
      case 503:
        actions.push({
          label: 'Refresh Page',
          action: () => window.location.reload(),
          variant: 'primary',
        })
        break
    }
    
    return actions
  }

  /**
   * Sanitize error message for safe display
   */
  private sanitizeMessage(message: string): string {
    // Remove any potential HTML/script tags
    return message
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .trim()
  }

  /**
   * Capitalize field name for display
   */
  private capitalizeField(field: string): string {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  /**
   * Generate unique error ID
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${++this.errorCounter}`
  }
}

// Export singleton instance
export const errorUIService = new ErrorUIService()
export default errorUIService
