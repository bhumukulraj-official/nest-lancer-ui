/**
 * Notification API Service Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { apiClient } from '../api/client'

import notificationApiService from './notificationApiService'

vi.mock('../api/client')

describe('notificationApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch notifications', async () => {
    const mockNotifications = [{ id: '1', title: 'Notification' }]
    ;(apiClient.get as any).mockResolvedValue(mockNotifications)

    const result = await notificationApiService.getNotifications()

    expect(apiClient.get).toHaveBeenCalledWith('/notifications')
    expect(result).toEqual(mockNotifications)
  })

  it('should mark notification as read', async () => {
    (apiClient.put as any).mockResolvedValue({ success: true })

    await notificationApiService.markAsRead('1')

    expect(apiClient.put).toHaveBeenCalledWith('/notifications/1/read')
  })
})

