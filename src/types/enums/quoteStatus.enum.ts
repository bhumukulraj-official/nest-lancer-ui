/**
 * Quote Status Enums
 * TypeScript enumeration for quote status values
 */

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

export enum QuotePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum QuoteType {
  FIXED_PRICE = 'fixed_price',
  HOURLY = 'hourly',
  MILESTONE = 'milestone',
  RETAINER = 'retainer',
  EQUITY = 'equity',
  BARTER = 'barter',
  OTHER = 'other'
}

export enum QuoteCurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
  CHF = 'CHF',
  CNY = 'CNY',
  INR = 'INR',
  BRL = 'BRL',
  RUB = 'RUB',
  KRW = 'KRW'
}

export enum QuoteTimeline {
  LESS_THAN_1_WEEK = 'less_than_1_week',
  LESS_THAN_1_MONTH = 'less_than_1_month',
  LESS_THAN_3_MONTHS = 'less_than_3_months',
  LESS_THAN_6_MONTHS = 'less_than_6_months',
  MORE_THAN_6_MONTHS = 'more_than_6_months',
  ONGOING = 'ongoing',
  FLEXIBLE = 'flexible'
}

export enum QuoteExperience {
  ENTRY_LEVEL = 'entry_level',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
  ANY = 'any'
}

export enum QuoteLocation {
  REMOTE = 'remote',
  ONSITE = 'onsite',
  HYBRID = 'hybrid',
  ANY = 'any'
}

export enum QuoteLanguage {
  ENGLISH = 'english',
  SPANISH = 'spanish',
  FRENCH = 'french',
  GERMAN = 'german',
  ITALIAN = 'italian',
  PORTUGUESE = 'portuguese',
  RUSSIAN = 'russian',
  CHINESE = 'chinese',
  JAPANESE = 'japanese',
  KOREAN = 'korean',
  ARABIC = 'arabic',
  HINDI = 'hindi',
  OTHER = 'other'
}

export enum QuoteWorkType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
  VOLUNTEER = 'volunteer',
  ANY = 'any'
}

export enum QuoteAvailability {
  IMMEDIATE = 'immediate',
  WITHIN_1_WEEK = 'within_1_week',
  WITHIN_2_WEEKS = 'within_2_weeks',
  WITHIN_1_MONTH = 'within_1_month',
  FLEXIBLE = 'flexible'
}

export enum QuoteCommunication {
  EMAIL = 'email',
  PHONE = 'phone',
  VIDEO_CALL = 'video_call',
  CHAT = 'chat',
  IN_PERSON = 'in_person',
  ANY = 'any'
}

export enum QuotePaymentTerms {
  NET_15 = 'net_15',
  NET_30 = 'net_30',
  NET_45 = 'net_45',
  NET_60 = 'net_60',
  NET_90 = 'net_90',
  DUE_ON_RECEIPT = 'due_on_receipt',
  ADVANCE_PAYMENT = 'advance_payment',
  MILESTONE_PAYMENT = 'milestone_payment',
  CUSTOM = 'custom'
}

export enum QuoteDeliveryMethod {
  EMAIL = 'email',
  POSTAL_MAIL = 'postal_mail',
  COURIER = 'courier',
  HAND_DELIVERY = 'hand_delivery',
  ELECTRONIC = 'electronic',
  OTHER = 'other'
}

export enum QuoteRevisionType {
  AMOUNT = 'amount',
  TIMELINE = 'timeline',
  DELIVERABLES = 'deliverables',
  TERMS = 'terms',
  GENERAL = 'general'
}

export enum QuoteRevisionStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COUNTERED = 'countered',
  WITHDRAWN = 'withdrawn'
}

export enum QuoteNegotiationType {
  AMOUNT = 'amount',
  TIMELINE = 'timeline',
  DELIVERABLES = 'deliverables',
  TERMS = 'terms',
  GENERAL = 'general'
}

export enum QuoteNegotiationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COUNTERED = 'countered',
  WITHDRAWN = 'withdrawn'
}

export enum QuoteTemplateType {
  STANDARD = 'standard',
  CUSTOM = 'custom',
  INDUSTRY_SPECIFIC = 'industry_specific',
  CLIENT_SPECIFIC = 'client_specific'
}

export enum QuoteTemplateCategory {
  WEB_DEVELOPMENT = 'web_development',
  MOBILE_DEVELOPMENT = 'mobile_development',
  DESKTOP_DEVELOPMENT = 'desktop_development',
  GAME_DEVELOPMENT = 'game_development',
  DESIGN = 'design',
  WRITING = 'writing',
  TRANSLATION = 'translation',
  DATA_ENTRY = 'data_entry',
  CUSTOMER_SERVICE = 'customer_service',
  MARKETING = 'marketing',
  SALES = 'sales',
  ACCOUNTING = 'accounting',
  LEGAL = 'legal',
  OTHER = 'other'
}

export enum QuoteSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  AMOUNT = 'amount',
  TIMELINE = 'timeline',
  STATUS = 'status',
  VALID_UNTIL = 'validUntil',
  FREELANCER_NAME = 'freelancerName',
  CLIENT_NAME = 'clientName',
  PRIORITY = 'priority',
  TYPE = 'type'
}

export enum QuoteFilterType {
  STATUS = 'status',
  TYPE = 'type',
  AMOUNT = 'amount',
  TIMELINE = 'timeline',
  CURRENCY = 'currency',
  EXPERIENCE = 'experience',
  LOCATION = 'location',
  LANGUAGE = 'language',
  WORK_TYPE = 'work_type',
  AVAILABILITY = 'availability',
  COMMUNICATION = 'communication',
  PAYMENT_TERMS = 'payment_terms',
  DELIVERY_METHOD = 'delivery_method',
  TAGS = 'tags'
}

export enum QuoteAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  SUBMIT = 'submit',
  ACCEPT = 'accept',
  REJECT = 'reject',
  WITHDRAW = 'withdraw',
  REVISE = 'revise',
  NEGOTIATE = 'negotiate',
  COUNTER = 'counter',
  EXPIRE = 'expire',
  ARCHIVE = 'archive',
  RESTORE = 'restore',
  APPROVE = 'approve',
  ESCALATE = 'escalate',
  CLOSE = 'close'
}

export enum QuoteNotificationType {
  CREATED = 'created',
  UPDATED = 'updated',
  SUBMITTED = 'submitted',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
  REVISED = 'revised',
  NEGOTIATED = 'negotiated',
  COUNTERED = 'countered',
  EXPIRED = 'expired',
  APPROVED = 'approved',
  ESCALATED = 'escalated',
  CLOSED = 'closed'
}

export enum QuoteComparisonCriteria {
  AMOUNT = 'amount',
  TIMELINE = 'timeline',
  EXPERIENCE = 'experience',
  RATING = 'rating',
  REVIEWS = 'reviews',
  PORTFOLIO = 'portfolio',
  AVAILABILITY = 'availability',
  COMMUNICATION = 'communication',
  PAYMENT_TERMS = 'payment_terms',
  DELIVERY_METHOD = 'delivery_method'
}

export enum QuoteComparisonWeight {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum QuoteComparisonPreference {
  LOWEST = 'lowest',
  HIGHEST = 'highest',
  AVERAGE = 'average',
  FASTEST = 'fastest',
  LONGEST = 'longest',
  MOST = 'most',
  LEAST = 'least'
}

export enum QuoteAnalyticsMetric {
  TOTAL_QUOTES = 'total_quotes',
  ACCEPTED_QUOTES = 'accepted_quotes',
  REJECTED_QUOTES = 'rejected_quotes',
  PENDING_QUOTES = 'pending_quotes',
  EXPIRED_QUOTES = 'expired_quotes',
  WITHDRAWN_QUOTES = 'withdrawn_quotes',
  AVERAGE_AMOUNT = 'average_amount',
  AVERAGE_TIMELINE = 'average_timeline',
  ACCEPTANCE_RATE = 'acceptance_rate',
  RESPONSE_RATE = 'response_rate',
  AVERAGE_RESPONSE_TIME = 'average_response_time'
}

export enum QuoteReportType {
  SUMMARY = 'summary',
  DETAILED = 'detailed',
  COMPARATIVE = 'comparative',
  ANALYTICAL = 'analytical',
  CUSTOM = 'custom'
}

export enum QuoteReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  CSV = 'csv',
  JSON = 'json',
  HTML = 'html'
}

export enum QuoteReportPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
  CUSTOM = 'custom'
}
