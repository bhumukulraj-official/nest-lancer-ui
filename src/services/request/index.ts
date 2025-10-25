/**
 * Request Services Index
 * Central export point for all request-related services
 */

export { RequestApiService } from './requestApiService'

// Re-export types for convenience
export type {
  Request,
  RequestCreateData,
  RequestUpdateData,
  RequestFilters,
  RequestSearchResult,
  RequestStats,
  RequestStatus,
  RequestPriority,
  RequestCategory,
  RequestAttachment,
  RequestComment,
  RequestTimeline,
  RequestAssignment,
  RequestEscalation,
  RequestResolution,
  RequestFeedback,
  RequestAnalytics
} from '../../types/models/request.types'
