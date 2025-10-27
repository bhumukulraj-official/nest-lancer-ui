/**
 * Media API Service
 * Handles all media-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { MEDIA_ENDPOINTS } from '../api/endpoints'
import type {
  Media,
  MediaCreateData,
  MediaUpdateData,
  MediaFilters,
  MediaSearchResult,
  MediaStats,
  MediaStatus,
  MediaCategory,
  MediaVersion,
  MediaAnalytics,
  MediaProcessing,
  MediaTransformation
} from '../../types/models/media.types'

export class MediaApiService {
  /**
   * Get all media files with optional filtering
   */
  static async getMedia(filters?: MediaFilters): Promise<MediaSearchResult> {
    try {
      const response = await apiClient.get(MEDIA_ENDPOINTS.LIST, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching media:', error)
      throw error
    }
  }

  /**
   * Get a single media file by ID
   */
  static async getMediaById(id: string): Promise<Media> {
    try {
      const response = await apiClient.get(`${MEDIA_ENDPOINTS.BASE}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching media:', error)
      throw error
    }
  }

  /**
   * Upload media file
   */
  static async uploadMedia(file: File, metadata?: Partial<MediaCreateData>): Promise<Media> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      if (metadata) {
        Object.keys(metadata).forEach(key => {
          if (metadata[key as keyof MediaCreateData] !== undefined) {
            formData.append(key, String(metadata[key as keyof MediaCreateData]))
          }
        })
      }
      
      const response = await apiClient.post(MEDIA_ENDPOINTS.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading media:', error)
      throw error
    }
  }

  /**
   * Upload multiple media files
   */
  static async uploadMultipleMedia(files: File[], metadata?: Partial<MediaCreateData>): Promise<Media[]> {
    try {
      const formData = new FormData()
      
      files.forEach((file) => {
        formData.append(`files`, file)
      })
      
      if (metadata) {
        Object.keys(metadata).forEach(key => {
          if (metadata[key as keyof MediaCreateData] !== undefined) {
            formData.append(key, String(metadata[key as keyof MediaCreateData]))
          }
        })
      }
      
      const response = await apiClient.post(MEDIA_ENDPOINTS.BULK_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading multiple media:', error)
      throw error
    }
  }

  /**
   * Update media metadata
   */
  static async updateMedia(id: string, mediaData: MediaUpdateData): Promise<Media> {
    try {
      const response = await apiClient.put(`${MEDIA_ENDPOINTS.BASE}/${id}`, mediaData)
      return response.data
    } catch (error) {
      console.error('Error updating media:', error)
      throw error
    }
  }

  /**
   * Delete media file
   */
  static async deleteMedia(id: string): Promise<void> {
    try {
      await apiClient.delete(`${MEDIA_ENDPOINTS.BASE}/${id}`)
    } catch (error) {
      console.error('Error deleting media:', error)
      throw error
    }
  }

  /**
   * Update media status
   */
  static async updateMediaStatus(id: string, status: MediaStatus): Promise<Media> {
    try {
      const response = await apiClient.patch(`${MEDIA_ENDPOINTS.BASE}/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating media status:', error)
      throw error
    }
  }

  /**
   * Update media visibility
   */
  static async updateMediaVisibility(id: string, visibility: 'public' | 'private' | 'unlisted'): Promise<Media> {
    try {
      const response = await apiClient.patch(`${MEDIA_ENDPOINTS.BASE}/${id}/visibility`, { visibility })
      return response.data
    } catch (error) {
      console.error('Error updating media visibility:', error)
      throw error
    }
  }

  /**
   * Add media tags
   */
  static async addMediaTags(id: string, tags: string[]): Promise<Media> {
    try {
      const response = await apiClient.post(`${MEDIA_ENDPOINTS.BASE}/${id}/tags`, { tags })
      return response.data
    } catch (error) {
      console.error('Error adding media tags:', error)
      throw error
    }
  }

  /**
   * Remove media tags
   */
  static async removeMediaTags(id: string, tags: string[]): Promise<Media> {
    try {
      const response = await apiClient.delete(`${MEDIA_ENDPOINTS.BASE}/${id}/tags`, { data: { tags } })
      return response.data
    } catch (error) {
      console.error('Error removing media tags:', error)
      throw error
    }
  }

  /**
   * Update media category
   */
  static async updateMediaCategory(id: string, category: MediaCategory): Promise<Media> {
    try {
      const response = await apiClient.patch(`${MEDIA_ENDPOINTS.BASE}/${id}/category`, { category })
      return response.data
    } catch (error) {
      console.error('Error updating media category:', error)
      throw error
    }
  }

  /**
   * Get media download URL
   */
  static async getMediaDownloadUrl(id: string, options?: { expiresIn?: number; transformation?: MediaTransformation }): Promise<{ downloadUrl: string; expiresAt: string }> {
    try {
      const response = await apiClient.get(`${MEDIA_ENDPOINTS.BASE}/${id}/download-url`, {
        params: options
      })
      return response.data
    } catch (error) {
      console.error('Error getting media download URL:', error)
      throw error
    }
  }

  /**
   * Get media thumbnail URL
   */
  static async getMediaThumbnailUrl(id: string, options?: { width?: number; height?: number; quality?: number }): Promise<{ thumbnailUrl: string }> {
    try {
      const response = await apiClient.get(`${MEDIA_ENDPOINTS.BASE}/${id}/thumbnail-url`, {
        params: options
      })
      return response.data
    } catch (error) {
      console.error('Error getting media thumbnail URL:', error)
      throw error
    }
  }

  /**
   * Generate media transformations
   */
  static async generateMediaTransformations(id: string, transformations: MediaTransformation[]): Promise<MediaVersion[]> {
    try {
      const response = await apiClient.post(`${MEDIA_ENDPOINTS.BASE}/${id}/transformations`, { transformations })
      return response.data
    } catch (error) {
      console.error('Error generating media transformations:', error)
      throw error
    }
  }

  /**
   * Get media processing status
   */
  static async getMediaProcessingStatus(id: string): Promise<MediaProcessing> {
    try {
      const response = await apiClient.get(`${MEDIA_ENDPOINTS.BASE}/${id}/processing-status`)
      return response.data
    } catch (error) {
      console.error('Error getting media processing status:', error)
      throw error
    }
  }

  /**
   * Get media analytics
   */
  static async getMediaAnalytics(id: string, filters?: any): Promise<MediaAnalytics> {
    try {
      const response = await apiClient.get(`${MEDIA_ENDPOINTS.BASE}/${id}/analytics`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error getting media analytics:', error)
      throw error
    }
  }

  /**
   * Get media statistics
   */
  static async getMediaStats(filters?: MediaFilters): Promise<MediaStats> {
    try {
      const response = await apiClient.get(MEDIA_ENDPOINTS.STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching media stats:', error)
      throw error
    }
  }

  /**
   * Search media files
   */
  static async searchMedia(query: string, filters?: MediaFilters): Promise<MediaSearchResult> {
    try {
      const response = await apiClient.get(MEDIA_ENDPOINTS.SEARCH, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching media:', error)
      throw error
    }
  }

  /**
   * Get media by category
   */
  static async getMediaByCategory(category: MediaCategory, filters?: MediaFilters): Promise<MediaSearchResult> {
    try {
      const response = await apiClient.get(`${MEDIA_ENDPOINTS.BY_CATEGORY}/${category}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching media by category:', error)
      throw error
    }
  }

  /**
   * Get media by user
   */
  static async getMediaByUser(userId: string, filters?: MediaFilters): Promise<MediaSearchResult> {
    try {
      const response = await apiClient.get(`${MEDIA_ENDPOINTS.BY_USER}/${userId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching media by user:', error)
      throw error
    }
  }

  /**
   * Get media by project
   */
  static async getMediaByProject(projectId: string, filters?: MediaFilters): Promise<MediaSearchResult> {
    try {
      const response = await apiClient.get(`${MEDIA_ENDPOINTS.BY_PROJECT}/${projectId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching media by project:', error)
      throw error
    }
  }

  /**
   * Bulk update media (Admin only)
   */
  static async bulkUpdateMedia(updates: Array<{ id: string; data: MediaUpdateData }>): Promise<Media[]> {
    try {
      const response = await apiClient.patch(MEDIA_ENDPOINTS.BULK_UPDATE, { updates })
      return response.data
    } catch (error) {
      console.error('Error bulk updating media:', error)
      throw error
    }
  }

  /**
   * Bulk delete media (Admin only)
   */
  static async bulkDeleteMedia(ids: string[]): Promise<void> {
    try {
      await apiClient.delete(MEDIA_ENDPOINTS.BULK_DELETE, { data: { ids } })
    } catch (error) {
      console.error('Error bulk deleting media:', error)
      throw error
    }
  }

  /**
   * Export media data (Admin only)
   */
  static async exportMedia(filters?: MediaFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(MEDIA_ENDPOINTS.EXPORT, {
        params: filters,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting media:', error)
      throw error
    }
  }

  /**
   * Get storage usage statistics
   */
  static async getStorageUsage(): Promise<{ totalSize: number; usedSize: number; availableSize: number; usagePercentage: number }> {
    try {
      const response = await apiClient.get(MEDIA_ENDPOINTS.STORAGE_USAGE)
      return response.data
    } catch (error) {
      console.error('Error getting storage usage:', error)
      throw error
    }
  }

  /**
   * Clean up unused media (Admin only)
   */
  static async cleanupUnusedMedia(): Promise<{ deletedCount: number; freedSpace: number }> {
    try {
      const response = await apiClient.post(MEDIA_ENDPOINTS.CLEANUP)
      return response.data
    } catch (error) {
      console.error('Error cleaning up unused media:', error)
      throw error
    }
  }

  /**
   * Optimize media files (Admin only)
   */
  static async optimizeMedia(ids?: string[]): Promise<{ optimizedCount: number; spaceSaved: number }> {
    try {
      const response = await apiClient.post(MEDIA_ENDPOINTS.OPTIMIZE, { ids })
      return response.data
    } catch (error) {
      console.error('Error optimizing media:', error)
      throw error
    }
  }
}

export default MediaApiService
