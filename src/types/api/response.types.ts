/**
 * API Response Types
 * TypeScript type definitions for API response interfaces
 */

// Base API Response Interface
export interface BaseApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  timestamp: string
}

// Paginated Response Interface
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Error Response Interface
export interface ErrorResponse {
  success: false
  error: {
    message: string
    code: string
    status: number
    details?: any
    validationErrors?: Record<string, string[]>
  }
  timestamp: string
}

// Authentication Responses
export interface LoginResponse {
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    avatar?: string
    isActive: boolean
    isVerified: boolean
    lastLoginAt?: string
  }
  tokens: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}

export interface RegisterResponse {
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    isActive: boolean
    isVerified: boolean
  }
  message: string
}

export interface RefreshTokenResponse {
  accessToken: string
  expiresIn: number
}

export interface ForgotPasswordResponse {
  message: string
  resetToken?: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface VerifyEmailResponse {
  message: string
  isVerified: boolean
}

// User Profile Responses
export interface UserProfileResponse {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  bio?: string
  avatar?: string
  website?: string
  location?: string
  timezone?: string
  role: string
  isActive: boolean
  isVerified: boolean
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export interface UserListResponse {
  users: UserProfileResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface AvatarUploadResponse {
  avatar: {
    url: string
    filename: string
    size: number
    mimeType: string
  }
  message: string
}

// Project Responses
export interface ProjectResponse {
  id: string
  title: string
  description: string
  shortDescription?: string
  status: string
  category: string
  budget: number
  currency: string
  duration: number
  startDate: string
  endDate?: string
  clientId: string
  clientName: string
  clientEmail: string
  technologies: string[]
  requirements: string[]
  deliverables: string[]
  images: Array<{
    id: string
    url: string
    alt: string
    caption?: string
    isPrimary: boolean
    order: number
  }>
  featured: boolean
  createdAt: string
  updatedAt: string
  completedAt?: string
  progress: number
  milestones: Array<{
    id: string
    title: string
    description: string
    status: string
    dueDate: string
    completedAt?: string
    progress: number
    deliverables: string[]
  }>
  testimonials: Array<{
    id: string
    clientName: string
    clientRole: string
    rating: number
    comment: string
    createdAt: string
    isVerified: boolean
  }>
  tags: string[]
  visibility: string
  isActive: boolean
  isDeleted: boolean
}

export interface ProjectListResponse {
  projects: ProjectResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ProjectStatsResponse {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalRevenue: number
  averageProjectValue: number
  averageDuration: number
  completionRate: number
  clientSatisfaction: number
  technologiesUsed: Array<{
    name: string
    count: number
    percentage: number
  }>
  categoryBreakdown: Array<{
    category: string
    count: number
    percentage: number
    totalRevenue: number
  }>
}

// Request Service Responses
export interface ServiceRequestResponse {
  id: string
  title: string
  description: string
  category: string
  budget: number
  currency: string
  timeline: string
  requirements: string[]
  status: string
  clientId: string
  clientName: string
  clientEmail: string
  attachments: Array<{
    id: string
    filename: string
    url: string
    size: number
    mimeType: string
  }>
  createdAt: string
  updatedAt: string
}

export interface ServiceRequestListResponse {
  requests: ServiceRequestResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Quote Responses
export interface QuoteResponse {
  id: string
  serviceRequestId: string
  title: string
  description: string
  amount: number
  currency: string
  timeline: string
  deliverables: string[]
  terms: string[]
  validUntil: string
  status: string
  notes?: string
  clientId: string
  clientName: string
  clientEmail: string
  createdAt: string
  updatedAt: string
  acceptedAt?: string
  rejectedAt?: string
}

export interface QuoteListResponse {
  quotes: QuoteResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Payment Responses
export interface PaymentResponse {
  id: string
  orderId: string
  amount: number
  currency: string
  status: string
  method: string
  description: string
  projectId?: string
  projectTitle?: string
  clientId: string
  clientName: string
  clientEmail: string
  razorpayPaymentId?: string
  razorpayOrderId?: string
  razorpaySignature?: string
  receipt?: string
  notes?: string
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
  paidAt?: string
  refundedAt?: string
  refundAmount?: number
  refundReason?: string
}

export interface PaymentListResponse {
  payments: PaymentResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface PaymentStatsResponse {
  totalPayments: number
  totalAmount: number
  currency: string
  successfulPayments: number
  failedPayments: number
  pendingPayments: number
  refundedPayments: number
  averagePaymentAmount: number
  monthlyRevenue: Array<{
    month: string
    year: number
    amount: number
    count: number
  }>
  paymentMethodBreakdown: Array<{
    method: string
    count: number
    amount: number
    percentage: number
  }>
  projectRevenue: Array<{
    projectId: string
    projectTitle: string
    amount: number
    count: number
  }>
}

export interface RazorpayOrderResponse {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
  createdAt: number
}

// Media Responses
export interface MediaResponse {
  id: string
  filename: string
  originalName: string
  url: string
  thumbnailUrl?: string
  size: number
  mimeType: string
  category: string
  description?: string
  tags: string[]
  isPublic: boolean
  uploadedBy: string
  createdAt: string
  updatedAt: string
}

export interface MediaListResponse {
  media: MediaResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface MediaUploadResponse {
  media: MediaResponse
  message: string
}

// Messaging Responses
export interface MessageResponse {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  type: string
  status: string
  timestamp: string
  editedAt?: string
  replyTo?: string
  attachments: Array<{
    id: string
    fileName: string
    fileSize: number
    fileType: string
    fileUrl: string
    thumbnailUrl?: string
    uploadedAt: string
  }>
  reactions: Array<{
    id: string
    userId: string
    userName: string
    emoji: string
    timestamp: string
  }>
  isRead: boolean
  readAt?: string
  metadata?: Record<string, any>
}

export interface ConversationResponse {
  id: string
  participants: Array<{
    id: string
    name: string
    email: string
    avatar?: string
    role: string
    isOnline: boolean
    lastSeen?: string
    joinedAt: string
  }>
  lastMessage?: MessageResponse
  lastMessageAt: string
  unreadCount: number
  isActive: boolean
  isArchived: boolean
  isMuted: boolean
  createdAt: string
  updatedAt: string
  metadata?: Record<string, any>
}

export interface ConversationListResponse {
  conversations: ConversationResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface MessageListResponse {
  messages: MessageResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Notification Responses
export interface NotificationResponse {
  id: string
  userId: string
  type: string
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: string
  readAt?: string
}

export interface NotificationListResponse {
  notifications: NotificationResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  unreadCount: number
}

// Blog Responses
export interface BlogPostResponse {
  id: string
  title: string
  content: string
  excerpt?: string
  tags: string[]
  category: string
  isPublished: boolean
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
  authorId: string
  authorName: string
  authorAvatar?: string
  views: number
  likes: number
  comments: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface BlogListResponse {
  posts: BlogPostResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface BlogCommentResponse {
  id: string
  postId: string
  authorId: string
  authorName: string
  authorAvatar?: string
  content: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
}

// Contact Responses
export interface ContactFormResponse {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  company?: string
  website?: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface ContactListResponse {
  contacts: ContactFormResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Portfolio Responses
export interface PortfolioResponse {
  id: string
  userId: string
  title: string
  description: string
  shortDescription?: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  avatar?: string
  coverImage?: string
  isPublic: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PortfolioProjectResponse {
  id: string
  portfolioId: string
  projectId: string
  title: string
  description: string
  shortDescription?: string
  imageUrl?: string
  technologies: string[]
  category: string
  featured: boolean
  order: number
  projectUrl?: string
  githubUrl?: string
  demoUrl?: string
  startDate: string
  endDate?: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface PortfolioStatsResponse {
  totalProjects: number
  featuredProjects: number
  totalSkills: number
  yearsOfExperience: number
  totalClients: number
  averageRating: number
  totalTestimonials: number
  totalAchievements: number
  profileViews: number
  lastUpdated: string
}

// Progress Responses
export interface ProgressUpdateResponse {
  id: string
  projectId: string
  progress: number
  notes?: string
  attachments: Array<{
    id: string
    filename: string
    url: string
    size: number
    mimeType: string
  }>
  createdAt: string
  updatedAt: string
}

export interface MilestoneResponse {
  id: string
  projectId: string
  title: string
  description: string
  status: string
  dueDate: string
  completedAt?: string
  progress: number
  deliverables: string[]
  createdAt: string
  updatedAt: string
}

// Admin Responses
export interface AdminDashboardResponse {
  overview: {
    totalUsers: number
    totalProjects: number
    totalRequests: number
    totalPayments: number
    totalRevenue: number
    activeUsers: number
    pendingRequests: number
    completedProjects: number
  }
  analytics: {
    userGrowth: Array<{
      date: string
      count: number
    }>
    revenueGrowth: Array<{
      date: string
      amount: number
    }>
    projectStats: Array<{
      status: string
      count: number
    }>
    paymentStats: Array<{
      status: string
      count: number
      amount: number
    }>
  }
  recentActivity: Array<{
    id: string
    type: string
    description: string
    userId?: string
    userName?: string
    timestamp: string
    metadata?: Record<string, any>
  }>
}

export interface AdminAnalyticsResponse {
  metrics: Record<string, number>
  charts: Array<{
    type: string
    title: string
    data: any[]
    config?: Record<string, any>
  }>
  timeRange: {
    from: string
    to: string
  }
}

export interface AdminSystemInfoResponse {
  system: {
    version: string
    uptime: number
    environment: string
    nodeVersion: string
    platform: string
  }
  database: {
    status: string
    version: string
    connections: number
    maxConnections: number
  }
  storage: {
    total: number
    used: number
    available: number
    percentage: number
  }
  performance: {
    cpuUsage: number
    memoryUsage: number
    diskUsage: number
    networkLatency: number
  }
}

// WebSocket Responses
export interface WebSocketResponse {
  type: string
  data: any
  timestamp: string
  room?: string
  userId?: string
}

export interface WebSocketErrorResponse {
  type: 'error'
  error: {
    message: string
    code: string
    details?: any
  }
  timestamp: string
}

// File Upload Responses
export interface FileUploadResponse {
  file: {
    id: string
    filename: string
    url: string
    size: number
    mimeType: string
  }
  message: string
}

export interface BulkFileUploadResponse {
  files: Array<{
    id: string
    filename: string
    url: string
    size: number
    mimeType: string
  }>
  errors: Array<{
    filename: string
    error: string
  }>
  message: string
}

// Export/Import Responses
export interface ExportDataResponse {
  downloadUrl: string
  filename: string
  expiresAt: string
  message: string
}

export interface ImportDataResponse {
  imported: number
  errors: Array<{
    row: number
    error: string
  }>
  message: string
}

// Health Check Response
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  uptime: number
  services: Record<string, {
    status: 'up' | 'down'
    responseTime?: number
    lastCheck: string
  }>
}
