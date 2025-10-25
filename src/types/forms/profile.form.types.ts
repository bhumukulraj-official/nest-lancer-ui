/**
 * Profile Form Types
 * TypeScript type definitions for profile forms
 */

export interface ProfileFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  bio?: string
  website?: string
  location?: string
  timezone?: string
  avatar?: File
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
}

export interface ProfileFormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  bio?: string
  website?: string
  location?: string
  timezone?: string
  avatar?: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  general?: string
}
