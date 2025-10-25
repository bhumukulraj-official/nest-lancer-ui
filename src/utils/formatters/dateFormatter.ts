/**
 * Date Formatter Utilities
 * Date formatting utilities for display
 */

// Date Formatting Options
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  ISO: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATETIME: 'MM/DD/YYYY HH:mm',
  RELATIVE: 'relative',
} as const

// Format Date
export const formatDate = (date: string | Date, format: string = DATE_FORMATS.SHORT): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date'
  }
  
  const options: Intl.DateTimeFormatOptions = {}
  
  switch (format) {
    case DATE_FORMATS.SHORT:
      options.month = '2-digit'
      options.day = '2-digit'
      options.year = 'numeric'
      break
    case DATE_FORMATS.LONG:
      options.year = 'numeric'
      options.month = 'long'
      options.day = 'numeric'
      break
    case DATE_FORMATS.ISO:
      return dateObj.toISOString().split('T')[0]
    case DATE_FORMATS.TIME:
      options.hour = '2-digit'
      options.minute = '2-digit'
      break
    case DATE_FORMATS.DATETIME:
      options.year = 'numeric'
      options.month = '2-digit'
      options.day = '2-digit'
      options.hour = '2-digit'
      options.minute = '2-digit'
      break
    case DATE_FORMATS.RELATIVE:
      return formatRelativeTime(dateObj)
    default:
      return dateObj.toLocaleDateString()
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(dateObj)
}

// Format Relative Time
export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'just now'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`
  }
  
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }
  
  const diffInYears = Math.floor(diffInDays / 365)
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
}

// Format Duration
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  } else if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  } else {
    return `${remainingSeconds}s`
  }
}

// Parse Date
export const parseDate = (dateString: string): Date | null => {
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

// Is Valid Date
export const isValidDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return !isNaN(dateObj.getTime())
}

// Get Date Range
export const getDateRange = (startDate: string | Date, endDate: string | Date): string => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate
  
  const startFormatted = formatDate(start, DATE_FORMATS.SHORT)
  const endFormatted = formatDate(end, DATE_FORMATS.SHORT)
  
  return `${startFormatted} - ${endFormatted}`
}

// Get Time Zone
export const getTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

// Convert to Time Zone
export const convertToTimeZone = (date: string | Date, timeZone: string): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Date(dateObj.toLocaleString('en-US', { timeZone }))
}
