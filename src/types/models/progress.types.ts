/**
 * Progress-related TypeScript type definitions
 * These types represent the data structures for progress tracking
 */

export interface Progress {
  id: string
  projectId: string
  projectTitle: string
  progress: number // 0-100
  status: ProgressStatus
  notes?: string
  attachments: ProgressAttachment[]
  milestones: ProgressMilestone[]
  updates: ProgressUpdate[]
  createdBy: string
  createdByName: string
  createdAt: string
  updatedAt: string
}

export interface ProgressMilestone {
  id: string
  projectId: string
  title: string
  description: string
  status: MilestoneStatus
  dueDate: string
  completedAt?: string
  progress: number // 0-100
  deliverables: string[]
  dependencies: string[]
  assignedTo?: string
  assignedToName?: string
  priority: MilestonePriority
  estimatedHours?: number
  actualHours?: number
  attachments: ProgressAttachment[]
  notes: ProgressNote[]
  createdAt: string
  updatedAt: string
}

export interface ProgressUpdate {
  id: string
  projectId: string
  milestoneId?: string
  progress: number
  status: ProgressStatus
  notes: string
  attachments: ProgressAttachment[]
  isPublic: boolean
  createdBy: string
  createdByName: string
  createdAt: string
  updatedAt: string
}

export interface ProgressAttachment {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  mimeType: string
  description?: string
  uploadedBy: string
  uploadedAt: string
}

export interface ProgressNote {
  id: string
  milestoneId: string
  note: string
  isInternal: boolean
  createdBy: string
  createdByName: string
  createdAt: string
  updatedAt: string
}

export interface ProgressTemplate {
  id: string
  name: string
  description: string
  category: string
  milestones: MilestoneTemplate[]
  isActive: boolean
  isDefault: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface MilestoneTemplate {
  id: string
  title: string
  description: string
  estimatedDays: number
  deliverables: string[]
  dependencies: string[]
  priority: MilestonePriority
  order: number
}

export interface ProgressStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  onHoldProjects: number
  averageProgress: number
  averageCompletionTime: number
  onTimeDelivery: number
  overdueProjects: number
  milestonesCompleted: number
  milestonesOverdue: number
  projectsByStatus: Array<{
    status: ProgressStatus
    count: number
    percentage: number
  }>
  milestonesByStatus: Array<{
    status: MilestoneStatus
    count: number
    percentage: number
  }>
  monthlyTrends: Array<{
    month: string
    year: number
    projectsStarted: number
    projectsCompleted: number
    milestonesCompleted: number
  }>
}

export interface ProgressFilters {
  projectId?: string[]
  status?: ProgressStatus[]
  milestoneStatus?: MilestoneStatus[]
  assignedTo?: string[]
  priority?: MilestonePriority[]
  dateFrom?: string
  dateTo?: string
  dueDateFrom?: string
  dueDateTo?: string
  search?: string
  sortBy?: ProgressSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface ProgressCreateData {
  projectId: string
  progress: number
  status: ProgressStatus
  notes?: string
  attachments?: File[]
}

export interface ProgressUpdateData {
  progress?: number
  status?: ProgressStatus
  notes?: string
  attachments?: File[]
}

export interface MilestoneCreateData {
  projectId: string
  title: string
  description: string
  dueDate: string
  deliverables: string[]
  dependencies?: string[]
  assignedTo?: string
  priority?: MilestonePriority
  estimatedHours?: number
}

export interface MilestoneUpdateData {
  title?: string
  description?: string
  status?: MilestoneStatus
  dueDate?: string
  completedAt?: string
  progress?: number
  deliverables?: string[]
  dependencies?: string[]
  assignedTo?: string
  priority?: MilestonePriority
  estimatedHours?: number
  actualHours?: number
}

export interface ProgressSearchResult {
  progress: Progress[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ProgressAnalytics {
  totalProjects: number
  projectsByStatus: Array<{
    status: ProgressStatus
    count: number
    percentage: number
    averageProgress: number
    averageDuration: number
  }>
  milestonesByStatus: Array<{
    status: MilestoneStatus
    count: number
    percentage: number
    averageDelay: number
  }>
  progressTrends: Array<{
    date: string
    averageProgress: number
    projectsCompleted: number
    milestonesCompleted: number
  }>
  performanceMetrics: {
    onTimeDelivery: number
    averageCompletionTime: number
    averageDelay: number
    qualityScore: number
    clientSatisfaction: number
  }
  teamPerformance: Array<{
    userId: string
    userName: string
    projectsAssigned: number
    milestonesCompleted: number
    averageProgress: number
    onTimeDelivery: number
    qualityScore: number
  }>
  projectHealth: Array<{
    projectId: string
    projectTitle: string
    progress: number
    status: ProgressStatus
    milestonesCompleted: number
    totalMilestones: number
    daysRemaining: number
    healthScore: number
  }>
}

export interface ProgressDashboard {
  overview: {
    totalProjects: number
    activeProjects: number
    completedProjects: number
    overdueProjects: number
    averageProgress: number
    onTimeDelivery: number
  }
  recentUpdates: ProgressUpdate[]
  upcomingMilestones: ProgressMilestone[]
  overdueMilestones: ProgressMilestone[]
  projectHealth: Array<{
    projectId: string
    projectTitle: string
    progress: number
    status: ProgressStatus
    healthScore: number
    daysRemaining: number
  }>
  teamPerformance: Array<{
    userId: string
    userName: string
    projectsAssigned: number
    milestonesCompleted: number
    averageProgress: number
    onTimeDelivery: number
  }>
}

export interface ProgressReport {
  id: string
  projectId: string
  projectTitle: string
  period: {
    start: string
    end: string
  }
  summary: {
    progress: number
    milestonesCompleted: number
    totalMilestones: number
    hoursWorked: number
    hoursEstimated: number
  }
  milestones: Array<{
    id: string
    title: string
    status: MilestoneStatus
    progress: number
    dueDate: string
    completedAt?: string
    estimatedHours: number
    actualHours: number
  }>
  updates: ProgressUpdate[]
  attachments: ProgressAttachment[]
  createdBy: string
  createdAt: string
}

export interface ProgressNotification {
  id: string
  type: ProgressNotificationType
  projectId: string
  projectTitle: string
  milestoneId?: string
  milestoneTitle?: string
  message: string
  isRead: boolean
  createdAt: string
  readAt?: string
}

// Enums
export enum ProgressStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue'
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
  BLOCKED = 'blocked'
}

export enum MilestonePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ProgressNotificationType {
  MILESTONE_DUE = 'milestone_due',
  MILESTONE_OVERDUE = 'milestone_overdue',
  MILESTONE_COMPLETED = 'milestone_completed',
  PROJECT_UPDATED = 'project_updated',
  PROGRESS_REPORT = 'progress_report',
  DEADLINE_APPROACHING = 'deadline_approaching',
  DEADLINE_PASSED = 'deadline_passed'
}

export enum ProgressSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PROJECT_TITLE = 'projectTitle',
  PROGRESS = 'progress',
  STATUS = 'status',
  DUE_DATE = 'dueDate',
  ASSIGNED_TO = 'assignedTo',
  PRIORITY = 'priority'
}
