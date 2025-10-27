/**
 * Currency Formatter Utilities
 * Currency formatting utilities
 */

// Currency Codes
export const CURRENCY_CODES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  CAD: 'CAD',
  AUD: 'AUD',
  CHF: 'CHF',
  CNY: 'CNY',
  INR: 'INR',
  BRL: 'BRL',
  RUB: 'RUB',
  KRW: 'KRW',
} as const

// Format Currency
export const formatCurrency = (
  amount: number,
  currency: string = CURRENCY_CODES.USD,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Format Currency with Options
export const formatCurrencyWithOptions = (
  amount: number,
  options: {
    currency?: string
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact'
  } = {}
): string => {
  const {
    currency = CURRENCY_CODES.USD,
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    notation = 'standard',
  } = options

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
  }).format(amount)
}

// Format Compact Currency
export const formatCompactCurrency = (
  amount: number,
  currency: string = CURRENCY_CODES.USD,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount)
}

// Parse Currency
export const parseCurrency = (value: string, _currency: string = CURRENCY_CODES.USD): number => {
  // Remove currency symbols and spaces
  const cleanValue = value.replace(/[^\d.-]/g, '')
  return parseFloat(cleanValue) || 0
}

// Convert Currency
export const convertCurrency = (
  amount: number,
  _fromCurrency: string,
  _toCurrency: string,
  exchangeRate: number
): number => {
  return amount * exchangeRate
}

// Format Percentage
export const formatPercentage = (
  value: number,
  decimals: number = 2,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100)
}

// Format Number
export const formatNumber = (
  value: number,
  locale: string = 'en-US',
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat(locale, options).format(value)
}

// Format Compact Number
export const formatCompactNumber = (
  value: number,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

// Get Currency Symbol
export const getCurrencySymbol = (currency: string, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).formatToParts(0).find(part => part.type === 'currency')?.value || currency
}

// Get Currency Info
export const getCurrencyInfo = (currency: string, locale: string = 'en-US') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  })
  
  const parts = formatter.formatToParts(1234.56)
  
  return {
    symbol: parts.find(part => part.type === 'currency')?.value || currency,
    decimal: parts.find(part => part.type === 'decimal')?.value || '.',
    group: parts.find(part => part.type === 'group')?.value || ',',
    code: currency,
  }
}
