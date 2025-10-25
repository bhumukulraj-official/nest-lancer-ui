/**
 * Request Status Enums
 * TypeScript enumeration for request status values
 */

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

export enum RequestCategory {
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

export enum RequestSubcategory {
  // Web Development
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  FULL_STACK = 'full_stack',
  E_COMMERCE = 'e_commerce',
  WORDPRESS = 'wordpress',
  SHOPIFY = 'shopify',
  WEB_SCRAPING = 'web_scraping',
  
  // Mobile Development
  IOS = 'ios',
  ANDROID = 'android',
  REACT_NATIVE = 'react_native',
  FLUTTER = 'flutter',
  XAMARIN = 'xamarin',
  
  // Desktop Development
  WINDOWS = 'windows',
  MACOS = 'macos',
  LINUX = 'linux',
  CROSS_PLATFORM = 'cross_platform',
  
  // Game Development
  MOBILE_GAMES = 'mobile_games',
  PC_GAMES = 'pc_games',
  CONSOLE_GAMES = 'console_games',
  VR_AR = 'vr_ar',
  
  // Design
  GRAPHIC_DESIGN = 'graphic_design',
  WEB_DESIGN = 'web_design',
  UI_UX = 'ui_ux',
  LOGO_DESIGN = 'logo_design',
  BRANDING = 'branding',
  PRINT_DESIGN = 'print_design',
  PHOTOGRAPHY = 'photography',
  VIDEO_EDITING = 'video_editing',
  
  // Writing
  CONTENT_WRITING = 'content_writing',
  COPYWRITING = 'copywriting',
  TECHNICAL_WRITING = 'technical_writing',
  CREATIVE_WRITING = 'creative_writing',
  BLOG_WRITING = 'blog_writing',
  SEO_WRITING = 'seo_writing',
  
  // Translation
  DOCUMENT_TRANSLATION = 'document_translation',
  WEBSITE_TRANSLATION = 'website_translation',
  SOFTWARE_LOCALIZATION = 'software_localization',
  INTERPRETATION = 'interpretation',
  
  // Data Entry
  DATA_COLLECTION = 'data_collection',
  DATA_CLEANING = 'data_cleaning',
  DATA_ANALYSIS = 'data_analysis',
  RESEARCH = 'research',
  VIRTUAL_ASSISTANCE = 'virtual_assistance',
  
  // Customer Service
  CUSTOMER_SUPPORT = 'customer_support',
  CHAT_SUPPORT = 'chat_support',
  PHONE_SUPPORT = 'phone_support',
  EMAIL_SUPPORT = 'email_support',
  
  // Marketing
  SOCIAL_MEDIA_MARKETING = 'social_media_marketing',
  EMAIL_MARKETING = 'email_marketing',
  CONTENT_MARKETING = 'content_marketing',
  SEO = 'seo',
  PPC = 'ppc',
  AFFILIATE_MARKETING = 'affiliate_marketing',
  
  // Sales
  LEAD_GENERATION = 'lead_generation',
  SALES_REPRESENTATIVE = 'sales_representative',
  ACCOUNT_MANAGEMENT = 'account_management',
  
  // Accounting
  BOOKKEEPING = 'bookkeeping',
  TAX_PREPARATION = 'tax_preparation',
  FINANCIAL_ANALYSIS = 'financial_analysis',
  AUDITING = 'auditing',
  
  // Legal
  CONTRACT_REVIEW = 'contract_review',
  LEGAL_RESEARCH = 'legal_research',
  COMPLIANCE = 'compliance',
  INTELLECTUAL_PROPERTY = 'intellectual_property'
}

export enum RequestTimeline {
  LESS_THAN_1_WEEK = 'less_than_1_week',
  LESS_THAN_1_MONTH = 'less_than_1_month',
  LESS_THAN_3_MONTHS = 'less_than_3_months',
  LESS_THAN_6_MONTHS = 'less_than_6_months',
  MORE_THAN_6_MONTHS = 'more_than_6_months',
  ONGOING = 'ongoing',
  FLEXIBLE = 'flexible'
}

export enum RequestBudget {
  LESS_THAN_500 = 'less_than_500',
  LESS_THAN_1000 = 'less_than_1000',
  LESS_THAN_2500 = 'less_than_2500',
  LESS_THAN_5000 = 'less_than_5000',
  LESS_THAN_10000 = 'less_than_10000',
  MORE_THAN_10000 = 'more_than_10000',
  HOURLY = 'hourly',
  FLEXIBLE = 'flexible'
}

export enum RequestExperience {
  ENTRY_LEVEL = 'entry_level',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
  ANY = 'any'
}

export enum RequestLocation {
  REMOTE = 'remote',
  ONSITE = 'onsite',
  HYBRID = 'hybrid',
  ANY = 'any'
}

export enum RequestLanguage {
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

export enum RequestCurrency {
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

export enum RequestPaymentMethod {
  FIXED_PRICE = 'fixed_price',
  HOURLY = 'hourly',
  MILESTONE = 'milestone',
  RETAINER = 'retainer',
  EQUITY = 'equity',
  BARTER = 'barter',
  OTHER = 'other'
}

export enum RequestWorkType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
  VOLUNTEER = 'volunteer',
  ANY = 'any'
}

export enum RequestAvailability {
  IMMEDIATE = 'immediate',
  WITHIN_1_WEEK = 'within_1_week',
  WITHIN_2_WEEKS = 'within_2_weeks',
  WITHIN_1_MONTH = 'within_1_month',
  FLEXIBLE = 'flexible'
}

export enum RequestCommunication {
  EMAIL = 'email',
  PHONE = 'phone',
  VIDEO_CALL = 'video_call',
  CHAT = 'chat',
  IN_PERSON = 'in_person',
  ANY = 'any'
}

export enum RequestFileType {
  IMAGE = 'image',
  DOCUMENT = 'document',
  VIDEO = 'video',
  AUDIO = 'audio',
  ARCHIVE = 'archive',
  CODE = 'code',
  OTHER = 'other'
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
  DEADLINE = 'deadline',
  COMPLEXITY = 'complexity'
}

export enum RequestFilterType {
  STATUS = 'status',
  CATEGORY = 'category',
  BUDGET = 'budget',
  TIMELINE = 'timeline',
  LOCATION = 'location',
  EXPERIENCE = 'experience',
  LANGUAGE = 'language',
  PAYMENT_METHOD = 'payment_method',
  WORK_TYPE = 'work_type',
  AVAILABILITY = 'availability',
  COMMUNICATION = 'communication',
  TAGS = 'tags'
}

export enum RequestAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  ASSIGN = 'assign',
  UNASSIGN = 'unassign',
  START = 'start',
  PAUSE = 'pause',
  RESUME = 'resume',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
  ARCHIVE = 'archive',
  RESTORE = 'restore',
  APPROVE = 'approve',
  REJECT = 'reject',
  ESCALATE = 'escalate',
  CLOSE = 'close'
}

export enum RequestNotificationType {
  CREATED = 'created',
  UPDATED = 'updated',
  ASSIGNED = 'assigned',
  STARTED = 'started',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ESCALATED = 'escalated',
  CLOSED = 'closed'
}
