/**
 * Route Helper Utilities
 * Route generation helpers
 */


// Generate Route with Parameters
export const generateRoute = (route: string, params: Record<string, string | number> = {}): string => {
  let generatedRoute = route
  
  Object.entries(params).forEach(([key, value]) => {
    generatedRoute = generatedRoute.replace(`:${key}`, String(value))
  })
  
  return generatedRoute
}

// Generate User Route
export const generateUserRoute = (route: string, params: Record<string, string | number> = {}): string => {
  return generateRoute(route, params)
}

// Generate Admin Route
export const generateAdminRoute = (route: string, params: Record<string, string | number> = {}): string => {
  return generateRoute(route, params)
}

// Get Route Parameters
export const getRouteParams = (pathname: string, route: string): Record<string, string> => {
  const params: Record<string, string> = {}
  const pathSegments = pathname.split('/')
  const routeSegments = route.split('/')
  
  routeSegments.forEach((segment, index) => {
    if (segment.startsWith(':')) {
      const paramName = segment.slice(1)
      params[paramName] = pathSegments[index] || ''
    }
  })
  
  return params
}

// Check if Route Matches
export const isRouteMatch = (pathname: string, route: string): boolean => {
  const pathSegments = pathname.split('/')
  const routeSegments = route.split('/')
  
  if (pathSegments.length !== routeSegments.length) {
    return false
  }
  
  return routeSegments.every((segment, index) => {
    if (segment.startsWith(':')) {
      return true // Parameter segment matches any value
    }
    return segment === pathSegments[index]
  })
}

// Get Breadcrumb Path
export const getBreadcrumbPath = (pathname: string): Array<{ label: string; path: string }> => {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: Array<{ label: string; path: string }> = []
  
  let currentPath = ''
  
  segments.forEach((segment) => {
    currentPath += `/${segment}`
    
    // Skip numeric segments (IDs) for breadcrumb labels
    if (!/^\d+$/.test(segment)) {
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        path: currentPath,
      })
    }
  })
  
  return breadcrumbs
}

// Get Route Title
export const getRouteTitle = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean)
  
  if (segments.length === 0) {
    return 'Home'
  }
  
  const lastSegment = segments[segments.length - 1]
  
  // Handle special cases
  if (lastSegment === 'dashboard') {
    return 'Dashboard'
  }
  
  if (lastSegment === 'profile') {
    return 'Profile'
  }
  
  if (lastSegment === 'settings') {
    return 'Settings'
  }
  
  // Convert segment to title case
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ')
}

// Get Route Icon
export const getRouteIcon = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean)
  
  if (segments.length === 0) {
    return '🏠'
  }
  
  const lastSegment = segments[segments.length - 1]
  
  // Map segments to icons
  const iconMap: Record<string, string> = {
    dashboard: '📊',
    profile: '👤',
    settings: '⚙️',
    projects: '📁',
    requests: '📋',
    quotes: '💰',
    payments: '💳',
    portfolio: '🎨',
    messaging: '💬',
    notifications: '🔔',
    blog: '📝',
    contact: '📞',
    users: '👥',
    analytics: '📈',
    system: '🖥️',
    audit: '📋',
    webhooks: '🔗',
    storage: '💾',
  }
  
  return iconMap[lastSegment] || '📄'
}
