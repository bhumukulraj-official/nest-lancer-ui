/**
 * WebSocket Hook
 * Custom hook for WebSocket connection management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect, useRef } from 'react'

import { tokenService } from '../../services/auth/tokenService'
import WebSocketService from '../../services/websocket/socketClient'
import { WebSocketMessageType } from '../../types/models/message.types'

export interface WebSocketMessage {
  type: string
  data: any
  timestamp: string
}

export interface UseWebSocketOptions {
  autoConnect?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

export interface UseWebSocketReturn {
  // State
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  lastMessage: WebSocketMessage | null
  reconnectAttempts: number

  // Actions
  connect: () => void
  disconnect: () => void
  sendMessage: (type: WebSocketMessageType, data: any) => void
  subscribe: (eventType: string, callback: (data: any) => void) => void
  unsubscribe: (eventType: string, callback: (data: any) => void) => void
  clearError: () => void
}

export function useWebSocket(options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const {
    autoConnect = true,
    reconnectInterval = 5000,
    maxReconnectAttempts = 5
  } = options

  // State
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const [reconnectAttempts, setReconnectAttempts] = useState(0)

  // Refs
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const eventListenersRef = useRef<Map<string, Set<(data: any) => void>>>(new Map())

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (isConnected || isConnecting) return

    try {
      setIsConnecting(true)
      setError(null)

      const token = tokenService.getToken()
      if (!token) {
        throw new Error('No authentication token available')
      }

      WebSocketService.getInstance().connect(token)

      // Set up event listeners
      WebSocketService.getInstance().on('connect', () => {
        setIsConnected(true)
        setIsConnecting(false)
        setReconnectAttempts(0)
        console.log('WebSocket connected')
      })

      WebSocketService.getInstance().on('disconnect', () => {
        setIsConnected(false)
        setIsConnecting(false)
        console.log('WebSocket disconnected')
      })

      WebSocketService.getInstance().on('error', (err: any) => {
        setError(err.message || 'WebSocket connection error')
        setIsConnecting(false)
        console.error('WebSocket error:', err)
      })

      WebSocketService.getInstance().on('message', (message: WebSocketMessage) => {
        setLastMessage(message)
        
        // Trigger event listeners
        const listeners = eventListenersRef.current.get(message.type)
        if (listeners) {
          listeners.forEach(callback => callback(message.data))
        }
      })

      WebSocketService.getInstance().on('reconnect', (attempt: number) => {
        setReconnectAttempts(attempt)
        console.log(`WebSocket reconnecting... attempt ${attempt}`)
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to WebSocket'
      setError(errorMessage)
      setIsConnecting(false)
      console.error('Error connecting to WebSocket:', err)
    }
  }, [isConnected, isConnecting])

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    try {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }

      WebSocketService.getInstance().disconnect()
      setIsConnected(false)
      setIsConnecting(false)
      setReconnectAttempts(0)
      console.log('WebSocket disconnected')
    } catch (err) {
      console.error('Error disconnecting from WebSocket:', err)
    }
  }, [])

  // Send message
  const sendMessage = useCallback((type: WebSocketMessageType, data: any) => {
    if (!isConnected) {
      console.warn('WebSocket not connected. Cannot send message.')
      return
    }

    try {
      WebSocketService.getInstance().send(type, data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
      setError(errorMessage)
      console.error('Error sending WebSocket message:', err)
    }
  }, [isConnected])

  // Subscribe to event
  const subscribe = useCallback((eventType: string, callback: (data: any) => void) => {
    if (!eventListenersRef.current.has(eventType)) {
      eventListenersRef.current.set(eventType, new Set())
    }
    
    eventListenersRef.current.get(eventType)!.add(callback)
  }, [])

  // Unsubscribe from event
  const unsubscribe = useCallback((eventType: string, callback: (data: any) => void) => {
    const listeners = eventListenersRef.current.get(eventType)
    if (listeners) {
      listeners.delete(callback)
      
      if (listeners.size === 0) {
        eventListenersRef.current.delete(eventType)
      }
    }
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect()
    }

    // Cleanup on unmount
    return () => {
      disconnect()
    }
  }, [autoConnect, connect, disconnect])

  // Handle reconnection
  useEffect(() => {
    if (!isConnected && !isConnecting && reconnectAttempts < maxReconnectAttempts) {
      reconnectTimeoutRef.current = setTimeout(() => {
        setReconnectAttempts(prev => prev + 1)
        connect()
      }, reconnectInterval)
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [isConnected, isConnecting, reconnectAttempts, maxReconnectAttempts, reconnectInterval, connect])

  return {
    // State
    isConnected,
    isConnecting,
    error,
    lastMessage,
    reconnectAttempts,

    // Actions
    connect,
    disconnect,
    sendMessage,
    subscribe,
    unsubscribe,
    clearError
  }
}

export default useWebSocket
