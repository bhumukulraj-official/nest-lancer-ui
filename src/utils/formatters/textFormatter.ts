/**
 * Text Formatter Utilities
 * Text formatting utilities for display
 */

// Truncate Text
export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) {
    return text
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix
}

// Capitalize Text
export const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Title Case
export const toTitleCase = (text: string): string => {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

// Camel Case
export const toCamelCase = (text: string): string => {
  return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase()
  }).replace(/\s+/g, '')
}

// Pascal Case
export const toPascalCase = (text: string): string => {
  return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
    return word.toUpperCase()
  }).replace(/\s+/g, '')
}

// Snake Case
export const toSnakeCase = (text: string): string => {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_')
}

// Kebab Case
export const toKebabCase = (text: string): string => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

// Slug
export const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Remove HTML Tags
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '')
}

// Escape HTML
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Unescape HTML
export const unescapeHtml = (html: string): string => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

// Format File Size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Format Phone Number
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}

// Format Social Security Number
export const formatSSN = (ssn: string): string => {
  const cleaned = ssn.replace(/\D/g, '')
  
  if (cleaned.length <= 3) {
    return cleaned
  } else if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`
  }
}

// Format Credit Card Number
export const formatCreditCard = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\D/g, '')
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
}

// Mask Sensitive Data
export const maskSensitiveData = (text: string, visibleChars: number = 4): string => {
  if (text.length <= visibleChars) {
    return '*'.repeat(text.length)
  }
  
  const visible = text.slice(-visibleChars)
  const masked = '*'.repeat(text.length - visibleChars)
  
  return masked + visible
}

// Highlight Text
export const highlightText = (text: string, searchTerm: string, className: string = 'highlight'): string => {
  if (!searchTerm) return text
  
  const regex = new RegExp(`(${searchTerm})`, 'gi')
  return text.replace(regex, `<span class="${className}">$1</span>`)
}

// Extract URLs
export const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.match(urlRegex) || []
}

// Extract Emails
export const extractEmails = (text: string): string[] => {
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g
  return text.match(emailRegex) || []
}

// Extract Hashtags
export const extractHashtags = (text: string): string[] => {
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g
  return text.match(hashtagRegex) || []
}

// Extract Mentions
export const extractMentions = (text: string): string[] => {
  const mentionRegex = /@[\w\u0590-\u05ff]+/g
  return text.match(mentionRegex) || []
}
