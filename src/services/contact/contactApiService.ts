/**
 * Contact API Service
 * Handles all contact-related API calls
 * UI-only service - no business logic processing
 */

import { apiClient } from '../api/client'
import { CONTACT_ENDPOINTS } from '../api/endpoints'
import type {
  ContactMessage,
  ContactMessageCreateData,
  ContactMessageUpdateData,
  ContactMessageFilters,
  ContactMessageSearchResult,
  ContactMessageStats,
  ContactMessageStatus,
  ContactMessagePriority,
  ContactMessageCategory,
  ContactMessageResponse,
  ContactMessageAttachment,
  ContactMessageAnalytics,
  ContactForm,
  ContactFormSubmission,
  ContactFormAnalytics,
  ContactSettings,
  ContactTemplate
} from '../../types/models/contact.types'

export class ContactApiService {
  /**
   * Get all contact messages with optional filtering
   */
  static async getContactMessages(filters?: ContactMessageFilters): Promise<ContactMessageSearchResult> {
    try {
      const response = await apiClient.get(CONTACT_ENDPOINTS.MESSAGES, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      throw error
    }
  }

  /**
   * Get a single contact message by ID
   */
  static async getContactMessage(id: string): Promise<ContactMessage> {
    try {
      const response = await apiClient.get(`${CONTACT_ENDPOINTS.MESSAGES}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching contact message:', error)
      throw error
    }
  }

  /**
   * Create a new contact message
   */
  static async createContactMessage(messageData: ContactMessageCreateData): Promise<ContactMessage> {
    try {
      const response = await apiClient.post(CONTACT_ENDPOINTS.MESSAGES, messageData)
      return response.data
    } catch (error) {
      console.error('Error creating contact message:', error)
      throw error
    }
  }

  /**
   * Update contact message
   */
  static async updateContactMessage(id: string, messageData: ContactMessageUpdateData): Promise<ContactMessage> {
    try {
      const response = await apiClient.put(`${CONTACT_ENDPOINTS.MESSAGES}/${id}`, messageData)
      return response.data
    } catch (error) {
      console.error('Error updating contact message:', error)
      throw error
    }
  }

  /**
   * Delete contact message
   */
  static async deleteContactMessage(id: string): Promise<void> {
    try {
      await apiClient.delete(`${CONTACT_ENDPOINTS.MESSAGES}/${id}`)
    } catch (error) {
      console.error('Error deleting contact message:', error)
      throw error
    }
  }

  /**
   * Update contact message status
   */
  static async updateContactMessageStatus(id: string, status: ContactMessageStatus): Promise<ContactMessage> {
    try {
      const response = await apiClient.patch(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating contact message status:', error)
      throw error
    }
  }

  /**
   * Update contact message priority
   */
  static async updateContactMessagePriority(id: string, priority: ContactMessagePriority): Promise<ContactMessage> {
    try {
      const response = await apiClient.patch(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/priority`, { priority })
      return response.data
    } catch (error) {
      console.error('Error updating contact message priority:', error)
      throw error
    }
  }

  /**
   * Update contact message category
   */
  static async updateContactMessageCategory(id: string, category: ContactMessageCategory): Promise<ContactMessage> {
    try {
      const response = await apiClient.patch(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/category`, { category })
      return response.data
    } catch (error) {
      console.error('Error updating contact message category:', error)
      throw error
    }
  }

  /**
   * Assign contact message to user
   */
  static async assignContactMessage(id: string, assigneeId: string): Promise<ContactMessage> {
    try {
      const response = await apiClient.patch(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/assign`, { assigneeId })
      return response.data
    } catch (error) {
      console.error('Error assigning contact message:', error)
      throw error
    }
  }

  /**
   * Unassign contact message
   */
  static async unassignContactMessage(id: string): Promise<ContactMessage> {
    try {
      const response = await apiClient.patch(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/unassign`)
      return response.data
    } catch (error) {
      console.error('Error unassigning contact message:', error)
      throw error
    }
  }

  /**
   * Add contact message response
   */
  static async addContactMessageResponse(id: string, response: ContactMessageResponse): Promise<ContactMessage> {
    try {
      const apiResponse = await apiClient.post(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/responses`, response)
      return apiResponse.data
    } catch (error) {
      console.error('Error adding contact message response:', error)
      throw error
    }
  }

  /**
   * Update contact message response
   */
  static async updateContactMessageResponse(id: string, responseId: string, response: Partial<ContactMessageResponse>): Promise<ContactMessage> {
    try {
      const apiResponse = await apiClient.put(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/responses/${responseId}`, response)
      return apiResponse.data
    } catch (error) {
      console.error('Error updating contact message response:', error)
      throw error
    }
  }

  /**
   * Delete contact message response
   */
  static async deleteContactMessageResponse(id: string, responseId: string): Promise<ContactMessage> {
    try {
      const response = await apiClient.delete(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/responses/${responseId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting contact message response:', error)
      throw error
    }
  }

  /**
   * Upload contact message attachment
   */
  static async uploadContactMessageAttachment(id: string, file: File): Promise<ContactMessageAttachment> {
    try {
      const formData = new FormData()
      formData.append('attachment', file)
      
      const response = await apiClient.post(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading contact message attachment:', error)
      throw error
    }
  }

  /**
   * Delete contact message attachment
   */
  static async deleteContactMessageAttachment(id: string, attachmentId: string): Promise<ContactMessage> {
    try {
      const response = await apiClient.delete(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/attachments/${attachmentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting contact message attachment:', error)
      throw error
    }
  }

  /**
   * Mark contact message as read
   */
  static async markContactMessageAsRead(id: string): Promise<ContactMessage> {
    try {
      const response = await apiClient.patch(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/read`)
      return response.data
    } catch (error) {
      console.error('Error marking contact message as read:', error)
      throw error
    }
  }

  /**
   * Mark contact message as unread
   */
  static async markContactMessageAsUnread(id: string): Promise<ContactMessage> {
    try {
      const response = await apiClient.patch(`${CONTACT_ENDPOINTS.MESSAGES}/${id}/unread`)
      return response.data
    } catch (error) {
      console.error('Error marking contact message as unread:', error)
      throw error
    }
  }

  /**
   * Mark all contact messages as read
   */
  static async markAllContactMessagesAsRead(): Promise<void> {
    try {
      await apiClient.patch(CONTACT_ENDPOINTS.MARK_ALL_READ)
    } catch (error) {
      console.error('Error marking all contact messages as read:', error)
      throw error
    }
  }

  /**
   * Get contact message statistics
   */
  static async getContactMessageStats(filters?: ContactMessageFilters): Promise<ContactMessageStats> {
    try {
      const response = await apiClient.get(CONTACT_ENDPOINTS.STATS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching contact message stats:', error)
      throw error
    }
  }

  /**
   * Get contact message analytics
   */
  static async getContactMessageAnalytics(filters?: ContactMessageFilters): Promise<ContactMessageAnalytics> {
    try {
      const response = await apiClient.get(CONTACT_ENDPOINTS.ANALYTICS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching contact message analytics:', error)
      throw error
    }
  }

  /**
   * Search contact messages
   */
  static async searchContactMessages(query: string, filters?: ContactMessageFilters): Promise<ContactMessageSearchResult> {
    try {
      const response = await apiClient.get(CONTACT_ENDPOINTS.SEARCH, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching contact messages:', error)
      throw error
    }
  }

  /**
   * Get contact forms
   */
  static async getContactForms(): Promise<ContactForm[]> {
    try {
      const response = await apiClient.get(CONTACT_ENDPOINTS.FORMS)
      return response.data
    } catch (error) {
      console.error('Error fetching contact forms:', error)
      throw error
    }
  }

  /**
   * Get a single contact form by ID
   */
  static async getContactForm(id: string): Promise<ContactForm> {
    try {
      const response = await apiClient.get(`${CONTACT_ENDPOINTS.FORMS}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching contact form:', error)
      throw error
    }
  }

  /**
   * Create contact form
   */
  static async createContactForm(formData: ContactForm): Promise<ContactForm> {
    try {
      const response = await apiClient.post(CONTACT_ENDPOINTS.FORMS, formData)
      return response.data
    } catch (error) {
      console.error('Error creating contact form:', error)
      throw error
    }
  }

  /**
   * Update contact form
   */
  static async updateContactForm(id: string, formData: Partial<ContactForm>): Promise<ContactForm> {
    try {
      const response = await apiClient.put(`${CONTACT_ENDPOINTS.FORMS}/${id}`, formData)
      return response.data
    } catch (error) {
      console.error('Error updating contact form:', error)
      throw error
    }
  }

  /**
   * Delete contact form
   */
  static async deleteContactForm(id: string): Promise<void> {
    try {
      await apiClient.delete(`${CONTACT_ENDPOINTS.FORMS}/${id}`)
    } catch (error) {
      console.error('Error deleting contact form:', error)
      throw error
    }
  }

  /**
   * Submit contact form
   */
  static async submitContactForm(formId: string, submission: ContactFormSubmission): Promise<ContactMessage> {
    try {
      const response = await apiClient.post(`${CONTACT_ENDPOINTS.FORMS}/${formId}/submit`, submission)
      return response.data
    } catch (error) {
      console.error('Error submitting contact form:', error)
      throw error
    }
  }

  /**
   * Get contact form submissions
   */
  static async getContactFormSubmissions(formId: string, filters?: any): Promise<ContactFormSubmission[]> {
    try {
      const response = await apiClient.get(`${CONTACT_ENDPOINTS.FORMS}/${formId}/submissions`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching contact form submissions:', error)
      throw error
    }
  }

  /**
   * Get contact form analytics
   */
  static async getContactFormAnalytics(formId: string): Promise<ContactFormAnalytics> {
    try {
      const response = await apiClient.get(`${CONTACT_ENDPOINTS.FORMS}/${formId}/analytics`)
      return response.data
    } catch (error) {
      console.error('Error fetching contact form analytics:', error)
      throw error
    }
  }

  /**
   * Get contact settings
   */
  static async getContactSettings(): Promise<ContactSettings> {
    try {
      const response = await apiClient.get(CONTACT_ENDPOINTS.SETTINGS)
      return response.data
    } catch (error) {
      console.error('Error fetching contact settings:', error)
      throw error
    }
  }

  /**
   * Update contact settings
   */
  static async updateContactSettings(settings: ContactSettings): Promise<ContactSettings> {
    try {
      const response = await apiClient.put(CONTACT_ENDPOINTS.SETTINGS, settings)
      return response.data
    } catch (error) {
      console.error('Error updating contact settings:', error)
      throw error
    }
  }

  /**
   * Get contact templates
   */
  static async getContactTemplates(): Promise<ContactTemplate[]> {
    try {
      const response = await apiClient.get(CONTACT_ENDPOINTS.TEMPLATES)
      return response.data
    } catch (error) {
      console.error('Error fetching contact templates:', error)
      throw error
    }
  }

  /**
   * Create contact template
   */
  static async createContactTemplate(template: ContactTemplate): Promise<ContactTemplate> {
    try {
      const response = await apiClient.post(CONTACT_ENDPOINTS.TEMPLATES, template)
      return response.data
    } catch (error) {
      console.error('Error creating contact template:', error)
      throw error
    }
  }

  /**
   * Update contact template
   */
  static async updateContactTemplate(templateId: string, template: Partial<ContactTemplate>): Promise<ContactTemplate> {
    try {
      const response = await apiClient.put(`${CONTACT_ENDPOINTS.TEMPLATES}/${templateId}`, template)
      return response.data
    } catch (error) {
      console.error('Error updating contact template:', error)
      throw error
    }
  }

  /**
   * Delete contact template
   */
  static async deleteContactTemplate(templateId: string): Promise<void> {
    try {
      await apiClient.delete(`${CONTACT_ENDPOINTS.TEMPLATES}/${templateId}`)
    } catch (error) {
      console.error('Error deleting contact template:', error)
      throw error
    }
  }

  /**
   * Bulk update contact messages (Admin only)
   */
  static async bulkUpdateContactMessages(updates: Array<{ id: string; data: ContactMessageUpdateData }>): Promise<ContactMessage[]> {
    try {
      const response = await apiClient.patch(CONTACT_ENDPOINTS.BULK_UPDATE, { updates })
      return response.data
    } catch (error) {
      console.error('Error bulk updating contact messages:', error)
      throw error
    }
  }

  /**
   * Bulk delete contact messages (Admin only)
   */
  static async bulkDeleteContactMessages(ids: string[]): Promise<void> {
    try {
      await apiClient.delete(CONTACT_ENDPOINTS.BULK_DELETE, { data: { ids } })
    } catch (error) {
      console.error('Error bulk deleting contact messages:', error)
      throw error
    }
  }

  /**
   * Export contact messages (Admin only)
   */
  static async exportContactMessages(filters?: ContactMessageFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(CONTACT_ENDPOINTS.EXPORT, {
        params: filters,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting contact messages:', error)
      throw error
    }
  }

  /**
   * Get unread contact message count
   */
  static async getUnreadContactMessageCount(): Promise<{ count: number }> {
    try {
      const response = await apiClient.get(CONTACT_ENDPOINTS.UNREAD_COUNT)
      return response.data
    } catch (error) {
      console.error('Error fetching unread contact message count:', error)
      throw error
    }
  }
}

export default ContactApiService
