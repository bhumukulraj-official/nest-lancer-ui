/**
 * Authentication API Service
 * API calls for authentication endpoints - UI layer only
 * All authentication logic and validation handled by backend
 */

import { apiClient } from '@/services/api/client'
import { AUTH_ENDPOINTS } from '@/services/api/endpoints'
import { tokenService, TokenData } from './tokenService'

// Auth API Request/Response Types
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: {
    id: string
    email: string
    name: string
    role: 'user' | 'admin'
    avatar?: string
    emailVerified: boolean
  }
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
  role?: 'user' | 'admin'
  acceptTerms: boolean
}

export interface RegisterResponse {
  message: string
  user: {
    id: string
    email: string
    name: string
    role: 'user' | 'admin'
    emailVerified: boolean
  }
  requiresVerification: boolean
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface VerifyEmailRequest {
  token: string
}

export interface VerifyEmailResponse {
  message: string
  user: {
    id: string
    email: string
    emailVerified: boolean
  }
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface UserProfileResponse {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  avatar?: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

class AuthApiService {
  /**
   * User login - submit credentials to backend
   * Backend handles all authentication logic and validation
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      )
      
      // Store tokens after successful login
      const tokenData: TokenData = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: Math.floor(Date.now() / 1000) + response.expiresIn,
      }
      
      tokenService.setToken(tokenData)
      
      return response
    } catch (error) {
      // Token cleanup on failed login
      tokenService.removeToken()
      throw error
    }
  }

  /**
   * User registration - submit registration data to backend
   * Backend handles all validation, password hashing, and user creation
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      AUTH_ENDPOINTS.REGISTER,
      userData
    )
    
    return response
  }

  /**
   * User logout - notify backend and clear local tokens
   * Backend handles session invalidation
   */
  async logout(): Promise<void> {
    try {
      // Get token before making logout call
      const token = tokenService.getToken()
      
      if (token) {
        // Notify backend to invalidate session
        await apiClient.post(AUTH_ENDPOINTS.LOGOUT)
      }
    } catch (error) {
      // Continue with local cleanup even if backend call fails
      console.warn('Logout API call failed, continuing with local cleanup:', error)
    } finally {
      // Always clear local tokens
      tokenService.clearAuthData()
    }
  }

  /**
   * Forgot password - request password reset email
   * Backend handles email sending and token generation
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const response = await apiClient.post<ForgotPasswordResponse>(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      request
    )
    
    return response
  }

  /**
   * Reset password - submit new password with reset token
   * Backend handles token validation and password update
   */
  async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await apiClient.post<ResetPasswordResponse>(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      request
    )
    
    return response
  }

  /**
   * Verify email address - submit verification token
   * Backend handles token validation and email verification
   */
  async verifyEmail(request: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const response = await apiClient.post<VerifyEmailResponse>(
      AUTH_ENDPOINTS.VERIFY_EMAIL,
      request
    )
    
    return response
  }

  /**
   * Resend email verification - request new verification email
   * Backend handles email sending and token generation
   */
  async resendVerification(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      AUTH_ENDPOINTS.RESEND_VERIFICATION
    )
    
    return response
  }

  /**
   * Refresh access token - get new token using refresh token
   * Backend handles token validation and new token generation
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const refreshToken = tokenService.getRefreshToken()
      
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }
      
      const response = await apiClient.post<RefreshTokenResponse>(
        AUTH_ENDPOINTS.REFRESH,
        { refreshToken }
      )
      
      // Update stored tokens
      const tokenData: TokenData = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: Math.floor(Date.now() / 1000) + response.expiresIn,
      }
      
      tokenService.setToken(tokenData)
      
      return response
    } catch (error) {
      // Clear tokens on refresh failure
      tokenService.removeToken()
      throw error
    }
  }

  /**
   * Get current user profile - fetch user data from backend
   * Backend handles user data retrieval and permissions
   */
  async getCurrentUser(): Promise<UserProfileResponse> {
    const response = await apiClient.get<UserProfileResponse>(AUTH_ENDPOINTS.ME)
    return response
  }

  /**
   * Check if user is authenticated (UI-only check)
   * Backend handles all actual authentication validation
   */
  isAuthenticated(): boolean {
    return tokenService.hasToken()
  }

  /**
   * Get current token (UI-only access)
   * Backend validates all tokens on API calls
   */
  getCurrentToken(): string | null {
    return tokenService.getToken()
  }

  /**
   * Check if token is expiring soon (UI-only warning)
   * Backend handles all token expiration logic
   */
  isTokenExpiringSoon(minutes: number = 5): boolean {
    return tokenService.isTokenExpiringSoon(minutes)
  }
}

// Export singleton instance
export const authApiService = new AuthApiService()
export default authApiService
