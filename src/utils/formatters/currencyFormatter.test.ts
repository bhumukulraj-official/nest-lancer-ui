/**
 * Currency Formatter Tests
 */

import { describe, it, expect } from 'vitest'

import { formatCurrency, formatNumber } from './currencyFormatter'

describe('currencyFormatter', () => {
  describe('formatCurrency', () => {
    it('should format currency with default locale', () => {
      expect(formatCurrency(1000)).toContain('1,000')
    })

    it('should format currency with USD symbol', () => {
      expect(formatCurrency(1000, 'USD')).toContain('$')
    })

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBeDefined()
    })
  })

  describe('formatNumber', () => {
    it('should format number with decimals', () => {
      expect(formatNumber(1234.56)).toContain('1234')
    })
  })
})

