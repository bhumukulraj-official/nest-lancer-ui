/**
 * Messaging Hook
 * Custom hook for messaging functionality
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'
import { MessagingApiService } from '../../services/messaging/messagingApiService'
import type {
  Message,
  Conversation,
  MessageCreateData,
  ConversationCreateData
} from '../../types/models/message.types'

export interface UseMessagingOptions {
  autoFetch?: boolean
  userId?: string
}

export interface UseMessagingReturn {
  // State
  conversations: Conversation[]
  currentConversation: Conversation | null
  messages: Message[]
  loading: boolean
  error: string | null
  unreadCount: number

  // Actions
  fetchConversations: () => Promise<void>
  fetchConversation: (id: string) => Promise<void>
  fetchMessages: (conversationId: string) => Promise<void>
  createConversation: (data: ConversationCreateData) => Promise<Conversation>
  sendMessage: (conversationId: string, data: MessageCreateData) => Promise<Message>
  markAsRead: (conversationId: string) => Promise<void>
  markMessageAsRead: (messageId: string) => Promise<void>
  setCurrentConversation: (conversation: Conversation | null) => void
  clearError: () => void
  refresh: () => Promise<void>
}

export function useMessaging(options: UseMessagingOptions = {}): UseMessagingReturn {
  const { autoFetch = true, userId } = options

  // State
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await MessagingApiService.getConversations()
      setConversations(result.data)
      setUnreadCount(result.unreadCount || 0)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch conversations'
      setError(errorMessage)
      console.error('Error fetching conversations:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch single conversation
  const fetchConversation = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const conversation = await MessagingApiService.getConversation(id)
      setCurrentConversation(conversation)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch conversation'
      setError(errorMessage)
      console.error('Error fetching conversation:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch messages
  const fetchMessages = useCallback(async (conversationId: string) => {
    try {
      setLoading(true)
      setError(null)

      const result = await MessagingApiService.getMessages(conversationId)
      setMessages(result.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages'
      setError(errorMessage)
      console.error('Error fetching messages:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create conversation
  const createConversation = useCallback(async (data: ConversationCreateData): Promise<Conversation> => {
    try {
      setLoading(true)
      setError(null)

      const conversation = await MessagingApiService.createConversation(data)
      setConversations(prev => [conversation, ...prev])
      setCurrentConversation(conversation)
      
      return conversation
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create conversation'
      setError(errorMessage)
      console.error('Error creating conversation:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Send message
  const sendMessage = useCallback(async (conversationId: string, data: MessageCreateData): Promise<Message> => {
    try {
      setLoading(true)
      setError(null)

      const message = await MessagingApiService.createMessage(conversationId, data)
      setMessages(prev => [...prev, message])
      
      return message
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
      setError(errorMessage)
      console.error('Error sending message:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Mark conversation as read
  const markAsRead = useCallback(async (conversationId: string) => {
    try {
      await MessagingApiService.markConversationAsRead(conversationId)
      
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      ))
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(prev => prev ? { ...prev, unreadCount: 0 } : null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark conversation as read'
      setError(errorMessage)
      console.error('Error marking conversation as read:', err)
    }
  }, [currentConversation])

  // Mark message as read
  const markMessageAsRead = useCallback(async (messageId: string) => {
    try {
      await MessagingApiService.markMessageAsRead(messageId)
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      ))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark message as read'
      setError(errorMessage)
      console.error('Error marking message as read:', err)
    }
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Refresh
  const refresh = useCallback(async () => {
    await fetchConversations()
  }, [fetchConversations])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchConversations()
    }
  }, [autoFetch, fetchConversations])

  return {
    // State
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    unreadCount,

    // Actions
    fetchConversations,
    fetchConversation,
    fetchMessages,
    createConversation,
    sendMessage,
    markAsRead,
    markMessageAsRead,
    setCurrentConversation,
    clearError,
    refresh
  }
}

export default useMessaging
