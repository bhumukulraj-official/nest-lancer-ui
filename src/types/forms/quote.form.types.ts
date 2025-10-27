/**
 * Quote Form Types
 * TypeScript type definitions for quote forms
 */

export interface QuoteFormData {
  serviceRequestId: string
  requestId?: string // alias for backward compatibility
  title: string
  description: string
  amount: number
  totalAmount?: number // alias for backward compatibility
  currency: string
  timeline: string
  estimatedDuration?: number
  deliverables: string[]
  terms: string[]
  validUntil: string
  deadline?: string
  termsAndConditions?: string
  skills?: string[]
  notes?: string
  attachments?: File[]
}

export interface QuoteFormErrors {
  serviceRequestId?: string
  title?: string
  description?: string
  amount?: string
  currency?: string
  timeline?: string
  deliverables?: string
  terms?: string
  validUntil?: string
  notes?: string
  attachments?: string
  general?: string
}
