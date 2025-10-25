/**
 * API Request Types
 * TypeScript type definitions for API request interfaces
 */

// Base API Request Interface
export interface BaseApiRequest {
  headers?: Record<string, string>
  params?: Record<string, any>
  query?: Record<string, any>
  body?: any
}

// Pagination Request Parameters
export interface PaginationRequest {
  page?: number
  limit?: number
  offset?: number
}

// Sorting Request Parameters
export interface SortRequest {
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Search Request Parameters
export interface SearchRequest {
  search?: string
  query?: string
}

// Date Range Request Parameters
export interface DateRangeRequest {
  dateFrom?: string
  dateTo?: string
  startDate?: string
  endDate?: string
}

// Filter Request Parameters
export interface FilterRequest {
  filters?: Record<string, any>
  status?: string[]
  category?: string[]
  tags?: string[]
}

// Combined Request Parameters
export interface ListRequest extends PaginationRequest, SortRequest, SearchRequest, DateRangeRequest, FilterRequest {}

// Authentication Requests
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  role?: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface VerifyEmailRequest {
  token: string
}

// User Profile Requests
export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  bio?: string
  avatar?: string
  website?: string
  location?: string
  timezone?: string
}

export interface UploadAvatarRequest {
  file: File
}

// Project Requests
export interface CreateProjectRequest {
  title: string
  description: string
  shortDescription?: string
  category: string
  budget: number
  currency: string
  duration: number
  startDate: string
  endDate?: string
  clientName: string
  clientEmail: string
  technologies: string[]
  requirements: string[]
  deliverables: string[]
  tags: string[]
  visibility: string
}

export interface UpdateProjectRequest {
  title?: string
  description?: string
  shortDescription?: string
  status?: string
  category?: string
  budget?: number
  currency?: string
  duration?: number
  startDate?: string
  endDate?: string
  clientName?: string
  clientEmail?: string
  technologies?: string[]
  requirements?: string[]
  deliverables?: string[]
  tags?: string[]
  visibility?: string
  featured?: boolean
}

export interface ProjectFiltersRequest {
  status?: string[]
  category?: string[]
  technologies?: string[]
  budgetMin?: number
  budgetMax?: number
  durationMin?: number
  durationMax?: number
  featured?: boolean
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Request Service Requests
export interface CreateServiceRequest {
  title: string
  description: string
  category: string
  budget: number
  currency: string
  timeline: string
  requirements: string[]
  attachments?: File[]
  contactInfo: {
    name: string
    email: string
    phone?: string
  }
}

export interface UpdateServiceRequest {
  title?: string
  description?: string
  category?: string
  budget?: number
  currency?: string
  timeline?: string
  requirements?: string[]
  status?: string
}

export interface ServiceRequestFilters {
  status?: string[]
  category?: string[]
  budgetMin?: number
  budgetMax?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Quote Requests
export interface CreateQuoteRequest {
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
}

export interface UpdateQuoteRequest {
  title?: string
  description?: string
  amount?: number
  currency?: string
  timeline?: string
  deliverables?: string[]
  terms?: string[]
  validUntil?: string
  status?: string
  notes?: string
}

export interface QuoteFiltersRequest {
  status?: string[]
  serviceRequestId?: string
  amountMin?: number
  amountMax?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Payment Requests
export interface CreatePaymentRequest {
  amount: number
  currency: string
  description: string
  projectId?: string
  projectTitle?: string
  clientId: string
  clientName: string
  clientEmail: string
  notes?: string
  metadata?: Record<string, any>
}

export interface ProcessPaymentRequest {
  paymentId: string
  razorpayPaymentId: string
  razorpayOrderId: string
  razorpaySignature: string
}

export interface RefundPaymentRequest {
  paymentId: string
  amount: number
  reason: string
}

export interface PaymentFiltersRequest {
  status?: string[]
  method?: string[]
  projectId?: string
  clientId?: string
  dateFrom?: string
  dateTo?: string
  amountMin?: number
  amountMax?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Media Requests
export interface UploadMediaRequest {
  file: File
  category?: string
  description?: string
  tags?: string[]
  isPublic?: boolean
}

export interface UpdateMediaRequest {
  title?: string
  description?: string
  tags?: string[]
  isPublic?: boolean
  category?: string
}

export interface MediaFiltersRequest {
  category?: string[]
  tags?: string[]
  isPublic?: boolean
  dateFrom?: string
  dateTo?: string
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Messaging Requests
export interface SendMessageRequest {
  conversationId: string
  content: string
  type?: string
  replyTo?: string
  attachments?: File[]
}

export interface CreateConversationRequest {
  participants: string[]
  initialMessage?: string
  metadata?: Record<string, any>
}

export interface UpdateConversationRequest {
  isActive?: boolean
  isArchived?: boolean
  isMuted?: boolean
  metadata?: Record<string, any>
}

// Notification Requests
export interface MarkNotificationReadRequest {
  notificationId: string
}

export interface MarkAllNotificationsReadRequest {
  userId: string
}

export interface NotificationFiltersRequest {
  type?: string[]
  isRead?: boolean
  dateFrom?: string
  dateTo?: string
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Blog Requests
export interface CreateBlogPostRequest {
  title: string
  content: string
  excerpt?: string
  tags: string[]
  category: string
  isPublished: boolean
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
}

export interface UpdateBlogPostRequest {
  title?: string
  content?: string
  excerpt?: string
  tags?: string[]
  category?: string
  isPublished?: boolean
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
}

export interface BlogFiltersRequest {
  category?: string[]
  tags?: string[]
  isPublished?: boolean
  authorId?: string
  dateFrom?: string
  dateTo?: string
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Contact Requests
export interface ContactFormRequest {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  company?: string
  website?: string
}

// Portfolio Requests
export interface CreatePortfolioRequest {
  title: string
  description: string
  shortDescription?: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  isPublic?: boolean
}

export interface UpdatePortfolioRequest {
  title?: string
  description?: string
  shortDescription?: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  avatar?: string
  coverImage?: string
  isPublic?: boolean
  isActive?: boolean
}

// Progress Requests
export interface UpdateProgressRequest {
  projectId: string
  progress: number
  notes?: string
  attachments?: File[]
}

export interface CreateMilestoneRequest {
  projectId: string
  title: string
  description: string
  dueDate: string
  deliverables: string[]
}

export interface UpdateMilestoneRequest {
  title?: string
  description?: string
  status?: string
  dueDate?: string
  completedAt?: string
  progress?: number
  deliverables?: string[]
}

// Admin Requests
export interface AdminUserUpdateRequest {
  userId: string
  firstName?: string
  lastName?: string
  email?: string
  role?: string
  isActive?: boolean
  isVerified?: boolean
}

export interface AdminBulkActionRequest {
  action: string
  userIds: string[]
  data?: Record<string, any>
}

export interface AdminSystemConfigRequest {
  key: string
  value: any
  description?: string
}

export interface AdminAnalyticsRequest {
  dateFrom?: string
  dateTo?: string
  groupBy?: string
  metrics?: string[]
}

// WebSocket Requests
export interface WebSocketJoinRequest {
  room: string
  userId: string
}

export interface WebSocketMessageRequest {
  type: string
  data: any
  room?: string
  targetUserId?: string
}

// File Upload Requests
export interface FileUploadRequest {
  file: File
  category?: string
  description?: string
  tags?: string[]
  isPublic?: boolean
}

export interface BulkFileUploadRequest {
  files: File[]
  category?: string
  description?: string
  tags?: string[]
  isPublic?: boolean
}

// Export/Import Requests
export interface ExportDataRequest {
  type: string
  format: 'json' | 'csv' | 'xlsx'
  filters?: Record<string, any>
  dateFrom?: string
  dateTo?: string
}

export interface ImportDataRequest {
  file: File
  type: string
  mapping?: Record<string, string>
  options?: Record<string, any>
}
