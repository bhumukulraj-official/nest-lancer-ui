/**
 * Authentication Services Index
 * Central export point for all authentication-related services
 */

export { authApiService, type LoginRequest, type LoginResponse, type RegisterRequest, type RegisterResponse } from './authApiService'
export { tokenService, type TokenData } from './tokenService'

// Re-export for convenience
export { authApiService as default } from './authApiService'
