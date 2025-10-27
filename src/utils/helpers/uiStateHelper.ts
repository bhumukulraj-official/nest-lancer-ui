/**
 * UI State Helper Utilities
 * UI state management helpers
 */

// Toggle State
export const toggleState = (currentState: boolean): boolean => {
  return !currentState
}

// Toggle Array Item
export const toggleArrayItem = <T>(array: T[], item: T): T[] => {
  if (array.includes(item)) {
    return array.filter(i => i !== item)
  } else {
    return [...array, item]
  }
}

// Add to Array
export const addToArray = <T>(array: T[], item: T): T[] => {
  if (!array.includes(item)) {
    return [...array, item]
  }
  return array
}

// Remove from Array
export const removeFromArray = <T>(array: T[], item: T): T[] => {
  return array.filter(i => i !== item)
}

// Update Array Item
export const updateArrayItem = <T>(array: T[], index: number, item: T): T[] => {
  if (index < 0 || index >= array.length) {
    return array
  }
  
  const newArray = [...array]
  newArray[index] = item
  return newArray
}

// Move Array Item
export const moveArrayItem = <T>(array: T[], fromIndex: number, toIndex: number): T[] => {
  if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
    return array
  }
  
  const newArray = [...array]
  const [movedItem] = newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, movedItem)
  
  return newArray
}

// Sort Array
export const sortArray = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]
    
    if (aValue < bValue) {
      return direction === 'asc' ? -1 : 1
    }
    if (aValue > bValue) {
      return direction === 'asc' ? 1 : -1
    }
    return 0
  })
}

// Filter Array
export const filterArray = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.filter(predicate)
}

// Search Array
export const searchArray = <T>(array: T[], searchTerm: string, searchKeys: (keyof T)[]): T[] => {
  if (!searchTerm) {
    return array
  }
  
  const term = searchTerm.toLowerCase()
  
  return array.filter(item => {
    return searchKeys.some(key => {
      const value = item[key]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term)
      }
      return false
    })
  })
}

// Paginate Array
export const paginateArray = <T>(array: T[], page: number, limit: number): {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
} => {
  const total = array.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const data = array.slice(startIndex, endIndex)
  
  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

// Group Array
export const groupArray = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key])
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

// Unique Array
export const uniqueArray = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}

// Unique Array by Key
export const uniqueArrayByKey = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) {
      return false
    }
    seen.add(value)
    return true
  })
}

// Merge Objects
export const mergeObjects = <T extends Record<string, any>>(obj1: T, obj2: Partial<T>): T => {
  return { ...obj1, ...obj2 }
}

// Deep Merge Objects
export const deepMergeObjects = <T extends Record<string, any>>(obj1: T, obj2: Partial<T>): T => {
  const result = { ...obj1 } as Record<string, any>

  Object.keys(obj2).forEach(key => {
    if (obj2[key] && typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
      result[key] = deepMergeObjects(result[key] || {}, obj2[key])
    } else {
      result[key] = obj2[key]
    }
  })

  return result as T
}

// Get Nested Value
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

// Set Nested Value
export const setNestedValue = (obj: any, path: string, value: any): any => {
  const keys = path.split('.')
  const result = { ...obj }
  let current = result
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[keys[keys.length - 1]] = value
  return result
}
