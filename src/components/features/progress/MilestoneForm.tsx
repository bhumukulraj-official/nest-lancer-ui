/**
 * MilestoneForm Component
 * Milestone creation form with milestone details and timeline estimation
 */

import React, { useState } from 'react'
import { Box, TextField, Button, Grid, Stack, Divider } from '@mui/material'
import { Save, Cancel } from '@mui/icons-material'

interface MilestoneFormProps {
  onSubmit: (data: any) => void
  onCancel?: () => void
  initialData?: any
}

export const MilestoneForm: React.FC<MilestoneFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate || '',
    estimatedHours: initialData?.estimatedHours || 0,
  })

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Milestone Title"
            required
            value={formData.title}
            onChange={e => handleChange('title', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={formData.description}
            onChange={e => handleChange('description', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="Due Date"
            value={formData.dueDate}
            onChange={e => handleChange('dueDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Estimated Hours"
            value={formData.estimatedHours}
            onChange={e => handleChange('estimatedHours', parseInt(e.target.value) || 0)}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onCancel} startIcon={<Cancel />}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" startIcon={<Save />}>
              Save Milestone
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MilestoneForm

