/**
 * User Services Index
 * Central export point for all user-related services
 */

export { UserApiService } from './userApiService'
export { ProfileApiService } from './profileApiService'

// Re-export types for convenience
export type {
  User,
  UserCreateData,
  UserUpdateData,
  UserFilters,
  UserSearchResult,
  UserStats,
  UserProfile,
  UserSettings,
  UserPreferences,
  UserActivity,
  UserNotificationSettings,
  UserSecuritySettings,
  UserPrivacySettings,
  ProfileUpdateData,
  ProfileStats,
  ProfileSettings,
  ProfileVisibility,
  ProfileSocialLinks,
  ProfileSkills,
  ProfileExperience,
  ProfileEducation,
  ProfileCertification,
  ProfilePortfolio,
  ProfileTestimonial
} from '../../types/models/user.types'
