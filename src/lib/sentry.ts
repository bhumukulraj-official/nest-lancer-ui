/**
 * Sentry Configuration
 * Error monitoring and performance tracking setup
 */

import * as Sentry from '@sentry/react'
import { envConfig, isDevelopment } from '@/config'

/**
 * Initialize Sentry for error monitoring and performance tracking
 */
export const initSentry = () => {
  // Only initialize in production or when explicitly enabled
  if (!isDevelopment() || envConfig.SENTRY_ENABLED) {
    Sentry.init({
      dsn: envConfig.SENTRY_DSN,

      // Performance Monitoring
      tracesSampleRate: isDevelopment() ? 1.0 : 0.1,

      // Session Replay
      replaysSessionSampleRate: isDevelopment() ? 1.0 : 0.1,
      replaysOnErrorSampleRate: 1.0,

      // Environment
      environment: isDevelopment() ? 'development' : 'production',

      // Release tracking
      release: import.meta.env.VITE_APP_VERSION || '1.0.0',

      // Error filtering
      beforeSend(event, hint) {
        // Filter out non-critical errors in development
        if (isDevelopment()) {
          const error = hint.originalException
          if (error instanceof Error) {
            // Filter out common development errors
            if (
              error.message.includes('ResizeObserver loop limit exceeded') ||
              error.message.includes('Non-Error promise rejection') ||
              error.message.includes('Loading chunk')
            ) {
              return null
            }
          }
        }

        return event
      },

      // Performance monitoring
      beforeSendTransaction(event) {
        // Filter out transactions that are not useful
        if (event.transaction?.includes('health-check')) {
          return null
        }
        return event
      },
    })
  }
}

/**
 * Capture exceptions manually
 */
export const captureException = (
  error: Error,
  context?: Record<string, any>
) => {
  Sentry.captureException(error, {
    tags: context,
  })
}

/**
 * Capture messages manually
 */
export const captureMessage = (
  message: string,
  level: Sentry.SeverityLevel = 'info'
) => {
  Sentry.captureMessage(message, level)
}

/**
 * Add breadcrumb for debugging
 */
export const addBreadcrumb = (breadcrumb: Sentry.Breadcrumb) => {
  Sentry.addBreadcrumb(breadcrumb)
}

/**
 * Set user context
 */
export const setUser = (user: Sentry.User) => {
  Sentry.setUser(user)
}

/**
 * Set tags for filtering
 */
export const setTag = (key: string, value: string) => {
  Sentry.setTag(key, value)
}

/**
 * Set context for debugging
 */
export const setContext = (key: string, context: Record<string, any>) => {
  Sentry.setContext(key, context)
}

export default Sentry
