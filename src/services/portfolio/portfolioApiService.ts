/**
 * Portfolio API Service
 * Handles all portfolio-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { PORTFOLIO_ENDPOINTS } from '../api/endpoints'
import type {
  Portfolio,
  PortfolioProject,
  PortfolioSkill,
  PortfolioExperience,
  PortfolioEducation,
  PortfolioTestimonial,
  PortfolioAchievement,
  PortfolioStats,
  PortfolioUpdateData,
  PortfolioProjectCreateData,
  PortfolioSkillCreateData,
  PortfolioExperienceCreateData,
  PortfolioEducationCreateData,
  PortfolioTestimonialCreateData,
  PortfolioAchievementCreateData,
  PortfolioAnalytics,
  PortfolioTheme,
  PortfolioSettings
} from '../../types/models/portfolio.types'

export class PortfolioApiService {
  /**
   * Get portfolio overview
   */
  static async getPortfolioOverview(): Promise<Portfolio> {
    try {
      const response = await apiClient.get(PORTFOLIO_ENDPOINTS.OVERVIEW)
      return response.data
    } catch (error) {
      console.error('Error fetching portfolio overview:', error)
      throw error
    }
  }

  /**
   * Get featured projects
   */
  static async getFeaturedProjects(): Promise<PortfolioProject[]> {
    try {
      const response = await apiClient.get(PORTFOLIO_ENDPOINTS.FEATURED_PROJECTS)
      return response.data
    } catch (error) {
      console.error('Error fetching featured projects:', error)
      throw error
    }
  }

  /**
   * Get portfolio statistics
   */
  static async getPortfolioStats(): Promise<PortfolioStats> {
    try {
      const response = await apiClient.get(PORTFOLIO_ENDPOINTS.STATS)
      return response.data
    } catch (error) {
      console.error('Error fetching portfolio stats:', error)
      throw error
    }
  }

  /**
   * Get tech stack
   */
  static async getTechStack(): Promise<PortfolioSkill[]> {
    try {
      const response = await apiClient.get(PORTFOLIO_ENDPOINTS.TECH_STACK)
      return response.data
    } catch (error) {
      console.error('Error fetching tech stack:', error)
      throw error
    }
  }

  /**
   * Get testimonials
   */
  static async getTestimonials(): Promise<PortfolioTestimonial[]> {
    try {
      const response = await apiClient.get(PORTFOLIO_ENDPOINTS.TESTIMONIALS)
      return response.data
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      throw error
    }
  }

  /**
   * Get achievements
   */
  static async getAchievements(): Promise<PortfolioAchievement[]> {
    try {
      const response = await apiClient.get(PORTFOLIO_ENDPOINTS.ACHIEVEMENTS)
      return response.data
    } catch (error) {
      console.error('Error fetching achievements:', error)
      throw error
    }
  }

  /**
   * Update portfolio
   */
  static async updatePortfolio(data: PortfolioUpdateData): Promise<Portfolio> {
    try {
      const response = await apiClient.put(PORTFOLIO_ENDPOINTS.OVERVIEW, data)
      return response.data
    } catch (error) {
      console.error('Error updating portfolio:', error)
      throw error
    }
  }

  /**
   * Add project to portfolio
   */
  static async addProject(data: PortfolioProjectCreateData): Promise<PortfolioProject> {
    try {
      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/projects`, data)
      return response.data
    } catch (error) {
      console.error('Error adding project to portfolio:', error)
      throw error
    }
  }

  /**
   * Update portfolio project
   */
  static async updateProject(projectId: string, data: Partial<PortfolioProjectCreateData>): Promise<PortfolioProject> {
    try {
      const response = await apiClient.put(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/projects/${projectId}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating portfolio project ${projectId}:`, error)
      throw error
    }
  }

  /**
   * Remove project from portfolio
   */
  static async removeProject(projectId: string): Promise<void> {
    try {
      await apiClient.delete(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/projects/${projectId}`)
    } catch (error) {
      console.error(`Error removing project ${projectId} from portfolio:`, error)
      throw error
    }
  }

  /**
   * Add skill to portfolio
   */
  static async addSkill(data: PortfolioSkillCreateData): Promise<PortfolioSkill> {
    try {
      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/skills`, data)
      return response.data
    } catch (error) {
      console.error('Error adding skill to portfolio:', error)
      throw error
    }
  }

  /**
   * Update portfolio skill
   */
  static async updateSkill(skillId: string, data: Partial<PortfolioSkillCreateData>): Promise<PortfolioSkill> {
    try {
      const response = await apiClient.put(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/skills/${skillId}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating portfolio skill ${skillId}:`, error)
      throw error
    }
  }

  /**
   * Remove skill from portfolio
   */
  static async removeSkill(skillId: string): Promise<void> {
    try {
      await apiClient.delete(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/skills/${skillId}`)
    } catch (error) {
      console.error(`Error removing skill ${skillId} from portfolio:`, error)
      throw error
    }
  }

  /**
   * Add experience to portfolio
   */
  static async addExperience(data: PortfolioExperienceCreateData): Promise<PortfolioExperience> {
    try {
      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/experience`, data)
      return response.data
    } catch (error) {
      console.error('Error adding experience to portfolio:', error)
      throw error
    }
  }

  /**
   * Update portfolio experience
   */
  static async updateExperience(experienceId: string, data: Partial<PortfolioExperienceCreateData>): Promise<PortfolioExperience> {
    try {
      const response = await apiClient.put(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/experience/${experienceId}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating portfolio experience ${experienceId}:`, error)
      throw error
    }
  }

  /**
   * Remove experience from portfolio
   */
  static async removeExperience(experienceId: string): Promise<void> {
    try {
      await apiClient.delete(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/experience/${experienceId}`)
    } catch (error) {
      console.error(`Error removing experience ${experienceId} from portfolio:`, error)
      throw error
    }
  }

  /**
   * Add education to portfolio
   */
  static async addEducation(data: PortfolioEducationCreateData): Promise<PortfolioEducation> {
    try {
      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/education`, data)
      return response.data
    } catch (error) {
      console.error('Error adding education to portfolio:', error)
      throw error
    }
  }

  /**
   * Update portfolio education
   */
  static async updateEducation(educationId: string, data: Partial<PortfolioEducationCreateData>): Promise<PortfolioEducation> {
    try {
      const response = await apiClient.put(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/education/${educationId}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating portfolio education ${educationId}:`, error)
      throw error
    }
  }

  /**
   * Remove education from portfolio
   */
  static async removeEducation(educationId: string): Promise<void> {
    try {
      await apiClient.delete(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/education/${educationId}`)
    } catch (error) {
      console.error(`Error removing education ${educationId} from portfolio:`, error)
      throw error
    }
  }

  /**
   * Add testimonial to portfolio
   */
  static async addTestimonial(data: PortfolioTestimonialCreateData): Promise<PortfolioTestimonial> {
    try {
      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/testimonials`, data)
      return response.data
    } catch (error) {
      console.error('Error adding testimonial to portfolio:', error)
      throw error
    }
  }

  /**
   * Update portfolio testimonial
   */
  static async updateTestimonial(testimonialId: string, data: Partial<PortfolioTestimonialCreateData>): Promise<PortfolioTestimonial> {
    try {
      const response = await apiClient.put(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/testimonials/${testimonialId}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating portfolio testimonial ${testimonialId}:`, error)
      throw error
    }
  }

  /**
   * Remove testimonial from portfolio
   */
  static async removeTestimonial(testimonialId: string): Promise<void> {
    try {
      await apiClient.delete(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/testimonials/${testimonialId}`)
    } catch (error) {
      console.error(`Error removing testimonial ${testimonialId} from portfolio:`, error)
      throw error
    }
  }

  /**
   * Add achievement to portfolio
   */
  static async addAchievement(data: PortfolioAchievementCreateData): Promise<PortfolioAchievement> {
    try {
      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/achievements`, data)
      return response.data
    } catch (error) {
      console.error('Error adding achievement to portfolio:', error)
      throw error
    }
  }

  /**
   * Update portfolio achievement
   */
  static async updateAchievement(achievementId: string, data: Partial<PortfolioAchievementCreateData>): Promise<PortfolioAchievement> {
    try {
      const response = await apiClient.put(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/achievements/${achievementId}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating portfolio achievement ${achievementId}:`, error)
      throw error
    }
  }

  /**
   * Remove achievement from portfolio
   */
  static async removeAchievement(achievementId: string): Promise<void> {
    try {
      await apiClient.delete(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/achievements/${achievementId}`)
    } catch (error) {
      console.error(`Error removing achievement ${achievementId} from portfolio:`, error)
      throw error
    }
  }

  /**
   * Get portfolio analytics
   */
  static async getPortfolioAnalytics(): Promise<PortfolioAnalytics> {
    try {
      const response = await apiClient.get(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/analytics`)
      return response.data
    } catch (error) {
      console.error('Error fetching portfolio analytics:', error)
      throw error
    }
  }

  /**
   * Get portfolio themes
   */
  static async getPortfolioThemes(): Promise<PortfolioTheme[]> {
    try {
      const response = await apiClient.get(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/themes`)
      return response.data
    } catch (error) {
      console.error('Error fetching portfolio themes:', error)
      throw error
    }
  }

  /**
   * Get portfolio settings
   */
  static async getPortfolioSettings(): Promise<PortfolioSettings> {
    try {
      const response = await apiClient.get(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/settings`)
      return response.data
    } catch (error) {
      console.error('Error fetching portfolio settings:', error)
      throw error
    }
  }

  /**
   * Update portfolio settings
   */
  static async updatePortfolioSettings(data: Partial<PortfolioSettings>): Promise<PortfolioSettings> {
    try {
      const response = await apiClient.put(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/settings`, data)
      return response.data
    } catch (error) {
      console.error('Error updating portfolio settings:', error)
      throw error
    }
  }

  /**
   * Upload portfolio avatar
   */
  static async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading portfolio avatar:', error)
      throw error
    }
  }

  /**
   * Upload portfolio cover image
   */
  static async uploadCoverImage(file: File): Promise<{ coverImageUrl: string }> {
    try {
      const formData = new FormData()
      formData.append('coverImage', file)

      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/cover-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading portfolio cover image:', error)
      throw error
    }
  }

  /**
   * Reorder portfolio items
   */
  static async reorderItems(type: 'projects' | 'skills' | 'experience' | 'education' | 'testimonials' | 'achievements', items: { id: string; order: number }[]): Promise<void> {
    try {
      await apiClient.put(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/reorder/${type}`, { items })
    } catch (error) {
      console.error(`Error reordering portfolio ${type}:`, error)
      throw error
    }
  }

  /**
   * Toggle project featured status
   */
  static async toggleProjectFeatured(projectId: string): Promise<PortfolioProject> {
    try {
      const response = await apiClient.patch(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/projects/${projectId}/featured`)
      return response.data
    } catch (error) {
      console.error(`Error toggling project ${projectId} featured status:`, error)
      throw error
    }
  }

  /**
   * Publish portfolio
   */
  static async publishPortfolio(): Promise<Portfolio> {
    try {
      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/publish`)
      return response.data
    } catch (error) {
      console.error('Error publishing portfolio:', error)
      throw error
    }
  }

  /**
   * Unpublish portfolio
   */
  static async unpublishPortfolio(): Promise<Portfolio> {
    try {
      const response = await apiClient.post(`${PORTFOLIO_ENDPOINTS.OVERVIEW}/unpublish`)
      return response.data
    } catch (error) {
      console.error('Error unpublishing portfolio:', error)
      throw error
    }
  }
}

export default PortfolioApiService
