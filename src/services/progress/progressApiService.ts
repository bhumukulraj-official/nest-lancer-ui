/**
 * Progress API Service
 * Handles all progress-related API calls
 * UI-only service - no business logic processing
 */

import type {
  Progress,
  ProgressCreateData,
  ProgressUpdateData,
  ProgressFilters,
  ProgressSearchResult,
  ProgressStats,
  ProgressStatus,
  Milestone,
  MilestoneCreateData,
  MilestoneUpdateData,
  MilestoneStatus,
  ProgressUpdate,
  ProgressUpdateCreateData,
  ProgressTimeline,
  ProgressReport,
  ProgressAnalytics,
  ProgressComment,
  ProgressAttachment
} from '../../types/models/progress.types'
import { apiClient } from '../api/client'
import { PROGRESS_ENDPOINTS } from '../api/endpoints'

export class ProgressApiService {
  /**
   * Get all progress records with optional filtering
   */
  static async getProgress(filters?: ProgressFilters): Promise<ProgressSearchResult> {
    try {
      const response = await apiClient.get(PROGRESS_ENDPOINTS.LIST, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching progress:', error)
      throw error
    }
  }

  /**
   * Get a single progress record by ID
   */
  static async getProgressById(id: string): Promise<Progress> {
    try {
      const response = await apiClient.get(`${PROGRESS_ENDPOINTS.BASE}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching progress:', error)
      throw error
    }
  }

  /**
   * Get progress by project ID
   */
  static async getProgressByProject(projectId: string): Promise<Progress> {
    try {
      const response = await apiClient.get(`${PROGRESS_ENDPOINTS.BY_PROJECT}/${projectId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching project progress:', error)
      throw error
    }
  }

  /**
   * Create a new progress record
   */
  static async createProgress(progressData: ProgressCreateData): Promise<Progress> {
    try {
      const response = await apiClient.post(PROGRESS_ENDPOINTS.CREATE, progressData)
      return response.data
    } catch (error) {
      console.error('Error creating progress:', error)
      throw error
    }
  }

  /**
   * Update progress record
   */
  static async updateProgress(id: string, progressData: ProgressUpdateData): Promise<Progress> {
    try {
      const response = await apiClient.put(`${PROGRESS_ENDPOINTS.BASE}/${id}`, progressData)
      return response.data
    } catch (error) {
      console.error('Error updating progress:', error)
      throw error
    }
  }

  /**
   * Delete progress record
   */
  static async deleteProgress(id: string): Promise<void> {
    try {
      await apiClient.delete(`${PROGRESS_ENDPOINTS.BASE}/${id}`)
    } catch (error) {
      console.error('Error deleting progress:', error)
      throw error
    }
  }

  /**
   * Update progress status
   */
  static async updateProgressStatus(id: string, status: ProgressStatus): Promise<Progress> {
    try {
      const response = await apiClient.patch(`${PROGRESS_ENDPOINTS.BASE}/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating progress status:', error)
      throw error
    }
  }

  /**
   * Get all milestones
   */
  static async getMilestones(progressId: string): Promise<Milestone[]> {
    try {
      const response = await apiClient.get(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/milestones`)
      return response.data
    } catch (error) {
      console.error('Error fetching milestones:', error)
      throw error
    }
  }

  /**
   * Get a single milestone by ID
   */
  static async getMilestone(progressId: string, milestoneId: string): Promise<Milestone> {
    try {
      const response = await apiClient.get(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/milestones/${milestoneId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching milestone:', error)
      throw error
    }
  }

  /**
   * Create a new milestone
   */
  static async createMilestone(progressId: string, milestoneData: MilestoneCreateData): Promise<Milestone> {
    try {
      const response = await apiClient.post(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/milestones`, milestoneData)
      return response.data
    } catch (error) {
      console.error('Error creating milestone:', error)
      throw error
    }
  }

  /**
   * Update milestone
   */
  static async updateMilestone(progressId: string, milestoneId: string, milestoneData: MilestoneUpdateData): Promise<Milestone> {
    try {
      const response = await apiClient.put(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/milestones/${milestoneId}`, milestoneData)
      return response.data
    } catch (error) {
      console.error('Error updating milestone:', error)
      throw error
    }
  }

  /**
   * Delete milestone
   */
  static async deleteMilestone(progressId: string, milestoneId: string): Promise<void> {
    try {
      await apiClient.delete(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/milestones/${milestoneId}`)
    } catch (error) {
      console.error('Error deleting milestone:', error)
      throw error
    }
  }

  /**
   * Update milestone status
   */
  static async updateMilestoneStatus(progressId: string, milestoneId: string, status: MilestoneStatus): Promise<Milestone> {
    try {
      const response = await apiClient.patch(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/milestones/${milestoneId}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating milestone status:', error)
      throw error
    }
  }

  /**
   * Mark milestone as completed
   */
  static async completeMilestone(progressId: string, milestoneId: string, completionData?: { notes?: string; attachments?: File[] }): Promise<Milestone> {
    try {
      const formData = new FormData()
      if (completionData?.notes) {
        formData.append('notes', completionData.notes)
      }
      if (completionData?.attachments) {
        completionData.attachments.forEach((file) => {
          formData.append(`attachments`, file)
        })
      }
      
      const response = await apiClient.post(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/milestones/${milestoneId}/complete`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error completing milestone:', error)
      throw error
    }
  }

  /**
   * Get progress updates
   */
  static async getProgressUpdates(progressId: string, filters?: any): Promise<ProgressUpdate[]> {
    try {
      const response = await apiClient.get(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/updates`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching progress updates:', error)
      throw error
    }
  }

  /**
   * Create progress update
   */
  static async createProgressUpdate(progressId: string, updateData: ProgressUpdateCreateData): Promise<ProgressUpdate> {
    try {
      const response = await apiClient.post(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/updates`, updateData)
      return response.data
    } catch (error) {
      console.error('Error creating progress update:', error)
      throw error
    }
  }

  /**
   * Update progress update
   */
  static async updateProgressUpdate(progressId: string, updateId: string, updateData: Partial<ProgressUpdateCreateData>): Promise<ProgressUpdate> {
    try {
      const response = await apiClient.put(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/updates/${updateId}`, updateData)
      return response.data
    } catch (error) {
      console.error('Error updating progress update:', error)
      throw error
    }
  }

  /**
   * Delete progress update
   */
  static async deleteProgressUpdate(progressId: string, updateId: string): Promise<void> {
    try {
      await apiClient.delete(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/updates/${updateId}`)
    } catch (error) {
      console.error('Error deleting progress update:', error)
      throw error
    }
  }

  /**
   * Get progress timeline
   */
  static async getProgressTimeline(progressId: string): Promise<ProgressTimeline[]> {
    try {
      const response = await apiClient.get(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/timeline`)
      return response.data
    } catch (error) {
      console.error('Error fetching progress timeline:', error)
      throw error
    }
  }

  /**
   * Generate progress report
   */
  static async generateProgressReport(progressId: string, reportType: 'summary' | 'detailed' | 'milestone' = 'summary'): Promise<ProgressReport> {
    try {
      const response = await apiClient.get(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/report`, {
        params: { type: reportType }
      })
      return response.data
    } catch (error) {
      console.error('Error generating progress report:', error)
      throw error
    }
  }

  /**
   * Export progress report as PDF
   */
  static async exportProgressReportPDF(progressId: string, reportType: 'summary' | 'detailed' | 'milestone' = 'summary'): Promise<Blob> {
    try {
      const response = await apiClient.get(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/report/pdf`, {
        params: { type: reportType },
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting progress report PDF:', error)
      throw error
    }
  }

  /**
   * Get progress statistics
   */
  static async getProgressStats(filters?: ProgressFilters): Promise<ProgressStats> {
    try {
      const response = await apiClient.get(PROGRESS_ENDPOINTS.STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching progress stats:', error)
      throw error
    }
  }

  /**
   * Get progress analytics
   */
  static async getProgressAnalytics(filters?: ProgressFilters): Promise<ProgressAnalytics> {
    try {
      const response = await apiClient.get(PROGRESS_ENDPOINTS.ANALYTICS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching progress analytics:', error)
      throw error
    }
  }

  /**
   * Search progress records
   */
  static async searchProgress(query: string, filters?: ProgressFilters): Promise<ProgressSearchResult> {
    try {
      const response = await apiClient.get(PROGRESS_ENDPOINTS.SEARCH, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching progress:', error)
      throw error
    }
  }

  /**
   * Bulk update progress records (Admin only)
   */
  static async bulkUpdateProgress(updates: Array<{ id: string; data: ProgressUpdateData }>): Promise<Progress[]> {
    try {
      const response = await apiClient.patch(PROGRESS_ENDPOINTS.BULK_UPDATE, { updates })
      return response.data
    } catch (error) {
      console.error('Error bulk updating progress:', error)
      throw error
    }
  }

  /**
   * Export progress data (Admin only)
   */
  static async exportProgress(filters?: ProgressFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(PROGRESS_ENDPOINTS.EXPORT, {
        params: filters,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting progress:', error)
      throw error
    }
  }

  /**
   * Get progress by user
   */
  static async getProgressByUser(userId: string, filters?: ProgressFilters): Promise<ProgressSearchResult> {
    try {
      const response = await apiClient.get(`${PROGRESS_ENDPOINTS.BY_USER}/${userId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching user progress:', error)
      throw error
    }
  }

  /**
   * Add progress comment
   */
  static async addProgressComment(progressId: string, comment: ProgressComment): Promise<Progress> {
    try {
      const response = await apiClient.post(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/comments`, comment)
      return response.data
    } catch (error) {
      console.error('Error adding progress comment:', error)
      throw error
    }
  }

  /**
   * Update progress comment
   */
  static async updateProgressComment(progressId: string, commentId: string, comment: Partial<ProgressComment>): Promise<Progress> {
    try {
      const response = await apiClient.put(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/comments/${commentId}`, comment)
      return response.data
    } catch (error) {
      console.error('Error updating progress comment:', error)
      throw error
    }
  }

  /**
   * Delete progress comment
   */
  static async deleteProgressComment(progressId: string, commentId: string): Promise<Progress> {
    try {
      const response = await apiClient.delete(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/comments/${commentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting progress comment:', error)
      throw error
    }
  }

  /**
   * Upload progress attachment
   */
  static async uploadProgressAttachment(progressId: string, file: File): Promise<ProgressAttachment> {
    try {
      const formData = new FormData()
      formData.append('attachment', file)
      
      const response = await apiClient.post(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading progress attachment:', error)
      throw error
    }
  }

  /**
   * Delete progress attachment
   */
  static async deleteProgressAttachment(progressId: string, attachmentId: string): Promise<Progress> {
    try {
      const response = await apiClient.delete(`${PROGRESS_ENDPOINTS.BASE}/${progressId}/attachments/${attachmentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting progress attachment:', error)
      throw error
    }
  }
}

export default ProgressApiService
