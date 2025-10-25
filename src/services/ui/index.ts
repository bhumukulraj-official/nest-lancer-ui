/**
 * UI Services Index
 * Central export point for all UI-related services
 */

export { RouterService } from './routerService'
export { AnalyticsUIService } from './analyticsUIService'
export { StorageService } from './storageService'
export { ErrorUIService } from './errorUIService'

// Re-export types for convenience
export type {
  AnalyticsEvent,
  PageViewEvent,
  UserEvent,
  EcommerceEvent
} from './analyticsUIService'