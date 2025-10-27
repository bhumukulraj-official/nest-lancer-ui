/**
 * User-related TypeScript type definitions
 * These types represent the data structures for user management
 */

import type { PortfolioProject, PortfolioTestimonial } from './portfolio.types'

// Enums
export enum UserRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  USER = 'user',
  CLIENT = 'client',
  FREELANCER = 'freelancer',
  MODERATOR = 'moderator',
  SUPPORT = 'support'
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  bio?: string
  avatar?: string
  website?: string
  location?: string
  linkedin?: string
  github?: string
  twitter?: string
  timezone?: string
  yearsOfExperience?: number
  hourlyRate?: number
  availability?: string
  skills?: string[]
  languages?: string[]
  tagline?: string
  role: UserRole | string
  isActive: boolean
  isVerified: boolean
  isEmailVerified: boolean
  isPhoneVerified: boolean
  lastLoginAt?: string
  lastActiveAt?: string
  preferences: UserPreferences
  settings: UserSettings
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface UserProfile {
  id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  bio?: string
  avatar?: string
  website?: string
  location?: string
  timezone?: string
  socialLinks: SocialLinks
  skills: UserSkill[]
  experience: UserExperience[]
  education: UserEducation[]
  certifications: UserCertification[]
  languages: UserLanguage[]
  availability: UserAvailability
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  currency: string
  timezone: string
  notifications: NotificationPreferences
  privacy: PrivacyPreferences
  display: DisplayPreferences
}

export interface UserSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  twoFactorEnabled: boolean
  loginAlerts: boolean
  sessionTimeout: number
  autoLogout: boolean
}

export interface NotificationPreferences {
  email: {
    projectUpdates: boolean
    paymentNotifications: boolean
    messageNotifications: boolean
    systemNotifications: boolean
    marketingEmails: boolean
  }
  push: {
    projectUpdates: boolean
    paymentNotifications: boolean
    messageNotifications: boolean
    systemNotifications: boolean
  }
  sms: {
    paymentNotifications: boolean
    securityAlerts: boolean
  }
}

export interface PrivacyPreferences {
  profileVisibility: 'public' | 'private' | 'contacts'
  showEmail: boolean
  showPhone: boolean
  showLocation: boolean
  showLastActive: boolean
  allowDirectMessages: boolean
  showOnlineStatus: boolean
}

export interface DisplayPreferences {
  itemsPerPage: number
  defaultSort: string
  dateFormat: string
  timeFormat: '12h' | '24h'
  compactMode: boolean
  showAvatars: boolean
  showTimestamps: boolean
}

export interface SocialLinks {
  linkedin?: string
  github?: string
  twitter?: string
  facebook?: string
  instagram?: string
  website?: string
  portfolio?: string
}

export interface UserSkill {
  id: string
  name: string
  category: SkillCategory
  level: SkillLevel
  yearsOfExperience: number
  description?: string
  icon?: string
  color?: string
  isVerified: boolean
  verifiedAt?: string
  createdAt: string
  updatedAt: string
}

export interface UserExperience {
  id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  location?: string
  companyLogo?: string
  companyWebsite?: string
  technologies: string[]
  achievements: string[]
  isVerified: boolean
  verifiedAt?: string
  createdAt: string
  updatedAt: string
}

export interface UserEducation {
  id: string
  institution: string
  degree: string
  field: string
  description?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  location?: string
  institutionLogo?: string
  gpa?: number
  achievements: string[]
  isVerified: boolean
  verifiedAt?: string
  createdAt: string
  updatedAt: string
}

export interface UserCertification {
  id: string
  name: string
  issuer: string
  description?: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  verificationUrl?: string
  isVerified: boolean
  verifiedAt?: string
  createdAt: string
  updatedAt: string
}

export interface UserLanguage {
  id: string
  language: string
  proficiency: LanguageProficiency
  isNative: boolean
  certifications?: string[]
  createdAt: string
  updatedAt: string
}

export interface UserAvailability {
  status: AvailabilityStatus
  hoursPerWeek?: number
  timezone: string
  workingHours: WorkingHours[]
  unavailableDates: UnavailableDate[]
  noticePeriod: number
  createdAt: string
  updatedAt: string
}

export interface WorkingHours {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface UnavailableDate {
  startDate: string
  endDate: string
  reason?: string
  isRecurring: boolean
}

export interface UserStats {
  totalProjects: number
  completedProjects: number
  activeProjects: number
  totalEarnings: number
  averageRating: number
  totalReviews: number
  responseRate: number
  averageResponseTime: number
  profileViews: number
  lastActiveAt: string
}

export interface UserActivity {
  id: string
  userId: string
  type: ActivityType
  description: string
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  location?: {
    country: string
    city: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  createdAt: string
}

export interface UserSession {
  id: string
  userId: string
  token: string
  refreshToken: string
  expiresAt: string
  refreshExpiresAt: string
  ipAddress: string
  userAgent: string
  location?: {
    country: string
    city: string
  }
  isActive: boolean
  lastUsedAt: string
  createdAt: string
}

export interface UserInvitation {
  id: string
  email: string
  role: UserRole
  invitedBy: string
  invitedByName: string
  token: string
  expiresAt: string
  status: InvitationStatus
  acceptedAt?: string
  acceptedBy?: string
  createdAt: string
  updatedAt: string
}

export interface UserFilters {
  role?: UserRole[]
  isActive?: boolean
  isVerified?: boolean
  isEmailVerified?: boolean
  location?: string[]
  skills?: string[]
  availability?: AvailabilityStatus[]
  dateFrom?: string
  dateTo?: string
  search?: string
  sortBy?: UserSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface UserCreateData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  role?: UserRole
  bio?: string
  website?: string
  location?: string
  timezone?: string
  preferences?: Partial<UserPreferences>
  settings?: Partial<UserSettings>
}

export interface UserUpdateData {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  bio?: string
  avatar?: string
  website?: string
  location?: string
  timezone?: string
  preferences?: Partial<UserPreferences>
  settings?: Partial<UserSettings>
}

export interface UserSearchResult {
  data: User[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Enums

export enum SkillCategory {
  PROGRAMMING_LANGUAGES = 'programming_languages',
  FRAMEWORKS = 'frameworks',
  DATABASES = 'databases',
  TOOLS = 'tools',
  DESIGN = 'design',
  SOFT_SKILLS = 'soft_skills',
  LANGUAGES = 'languages',
  OTHER = 'other'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum LanguageProficiency {
  BASIC = 'basic',
  CONVERSATIONAL = 'conversational',
  PROFESSIONAL = 'professional',
  NATIVE = 'native'
}

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  UNAVAILABLE = 'unavailable',
  AWAY = 'away'
}

export enum ActivityType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  PROFILE_UPDATE = 'profile_update',
  PASSWORD_CHANGE = 'password_change',
  EMAIL_VERIFICATION = 'email_verification',
  PROJECT_CREATE = 'project_create',
  PROJECT_UPDATE = 'project_update',
  PAYMENT_RECEIVED = 'payment_received',
  MESSAGE_SENT = 'message_sent',
  SETTINGS_UPDATE = 'settings_update'
}

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export enum UserSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  LAST_LOGIN = 'lastLoginAt',
  ROLE = 'role',
  STATUS = 'isActive'
}

// Profile-related types
export interface ProfileStats {
  totalProjects: number
  completedProjects: number
  activeProjects: number
  totalEarnings: number
  averageRating: number
  totalReviews: number
  profileViews: number
  profileCompletion: number
}

export interface ProfileSettings {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    contactInfoVisible: boolean
    portfolioVisible: boolean
  }
  preferences: {
    language: string
    timezone: string
    currency: string
  }
}

export interface UserTestimonial {
  id: string
  authorId: string
  authorName: string
  authorAvatar?: string
  content: string
  rating: number
  projectId?: string
  projectTitle?: string
  createdAt: string
  updatedAt: string
}

export interface ProfileVisibility {
  profile: 'public' | 'private' | 'connections'
  contactInfo: 'public' | 'private' | 'connections'
  portfolio: 'public' | 'private' | 'connections'
  skills: 'public' | 'private' | 'connections'
  experience: 'public' | 'private' | 'connections'
}

export interface ProfileSocialLinks {
  linkedin?: string
  github?: string
  twitter?: string
  website?: string
  portfolio?: string
}

export interface ProfileSkills {
  skills: UserSkill[]
  endorsements: Record<string, string[]> // skillId -> userIds who endorsed
}

export interface ProfileExperience {
  experiences: UserExperience[]
  totalYears: number
}

export interface ProfileEducation {
  education: UserEducation[]
  highestDegree?: string
}

export interface ProfileCertification {
  certifications: UserCertification[]
  verifiedCount: number
}

export interface ProfilePortfolio {
  projects: PortfolioProject[]
  featured: string[] // project IDs
}

export interface ProfileTestimonial {
  testimonials: PortfolioTestimonial[]
  averageRating: number
}

export interface ProfileUpdateData {
  firstName?: string
  lastName?: string
  bio?: string
  avatar?: string
  website?: string
  location?: string
  timezone?: string
  socialLinks?: SocialLinks
  skills?: UserSkill[]
  experience?: UserExperience[]
  education?: UserEducation[]
  certifications?: UserCertification[]
  portfolio?: PortfolioProject[]
  testimonials?: UserTestimonial[]
}

export interface UserNotificationSettings {
  email: {
    projectUpdates: boolean
    messageNotifications: boolean
    paymentNotifications: boolean
    marketingEmails: boolean
  }
  push: {
    projectUpdates: boolean
    messageNotifications: boolean
    paymentNotifications: boolean
  }
  sms: {
    urgentNotifications: boolean
    paymentNotifications: boolean
  }
}

export interface UserSecuritySettings {
  twoFactorEnabled: boolean
  sessionTimeout: number
  loginAlerts: boolean
  passwordLastChanged: string
  trustedDevices: DeviceInfo[]
}

export interface UserPrivacySettings {
  profileVisibility: 'public' | 'private' | 'connections'
  showOnlineStatus: boolean
  allowMessaging: 'everyone' | 'connections' | 'none'
  dataSharing: boolean
}

export interface DeviceInfo {
  id: string
  name: string
  type: string
  lastUsed: string
  ipAddress: string
  location?: string
}
