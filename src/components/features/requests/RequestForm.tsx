/**
 * RequestForm Component
 * Request creation form with project requirements and budget settings
 */

import {
  Save,
  Cancel,
  AttachMoney,
  Assignment,
} from '@mui/icons-material'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Button,
  Stack,
  Alert,
  Typography,
  CircularProgress,
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Chip,
} from '@mui/material'
import React, { useState } from 'react'

import { RequestFormData } from '@/types/forms/request.form.types'

interface RequestFormProps {
  onSubmit: (data: RequestFormData) => Promise<void>
  onCancel?: () => void
  initialData?: Partial<RequestFormData>
  loading?: boolean
}

export const RequestForm: React.FC<RequestFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  loading = false,
}) => {
  const [formData, setFormData] = useState<RequestFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    category: initialData?.category || '',
    subcategory: initialData?.subcategory || '',
    budget: initialData?.budget || 0,
    currency: initialData?.currency || 'USD',
    timeline: initialData?.timeline || '',
    requirements: initialData?.requirements || [],
    contactInfo: initialData?.contactInfo || {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: ''
    },
    location: initialData?.location,
    skills: initialData?.skills || [],
    tags: initialData?.tags || [],
    priority: initialData?.priority || 'medium',
    isUrgent: initialData?.isUrgent || false,
    estimatedDuration: initialData?.estimatedDuration,
    estimatedComplexity: initialData?.estimatedComplexity,
    deadline: initialData?.deadline || '',
  })

  const [error, setError] = useState<string | null>(null)
  const [newSkill, setNewSkill] = useState('')

  const handleChange = (field: keyof RequestFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title || !formData.description || !formData.deadline) {
      setError('Please fill in all required fields')
      return
    }

    try {
      await onSubmit(formData)
    } catch (err) {
      setError('Failed to create request. Please try again.')
      console.error('Request creation error:', err)
    }
  }

  return (
    <Card>
      <CardHeader
        title="Create Service Request"
        subheader="Fill in the details to create your service request"
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assignment />
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Request Title"
                required
                value={formData.title}
                onChange={e => handleChange('title', e.target.value)}
                placeholder="e.g., Need React Developer for E-commerce Website"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Description"
                required
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder="Describe your project requirements, features needed, timeline, etc."
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Category"
                value={formData.category}
                onChange={e => handleChange('category', e.target.value)}
              >
                <MenuItem value="web">Web Development</MenuItem>
                <MenuItem value="mobile">Mobile Development</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="writing">Writing</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority"
                  onChange={e => handleChange('priority', e.target.value)}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Divider sx={{ my: 2, width: '100%' }} />

            {/* Budget & Timeline */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoney />
                Budget & Timeline
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Budget ($)"
                value={formData.budget}
                onChange={e => handleChange('budget', parseFloat(e.target.value) || 0)}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Deadline"
                required
                value={formData.deadline}
                onChange={e => handleChange('deadline', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Divider sx={{ my: 2, width: '100%' }} />

            {/* Skills Required */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Required Skills
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Add Skill"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddSkill()
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddSkill}
                  disabled={!newSkill.trim()}
                >
                  Add
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {formData.skills.map(skill => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Grid>

            {/* Actions */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  disabled={loading}
                  startIcon={<Cancel />}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                >
                  {loading ? 'Creating...' : 'Create Request'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default RequestForm

