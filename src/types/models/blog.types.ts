/**
 * Blog-related TypeScript type definitions
 * These types represent the data structures for blog management
 */

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  summary?: string
  tags: string[]
  category: BlogCategory
  subcategory?: string
  isPublished: boolean
  isFeatured: boolean
  isDraft: boolean
  featuredImage?: string
  featuredImageAlt?: string
  authorId: string
  authorName: string
  authorAvatar?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  metaData?: BlogMetaData
  status: BlogStatus
  publishedAt?: string
  scheduledAt?: string
  views: number
  likes: number
  comments: number
  shares: number
  readingTime: number
  wordCount: number
  commentsEnabled: boolean
  allowGuestComments: boolean
  moderationRequired: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  parentId?: string
  isActive: boolean
  postCount: number
  createdAt: string
  updatedAt: string
}

export interface BlogComment {
  id: string
  postId: string
  parentId?: string
  authorId?: string
  authorName: string
  authorEmail?: string
  authorAvatar?: string
  authorWebsite?: string
  content: string
  isApproved: boolean
  isSpam: boolean
  isGuest: boolean
  ipAddress?: string
  userAgent?: string
  likes: number
  replies: BlogComment[]
  createdAt: string
  updatedAt: string
  approvedAt?: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  postCount: number
  createdAt: string
  updatedAt: string
}

export interface BlogMetaData {
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  schema?: Record<string, any>
  customMeta?: Array<{
    name: string
    content: string
    property?: string
  }>
}

export interface BlogStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  featuredPosts: number
  totalViews: number
  totalLikes: number
  totalComments: number
  totalShares: number
  averageReadingTime: number
  averageWordCount: number
  postsByCategory: Array<{
    category: string
    count: number
    percentage: number
  }>
  postsByTag: Array<{
    tag: string
    count: number
    percentage: number
  }>
  postsByAuthor: Array<{
    authorId: string
    authorName: string
    count: number
    percentage: number
  }>
  monthlyTrends: Array<{
    month: string
    year: number
    posts: number
    views: number
    likes: number
    comments: number
  }>
  popularPosts: BlogPost[]
  recentPosts: BlogPost[]
}

export interface BlogFilters {
  category?: string[]
  subcategory?: string[]
  tags?: string[]
  authorId?: string[]
  status?: BlogStatus[]
  isPublished?: boolean
  isFeatured?: boolean
  isDraft?: boolean
  dateFrom?: string
  dateTo?: string
  publishedFrom?: string
  publishedTo?: string
  search?: string
  sortBy?: BlogSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface BlogCreateData {
  title: string
  content: string
  excerpt?: string
  summary?: string
  tags: string[]
  category: string
  subcategory?: string
  isPublished?: boolean
  isFeatured?: boolean
  featuredImage?: string
  featuredImageAlt?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  metaData?: BlogMetaData
  scheduledAt?: string
  commentsEnabled?: boolean
  allowGuestComments?: boolean
  moderationRequired?: boolean
}

export interface BlogUpdateData {
  title?: string
  content?: string
  excerpt?: string
  summary?: string
  tags?: string[]
  category?: string
  subcategory?: string
  isPublished?: boolean
  isFeatured?: boolean
  featuredImage?: string
  featuredImageAlt?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  metaData?: BlogMetaData
  scheduledAt?: string
  commentsEnabled?: boolean
  allowGuestComments?: boolean
  moderationRequired?: boolean
  status?: BlogStatus
}

export interface BlogSearchResult {
  data: BlogPost[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface BlogAnalytics {
  totalPosts: number
  postsByStatus: Array<{
    status: BlogStatus
    count: number
    percentage: number
  }>
  postsByCategory: Array<{
    category: string
    count: number
    percentage: number
    views: number
    likes: number
    comments: number
  }>
  postsByTag: Array<{
    tag: string
    count: number
    percentage: number
    views: number
    likes: number
    comments: number
  }>
  postsByAuthor: Array<{
    authorId: string
    authorName: string
    count: number
    percentage: number
    views: number
    likes: number
    comments: number
  }>
  engagementMetrics: {
    totalViews: number
    totalLikes: number
    totalComments: number
    totalShares: number
    averageViewsPerPost: number
    averageLikesPerPost: number
    averageCommentsPerPost: number
    averageSharesPerPost: number
  }
  monthlyTrends: Array<{
    month: string
    year: number
    posts: number
    views: number
    likes: number
    comments: number
    shares: number
  }>
  popularPosts: Array<{
    postId: string
    title: string
    views: number
    likes: number
    comments: number
    shares: number
    publishedAt: string
  }>
  topCategories: Array<{
    category: string
    posts: number
    views: number
    likes: number
    comments: number
  }>
  topTags: Array<{
    tag: string
    posts: number
    views: number
    likes: number
    comments: number
  }>
}

export interface BlogCommentData {
  postId: string
  parentId?: string
  content: string
  authorName: string
  authorEmail?: string
  authorWebsite?: string
}

export interface BlogCommentUpdateData {
  content?: string
  isApproved?: boolean
  isSpam?: boolean
}

export interface BlogCommentFilters {
  postId?: string
  authorId?: string[]
  isApproved?: boolean
  isSpam?: boolean
  isGuest?: boolean
  dateFrom?: string
  dateTo?: string
  search?: string
  sortBy?: CommentSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface BlogCommentSearchResult {
  comments: BlogComment[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface BlogSubscription {
  id: string
  email: string
  isActive: boolean
  preferences: {
    categories: string[]
    tags: string[]
    frequency: 'immediate' | 'daily' | 'weekly' | 'monthly'
  }
  subscribedAt: string
  unsubscribedAt?: string
  lastSentAt?: string
}

export interface BlogNewsletter {
  id: string
  name: string
  description?: string
  posts: BlogPost[]
  subscribers: BlogSubscription[]
  status: NewsletterStatus
  scheduledAt?: string
  sentAt?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

// Enums
export enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SCHEDULED = 'scheduled',
  ARCHIVED = 'archived',
  DELETED = 'deleted'
}

export enum BlogSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PUBLISHED_AT = 'publishedAt',
  TITLE = 'title',
  VIEWS = 'views',
  LIKES = 'likes',
  COMMENTS = 'comments',
  SHARES = 'shares',
  READING_TIME = 'readingTime',
  WORD_COUNT = 'wordCount',
  AUTHOR_NAME = 'authorName'
}

export enum CommentSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  AUTHOR_NAME = 'authorName',
  LIKES = 'likes',
  APPROVED_AT = 'approvedAt'
}

export enum NewsletterStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  SENDING = 'sending',
  SENT = 'sent',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// Type aliases for backward compatibility
export type BlogPostCreateData = BlogCreateData
export type BlogPostUpdateData = BlogUpdateData
export type BlogPostFilters = BlogFilters
export type BlogPostSearchResult = BlogSearchResult
export type BlogPostStats = BlogStats
export type BlogPostStatus = BlogStatus
export type BlogPostCategory = BlogCategory
export type BlogPostTag = BlogTag
export type BlogPostComment = BlogComment
export type BlogPostAnalytics = BlogAnalytics

export interface BlogPostLike {
  id: string
  postId: string
  userId: string
  likedAt: string
  ipAddress?: string
  userAgent?: string
}

export interface BlogPostShare {
  id: string
  postId: string
  userId?: string
  platform: 'twitter' | 'facebook' | 'linkedin' | 'email' | 'link'
  sharedAt: string
  url: string
  ipAddress?: string
  userAgent?: string
}

export interface BlogPostSEO {
  id: string
  postId: string
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  noIndex?: boolean
  noFollow?: boolean
  structuredData?: any
}

export interface BlogPostMedia {
  id: string
  postId: string
  mediaId: string
  mediaType: 'image' | 'video' | 'audio' | 'document'
  url: string
  alt?: string
  caption?: string
  position: number
  isFeatured: boolean
  createdAt: string
}

export interface BlogPostAuthor {
  id: string
  postId: string
  userId: string
  userName: string
  userAvatar?: string
  role: 'author' | 'co_author' | 'editor'
  contribution?: string
  addedAt: string
}

export interface BlogPostSeries {
  id: string
  title: string
  slug: string
  description?: string
  coverImage?: string
  authorId: string
  posts: Array<{
    id: string
    title: string
    slug: string
    position: number
    publishedAt?: string
  }>
  totalPosts: number
  publishedPosts: number
  createdAt: string
  updatedAt: string
}

export interface BlogPostTemplate {
  id: string
  name: string
  description?: string
  content: string
  category?: string
  tags?: string[]
  isDefault: boolean
  isPublic: boolean
  authorId: string
  usageCount: number
  createdAt: string
  updatedAt: string
}
