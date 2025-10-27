/**
 * ProjectCard Component
 * Displays project information in a card format
 */

import {
  Visibility,
  Edit,
  Delete,
  Star,
  StarBorder,
  Schedule,
  AttachMoney,
  CalendarToday,
  MoreVert
} from '@mui/icons-material'
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Chip,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  LinearProgress,
  Stack
} from '@mui/material'
import React from 'react'

import { Project, ProjectStatus } from '../../../types/models/project.types'

interface ProjectCardProps {
  project: Project
  onView?: (project: Project) => void
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void
  onToggleFeatured?: (project: Project) => void
  showActions?: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onView,
  onEdit,
  onDelete,
  onToggleFeatured,
  showActions = true,
  variant = 'default'
}) => {
  const getStatusColor = (status: ProjectStatus): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (status) {
      case ProjectStatus.ACTIVE:
      case ProjectStatus.IN_PROGRESS:
        return 'primary'
      case ProjectStatus.COMPLETED:
        return 'success'
      case ProjectStatus.ON_HOLD:
        return 'warning'
      case ProjectStatus.CANCELLED:
        return 'error'
      case ProjectStatus.DRAFT:
        return 'default'
      default:
        return 'default'
    }
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

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDurationText = (duration: number): string => {
    if (duration < 30) {
      return `${duration} days`
    } else if (duration < 365) {
      const months = Math.round(duration / 30)
      return `${months} month${months > 1 ? 's' : ''}`
    } else {
      const years = Math.round(duration / 365)
      return `${years} year${years > 1 ? 's' : ''}`
    }
  }

  const primaryImage = project.images?.find(img => img.isPrimary) || project.images?.[0]

  if (variant === 'compact') {
    return (
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            {primaryImage && (
              <CardMedia
                component="img"
                sx={{ width: 80, height: 60, borderRadius: 1, objectFit: 'cover' }}
                image={primaryImage.url}
                alt={primaryImage.alt}
              />
            )}
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="h6" component="h3" noWrap>
                {project.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {project.clientName}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={getStatusLabel(project.status)}
                  color={getStatusColor(project.status)}
                  size="small"
                />
                <Chip
                  label={formatCurrency(project.budget, project.currency)}
                  variant="outlined"
                  size="small"
                  icon={<AttachMoney />}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
        {showActions && (
          <CardActions sx={{ p: 1, pt: 0 }}>
            <IconButton size="small" onClick={() => onView?.(project)}>
              <Visibility />
            </IconButton>
            <IconButton size="small" onClick={() => onEdit?.(project)}>
              <Edit />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete?.(project)}>
              <Delete />
            </IconButton>
          </CardActions>
        )}
      </Card>
    )
  }

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      {/* Project Image */}
      {primaryImage && (
        <CardMedia
          component="img"
          height="200"
          image={primaryImage.url}
          alt={primaryImage.alt}
          sx={{ objectFit: 'cover' }}
        />
      )}

      {/* Featured Badge */}
      {project.featured && (
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
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Project Title */}
        <Typography variant="h6" component="h3" gutterBottom>
          {project.title}
        </Typography>

        {/* Project Description */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {project.shortDescription || project.description}
        </Typography>

        {/* Client Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Avatar sx={{ width: 24, height: 24 }}>
            {project.clientName.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {project.clientName}
          </Typography>
        </Box>

        {/* Project Stats */}
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AttachMoney fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {formatCurrency(project.budget, project.currency)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Schedule fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {getDurationText(project.duration)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {formatDate(project.startDate)}
            </Typography>
          </Box>
        </Stack>

        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={project.progress} 
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>

        {/* Status and Technologies */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip
            label={getStatusLabel(project.status)}
            color={getStatusColor(project.status)}
            size="small"
          />
          {project.technologies.slice(0, 2).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              variant="outlined"
              size="small"
            />
          ))}
          {project.technologies.length > 2 && (
            <Chip
              label={`+${project.technologies.length - 2}`}
              variant="outlined"
              size="small"
            />
          )}
        </Box>
      </CardContent>

      {/* Card Actions */}
      {showActions && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
            <Tooltip title="View Details">
              <IconButton onClick={() => onView?.(project)}>
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Project">
              <IconButton onClick={() => onEdit?.(project)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title={project.featured ? 'Remove from Featured' : 'Add to Featured'}>
              <IconButton onClick={() => onToggleFeatured?.(project)}>
                {project.featured ? <Star color="warning" /> : <StarBorder />}
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="More Options">
            <IconButton onClick={() => onDelete?.(project)}>
              <MoreVert />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  )
}

export default ProjectCard
