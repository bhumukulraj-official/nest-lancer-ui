/**
 * Request-related TypeScript type definitions
 * These types represent the data structures for service requests
 */

export interface ServiceRequest {
  id: string
  title: string
  description: string
  shortDescription?: string
  category: RequestCategory
  subcategory?: string
  budget: number
  currency: string
  timeline: string
  requirements: string[]
  attachments: RequestAttachment[]
  status: RequestStatus
  priority: RequestPriority
  clientId: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  client?: {
    name?: string
    email?: string
    avatar?: string
  }
  contactInfo: ContactInfo
  location?: RequestLocation
  skills: string[]
  tags: string[]
  visibility: RequestVisibility
  isUrgent: boolean
  isFeatured: boolean
  estimatedDuration?: number
  estimatedComplexity?: RequestComplexity
  quotes: RequestQuote[]
  selectedQuote?: string
  assignedTo?: string
  assignedAt?: string
  startedAt?: string
  completedAt?: string
  cancelledAt?: string
  cancellationReason?: string
  feedback?: RequestFeedback
  deadline?: string
  progressPercentage?: number
  createdAt: string
  updatedAt: string
}

export interface RequestAttachment {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  mimeType: string
  description?: string
  uploadedAt: string
  uploadedBy: string
}

export interface ContactInfo {
  name: string
  email: string
  phone?: string
  company?: string
  website?: string
  preferredContactMethod: ContactMethod
  timezone?: string
  availability?: string
}

export interface RequestLocation {
  country: string
  state?: string
  city?: string
  address?: string
  coordinates?: {
    lat: number
    lng: number
  }
  isRemote: boolean
  timezone?: string
}

export interface RequestQuote {
  id: string
  freelancerId: string
  freelancerName: string
  freelancerAvatar?: string
  amount: number
  currency: string
  timeline: string
  description: string
  deliverables: string[]
  terms: string[]
  validUntil: string
  status: QuoteStatus
  isSelected: boolean
  createdAt: string
  updatedAt: string
  acceptedAt?: string
  rejectedAt?: string
}

export interface RequestFeedback {
  id: string
  rating: number
  comment: string
  categories: FeedbackCategory[]
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface FeedbackCategory {
  category: string
  rating: number
  comment?: string
}

export interface RequestCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  subcategories: RequestSubcategory[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface RequestSubcategory {
  id: string
  name: string
  description: string
  parentCategory: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface RequestStats {
  totalRequests: number
  activeRequests: number
  completedRequests: number
  cancelledRequests: number
  averageBudget: number
  averageDuration: number
  completionRate: number
  clientSatisfaction: number
  categoryBreakdown: CategoryStats[]
  skillBreakdown: SkillStats[]
  locationBreakdown: LocationStats[]
}

export interface CategoryStats {
  category: string
  count: number
  percentage: number
  averageBudget: number
  averageDuration: number
}

export interface SkillStats {
  skill: string
  count: number
  percentage: number
  averageBudget: number
  averageDuration: number
}

export interface LocationStats {
  location: string
  count: number
  percentage: number
  averageBudget: number
  averageDuration: number
}

export interface RequestFilters {
  status?: RequestStatus[]
  category?: string[]
  subcategory?: string[]
  skills?: string[]
  budgetMin?: number
  budgetMax?: number
  timeline?: string[]
  priority?: RequestPriority[]
  complexity?: RequestComplexity[]
  location?: string[]
  isRemote?: boolean
  isUrgent?: boolean
  isFeatured?: boolean
  visibility?: RequestVisibility[]
  dateFrom?: string
  dateTo?: string
  search?: string
  sortBy?: RequestSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface RequestCreateData {
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
  priority?: RequestPriority
  contactInfo: ContactInfo
  location?: RequestLocation
  skills: string[]
  tags: string[]
  visibility?: RequestVisibility
  isUrgent?: boolean
  estimatedDuration?: number
  estimatedComplexity?: RequestComplexity
}

export interface RequestUpdateData {
  title?: string
  description?: string
  shortDescription?: string
  category?: string
  subcategory?: string
  budget?: number
  currency?: string
  timeline?: string
  requirements?: string[]
  priority?: RequestPriority
  contactInfo?: ContactInfo
  location?: RequestLocation
  skills?: string[]
  tags?: string[]
  visibility?: RequestVisibility
  isUrgent?: boolean
  estimatedDuration?: number
  estimatedComplexity?: RequestComplexity
  status?: RequestStatus
}

export interface RequestSearchResult {
  data: ServiceRequest[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface RequestAnalytics {
  totalRequests: number
  requestsByStatus: Array<{
    status: RequestStatus
    count: number
    percentage: number
  }>
  requestsByCategory: Array<{
    category: string
    count: number
    percentage: number
    averageBudget: number
  }>
  requestsByTimeline: Array<{
    timeline: string
    count: number
    percentage: number
  }>
  budgetDistribution: Array<{
    range: string
    count: number
    percentage: number
  }>
  monthlyTrends: Array<{
    month: string
    year: number
    count: number
    averageBudget: number
  }>
  topSkills: Array<{
    skill: string
    count: number
    percentage: number
  }>
  locationDistribution: Array<{
    location: string
    count: number
    percentage: number
  }>
}

// Enums
export enum RequestStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  ACTIVE = 'active',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  ARCHIVED = 'archived'
}

export enum RequestPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum RequestComplexity {
  SIMPLE = 'simple',
  MODERATE = 'moderate',
  COMPLEX = 'complex',
  VERY_COMPLEX = 'very_complex'
}

export enum RequestVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  UNLISTED = 'unlisted',
  INVITE_ONLY = 'invite_only'
}

export enum ContactMethod {
  EMAIL = 'email',
  PHONE = 'phone',
  MESSAGE = 'message',
  VIDEO_CALL = 'video_call'
}

export enum QuoteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  WITHDRAWN = 'withdrawn'
}

export enum RequestSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TITLE = 'title',
  STATUS = 'status',
  BUDGET = 'budget',
  TIMELINE = 'timeline',
  PRIORITY = 'priority',
  CLIENT_NAME = 'clientName',
  DEADLINE = 'deadline'
}

// Type aliases for backward compatibility
export type Request = ServiceRequest

export interface RequestComment {
  id: string
  content: string
  authorId: string
  authorName: string
  authorRole: string
  isInternal: boolean
  attachments?: RequestAttachment[]
  createdAt: string
  updatedAt: string
}

export interface RequestTimeline {
  id: string
  requestId: string
  type: 'status_change' | 'assignment' | 'comment' | 'escalation' | 'resolution'
  description: string
  metadata?: Record<string, any>
  createdBy: string
  createdAt: string
}

export interface RequestAssignment {
  id: string
  requestId: string
  assigneeId: string
  assigneeName: string
  assignedBy: string
  assignedAt: string
  notes?: string
}

export interface RequestEscalation {
  id: string
  requestId: string
  escalatedBy: string
  escalatedTo: string
  reason: string
  priority: RequestPriority
  notes?: string
  escalatedAt: string
}

export interface RequestResolution {
  id: string
  requestId: string
  resolvedBy: string
  resolution: string
  resolutionType: 'completed' | 'cancelled' | 'rejected'
  feedback?: RequestFeedback
  resolvedAt: string
}
