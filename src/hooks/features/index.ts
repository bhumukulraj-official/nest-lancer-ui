/**
 * Features Hooks Index
 * Central export point for all feature-related hooks
 */

export { useProjects } from './useProjects'
export { useRequests } from './useRequests'
export { useQuotes } from './useQuotes'
export { usePayments } from './usePayments'
export { useMessaging } from './useMessaging'
export { useNotifications } from './useNotifications'
export { useWebSocket } from './useWebSocket'

// Re-export types for convenience
export type {
  UseProjectsOptions,
  UseProjectsReturn
} from './useProjects'

export type {
  UseRequestsOptions,
  UseRequestsReturn
} from './useRequests'

export type {
  UseQuotesOptions,
  UseQuotesReturn
} from './useQuotes'

export type {
  UsePaymentsOptions,
  UsePaymentsReturn
} from './usePayments'

export type {
  UseMessagingOptions,
  UseMessagingReturn
} from './useMessaging'

export type {
  UseNotificationsOptions,
  UseNotificationsReturn
} from './useNotifications'

export type {
  WebSocketMessage,
  UseWebSocketOptions,
  UseWebSocketReturn
} from './useWebSocket'
