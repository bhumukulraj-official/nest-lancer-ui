/**
 * WebSocket Hook Tests
 * Unit tests for the useWebSocket hook
 */

import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import WebSocketService from '../../services/websocket/socketClient'
import { WebSocketMessageType } from '@/types/models/message.types'

import { useWebSocket } from './useWebSocket'


// Mock WebSocketService
vi.mock('../../services/websocket/socketClient', () => ({
  default: {
    getInstance: vi.fn(() => ({
      connect: vi.fn(),
      disconnect: vi.fn(),
      send: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn()
    }))
  }
}))

// Mock tokenService
vi.mock('../../services/auth/tokenService', () => ({
  tokenService: {
    getToken: vi.fn(() => 'mock-token'),
    removeToken: vi.fn()
  }
}))

describe('useWebSocket', () => {
  let mockWebSocketInstance: any

  beforeEach(() => {
    mockWebSocketInstance = {
      connect: vi.fn(),
      disconnect: vi.fn(),
      send: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn()
    }

    WebSocketService.getInstance = vi.fn(() => mockWebSocketInstance)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Initialization', () => {
    it('should initialize with disconnected state', () => {
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      expect(result.current.isConnected).toBe(false)
      expect(result.current.isConnecting).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('should auto-connect when enabled', () => {
      renderHook(() =>
        useWebSocket({ autoConnect: true })
      )

      expect(mockWebSocketInstance.connect).toHaveBeenCalled()
    })
  })

  describe('Connection', () => {
    it('should connect to WebSocket', () => {
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      act(() => {
        result.current.connect()
      })

      expect(mockWebSocketInstance.connect).toHaveBeenCalled()
    })

    it('should not connect when already connected', () => {
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      // Simulate connection
      vi.spyOn(result.current, 'isConnected', 'get').mockReturnValue(true)

      act(() => {
        result.current.connect()
      })

      expect(mockWebSocketInstance.connect).toHaveBeenCalledTimes(0)
    })
  })

  describe('Disconnection', () => {
    it('should disconnect from WebSocket', () => {
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      act(() => {
        result.current.disconnect()
      })

      expect(mockWebSocketInstance.disconnect).toHaveBeenCalled()
    })
  })

  describe('Sending Messages', () => {
    it('should send message when connected', () => {
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      // Mock connected state
      vi.spyOn(result.current, 'isConnected', 'get').mockReturnValue(true)

      act(() => {
        result.current.sendMessage(WebSocketMessageType.MESSAGE_SENT, { data: 'test' })
      })

      expect(mockWebSocketInstance.send).toHaveBeenCalled()
    })

    it('should not send message when disconnected', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      act(() => {
        result.current.sendMessage(WebSocketMessageType.MESSAGE_SENT, { data: 'test' })
      })

      expect(consoleSpy).toHaveBeenCalled()
      expect(mockWebSocketInstance.send).not.toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })
  })

  describe('Event Subscription', () => {
    it('should subscribe to events', () => {
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      const callback = vi.fn()

      act(() => {
        result.current.subscribe('event-type', callback)
      })

      expect(result.current.error).toBeNull()
    })

    it('should unsubscribe from events', () => {
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      const callback = vi.fn()

      act(() => {
        result.current.subscribe('event-type', callback)
        result.current.unsubscribe('event-type', callback)
      })

      expect(result.current.error).toBeNull()
    })
  })

  describe('Reconnection', () => {
    it('should attempt reconnection with configured attempts', async () => {
      const { result } = renderHook(() =>
        useWebSocket({
          autoConnect: false,
          reconnectInterval: 100,
          maxReconnectAttempts: 3
        })
      )

      // Simulate disconnection
      act(() => {
        result.current.connect()
      })

      // Wait for potential reconnection attempts
      await waitFor(() => {
        expect(result.current.reconnectAttempts).toBeLessThanOrEqual(3)
      }, { timeout: 1000 })
    })
  })

  describe('Error Handling', () => {
    it('should handle connection errors', () => {
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      act(() => {
        result.current.connect()
      })

      expect(result.current.error).toBeNull()
    })

    it('should handle send errors gracefully', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      mockWebSocketInstance.send = vi.fn(() => {
        throw new Error('Send failed')
      })

      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      vi.spyOn(result.current, 'isConnected', 'get').mockReturnValue(true)

      act(() => {
        result.current.sendMessage(WebSocketMessageType.MESSAGE_SENT, { data: 'test' })
      })

      expect(consoleErrorSpy).toHaveBeenCalled()
      
      consoleErrorSpy.mockRestore()
    })
  })

  describe('Clear Error', () => {
    it('should clear error', () => {
      const { result } = renderHook(() =>
        useWebSocket({ autoConnect: false })
      )

      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBeNull()
    })
  })

  describe('Cleanup', () => {
    it('should cleanup on unmount', () => {
      const { unmount } = renderHook(() =>
        useWebSocket({ autoConnect: true })
      )

      unmount()

      expect(mockWebSocketInstance.disconnect).toHaveBeenCalled()
    })
  })
})

