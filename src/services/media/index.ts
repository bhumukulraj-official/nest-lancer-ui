/**
 * Media Services Index
 * Central export point for all media-related services
 */

export { MediaApiService } from './mediaApiService'
export { CloudinaryUIService } from './cloudinaryUIService'

// Re-export types for convenience
export type {
  Media,
  MediaCreateData,
  MediaUpdateData,
  MediaFilters,
  MediaSearchResult,
  MediaStats,
  MediaType,
  MediaStatus,
  MediaCategory,
  MediaTag,
  MediaMetadata,
  MediaThumbnail,
  MediaVersion,
  MediaAccess,
  MediaAnalytics,
  MediaUpload,
  MediaDownload,
  MediaProcessing,
  MediaTransformation
} from '../../types/models/media.types'

export type {
  CloudinaryUploadResult,
  CloudinaryUploadOptions,
  CloudinaryWidgetOptions
} from './cloudinaryUIService'
