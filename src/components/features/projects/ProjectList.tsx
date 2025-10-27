/**
 * ProjectList Component
 * Displays a list of projects with filtering and sorting options
 */

import {
  Search,
  FilterList,
  ViewModule,
  ViewList,
  Sort,
  Refresh,
  Add
} from '@mui/icons-material'
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import React, { useState, useMemo } from 'react'

import { Project, ProjectFilters, ProjectSortBy, ProjectStatus } from '../../../types/models/project.types'

import ProjectCard from './ProjectCard'

interface ProjectListProps {
  projects: Project[]
  loading?: boolean
  error?: string | null
  onViewProject?: (project: Project) => void
  onEditProject?: (project: Project) => void
  onDeleteProject?: (project: Project) => void
  onToggleFeatured?: (project: Project) => void
  onCreateProject?: () => void
  onRefresh?: () => void
  filters?: ProjectFilters
  onFiltersChange?: (filters: ProjectFilters) => void
  showActions?: boolean
  variant?: 'grid' | 'list'
  onVariantChange?: (variant: 'grid' | 'list') => void
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  loading = false,
  error = null,
  onViewProject,
  onEditProject,
  onDeleteProject,
  onToggleFeatured,
  onCreateProject,
  onRefresh,
  filters = {},
  onFiltersChange,
  showActions = true,
  variant = 'grid',
  onVariantChange
}) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus[]>(filters.status || [])
  const [categoryFilter, setCategoryFilter] = useState<string[]>(filters.category || [])
  const [sortBy, setSortBy] = useState<ProjectSortBy>(filters.sortBy || ProjectSortBy.CREATED_AT)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(filters.sortOrder || 'desc')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter(project => statusFilter.includes(project.status))
    }

    // Category filter
    if (categoryFilter.length > 0) {
      filtered = filtered.filter(project => {
        const projectCategory = typeof project.category === 'string' ? project.category : project.category.id
        return categoryFilter.includes(projectCategory)
      })
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case ProjectSortBy.TITLE:
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case ProjectSortBy.STATUS:
          aValue = a.status
          bValue = b.status
          break
        case ProjectSortBy.BUDGET:
          aValue = a.budget
          bValue = b.budget
          break
        case ProjectSortBy.DURATION:
          aValue = a.duration
          bValue = b.duration
          break
        case ProjectSortBy.PROGRESS:
          aValue = a.progress
          bValue = b.progress
          break
        case ProjectSortBy.CLIENT_NAME:
          aValue = a.clientName.toLowerCase()
          bValue = b.clientName.toLowerCase()
          break
        case ProjectSortBy.UPDATED_AT:
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
        default:
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [projects, searchTerm, statusFilter, categoryFilter, sortBy, sortOrder])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    onFiltersChange?.({ ...filters, search: value })
  }

  const handleStatusFilterChange = (event: any) => {
    const value = event.target.value
    setStatusFilter(typeof value === 'string' ? value.split(',') : value)
    onFiltersChange?.({ ...filters, status: value })
  }


  const handleSortChange = (event: SelectChangeEvent<ProjectSortBy>) => {
    const value = event.target.value as ProjectSortBy
    setSortBy(value)
    onFiltersChange?.({ ...filters, sortBy: value })
  }

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newOrder)
    onFiltersChange?.({ ...filters, sortOrder: newOrder })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter([])
    setCategoryFilter([])
    setSortBy(ProjectSortBy.CREATED_AT)
    setSortOrder('desc')
    onFiltersChange?.({})
  }

  const getStatusLabel = (status: ProjectStatus): string => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return 'Active'
      case ProjectStatus.IN_PROGRESS:
        return 'In Progress'
      case ProjectStatus.COMPLETED:
        return 'Completed'
      case ProjectStatus.ON_HOLD:
        return 'On Hold'
      case ProjectStatus.CANCELLED:
        return 'Cancelled'
      case ProjectStatus.DRAFT:
        return 'Draft'
      case ProjectStatus.ARCHIVED:
        return 'Archived'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Projects ({filteredProjects.length})
        </Typography>
        <Stack direction="row" spacing={1}>
          {onCreateProject && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={onCreateProject}
            >
              New Project
            </Button>
          )}
          {onRefresh && (
            <Tooltip title="Refresh">
              <IconButton onClick={onRefresh}>
                <Refresh />
              </IconButton>
            </Tooltip>
          )}
          {onVariantChange && (
            <ToggleButtonGroup
              value={variant}
              exclusive
              onChange={(_, newVariant) => newVariant && onVariantChange(newVariant)}
              size="small"
            >
              <ToggleButton value="grid">
                <ViewModule />
              </ToggleButton>
              <ToggleButton value="list">
                <ViewList />
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </Stack>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search projects..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </Stack>

        {/* Advanced Filters */}
        {showFilters && (
          <Box sx={{ 
            p: 2, 
            border: 1, 
            borderColor: 'divider', 
            borderRadius: 1,
            mb: 2,
            backgroundColor: 'background.paper'
          }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  multiple
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={getStatusLabel(value)} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {Object.values(ProjectStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {getStatusLabel(status)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} onChange={handleSortChange}>
                  <MenuItem value={ProjectSortBy.CREATED_AT}>Created Date</MenuItem>
                  <MenuItem value={ProjectSortBy.UPDATED_AT}>Updated Date</MenuItem>
                  <MenuItem value={ProjectSortBy.TITLE}>Title</MenuItem>
                  <MenuItem value={ProjectSortBy.STATUS}>Status</MenuItem>
                  <MenuItem value={ProjectSortBy.BUDGET}>Budget</MenuItem>
                  <MenuItem value={ProjectSortBy.DURATION}>Duration</MenuItem>
                  <MenuItem value={ProjectSortBy.PROGRESS}>Progress</MenuItem>
                  <MenuItem value={ProjectSortBy.CLIENT_NAME}>Client</MenuItem>
                </Select>
              </FormControl>

              <IconButton onClick={handleSortOrderChange}>
                <Sort sx={{ transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none' }} />
              </IconButton>

              <Button variant="outlined" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Stack>
          </Box>
        )}
      </Box>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No projects found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm || statusFilter.length > 0 || categoryFilter.length > 0
              ? 'Try adjusting your search criteria'
              : 'Create your first project to get started'
            }
          </Typography>
        </Box>
      ) : (
        <>
          {variant === 'grid' ? (
            <Grid container spacing={3}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                  <ProjectCard
                    project={project}
                    onView={onViewProject}
                    onEdit={onEditProject}
                    onDelete={onDeleteProject}
                    onToggleFeatured={onToggleFeatured}
                    showActions={showActions}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack spacing={2}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variant="compact"
                  onView={onViewProject}
                  onEdit={onEditProject}
                  onDelete={onDeleteProject}
                  onToggleFeatured={onToggleFeatured}
                  showActions={showActions}
                />
              ))}
            </Stack>
          )}
        </>
      )}
    </Box>
  )
}

export default ProjectList
