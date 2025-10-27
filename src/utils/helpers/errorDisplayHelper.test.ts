/**
 * Error Display Helper Tests
 */

import { describe, it, expect } from 'vitest'

import {
  formatApiError,
  formatNetworkError,
} from './errorDisplayHelper'

describe('errorDisplayHelper', () => {
  describe('formatApiError', () => {
    it('should format API error message', () => {
      const error = { message: 'Test error', status: 400 }
      expect(formatApiError(error as any)).toBe('Test error')
    })

    it('should handle validation errors', () => {
      const error = {
        validationErrors: {
          field1: ['Error 1', 'Error 2'],
          field2: ['Error 3']
        }
      }
      expect(formatApiError(error as any)).toBe('Error 1, Error 2, Error 3')
    })
  })

  describe('formatNetworkError', () => {
    it('should format network error for display', () => {
      const error = { code: 'NETWORK_ERROR', message: 'Test' }
      expect(formatNetworkError(error as any)).toContain('Network connection failed')
    })
  })
})

