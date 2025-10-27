/**
 * Token Service Tests
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { tokenService } from './tokenService'

describe('tokenService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('setToken', () => {
    it('should store token in localStorage', () => {
      tokenService.setToken({ accessToken: 'test-token-123' })
      expect(localStorage.getItem('nestlancer_token')).toBe('test-token-123')
    })
  })

  describe('getToken', () => {
    it('should retrieve token from localStorage', () => {
      localStorage.setItem('nestlancer_token', 'test-token-123')
      expect(tokenService.getToken()).toBe('test-token-123')
    })

    it('should return null if no token exists', () => {
      expect(tokenService.getToken()).toBeNull()
    })
  })

  describe('removeToken', () => {
    it('should remove token from localStorage', () => {
      localStorage.setItem('nestlancer_token', 'test-token-123')
      tokenService.removeToken()
      expect(localStorage.getItem('nestlancer_token')).toBeNull()
    })
  })

  describe('hasToken', () => {
    it('should return true if token exists', () => {
      localStorage.setItem('nestlancer_token', 'test-token-123')
      expect(tokenService.hasToken()).toBe(true)
    })

    it('should return false if no token exists', () => {
      expect(tokenService.hasToken()).toBe(false)
    })
  })
})

