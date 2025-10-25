/**
 * Media-related TypeScript type definitions
 * These types represent the data structures for media management
 */

export interface Media {
  id: string
  filename: string
  originalName: string
  url: string
  thumbnailUrl?: string
  previewUrl?: string
  size: number
  mimeType: string
  category: MediaCategory
  subcategory?: string
  description?: string
  tags: string[]
  alt?: string
  caption?: string
  metadata: MediaMetadata
  isPublic: boolean
  isActive: boolean
  uploadedBy: string
  uploadedByName: string
  uploadedAt: string
  updatedAt: string
  deletedAt?: string
}

export interface MediaMetadata {
  width?: number
  height?: number
  duration?: number
  bitrate?: number
  framerate?: number
  resolution?: string
  format?: string
  codec?: string
  exif?: Record<string, any>
  colorProfile?: string
  orientation?: number
  hasAudio?: boolean
  hasVideo?: boolean
  fileHash?: string
  checksum?: string
}

export interface MediaCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  allowedTypes: string[]
  maxSize: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface MediaUpload {
  id: string
  filename: string
  originalName: string
  size: number
  mimeType: string
  status: UploadStatus
  progress: number
  uploadedBy: string
  uploadedAt: string
  completedAt?: string
  failedAt?: string
  error?: string
  url?: string
  thumbnailUrl?: string
  metadata?: MediaMetadata
}

export interface MediaCollection {
  id: string
  name: string
  description?: string
  media: Media[]
  tags: string[]
  isPublic: boolean
  isActive: boolean
  createdBy: string
  createdByName: string
  createdAt: string
  updatedAt: string
}

export interface MediaGallery {
  id: string
  name: string
  description?: string
  layout: GalleryLayout
  settings: GallerySettings
  media: Media[]
  tags: string[]
  isPublic: boolean
  isActive: boolean
  createdBy: string
  createdByName: string
  createdAt: string
  updatedAt: string
}

export interface GallerySettings {
  showCaptions: boolean
  showMetadata: boolean
  allowDownload: boolean
  allowSharing: boolean
  autoPlay: boolean
  loop: boolean
  controls: boolean
  theme: GalleryTheme
  columns: number
  spacing: number
  borderRadius: number
  shadow: boolean
}

export interface MediaStats {
  totalMedia: number
  totalSize: number
  mediaByCategory: Array<{
    category: string
    count: number
    size: number
    percentage: number
  }>
  mediaByType: Array<{
    type: string
    count: number
    size: number
    percentage: number
  }>
  storageUsage: {
    used: number
    available: number
    percentage: number
  }
  uploadStats: {
    today: number
    thisWeek: number
    thisMonth: number
    total: number
  }
  popularMedia: Media[]
  recentUploads: Media[]
}

export interface MediaFilters {
  category?: string[]
  subcategory?: string[]
  mimeType?: string[]
  tags?: string[]
  uploadedBy?: string[]
  isPublic?: boolean
  isActive?: boolean
  sizeMin?: number
  sizeMax?: number
  dateFrom?: string
  dateTo?: string
  search?: string
  sortBy?: MediaSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface MediaCreateData {
  file: File
  category: string
  subcategory?: string
  description?: string
  tags?: string[]
  alt?: string
  caption?: string
  isPublic?: boolean
}

export interface MediaUpdateData {
  filename?: string
  description?: string
  tags?: string[]
  alt?: string
  caption?: string
  isPublic?: boolean
  isActive?: boolean
}

export interface MediaSearchResult {
  media: Media[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface MediaAnalytics {
  totalMedia: number
  mediaByCategory: Array<{
    category: string
    count: number
    percentage: number
    totalSize: number
  }>
  mediaByType: Array<{
    type: string
    count: number
    percentage: number
    totalSize: number
  }>
  uploadTrends: Array<{
    date: string
    count: number
    size: number
  }>
  storageUsage: {
    total: number
    used: number
    available: number
    percentage: number
  }
  popularMedia: Array<{
    mediaId: string
    filename: string
    views: number
    downloads: number
    shares: number
  }>
  userActivity: Array<{
    userId: string
    userName: string
    uploads: number
    totalSize: number
    lastUpload: string
  }>
}

export interface MediaProcessing {
  id: string
  mediaId: string
  type: ProcessingType
  status: ProcessingStatus
  progress: number
  startedAt: string
  completedAt?: string
  failedAt?: string
  error?: string
  result?: {
    url: string
    metadata: MediaMetadata
  }
}

export interface MediaTransformation {
  id: string
  mediaId: string
  transformations: TransformationOptions
  status: ProcessingStatus
  progress: number
  startedAt: string
  completedAt?: string
  failedAt?: string
  error?: string
  result?: {
    url: string
    metadata: MediaMetadata
  }
}

export interface TransformationOptions {
  resize?: {
    width?: number
    height?: number
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  }
  crop?: {
    x: number
    y: number
    width: number
    height: number
  }
  rotate?: number
  flip?: 'horizontal' | 'vertical' | 'both'
  blur?: number
  sharpen?: number
  brightness?: number
  contrast?: number
  saturation?: number
  format?: string
  quality?: number
  compression?: number
}

export interface MediaBatch {
  id: string
  name: string
  description?: string
  files: File[]
  category: string
  subcategory?: string
  tags?: string[]
  isPublic?: boolean
  status: BatchStatus
  progress: number
  processed: number
  failed: number
  total: number
  createdBy: string
  createdAt: string
  completedAt?: string
  failedAt?: string
  error?: string
  results?: Media[]
}

// Enums
export enum MediaCategory {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  ARCHIVE = 'archive',
  OTHER = 'other'
}

export enum UploadStatus {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum GalleryLayout {
  GRID = 'grid',
  MASONRY = 'masonry',
  CAROUSEL = 'carousel',
  SLIDER = 'slider',
  LIST = 'list'
}

export enum GalleryTheme {
  LIGHT = 'light',
  DARK = 'dark',
  MINIMAL = 'minimal',
  MODERN = 'modern',
  CLASSIC = 'classic'
}

export enum ProcessingType {
  THUMBNAIL = 'thumbnail',
  PREVIEW = 'preview',
  OPTIMIZATION = 'optimization',
  CONVERSION = 'conversion',
  WATERMARK = 'watermark',
  RESIZE = 'resize',
  CROP = 'crop',
  ROTATE = 'rotate',
  FILTER = 'filter'
}

export enum ProcessingStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum BatchStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum MediaSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  FILENAME = 'filename',
  SIZE = 'size',
  CATEGORY = 'category',
  UPLOADED_BY = 'uploadedBy',
  UPLOADED_AT = 'uploadedAt'
}
