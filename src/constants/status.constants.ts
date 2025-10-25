/**
 * Status Constants
 * Status labels and mappings
 */

export const STATUS_LABELS = {
  // User Status
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  SUSPENDED: 'Suspended',
  VERIFIED: 'Verified',
  UNVERIFIED: 'Unverified',
  
  // Project Status
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  IN_PROGRESS: 'In Progress',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  ARCHIVED: 'Archived',
  
  // Request Status
  PENDING: 'Pending',
  ACTIVE: 'Active',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  
  // Quote Status
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired',
  WITHDRAWN: 'Withdrawn',
  
  // Payment Status
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
} as const

export const STATUS_COLORS = {
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  ERROR: '#dc3545',
  INFO: '#17a2b8',
  PRIMARY: '#3399cc',
  SECONDARY: '#6c757d',
} as const
