/**
 * URL Helper Utilities
 * URL manipulation helpers
 */

// Parse URL
export const parseUrl = (url: string): {
  protocol: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
} => {
  try {
    const urlObj = new URL(url)
    return {
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
    }
  } catch {
    return {
      protocol: '',
      hostname: '',
      port: '',
      pathname: '',
      search: '',
      hash: '',
    }
  }
}

// Build URL
export const buildUrl = (baseUrl: string, params: Record<string, string | number> = {}): string => {
  const url = new URL(baseUrl)
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })
  
  return url.toString()
}

// Get Query Parameters
export const getQueryParams = (url: string = window.location.href): Record<string, string> => {
  const params: Record<string, string> = {}
  const urlObj = new URL(url)
  
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value
  })
  
  return params
}

// Set Query Parameter
export const setQueryParam = (url: string, key: string, value: string): string => {
  const urlObj = new URL(url)
  urlObj.searchParams.set(key, value)
  return urlObj.toString()
}

// Remove Query Parameter
export const removeQueryParam = (url: string, key: string): string => {
  const urlObj = new URL(url)
  urlObj.searchParams.delete(key)
  return urlObj.toString()
}

// Update Query Parameters
export const updateQueryParams = (url: string, params: Record<string, string | number>): string => {
  const urlObj = new URL(url)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      urlObj.searchParams.delete(key)
    } else {
      urlObj.searchParams.set(key, String(value))
    }
  })
  
  return urlObj.toString()
}

// Is Valid URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Is External URL
export const isExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname !== window.location.hostname
  } catch {
    return false
  }
}

// Get Domain
export const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

// Get Subdomain
export const getSubdomain = (url: string): string => {
  try {
    const hostname = new URL(url).hostname
    const parts = hostname.split('.')
    return parts.length > 2 ? parts[0] : ''
  } catch {
    return ''
  }
}

// Encode URL
export const encodeUrl = (url: string): string => {
  return encodeURIComponent(url)
}

// Decode URL
export const decodeUrl = (url: string): string => {
  return decodeURIComponent(url)
}

// Get URL Hash
export const getUrlHash = (url: string = window.location.href): string => {
  try {
    return new URL(url).hash.slice(1) // Remove the # symbol
  } catch {
    return ''
  }
}

// Set URL Hash
export const setUrlHash = (url: string, hash: string): string => {
  const urlObj = new URL(url)
  urlObj.hash = hash
  return urlObj.toString()
}

// Get Base URL
export const getBaseUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return `${urlObj.protocol}//${urlObj.hostname}${urlObj.port ? `:${urlObj.port}` : ''}`
  } catch {
    return ''
  }
}

// Get Relative URL
export const getRelativeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname + urlObj.search + urlObj.hash
  } catch {
    return ''
  }
}

// Normalize URL
export const normalizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.toString()
  } catch {
    return url
  }
}

// Get URL Without Query
export const getUrlWithoutQuery = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.origin + urlObj.pathname + urlObj.hash
  } catch {
    return url
  }
}

// Get URL Without Hash
export const getUrlWithoutHash = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.origin + urlObj.pathname + urlObj.search
  } catch {
    return url
  }
}
