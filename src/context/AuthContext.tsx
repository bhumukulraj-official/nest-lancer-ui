/**
 * Authentication Context
 * React context for authentication state management
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

import { User, LoginResponse, AuthError, UserRole } from '../types'

// Auth State Interface
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: AuthError | null
  token: string | null
  refreshToken: string | null
}

// Auth Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: LoginResponse }
  | { type: 'AUTH_FAILURE'; payload: AuthError }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_REFRESH'; payload: { token: string } }
  | { type: 'AUTH_CLEAR_ERROR' }
  | { type: 'AUTH_UPDATE_USER'; payload: Partial<User> }

// Initial State
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
}

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.tokens.accessToken,
        refreshToken: action.payload.tokens.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }
    case 'AUTH_REFRESH':
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        error: null,
      }
    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }
    default:
      return state
  }
}

// Auth Context Interface
interface AuthContextType {
  state: AuthState
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  refreshAuth: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
  clearError: () => void
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    
    if (token && refreshToken) {
      // Verify token and get user data
      // This would typically make an API call to verify the token
      dispatch({ type: 'AUTH_REFRESH', payload: { token } })
    }
  }, [])

  // Save tokens to localStorage when they change
  useEffect(() => {
    if (state.token) {
      localStorage.setItem('token', state.token)
    } else {
      localStorage.removeItem('token')
    }
    
    if (state.refreshToken) {
      localStorage.setItem('refreshToken', state.refreshToken)
    } else {
      localStorage.removeItem('refreshToken')
    }
  }, [state.token, state.refreshToken])

  // Login function
  const login = async (email: string, _password: string) => {
    dispatch({ type: 'AUTH_START' })
    
    try {
      // This would make an API call to login
      // const response = await authApiService.login({ email, password })
      // dispatch({ type: 'AUTH_SUCCESS', payload: response })
      
      // Mock implementation for now
      const mockResponse: LoginResponse = {
        user: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: email,
          role: UserRole.USER,
          isActive: true,
          isVerified: true,
          isEmailVerified: true,
          isPhoneVerified: false,
          preferences: {},
          settings: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600,
        },
      }
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockResponse })
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAILURE', 
        payload: error as AuthError 
      })
    }
  }

  // Register function
  const register = async (userData: any) => {
    dispatch({ type: 'AUTH_START' })
    
    try {
      // This would make an API call to register
      // const response = await authApiService.register(userData)
      // dispatch({ type: 'AUTH_SUCCESS', payload: response })
      
      // Mock implementation for now
      const mockResponse: LoginResponse = {
        user: {
          id: '1',
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: UserRole.USER,
          isActive: true,
          isVerified: false,
          isEmailVerified: false,
          isPhoneVerified: false,
          preferences: {},
          settings: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600,
        },
      }
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockResponse })
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAILURE', 
        payload: error as AuthError 
      })
    }
  }

  // Logout function
  const logout = () => {
    dispatch({ type: 'AUTH_LOGOUT' })
  }

  // Refresh auth function
  const refreshAuth = async () => {
    if (!state.refreshToken) return
    
    try {
      // This would make an API call to refresh the token
      // const response = await authApiService.refreshToken(state.refreshToken)
      // dispatch({ type: 'AUTH_REFRESH', payload: { token: response.accessToken } })
      
      // Mock implementation for now
      dispatch({ type: 'AUTH_REFRESH', payload: { token: 'new-mock-token' } })
    } catch (error) {
      dispatch({ type: 'AUTH_LOGOUT' })
    }
  }

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'AUTH_UPDATE_USER', payload: userData })
  }

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' })
  }

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    refreshAuth,
    updateUser,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Export context for advanced usage
export { AuthContext }
