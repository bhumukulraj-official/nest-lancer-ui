/**
 * Status Constants
 * Status labels and mappings
 */

// User Status Labels
export const USER_STATUS_LABELS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  SUSPENDED: 'Suspended',
  VERIFIED: 'Verified',
  UNVERIFIED: 'Unverified',
} as const

// Project Status Labels
export const PROJECT_STATUS_LABELS = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  IN_PROGRESS: 'In Progress',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  ARCHIVED: 'Archived',
} as const

// Request Status Labels
export const REQUEST_STATUS_LABELS = {
  PENDING: 'Pending',
  ACTIVE: 'Active',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const

// Quote Status Labels
export const QUOTE_STATUS_LABELS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired',
  WITHDRAWN: 'Withdrawn',
} as const

// Payment Status Labels
export const PAYMENT_STATUS_LABELS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
} as const

// Combined status labels for backward compatibility
export const STATUS_LABELS = {
  ...USER_STATUS_LABELS,
  ...PROJECT_STATUS_LABELS,
  ...REQUEST_STATUS_LABELS,
  ...QUOTE_STATUS_LABELS,
  ...PAYMENT_STATUS_LABELS,
} as const

export const STATUS_COLORS = {
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  ERROR: '#dc3545',
  INFO: '#17a2b8',
  PRIMARY: '#3399cc',
  SECONDARY: '#6c757d',
} as const
