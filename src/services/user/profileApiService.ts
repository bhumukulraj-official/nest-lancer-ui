/**
 * Profile API Service
 * Handles all profile-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { USER_ENDPOINTS } from '../api/endpoints'
import type {
  UserProfile,
  ProfileUpdateData,
  ProfileStats,
  ProfileVisibility,
  ProfileSocialLinks,
  ProfileSkills,
  ProfileExperience,
  ProfileEducation,
  ProfileCertification,
  ProfilePortfolio,
  ProfileTestimonial
} from '../../types/models/user.types'

export class ProfileApiService {
  /**
   * Get user profile by user ID
   */
  static async getProfile(userId: string): Promise<UserProfile> {
    try {
      const response = await apiClient.get(`${USER_ENDPOINTS.BASE}/${userId}/profile`)
      return response.data
    } catch (error) {
      console.error('Error fetching profile:', error)
      throw error
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.PROFILE)
      return response.data
    } catch (error) {
      console.error('Error fetching current profile:', error)
      throw error
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: string, profileData: ProfileUpdateData): Promise<UserProfile> {
    try {
      const response = await apiClient.put(`${USER_ENDPOINTS.BASE}/${userId}/profile`, profileData)
      return response.data
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  /**
   * Update current user profile
   */
  static async updateCurrentProfile(profileData: ProfileUpdateData): Promise<UserProfile> {
    try {
      const response = await apiClient.put(USER_ENDPOINTS.PROFILE, profileData)
      return response.data
    } catch (error) {
      console.error('Error updating current profile:', error)
      throw error
    }
  }

  /**
   * Get profile statistics
   */
  static async getProfileStats(userId: string): Promise<ProfileStats> {
    try {
      const response = await apiClient.get(`${USER_ENDPOINTS.BASE}/${userId}/profile/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching profile stats:', error)
      throw error
    }
  }

  /**
   * Update profile visibility settings
   */
  static async updateProfileVisibility(visibility: ProfileVisibility): Promise<UserProfile> {
    try {
      const response = await apiClient.patch(USER_ENDPOINTS.PROFILE_VISIBILITY, visibility)
      return response.data
    } catch (error) {
      console.error('Error updating profile visibility:', error)
      throw error
    }
  }

  /**
   * Update profile social links
   */
  static async updateSocialLinks(socialLinks: ProfileSocialLinks): Promise<UserProfile> {
    try {
      const response = await apiClient.patch(USER_ENDPOINTS.SOCIAL_LINKS, socialLinks)
      return response.data
    } catch (error) {
      console.error('Error updating social links:', error)
      throw error
    }
  }

  /**
   * Add profile skill
   */
  static async addSkill(skill: ProfileSkills): Promise<UserProfile> {
    try {
      const response = await apiClient.post(USER_ENDPOINTS.SKILLS, skill)
      return response.data
    } catch (error) {
      console.error('Error adding skill:', error)
      throw error
    }
  }

  /**
   * Update profile skill
   */
  static async updateSkill(skillId: string, skill: Partial<ProfileSkills>): Promise<UserProfile> {
    try {
      const response = await apiClient.put(`${USER_ENDPOINTS.SKILLS}/${skillId}`, skill)
      return response.data
    } catch (error) {
      console.error('Error updating skill:', error)
      throw error
    }
  }

  /**
   * Remove profile skill
   */
  static async removeSkill(skillId: string): Promise<UserProfile> {
    try {
      const response = await apiClient.delete(`${USER_ENDPOINTS.SKILLS}/${skillId}`)
      return response.data
    } catch (error) {
      console.error('Error removing skill:', error)
      throw error
    }
  }

  /**
   * Add profile experience
   */
  static async addExperience(experience: ProfileExperience): Promise<UserProfile> {
    try {
      const response = await apiClient.post(USER_ENDPOINTS.EXPERIENCE, experience)
      return response.data
    } catch (error) {
      console.error('Error adding experience:', error)
      throw error
    }
  }

  /**
   * Update profile experience
   */
  static async updateExperience(experienceId: string, experience: Partial<ProfileExperience>): Promise<UserProfile> {
    try {
      const response = await apiClient.put(`${USER_ENDPOINTS.EXPERIENCE}/${experienceId}`, experience)
      return response.data
    } catch (error) {
      console.error('Error updating experience:', error)
      throw error
    }
  }

  /**
   * Remove profile experience
   */
  static async removeExperience(experienceId: string): Promise<UserProfile> {
    try {
      const response = await apiClient.delete(`${USER_ENDPOINTS.EXPERIENCE}/${experienceId}`)
      return response.data
    } catch (error) {
      console.error('Error removing experience:', error)
      throw error
    }
  }

  /**
   * Add profile education
   */
  static async addEducation(education: ProfileEducation): Promise<UserProfile> {
    try {
      const response = await apiClient.post(USER_ENDPOINTS.EDUCATION, education)
      return response.data
    } catch (error) {
      console.error('Error adding education:', error)
      throw error
    }
  }

  /**
   * Update profile education
   */
  static async updateEducation(educationId: string, education: Partial<ProfileEducation>): Promise<UserProfile> {
    try {
      const response = await apiClient.put(`${USER_ENDPOINTS.EDUCATION}/${educationId}`, education)
      return response.data
    } catch (error) {
      console.error('Error updating education:', error)
      throw error
    }
  }

  /**
   * Remove profile education
   */
  static async removeEducation(educationId: string): Promise<UserProfile> {
    try {
      const response = await apiClient.delete(`${USER_ENDPOINTS.EDUCATION}/${educationId}`)
      return response.data
    } catch (error) {
      console.error('Error removing education:', error)
      throw error
    }
  }

  /**
   * Add profile certification
   */
  static async addCertification(certification: ProfileCertification): Promise<UserProfile> {
    try {
      const response = await apiClient.post(USER_ENDPOINTS.CERTIFICATIONS, certification)
      return response.data
    } catch (error) {
      console.error('Error adding certification:', error)
      throw error
    }
  }

  /**
   * Update profile certification
   */
  static async updateCertification(certificationId: string, certification: Partial<ProfileCertification>): Promise<UserProfile> {
    try {
      const response = await apiClient.put(`${USER_ENDPOINTS.CERTIFICATIONS}/${certificationId}`, certification)
      return response.data
    } catch (error) {
      console.error('Error updating certification:', error)
      throw error
    }
  }

  /**
   * Remove profile certification
   */
  static async removeCertification(certificationId: string): Promise<UserProfile> {
    try {
      const response = await apiClient.delete(`${USER_ENDPOINTS.CERTIFICATIONS}/${certificationId}`)
      return response.data
    } catch (error) {
      console.error('Error removing certification:', error)
      throw error
    }
  }

  /**
   * Add portfolio item
   */
  static async addPortfolioItem(portfolioItem: ProfilePortfolio): Promise<UserProfile> {
    try {
      const response = await apiClient.post(USER_ENDPOINTS.PORTFOLIO, portfolioItem)
      return response.data
    } catch (error) {
      console.error('Error adding portfolio item:', error)
      throw error
    }
  }

  /**
   * Update portfolio item
   */
  static async updatePortfolioItem(portfolioId: string, portfolioItem: Partial<ProfilePortfolio>): Promise<UserProfile> {
    try {
      const response = await apiClient.put(`${USER_ENDPOINTS.PORTFOLIO}/${portfolioId}`, portfolioItem)
      return response.data
    } catch (error) {
      console.error('Error updating portfolio item:', error)
      throw error
    }
  }

  /**
   * Remove portfolio item
   */
  static async removePortfolioItem(portfolioId: string): Promise<UserProfile> {
    try {
      const response = await apiClient.delete(`${USER_ENDPOINTS.PORTFOLIO}/${portfolioId}`)
      return response.data
    } catch (error) {
      console.error('Error removing portfolio item:', error)
      throw error
    }
  }

  /**
   * Add testimonial
   */
  static async addTestimonial(testimonial: ProfileTestimonial): Promise<UserProfile> {
    try {
      const response = await apiClient.post(USER_ENDPOINTS.TESTIMONIALS, testimonial)
      return response.data
    } catch (error) {
      console.error('Error adding testimonial:', error)
      throw error
    }
  }

  /**
   * Update testimonial
   */
  static async updateTestimonial(testimonialId: string, testimonial: Partial<ProfileTestimonial>): Promise<UserProfile> {
    try {
      const response = await apiClient.put(`${USER_ENDPOINTS.TESTIMONIALS}/${testimonialId}`, testimonial)
      return response.data
    } catch (error) {
      console.error('Error updating testimonial:', error)
      throw error
    }
  }

  /**
   * Remove testimonial
   */
  static async removeTestimonial(testimonialId: string): Promise<UserProfile> {
    try {
      const response = await apiClient.delete(`${USER_ENDPOINTS.TESTIMONIALS}/${testimonialId}`)
      return response.data
    } catch (error) {
      console.error('Error removing testimonial:', error)
      throw error
    }
  }

  /**
   * Upload profile avatar
   */
  static async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      
      const response = await apiClient.post(USER_ENDPOINTS.AVATAR_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading avatar:', error)
      throw error
    }
  }

  /**
   * Delete profile avatar
   */
  static async deleteAvatar(): Promise<UserProfile> {
    try {
      const response = await apiClient.delete(USER_ENDPOINTS.AVATAR_DELETE)
      return response.data
    } catch (error) {
      console.error('Error deleting avatar:', error)
      throw error
    }
  }

  /**
   * Get profile completion percentage
   */
  static async getProfileCompletion(): Promise<{ completionPercentage: number; missingFields: string[] }> {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.PROFILE_COMPLETION)
      return response.data
    } catch (error) {
      console.error('Error fetching profile completion:', error)
      throw error
    }
  }
}

export default ProfileApiService
