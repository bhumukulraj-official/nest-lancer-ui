/**
 * FeaturedProjects Component
 * Displays featured projects in a grid layout
 */

import {
  Visibility,
  GitHub,
  Launch,
  Star,
  Code,
  CalendarToday
} from '@mui/icons-material'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material'
import React from 'react'

import type { PortfolioProject } from '../../../types/models/portfolio.types'

interface FeaturedProjectsProps {
  projects: PortfolioProject[]
  onViewProject?: (project: PortfolioProject) => void
  onEditProject?: (project: PortfolioProject) => void
  onToggleFeatured?: (project: PortfolioProject) => void
  showActions?: boolean
  maxProjects?: number
  variant?: 'grid' | 'carousel' | 'list'
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onViewProject,
  onEditProject,
  onToggleFeatured,
  showActions = true,
  maxProjects = 6,
  variant = 'grid'
}) => {
  const featuredProjects = projects
    .filter(project => project.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, maxProjects)

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in_progress':
        return 'primary'
      case 'planning':
        return 'info'
      case 'on_hold':
        return 'warning'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in_progress':
        return 'In Progress'
      case 'planning':
        return 'Planning'
      case 'on_hold':
        return 'On Hold'
      case 'cancelled':
        return 'Cancelled'
      default:
        return status
    }
  }

  if (featuredProjects.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No featured projects yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add some projects to your portfolio to showcase your work
        </Typography>
      </Box>
    )
  }

  if (variant === 'list') {
    return (
      <Stack spacing={2}>
        {featuredProjects.map((project) => (
          <Card key={project.id} sx={{ display: 'flex', height: 200 }}>
            {project.imageUrl && (
              <CardMedia
                component="img"
                sx={{ width: 300, objectFit: 'cover' }}
                image={project.imageUrl}
                alt={project.title}
              />
            )}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h6" component="h3">
                  {project.title}
                </Typography>
                <Chip
                  label={getStatusLabel(project.status)}
                  color={getStatusColor(project.status)}
                  size="small"
                />
              </Box>
              
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  flexGrow: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {project.description}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Chip key={tech} label={tech} size="small" variant="outlined" />
                  ))}
                  {project.technologies.length > 3 && (
                    <Chip label={`+${project.technologies.length - 3}`} size="small" variant="outlined" />
                  )}
                </Stack>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarToday fontSize="small" />
                    <Typography variant="caption">
                      {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>

            {showActions && (
              <CardActions sx={{ flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
                <Tooltip title="View Project">
                  <IconButton onClick={() => onViewProject?.(project)}>
                    <Visibility />
                  </IconButton>
                </Tooltip>
                {project.githubUrl && (
                  <Tooltip title="GitHub">
                    <IconButton href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <GitHub />
                    </IconButton>
                  </Tooltip>
                )}
                {project.demoUrl && (
                  <Tooltip title="Live Demo">
                    <IconButton href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Launch />
                    </IconButton>
                  </Tooltip>
                )}
              </CardActions>
            )}
          </Card>
        ))}
      </Stack>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Featured Projects
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {featuredProjects.length} project{featuredProjects.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {featuredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              {/* Project Image */}
              {project.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={project.imageUrl}
                  alt={project.title}
                  sx={{ objectFit: 'cover' }}
                />
              )}

              {/* Featured Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1
                }}
              >
                <Chip
                  icon={<Star />}
                  label="Featured"
                  color="warning"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                {/* Project Title and Status */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ flexGrow: 1, mr: 1 }}>
                    {project.title}
                  </Typography>
                  <Chip
                    label={getStatusLabel(project.status)}
                    color={getStatusColor(project.status)}
                    size="small"
                  />
                </Box>

                {/* Project Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {project.shortDescription || project.description}
                </Typography>

                {/* Technologies */}
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    ))}
                    {project.technologies.length > 4 && (
                      <Chip
                        label={`+${project.technologies.length - 4}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    )}
                  </Stack>
                </Box>

                {/* Project Meta */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarToday fontSize="small" />
                    <Typography variant="caption">
                      {formatDate(project.startDate)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Code fontSize="small" />
                    <Typography variant="caption">
                      {project.category}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              {/* Card Actions */}
              {showActions && (
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => onViewProject?.(project)}
                    >
                      View
                    </Button>
                    {project.demoUrl && (
                      <Button
                        size="small"
                        startIcon={<Launch />}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Demo
                      </Button>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {project.githubUrl && (
                      <Tooltip title="GitHub">
                        <IconButton
                          size="small"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GitHub />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onEditProject && (
                      <Tooltip title="Edit Project">
                        <IconButton size="small" onClick={() => onEditProject(project)}>
                          <Code />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onToggleFeatured && (
                      <Tooltip title={project.featured ? 'Remove from Featured' : 'Add to Featured'}>
                        <IconButton size="small" onClick={() => onToggleFeatured(project)}>
                          <Star color={project.featured ? 'warning' : 'action'} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FeaturedProjects
