/**
 * Quote-related TypeScript type definitions
 * These types represent the data structures for quote management
 */

export interface Quote {
  id: string
  serviceRequestId: string
  serviceRequestTitle: string
  title: string
  description: string
  amount: number
  currency: string
  timeline: string
  deliverables: string[]
  terms: string[]
  validUntil: string
  status: QuoteStatus
  notes?: string
  metadata?: Record<string, any>
  freelancerId: string
  freelancerName: string
  freelancerAvatar?: string
  freelancerRating?: number
  freelancerReviews?: number
  clientId: string
  clientName: string
  clientEmail: string
  clientAvatar?: string
  revisions: QuoteRevision[]
  attachments: QuoteAttachment[]
  negotiations: QuoteNegotiation[]
  isAccepted: boolean
  acceptedAt?: string
  rejectedAt?: string
  rejectionReason?: string
  withdrawnAt?: string
  withdrawalReason?: string
  deadline?: string
  estimatedDuration?: number
  milestones?: Array<{
    id: string
    title: string
    description: string
    dueDate: string
    amount: number
    status: string
  }>
  termsAndConditions?: string
  progressPercentage?: number
  totalAmount: number
  createdAt: string
  updatedAt: string
}

export interface QuoteRevision {
  id: string
  quoteId: string
  version: number
  changes: QuoteChanges
  reason: string
  createdBy: string
  createdByName: string
  createdAt: string
}

export interface QuoteChanges {
  amount?: {
    old: number
    new: number
  }
  timeline?: {
    old: string
    new: string
  }
  deliverables?: {
    added: string[]
    removed: string[]
    modified: Array<{
      old: string
      new: string
    }>
  }
  terms?: {
    added: string[]
    removed: string[]
    modified: Array<{
      old: string
      new: string
    }>
  }
  description?: {
    old: string
    new: string
  }
}

export interface QuoteAttachment {
  id: string
  quoteId: string
  filename: string
  originalName: string
  url: string
  size: number
  mimeType: string
  description?: string
  uploadedBy: string
  uploadedAt: string
}

export interface QuoteNegotiation {
  id: string
  quoteId: string
  type: NegotiationType
  message: string
  proposedChanges?: Partial<QuoteChanges>
  status: NegotiationStatus
  initiatedBy: string
  initiatedByName: string
  respondedBy?: string
  respondedByName?: string
  respondedAt?: string
  createdAt: string
  updatedAt: string
}

export interface QuoteTemplate {
  id: string
  name: string
  description: string
  category: string
  subcategory?: string
  baseAmount: number
  currency: string
  baseTimeline: string
  deliverables: string[]
  terms: string[]
  isDefault: boolean
  isPublic: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface QuoteStats {
  totalQuotes: number
  acceptedQuotes: number
  rejectedQuotes: number
  pendingQuotes: number
  expiredQuotes: number
  withdrawnQuotes: number
  averageAmount: number
  averageTimeline: number
  acceptanceRate: number
  responseRate: number
  averageResponseTime: number
  categoryBreakdown: QuoteCategoryStats[]
  amountBreakdown: QuoteAmountStats[]
  timelineBreakdown: QuoteTimelineStats[]
}

export interface QuoteCategoryStats {
  category: string
  count: number
  percentage: number
  averageAmount: number
  acceptanceRate: number
}

export interface QuoteAmountStats {
  range: string
  count: number
  percentage: number
  averageTimeline: number
  acceptanceRate: number
}

export interface QuoteTimelineStats {
  timeline: string
  count: number
  percentage: number
  averageAmount: number
  acceptanceRate: number
}

export interface QuoteFilters {
  status?: QuoteStatus[]
  serviceRequestId?: string
  freelancerId?: string
  clientId?: string
  category?: string[]
  amountMin?: number
  amountMax?: number
  timeline?: string[]
  dateFrom?: string
  dateTo?: string
  validUntilFrom?: string
  validUntilTo?: string
  search?: string
  sortBy?: QuoteSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface QuoteCreateData {
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
  metadata?: Record<string, any>
  attachments?: File[]
}

export interface QuoteUpdateData {
  title?: string
  description?: string
  amount?: number
  currency?: string
  timeline?: string
  deliverables?: string[]
  terms?: string[]
  validUntil?: string
  notes?: string
  metadata?: Record<string, any>
  status?: QuoteStatus
}

export interface QuoteRevisionData {
  changes: Partial<QuoteChanges>
  reason: string
}

export interface QuoteNegotiationData {
  type: NegotiationType
  message: string
  proposedChanges?: Partial<QuoteChanges>
}

export interface QuoteSearchResult {
  data: Quote[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface QuoteAnalytics {
  totalQuotes: number
  quotesByStatus: Array<{
    status: QuoteStatus
    count: number
    percentage: number
  }>
  quotesByCategory: Array<{
    category: string
    count: number
    percentage: number
    averageAmount: number
    acceptanceRate: number
  }>
  quotesByTimeline: Array<{
    timeline: string
    count: number
    percentage: number
    averageAmount: number
    acceptanceRate: number
  }>
  amountDistribution: Array<{
    range: string
    count: number
    percentage: number
    acceptanceRate: number
  }>
  monthlyTrends: Array<{
    month: string
    year: number
    count: number
    averageAmount: number
    acceptanceRate: number
  }>
  freelancerPerformance: Array<{
    freelancerId: string
    freelancerName: string
    totalQuotes: number
    acceptedQuotes: number
    acceptanceRate: number
    averageAmount: number
    averageResponseTime: number
  }>
  clientBehavior: Array<{
    clientId: string
    clientName: string
    totalQuotes: number
    acceptedQuotes: number
    averageResponseTime: number
    preferredTimeline: string
    averageBudget: number
  }>
}

export interface QuoteComparison {
  quoteId: string
  freelancerId: string
  freelancerName: string
  freelancerAvatar?: string
  freelancerRating?: number
  freelancerReviews?: number
  amount: number
  currency: string
  timeline: string
  deliverables: string[]
  terms: string[]
  description: string
  responseTime: number
  revisions: number
  negotiations: number
  createdAt: string
  validUntil: string
}

export interface QuoteComparisonResult {
  quotes: QuoteComparison[]
  criteria: ComparisonCriteria
  recommendations: QuoteRecommendation[]
  summary: {
    totalQuotes: number
    averageAmount: number
    averageTimeline: number
    bestValue: string
    fastestDelivery: string
    highestRated: string
  }
}

export interface ComparisonCriteria {
  amount: {
    weight: number
    preference: 'lowest' | 'highest' | 'average'
  }
  timeline: {
    weight: number
    preference: 'fastest' | 'longest' | 'average'
  }
  rating: {
    weight: number
    preference: 'highest' | 'lowest' | 'average'
  }
  experience: {
    weight: number
    preference: 'most' | 'least' | 'average'
  }
}

export interface QuoteRecommendation {
  quoteId: string
  freelancerId: string
  freelancerName: string
  reason: string
  score: number
  highlights: string[]
  concerns?: string[]
}

// Enums
export enum QuoteStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  WITHDRAWN = 'withdrawn',
  NEGOTIATING = 'negotiating',
  REVISED = 'revised'
}

export enum NegotiationType {
  AMOUNT = 'amount',
  TIMELINE = 'timeline',
  DELIVERABLES = 'deliverables',
  TERMS = 'terms',
  GENERAL = 'general'
}

export enum NegotiationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COUNTERED = 'countered',
  WITHDRAWN = 'withdrawn'
}

export enum QuoteSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  AMOUNT = 'amount',
  TIMELINE = 'timeline',
  STATUS = 'status',
  VALID_UNTIL = 'validUntil',
  FREELANCER_NAME = 'freelancerName',
  CLIENT_NAME = 'clientName'
}

// Additional quote-related interfaces
export interface QuoteItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
  category?: string
  type: 'service' | 'product' | 'milestone'
}

export interface QuotePricing {
  subtotal: number
  discountAmount: number
  discountPercentage?: number
  taxAmount: number
  taxRate: number
  total: number
  currency: string
}

export interface QuoteDiscount {
  id: string
  type: 'percentage' | 'fixed'
  value: number
  description: string
  appliedBy: string
  appliedAt: string
}

export interface QuoteTax {
  id: string
  name: string
  rate: number
  amount: number
  type: 'inclusive' | 'exclusive'
  jurisdiction?: string
}

export interface QuotePaymentTerms {
  paymentSchedule: 'full' | 'milestone' | 'installment'
  depositRequired?: boolean
  depositAmount?: number
  depositPercentage?: number
  installments?: number
  netTerms: number // days
  latePaymentFee?: number
}

export interface QuoteValidity {
  validFrom: string
  validUntil: string
  autoExpire: boolean
  expiryWarningDays: number
}

export interface QuoteApproval {
  approvedBy: string
  approvedAt: string
  approvalLevel: 'basic' | 'manager' | 'executive'
  comments?: string
  approvalWorkflowId?: string
}

export interface QuoteRejection {
  rejectedBy: string
  rejectedAt: string
  reason: string
  comments?: string
  canRenegotiate: boolean
}

export interface QuoteAcceptance {
  acceptedBy: string
  acceptedAt: string
  acceptanceType: 'full' | 'conditional'
  conditions?: string[]
  signedDocumentUrl?: string
  ipAddress: string
  userAgent: string
  notes?: string
}
