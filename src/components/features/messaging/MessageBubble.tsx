/**
 * MessageBubble Component
 * Displays individual messages in chat interface
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material'
import {
  MoreVert,
  Reply,
  Edit,
  Delete,
  Download,
  ThumbUp,
  Schedule,
  CheckCircle,
  Error
} from '@mui/icons-material'
import { Message, MessageStatus, MessageType } from '../../../types/models/message.types'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  showAvatar?: boolean
  showTimestamp?: boolean
  onReply?: (message: Message) => void
  onEdit?: (message: Message) => void
  onDelete?: (message: Message) => void
  onReact?: (message: Message, emoji: string) => void
  onDownloadAttachment?: (attachment: any) => void
  onViewAttachment?: (attachment: any) => void
  showActions?: boolean
  compact?: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  showAvatar = true,
  showTimestamp = true,
  onReply,
  onEdit,
  onDelete,
  onReact,
  onDownloadAttachment,
  onViewAttachment,
  showActions = true,
  compact = false
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [imageError, setImageError] = useState<string[]>([])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case MessageStatus.SENDING:
        return <CircularProgress size={12} />
      case MessageStatus.SENT:
        return <Schedule fontSize="small" />
      case MessageStatus.DELIVERED:
        return <CheckCircle fontSize="small" />
      case MessageStatus.READ:
        return <CheckCircle fontSize="small" color="primary" />
      case MessageStatus.FAILED:
        return <Error fontSize="small" color="error" />
      default:
        return null
    }
  }

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const renderMessageContent = () => {
    switch (message.type) {
      case MessageType.TEXT:
        return (
          <Typography
            variant="body1"
            sx={{
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              fontSize: compact ? '0.875rem' : '1rem'
            }}
          >
            {message.content}
          </Typography>
        )

      case MessageType.IMAGE:
        return (
          <Box>
            {message.attachments?.map((attachment) => (
              <Box key={attachment.id} sx={{ mb: 1 }}>
                {imageError.includes(attachment.id) ? (
                  <Alert severity="error" sx={{ mb: 1 }}>
                    Failed to load image
                  </Alert>
                ) : (
                  <img
                    src={attachment.fileUrl}
                    alt={attachment.fileName}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                    onError={() => setImageError(prev => [...prev, attachment.id])}
                    onClick={() => onViewAttachment?.(attachment)}
                  />
                )}
                <Typography variant="caption" color="text.secondary">
                  {attachment.fileName}
                </Typography>
              </Box>
            ))}
          </Box>
        )

      case MessageType.FILE:
        return (
          <Stack spacing={1}>
            {message.attachments?.map((attachment) => (
              <Paper
                key={attachment.id}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
                onClick={() => onViewAttachment?.(attachment)}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {attachment.fileName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDownloadAttachment?.(attachment)
                  }}
                >
                  <Download />
                </IconButton>
              </Paper>
            ))}
          </Stack>
        )

      case MessageType.SYSTEM:
        return (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic', textAlign: 'center' }}
          >
            {message.content}
          </Typography>
        )

      default:
        return (
          <Typography variant="body1">
            {message.content}
          </Typography>
        )
    }
  }

  const renderReactions = () => {
    if (!message.reactions || message.reactions.length === 0) return null

    const reactionGroups = message.reactions.reduce((acc, reaction) => {
      if (!acc[reaction.emoji]) {
        acc[reaction.emoji] = []
      }
      acc[reaction.emoji].push(reaction)
      return acc
    }, {} as Record<string, typeof message.reactions>)

    return (
      <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: 'wrap' }}>
        {Object.entries(reactionGroups).map(([emoji, reactions]) => (
          <Chip
            key={emoji}
            label={`${emoji} ${reactions.length}`}
            size="small"
            variant="outlined"
            onClick={() => onReact?.(message, emoji)}
            sx={{ fontSize: '0.75rem', height: '20px' }}
          />
        ))}
      </Stack>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 1,
        mb: compact ? 0.5 : 1,
        px: 1
      }}
    >
      {/* Avatar */}
      {showAvatar && !isOwn && (
        <Avatar
          src={message.senderAvatar}
          sx={{ width: 32, height: 32, mt: 0.5 }}
        >
          {message.senderName.charAt(0).toUpperCase()}
        </Avatar>
      )}

      {/* Message Content */}
      <Box sx={{ maxWidth: '70%', minWidth: '100px' }}>
        {/* Sender Name */}
        {!isOwn && !compact && (
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {message.senderName}
          </Typography>
        )}

        {/* Message Bubble */}
        <Paper
          elevation={1}
          sx={{
            p: compact ? 1 : 1.5,
            backgroundColor: isOwn ? 'primary.main' : 'background.paper',
            color: isOwn ? 'primary.contrastText' : 'text.primary',
            borderRadius: 2,
            position: 'relative',
            '&:hover .message-actions': {
              opacity: 1
            }
          }}
        >
          {/* Reply Reference */}
          {message.replyTo && (
            <Box
              sx={{
                borderLeft: 3,
                borderColor: isOwn ? 'primary.light' : 'primary.main',
                pl: 1,
                mb: 1,
                backgroundColor: isOwn ? 'primary.dark' : 'action.hover',
                borderRadius: 1,
                py: 0.5
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Replying to message
              </Typography>
            </Box>
          )}

          {/* Message Content */}
          {renderMessageContent()}

          {/* Reactions */}
          {renderReactions()}

          {/* Message Actions */}
          {showActions && (
            <Box
              className="message-actions"
              sx={{
                position: 'absolute',
                top: -8,
                [isOwn ? 'left' : 'right']: 8,
                opacity: 0,
                transition: 'opacity 0.2s',
                backgroundColor: 'background.paper',
                borderRadius: 1,
                boxShadow: 2,
                display: 'flex',
                gap: 0.5
              }}
            >
              <Tooltip title="Reply">
                <IconButton size="small" onClick={() => onReply?.(message)}>
                  <Reply fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="React">
                <IconButton size="small" onClick={() => onReact?.(message, '👍')}>
                  <ThumbUp fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="More">
                <IconButton size="small" onClick={handleMenuOpen}>
                  <MoreVert fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Paper>

        {/* Timestamp and Status */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            justifyContent: isOwn ? 'flex-end' : 'flex-start',
            mt: 0.5,
            px: 1
          }}
        >
          {showTimestamp && (
            <Typography variant="caption" color="text.secondary">
              {formatTime(message.timestamp)}
            </Typography>
          )}
          {isOwn && getStatusIcon(message.status)}
        </Box>
      </Box>

      {/* Spacer for own messages */}
      {isOwn && showAvatar && <Box sx={{ width: 32 }} />}

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={() => { onReply?.(message); handleMenuClose() }}>
          <Reply fontSize="small" sx={{ mr: 1 }} />
          Reply
        </MenuItem>
        {isOwn && (
          <MenuItem onClick={() => { onEdit?.(message); handleMenuClose() }}>
            <Edit fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
        )}
        {isOwn && (
          <MenuItem onClick={() => { onDelete?.(message); handleMenuClose() }}>
            <Delete fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
        <MenuItem onClick={() => { onReact?.(message, '👍'); handleMenuClose() }}>
          <ThumbUp fontSize="small" sx={{ mr: 1 }} />
          👍 Like
        </MenuItem>
        <MenuItem onClick={() => { onReact?.(message, '❤️'); handleMenuClose() }}>
          ❤️ Love
        </MenuItem>
        <MenuItem onClick={() => { onReact?.(message, '😂'); handleMenuClose() }}>
          😂 Laugh
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default MessageBubble
