/**
 * Admin Form Types
 * TypeScript type definitions for admin forms
 */

export interface AdminUserFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
  isActive: boolean
  isVerified: boolean
}

export interface AdminSystemConfigFormData {
  key: string
  value: any
  description?: string
  type: string
  isActive: boolean
}

export interface AdminBulkActionFormData {
  action: string
  userIds: string[]
  data?: Record<string, any>
}

export interface AdminFormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  role?: string
  isActive?: string
  isVerified?: string
  key?: string
  value?: string
  description?: string
  type?: string
  action?: string
  userIds?: string
  data?: string
  general?: string
}
