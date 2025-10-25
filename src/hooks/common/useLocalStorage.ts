/**
 * Local Storage Hook
 * Custom hook for local storage management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'

export interface UseLocalStorageOptions<T> {
  defaultValue: T
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
  syncAcrossTabs?: boolean
}

export interface UseLocalStorageReturn<T> {
  // State
  value: T
  isLoading: boolean
  error: string | null

  // Actions
  setValue: (value: T) => void
  removeValue: () => void
  clearError: () => void
}

export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T>
): UseLocalStorageReturn<T> {
  const {
    defaultValue,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    syncAcrossTabs = true
  } = options

  // State
  const [value, setValueState] = useState<T>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get value from localStorage
  const getStoredValue = useCallback((): T => {
    try {
      const storedValue = localStorage.getItem(key)
      if (storedValue === null) {
        return defaultValue
      }
      return deserialize(storedValue)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to read from localStorage'
      setError(errorMessage)
      console.error('Error reading from localStorage:', err)
      return defaultValue
    }
  }, [key, defaultValue, deserialize])

  // Set value in localStorage
  const setStoredValue = useCallback((newValue: T) => {
    try {
      const serializedValue = serialize(newValue)
      localStorage.setItem(key, serializedValue)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to write to localStorage'
      setError(errorMessage)
      console.error('Error writing to localStorage:', err)
    }
  }, [key, serialize])

  // Remove value from localStorage
  const removeStoredValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from localStorage'
      setError(errorMessage)
      console.error('Error removing from localStorage:', err)
    }
  }, [key])

  // Initialize value from localStorage
  useEffect(() => {
    const storedValue = getStoredValue()
    setValueState(storedValue)
    setIsLoading(false)
  }, [getStoredValue])

  // Handle storage events for cross-tab synchronization
  useEffect(() => {
    if (!syncAcrossTabs) return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = deserialize(e.newValue)
          setValueState(newValue)
        } catch (err) {
          console.error('Error deserializing storage event:', err)
        }
      } else if (e.key === key && e.newValue === null) {
        setValueState(defaultValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, defaultValue, deserialize, syncAcrossTabs])

  // Actions
  const setValue = useCallback((newValue: T) => {
    setValueState(newValue)
    setStoredValue(newValue)
  }, [setStoredValue])

  const removeValue = useCallback(() => {
    setValueState(defaultValue)
    removeStoredValue()
  }, [defaultValue, removeStoredValue])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // State
    value,
    isLoading,
    error,

    // Actions
    setValue,
    removeValue,
    clearError
  }
}

export default useLocalStorage
