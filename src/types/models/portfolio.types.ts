/**
 * Portfolio-related TypeScript type definitions
 * These types represent the data structures for portfolio management
 */

export interface Portfolio {
  id: string
  userId: string
  title: string
  description: string
  shortDescription?: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  avatar?: string
  coverImage?: string
  isPublic: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PortfolioProject {
  id: string
  portfolioId: string
  projectId: string
  title: string
  description: string
  shortDescription?: string
  imageUrl?: string
  technologies: string[]
  category: string
  featured: boolean
  order: number
  projectUrl?: string
  githubUrl?: string
  demoUrl?: string
  startDate: string
  endDate?: string
  status: ProjectStatus
  createdAt: string
  updatedAt: string
}

export interface PortfolioSkill {
  id: string
  portfolioId: string
  name: string
  category: SkillCategory
  level: SkillLevel
  yearsOfExperience: number
  description?: string
  icon?: string
  color?: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PortfolioExperience {
  id: string
  portfolioId: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  location?: string
  companyLogo?: string
  technologies: string[]
  achievements: string[]
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PortfolioEducation {
  id: string
  portfolioId: string
  institution: string
  degree: string
  field: string
  description?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  location?: string
  institutionLogo?: string
  gpa?: number
  achievements: string[]
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PortfolioTestimonial {
  id: string
  portfolioId: string
  clientName: string
  clientRole: string
  clientCompany: string
  clientAvatar?: string
  content: string
  rating: number
  projectTitle?: string
  isVerified: boolean
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface PortfolioAchievement {
  id: string
  portfolioId: string
  title: string
  description: string
  category: AchievementCategory
  date: string
  issuer?: string
  issuerLogo?: string
  certificateUrl?: string
  verificationUrl?: string
  isVerified: boolean
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface PortfolioStats {
  totalProjects: number
  featuredProjects: number
  totalSkills: number
  yearsOfExperience: number
  totalClients: number
  averageRating: number
  totalTestimonials: number
  totalAchievements: number
  profileViews: number
  lastUpdated: string
}

export interface PortfolioFilters {
  category?: string[]
  technologies?: string[]
  featured?: boolean
  isPublic?: boolean
  search?: string
  sortBy?: PortfolioSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface PortfolioCreateData {
  title: string
  description: string
  shortDescription?: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  isPublic?: boolean
}

export interface PortfolioUpdateData {
  title?: string
  description?: string
  shortDescription?: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  avatar?: string
  coverImage?: string
  isPublic?: boolean
  isActive?: boolean
}

export interface PortfolioProjectCreateData {
  projectId: string
  title: string
  description: string
  shortDescription?: string
  imageUrl?: string
  technologies: string[]
  category: string
  featured?: boolean
  order?: number
  projectUrl?: string
  githubUrl?: string
  demoUrl?: string
  startDate: string
  endDate?: string
  status: ProjectStatus
}

export interface PortfolioSkillCreateData {
  name: string
  category: SkillCategory
  level: SkillLevel
  yearsOfExperience: number
  description?: string
  icon?: string
  color?: string
  order?: number
}

export interface PortfolioExperienceCreateData {
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  location?: string
  companyLogo?: string
  technologies: string[]
  achievements: string[]
  order?: number
}

export interface PortfolioEducationCreateData {
  institution: string
  degree: string
  field: string
  description?: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  location?: string
  institutionLogo?: string
  gpa?: number
  achievements: string[]
  order?: number
}

export interface PortfolioTestimonialCreateData {
  clientName: string
  clientRole: string
  clientCompany: string
  clientAvatar?: string
  content: string
  rating: number
  projectTitle?: string
  order?: number
}

export interface PortfolioAchievementCreateData {
  title: string
  description: string
  category: AchievementCategory
  date: string
  issuer?: string
  issuerLogo?: string
  certificateUrl?: string
  verificationUrl?: string
  order?: number
}

export interface PortfolioSearchResult {
  portfolios: Portfolio[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled'
}

export enum SkillCategory {
  PROGRAMMING_LANGUAGES = 'programming_languages',
  FRAMEWORKS = 'frameworks',
  DATABASES = 'databases',
  TOOLS = 'tools',
  DESIGN = 'design',
  SOFT_SKILLS = 'soft_skills',
  LANGUAGES = 'languages',
  OTHER = 'other'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum AchievementCategory {
  CERTIFICATION = 'certification',
  AWARD = 'award',
  RECOGNITION = 'recognition',
  PUBLICATION = 'publication',
  SPEAKING = 'speaking',
  CONTRIBUTION = 'contribution',
  OTHER = 'other'
}

export enum PortfolioSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TITLE = 'title',
  VIEWS = 'views',
  RATING = 'rating',
  PROJECTS_COUNT = 'projectsCount'
}

export interface PortfolioAnalytics {
  profileViews: number
  projectViews: number
  contactRequests: number
  socialClicks: number
  viewsByMonth: MonthlyViews[]
  topProjects: ProjectViews[]
  trafficSources: TrafficSource[]
  lastUpdated: string
}

export interface MonthlyViews {
  month: string
  year: number
  views: number
}

export interface ProjectViews {
  projectId: string
  title: string
  views: number
}

export interface TrafficSource {
  source: string
  visits: number
  percentage: number
}

export interface PortfolioTheme {
  id: string
  name: string
  description: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  accentColor: string
  fontFamily: string
  layout: string
  isPremium: boolean
  preview: string
}

export interface PortfolioSettings {
  id: string
  portfolioId: string
  theme: string
  layout: string
  showSkills: boolean
  showExperience: boolean
  showEducation: boolean
  showTestimonials: boolean
  showAchievements: boolean
  showContactForm: boolean
  allowDirectContact: boolean
  customCss?: string
  customJs?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  createdAt: string
  updatedAt: string
}
