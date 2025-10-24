/**
 * Public Route Component
 * Route wrapper for public pages that can be accessed without authentication
 * Provides optional authentication state awareness
 */

import React from 'react'
import { useAuth } from '@/hooks/auth/useAuth'

// Public route props
export interface PublicRouteProps {
  children: React.ReactNode
  
  // Optional: Redirect authenticated users
  redirectAuthenticated?: boolean
  redirectPath?: string
  
  // Optional: Show different content for authenticated users
  authAware?: boolean
}

/**
 * Public Route Component
 * Wraps routes that are publicly accessible
 */
export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectAuthenticated = false,
  redirectPath = '/app/dashboard',
  authAware = false,
}) => {
  const { isAuthenticated, isLoading } = useAuth()

  // Show loading state if checking auth and route is auth-aware
  if (authAware && isLoading) {
    return (
      <div className="public-route-loading">
        Loading...
      </div>
    )
  }

  // Redirect authenticated users if specified
  if (redirectAuthenticated && isAuthenticated) {
    window.location.href = redirectPath
    return null
  }

  // Render public content
  return <>{children}</>
}

/**
 * Landing Route Component
 * Special public route that redirects authenticated users
 */
export const LandingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PublicRoute redirectAuthenticated={true}>
      {children}
    </PublicRoute>
  )
}

/**
 * Marketing Route Component
 * Public route that's aware of authentication state for conditional content
 */
export const MarketingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PublicRoute authAware={true}>
      {children}
    </PublicRoute>
  )
}

export default PublicRoute
