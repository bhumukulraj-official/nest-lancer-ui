/**
 * Quote Services Index
 * Central export point for all quote-related services
 */

export { QuoteApiService } from './quoteApiService'

// Re-export types for convenience
export type {
  Quote,
  QuoteCreateData,
  QuoteUpdateData,
  QuoteFilters,
  QuoteSearchResult,
  QuoteStats,
  QuoteStatus,
  QuoteItem,
  QuotePricing,
  QuoteDiscount,
  QuoteTax,
  QuotePaymentTerms,
  QuoteValidity,
  QuoteApproval,
  QuoteRejection,
  QuoteRevision,
  QuoteAcceptance,
  QuoteAnalytics
} from '../../types/models/quote.types'
