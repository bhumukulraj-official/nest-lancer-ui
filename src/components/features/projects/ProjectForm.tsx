/**
 * ProjectForm Component
 * Form for creating and editing projects
 */

import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormControlLabel,
  Switch,
  Stack,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardHeader
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useState, useEffect } from 'react'

import { Project, ProjectCreateData, ProjectUpdateData, ProjectVisibility, ProjectCategory } from '../../../types/models/project.types'

interface ProjectFormProps {
  project?: Project
  categories?: ProjectCategory[]
  technologies?: string[]
  onSubmit: (data: ProjectCreateData | ProjectUpdateData) => Promise<void>
  onCancel: () => void
  loading?: boolean
  error?: string | null
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  categories = [],
  onSubmit,
  onCancel,
  loading = false,
  error = null
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    budget: 0,
    currency: 'USD',
    duration: 30,
    startDate: new Date(),
    endDate: null as Date | null,
    clientName: '',
    clientEmail: '',
    technologies: [] as string[],
    requirements: [] as string[],
    deliverables: [] as string[],
    tags: [] as string[],
    visibility: ProjectVisibility.PUBLIC,
    featured: false
  })

  const [newRequirement, setNewRequirement] = useState('')
  const [newDeliverable, setNewDeliverable] = useState('')
  const [newTag, setNewTag] = useState('')
  const [newTechnology, setNewTechnology] = useState('')

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        shortDescription: project.shortDescription || '',
        category: typeof project.category === 'string' ? project.category : project.category.id,
        budget: project.budget,
        currency: project.currency,
        duration: project.duration,
        startDate: new Date(project.startDate),
        endDate: project.endDate ? new Date(project.endDate) : null,
        clientName: project.clientName,
        clientEmail: project.clientEmail,
        technologies: project.technologies,
        requirements: project.requirements,
        deliverables: project.deliverables,
        tags: project.tags,
        visibility: project.visibility,
        featured: project.featured
      })
    }
  }, [project])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayAdd = (field: string, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field as keyof typeof prev] as string[], value.trim()]
      }))
      setter('')
    }
  }

  const handleArrayRemove = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = {
      ...formData,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate?.toISOString()
    }

    await onSubmit(submitData)
  }

  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.description.trim() &&
      formData.category &&
      formData.budget > 0 &&
      formData.duration > 0 &&
      formData.clientName.trim() &&
      formData.clientEmail.trim() &&
      formData.technologies.length > 0
    )
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Basic Information" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Project Title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                      error={!formData.title.trim()}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth required>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Short Description"
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                      placeholder="Brief description for cards and previews"
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Project Description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      required
                      multiline
                      rows={4}
                      error={!formData.description.trim()}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Project Details */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Project Details" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', Number(e.target.value))}
                      required
                      error={formData.budget <= 0}
                      InputProps={{
                        startAdornment: (
                          <FormControl sx={{ minWidth: 80, mr: 1 }}>
                            <Select
                              value={formData.currency}
                              onChange={(e) => handleInputChange('currency', e.target.value)}
                              size="small"
                            >
                              <MenuItem value="USD">USD</MenuItem>
                              <MenuItem value="EUR">EUR</MenuItem>
                              <MenuItem value="GBP">GBP</MenuItem>
                              <MenuItem value="INR">INR</MenuItem>
                            </Select>
                          </FormControl>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Duration (days)"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', Number(e.target.value))}
                      required
                      error={formData.duration <= 0}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Start Date"
                      value={formData.startDate}
                      onChange={(date) => handleInputChange('startDate', date)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="End Date (Optional)"
                      value={formData.endDate}
                      onChange={(date) => handleInputChange('endDate', date)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Client Information */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Client Information" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Client Name"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      required
                      error={!formData.clientName.trim()}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Client Email"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                      required
                      error={!formData.clientEmail.trim()}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Technologies */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Technologies" />
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {formData.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        onDelete={() => handleArrayRemove('technologies', index)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Add technology"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleArrayAdd('technologies', newTechnology, setNewTechnology)
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => handleArrayAdd('technologies', newTechnology, setNewTechnology)}
                      disabled={!newTechnology.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Requirements */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Requirements" />
              <CardContent>
                <Stack spacing={2}>
                  {formData.requirements.map((req, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {req}
                      </Typography>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleArrayRemove('requirements', index)}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Add requirement"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleArrayAdd('requirements', newRequirement, setNewRequirement)
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => handleArrayAdd('requirements', newRequirement, setNewRequirement)}
                      disabled={!newRequirement.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Deliverables */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Deliverables" />
              <CardContent>
                <Stack spacing={2}>
                  {formData.deliverables.map((del, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {del}
                      </Typography>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleArrayRemove('deliverables', index)}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Add deliverable"
                      value={newDeliverable}
                      onChange={(e) => setNewDeliverable(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleArrayAdd('deliverables', newDeliverable, setNewDeliverable)
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => handleArrayAdd('deliverables', newDeliverable, setNewDeliverable)}
                      disabled={!newDeliverable.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Tags and Settings */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Tags and Settings" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {formData.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            onDelete={() => handleArrayRemove('tags', index)}
                            color="secondary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          size="small"
                          placeholder="Add tag"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              handleArrayAdd('tags', newTag, setNewTag)
                            }
                          }}
                        />
                        <Button
                          variant="outlined"
                          onClick={() => handleArrayAdd('tags', newTag, setNewTag)}
                          disabled={!newTag.trim()}
                        >
                          Add
                        </Button>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                      <FormControl fullWidth>
                        <InputLabel>Visibility</InputLabel>
                        <Select
                          value={formData.visibility}
                          onChange={(e) => handleInputChange('visibility', e.target.value)}
                        >
                          <MenuItem value={ProjectVisibility.PUBLIC}>Public</MenuItem>
                          <MenuItem value={ProjectVisibility.PRIVATE}>Private</MenuItem>
                          <MenuItem value={ProjectVisibility.UNLISTED}>Unlisted</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.featured}
                            onChange={(e) => handleInputChange('featured', e.target.checked)}
                          />
                        }
                        label="Featured Project"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Form Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid() || loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {project ? 'Update Project' : 'Create Project'}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  )
}

export default ProjectForm
