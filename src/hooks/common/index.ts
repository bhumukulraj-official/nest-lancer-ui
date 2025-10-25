/**
 * Common Hooks Index
 * Central export point for all common hooks
 */

export { usePagination } from './usePagination'
export { useSearch } from './useSearch'
export { useLocalStorage } from './useLocalStorage'

// Re-export types for convenience
export type {
  PaginationState,
  UsePaginationOptions,
  UsePaginationReturn
} from './usePagination'

export type {
  UseSearchOptions,
  UseSearchReturn
} from './useSearch'

export type {
  UseLocalStorageOptions,
  UseLocalStorageReturn
} from './useLocalStorage'
