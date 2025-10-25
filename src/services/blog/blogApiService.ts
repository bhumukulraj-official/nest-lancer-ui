/**
 * Blog API Service
 * Handles all blog-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { BLOG_ENDPOINTS } from '../api/endpoints'
import type {
  BlogPost,
  BlogPostCreateData,
  BlogPostUpdateData,
  BlogPostFilters,
  BlogPostSearchResult,
  BlogPostStats,
  BlogPostStatus,
  BlogPostCategory,
  BlogPostTag,
  BlogPostComment,
  BlogPostLike,
  BlogPostShare,
  BlogPostAnalytics,
  BlogPostSEO,
  BlogPostMedia,
  BlogPostAuthor,
  BlogPostSeries,
  BlogPostTemplate
} from '../../types/models/blog.types'

export class BlogApiService {
  /**
   * Get all blog posts with optional filtering
   */
  static async getBlogPosts(filters?: BlogPostFilters): Promise<BlogPostSearchResult> {
    try {
      const response = await apiClient.get(BLOG_ENDPOINTS.LIST, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }
  }

  /**
   * Get a single blog post by ID
   */
  static async getBlogPost(id: string): Promise<BlogPost> {
    try {
      const response = await apiClient.get(`${BLOG_ENDPOINTS.BASE}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching blog post:', error)
      throw error
    }
  }

  /**
   * Get blog post by slug
   */
  static async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    try {
      const response = await apiClient.get(`${BLOG_ENDPOINTS.BY_SLUG}/${slug}`)
      return response.data
    } catch (error) {
      console.error('Error fetching blog post by slug:', error)
      throw error
    }
  }

  /**
   * Create a new blog post
   */
  static async createBlogPost(blogData: BlogPostCreateData): Promise<BlogPost> {
    try {
      const response = await apiClient.post(BLOG_ENDPOINTS.CREATE, blogData)
      return response.data
    } catch (error) {
      console.error('Error creating blog post:', error)
      throw error
    }
  }

  /**
   * Update blog post
   */
  static async updateBlogPost(id: string, blogData: BlogPostUpdateData): Promise<BlogPost> {
    try {
      const response = await apiClient.put(`${BLOG_ENDPOINTS.BASE}/${id}`, blogData)
      return response.data
    } catch (error) {
      console.error('Error updating blog post:', error)
      throw error
    }
  }

  /**
   * Delete blog post
   */
  static async deleteBlogPost(id: string): Promise<void> {
    try {
      await apiClient.delete(`${BLOG_ENDPOINTS.BASE}/${id}`)
    } catch (error) {
      console.error('Error deleting blog post:', error)
      throw error
    }
  }

  /**
   * Update blog post status
   */
  static async updateBlogPostStatus(id: string, status: BlogPostStatus): Promise<BlogPost> {
    try {
      const response = await apiClient.patch(`${BLOG_ENDPOINTS.BASE}/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating blog post status:', error)
      throw error
    }
  }

  /**
   * Publish blog post
   */
  static async publishBlogPost(id: string, publishData?: { scheduledAt?: string }): Promise<BlogPost> {
    try {
      const response = await apiClient.post(`${BLOG_ENDPOINTS.BASE}/${id}/publish`, publishData)
      return response.data
    } catch (error) {
      console.error('Error publishing blog post:', error)
      throw error
    }
  }

  /**
   * Unpublish blog post
   */
  static async unpublishBlogPost(id: string): Promise<BlogPost> {
    try {
      const response = await apiClient.post(`${BLOG_ENDPOINTS.BASE}/${id}/unpublish`)
      return response.data
    } catch (error) {
      console.error('Error unpublishing blog post:', error)
      throw error
    }
  }

  /**
   * Add blog post comment
   */
  static async addBlogPostComment(id: string, comment: BlogPostComment): Promise<BlogPost> {
    try {
      const response = await apiClient.post(`${BLOG_ENDPOINTS.BASE}/${id}/comments`, comment)
      return response.data
    } catch (error) {
      console.error('Error adding blog post comment:', error)
      throw error
    }
  }

  /**
   * Update blog post comment
   */
  static async updateBlogPostComment(id: string, commentId: string, comment: Partial<BlogPostComment>): Promise<BlogPost> {
    try {
      const response = await apiClient.put(`${BLOG_ENDPOINTS.BASE}/${id}/comments/${commentId}`, comment)
      return response.data
    } catch (error) {
      console.error('Error updating blog post comment:', error)
      throw error
    }
  }

  /**
   * Delete blog post comment
   */
  static async deleteBlogPostComment(id: string, commentId: string): Promise<BlogPost> {
    try {
      const response = await apiClient.delete(`${BLOG_ENDPOINTS.BASE}/${id}/comments/${commentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting blog post comment:', error)
      throw error
    }
  }

  /**
   * Like blog post
   */
  static async likeBlogPost(id: string): Promise<BlogPostLike> {
    try {
      const response = await apiClient.post(`${BLOG_ENDPOINTS.BASE}/${id}/like`)
      return response.data
    } catch (error) {
      console.error('Error liking blog post:', error)
      throw error
    }
  }

  /**
   * Unlike blog post
   */
  static async unlikeBlogPost(id: string): Promise<void> {
    try {
      await apiClient.delete(`${BLOG_ENDPOINTS.BASE}/${id}/like`)
    } catch (error) {
      console.error('Error unliking blog post:', error)
      throw error
    }
  }

  /**
   * Share blog post
   */
  static async shareBlogPost(id: string, shareData: BlogPostShare): Promise<BlogPostShare> {
    try {
      const response = await apiClient.post(`${BLOG_ENDPOINTS.BASE}/${id}/share`, shareData)
      return response.data
    } catch (error) {
      console.error('Error sharing blog post:', error)
      throw error
    }
  }

  /**
   * Add blog post tag
   */
  static async addBlogPostTag(id: string, tag: BlogPostTag): Promise<BlogPost> {
    try {
      const response = await apiClient.post(`${BLOG_ENDPOINTS.BASE}/${id}/tags`, tag)
      return response.data
    } catch (error) {
      console.error('Error adding blog post tag:', error)
      throw error
    }
  }

  /**
   * Remove blog post tag
   */
  static async removeBlogPostTag(id: string, tagId: string): Promise<BlogPost> {
    try {
      const response = await apiClient.delete(`${BLOG_ENDPOINTS.BASE}/${id}/tags/${tagId}`)
      return response.data
    } catch (error) {
      console.error('Error removing blog post tag:', error)
      throw error
    }
  }

  /**
   * Update blog post category
   */
  static async updateBlogPostCategory(id: string, category: BlogPostCategory): Promise<BlogPost> {
    try {
      const response = await apiClient.patch(`${BLOG_ENDPOINTS.BASE}/${id}/category`, { category })
      return response.data
    } catch (error) {
      console.error('Error updating blog post category:', error)
      throw error
    }
  }

  /**
   * Upload blog post media
   */
  static async uploadBlogPostMedia(id: string, file: File): Promise<BlogPostMedia> {
    try {
      const formData = new FormData()
      formData.append('media', file)
      
      const response = await apiClient.post(`${BLOG_ENDPOINTS.BASE}/${id}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading blog post media:', error)
      throw error
    }
  }

  /**
   * Delete blog post media
   */
  static async deleteBlogPostMedia(id: string, mediaId: string): Promise<BlogPost> {
    try {
      const response = await apiClient.delete(`${BLOG_ENDPOINTS.BASE}/${id}/media/${mediaId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting blog post media:', error)
      throw error
    }
  }

  /**
   * Update blog post SEO
   */
  static async updateBlogPostSEO(id: string, seo: BlogPostSEO): Promise<BlogPost> {
    try {
      const response = await apiClient.patch(`${BLOG_ENDPOINTS.BASE}/${id}/seo`, seo)
      return response.data
    } catch (error) {
      console.error('Error updating blog post SEO:', error)
      throw error
    }
  }

  /**
   * Get blog post analytics
   */
  static async getBlogPostAnalytics(id: string, filters?: any): Promise<BlogPostAnalytics> {
    try {
      const response = await apiClient.get(`${BLOG_ENDPOINTS.BASE}/${id}/analytics`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching blog post analytics:', error)
      throw error
    }
  }

  /**
   * Get blog post statistics
   */
  static async getBlogPostStats(filters?: BlogPostFilters): Promise<BlogPostStats> {
    try {
      const response = await apiClient.get(BLOG_ENDPOINTS.STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching blog post stats:', error)
      throw error
    }
  }

  /**
   * Search blog posts
   */
  static async searchBlogPosts(query: string, filters?: BlogPostFilters): Promise<BlogPostSearchResult> {
    try {
      const response = await apiClient.get(BLOG_ENDPOINTS.SEARCH, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching blog posts:', error)
      throw error
    }
  }

  /**
   * Get blog posts by category
   */
  static async getBlogPostsByCategory(category: string, filters?: BlogPostFilters): Promise<BlogPostSearchResult> {
    try {
      const response = await apiClient.get(`${BLOG_ENDPOINTS.BY_CATEGORY}/${category}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching blog posts by category:', error)
      throw error
    }
  }

  /**
   * Get blog posts by tag
   */
  static async getBlogPostsByTag(tag: string, filters?: BlogPostFilters): Promise<BlogPostSearchResult> {
    try {
      const response = await apiClient.get(`${BLOG_ENDPOINTS.BY_TAG}/${tag}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching blog posts by tag:', error)
      throw error
    }
  }

  /**
   * Get blog posts by author
   */
  static async getBlogPostsByAuthor(authorId: string, filters?: BlogPostFilters): Promise<BlogPostSearchResult> {
    try {
      const response = await apiClient.get(`${BLOG_ENDPOINTS.BY_AUTHOR}/${authorId}`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching blog posts by author:', error)
      throw error
    }
  }

  /**
   * Get related blog posts
   */
  static async getRelatedBlogPosts(id: string, limit: number = 5): Promise<BlogPost[]> {
    try {
      const response = await apiClient.get(`${BLOG_ENDPOINTS.BASE}/${id}/related`, {
        params: { limit }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching related blog posts:', error)
      throw error
    }
  }

  /**
   * Get blog post series
   */
  static async getBlogPostSeries(seriesId: string): Promise<BlogPostSeries> {
    try {
      const response = await apiClient.get(`${BLOG_ENDPOINTS.SERIES}/${seriesId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching blog post series:', error)
      throw error
    }
  }

  /**
   * Create blog post series
   */
  static async createBlogPostSeries(series: BlogPostSeries): Promise<BlogPostSeries> {
    try {
      const response = await apiClient.post(BLOG_ENDPOINTS.SERIES, series)
      return response.data
    } catch (error) {
      console.error('Error creating blog post series:', error)
      throw error
    }
  }

  /**
   * Update blog post series
   */
  static async updateBlogPostSeries(seriesId: string, series: Partial<BlogPostSeries>): Promise<BlogPostSeries> {
    try {
      const response = await apiClient.put(`${BLOG_ENDPOINTS.SERIES}/${seriesId}`, series)
      return response.data
    } catch (error) {
      console.error('Error updating blog post series:', error)
      throw error
    }
  }

  /**
   * Delete blog post series
   */
  static async deleteBlogPostSeries(seriesId: string): Promise<void> {
    try {
      await apiClient.delete(`${BLOG_ENDPOINTS.SERIES}/${seriesId}`)
    } catch (error) {
      console.error('Error deleting blog post series:', error)
      throw error
    }
  }

  /**
   * Get blog post templates
   */
  static async getBlogPostTemplates(): Promise<BlogPostTemplate[]> {
    try {
      const response = await apiClient.get(BLOG_ENDPOINTS.TEMPLATES)
      return response.data
    } catch (error) {
      console.error('Error fetching blog post templates:', error)
      throw error
    }
  }

  /**
   * Create blog post template
   */
  static async createBlogPostTemplate(template: BlogPostTemplate): Promise<BlogPostTemplate> {
    try {
      const response = await apiClient.post(BLOG_ENDPOINTS.TEMPLATES, template)
      return response.data
    } catch (error) {
      console.error('Error creating blog post template:', error)
      throw error
    }
  }

  /**
   * Update blog post template
   */
  static async updateBlogPostTemplate(templateId: string, template: Partial<BlogPostTemplate>): Promise<BlogPostTemplate> {
    try {
      const response = await apiClient.put(`${BLOG_ENDPOINTS.TEMPLATES}/${templateId}`, template)
      return response.data
    } catch (error) {
      console.error('Error updating blog post template:', error)
      throw error
    }
  }

  /**
   * Delete blog post template
   */
  static async deleteBlogPostTemplate(templateId: string): Promise<void> {
    try {
      await apiClient.delete(`${BLOG_ENDPOINTS.TEMPLATES}/${templateId}`)
    } catch (error) {
      console.error('Error deleting blog post template:', error)
      throw error
    }
  }

  /**
   * Duplicate blog post
   */
  static async duplicateBlogPost(id: string, modifications?: Partial<BlogPostCreateData>): Promise<BlogPost> {
    try {
      const response = await apiClient.post(`${BLOG_ENDPOINTS.BASE}/${id}/duplicate`, modifications)
      return response.data
    } catch (error) {
      console.error('Error duplicating blog post:', error)
      throw error
    }
  }

  /**
   * Export blog post as PDF
   */
  static async exportBlogPostPDF(id: string): Promise<Blob> {
    try {
      const response = await apiClient.get(`${BLOG_ENDPOINTS.BASE}/${id}/pdf`, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting blog post PDF:', error)
      throw error
    }
  }

  /**
   * Bulk update blog posts (Admin only)
   */
  static async bulkUpdateBlogPosts(updates: Array<{ id: string; data: BlogPostUpdateData }>): Promise<BlogPost[]> {
    try {
      const response = await apiClient.patch(BLOG_ENDPOINTS.BULK_UPDATE, { updates })
      return response.data
    } catch (error) {
      console.error('Error bulk updating blog posts:', error)
      throw error
    }
  }

  /**
   * Bulk delete blog posts (Admin only)
   */
  static async bulkDeleteBlogPosts(ids: string[]): Promise<void> {
    try {
      await apiClient.delete(BLOG_ENDPOINTS.BULK_DELETE, { data: { ids } })
    } catch (error) {
      console.error('Error bulk deleting blog posts:', error)
      throw error
    }
  }

  /**
   * Export blog posts (Admin only)
   */
  static async exportBlogPosts(filters?: BlogPostFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(BLOG_ENDPOINTS.EXPORT, {
        params: filters,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting blog posts:', error)
      throw error
    }
  }
}

export default BlogApiService
