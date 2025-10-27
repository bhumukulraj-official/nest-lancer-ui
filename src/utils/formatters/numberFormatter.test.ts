/**
 * Number Formatter Tests
 */

import { describe, it, expect } from 'vitest'

import { formatNumberWithCommas, formatPercentage, formatCompactNumber } from './numberFormatter'

describe('numberFormatter', () => {
  describe('formatNumberWithCommas', () => {
    it('should format number with commas', () => {
      expect(formatNumberWithCommas(1000)).toBe('1,000')
    })

    it('should handle decimals', () => {
      expect(formatNumberWithCommas(1234.56)).toBe('1,234.56')
    })
  })

  describe('formatPercentage', () => {
    it('should format as percentage', () => {
      expect(formatPercentage(0.15)).toContain('%')
    })
  })

  describe('formatCompactNumber', () => {
    it('should format as K', () => {
      expect(formatCompactNumber(1500)).toContain('K')
    })

    it('should format as M', () => {
      expect(formatCompactNumber(1500000)).toContain('M')
    })
  })
})

