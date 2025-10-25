/**
 * Messages Constants
 * User-facing display messages and labels
 */

export const MESSAGES = {
  // Common Messages
  LOADING: 'Loading...',
  SAVING: 'Saving...',
  SUCCESS: 'Success!',
  ERROR: 'An error occurred',
  WARNING: 'Warning',
  INFO: 'Information',
  
  // Authentication Messages
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_ERROR: 'Invalid credentials',
  LOGOUT_SUCCESS: 'Logged out successfully',
  REGISTER_SUCCESS: 'Registration successful',
  PASSWORD_RESET_SENT: 'Password reset email sent',
  PASSWORD_CHANGED: 'Password changed successfully',
  
  // Form Messages
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email',
  PASSWORD_MISMATCH: 'Passwords do not match',
  FORM_SUBMITTED: 'Form submitted successfully',
  
  // CRUD Messages
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  SAVED: 'Saved successfully',
  
  // Error Messages
  NETWORK_ERROR: 'Network connection error',
  SERVER_ERROR: 'Server error occurred',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
} as const

export const LABELS = {
  // Common Labels
  NAME: 'Name',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  SUBMIT: 'Submit',
  CANCEL: 'Cancel',
  SAVE: 'Save',
  DELETE: 'Delete',
  EDIT: 'Edit',
  VIEW: 'View',
  CREATE: 'Create',
  UPDATE: 'Update',
  
  // Navigation Labels
  HOME: 'Home',
  DASHBOARD: 'Dashboard',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  LOGOUT: 'Logout',
  
  // Status Labels
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const
