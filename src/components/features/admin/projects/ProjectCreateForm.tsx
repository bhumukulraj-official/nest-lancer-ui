/**
 * Project Create Form Component
 * Form for creating new projects
 */

import { Add as AddIcon } from '@mui/icons-material'
import { Box, Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Chip, TextField, Button } from '@mui/material'
import React, { useState } from 'react'

import { LoadingButton } from '@/components/shared/Button/LoadingButton'
import { Input } from '@/components/shared/FormControls/Input'


interface ProjectCreateFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

const ProjectCreateForm: React.FC<ProjectCreateFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    deadline: '',
    status: 'draft',
    technologies: [] as string[],
  })
  const [techInput, setTechInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTechnology = () => {
    if (techInput && !formData.technologies.includes(techInput)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput],
      })
      setTechInput('')
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    })
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Create New Project
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Input
              label="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Budget"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Technologies
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Input
                placeholder="Add technology"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology()}
                fullWidth
              />
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddTechnology}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.technologies.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  onDelete={() => handleRemoveTechnology(tech)}
                  size="small"
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <LoadingButton variant="outlined" onClick={onCancel} disabled={loading}>
                Cancel
              </LoadingButton>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Create Project
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default ProjectCreateForm

