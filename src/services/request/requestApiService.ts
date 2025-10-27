/**
 * Request API Service
 * Handles all request-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { REQUEST_ENDPOINTS } from '../api/endpoints'
import type {
  Request,
  RequestCreateData,
  RequestUpdateData,
  RequestFilters,
  RequestSearchResult,
  RequestStats,
  RequestStatus,
  RequestPriority,
  RequestAttachment,
  RequestComment,
  RequestTimeline,
  RequestEscalation,
  RequestResolution,
  RequestFeedback,
  RequestAnalytics
} from '../../types/models/request.types'

export class RequestApiService {
  /**
   * Get all requests with optional filtering
   */
  static async getRequests(filters?: RequestFilters): Promise<RequestSearchResult> {
    try {
      const response = await apiClient.get(REQUEST_ENDPOINTS.LIST, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching requests:', error)
      throw error
    }
  }

  /**
   * Get a single request by ID
   */
  static async getRequest(id: string): Promise<Request> {
    try {
      const response = await apiClient.get(`${REQUEST_ENDPOINTS.BASE}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching request:', error)
      throw error
    }
  }

  /**
   * Create a new request
   */
  static async createRequest(requestData: RequestCreateData): Promise<Request> {
    try {
      const response = await apiClient.post(REQUEST_ENDPOINTS.CREATE, requestData)
      return response.data
    } catch (error) {
      console.error('Error creating request:', error)
      throw error
    }
  }

  /**
   * Update request
   */
  static async updateRequest(id: string, requestData: RequestUpdateData): Promise<Request> {
    try {
      const response = await apiClient.put(`${REQUEST_ENDPOINTS.BASE}/${id}`, requestData)
      return response.data
    } catch (error) {
      console.error('Error updating request:', error)
      throw error
    }
  }

  /**
   * Delete request
   */
  static async deleteRequest(id: string): Promise<void> {
    try {
      await apiClient.delete(`${REQUEST_ENDPOINTS.BASE}/${id}`)
    } catch (error) {
      console.error('Error deleting request:', error)
      throw error
    }
  }

  /**
   * Update request status
   */
  static async updateRequestStatus(id: string, status: RequestStatus): Promise<Request> {
    try {
      const response = await apiClient.patch(`${REQUEST_ENDPOINTS.BASE}/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating request status:', error)
      throw error
    }
  }

  /**
   * Update request priority
   */
  static async updateRequestPriority(id: string, priority: RequestPriority): Promise<Request> {
    try {
      const response = await apiClient.patch(`${REQUEST_ENDPOINTS.BASE}/${id}/priority`, { priority })
      return response.data
    } catch (error) {
      console.error('Error updating request priority:', error)
      throw error
    }
  }

  /**
   * Assign request to user
   */
  static async assignRequest(id: string, assigneeId: string): Promise<Request> {
    try {
      const response = await apiClient.patch(`${REQUEST_ENDPOINTS.BASE}/${id}/assign`, { assigneeId })
      return response.data
    } catch (error) {
      console.error('Error assigning request:', error)
      throw error
    }
  }

  /**
   * Unassign request
   */
  static async unassignRequest(id: string): Promise<Request> {
    try {
      const response = await apiClient.patch(`${REQUEST_ENDPOINTS.BASE}/${id}/unassign`)
      return response.data
    } catch (error) {
      console.error('Error unassigning request:', error)
      throw error
    }
  }

  /**
   * Add request comment
   */
  static async addComment(id: string, comment: RequestComment): Promise<Request> {
    try {
      const response = await apiClient.post(`${REQUEST_ENDPOINTS.BASE}/${id}/comments`, comment)
      return response.data
    } catch (error) {
      console.error('Error adding comment:', error)
      throw error
    }
  }

  /**
   * Update request comment
   */
  static async updateComment(id: string, commentId: string, comment: Partial<RequestComment>): Promise<Request> {
    try {
      const response = await apiClient.put(`${REQUEST_ENDPOINTS.BASE}/${id}/comments/${commentId}`, comment)
      return response.data
    } catch (error) {
      console.error('Error updating comment:', error)
      throw error
    }
  }

  /**
   * Delete request comment
   */
  static async deleteComment(id: string, commentId: string): Promise<Request> {
    try {
      const response = await apiClient.delete(`${REQUEST_ENDPOINTS.BASE}/${id}/comments/${commentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
  }

  /**
   * Upload request attachment
   */
  static async uploadAttachment(id: string, file: File): Promise<RequestAttachment> {
    try {
      const formData = new FormData()
      formData.append('attachment', file)
      
      const response = await apiClient.post(`${REQUEST_ENDPOINTS.BASE}/${id}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading attachment:', error)
      throw error
    }
  }

  /**
   * Delete request attachment
   */
  static async deleteAttachment(id: string, attachmentId: string): Promise<Request> {
    try {
      const response = await apiClient.delete(`${REQUEST_ENDPOINTS.BASE}/${id}/attachments/${attachmentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting attachment:', error)
      throw error
    }
  }

  /**
   * Get request timeline
   */
  static async getRequestTimeline(id: string): Promise<RequestTimeline[]> {
    try {
      const response = await apiClient.get(`${REQUEST_ENDPOINTS.BASE}/${id}/timeline`)
      return response.data
    } catch (error) {
      console.error('Error fetching request timeline:', error)
      throw error
    }
  }

  /**
   * Escalate request
   */
  static async escalateRequest(id: string, escalation: RequestEscalation): Promise<Request> {
    try {
      const response = await apiClient.post(`${REQUEST_ENDPOINTS.BASE}/${id}/escalate`, escalation)
      return response.data
    } catch (error) {
      console.error('Error escalating request:', error)
      throw error
    }
  }

  /**
   * Resolve request
   */
  static async resolveRequest(id: string, resolution: RequestResolution): Promise<Request> {
    try {
      const response = await apiClient.post(`${REQUEST_ENDPOINTS.BASE}/${id}/resolve`, resolution)
      return response.data
    } catch (error) {
      console.error('Error resolving request:', error)
      throw error
    }
  }

  /**
   * Reopen request
   */
  static async reopenRequest(id: string, reason: string): Promise<Request> {
    try {
      const response = await apiClient.post(`${REQUEST_ENDPOINTS.BASE}/${id}/reopen`, { reason })
      return response.data
    } catch (error) {
      console.error('Error reopening request:', error)
      throw error
    }
  }

  /**
   * Submit request feedback
   */
  static async submitFeedback(id: string, feedback: RequestFeedback): Promise<Request> {
    try {
      const response = await apiClient.post(`${REQUEST_ENDPOINTS.BASE}/${id}/feedback`, feedback)
      return response.data
    } catch (error) {
      console.error('Error submitting feedback:', error)
      throw error
    }
  }

  /**
   * Get request statistics
   */
  static async getRequestStats(filters?: RequestFilters): Promise<RequestStats> {
    try {
      const response = await apiClient.get(REQUEST_ENDPOINTS.STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching request stats:', error)
      throw error
    }
  }

  /**
   * Get request analytics
   */
  static async getRequestAnalytics(filters?: RequestFilters): Promise<RequestAnalytics> {
    try {
      const response = await apiClient.get(REQUEST_ENDPOINTS.ANALYTICS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching request analytics:', error)
      throw error
    }
  }

  /**
   * Search requests
   */
  static async searchRequests(query: string, filters?: RequestFilters): Promise<RequestSearchResult> {
    try {
      const response = await apiClient.get(REQUEST_ENDPOINTS.SEARCH, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching requests:', error)
      throw error
    }
  }

  /**
   * Bulk update requests (Admin only)
   */
  static async bulkUpdateRequests(updates: Array<{ id: string; data: RequestUpdateData }>): Promise<Request[]> {
    try {
      const response = await apiClient.patch(REQUEST_ENDPOINTS.BULK_UPDATE, { updates })
      return response.data
    } catch (error) {
      console.error('Error bulk updating requests:', error)
      throw error
    }
  }

  /**
   * Export requests (Admin only)
   */
  static async exportRequests(filters?: RequestFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(REQUEST_ENDPOINTS.EXPORT, {
        params: filters,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting requests:', error)
      throw error
    }
  }

  /**
   * Get user's requests
   */
  static async getUserRequests(userId: string, filters?: RequestFilters): Promise<RequestSearchResult> {
    try {
      const response = await apiClient.get(`${REQUEST_ENDPOINTS.USER}/${userId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching user requests:', error)
      throw error
    }
  }

  /**
   * Get assigned requests
   */
  static async getAssignedRequests(assigneeId: string, filters?: RequestFilters): Promise<RequestSearchResult> {
    try {
      const response = await apiClient.get(`${REQUEST_ENDPOINTS.ASSIGNED}/${assigneeId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching assigned requests:', error)
      throw error
    }
  }
}

export default RequestApiService
