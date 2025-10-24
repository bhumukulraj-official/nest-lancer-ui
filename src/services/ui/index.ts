/**
 * UI Services Index
 * Central export point for all UI-related services and utilities
 */

export { storageService, type StorageType, type StorageItem } from './storageService'
export { errorUIService, type UIError, type UIErrorAction, type ErrorSeverity } from './errorUIService'

// Re-export for convenience
export { storageService as default } from './storageService'
