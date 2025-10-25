/**
 * WebSocket Service
 * Handles real-time messaging via WebSocket connection
 * UI-only service for real-time communication
 */

import type {
  WebSocketMessage,
  Message
} from '../../types/models/message.types'
import { WebSocketMessageType } from '../../types/models/message.types'

export class WebSocketService {
  private static instance: WebSocketService | null = null
  private socket: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectInterval = 1000
  private isConnecting = false
  private eventHandlers: Map<string, Function[]> = new Map()

  private constructor() {}

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  /**
   * Connect to WebSocket server
   */
  async connect(token: string): Promise<void> {
    if (this.socket?.readyState === WebSocket.OPEN || this.isConnecting) {
      return
    }

    this.isConnecting = true

    try {
      const wsUrl = `${process.env.REACT_APP_WS_URL || 'ws://localhost:3001'}/ws?token=${token}`
      this.socket = new WebSocket(wsUrl)

      this.socket.onopen = () => {
        console.log('WebSocket connected')
        this.isConnecting = false
        this.reconnectAttempts = 0
        this.emit(WebSocketMessageType.CONNECTION_ESTABLISHED, {})
      }

      this.socket.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          this.handleMessage(message)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      this.socket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason)
        this.isConnecting = false
        this.emit(WebSocketMessageType.CONNECTION_LOST, { code: event.code, reason: event.reason })
        
        if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect(token)
        }
      }

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error)
        this.isConnecting = false
        this.emit(WebSocketMessageType.ERROR, error)
      }
    } catch (error) {
      this.isConnecting = false
      console.error('Error connecting to WebSocket:', error)
      throw error
    }
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.close(1000, 'Client disconnect')
      this.socket = null
    }
  }

  /**
   * Send message via WebSocket
   */
  send(type: WebSocketMessageType, data: any, conversationId?: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type,
        data,
        timestamp: new Date().toISOString(),
        conversationId
      }
      this.socket.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket is not connected')
    }
  }

  /**
   * Subscribe to WebSocket events
   */
  on(eventType: string, handler: Function): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, [])
    }
    this.eventHandlers.get(eventType)!.push(handler)
  }

  /**
   * Unsubscribe from WebSocket events
   */
  off(eventType: string, handler: Function): void {
    const handlers = this.eventHandlers.get(eventType)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  /**
   * Emit event to subscribers
   */
  private emit(eventType: string, data: any): void {
    const handlers = this.eventHandlers.get(eventType)
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data)
        } catch (error) {
          console.error('Error in WebSocket event handler:', error)
        }
      })
    }
  }

  /**
   * Handle incoming WebSocket messages
   */
  private handleMessage(message: WebSocketMessage): void {
    switch (message.type) {
      case WebSocketMessageType.MESSAGE_SENT:
        this.emit('messageSent', message.data)
        break
      case WebSocketMessageType.MESSAGE_RECEIVED:
        this.emit('messageReceived', message.data)
        break
      case WebSocketMessageType.MESSAGE_READ:
        this.emit('messageRead', message.data)
        break
      case WebSocketMessageType.TYPING_START:
        this.emit('typingStart', message.data)
        break
      case WebSocketMessageType.TYPING_STOP:
        this.emit('typingStop', message.data)
        break
      case WebSocketMessageType.USER_ONLINE:
        this.emit('userOnline', message.data)
        break
      case WebSocketMessageType.USER_OFFLINE:
        this.emit('userOffline', message.data)
        break
      case WebSocketMessageType.CONVERSATION_UPDATED:
        this.emit('conversationUpdated', message.data)
        break
      case WebSocketMessageType.ERROR:
        this.emit('error', message.data)
        break
      default:
        console.warn('Unknown WebSocket message type:', message.type)
    }
  }

  /**
   * Schedule reconnection attempt
   */
  private scheduleReconnect(token: string): void {
    this.reconnectAttempts++
    const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1)
    
    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      this.connect(token)
    }, delay)
  }

  /**
   * Check if WebSocket is connected
   */
  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN
  }

  /**
   * Get connection state
   */
  getConnectionState(): number {
    return this.socket?.readyState || WebSocket.CLOSED
  }

  /**
   * Send typing indicator
   */
  sendTypingIndicator(conversationId: string, isTyping: boolean): void {
    this.send(WebSocketMessageType.TYPING_START, { isTyping }, conversationId)
  }

  /**
   * Send message read status
   */
  sendMessageRead(messageId: string, conversationId: string): void {
    this.send(WebSocketMessageType.MESSAGE_READ, { messageId }, conversationId)
  }

  /**
   * Send new message
   */
  sendMessage(message: Message): void {
    this.send(WebSocketMessageType.MESSAGE_SENT, message, message.conversationId)
  }

  /**
   * Join conversation room
   */
  joinConversation(conversationId: string): void {
    this.send(WebSocketMessageType.CONVERSATION_UPDATED, { action: 'join', conversationId }, conversationId)
  }

  /**
   * Leave conversation room
   */
  leaveConversation(conversationId: string): void {
    this.send(WebSocketMessageType.CONVERSATION_UPDATED, { action: 'leave', conversationId }, conversationId)
  }

  /**
   * Get connection info
   */
  getConnectionInfo(): {
    isConnected: boolean
    state: number
    reconnectAttempts: number
    maxReconnectAttempts: number
  } {
    return {
      isConnected: this.isConnected(),
      state: this.getConnectionState(),
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts
    }
  }
}

export default WebSocketService
