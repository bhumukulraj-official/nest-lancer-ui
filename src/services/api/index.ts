/**
 * API Services Index
 * Central export point for all API-related services and utilities
 */

export { apiClient, type ApiClient } from './client'
export { createApiError, getDefaultErrorMessage } from './interceptors'
export { API_ENDPOINTS, WEBSOCKET_EVENTS } from './endpoints'
export * from './endpoints'

// Re-export for convenience
export { apiClient as default } from './client'
