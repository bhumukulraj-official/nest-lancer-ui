/**
 * Notification Store Tests
 * Tests for notification state management with Zustand
 */

import { describe, it, expect, beforeEach } from 'vitest'

import { useNotificationStore } from './notificationStore'

describe('Notification Store', () => {
  beforeEach(() => {
    // Reset store to initial state
    useNotificationStore.setState({
      notifications: [],
      unreadCount: 0,
    })
  })

  describe('Notifications', () => {
    it('should add notification', () => {
      const notification = {
        id: '1',
        title: 'Test Notification',
        message: 'This is a test',
        type: 'success' as const,
        timestamp: new Date().toISOString(),
        read: false,
      }

      useNotificationStore.getState().addNotification(notification)

      const state = useNotificationStore.getState()
      expect(state.notifications).toHaveLength(1)
      expect(state.notifications[0]).toEqual(notification)
    })

    it('should remove notification', () => {
      const notification = {
        id: '1',
        title: 'Test',
        message: 'Test',
        type: 'info' as const,
        timestamp: new Date().toISOString(),
        read: false,
      }

      useNotificationStore.getState().addNotification(notification)
      useNotificationStore.getState().removeNotification('1')

      const state = useNotificationStore.getState()
      expect(state.notifications).toHaveLength(0)
    })

    it('should mark notification as read', () => {
      const notification = {
        id: '1',
        title: 'Test',
        message: 'Test',
        type: 'info' as const,
        timestamp: new Date().toISOString(),
        read: false,
      }

      useNotificationStore.getState().addNotification(notification)
      useNotificationStore.getState().markAsRead('1')

      const state = useNotificationStore.getState()
      expect(state.notifications[0].read).toBe(true)
    })

    it('should clear all notifications', () => {
      useNotificationStore.getState().addNotification({
        id: '1',
        title: 'Test',
        message: 'Test',
        type: 'info' as const,
        timestamp: new Date().toISOString(),
        read: false,
      })

      useNotificationStore.getState().clearAllNotifications()

      const state = useNotificationStore.getState()
      expect(state.notifications).toHaveLength(0)
    })
  })

  describe('Convenience Methods', () => {
    it('should show success notification', () => {
      useNotificationStore.getState().showSuccess('Success!', 'Operation successful')

      const state = useNotificationStore.getState()
      expect(state.notifications).toHaveLength(1)
      expect(state.notifications[0].type).toBe('success')
    })

    it('should show error notification', () => {
      useNotificationStore.getState().showError('Error!', 'Operation failed')

      const state = useNotificationStore.getState()
      expect(state.notifications).toHaveLength(1)
      expect(state.notifications[0].type).toBe('error')
    })

    it('should show info notification', () => {
      useNotificationStore.getState().showInfo('Info', 'This is info')

      const state = useNotificationStore.getState()
      expect(state.notifications).toHaveLength(1)
      expect(state.notifications[0].type).toBe('info')
    })

    it('should show warning notification', () => {
      useNotificationStore.getState().showWarning('Warning', 'This is a warning')

      const state = useNotificationStore.getState()
      expect(state.notifications).toHaveLength(1)
      expect(state.notifications[0].type).toBe('warning')
    })
  })

  describe('Unread Count', () => {
    it('should calculate unread count', () => {
      useNotificationStore.getState().addNotification({
        id: '1',
        title: 'Test',
        message: 'Test',
        type: 'info',
        timestamp: new Date().toISOString(),
        read: false,
      })

      useNotificationStore.getState().addNotification({
        id: '2',
        title: 'Test',
        message: 'Test',
        type: 'info',
        timestamp: new Date().toISOString(),
        read: false,
      })

      expect(useNotificationStore.getState().unreadCount).toBe(2)
    })

    it('should decrease unread count when marked as read', () => {
      useNotificationStore.getState().addNotification({
        id: '1',
        title: 'Test',
        message: 'Test',
        type: 'info',
        timestamp: new Date().toISOString(),
        read: false,
      })

      expect(useNotificationStore.getState().unreadCount).toBe(1)

      useNotificationStore.getState().markAsRead('1')

      expect(useNotificationStore.getState().unreadCount).toBe(0)
    })
  })
})

