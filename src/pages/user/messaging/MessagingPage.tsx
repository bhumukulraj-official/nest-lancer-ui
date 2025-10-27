/**
 * MessagingPage Component
 * Main page for messaging and chat functionality
 */

import {
  Message,
  Add,
} from '@mui/icons-material'
import {
  Box,
  Typography,
  Fab,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress
} from '@mui/material'
import React, { useState, useEffect } from 'react'
// import { ChatInterface, ConversationList } from '../../components/features/messaging'
// import { MessagingApiService } from '../../services/messaging'
// import { WebSocketService } from '../../services/websocket'
// import { useAuth } from '../../hooks/auth/useAuth'
// import { useToast } from '../../hooks/ui/useToast'
// import type {
//   Conversation,
//   ConversationCreateData,
//   MessageStats
// } from '../../types/models/message.types'

// Placeholder types for now
type Conversation = any

const MessagingPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  // const { user } = useAuth()
  // const { showToast } = useToast()

  // State management
  const [_conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, _setSelectedConversation] = useState<Conversation | null>(null)
  const [_loading, setLoading] = useState(true)
  const [_error, setError] = useState<string | null>(null)
  // const [stats, setStats] = useState<MessageStats | null>(null)
  
  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [selectedConversationForInvite, setSelectedConversationForInvite] = useState<Conversation | null>(null)
  
  // Form states
  const [newConversationEmail, setNewConversationEmail] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // WebSocket service - commented out for now
  // const wsService = WebSocketService.getInstance()

  // Load conversations on component mount
  useEffect(() => {
    loadConversations()
    loadStats()
    // connectWebSocket() // Commented out for now
  }, [])

  // Setup WebSocket event listeners - commented out for now
  // useEffect(() => {
  //   const handleConversationUpdated = (conversation: Conversation) => {
  //     setConversations(prev => prev.map(c => c.id === conversation.id ? conversation : c))
  //     if (selectedConversation?.id === conversation.id) {
  //       setSelectedConversation(conversation)
  //     }
  //   }

  //   const handleNewConversation = (conversation: Conversation) => {
  //     setConversations(prev => [conversation, ...prev])
  //   }

  //   wsService.on('conversationUpdated', handleConversationUpdated)
  //   wsService.on('newConversation', handleNewConversation)

  //   return () => {
  //     wsService.off('conversationUpdated', handleConversationUpdated)
  //     wsService.off('newConversation', handleNewConversation)
  //   }
  // }, [selectedConversation?.id])

  // const connectWebSocket = async () => {
  //   try {
  //     const token = localStorage.getItem('token')
  //     if (token) {
  //       await wsService.connect(token)
  //     }
  //   } catch (error) {
  //     console.error('Error connecting to WebSocket:', error)
  //   }
  // }

  const loadConversations = async () => {
    try {
      setLoading(true)
      setError(null)
      // const result = await MessagingApiService.getConversations()
      // setConversations(result.conversations)
      setConversations([]) // Placeholder
    } catch (err) {
      setError('Failed to load conversations')
      console.error('Error loading conversations:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      // const statsData = await MessagingApiService.getMessageStats()
      // setStats(statsData)
      // setStats(null) // Placeholder
    } catch (err) {
      console.error('Error loading message stats:', err)
    }
  }

  const handleCreateConversation = async () => {
    if (!newConversationEmail.trim()) return

    try {
      setFormLoading(true)
      setFormError(null)

      // const conversationData: ConversationCreateData = {
      //   participants: [newConversationEmail.trim()],
      //   initialMessage: 'Hello! Let\'s start a conversation.'
      // }

      // const newConversation = await MessagingApiService.createConversation(conversationData)
      // setConversations(prev => [newConversation, ...prev])
      // setSelectedConversation(newConversation)
      // setCreateDialogOpen(false)
      setNewConversationEmail('')
      // showToast('Conversation created successfully!', 'success')
      setCreateDialogOpen(false) // Placeholder
    } catch (err) {
      setFormError('Failed to create conversation. Please try again.')
      console.error('Error creating conversation:', err)
    } finally {
      setFormLoading(false)
    }
  }

  const handleInviteUser = async () => {
    if (!inviteEmail.trim() || !selectedConversationForInvite) return

    try {
      setFormLoading(true)
      setFormError(null)

      // await MessagingApiService.inviteToConversation(selectedConversationForInvite.id, {
      //   email: inviteEmail.trim()
      // })

      setInviteDialogOpen(false)
      setInviteEmail('')
      setSelectedConversationForInvite(null)
      // showToast('Invitation sent successfully!', 'success')
    } catch (err) {
      setFormError('Failed to send invitation. Please try again.')
      console.error('Error sending invitation:', err)
    } finally {
      setFormLoading(false)
    }
  }

  // const handleConversationSelect = (conversation: Conversation) => {
  //   setSelectedConversation(conversation)
  // }

  // const handleArchiveConversation = async (conversation: Conversation) => {
  //   try {
  //     // await MessagingApiService.updateConversation(conversation.id, { isArchived: true })
  //     setConversations(prev => prev.filter(c => c.id !== conversation.id))
  //     if (selectedConversation?.id === conversation.id) {
  //       setSelectedConversation(null)
  //     }
  //     // showToast('Conversation archived', 'success')
  //   } catch (err) {
  //     // showToast('Failed to archive conversation', 'error')
  //     console.error('Error archiving conversation:', err)
  //   }
  // }

  // const handleDeleteConversation = async (conversation: Conversation) => {
  //   if (!window.confirm('Are you sure you want to delete this conversation?')) {
  //     return
  //   }

  //   try {
  //     // Note: This would typically be a soft delete or archive
  //     setConversations(prev => prev.filter(c => c.id !== conversation.id))
  //     if (selectedConversation?.id === conversation.id) {
  //       setSelectedConversation(null)
  //     }
  //     // showToast('Conversation deleted', 'success')
  //   } catch (err) {
  //     // showToast('Failed to delete conversation', 'error')
  //     console.error('Error deleting conversation:', err)
  //   }
  // }

  // const handleMarkAsUnread = async (_conversation: Conversation) => {
  //   try {
  //     // Implementation for marking as unread
  //     // showToast('Conversation marked as unread', 'success')
  //   } catch (err) {
  //     // showToast('Failed to mark as unread', 'error')
  //     console.error('Error marking as unread:', err)
  //   }
  // }

  // const handleToggleNotifications = async (_conversation: Conversation) => {
  //   try {
  //     // await MessagingApiService.updateConversation(conversation.id, { 
  //     //   isMuted: !conversation.isMuted 
  //     // })
  //     // showToast(
  //     //   conversation.isMuted ? 'Notifications enabled' : 'Notifications muted', 
  //     //   'success'
  //     // )
  //   } catch (err) {
  //     // showToast('Failed to update notifications', 'error')
  //     console.error('Error toggling notifications:', err)
  //   }
  // }

  // const handleInviteUserClick = (conversation: Conversation) => {
  //   setSelectedConversationForInvite(conversation)
  //   setInviteDialogOpen(true)
  // }

  // const handleRefresh = () => {
  //   loadConversations()
  //   loadStats()
  // }

  // const handleCloseChat = () => {
  //   setSelectedConversation(null)
  // }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Page Header */}
      <Box sx={{ p: { xs: 2, md: 3 }, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Messages
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Chat with your clients and team members
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        {isMobile ? (
          // Mobile Layout - Show either conversation list or chat
          selectedConversation ? (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">Chat Interface (Placeholder)</Typography>
              <Typography variant="body2" color="text.secondary">
                Chat components are not yet implemented
              </Typography>
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">Conversation List (Placeholder)</Typography>
              <Typography variant="body2" color="text.secondary">
                Messaging components are not yet implemented
              </Typography>
            </Box>
          )
        ) : (
          // Desktop Layout - Show both conversation list and chat
          <>
            {/* Conversation List */}
            <Box sx={{ width: 350, borderRight: 1, borderColor: 'divider' }}>
              {/* <ConversationList
                conversations={conversations}
                loading={loading}
                error={error}
                selectedConversationId={selectedConversation?.id}
                onConversationSelect={handleConversationSelect}
                onConversationCreate={() => setCreateDialogOpen(true)}
                onRefresh={handleRefresh}
                onArchiveConversation={handleArchiveConversation}
                onDeleteConversation={handleDeleteConversation}
                onMarkAsUnread={handleMarkAsUnread}
                onToggleNotifications={handleToggleNotifications}
                onInviteUser={handleInviteUserClick}
                showActions={true}
                showSearch={true}
                showCreateButton={true}
              /> */}
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Conversation List (Placeholder)</Typography>
                <Typography variant="body2" color="text.secondary">
                  Messaging components are not yet implemented
                </Typography>
              </Box>
            </Box>

            {/* Chat Interface */}
            <Box sx={{ flexGrow: 1 }}>
              {selectedConversation ? (
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6">Chat Interface (Placeholder)</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chat components are not yet implemented
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'background.default'
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Message sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Select a conversation to start messaging
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Choose from your existing conversations or start a new one
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>

      {/* Create Conversation Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Start New Conversation</DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={newConversationEmail}
            onChange={(e) => setNewConversationEmail(e.target.value)}
            placeholder="Enter the email address of the person you want to message"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateConversation}
            variant="contained"
            disabled={!newConversationEmail.trim() || formLoading}
          >
            {formLoading ? <CircularProgress size={20} /> : 'Start Conversation'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invite User Dialog */}
      <Dialog
        open={inviteDialogOpen}
        onClose={() => setInviteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Invite User to Conversation</DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter the email address of the person you want to invite"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleInviteUser}
            variant="contained"
            disabled={!inviteEmail.trim() || formLoading}
          >
            {formLoading ? <CircularProgress size={20} /> : 'Send Invitation'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="new conversation"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000
          }}
          onClick={() => setCreateDialogOpen(true)}
        >
          <Add />
        </Fab>
      )}
    </Box>
  )
}

export default MessagingPage
