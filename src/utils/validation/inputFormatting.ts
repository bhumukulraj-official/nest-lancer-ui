/**
 * Input Formatting Utilities
 * Input formatting and masking utilities
 */

// Phone Number Formatting
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const phoneNumber = value.replace(/\D/g, '')
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (phoneNumber.length <= 3) {
    return phoneNumber
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }
}

// Currency Formatting
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Credit Card Number Formatting
export const formatCreditCard = (value: string): string => {
  // Remove all non-numeric characters
  const cardNumber = value.replace(/\D/g, '')
  
  // Add spaces every 4 digits
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')
}

// Credit Card Expiry Formatting
export const formatCardExpiry = (value: string): string => {
  // Remove all non-numeric characters
  const expiry = value.replace(/\D/g, '')
  
  // Format as MM/YY
  if (expiry.length >= 2) {
    return `${expiry.slice(0, 2)}/${expiry.slice(2, 4)}`
  }
  
  return expiry
}

// Social Security Number Formatting
export const formatSSN = (value: string): string => {
  // Remove all non-numeric characters
  const ssn = value.replace(/\D/g, '')
  
  // Format as XXX-XX-XXXX
  if (ssn.length <= 3) {
    return ssn
  } else if (ssn.length <= 5) {
    return `${ssn.slice(0, 3)}-${ssn.slice(3)}`
  } else {
    return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`
  }
}

// Postal Code Formatting
export const formatPostalCode = (value: string, country: string = 'US'): string => {
  const postalCode = value.replace(/\D/g, '')
  
  if (country === 'US') {
    // Format as XXXXX-XXXX
    if (postalCode.length <= 5) {
      return postalCode
    } else {
      return `${postalCode.slice(0, 5)}-${postalCode.slice(5, 9)}`
    }
  }
  
  return postalCode
}

// Slug Formatting
export const formatSlug = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Title Case Formatting
export const formatTitleCase = (value: string): string => {
  return value.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

// Camel Case Formatting
export const formatCamelCase = (value: string): string => {
  return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase()
  }).replace(/\s+/g, '')
}

// Pascal Case Formatting
export const formatPascalCase = (value: string): string => {
  return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
    return word.toUpperCase()
  }).replace(/\s+/g, '')
}

// Snake Case Formatting
export const formatSnakeCase = (value: string): string => {
  return value
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_')
}

// Kebab Case Formatting
export const formatKebabCase = (value: string): string => {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

// Input Masking
export const createInputMask = (pattern: string, placeholder: string = '_'): (value: string) => string => {
  return (value: string) => {
    let maskedValue = ''
    let valueIndex = 0
    
    for (let i = 0; i < pattern.length && valueIndex < value.length; i++) {
      if (pattern[i] === 'X') {
        maskedValue += value[valueIndex]
        valueIndex++
      } else {
        maskedValue += pattern[i]
      }
    }
    
    return maskedValue
  }
}

// Common Input Masks
export const INPUT_MASKS = {
  PHONE: createInputMask('(XXX) XXX-XXXX'),
  CREDIT_CARD: createInputMask('XXXX XXXX XXXX XXXX'),
  EXPIRY: createInputMask('XX/XX'),
  SSN: createInputMask('XXX-XX-XXXX'),
  POSTAL_CODE: createInputMask('XXXXX-XXXX'),
} as const

// Remove Masking
export const removeMasking = (value: string): string => {
  return value.replace(/[^\w]/g, '')
}
