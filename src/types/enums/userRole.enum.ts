/**
 * User Role Enums
 * TypeScript enumeration for user roles and permissions
 */

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  CLIENT = 'client',
  FREELANCER = 'freelancer',
  MODERATOR = 'moderator',
  SUPPORT = 'support',
  GUEST = 'guest'
}

export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SUPPORT = 'support',
  ANALYST = 'analyst',
  MANAGER = 'manager'
}

export enum Permission {
  // User Management
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_MANAGE_ROLES = 'user:manage_roles',
  
  // Project Management
  PROJECT_CREATE = 'project:create',
  PROJECT_READ = 'project:read',
  PROJECT_UPDATE = 'project:update',
  PROJECT_DELETE = 'project:delete',
  PROJECT_MANAGE = 'project:manage',
  
  // Request Management
  REQUEST_CREATE = 'request:create',
  REQUEST_READ = 'request:read',
  REQUEST_UPDATE = 'request:update',
  REQUEST_DELETE = 'request:delete',
  REQUEST_MANAGE = 'request:manage',
  
  // Quote Management
  QUOTE_CREATE = 'quote:create',
  QUOTE_READ = 'quote:read',
  QUOTE_UPDATE = 'quote:update',
  QUOTE_DELETE = 'quote:delete',
  QUOTE_MANAGE = 'quote:manage',
  
  // Payment Management
  PAYMENT_CREATE = 'payment:create',
  PAYMENT_READ = 'payment:read',
  PAYMENT_UPDATE = 'payment:update',
  PAYMENT_DELETE = 'payment:delete',
  PAYMENT_MANAGE = 'payment:manage',
  PAYMENT_REFUND = 'payment:refund',
  
  // Media Management
  MEDIA_UPLOAD = 'media:upload',
  MEDIA_READ = 'media:read',
  MEDIA_UPDATE = 'media:update',
  MEDIA_DELETE = 'media:delete',
  MEDIA_MANAGE = 'media:manage',
  
  // Messaging
  MESSAGE_SEND = 'message:send',
  MESSAGE_READ = 'message:read',
  MESSAGE_MANAGE = 'message:manage',
  
  // Notifications
  NOTIFICATION_SEND = 'notification:send',
  NOTIFICATION_READ = 'notification:read',
  NOTIFICATION_MANAGE = 'notification:manage',
  
  // Blog Management
  BLOG_CREATE = 'blog:create',
  BLOG_READ = 'blog:read',
  BLOG_UPDATE = 'blog:update',
  BLOG_DELETE = 'blog:delete',
  BLOG_MANAGE = 'blog:manage',
  BLOG_PUBLISH = 'blog:publish',
  
  // Contact Management
  CONTACT_READ = 'contact:read',
  CONTACT_UPDATE = 'contact:update',
  CONTACT_DELETE = 'contact:delete',
  CONTACT_MANAGE = 'contact:manage',
  
  // Portfolio Management
  PORTFOLIO_CREATE = 'portfolio:create',
  PORTFOLIO_READ = 'portfolio:read',
  PORTFOLIO_UPDATE = 'portfolio:update',
  PORTFOLIO_DELETE = 'portfolio:delete',
  PORTFOLIO_MANAGE = 'portfolio:manage',
  
  // Progress Management
  PROGRESS_CREATE = 'progress:create',
  PROGRESS_READ = 'progress:read',
  PROGRESS_UPDATE = 'progress:update',
  PROGRESS_DELETE = 'progress:delete',
  PROGRESS_MANAGE = 'progress:manage',
  
  // Admin Functions
  ADMIN_DASHBOARD = 'admin:dashboard',
  ADMIN_ANALYTICS = 'admin:analytics',
  ADMIN_SYSTEM = 'admin:system',
  ADMIN_AUDIT = 'admin:audit',
  ADMIN_WEBHOOKS = 'admin:webhooks',
  ADMIN_STORAGE = 'admin:storage',
  ADMIN_CONFIG = 'admin:config'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified'
}

export enum UserVerificationStatus {
  EMAIL_VERIFIED = 'email_verified',
  PHONE_VERIFIED = 'phone_verified',
  ID_VERIFIED = 'id_verified',
  BANK_VERIFIED = 'bank_verified',
  ADDRESS_VERIFIED = 'address_verified'
}

export enum UserActivityType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  PROFILE_UPDATE = 'profile_update',
  PASSWORD_CHANGE = 'password_change',
  EMAIL_VERIFICATION = 'email_verification',
  PROJECT_CREATE = 'project_create',
  PROJECT_UPDATE = 'project_update',
  PAYMENT_RECEIVED = 'payment_received',
  MESSAGE_SENT = 'message_sent',
  SETTINGS_UPDATE = 'settings_update',
  ACCOUNT_SUSPENDED = 'account_suspended',
  ACCOUNT_REACTIVATED = 'account_reactivated'
}

export enum UserPreferenceType {
  THEME = 'theme',
  LANGUAGE = 'language',
  CURRENCY = 'currency',
  TIMEZONE = 'timezone',
  NOTIFICATIONS = 'notifications',
  PRIVACY = 'privacy',
  DISPLAY = 'display'
}

export enum UserSessionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
  SUSPENDED = 'suspended'
}

export enum UserInvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export enum UserSkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum UserSkillCategory {
  PROGRAMMING_LANGUAGES = 'programming_languages',
  FRAMEWORKS = 'frameworks',
  DATABASES = 'databases',
  TOOLS = 'tools',
  DESIGN = 'design',
  SOFT_SKILLS = 'soft_skills',
  LANGUAGES = 'languages',
  OTHER = 'other'
}

export enum UserAvailabilityStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  UNAVAILABLE = 'unavailable',
  AWAY = 'away'
}

export enum UserLanguageProficiency {
  BASIC = 'basic',
  CONVERSATIONAL = 'conversational',
  PROFESSIONAL = 'professional',
  NATIVE = 'native'
}

export enum UserExperienceType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
  VOLUNTEER = 'volunteer'
}

export enum UserEducationType {
  BACHELOR = 'bachelor',
  MASTER = 'master',
  DOCTORATE = 'doctorate',
  ASSOCIATE = 'associate',
  CERTIFICATE = 'certificate',
  DIPLOMA = 'diploma',
  HIGH_SCHOOL = 'high_school',
  OTHER = 'other'
}

export enum UserCertificationType {
  PROFESSIONAL = 'professional',
  TECHNICAL = 'technical',
  INDUSTRY = 'industry',
  VENDOR = 'vendor',
  ACADEMIC = 'academic',
  OTHER = 'other'
}

export enum UserAchievementType {
  CERTIFICATION = 'certification',
  AWARD = 'award',
  RECOGNITION = 'recognition',
  PUBLICATION = 'publication',
  SPEAKING = 'speaking',
  CONTRIBUTION = 'contribution',
  OTHER = 'other'
}

export enum UserSocialPlatform {
  LINKEDIN = 'linkedin',
  GITHUB = 'github',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
  WEBSITE = 'website',
  PORTFOLIO = 'portfolio',
  OTHER = 'other'
}

export enum UserNotificationChannel {
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
  IN_APP = 'in_app',
  WEBHOOK = 'webhook'
}

export enum UserNotificationFrequency {
  IMMEDIATE = 'immediate',
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  NEVER = 'never'
}

export enum UserPrivacyLevel {
  PUBLIC = 'public',
  PRIVATE = 'private',
  CONTACTS = 'contacts',
  FRIENDS = 'friends',
  CUSTOM = 'custom'
}

export enum UserDisplayMode {
  COMPACT = 'compact',
  COMFORTABLE = 'comfortable',
  SPACIOUS = 'spacious'
}

export enum UserDateFormat {
  MM_DD_YYYY = 'MM/DD/YYYY',
  DD_MM_YYYY = 'DD/MM/YYYY',
  YYYY_MM_DD = 'YYYY-MM-DD',
  MONTH_DD_YYYY = 'Month DD, YYYY',
  DD_MONTH_YYYY = 'DD Month YYYY'
}

export enum UserTimeFormat {
  HOUR_12 = '12h',
  HOUR_24 = '24h'
}

export enum UserTheme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
  CUSTOM = 'custom'
}

export enum UserLanguage {
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  DE = 'de',
  IT = 'it',
  PT = 'pt',
  RU = 'ru',
  ZH = 'zh',
  JA = 'ja',
  KO = 'ko',
  AR = 'ar',
  HI = 'hi'
}

export enum UserCurrency {
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

export enum UserTimezone {
  UTC = 'UTC',
  EST = 'America/New_York',
  PST = 'America/Los_Angeles',
  GMT = 'Europe/London',
  CET = 'Europe/Paris',
  JST = 'Asia/Tokyo',
  IST = 'Asia/Kolkata',
  CST = 'Asia/Shanghai',
  AEST = 'Australia/Sydney',
  BRST = 'America/Sao_Paulo',
  MSK = 'Europe/Moscow',
  KST = 'Asia/Seoul'
}
