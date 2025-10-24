/**
 * useLocalStorage Hook
 * localStorage state management hook with TypeScript support
 * Provides persistent state with automatic serialization/deserialization
 */

import { useState, useEffect, useCallback } from 'react'
import { storageService } from '@/services/ui/storageService'

// Hook options
export interface UseLocalStorageOptions<T> {
  defaultValue?: T
  serializer?: {
    read: (value: string) => T
    write: (value: T) => string
  }
  syncAcrossTabs?: boolean
}

// Hook return type
export interface UseLocalStorageReturn<T> {
  value: T
  setValue: (value: T | ((prevValue: T) => T)) => void
  removeValue: () => void
  hasValue: boolean
}

/**
 * localStorage hook with automatic serialization
 */
export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T> = {}
): UseLocalStorageReturn<T> {
  const {
    defaultValue,
    syncAcrossTabs = false,
  } = options
  
  // Initialize state
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storageService.getItem<T>(key, 'local')
      return item !== null ? item : (defaultValue as T)
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue as T
    }
  })
  
  // Set value
  const setValue = useCallback((value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (valueToStore === undefined) {
        storageService.removeItem(key, 'local')
      } else {
        storageService.setItem(key, valueToStore, { type: 'local' })
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])
  
  // Remove value
  const removeValue = useCallback(() => {
    try {
      storageService.removeItem(key, 'local')
      setStoredValue(defaultValue as T)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, defaultValue])
  
  // Check if value exists
  const hasValue = storageService.hasItem(key, 'local')
  
  // Sync across tabs
  useEffect(() => {
    if (!syncAcrossTabs) return
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue)
          setStoredValue(newValue)
        } catch (error) {
          console.warn(`Error syncing localStorage key "${key}":`, error)
        }
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, syncAcrossTabs])
  
  return {
    value: storedValue,
    setValue,
    removeValue,
    hasValue,
  }
}

/**
 * Hook for session storage
 */
export function useSessionStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T> = {}
): UseLocalStorageReturn<T> {
  const {
    defaultValue,
  } = options
  
  // Initialize state
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storageService.getItem<T>(key, 'session')
      return item !== null ? item : (defaultValue as T)
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
      return defaultValue as T
    }
  })
  
  // Set value
  const setValue = useCallback((value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (valueToStore === undefined) {
        storageService.removeItem(key, 'session')
      } else {
        storageService.setItem(key, valueToStore, { type: 'session' })
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])
  
  // Remove value
  const removeValue = useCallback(() => {
    try {
      storageService.removeItem(key, 'session')
      setStoredValue(defaultValue as T)
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key, defaultValue])
  
  // Check if value exists
  const hasValue = storageService.hasItem(key, 'session')
  
  return {
    value: storedValue,
    setValue,
    removeValue,
    hasValue,
  }
}

/**
 * Hook for boolean localStorage values
 */
export function useLocalStorageBoolean(
  key: string,
  defaultValue: boolean = false,
  syncAcrossTabs: boolean = false
) {
  return useLocalStorage(key, {
    defaultValue,
    syncAcrossTabs,
    serializer: {
      read: (value: string) => value === 'true',
      write: (value: boolean) => value.toString(),
    },
  })
}

/**
 * Hook for string localStorage values
 */
export function useLocalStorageString(
  key: string,
  defaultValue: string = '',
  syncAcrossTabs: boolean = false
) {
  return useLocalStorage(key, {
    defaultValue,
    syncAcrossTabs,
    serializer: {
      read: (value: string) => value,
      write: (value: string) => value,
    },
  })
}

/**
 * Hook for number localStorage values
 */
export function useLocalStorageNumber(
  key: string,
  defaultValue: number = 0,
  syncAcrossTabs: boolean = false
) {
  return useLocalStorage(key, {
    defaultValue,
    syncAcrossTabs,
    serializer: {
      read: (value: string) => parseFloat(value),
      write: (value: number) => value.toString(),
    },
  })
}

export default useLocalStorage
