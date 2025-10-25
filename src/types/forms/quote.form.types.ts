/**
 * Quote Form Types
 * TypeScript type definitions for quote forms
 */

export interface QuoteFormData {
  serviceRequestId: string
  title: string
  description: string
  amount: number
  currency: string
  timeline: string
  deliverables: string[]
  terms: string[]
  validUntil: string
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
