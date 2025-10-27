/**
 * Date Formatter Tests
 */

import { describe, it, expect } from 'vitest'

import { formatDate, formatRelativeTime } from './dateFormatter'

describe('dateFormatter', () => {
  const testDate = new Date('2024-01-15T10:30:00Z')

  describe('formatDate', () => {
    it('should format date', () => {
      expect(formatDate(testDate)).toBeDefined()
    })

    it('should handle null dates', () => {
      expect(formatDate(null as any)).toBe('')
    })
  })

  describe('formatRelativeTime', () => {
    it('should format relative time', () => {
      const pastDate = new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
      expect(formatRelativeTime(pastDate)).toContain('ago')
    })
  })
})

