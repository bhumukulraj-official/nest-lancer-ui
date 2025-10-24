/**
 * Storage Service
 * Browser storage wrapper for localStorage and sessionStorage
 * UI-only service for client-side state persistence
 */

// Storage types
export type StorageType = 'local' | 'session'

// Storage utility interface
export interface StorageItem<T = any> {
  value: T
  timestamp: number
  expiry?: number
}

class StorageService {
  /**
   * Get storage instance based on type
   */
  private getStorage(type: StorageType): Storage {
    switch (type) {
      case 'local':
        return localStorage
      case 'session':
        return sessionStorage
      default:
        return localStorage
    }
  }

  /**
   * Store data with optional expiry
   */
  setItem<T>(
    key: string, 
    value: T, 
    options: {
      type?: StorageType
      expiryMinutes?: number
    } = {}
  ): boolean {
    try {
      const { type = 'local', expiryMinutes } = options
      const storage = this.getStorage(type)
      
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiry: expiryMinutes ? Date.now() + (expiryMinutes * 60 * 1000) : undefined,
      }
      
      storage.setItem(key, JSON.stringify(item))
      return true
    } catch (error) {
      console.error(`Failed to store item "${key}":`, error)
      return false
    }
  }

  /**
   * Retrieve data from storage
   */
  getItem<T>(key: string, type: StorageType = 'local'): T | null {
    try {
      const storage = this.getStorage(type)
      const rawItem = storage.getItem(key)
      
      if (!rawItem) {
        return null
      }
      
      const item: StorageItem<T> = JSON.parse(rawItem)
      
      // Check if item has expired
      if (item.expiry && Date.now() > item.expiry) {
        this.removeItem(key, type)
        return null
      }
      
      return item.value
    } catch (error) {
      console.error(`Failed to retrieve item "${key}":`, error)
      return null
    }
  }

  /**
   * Remove item from storage
   */
  removeItem(key: string, type: StorageType = 'local'): boolean {
    try {
      const storage = this.getStorage(type)
      storage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Failed to remove item "${key}":`, error)
      return false
    }
  }

  /**
   * Check if item exists in storage
   */
  hasItem(key: string, type: StorageType = 'local'): boolean {
    return this.getItem(key, type) !== null
  }

  /**
   * Clear all items from storage
   */
  clear(type: StorageType = 'local'): boolean {
    try {
      const storage = this.getStorage(type)
      storage.clear()
      return true
    } catch (error) {
      console.error(`Failed to clear ${type} storage:`, error)
      return false
    }
  }

  /**
   * Get all keys from storage
   */
  getKeys(type: StorageType = 'local'): string[] {
    try {
      const storage = this.getStorage(type)
      const keys: string[] = []
      
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)
        if (key) {
          keys.push(key)
        }
      }
      
      return keys
    } catch (error) {
      console.error(`Failed to get keys from ${type} storage:`, error)
      return []
    }
  }

  /**
   * Get storage size in bytes (approximate)
   */
  getStorageSize(type: StorageType = 'local'): number {
    try {
      const storage = this.getStorage(type)
      let size = 0
      
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)
        if (key) {
          const value = storage.getItem(key)
          if (value) {
            size += key.length + value.length
          }
        }
      }
      
      return size
    } catch (error) {
      console.error(`Failed to calculate ${type} storage size:`, error)
      return 0
    }
  }

  /**
   * Check if storage is available
   */
  isStorageAvailable(type: StorageType = 'local'): boolean {
    try {
      const storage = this.getStorage(type)
      const testKey = '__storage_test__'
      
      storage.setItem(testKey, 'test')
      storage.removeItem(testKey)
      
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Clean up expired items
   */
  cleanupExpired(type: StorageType = 'local'): number {
    try {
      const storage = this.getStorage(type)
      const keys = this.getKeys(type)
      let cleanedCount = 0
      
      keys.forEach(key => {
        try {
          const rawItem = storage.getItem(key)
          if (rawItem) {
            const item: StorageItem = JSON.parse(rawItem)
            
            if (item.expiry && Date.now() > item.expiry) {
              storage.removeItem(key)
              cleanedCount++
            }
          }
        } catch (error) {
          // Invalid item format - remove it
          storage.removeItem(key)
          cleanedCount++
        }
      })
      
      return cleanedCount
    } catch (error) {
      console.error(`Failed to cleanup expired items from ${type} storage:`, error)
      return 0
    }
  }

  /**
   * Store object with nested key path
   */
  setNestedItem<T>(
    keyPath: string[], 
    value: T, 
    options: { type?: StorageType; expiryMinutes?: number } = {}
  ): boolean {
    try {
      const rootKey = keyPath[0]
      const rootData = this.getItem(rootKey, options.type) || {}
      
      let current: any = rootData
      for (let i = 1; i < keyPath.length - 1; i++) {
        if (!current[keyPath[i]]) {
          current[keyPath[i]] = {}
        }
        current = current[keyPath[i]]
      }
      
      current[keyPath[keyPath.length - 1]] = value
      
      return this.setItem(rootKey, rootData, options)
    } catch (error) {
      console.error(`Failed to store nested item "${keyPath.join('.')}":`, error)
      return false
    }
  }

  /**
   * Get object from nested key path
   */
  getNestedItem<T>(keyPath: string[], type: StorageType = 'local'): T | null {
    try {
      const rootKey = keyPath[0]
      const rootData = this.getItem(rootKey, type)
      
      if (!rootData) {
        return null
      }
      
      let current: any = rootData
      for (let i = 1; i < keyPath.length; i++) {
        if (!current[keyPath[i]]) {
          return null
        }
        current = current[keyPath[i]]
      }
      
      return current as T
    } catch (error) {
      console.error(`Failed to retrieve nested item "${keyPath.join('.')}":`, error)
      return null
    }
  }
}

// Export singleton instance
export const storageService = new StorageService()
export default storageService
