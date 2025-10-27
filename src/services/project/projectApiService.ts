/**
 * Project API Service
 * Handles all project-related API calls
 * UI-only service - no business logic processing
 */

import type {
  Project,
  ProjectCreateData,
  ProjectUpdateData,
  ProjectFilters,
  ProjectSearchResult,
  ProjectStats,
  ProjectGallery,
  ProjectTechStack,
  ProjectCategory
} from '../../types/models/project.types'
import { apiClient } from '../api/client'
import { PROJECT_ENDPOINTS } from '../api/endpoints'

export class ProjectApiService {
  /**
   * Get all projects with optional filtering
   */
  static async getProjects(filters?: ProjectFilters): Promise<ProjectSearchResult> {
    try {
      const response = await apiClient.get(PROJECT_ENDPOINTS.LIST, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
  }

  /**
   * Get a single project by ID
   */
  static async getProject(id: string): Promise<Project> {
    try {
      const response = await apiClient.get(PROJECT_ENDPOINTS.DETAIL(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error)
      throw error
    }
  }

  /**
   * Create a new project
   */
  static async createProject(data: ProjectCreateData): Promise<Project> {
    try {
      const response = await apiClient.post(PROJECT_ENDPOINTS.CREATE, data)
      return response.data
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  }

  /**
   * Update an existing project
   */
  static async updateProject(id: string, data: ProjectUpdateData): Promise<Project> {
    try {
      const response = await apiClient.put(PROJECT_ENDPOINTS.UPDATE(id), data)
      return response.data
    } catch (error) {
      console.error(`Error updating project ${id}:`, error)
      throw error
    }
  }

  /**
   * Delete a project (soft delete)
   */
  static async deleteProject(id: string): Promise<void> {
    try {
      await apiClient.delete(PROJECT_ENDPOINTS.DELETE(id))
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error)
      throw error
    }
  }

  /**
   * Restore a deleted project
   */
  static async restoreProject(id: string): Promise<Project> {
    try {
      const response = await apiClient.post(PROJECT_ENDPOINTS.RESTORE(id))
      return response.data
    } catch (error) {
      console.error(`Error restoring project ${id}:`, error)
      throw error
    }
  }

  /**
   * Get project gallery images
   */
  static async getProjectGallery(id: string): Promise<ProjectGallery> {
    try {
      const response = await apiClient.get(PROJECT_ENDPOINTS.GALLERY(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching project gallery ${id}:`, error)
      throw error
    }
  }

  /**
   * Get project testimonials
   */
  static async getProjectTestimonials(id: string): Promise<any[]> {
    try {
      const response = await apiClient.get(PROJECT_ENDPOINTS.TESTIMONIALS(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching project testimonials ${id}:`, error)
      throw error
    }
  }

  /**
   * Get project tech stack
   */
  static async getProjectTechStack(id: string): Promise<ProjectTechStack> {
    try {
      const response = await apiClient.get(PROJECT_ENDPOINTS.TECH_STACK(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching project tech stack ${id}:`, error)
      throw error
    }
  }

  /**
   * Get featured projects
   */
  static async getFeaturedProjects(): Promise<Project[]> {
    try {
      const response = await apiClient.get(PROJECT_ENDPOINTS.FEATURED)
      return response.data
    } catch (error) {
      console.error('Error fetching featured projects:', error)
      throw error
    }
  }

  /**
   * Search projects
   */
  static async searchProjects(query: string, filters?: ProjectFilters): Promise<ProjectSearchResult> {
    try {
      const response = await apiClient.get(PROJECT_ENDPOINTS.SEARCH, {
        params: { q: query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching projects:', error)
      throw error
    }
  }

  /**
   * Get project categories
   */
  static async getProjectCategories(): Promise<ProjectCategory[]> {
    try {
      const response = await apiClient.get(PROJECT_ENDPOINTS.CATEGORIES)
      return response.data
    } catch (error) {
      console.error('Error fetching project categories:', error)
      throw error
    }
  }

  /**
   * Get project statistics
   */
  static async getProjectStats(): Promise<ProjectStats> {
    try {
      const response = await apiClient.get(`${PROJECT_ENDPOINTS.LIST}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching project stats:', error)
      throw error
    }
  }

  /**
   * Upload project image
   */
  static async uploadProjectImage(projectId: string, file: File): Promise<any> {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await apiClient.post(`${PROJECT_ENDPOINTS.DETAIL(projectId)}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Error uploading image for project ${projectId}:`, error)
      throw error
    }
  }

  /**
   * Delete project image
   */
  static async deleteProjectImage(projectId: string, imageId: string): Promise<void> {
    try {
      await apiClient.delete(`${PROJECT_ENDPOINTS.DETAIL(projectId)}/images/${imageId}`)
    } catch (error) {
      console.error(`Error deleting image ${imageId} for project ${projectId}:`, error)
      throw error
    }
  }

  /**
   * Update project status
   */
  static async updateProjectStatus(projectId: string, status: string): Promise<Project> {
    try {
      const response = await apiClient.patch(`${PROJECT_ENDPOINTS.DETAIL(projectId)}/status`, { status })
      return response.data
    } catch (error) {
      console.error(`Error updating project status ${projectId}:`, error)
      throw error
    }
  }

  /**
   * Update project progress
   */
  static async updateProjectProgress(projectId: string, progress: number): Promise<Project> {
    try {
      const response = await apiClient.patch(`${PROJECT_ENDPOINTS.DETAIL(projectId)}/progress`, { progress })
      return response.data
    } catch (error) {
      console.error(`Error updating project progress ${projectId}:`, error)
      throw error
    }
  }
}

export default ProjectApiService
