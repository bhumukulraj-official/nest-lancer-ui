/**
 * Contact Services Index
 * Central export point for all contact-related services
 */

export { ContactApiService } from './contactApiService'

// Re-export types for convenience
export type {
  ContactMessage,
  ContactMessageCreateData,
  ContactMessageUpdateData,
  ContactMessageFilters,
  ContactMessageSearchResult,
  ContactMessageStats,
  ContactMessageStatus,
  ContactMessagePriority,
  ContactMessageCategory,
  ContactMessageResponse,
  ContactMessageAttachment,
  ContactMessageAnalytics,
  ContactForm,
  ContactFormField,
  ContactFormSubmission,
  ContactFormAnalytics,
  ContactSettings,
  ContactTemplate
} from '../../types/models/contact.types'
