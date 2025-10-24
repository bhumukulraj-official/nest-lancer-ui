/**
 * API Interceptors
 * Request/response interceptors for authentication and error handling
 * Handles JWT token attachment and UI-friendly error processing
 */

import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { apiClient } from './client'
import { tokenService } from '@/services/auth/tokenService'
import { ApiError, ApiErrorResponse } from '@/types/api/error.types'

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from storage (if available)
    const token = tokenService.getToken()
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add request timestamp for debugging
    if (import.meta.env.DEV) {
      (config as any).metadata = { requestStartTime: Date.now() }
    }
    
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response time in development
    if (import.meta.env.DEV && (response.config as any).metadata?.requestStartTime) {
      const duration = Date.now() - (response.config as any).metadata.requestStartTime
      console.log(`⏱️ API Response Time: ${response.config.url} - ${duration}ms`)
    }
    
    return response
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config
    
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true
      
      // Clear invalid token
      tokenService.removeToken()
      
      // Redirect to login (handled by auth store/hooks)
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
      
      return Promise.reject(createApiError(error))
    }
    
    // Handle 403 Forbidden - insufficient permissions
    if (error.response?.status === 403) {
      // UI-only: display error, backend handles all authorization
      console.warn('Access denied - insufficient permissions')
    }
    
    // Handle network errors
    if (!error.response) {
      const networkError: ApiError = {
        message: 'Network connection error. Please check your internet connection.',
        status: 0,
        code: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
        path: originalRequest?.url || '',
      }
      return Promise.reject(networkError)
    }
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      const timeoutError: ApiError = {
        message: 'Request timeout. Please try again.',
        status: 0,
        code: 'TIMEOUT_ERROR',
        timestamp: new Date().toISOString(),
        path: originalRequest?.url || '',
      }
      return Promise.reject(timeoutError)
    }
    
    // Transform backend error to UI-friendly format
    return Promise.reject(createApiError(error))
  }
)

/**
 * Transform Axios error to standardized API error format
 */
const createApiError = (error: AxiosError<ApiErrorResponse>): ApiError => {
  const response = error.response
  const data = response?.data
  
  // Use backend error message if available, otherwise fallback
  const message = data?.message || getDefaultErrorMessage(response?.status || 0)
  
  return {
    message,
    status: response?.status || 0,
    code: data?.code || 'UNKNOWN_ERROR',
    details: data?.details,
    timestamp: data?.timestamp || new Date().toISOString(),
    path: data?.path || error.config?.url || '',
    validationErrors: data?.validationErrors,
  }
}

/**
 * Get user-friendly error messages for common HTTP status codes
 */
const getDefaultErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input and try again.'
    case 401:
      return 'Authentication required. Please log in to continue.'
    case 403:
      return 'Access denied. You do not have permission to perform this action.'
    case 404:
      return 'The requested resource was not found.'
    case 409:
      return 'This action conflicts with existing data.'
    case 422:
      return 'Validation failed. Please check your input.'
    case 429:
      return 'Too many requests. Please wait a moment and try again.'
    case 500:
      return 'Internal server error. Our team has been notified.'
    case 502:
      return 'Service temporarily unavailable. Please try again later.'
    case 503:
      return 'Service maintenance in progress. Please try again later.'
    default:
      return 'An unexpected error occurred. Please try again.'
  }
}

// Export interceptor utilities for testing
export { createApiError, getDefaultErrorMessage }
