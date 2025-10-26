/**
 * QuoteForm Component
 * Quote creation form UI that captures inputs for pricing and terms
 */

import React, { useState } from 'react'
import {
  Box,
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
  Chip,
  Autocomplete,
} from '@mui/material'
import {
  Save,
  Cancel,
  AttachMoney,
  Schedule,
  Assignment,
} from '@mui/icons-material'
import { CreateQuoteDto } from '@/types/api'

interface QuoteFormProps {
  onSubmit: (data: CreateQuoteDto) => Promise<void>
  onCancel?: () => void
  initialData?: Partial<CreateQuoteDto>
  loading?: boolean
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  loading = false,
}) => {
  const [formData, setFormData] = useState<CreateQuoteDto>({
    requestId: initialData?.requestId || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    totalAmount: initialData?.totalAmount || 0,
    estimatedDuration: initialData?.estimatedDuration || 0,
    deadline: initialData?.deadline || '',
    termsAndConditions: initialData?.termsAndConditions || '',
    skills: initialData?.skills || [],
  })

  const [error, setError] = useState<string | null>(null)
  const [newSkill, setNewSkill] = useState('')

  const handleChange = (field: keyof CreateQuoteDto, value: any) => {
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

    if (!formData.title || !formData.description || !formData.totalAmount) {
      setError('Please fill in all required fields')
      return
    }

    try {
      await onSubmit(formData)
    } catch (err) {
      setError('Failed to create quote. Please try again.')
      console.error('Quote creation error:', err)
    }
  }

  return (
    <Card>
      <CardHeader
        title="Create Quote"
        subheader="Provide pricing and timeline for the request"
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quote Title"
                required
                value={formData.title}
                onChange={e => handleChange('title', e.target.value)}
                placeholder="e.g., Complete E-commerce Website Development"
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
                placeholder="Describe your approach, deliverables, and what's included..."
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Total Amount ($)"
                required
                value={formData.totalAmount}
                onChange={e => handleChange('totalAmount', parseFloat(e.target.value) || 0)}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Estimated Duration (days)"
                value={formData.estimatedDuration}
                onChange={e => handleChange('estimatedDuration', parseInt(e.target.value) || 0)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Deadline"
                value={formData.deadline}
                onChange={e => handleChange('deadline', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Divider sx={{ my: 2, width: '100%' }} />

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
                <Button variant="contained" onClick={handleAddSkill}>
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Terms and Conditions"
                value={formData.termsAndConditions}
                onChange={e => handleChange('termsAndConditions', e.target.value)}
                placeholder="Payment terms, deliverables, revision policy, etc."
              />
            </Grid>

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
                  {loading ? 'Creating...' : 'Create Quote'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default QuoteForm

