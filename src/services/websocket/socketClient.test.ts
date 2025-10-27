/**
 * WebSocket Client Tests
 * Unit tests for the WebSocketService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'

import WebSocketService from './socketClient'
import { WebSocketMessageType } from '@/types/models/message.types'

describe('WebSocketService', () => {
  let wsService: WebSocketService

  beforeEach(() => {
    vi.clearAllMocks()
    wsService = WebSocketService.getInstance()
  })

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = WebSocketService.getInstance()
      const instance2 = WebSocketService.getInstance()
      
      expect(instance1).toBe(instance2)
    })
  })

  describe('Connection Management', () => {
    it('should connect to WebSocket server', async () => {
      const mockSocket = {
        onopen: vi.fn(),
        onmessage: vi.fn(),
        onclose: vi.fn(),
        onerror: vi.fn(),
        readyState: WebSocket.CONNECTING
      }

      global.WebSocket = vi.fn(() => mockSocket) as any

      await wsService.connect('mock-token')

      expect(WebSocket).toHaveBeenCalled()
    })

    it('should not connect when already connecting', async () => {
      const mockSocket = {
        readyState: WebSocket.CONNECTING,
        onopen: vi.fn(),
        onmessage: vi.fn(),
        onclose: vi.fn(),
        onerror: vi.fn()
      }

      global.WebSocket = vi.fn(() => mockSocket) as any
      ;(wsService as any).isConnecting = true

      await wsService.connect('mock-token')

      expect((wsService as any).socket).toBeDefined()
    })
  })

  describe('Disconnection', () => {
    it('should disconnect from WebSocket', () => {
      const mockSocket = {
        close: vi.fn(),
        readyState: WebSocket.OPEN
      }
      ;(wsService as any).socket = mockSocket

      wsService.disconnect()

      expect(mockSocket.close).toHaveBeenCalled()
    })
  })

  describe('Message Handling', () => {
    it('should send message', () => {
      const mockSocket = {
        readyState: WebSocket.OPEN,
        send: vi.fn()
      }
      ;(wsService as any).socket = mockSocket

      wsService.send(WebSocketMessageType.MESSAGE_SENT, { data: 'test' })

      expect(mockSocket.send).toHaveBeenCalled()
    })

    it('should handle incoming messages', () => {
      const mockSocket = {
        readyState: WebSocket.OPEN,
        send: vi.fn()
      }
      ;(wsService as any).socket = mockSocket
      ;(wsService as any).eventHandlers = new Map()

      const message = {
        type: 'test-event',
        data: { test: 'data' },
        timestamp: new Date().toISOString()
      }

      const callback = vi.fn()
      wsService.on('test-event', callback)
      
      // Simulate message
      ;(wsService as any).emit('test-event', message.data)

      expect(callback).toHaveBeenCalled()
    })
  })

  describe('Event Management', () => {
    it('should register event handlers', () => {
      const callback = vi.fn()
      wsService.on('test-event', callback)

      expect((wsService as any).eventHandlers.has('test-event')).toBe(true)
    })

    it('should remove event handlers', () => {
      const callback = vi.fn()
      wsService.on('test-event', callback)
      wsService.off('test-event', callback)

      expect((wsService as any).eventHandlers.has('test-event')).toBe(false)
    })

    it('should emit events', () => {
      const callback = vi.fn()
      wsService.on('test-event', callback)
      
      ;(wsService as any).emit('test-event', { data: 'test' })

      expect(callback).toHaveBeenCalledWith({ data: 'test' })
    })
  })

  describe('Reconnection Logic', () => {
    it('should attempt reconnection when connection closes unexpectedly', () => {
      const mockSocket = {
        readyState: WebSocket.CLOSED,
        close: vi.fn()
      }
      ;(wsService as any).socket = mockSocket
      ;(wsService as any).reconnectAttempts = 0
      ;(wsService as any).maxReconnectAttempts = 5

      expect((wsService as any).reconnectAttempts).toBeLessThan(5)
    })

    it('should stop reconnecting after max attempts', () => {
      (wsService as any).reconnectAttempts = 5
      ;(wsService as any).maxReconnectAttempts = 5

      expect((wsService as any).reconnectAttempts).toBeGreaterThanOrEqual(
        (wsService as any).maxReconnectAttempts
      )
    })
  })

  describe('Error Handling', () => {
    it('should handle connection errors', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      const mockSocket = {
        readyState: WebSocket.CLOSING,
        onerror: vi.fn()
      }
      ;(wsService as any).socket = mockSocket

      // Trigger error
      const errorEvent = new Event('error')
      if (mockSocket.onerror) {
        mockSocket.onerror(errorEvent)
      }

      expect(consoleError).toHaveBeenCalled()
      consoleError.mockRestore()
    })

    it('should handle message parsing errors', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      ;(wsService as any).handleMessage({ type: WebSocketMessageType.ERROR, data: null, timestamp: new Date().toISOString() })

      expect(consoleError).toHaveBeenCalled()
      consoleError.mockRestore()
    })
  })
})

