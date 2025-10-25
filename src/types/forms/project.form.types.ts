/**
 * Project Form Types
 * TypeScript type definitions for project forms
 */

export interface ProjectFormData {
  title: string
  description: string
  shortDescription?: string
  category: string
  subcategory?: string
  budget: number
  currency: string
  duration: number
  startDate: string
  endDate?: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  technologies: string[]
  requirements: string[]
  deliverables: string[]
  tags: string[]
  visibility: string
  isUrgent?: boolean
  estimatedComplexity?: string
  attachments?: File[]
}

export interface ProjectFormErrors {
  title?: string
  description?: string
  shortDescription?: string
  category?: string
  subcategory?: string
  budget?: string
  currency?: string
  duration?: string
  startDate?: string
  endDate?: string
  clientName?: string
  clientEmail?: string
  clientPhone?: string
  technologies?: string
  requirements?: string
  deliverables?: string
  tags?: string
  visibility?: string
  attachments?: string
  general?: string
}
