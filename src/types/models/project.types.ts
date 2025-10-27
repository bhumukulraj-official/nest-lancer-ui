/**
 * Project-related TypeScript type definitions
 * These types represent the data structures for project management
 */

export interface Project {
  id: string
  title: string
  description: string
  shortDescription?: string
  status: ProjectStatus
  category: ProjectCategory
  budget: number
  currency: string
  duration: number // in days
  startDate: string
  endDate?: string
  clientId: string
  clientName: string
  clientEmail: string
  technologies: string[]
  requirements: string[]
  deliverables: string[]
  images: ProjectImage[]
  featured: boolean
  createdAt: string
  updatedAt: string
  completedAt?: string
  progress: number // 0-100
  milestones: ProjectMilestone[]
  testimonials: ProjectTestimonial[]
  tags: string[]
  visibility: ProjectVisibility
  isActive: boolean
  isDeleted: boolean
}

export interface ProjectImage {
  id: string
  url: string
  alt: string
  caption?: string
  isPrimary: boolean
  order: number
}

export interface ProjectMilestone {
  id: string
  title: string
  description: string
  status: MilestoneStatus
  dueDate: string
  completedAt?: string
  progress: number // 0-100
  deliverables: string[]
}

export interface ProjectTestimonial {
  id: string
  clientName: string
  clientRole: string
  rating: number // 1-5
  comment: string
  createdAt: string
  isVerified: boolean
}

export interface ProjectCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface ProjectFilters {
  status?: ProjectStatus[]
  category?: string[]
  technologies?: string[]
  budgetMin?: number
  budgetMax?: number
  durationMin?: number
  durationMax?: number
  featured?: boolean
  search?: string
  sortBy?: ProjectSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface ProjectCreateData {
  title: string
  description: string
  shortDescription?: string
  category: string
  budget: number
  currency: string
  duration: number
  startDate: string
  endDate?: string
  clientName: string
  clientEmail: string
  technologies: string[]
  requirements: string[]
  deliverables: string[]
  tags: string[]
  visibility: ProjectVisibility
}

export interface ProjectUpdateData {
  title?: string
  description?: string
  shortDescription?: string
  status?: ProjectStatus
  category?: string
  budget?: number
  currency?: string
  duration?: number
  startDate?: string
  endDate?: string
  clientName?: string
  clientEmail?: string
  technologies?: string[]
  requirements?: string[]
  deliverables?: string[]
  tags?: string[]
  visibility?: ProjectVisibility
  featured?: boolean
}

export interface ProjectStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalRevenue: number
  averageProjectValue: number
  averageDuration: number
  completionRate: number
  clientSatisfaction: number
  technologiesUsed: TechnologyStats[]
  categoryBreakdown: CategoryStats[]
}

export interface TechnologyStats {
  name: string
  count: number
  percentage: number
}

export interface CategoryStats {
  category: string
  count: number
  percentage: number
  totalRevenue: number
}

export enum ProjectStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ARCHIVED = 'archived'
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled'
}

export enum ProjectVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  UNLISTED = 'unlisted'
}

export enum ProjectSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TITLE = 'title',
  STATUS = 'status',
  BUDGET = 'budget',
  DURATION = 'duration',
  PROGRESS = 'progress',
  CLIENT_NAME = 'clientName'
}

export interface ProjectSearchResult {
  data: Project[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ProjectGallery {
  id: string
  projectId: string
  images: ProjectImage[]
  videos?: ProjectVideo[]
  totalMedia: number
}

export interface ProjectVideo {
  id: string
  url: string
  thumbnail: string
  duration: number
  title: string
  description?: string
  order: number
}

export interface ProjectTechStack {
  id: string
  projectId: string
  technologies: ProjectTechnology[]
  frameworks: ProjectFramework[]
  tools: ProjectTool[]
  databases: ProjectDatabase[]
}

export interface ProjectTechnology {
  id: string
  name: string
  version?: string
  category: string
  icon: string
  color: string
  proficiency: number // 1-5
}

export interface ProjectFramework {
  id: string
  name: string
  version?: string
  technology: string
  icon: string
  color: string
}

export interface ProjectTool {
  id: string
  name: string
  category: string
  icon: string
  color: string
}

export interface ProjectDatabase {
  id: string
  name: string
  version?: string
  type: string
  icon: string
  color: string
}
