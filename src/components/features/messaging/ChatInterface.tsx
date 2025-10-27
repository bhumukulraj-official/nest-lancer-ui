/**
 * ChatInterface Component
 * Main chat interface for conversations
 */

import {
  Send,
  AttachFile,
  EmojiEmotions,
  Phone,
  VideoCall,
  Info,
  Close
} from '@mui/icons-material'
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Stack,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Tooltip
} from '@mui/material'
import React, { useState, useEffect, useRef, useCallback } from 'react'


import { useAuth } from '../../../hooks/auth/useAuth'
import { MessagingApiService } from '../../../services/messaging'
import { WebSocketService } from '../../../services/websocket'
import type {
  Message,
  Conversation,
  MessageCreateData,
  TypingIndicator
} from '../../../types/models/message.types'
import { MessageType } from '../../../types/models/message.types'

import MessageBubble from './MessageBubble'

interface ChatInterfaceProps {
  conversation: Conversation
  onClose?: () => void
  showHeader?: boolean
  showActions?: boolean
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversation,
  onClose,
  showHeader = true,
  showActions = true
}) => {
  const { user } = useAuth()

  // State management
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([])
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [hasMoreMessages, setHasMoreMessages] = useState(true)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const wsService = useRef(WebSocketService.getInstance())

  // Load messages on conversation change
  useEffect(() => {
    if (conversation.id) {
      loadMessages()
      joinConversation()
    }
    return () => {
      leaveConversation()
    }
  }, [conversation.id])

  // Setup WebSocket event listeners
  useEffect(() => {
    const ws = wsService.current

    const handleMessageReceived = (message: Message) => {
      if (message.conversationId === conversation.id) {
        setMessages(prev => [...prev, message])
        scrollToBottom()
      }
    }

    const handleTypingStart = (data: TypingIndicator) => {
      if (data.conversationId === conversation.id && data.userId !== user?.id) {
        setTypingUsers(prev => {
          const filtered = prev.filter(t => t.userId !== data.userId)
          return [...filtered, data]
        })
      }
    }

    const handleTypingStop = (data: TypingIndicator) => {
      if (data.conversationId === conversation.id) {
        setTypingUsers(prev => prev.filter(t => t.userId !== data.userId))
      }
    }

    const handleMessageRead = (data: any) => {
      if (data.conversationId === conversation.id) {
        setMessages(prev => prev.map(msg => 
          msg.id === data.messageId ? { ...msg, isRead: true, readAt: data.readAt } : msg
        ))
      }
    }

    ws.on('messageReceived', handleMessageReceived)
    ws.on('typingStart', handleTypingStart)
    ws.on('typingStop', handleTypingStop)
    ws.on('messageRead', handleMessageRead)

    return () => {
      ws.off('messageReceived', handleMessageReceived)
      ws.off('typingStart', handleTypingStart)
      ws.off('typingStop', handleTypingStop)
      ws.off('messageRead', handleMessageRead)
    }
  }, [conversation.id, user?.id])

  const loadMessages = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await MessagingApiService.getMessages(conversation.id)
      setMessages(result.messages)
      setHasMoreMessages(result.hasNext ?? false)
      scrollToBottom()
    } catch (err) {
      setError('Failed to load messages')
      console.error('Error loading messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMoreMessages = async () => {
    if (!hasMoreMessages || loading) return

    try {
      const result = await MessagingApiService.getMessages(conversation.id, {
        page: Math.ceil(messages.length / 20) + 1,
        limit: 20
      })
      setMessages(prev => [...result.messages, ...prev])
      setHasMoreMessages(result.hasNext ?? false)
    } catch (err) {
      console.error('Error loading more messages:', err)
    }
  }

  const sendMessage = async (content: string, type: MessageType = MessageType.TEXT, attachments?: File[]) => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return

    try {
      setSending(true)
      setError(null)

      const messageData: MessageCreateData = {
        conversationId: conversation.id,
        content: content.trim(),
        type,
        replyTo: replyTo?.id,
        attachments
      }

      const newMessage = await MessagingApiService.sendMessage(conversation.id, messageData)
      setMessages(prev => [...prev, newMessage])
      setNewMessage('')
      setReplyTo(null)
      scrollToBottom()

      // Send via WebSocket for real-time updates
      wsService.current.sendMessage(newMessage)
    } catch (err) {
      setError('Failed to send message')
      console.error('Error sending message:', err)
    } finally {
      setSending(false)
    }
  }

  const handleSendMessage = () => {
    sendMessage(newMessage)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      const imageFiles = files.filter(file => file.type.startsWith('image/'))
      const otherFiles = files.filter(file => !file.type.startsWith('image/'))

      if (imageFiles.length > 0) {
        sendMessage('', MessageType.IMAGE, imageFiles)
      }
      if (otherFiles.length > 0) {
        sendMessage('', MessageType.FILE, otherFiles)
      }
    }
  }

  const handleReply = (message: Message) => {
    setReplyTo(message)
  }

  const handleReact = async (message: Message, emoji: string) => {
    // Implementation for message reactions
    console.log('React to message:', message.id, emoji)
  }

  const handleEdit = (message: Message) => {
    // Implementation for message editing
    console.log('Edit message:', message.id)
  }

  const handleDelete = async (message: Message) => {
    try {
      await MessagingApiService.deleteMessage(message.id)
      setMessages(prev => prev.filter(m => m.id !== message.id))
    } catch (err) {
      console.error('Error deleting message:', err)
    }
  }

  const handleDownloadAttachment = (attachment: any) => {
    // Implementation for file download
    console.log('Download attachment:', attachment.id)
  }

  const handleViewAttachment = (attachment: any) => {
    // Implementation for file preview
    console.log('View attachment:', attachment.id)
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const joinConversation = () => {
    wsService.current.joinConversation(conversation.id)
  }

  const leaveConversation = () => {
    wsService.current.leaveConversation(conversation.id)
  }

  const handleTyping = useCallback(
    (() => {
      let typingTimeout: NodeJS.Timeout
      return () => {
        wsService.current.sendTypingIndicator(conversation.id, true)
        clearTimeout(typingTimeout)
        typingTimeout = setTimeout(() => {
          wsService.current.sendTypingIndicator(conversation.id, false)
        }, 1000)
      }
    })(),
    [conversation.id]
  )


  const getOnlineParticipants = () => {
    return conversation.participants.filter(p => p.isOnline)
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      {showHeader && (
        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 0
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={conversation.participants.find(p => p.id !== user?.id)?.avatar}
            >
              {conversation.participants.find(p => p.id !== user?.id)?.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">
                {conversation.participants.find(p => p.id !== user?.id)?.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getOnlineParticipants().map(participant => (
                  <Chip
                    key={participant.id}
                    label="Online"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {showActions && (
            <Stack direction="row" spacing={1}>
              <Tooltip title="Voice Call">
                <IconButton>
                  <Phone />
                </IconButton>
              </Tooltip>
              <Tooltip title="Video Call">
                <IconButton>
                  <VideoCall />
                </IconButton>
              </Tooltip>
              <Tooltip title="Conversation Info">
                <IconButton>
                  <Info />
                </IconButton>
              </Tooltip>
              {onClose && (
                <Tooltip title="Close">
                  <IconButton onClick={onClose}>
                    <Close />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          )}
        </Paper>
      )}

      {/* Messages Area */}
      <Box
        ref={messagesContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 1,
          backgroundColor: 'background.default'
        }}
        onScroll={(e) => {
          const target = e.target as HTMLDivElement
          if (target.scrollTop === 0 && hasMoreMessages) {
            loadMoreMessages()
          }
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <>
            {messages.map((message, index) => {
              const isOwn = message.senderId === user?.id
              const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId
              const showTimestamp = index === 0 || 
                new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 300000 // 5 minutes

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  showTimestamp={showTimestamp}
                  onReply={handleReply}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onReact={handleReact}
                  onDownloadAttachment={handleDownloadAttachment}
                  onViewAttachment={handleViewAttachment}
                  showActions={showActions}
                />
              )
            })}

            {/* Typing Indicators */}
            {typingUsers.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1, px: 2 }}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  {typingUsers.map(t => t.userName).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                </Typography>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {/* Reply Preview */}
      {replyTo && (
        <Paper
          elevation={1}
          sx={{
            p: 1,
            mx: 2,
            mb: 1,
            backgroundColor: 'action.hover',
            borderRadius: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Replying to {replyTo.senderName}
              </Typography>
              <Typography variant="body2" sx={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {replyTo.content}
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setReplyTo(null)}>
              <Close />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* Message Input */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 0,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,.doc,.docx,.txt"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

        <Tooltip title="Attach File">
          <IconButton onClick={() => fileInputRef.current?.click()}>
            <AttachFile />
          </IconButton>
        </Tooltip>

        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value)
            handleTyping()
          }}
          onKeyPress={handleKeyPress}
          disabled={sending}
          variant="outlined"
          size="small"
        />

        <Tooltip title="Emoji">
          <IconButton>
            <EmojiEmotions />
          </IconButton>
        </Tooltip>

        <Tooltip title="Send">
          <IconButton
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            color="primary"
          >
            {sending ? <CircularProgress size={20} /> : <Send />}
          </IconButton>
        </Tooltip>
      </Paper>
    </Box>
  )
}

export default ChatInterface
