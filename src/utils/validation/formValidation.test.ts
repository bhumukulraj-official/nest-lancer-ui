/**
 * Form Validation Tests
 */

import { describe, it, expect } from 'vitest'

import {
  validateEmail,
  validatePassword,
  validateRequired,
} from './formValidation'

describe('formValidation', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(validateEmail('invalid')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      expect(validatePassword('Password123!')).toBe(true)
    })

    it('should reject weak password', () => {
      expect(validatePassword('weak')).toBe(false)
    })
  })

  describe('validateRequired', () => {
    it('should validate non-empty value', () => {
      expect(validateRequired('test')).toBe(true)
    })

    it('should reject empty value', () => {
      expect(validateRequired('')).toBe(false)
    })
  })
})

