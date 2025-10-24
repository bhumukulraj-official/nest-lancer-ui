/**
 * API Error Types
 * TypeScript type definitions for API error responses and handling
 */

// Standard API Error Response from Backend
export interface ApiErrorResponse {
  message: string
  status: number
  code: string
  details?: any
  timestamp: string
  path: string
  validationErrors?: Record<string, string[]>
}

// Standardized API Error for Frontend Use
export interface ApiError {
  message: string
  status: number
  code: string
  details?: any
  timestamp: string
  path: string
  validationErrors?: Record<string, string[]>
}

// Network Error Types
export interface NetworkError extends ApiError {
  code: 'NETWORK_ERROR' | 'TIMEOUT_ERROR' | 'CONNECTION_ERROR'
  status: 0
}

// Authentication Error Types
export interface AuthError extends ApiError {
  code: 'AUTHENTICATION_ERROR' | 'TOKEN_EXPIRED' | 'INVALID_CREDENTIALS'
  status: 401
}

// Authorization Error Types
export interface AuthorizationError extends ApiError {
  code: 'AUTHORIZATION_ERROR' | 'INSUFFICIENT_PERMISSIONS' | 'ACCESS_DENIED'
  status: 403
}

// Validation Error Types
export interface ValidationError extends ApiError {
  code: 'VALIDATION_ERROR'
  status: 422
  validationErrors: Record<string, string[]>
}

// Rate Limiting Error Types
export interface RateLimitError extends ApiError {
  code: 'RATE_LIMIT_ERROR'
  status: 429
  details: {
    limit: number
    remaining: number
    resetTime: string
  }
}

// Server Error Types
export interface ServerError extends ApiError {
  code: 'INTERNAL_ERROR' | 'SERVICE_UNAVAILABLE' | 'MAINTENANCE_MODE'
  status: 500 | 502 | 503
}

// Union type for all possible API errors
export type ApiErrorType = 
  | ApiError 
  | NetworkError 
  | AuthError 
  | AuthorizationError 
  | ValidationError 
  | RateLimitError 
  | ServerError

// Error Code Constants
export const ERROR_CODES = {
  // Network Errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  
  // Authentication Errors
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  
  // Authorization Errors
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  ACCESS_DENIED: 'ACCESS_DENIED',
  
  // Validation Errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  
  // Rate Limiting
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  
  // Server Errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
  
  // Client Errors
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  
  // Unknown
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]

// HTTP Status Code Constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const

export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS]
