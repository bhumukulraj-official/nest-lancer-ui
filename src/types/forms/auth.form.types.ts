/**
 * Authentication Form Types
 * TypeScript type definitions for authentication forms
 */

export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  role?: string
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface VerifyEmailFormData {
  token: string
}

export interface TwoFactorFormData {
  code: string
  backupCode?: string
}

export interface AuthFormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  token?: string
  code?: string
  general?: string
}
