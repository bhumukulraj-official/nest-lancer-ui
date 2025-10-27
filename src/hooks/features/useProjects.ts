/**
 * Projects Hook
 * Custom hook for project management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'

import { ProjectApiService } from '../../services/project/projectApiService'
import type {
  Project,
  ProjectCreateData,
  ProjectUpdateData,
  ProjectFilters,
  ProjectSearchResult
} from '../../types/models/project.types'

export interface UseProjectsOptions {
  autoFetch?: boolean
  initialFilters?: ProjectFilters
}

export interface UseProjectsReturn {
  // State
  projects: Project[]
  currentProject: Project | null
  loading: boolean
  error: string | null
  filters: ProjectFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }

  // Actions
  fetchProjects: (filters?: ProjectFilters) => Promise<void>
  fetchProject: (id: string) => Promise<void>
  createProject: (data: ProjectCreateData) => Promise<Project>
  updateProject: (id: string, data: ProjectUpdateData) => Promise<Project>
  deleteProject: (id: string) => Promise<void>
  setFilters: (filters: ProjectFilters) => void
  setCurrentProject: (project: Project | null) => void
  clearError: () => void
  refresh: () => Promise<void>
}

export function useProjects(options: UseProjectsOptions = {}): UseProjectsReturn {
  const { autoFetch = true, initialFilters = {} } = options

  // State
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProjectFilters>(initialFilters)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  // Fetch projects
  const fetchProjects = useCallback(async (newFilters?: ProjectFilters) => {
    try {
      setLoading(true)
      setError(null)

      const searchFilters = newFilters || filters
      const result: ProjectSearchResult = await ProjectApiService.getProjects(searchFilters)

      setProjects(result.data)
      setPagination({
        page: result.pagination.page,
        limit: result.pagination.limit,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects'
      setError(errorMessage)
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Fetch single project
  const fetchProject = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const project = await ProjectApiService.getProject(id)
      setCurrentProject(project)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch project'
      setError(errorMessage)
      console.error('Error fetching project:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create project
  const createProject = useCallback(async (data: ProjectCreateData): Promise<Project> => {
    try {
      setLoading(true)
      setError(null)

      const project = await ProjectApiService.createProject(data)
      setProjects(prev => [project, ...prev])
      setCurrentProject(project)
      
      return project
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create project'
      setError(errorMessage)
      console.error('Error creating project:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update project
  const updateProject = useCallback(async (id: string, data: ProjectUpdateData): Promise<Project> => {
    try {
      setLoading(true)
      setError(null)

      const project = await ProjectApiService.updateProject(id, data)
      
      setProjects(prev => prev.map(p => p.id === id ? project : p))
      if (currentProject?.id === id) {
        setCurrentProject(project)
      }
      
      return project
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project'
      setError(errorMessage)
      console.error('Error updating project:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentProject])

  // Delete project
  const deleteProject = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      await ProjectApiService.deleteProject(id)
      
      setProjects(prev => prev.filter(p => p.id !== id))
      if (currentProject?.id === id) {
        setCurrentProject(null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project'
      setError(errorMessage)
      console.error('Error deleting project:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentProject])

  // Set filters
  const handleSetFilters = useCallback((newFilters: ProjectFilters) => {
    setFilters(newFilters)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Refresh
  const refresh = useCallback(async () => {
    await fetchProjects()
  }, [fetchProjects])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchProjects()
    }
  }, [autoFetch, fetchProjects])

  return {
    // State
    projects,
    currentProject,
    loading,
    error,
    filters,
    pagination,

    // Actions
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject,
    setFilters: handleSetFilters,
    setCurrentProject,
    clearError,
    refresh
  }
}

export default useProjects
