/**
 * Main Types Index
 * Central export file for all TypeScript type definitions
 */

// API Types
export * from './api/request.types'
export * from './api/response.types'
export * from './api/error.types'
export * from './api/pagination.types'
export * from './api/webhook.types'

// Model Types - using explicit exports to avoid conflicts
export type {
  User,
  UserProfile,
  UserSettings,
  UserStats,
  UserPreferences,
  UserActivity,
  UserNotificationSettings,
  UserPrivacySettings,
  UserSecuritySettings,
  SkillCategory,
  SkillLevel,
} from './models/user.types'

export type { PortfolioProject, PortfolioTestimonial } from './models/portfolio.types'

export type {
  Project,
  ProjectCreateData,
  ProjectUpdateData,
  ProjectFilters,
  ProjectSearchResult,
  ProjectStats,
  ProjectCategory,
  CategoryStats,
} from './models/project.types'

export type {
  Request,
  ServiceRequest,
  RequestCreateData,
  RequestUpdateData,
  RequestFilters,
  RequestSearchResult,
  RequestStats,
  RequestAnalytics,
  RequestAttachment,
  RequestComment,
  RequestTimeline,
  RequestAssignment,
  RequestEscalation,
  RequestResolution,
  RequestFeedback,
  FeedbackCategory,
} from './models/request.types'

export type {
  Quote,
  QuoteCreateData,
  QuoteUpdateData,
  QuoteFilters,
  QuoteSearchResult,
  QuoteStats,
  QuoteAnalytics,
  QuoteItem,
  QuotePricing,
  QuoteDiscount,
  QuoteTax,
  QuotePaymentTerms,
  QuoteValidity,
  QuoteApproval,
  QuoteRejection,
  QuoteRevision,
  QuoteAcceptance,
} from './models/quote.types'

export type {
  Payment,
  PaymentCreateData,
  PaymentUpdateData,
  PaymentFilters,
  PaymentSearchResult,
  PaymentStats,
  PaymentMethod,
} from './models/payment.types'

export type {
  Media,
  MediaUpload,
  MediaFilters,
  MediaSearchResult,
  MediaStats,
  MediaMetadata,
  MediaCategoryInfo,
} from './models/media.types'

export { MediaCategory } from './models/media.types'

export type {
  Conversation,
  Message,
  MessageCreateData,
  MessageFilters,
  MessageSearchResult,
  TypingIndicator,
} from './models/message.types'

export type {
  Notification,
  NotificationCreateData,
  NotificationFilters,
  NotificationSearchResult,
  NotificationStats,
} from './models/notification.types'

export type {
  BlogPost,
  BlogCreateData,
  BlogUpdateData,
  BlogFilters,
  BlogSearchResult,
  BlogStats,
  BlogCategory,
  BlogTag,
  BlogComment,
} from './models/blog.types'

export type {
  ContactMessage,
  ContactCreateData,
  ContactFilters,
  ContactSearchResult,
  ContactStats,
} from './models/contact.types'

export type {
  Progress,
  ProgressUpdate,
  MilestoneCreateData,
  MilestoneUpdateData,
  Milestone,
  TimelineEvent,
  ProgressTimeline,
  ProgressComment,
} from './models/progress.types'

export type {
  Portfolio,
  PortfolioUpdateData,
  PortfolioStats,
} from './models/portfolio.types'

// Enum Types - using explicit exports to avoid conflicts
export {
  UserRole,
  UserLanguage,
  AdminRole,
} from './enums/userRole.enum'

export {
  RequestStatus,
  RequestPriority,
  RequestComplexity,
  RequestVisibility,
  RequestCategory,
  RequestSubcategory,
  RequestSortBy,
} from './enums/requestStatus.enum'

export {
  QuoteStatus,
  QuoteSortBy,
} from './enums/quoteStatus.enum'

export {
  PaymentStatus,
  PaymentMethodType,
  PaymentProvider,
  PaymentSortBy,
  OrderStatus,
  RefundStatus,
} from './enums/paymentStatus.enum'

export {
  NotificationType,
  NotificationChannel,
  NotificationPriority,
  NotificationSortBy,
} from './enums/notificationType.enum'

export {
  ProjectStatus,
  ProjectVisibility,
  ProjectSortBy,
  MilestoneStatus,
} from './enums/projectStatus.enum'

// Form Types
export * from './forms/auth.form.types'
export * from './forms/project.form.types'
export * from './forms/request.form.types'
export * from './forms/quote.form.types'
export * from './forms/payment.form.types'
export * from './forms/profile.form.types'
export * from './forms/admin.form.types'
