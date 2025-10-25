/**
 * Request Form Types
 * TypeScript type definitions for request forms
 */

export interface RequestFormData {
  title: string
  description: string
  shortDescription?: string
  category: string
  subcategory?: string
  budget: number
  currency: string
  timeline: string
  requirements: string[]
  attachments?: File[]
  contactInfo: {
    name: string
    email: string
    phone?: string
    company?: string
    website?: string
  }
  location?: {
    country: string
    state?: string
    city?: string
    isRemote: boolean
  }
  skills: string[]
  tags: string[]
  priority?: string
  isUrgent?: boolean
  estimatedDuration?: number
  estimatedComplexity?: string
}

export interface RequestFormErrors {
  title?: string
  description?: string
  shortDescription?: string
  category?: string
  subcategory?: string
  budget?: string
  currency?: string
  timeline?: string
  requirements?: string
  attachments?: string
  contactInfo?: {
    name?: string
    email?: string
    phone?: string
    company?: string
    website?: string
  }
  location?: {
    country?: string
    state?: string
    city?: string
  }
  skills?: string
  tags?: string
  priority?: string
  estimatedDuration?: string
  estimatedComplexity?: string
  general?: string
}
