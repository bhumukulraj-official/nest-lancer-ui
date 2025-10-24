/**
 * Routes Index
 * Central export point for all routing components and utilities
 */

// Main routing components
export { AppRoutes } from './AppRoutes'
export { AuthRoutes } from './AuthRoutes'

// Route protection components
export { 
  ProtectedRoute,
  AdminRoute,
  UserRoute,
  type ProtectedRouteProps 
} from './ProtectedRoute'

// Public route components
export { 
  PublicRoute,
  LandingRoute,
  MarketingRoute,
  type PublicRouteProps 
} from './PublicRoute'

// Re-export for convenience
export { AppRoutes as default } from './AppRoutes'
