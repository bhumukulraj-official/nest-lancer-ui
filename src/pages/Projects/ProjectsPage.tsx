/**
 * ProjectsPage Component
 * Main page for managing projects
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { ProjectList, ProjectForm } from '../../components/features/projects'
import { ProjectApiService } from '../../services/project'
import { Project, ProjectCreateData, ProjectUpdateData, ProjectFilters } from '../../types/models/project.types'
import { useToast } from '../../hooks/ui/useToast'

const ProjectsPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { showToast } = useToast()

  // State management
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProjectFilters>({})
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  // Form states
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Load projects on component mount
  useEffect(() => {
    loadProjects()
  }, [filters])

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await ProjectApiService.getProjects(filters)
      setProjects(result.data)
    } catch (err) {
      setError('Failed to load projects. Please try again.')
      console.error('Error loading projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (data: ProjectCreateData | ProjectUpdateData) => {
    try {
      setFormLoading(true)
      setFormError(null)
      
      const newProject = await ProjectApiService.createProject(data as ProjectCreateData)
      setProjects(prev => [newProject, ...prev])
      setCreateDialogOpen(false)
      showToast('Project created successfully!', 'success')
    } catch (err) {
      setFormError('Failed to create project. Please try again.')
      console.error('Error creating project:', err)
    } finally {
      setFormLoading(false)
    }
  }

  const handleEditProject = async (data: ProjectUpdateData) => {
    if (!selectedProject) return

    try {
      setFormLoading(true)
      setFormError(null)
      
      const updatedProject = await ProjectApiService.updateProject(selectedProject.id, data)
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p))
      setEditDialogOpen(false)
      setSelectedProject(null)
      showToast('Project updated successfully!', 'success')
    } catch (err) {
      setFormError('Failed to update project. Please try again.')
      console.error('Error updating project:', err)
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteProject = async (project: Project) => {
    if (!window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return
    }

    try {
      await ProjectApiService.deleteProject(project.id)
      setProjects(prev => prev.filter(p => p.id !== project.id))
      showToast('Project deleted successfully!', 'success')
    } catch (err) {
      showToast('Failed to delete project. Please try again.', 'error')
      console.error('Error deleting project:', err)
    }
  }

  const handleToggleFeatured = async (project: Project) => {
    try {
      const updatedProject = await ProjectApiService.updateProject(project.id, {
        featured: !project.featured
      })
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p))
      showToast(
        updatedProject.featured 
          ? 'Project added to featured!' 
          : 'Project removed from featured!', 
        'success'
      )
    } catch (err) {
      showToast('Failed to update project. Please try again.', 'error')
      console.error('Error updating project:', err)
    }
  }

  const handleViewProject = (project: Project) => {
    // Navigate to project detail page
    // This would typically use React Router
    console.log('View project:', project.id)
    showToast('Project detail page coming soon!', 'info')
  }

  const handleEditProjectClick = (project: Project) => {
    setSelectedProject(project)
    setEditDialogOpen(true)
  }

  const handleRefresh = () => {
    loadProjects()
  }

  const handleFiltersChange = (newFilters: ProjectFilters) => {
    setFilters(newFilters)
  }

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false)
    setFormError(null)
  }

  const handleEditDialogClose = () => {
    setEditDialogOpen(false)
    setSelectedProject(null)
    setFormError(null)
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your projects, track progress, and showcase your work
        </Typography>
      </Box>

      {/* Projects List */}
      <ProjectList
        projects={projects}
        loading={loading}
        error={error}
        onViewProject={handleViewProject}
        onEditProject={handleEditProjectClick}
        onDeleteProject={handleDeleteProject}
        onToggleFeatured={handleToggleFeatured}
        onCreateProject={() => setCreateDialogOpen(true)}
        onRefresh={handleRefresh}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        variant={viewMode}
        onVariantChange={setViewMode}
        showActions={true}
      />

      {/* Create Project Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={handleCreateDialogClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={handleCreateDialogClose}
            loading={formLoading}
            error={formError}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <ProjectForm
              project={selectedProject}
              onSubmit={handleEditProject}
              onCancel={handleEditDialogClose}
              loading={formLoading}
              error={formError}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add project"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000
          }}
          onClick={() => setCreateDialogOpen(true)}
        >
          <Add />
        </Fab>
      )}
    </Box>
  )
}

export default ProjectsPage
