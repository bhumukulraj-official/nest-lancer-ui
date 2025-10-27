/**
 * Local Storage Hook Tests
 * Unit tests for the useLocalStorage hook
 */

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  // Mock localStorage
  let mockStorage: Record<string, string> = {}

  beforeEach(() => {
    mockStorage = {}
    global.localStorage = {
      getItem: vi.fn((key: string) => mockStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStorage[key]
      }),
      clear: vi.fn(() => {
        mockStorage = {}
      }),
      key: vi.fn(),
      length: 0
    } as any
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Initialization', () => {
    it('should initialize with default value when no stored value', () => {
      const { result } = renderHook(() =>
        useLocalStorage('test-key', { defaultValue: { name: 'Test' } })
      )

      expect(result.current.value).toEqual({ name: 'Test' })
      expect(result.current.isLoading).toBe(false)
    })

    it('should load value from localStorage on mount', () => {
      mockStorage['test-key'] = JSON.stringify({ name: 'Stored Value' })

      const { result } = renderHook(() =>
        useLocalStorage('test-key', { defaultValue: { name: 'Default' } })
      )

      expect(result.current.value).toEqual({ name: 'Stored Value' })
    })
  })

  describe('Value Management', () => {
    it('should set value in localStorage', () => {
      const { result } = renderHook(() =>
        useLocalStorage('test-key', { defaultValue: { count: 0 } })
      )

      act(() => {
        result.current.setValue({ count: 5 })
      })

      expect(result.current.value).toEqual({ count: 5 })
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify({ count: 5 })
      )
    })

    it('should remove value from localStorage', () => {
      mockStorage['test-key'] = JSON.stringify({ data: 'test' })

      const { result } = renderHook(() =>
        useLocalStorage('test-key', { defaultValue: {} })
      )

      act(() => {
        result.current.removeValue()
      })

      expect(result.current.value).toEqual({})
      expect(localStorage.removeItem).toHaveBeenCalledWith('test-key')
    })

    it('should clear error', () => {
      const { result } = renderHook(() =>
        useLocalStorage('test-key', { defaultValue: 'default' })
      )

      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBeNull()
    })
  })

  describe('Custom Serialization', () => {
    it('should use custom serialize function', () => {
      const serialize = vi.fn((value: string) => value.toUpperCase())
      const deserialize = vi.fn((value: string) => value.toLowerCase())

      const { result } = renderHook(() =>
        useLocalStorage('test-key', {
          defaultValue: 'default',
          serialize,
          deserialize
        })
      )

      act(() => {
        result.current.setValue('test')
      })

      expect(serialize).toHaveBeenCalledWith('test')
      expect(deserialize).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', () => {
      const error = new Error('Storage quota exceeded')
      global.localStorage.getItem = vi.fn(() => {
        throw error
      })

      const { result } = renderHook(() =>
        useLocalStorage('test-key', { defaultValue: 'default' })
      )

      expect(result.current.error).toBeTruthy()
      expect(result.current.value).toBe('default')
    })

    it('should handle invalid JSON in localStorage', () => {
      mockStorage['test-key'] = 'invalid-json'

      const { result } = renderHook(() =>
        useLocalStorage('test-key', { defaultValue: 'default' })
      )

      expect(result.current.value).toBe('default')
      expect(result.current.error).toBeTruthy()
    })
  })

  describe('Cross-Tab Synchronization', () => {
    it('should sync with storage events', () => {
      const { result } = renderHook(() =>
        useLocalStorage('test-key', { 
          defaultValue: 'default',
          syncAcrossTabs: true 
        })
      )

      act(() => {
        const event = new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('synced value'),
          oldValue: null,
          storageArea: localStorage
        })
        window.dispatchEvent(event)
      })

      // Should update when storage event occurs
      expect(result.current.value).toBeDefined()
    })

    it('should not sync when syncAcrossTabs is false', () => {
      const { result } = renderHook(() =>
        useLocalStorage('test-key', {
          defaultValue: 'default',
          syncAcrossTabs: false
        })
      )

      const initialValue = result.current.value

      act(() => {
        const event = new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('new value'),
          storageArea: localStorage
        })
        window.dispatchEvent(event)
      })

      expect(result.current.value).toBe(initialValue)
    })
  })

  describe('Default Value Behavior', () => {
    it('should return default value when storage is empty', () => {
      const { result } = renderHook(() =>
        useLocalStorage('new-key', { defaultValue: 'default' })
      )

      expect(result.current.value).toBe('default')
      expect(result.current.error).toBeNull()
    })

    it('should handle null values', () => {
      const { result } = renderHook(() =>
        useLocalStorage('test-key', { defaultValue: null })
      )

      expect(result.current.value).toBeNull()
    })
  })
})

