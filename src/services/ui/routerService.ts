/**
 * Router Service
 * Handles navigation utilities and route management
 * UI-only service - no business logic processing
 */

import { NavigateFunction } from 'react-router-dom'

import { ROUTES } from '../../constants/routes.constants'

export interface NavigationOptions {
  replace?: boolean
  state?: any
  preventScrollReset?: boolean
  relative?: 'path' | 'route'
}

export interface RouteParams {
  [key: string]: string | number
}

export class RouterService {
  private static navigate: NavigateFunction | null = null

  /**
   * Initialize router service with navigate function
   */
  static initialize(navigate: NavigateFunction): void {
    this.navigate = navigate
  }

  /**
   * Navigate to a route
   */
  static navigateTo(path: string, options?: NavigationOptions): void {
    if (!this.navigate) {
      console.warn('RouterService not initialized. Call initialize() first.')
      return
    }

    this.navigate(path, options)
  }

  /**
   * Navigate to home page
   */
  static navigateToHome(): void {
    this.navigateTo(ROUTES.HOME)
  }

  /**
   * Navigate to login page
   */
  static navigateToLogin(): void {
    this.navigateTo(ROUTES.AUTH.LOGIN)
  }

  /**
   * Navigate to register page
   */
  static navigateToRegister(): void {
    this.navigateTo(ROUTES.AUTH.REGISTER)
  }

  /**
   * Navigate to dashboard
   */
  static navigateToDashboard(): void {
    this.navigateTo(ROUTES.DASHBOARD)
  }

  /**
   * Navigate to profile page
   */
  static navigateToProfile(): void {
    this.navigateTo(ROUTES.PROFILE)
  }

  /**
   * Navigate to profile edit page
   */
  static navigateToProfileEdit(): void {
    this.navigateTo(ROUTES.PROFILE_EDIT)
  }

  /**
   * Navigate to projects page
   */
  static navigateToProjects(): void {
    this.navigateTo(ROUTES.PROJECTS)
  }

  /**
   * Navigate to specific project page
   */
  static navigateToProject(projectId: string): void {
    this.navigateTo(ROUTES.PROJECT_DETAIL.replace(':id', projectId))
  }

  /**
   * Navigate to requests page
   */
  static navigateToRequests(): void {
    this.navigateTo(ROUTES.REQUESTS)
  }

  /**
   * Navigate to specific request page
   */
  static navigateToRequest(requestId: string): void {
    this.navigateTo(ROUTES.REQUEST_DETAIL.replace(':id', requestId))
  }

  /**
   * Navigate to create request page
   */
  static navigateToCreateRequest(): void {
    this.navigateTo(ROUTES.REQUEST_CREATE)
  }

  /**
   * Navigate to quotes page
   */
  static navigateToQuotes(): void {
    this.navigateTo(ROUTES.QUOTES)
  }

  /**
   * Navigate to specific quote page
   */
  static navigateToQuote(quoteId: string): void {
    this.navigateTo(ROUTES.QUOTE_DETAIL.replace(':id', quoteId))
  }

  /**
   * Navigate to payments page
   */
  static navigateToPayments(): void {
    this.navigateTo(ROUTES.PAYMENTS)
  }

  /**
   * Navigate to specific payment page
   */
  static navigateToPayment(paymentId: string): void {
    this.navigateTo(ROUTES.PAYMENT_DETAIL.replace(':id', paymentId))
  }

  /**
   * Navigate to portfolio page
   */
  static navigateToPortfolio(): void {
    this.navigateTo(ROUTES.PORTFOLIO)
  }

  /**
   * Navigate to blog page
   */
  static navigateToBlog(): void {
    this.navigateTo(ROUTES.BLOG)
  }

  /**
   * Navigate to specific blog post page
   */
  static navigateToBlogPost(postId: string): void {
    this.navigateTo(ROUTES.BLOG_POST.replace(':id', postId))
  }

  /**
   * Navigate to contact page
   */
  static navigateToContact(): void {
    this.navigateTo(ROUTES.CONTACT)
  }

  /**
   * Navigate to admin dashboard
   */
  static navigateToAdminDashboard(): void {
    this.navigateTo(ROUTES.ADMIN.DASHBOARD)
  }

  /**
   * Navigate to admin users page
   */
  static navigateToAdminUsers(): void {
    this.navigateTo(ROUTES.ADMIN.USERS)
  }

  /**
   * Navigate to admin projects page
   */
  static navigateToAdminProjects(): void {
    this.navigateTo(ROUTES.ADMIN.PROJECTS)
  }

  /**
   * Navigate to admin requests page
   */
  static navigateToAdminRequests(): void {
    this.navigateTo(ROUTES.ADMIN.REQUESTS)
  }

  /**
   * Navigate to admin quotes page
   */
  static navigateToAdminQuotes(): void {
    this.navigateTo(ROUTES.ADMIN.QUOTES)
  }

  /**
   * Navigate to admin payments page
   */
  static navigateToAdminPayments(): void {
    this.navigateTo(ROUTES.ADMIN.PAYMENTS)
  }

  /**
   * Navigate to admin analytics page
   */
  static navigateToAdminAnalytics(): void {
    this.navigateTo(ROUTES.ADMIN.ANALYTICS)
  }

  /**
   * Navigate to admin settings page
   */
  static navigateToAdminSettings(): void {
    this.navigateTo(ROUTES.ADMIN.SETTINGS)
  }

  /**
   * Navigate to admin audit logs page
   */
  static navigateToAdminAuditLogs(): void {
    this.navigateTo(ROUTES.ADMIN.AUDIT_LOGS)
  }

  /**
   * Navigate to admin webhooks page
   */
  static navigateToAdminWebhooks(): void {
    this.navigateTo(ROUTES.ADMIN.WEBHOOKS)
  }

  /**
   * Navigate back in history
   */
  static navigateBack(): void {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back()
    }
  }

  /**
   * Navigate forward in history
   */
  static navigateForward(): void {
    if (typeof window !== 'undefined') {
      window.history.forward()
    }
  }

  /**
   * Replace current route
   */
  static replaceRoute(path: string, state?: any): void {
    this.navigateTo(path, { replace: true, state })
  }

  /**
   * Get current pathname
   */
  static getCurrentPath(): string {
    return typeof window !== 'undefined' ? window.location.pathname : ''
  }

  /**
   * Get current search params
   */
  static getCurrentSearchParams(): URLSearchParams {
    return typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  }

  /**
   * Get current hash
   */
  static getCurrentHash(): string {
    return typeof window !== 'undefined' ? window.location.hash : ''
  }

  /**
   * Check if current route matches pattern
   */
  static isCurrentRoute(pattern: string): boolean {
    const currentPath = this.getCurrentPath()
    return currentPath === pattern || currentPath.startsWith(pattern + '/')
  }

  /**
   * Check if current route is admin route
   */
  static isAdminRoute(): boolean {
    return this.isCurrentRoute('/admin')
  }

  /**
   * Check if current route is auth route
   */
  static isAuthRoute(): boolean {
    return this.isCurrentRoute('/auth')
  }

  /**
   * Check if current route is user route
   */
  static isUserRoute(): boolean {
    return this.isCurrentRoute('/user') || this.isCurrentRoute('/dashboard')
  }

  /**
   * Build URL with parameters
   */
  static buildUrl(path: string, params?: RouteParams, query?: Record<string, string>): string {
    let url = path

    // Replace route parameters
    if (params) {
      Object.keys(params).forEach(key => {
        url = url.replace(`:${key}`, String(params[key]))
      })
    }

    // Add query parameters
    if (query) {
      const searchParams = new URLSearchParams()
      Object.keys(query).forEach(key => {
        if (query[key]) {
          searchParams.append(key, query[key])
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    return url
  }

  /**
   * Parse route parameters from path
   */
  static parseRouteParams(path: string, pattern: string): RouteParams {
    const params: RouteParams = {}
    const pathSegments = path.split('/')
    const patternSegments = pattern.split('/')

    if (pathSegments.length !== patternSegments.length) {
      return params
    }

    patternSegments.forEach((segment, index) => {
      if (segment.startsWith(':')) {
        const paramName = segment.slice(1)
        params[paramName] = pathSegments[index]
      }
    })

    return params
  }

  /**
   * Get breadcrumb data for current route
   */
  static getBreadcrumbs(): Array<{ label: string; path: string }> {
    const currentPath = this.getCurrentPath()
    const segments = currentPath.split('/').filter(Boolean)
    const breadcrumbs: Array<{ label: string; path: string }> = []

    let currentPathAccumulator = ''
    segments.forEach((segment, _index) => {
      currentPathAccumulator += `/${segment}`
      
      // Generate label from segment
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({
        label,
        path: currentPathAccumulator
      })
    })

    return breadcrumbs
  }

  /**
   * Scroll to top of page
   */
  static scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  /**
   * Scroll to element by ID
   */
  static scrollToElement(elementId: string): void {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}

export default RouterService
