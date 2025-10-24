/**
 * Token Service
 * JWT token storage and retrieval utilities
 * UI-only service - backend handles all token validation and security
 */

// Storage keys
const TOKEN_KEY = 'nestlancer_auth_token'
const REFRESH_TOKEN_KEY = 'nestlancer_refresh_token'
const TOKEN_EXPIRY_KEY = 'nestlancer_token_expiry'

export interface TokenData {
  accessToken: string
  refreshToken?: string
  expiresAt?: number
}

class TokenService {
  /**
   * Store JWT token in localStorage
   * UI-only storage - backend validates all tokens
   */
  setToken(tokenData: TokenData): void {
    try {
      localStorage.setItem(TOKEN_KEY, tokenData.accessToken)
      
      if (tokenData.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, tokenData.refreshToken)
      }
      
      if (tokenData.expiresAt) {
        localStorage.setItem(TOKEN_EXPIRY_KEY, tokenData.expiresAt.toString())
      }
      
      // Debug log in development
      if (import.meta.env.DEV) {
        console.log('🔐 Token stored successfully')
      }
    } catch (error) {
      console.error('Failed to store token:', error)
      // Fallback to sessionStorage if localStorage fails
      try {
        sessionStorage.setItem(TOKEN_KEY, tokenData.accessToken)
        if (tokenData.refreshToken) {
          sessionStorage.setItem(REFRESH_TOKEN_KEY, tokenData.refreshToken)
        }
      } catch (sessionError) {
        console.error('Failed to store token in sessionStorage:', sessionError)
      }
    }
  }

  /**
   * Retrieve JWT token from storage
   * Returns null if token doesn't exist or is expired
   */
  getToken(): string | null {
    try {
      // Try localStorage first
      let token = localStorage.getItem(TOKEN_KEY)
      
      // Fallback to sessionStorage
      if (!token) {
        token = sessionStorage.getItem(TOKEN_KEY)
      }
      
      if (!token) {
        return null
      }
      
      // Check if token is expired (UI-side check only for UX)
      const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY) || 
                        sessionStorage.getItem(TOKEN_EXPIRY_KEY)
      
      if (expiryStr) {
        const expiryTime = parseInt(expiryStr, 10)
        const currentTime = Math.floor(Date.now() / 1000)
        
        if (currentTime >= expiryTime) {
          // Token expired - remove it
          this.removeToken()
          return null
        }
      }
      
      return token
    } catch (error) {
      console.error('Failed to retrieve token:', error)
      return null
    }
  }

  /**
   * Get refresh token from storage
   */
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY) || 
             sessionStorage.getItem(REFRESH_TOKEN_KEY)
    } catch (error) {
      console.error('Failed to retrieve refresh token:', error)
      return null
    }
  }

  /**
   * Remove all auth tokens from storage
   */
  removeToken(): void {
    try {
      // Remove from localStorage
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(TOKEN_EXPIRY_KEY)
      
      // Remove from sessionStorage
      sessionStorage.removeItem(TOKEN_KEY)
      sessionStorage.removeItem(REFRESH_TOKEN_KEY)
      sessionStorage.removeItem(TOKEN_EXPIRY_KEY)
      
      // Debug log in development
      if (import.meta.env.DEV) {
        console.log('🔓 Tokens removed successfully')
      }
    } catch (error) {
      console.error('Failed to remove tokens:', error)
    }
  }

  /**
   * Check if user has a token (UI-only check for display purposes)
   * Backend handles all actual authentication validation
   */
  hasToken(): boolean {
    return this.getToken() !== null
  }

  /**
   * Parse JWT token to extract payload (UI-only for display purposes)
   * WARNING: Never rely on this for security - backend validates all tokens
   */
  parseToken(token?: string): any | null {
    try {
      const tokenToParse = token || this.getToken()
      if (!tokenToParse) return null
      
      // JWT format: header.payload.signature
      const parts = tokenToParse.split('.')
      if (parts.length !== 3) return null
      
      // Decode payload (base64url)
      const payload = parts[1]
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      
      return JSON.parse(decodedPayload)
    } catch (error) {
      console.error('Failed to parse token:', error)
      return null
    }
  }

  /**
   * Get token expiration time (UI-only for display purposes)
   */
  getTokenExpiry(): Date | null {
    try {
      const payload = this.parseToken()
      if (!payload || !payload.exp) return null
      
      return new Date(payload.exp * 1000)
    } catch (error) {
      console.error('Failed to get token expiry:', error)
      return null
    }
  }

  /**
   * Check if token will expire soon (UI-only warning)
   * @param minutes - Minutes before expiry to consider "soon"
   */
  isTokenExpiringSoon(minutes: number = 5): boolean {
    try {
      const expiry = this.getTokenExpiry()
      if (!expiry) return false
      
      const expiryTime = expiry.getTime()
      const currentTime = Date.now()
      const minutesInMs = minutes * 60 * 1000
      
      return (expiryTime - currentTime) <= minutesInMs
    } catch (error) {
      console.error('Failed to check token expiry:', error)
      return false
    }
  }

  /**
   * Clear all auth-related data from storage
   * Useful for complete logout cleanup
   */
  clearAuthData(): void {
    this.removeToken()
    
    // Clear any other auth-related localStorage items
    try {
      const authKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('nestlancer_auth_') || 
        key.startsWith('nestlancer_user_')
      )
      
      authKeys.forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('Failed to clear auth data:', error)
    }
  }
}

// Export singleton instance
export const tokenService = new TokenService()
export default tokenService
