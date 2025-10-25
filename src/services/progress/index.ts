/**
 * Progress Services Index
 * Central export point for all progress-related services
 */

export { ProgressApiService } from './progressApiService'

// Re-export types for convenience
export type {
  Progress,
  ProgressCreateData,
  ProgressUpdateData,
  ProgressFilters,
  ProgressSearchResult,
  ProgressStats,
  ProgressStatus,
  Milestone,
  MilestoneCreateData,
  MilestoneUpdateData,
  MilestoneStatus,
  ProgressUpdate,
  ProgressUpdateCreateData,
  ProgressTimeline,
  ProgressReport,
  ProgressAnalytics,
  ProgressNotification,
  ProgressComment,
  ProgressAttachment
} from '../../types/models/progress.types'
