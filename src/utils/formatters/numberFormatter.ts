/**
 * Number Formatter Utilities
 * Number formatting utilities
 */

// Format Number with Commas
export const formatNumberWithCommas = (number: number): string => {
  return number.toLocaleString('en-US')
}

// Format Decimal
export const formatDecimal = (number: number, decimals: number = 2): string => {
  return number.toFixed(decimals)
}

// Format Percentage
export const formatPercentage = (number: number, decimals: number = 2): string => {
  return `${(number * 100).toFixed(decimals)}%`
}

// Format Ordinal
export const formatOrdinal = (number: number): string => {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const value = number % 100
  
  return number + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0])
}

// Format Compact Number
export const formatCompactNumber = (number: number): string => {
  if (number < 1000) {
    return number.toString()
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + 'K'
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else {
    return (number / 1000000000).toFixed(1) + 'B'
  }
}

// Format Range
export const formatRange = (min: number, max: number): string => {
  return `${formatNumberWithCommas(min)} - ${formatNumberWithCommas(max)}`
}

// Parse Number
export const parseNumber = (value: string): number => {
  return parseFloat(value.replace(/[^\d.-]/g, '')) || 0
}

// Is Valid Number
export const isValidNumber = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

// Clamp Number
export const clampNumber = (number: number, min: number, max: number): number => {
  return Math.min(Math.max(number, min), max)
}

// Round to Precision
export const roundToPrecision = (number: number, precision: number): number => {
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)
}
