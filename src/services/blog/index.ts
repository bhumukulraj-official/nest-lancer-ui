/**
 * Blog Services Index
 * Central export point for all blog-related services
 */

export { BlogApiService } from './blogApiService'

// Re-export types for convenience
export type {
  BlogPost,
  BlogPostCreateData,
  BlogPostUpdateData,
  BlogPostFilters,
  BlogPostSearchResult,
  BlogPostStats,
  BlogPostStatus,
  BlogPostCategory,
  BlogPostTag,
  BlogPostComment,
  BlogPostLike,
  BlogPostShare,
  BlogPostAnalytics,
  BlogPostSEO,
  BlogPostMedia,
  BlogPostAuthor,
  BlogPostSeries,
  BlogPostTemplate
} from '../../types/models/blog.types'
