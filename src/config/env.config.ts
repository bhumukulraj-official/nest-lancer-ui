/**
 * Environment Configuration
 * Manages environment variables for the NestLancer frontend application
 * Only client-safe variables (prefixed with VITE_) are accessible in frontend
 */

interface EnvConfig {
  // API Configuration
  API_BASE_URL: string
  WS_URL: string
  API_TIMEOUT: number

  // Third-party Integration (Public Keys Only)
  RAZORPAY_KEY_ID: string
  CLOUDINARY_CLOUD_NAME: string
  CLOUDINARY_UPLOAD_PRESET: string

  // Analytics & Monitoring
  GA_TRACKING_ID: string
  SENTRY_DSN: string

  // Application Features
  ENABLE_DEV_TOOLS: boolean
  PWA_ENABLED: boolean
  MAINTENANCE_MODE: boolean

  // Internationalization
  DEFAULT_LOCALE: string
  FALLBACK_LOCALE: string

  // Performance & Debugging
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'

  // App Metadata
  APP_NAME: string
  APP_VERSION: string
  APP_DESCRIPTION: string
}

/**
 * Get environment variable with validation
 */
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue
  if (!value) {
    console.warn(`Environment variable ${key} is not set`)
  }
  return value || ''
}

/**
 * Get boolean environment variable
 */
const getBooleanEnvVar = (key: string, defaultValue = false): boolean => {
  const value = import.meta.env[key]
  if (value === undefined || value === '') return defaultValue
  return value === 'true' || value === '1'
}

/**
 * Get number environment variable
 */
const getNumberEnvVar = (key: string, defaultValue: number): number => {
  const value = import.meta.env[key]
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? defaultValue : parsed
}

/**
 * Environment configuration object
 * All values are read from environment variables with sensible defaults
 */
export const envConfig: EnvConfig = {
  // API Configuration
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8000/api'),
  WS_URL: getEnvVar('VITE_WS_URL', 'ws://localhost:8000'),
  API_TIMEOUT: getNumberEnvVar('VITE_API_TIMEOUT', 30000),

  // Third-party Integration
  RAZORPAY_KEY_ID: getEnvVar('VITE_RAZORPAY_KEY_ID', ''),
  CLOUDINARY_CLOUD_NAME: getEnvVar('VITE_CLOUDINARY_CLOUD_NAME', ''),
  CLOUDINARY_UPLOAD_PRESET: getEnvVar('VITE_CLOUDINARY_UPLOAD_PRESET', ''),

  // Analytics & Monitoring
  GA_TRACKING_ID: getEnvVar('VITE_GA_TRACKING_ID', ''),
  SENTRY_DSN: getEnvVar('VITE_SENTRY_DSN', ''),

  // Application Features
  ENABLE_DEV_TOOLS: getBooleanEnvVar('VITE_ENABLE_DEV_TOOLS', true),
  PWA_ENABLED: getBooleanEnvVar('VITE_PWA_ENABLED', false),
  MAINTENANCE_MODE: getBooleanEnvVar('VITE_MAINTENANCE_MODE', false),

  // Internationalization
  DEFAULT_LOCALE: getEnvVar('VITE_DEFAULT_LOCALE', 'en'),
  FALLBACK_LOCALE: getEnvVar('VITE_FALLBACK_LOCALE', 'en'),

  // Performance & Debugging
  LOG_LEVEL: getEnvVar('VITE_LOG_LEVEL', 'info') as EnvConfig['LOG_LEVEL'],

  // App Metadata
  APP_NAME: getEnvVar('VITE_APP_NAME', 'NestLancer'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  APP_DESCRIPTION: getEnvVar('VITE_APP_DESCRIPTION', 'Freelancing platform for project management and collaboration'),
}

/**
 * Validate critical environment variables
 */
export const validateEnvConfig = (): boolean => {
  const requiredVars = ['API_BASE_URL', 'WS_URL']
  const missing = requiredVars.filter(key => !envConfig[key as keyof EnvConfig])
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing)
    return false
  }
  
  return true
}

/**
 * Check if running in development mode
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.MODE === 'development'
}

/**
 * Check if running in production mode
 */
export const isProduction = (): boolean => {
  return import.meta.env.MODE === 'production'
}

/**
 * Check if running in test mode
 */
export const isTesting = (): boolean => {
  return import.meta.env.MODE === 'test'
}

export default envConfig
