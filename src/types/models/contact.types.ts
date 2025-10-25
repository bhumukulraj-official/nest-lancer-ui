/**
 * Contact-related TypeScript type definitions
 * These types represent the data structures for contact management
 */

export interface ContactForm {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  company?: string
  website?: string
  department?: string
  position?: string
  inquiryType: InquiryType
  priority: ContactPriority
  status: ContactStatus
  source: ContactSource
  ipAddress?: string
  userAgent?: string
  location?: ContactLocation
  attachments: ContactAttachment[]
  assignedTo?: string
  assignedToName?: string
  assignedAt?: string
  respondedAt?: string
  closedAt?: string
  response?: ContactResponse
  tags: string[]
  notes: ContactNote[]
  followUpDate?: string
  createdAt: string
  updatedAt: string
}

export interface ContactAttachment {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  mimeType: string
  description?: string
  uploadedAt: string
}

export interface ContactLocation {
  country: string
  state?: string
  city?: string
  coordinates?: {
    lat: number
    lng: number
  }
  timezone?: string
}

export interface ContactResponse {
  id: string
  contactId: string
  respondedBy: string
  respondedByName: string
  response: string
  method: ResponseMethod
  attachments?: ContactAttachment[]
  isInternal: boolean
  createdAt: string
}

export interface ContactNote {
  id: string
  contactId: string
  note: string
  isInternal: boolean
  createdBy: string
  createdByName: string
  createdAt: string
  updatedAt: string
}

export interface ContactTemplate {
  id: string
  name: string
  subject: string
  message: string
  inquiryType: InquiryType
  isActive: boolean
  isDefault: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface ContactStats {
  totalContacts: number
  newContacts: number
  respondedContacts: number
  closedContacts: number
  pendingContacts: number
  contactsByType: Array<{
    type: InquiryType
    count: number
    percentage: number
  }>
  contactsByStatus: Array<{
    status: ContactStatus
    count: number
    percentage: number
  }>
  contactsByPriority: Array<{
    priority: ContactPriority
    count: number
    percentage: number
  }>
  contactsBySource: Array<{
    source: ContactSource
    count: number
    percentage: number
  }>
  responseTime: {
    average: number
    median: number
    min: number
    max: number
  }
  monthlyTrends: Array<{
    month: string
    year: number
    count: number
    responded: number
    closed: number
  }>
}

export interface ContactFilters {
  status?: ContactStatus[]
  priority?: ContactPriority[]
  inquiryType?: InquiryType[]
  source?: ContactSource[]
  assignedTo?: string[]
  tags?: string[]
  dateFrom?: string
  dateTo?: string
  respondedFrom?: string
  respondedTo?: string
  search?: string
  sortBy?: ContactSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface ContactCreateData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  company?: string
  website?: string
  department?: string
  position?: string
  inquiryType: InquiryType
  priority?: ContactPriority
  source?: ContactSource
  attachments?: File[]
  tags?: string[]
  followUpDate?: string
}

export interface ContactUpdateData {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  company?: string
  website?: string
  department?: string
  position?: string
  inquiryType?: InquiryType
  priority?: ContactPriority
  status?: ContactStatus
  assignedTo?: string
  tags?: string[]
  followUpDate?: string
}

export interface ContactSearchResult {
  contacts: ContactForm[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ContactAnalytics {
  totalContacts: number
  contactsByType: Array<{
    type: InquiryType
    count: number
    percentage: number
    averageResponseTime: number
    resolutionRate: number
  }>
  contactsByStatus: Array<{
    status: ContactStatus
    count: number
    percentage: number
    averageResolutionTime: number
  }>
  contactsByPriority: Array<{
    priority: ContactPriority
    count: number
    percentage: number
    averageResponseTime: number
    resolutionRate: number
  }>
  contactsBySource: Array<{
    source: ContactSource
    count: number
    percentage: number
    conversionRate: number
  }>
  responseMetrics: {
    totalResponses: number
    averageResponseTime: number
    medianResponseTime: number
    responseRate: number
    resolutionRate: number
  }
  dailyTrends: Array<{
    date: string
    received: number
    responded: number
    closed: number
  }>
  monthlyTrends: Array<{
    month: string
    year: number
    received: number
    responded: number
    closed: number
    averageResponseTime: number
  }>
  topInquiries: Array<{
    subject: string
    count: number
    averageResponseTime: number
    resolutionRate: number
  }>
  agentPerformance: Array<{
    agentId: string
    agentName: string
    assignedContacts: number
    respondedContacts: number
    closedContacts: number
    averageResponseTime: number
    resolutionRate: number
  }>
}

export interface ContactResponseData {
  contactId: string
  response: string
  method: ResponseMethod
  attachments?: File[]
  isInternal?: boolean
}

export interface ContactNoteData {
  contactId: string
  note: string
  isInternal?: boolean
}

export interface ContactBulkAction {
  action: BulkActionType
  contactIds: string[]
  data?: Record<string, any>
}

export interface ContactBulkActionResult {
  success: string[]
  failed: Array<{
    contactId: string
    error: string
  }>
  total: number
  successCount: number
  failureCount: number
}

export interface ContactExport {
  format: 'csv' | 'xlsx' | 'json'
  filters?: ContactFilters
  fields?: string[]
  dateRange?: {
    from: string
    to: string
  }
}

export interface ContactImport {
  file: File
  format: 'csv' | 'xlsx' | 'json'
  mapping?: Record<string, string>
  options?: {
    skipHeader?: boolean
    delimiter?: string
    encoding?: string
    validateData?: boolean
    updateExisting?: boolean
  }
}

export interface ContactImportResult {
  total: number
  imported: number
  updated: number
  skipped: number
  errors: Array<{
    row: number
    field?: string
    error: string
    data?: any
  }>
  warnings: Array<{
    row: number
    field?: string
    warning: string
    data?: any
  }>
}

// Enums
export enum InquiryType {
  GENERAL = 'general',
  SUPPORT = 'support',
  SALES = 'sales',
  PARTNERSHIP = 'partnership',
  MEDIA = 'media',
  CAREER = 'career',
  FEEDBACK = 'feedback',
  COMPLAINT = 'complaint',
  SUGGESTION = 'suggestion',
  BUG_REPORT = 'bug_report',
  FEATURE_REQUEST = 'feature_request',
  OTHER = 'other'
}

export enum ContactPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum ContactStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  RESPONDED = 'responded',
  WAITING_FOR_RESPONSE = 'waiting_for_response',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  ESCALATED = 'escalated',
  SPAM = 'spam'
}

export enum ContactSource {
  WEBSITE = 'website',
  EMAIL = 'email',
  PHONE = 'phone',
  SOCIAL_MEDIA = 'social_media',
  REFERRAL = 'referral',
  ADVERTISEMENT = 'advertisement',
  EVENT = 'event',
  PARTNER = 'partner',
  OTHER = 'other'
}

export enum ResponseMethod {
  EMAIL = 'email',
  PHONE = 'phone',
  IN_PERSON = 'in_person',
  VIDEO_CALL = 'video_call',
  CHAT = 'chat',
  OTHER = 'other'
}

export enum BulkActionType {
  ASSIGN = 'assign',
  CHANGE_STATUS = 'change_status',
  CHANGE_PRIORITY = 'change_priority',
  ADD_TAGS = 'add_tags',
  REMOVE_TAGS = 'remove_tags',
  DELETE = 'delete',
  EXPORT = 'export',
  MARK_AS_SPAM = 'mark_as_spam'
}

export enum ContactSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
  EMAIL = 'email',
  SUBJECT = 'subject',
  STATUS = 'status',
  PRIORITY = 'priority',
  ASSIGNED_TO = 'assignedTo',
  RESPONDED_AT = 'respondedAt',
  FOLLOW_UP_DATE = 'followUpDate'
}
