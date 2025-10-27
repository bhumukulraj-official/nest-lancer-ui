/**
 * Messaging API Service Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { apiClient } from '../api/client'

import messagingApiService from './messagingApiService'

vi.mock('../api/client')

describe('messagingApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch conversations', async () => {
    const mockConversations = [{ id: '1', participants: [] }]
    ;(apiClient.get as any).mockResolvedValue(mockConversations)

    const result = await messagingApiService.getConversations()

    expect(apiClient.get).toHaveBeenCalledWith('/conversations')
    expect(result).toEqual(mockConversations)
  })

  it('should send message', async () => {
    const messageData = { content: 'Test message', conversationId: 'conv1' }
    ;(apiClient.post as any).mockResolvedValue({ id: '1', ...messageData })

    const result = await messagingApiService.sendMessage('conv-123', messageData)

    expect(apiClient.post).toHaveBeenCalled()
    expect(result).toHaveProperty('id')
  })
})

