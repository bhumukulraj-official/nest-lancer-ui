/**
 * Configuration Index
 * Central export for all configuration modules
 */

export { default as envConfig, validateEnvConfig, isDevelopment, isProduction, isTesting } from './env.config'

export { 
  default as apiConfig, 
  API_ENDPOINTS, 
  buildApiUrl, 
  HTTP_STATUS 
} from './api.config'

export { 
  default as defaultTheme, 
  lightTheme, 
  darkTheme, 
  themeConfig 
} from './theme.config'

export { 
  default as routerConfig, 
  ROUTES, 
  navigationConfig, 
  buildRoute, 
  isProtectedRoute, 
  isAdminRoute, 
  getRedirectPath 
} from './router.config'

// Re-export types for convenience
export type { Theme } from '@mui/material/styles'
