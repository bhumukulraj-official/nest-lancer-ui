/**
 * Messaging API Service
 * Handles all messaging-related API calls
 * UI-only service - no business logic processing
 */

import type {
  Message,
  Conversation,
  MessageCreateData,
  MessageUpdateData,
  MessageFilters,
  MessageSearchResult,
  ConversationCreateData,
  ConversationUpdateData,
  ConversationSearchResult,
  MessageStats,
  MessageNotification,
  ConversationSettings,
  MessageTemplate,
  MessageSearchFilters,
  MessageSearchResult as SearchResult,
  ConversationInvite
} from '../../types/models/message.types'
import { apiClient } from '../api/client'
import { MESSAGE_ENDPOINTS } from '../api/endpoints'

export class MessagingApiService {
  /**
   * Get all conversations
   */
  static async getConversations(filters?: any): Promise<ConversationSearchResult> {
    try {
      const response = await apiClient.get(MESSAGE_ENDPOINTS.CONVERSATIONS, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching conversations:', error)
      throw error
    }
  }

  /**
   * Get a single conversation by ID
   */
  static async getConversation(id: string): Promise<Conversation> {
    try {
      const response = await apiClient.get(MESSAGE_ENDPOINTS.CONVERSATION_DETAIL(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching conversation ${id}:`, error)
      throw error
    }
  }

  /**
   * Create a new conversation
   */
  static async createConversation(data: ConversationCreateData): Promise<Conversation> {
    try {
      const response = await apiClient.post(MESSAGE_ENDPOINTS.CONVERSATIONS, data)
      return response.data
    } catch (error) {
      console.error('Error creating conversation:', error)
      throw error
    }
  }

  /**
   * Update conversation
   */
  static async updateConversation(id: string, data: ConversationUpdateData): Promise<Conversation> {
    try {
      const response = await apiClient.put(MESSAGE_ENDPOINTS.CONVERSATION_DETAIL(id), data)
      return response.data
    } catch (error) {
      console.error(`Error updating conversation ${id}:`, error)
      throw error
    }
  }

  /**
   * Get messages for a conversation
   */
  static async getMessages(conversationId: string, filters?: MessageFilters): Promise<MessageSearchResult> {
    try {
      const response = await apiClient.get(MESSAGE_ENDPOINTS.MESSAGES(conversationId), {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching messages for conversation ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Create a new message
   */
  static async createMessage(conversationId: string, data: MessageCreateData): Promise<Message> {
    try {
      const formData = new FormData()
      formData.append('content', data.content)
      formData.append('type', data.type || 'text')

      if (data.replyTo) {
        formData.append('replyTo', data.replyTo)
      }

      if (data.attachments && data.attachments.length > 0) {
        data.attachments.forEach((file, index) => {
          formData.append(`attachments[${index}]`, file)
        })
      }

      const response = await apiClient.post(MESSAGE_ENDPOINTS.SEND_MESSAGE(conversationId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Error creating message in conversation ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Send a new message (alias for createMessage)
   */
  static async sendMessage(conversationId: string, data: MessageCreateData): Promise<Message> {
    return this.createMessage(conversationId, data)
  }

  /**
   * Update a message
   */
  static async updateMessage(messageId: string, data: MessageUpdateData): Promise<Message> {
    try {
      const response = await apiClient.put(`${MESSAGE_ENDPOINTS.MESSAGES('')}/${messageId}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating message ${messageId}:`, error)
      throw error
    }
  }

  /**
   * Delete a message
   */
  static async deleteMessage(messageId: string): Promise<void> {
    try {
      await apiClient.delete(`${MESSAGE_ENDPOINTS.MESSAGES('')}/${messageId}`)
    } catch (error) {
      console.error(`Error deleting message ${messageId}:`, error)
      throw error
    }
  }

  /**
   * Mark messages as read
   */
  static async markMessagesAsRead(conversationId: string): Promise<void> {
    try {
      await apiClient.post(MESSAGE_ENDPOINTS.MARK_READ(conversationId))
    } catch (error) {
      console.error(`Error marking messages as read for conversation ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Mark conversation as read (alias for markMessagesAsRead)
   */
  static async markConversationAsRead(conversationId: string): Promise<void> {
    return this.markMessagesAsRead(conversationId)
  }

  /**
   * Mark a specific message as read
   */
  static async markMessageAsRead(messageId: string): Promise<void> {
    try {
      await apiClient.post(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/messages/${messageId}/read`)
    } catch (error) {
      console.error(`Error marking message ${messageId} as read:`, error)
      throw error
    }
  }

  /**
   * Send typing indicator
   */
  static async sendTypingIndicator(conversationId: string, isTyping: boolean): Promise<void> {
    try {
      await apiClient.post(MESSAGE_ENDPOINTS.TYPING(conversationId), { isTyping })
    } catch (error) {
      console.error(`Error sending typing indicator for conversation ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Get message statistics
   */
  static async getMessageStats(): Promise<MessageStats> {
    try {
      const response = await apiClient.get(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching message stats:', error)
      throw error
    }
  }

  /**
   * Get notifications
   */
  static async getNotifications(): Promise<MessageNotification[]> {
    try {
      const response = await apiClient.get(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/notifications`)
      return response.data
    } catch (error) {
      console.error('Error fetching notifications:', error)
      throw error
    }
  }

  /**
   * Mark notification as read
   */
  static async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await apiClient.post(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/notifications/${notificationId}/read`)
    } catch (error) {
      console.error(`Error marking notification ${notificationId} as read:`, error)
      throw error
    }
  }

  /**
   * Search messages
   */
  static async searchMessages(filters: MessageSearchFilters): Promise<SearchResult> {
    try {
      const response = await apiClient.post(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/search`, filters)
      return response.data
    } catch (error) {
      console.error('Error searching messages:', error)
      throw error
    }
  }

  /**
   * Get conversation settings
   */
  static async getConversationSettings(conversationId: string): Promise<ConversationSettings> {
    try {
      const response = await apiClient.get(`${MESSAGE_ENDPOINTS.CONVERSATION_DETAIL(conversationId)}/settings`)
      return response.data
    } catch (error) {
      console.error(`Error fetching conversation settings for ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Update conversation settings
   */
  static async updateConversationSettings(conversationId: string, settings: Partial<ConversationSettings>): Promise<ConversationSettings> {
    try {
      const response = await apiClient.put(`${MESSAGE_ENDPOINTS.CONVERSATION_DETAIL(conversationId)}/settings`, settings)
      return response.data
    } catch (error) {
      console.error(`Error updating conversation settings for ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Get message templates
   */
  static async getMessageTemplates(): Promise<MessageTemplate[]> {
    try {
      const response = await apiClient.get(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/templates`)
      return response.data
    } catch (error) {
      console.error('Error fetching message templates:', error)
      throw error
    }
  }

  /**
   * Create message template
   */
  static async createMessageTemplate(template: Omit<MessageTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<MessageTemplate> {
    try {
      const response = await apiClient.post(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/templates`, template)
      return response.data
    } catch (error) {
      console.error('Error creating message template:', error)
      throw error
    }
  }

  /**
   * Update message template
   */
  static async updateMessageTemplate(templateId: string, template: Partial<MessageTemplate>): Promise<MessageTemplate> {
    try {
      const response = await apiClient.put(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/templates/${templateId}`, template)
      return response.data
    } catch (error) {
      console.error(`Error updating message template ${templateId}:`, error)
      throw error
    }
  }

  /**
   * Delete message template
   */
  static async deleteMessageTemplate(templateId: string): Promise<void> {
    try {
      await apiClient.delete(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/templates/${templateId}`)
    } catch (error) {
      console.error(`Error deleting message template ${templateId}:`, error)
      throw error
    }
  }

  /**
   * Upload file attachment
   */
  static async uploadAttachment(file: File, conversationId: string): Promise<any> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('conversationId', conversationId)

      const response = await apiClient.post(`${MESSAGE_ENDPOINTS.CONVERSATION_DETAIL(conversationId)}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Error uploading attachment for conversation ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Get file attachment
   */
  static async getAttachment(conversationId: string, attachmentId: string): Promise<Blob> {
    try {
      const response = await apiClient.get(`${MESSAGE_ENDPOINTS.CONVERSATION_DETAIL(conversationId)}/attachments/${attachmentId}`, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching attachment ${attachmentId} for conversation ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Delete file attachment
   */
  static async deleteAttachment(conversationId: string, attachmentId: string): Promise<void> {
    try {
      await apiClient.delete(`${MESSAGE_ENDPOINTS.CONVERSATION_DETAIL(conversationId)}/attachments/${attachmentId}`)
    } catch (error) {
      console.error(`Error deleting attachment ${attachmentId} for conversation ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Invite user to conversation
   */
  static async inviteToConversation(conversationId: string, inviteData: { email: string; name?: string }): Promise<ConversationInvite> {
    try {
      const response = await apiClient.post(`${MESSAGE_ENDPOINTS.CONVERSATION_DETAIL(conversationId)}/invites`, inviteData)
      return response.data
    } catch (error) {
      console.error(`Error inviting user to conversation ${conversationId}:`, error)
      throw error
    }
  }

  /**
   * Accept conversation invite
   */
  static async acceptConversationInvite(inviteId: string): Promise<Conversation> {
    try {
      const response = await apiClient.post(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/invites/${inviteId}/accept`)
      return response.data
    } catch (error) {
      console.error(`Error accepting conversation invite ${inviteId}:`, error)
      throw error
    }
  }

  /**
   * Decline conversation invite
   */
  static async declineConversationInvite(inviteId: string): Promise<void> {
    try {
      await apiClient.post(`${MESSAGE_ENDPOINTS.CONVERSATIONS}/invites/${inviteId}/decline`)
    } catch (error) {
      console.error(`Error declining conversation invite ${inviteId}:`, error)
      throw error
    }
  }
}

export default MessagingApiService
