/**
 * Payment Form Types
 * TypeScript type definitions for payment forms
 */

export interface PaymentFormData {
  amount: number
  currency: string
  description: string
  projectId?: string
  projectTitle?: string
  clientId: string
  clientName: string
  clientEmail: string
  notes?: string
  paymentMethod?: string
}

export interface PaymentFormErrors {
  amount?: string
  currency?: string
  description?: string
  projectId?: string
  projectTitle?: string
  clientId?: string
  clientName?: string
  clientEmail?: string
  notes?: string
  paymentMethod?: string
  general?: string
}
