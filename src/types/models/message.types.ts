/**
 * Messaging-related TypeScript type definitions
 * These types represent the data structures for messaging system
 */

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  type: MessageType
  status: MessageStatus
  timestamp: string
  editedAt?: string
  replyTo?: string
  attachments?: MessageAttachment[]
  reactions?: MessageReaction[]
  isRead: boolean
  readAt?: string
  metadata?: Record<string, any>
}

export interface Conversation {
  id: string
  participants: ConversationParticipant[]
  lastMessage?: Message
  lastMessageAt: string
  unreadCount: number
  isActive: boolean
  isArchived: boolean
  isMuted: boolean
  createdAt: string
  updatedAt: string
  metadata?: Record<string, any>
}

export interface ConversationParticipant {
  id: string
  name: string
  email: string
  avatar?: string
  role: ParticipantRole
  isOnline: boolean
  lastSeen?: string
  joinedAt: string
}

export interface MessageAttachment {
  id: string
  fileName: string
  fileSize: number
  fileType: string
  fileUrl: string
  thumbnailUrl?: string
  uploadedAt: string
}

export interface MessageReaction {
  id: string
  userId: string
  userName: string
  emoji: string
  timestamp: string
}

export interface TypingIndicator {
  userId: string
  userName: string
  conversationId: string
  isTyping: boolean
  timestamp: string
}

export interface MessageFilters {
  conversationId?: string
  senderId?: string
  type?: MessageType[]
  dateFrom?: string
  dateTo?: string
  search?: string
  hasAttachments?: boolean
  isUnread?: boolean
  sortBy?: MessageSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface MessageCreateData {
  conversationId: string
  content: string
  type?: MessageType
  replyTo?: string
  attachments?: File[]
}

export interface MessageUpdateData {
  content?: string
  status?: MessageStatus
}

export interface ConversationCreateData {
  participants: string[]
  initialMessage?: string
  metadata?: Record<string, any>
}

export interface ConversationUpdateData {
  isActive?: boolean
  isArchived?: boolean
  isMuted?: boolean
  metadata?: Record<string, any>
}

export interface MessageSearchResult {
  messages: Message[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ConversationSearchResult {
  conversations: Conversation[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface MessageStats {
  totalMessages: number
  totalConversations: number
  unreadMessages: number
  activeConversations: number
  messagesToday: number
  messagesThisWeek: number
  messagesThisMonth: number
  averageMessagesPerConversation: number
  mostActiveConversation?: Conversation
  recentActivity: MessageActivity[]
}

export interface MessageActivity {
  date: string
  messageCount: number
  conversationCount: number
}

export interface MessageNotification {
  id: string
  type: MessageNotificationType
  messageId: string
  conversationId: string
  senderId: string
  senderName: string
  content: string
  isRead: boolean
  createdAt: string
}

export interface WebSocketMessage {
  type: WebSocketMessageType
  data: any
  timestamp: string
  conversationId?: string
}

export interface MessageReadStatus {
  messageId: string
  userId: string
  readAt: string
}

export interface ConversationSettings {
  id: string
  conversationId: string
  userId: string
  notifications: boolean
  soundEnabled: boolean
  desktopNotifications: boolean
  emailNotifications: boolean
  autoMarkAsRead: boolean
  theme: ConversationTheme
  fontSize: MessageFontSize
  createdAt: string
  updatedAt: string
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  AUDIO = 'audio',
  VIDEO = 'video',
  SYSTEM = 'system',
  CALL = 'call',
  LOCATION = 'location',
  CONTACT = 'contact',
  STICKER = 'sticker'
}

export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
  EDITED = 'edited',
  DELETED = 'deleted'
}

export enum ParticipantRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
  GUEST = 'guest'
}

export enum MessageSortBy {
  TIMESTAMP = 'timestamp',
  CREATED_AT = 'createdAt',
  SENDER = 'sender',
  TYPE = 'type',
  STATUS = 'status'
}

export enum MessageNotificationType {
  NEW_MESSAGE = 'new_message',
  MESSAGE_READ = 'message_read',
  TYPING_START = 'typing_start',
  TYPING_STOP = 'typing_stop',
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
  CONVERSATION_CREATED = 'conversation_created',
  CONVERSATION_UPDATED = 'conversation_updated'
}

export enum WebSocketMessageType {
  MESSAGE_SENT = 'message_sent',
  MESSAGE_RECEIVED = 'message_received',
  MESSAGE_READ = 'message_read',
  TYPING_START = 'typing_start',
  TYPING_STOP = 'typing_stop',
  USER_ONLINE = 'user_online',
  USER_OFFLINE = 'user_offline',
  CONVERSATION_UPDATED = 'conversation_updated',
  ERROR = 'error',
  CONNECTION_ESTABLISHED = 'connection_established',
  CONNECTION_LOST = 'connection_lost'
}

export enum ConversationTheme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

export enum MessageFontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export interface MessageTemplate {
  id: string
  name: string
  content: string
  category: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface MessageSearchFilters {
  query: string
  conversationId?: string
  senderId?: string
  dateFrom?: string
  dateTo?: string
  type?: MessageType[]
  hasAttachments?: boolean
}

export interface MessageSearchResult {
  messages: Message[]
  total: number
  query: string
  searchTime: number
}

export interface ConversationInvite {
  id: string
  conversationId: string
  inviterId: string
  inviteeEmail: string
  inviteeName?: string
  status: InviteStatus
  expiresAt: string
  createdAt: string
  acceptedAt?: string
}

export enum InviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}
