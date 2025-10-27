/**
 * ConversationList Component
 * Displays list of conversations with search and filtering
 */

import {
  Search,
  MoreVert,
  Add,
  Refresh,
  Archive,
  Delete,
  MarkAsUnread,
  NotificationsOff,
  Notifications,
  PersonAdd
} from '@mui/icons-material'
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Chip,
  TextField,
  IconButton,
  Tooltip,
  Badge,
  Stack,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
  Divider,
  Button,
  InputAdornment
} from '@mui/material'
import React, { useState, useMemo } from 'react'

import type {
  Conversation,
  ConversationParticipant
} from '../../../types/models/message.types'

interface ConversationListProps {
  conversations: Conversation[]
  loading?: boolean
  error?: string | null
  selectedConversationId?: string
  onConversationSelect?: (conversation: Conversation) => void
  onConversationCreate?: () => void
  onRefresh?: () => void
  onArchiveConversation?: (conversation: Conversation) => void
  onDeleteConversation?: (conversation: Conversation) => void
  onMarkAsUnread?: (conversation: Conversation) => void
  onToggleNotifications?: (conversation: Conversation) => void
  onInviteUser?: (conversation: Conversation) => void
  showActions?: boolean
  showSearch?: boolean
  showCreateButton?: boolean
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  loading = false,
  error = null,
  selectedConversationId,
  onConversationSelect,
  onConversationCreate,
  onRefresh,
  onArchiveConversation,
  onDeleteConversation,
  onMarkAsUnread,
  onToggleNotifications,
  onInviteUser,
  showActions = true,
  showSearch = true,
  showCreateButton = true
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [menuAnchor, setMenuAnchor] = useState<{ element: HTMLElement; conversation: Conversation } | null>(null)

  // Filter conversations based on search term
  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) return conversations

    return conversations.filter(conversation => {
      const searchLower = searchTerm.toLowerCase()
      const participantNames = conversation.participants
        .map(p => p.name.toLowerCase())
        .join(' ')
      const lastMessageContent = conversation.lastMessage?.content.toLowerCase() || ''

      return (
        participantNames.includes(searchLower) ||
        lastMessageContent.includes(searchLower)
      )
    })
  }, [conversations, searchTerm])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, conversation: Conversation) => {
    setMenuAnchor({ element: event.currentTarget, conversation })
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'now'
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  const getConversationTitle = (conversation: Conversation): string => {
    if (conversation.participants.length === 2) {
      return conversation.participants.find(p => p.id !== 'current-user')?.name || 'Unknown'
    } else {
      return conversation.participants.map(p => p.name).join(', ')
    }
  }

  const getConversationAvatar = (conversation: Conversation): string | undefined => {
    if (conversation.participants.length === 2) {
      return conversation.participants.find(p => p.id !== 'current-user')?.avatar
    }
    return undefined
  }

  const getConversationInitials = (conversation: Conversation): string => {
    if (conversation.participants.length === 2) {
      const participant = conversation.participants.find(p => p.id !== 'current-user')
      return participant?.name.charAt(0).toUpperCase() || '?'
    } else {
      return conversation.participants.length.toString()
    }
  }

  const getOnlineParticipants = (conversation: Conversation): ConversationParticipant[] => {
    return conversation.participants.filter(p => p.isOnline)
  }

  const truncateMessage = (content: string, maxLength: number = 50): string => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6">Conversations</Typography>
          <Stack direction="row" spacing={1}>
            {onRefresh && (
              <Tooltip title="Refresh">
                <IconButton onClick={onRefresh}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            )}
            {showCreateButton && onConversationCreate && (
              <Tooltip title="New Conversation">
                <IconButton onClick={onConversationCreate}>
                  <Add />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>

        {/* Search */}
        {showSearch && (
          <TextField
            fullWidth
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        )}
      </Box>

      {/* Conversations List */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {filteredConversations.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {searchTerm ? 'No conversations found' : 'No conversations yet'}
            </Typography>
            {!searchTerm && onConversationCreate && (
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={onConversationCreate}
                sx={{ mt: 1 }}
              >
                Start a conversation
              </Button>
            )}
          </Box>
        ) : (
          <List>
            {filteredConversations.map((conversation) => (
              <React.Fragment key={conversation.id}>
                <ListItem
                  button
                  selected={conversation.id === selectedConversationId}
                  onClick={() => onConversationSelect?.(conversation)}
                  sx={{
                    '&:hover': { backgroundColor: 'action.hover' },
                    '&.Mui-selected': { backgroundColor: 'primary.light' }
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        getOnlineParticipants(conversation).length > 0 ? (
                          <Chip
                            label={getOnlineParticipants(conversation).length}
                            size="small"
                            color="success"
                            sx={{ width: 16, height: 16, fontSize: '0.7rem' }}
                          />
                        ) : null
                      }
                    >
                      <Avatar src={getConversationAvatar(conversation)}>
                        {getConversationInitials(conversation)}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: conversation.unreadCount > 0 ? 'bold' : 'normal',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {getConversationTitle(conversation)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(conversation.lastMessageAt)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flexGrow: 1,
                            mr: 1
                          }}
                        >
                          {conversation.lastMessage
                            ? truncateMessage(conversation.lastMessage.content)
                            : 'No messages yet'}
                        </Typography>
                        {conversation.unreadCount > 0 && (
                          <Chip
                            label={conversation.unreadCount}
                            size="small"
                            color="primary"
                            sx={{ minWidth: 20, height: 20, fontSize: '0.75rem' }}
                          />
                        )}
                      </Box>
                    }
                  />

                  {showActions && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuOpen(e, conversation)
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  )}
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor?.element}
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
        {menuAnchor?.conversation && (
          <>
            <MenuItem onClick={() => { onMarkAsUnread?.(menuAnchor.conversation); handleMenuClose() }}>
              <MarkAsUnread fontSize="small" sx={{ mr: 1 }} />
              Mark as Unread
            </MenuItem>
            <MenuItem onClick={() => { onToggleNotifications?.(menuAnchor.conversation); handleMenuClose() }}>
              {menuAnchor.conversation.isMuted ? (
                <>
                  <Notifications fontSize="small" sx={{ mr: 1 }} />
                  Enable Notifications
                </>
              ) : (
                <>
                  <NotificationsOff fontSize="small" sx={{ mr: 1 }} />
                  Mute Notifications
                </>
              )}
            </MenuItem>
            <MenuItem onClick={() => { onInviteUser?.(menuAnchor.conversation); handleMenuClose() }}>
              <PersonAdd fontSize="small" sx={{ mr: 1 }} />
              Invite User
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { onArchiveConversation?.(menuAnchor.conversation); handleMenuClose() }}>
              <Archive fontSize="small" sx={{ mr: 1 }} />
              Archive
            </MenuItem>
            <MenuItem 
              onClick={() => { onDeleteConversation?.(menuAnchor.conversation); handleMenuClose() }}
              sx={{ color: 'error.main' }}
            >
              <Delete fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  )
}

export default ConversationList
