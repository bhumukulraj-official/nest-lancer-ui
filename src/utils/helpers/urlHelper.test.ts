/**
 * URL Helper Tests
 */

import { describe, it, expect } from 'vitest'

import { isValidUrl, normalizeUrl, getDomain } from './urlHelper'

describe('urlHelper', () => {
  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false)
    })
  })

  describe('normalizeUrl', () => {
    it('should add https protocol if missing', () => {
      expect(normalizeUrl('example.com')).toBe('https://example.com')
    })

    it('should not modify URLs with protocol', () => {
      expect(normalizeUrl('https://example.com')).toBe('https://example.com')
    })
  })

  describe('getDomain', () => {
    it('should extract domain name', () => {
      expect(getDomain('https://www.example.com/path')).toBe('www.example.com')
    })
  })
})

