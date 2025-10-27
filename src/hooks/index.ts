/**
 * Hooks Index
 * Central export point for all custom hooks
 */

// Form hooks
export * from './form'

// Feature hooks
export * from './features'

// Admin hooks
export * from './admin'

// Common hooks - explicit exports to avoid conflicts
export { usePagination } from './common'
export { useSearch } from './common'
export type {
  PaginationState,
  UsePaginationOptions,
  UsePaginationReturn
} from './common'
export type {
  UseSearchOptions,
  UseSearchReturn
} from './common'

// Auth hooks (already implemented)
export * from './auth'

// API hooks (already implemented)
export * from './api'

// UI hooks (already implemented)
export * from './ui'