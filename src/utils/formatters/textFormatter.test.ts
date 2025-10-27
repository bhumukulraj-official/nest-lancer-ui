/**
 * Text Formatter Tests
 */

import { describe, it, expect } from 'vitest'

import { truncateText, capitalizeText, toSlug } from './textFormatter'

describe('textFormatter', () => {
  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that needs to be truncated'
      expect(truncateText(longText, 20)).toHaveLength(23) // includes '...'
    })

    it('should not truncate short text', () => {
      expect(truncateText('Short', 20)).toBe('Short')
    })
  })

  describe('capitalizeText', () => {
    it('should capitalize first letter', () => {
      expect(capitalizeText('hello')).toBe('Hello')
    })
  })

  describe('toSlug', () => {
    it('should create URL-friendly slug', () => {
      expect(toSlug('Hello World')).toBe('hello-world')
    })

    it('should handle special characters', () => {
      expect(toSlug('Test@#123')).toBe('test-123')
    })
  })
})

