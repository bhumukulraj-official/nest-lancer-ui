/**
 * Project Testimonials Management Component
 * Manages testimonials for a project
 */

import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Avatar,
  Stack,
} from '@mui/material'
import { Add, Delete, Edit, Verified } from '@mui/icons-material'
import { LoadingButton } from '@/components/shared/Button/LoadingButton'

export interface Testimonial {
  id?: string
  clientName: string
  clientRole: string
  company?: string
  rating: number
  comment: string
  isVerified?: boolean
  avatar?: string
}

interface ProjectTestimonialsProps {
  projectId?: string
  testimonials: Testimonial[]
  onUpdate: (testimonials: Testimonial[]) => void
}

const ProjectTestimonials: React.FC<ProjectTestimonialsProps> = ({
  testimonials = [],
  onUpdate,
}) => {
  const [open, setOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<Testimonial>({
    clientName: '',
    clientRole: '',
    company: '',
    rating: 5,
    comment: '',
    isVerified: false,
  })

  const handleOpen = () => {
    setEditingIndex(null)
    setFormData({
      clientName: '',
      clientRole: '',
      company: '',
      rating: 5,
      comment: '',
      isVerified: false,
    })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingIndex(null)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(testimonials[index])
    setOpen(true)
  }

  const handleSubmit = () => {
    const updatedTestimonials = [...testimonials]
    
    if (editingIndex !== null) {
      updatedTestimonials[editingIndex] = formData
    } else {
      updatedTestimonials.push({
        ...formData,
        id: Date.now().toString(),
      })
    }
    
    onUpdate(updatedTestimonials)
    handleClose()
  }

  const handleDelete = (index: number) => {
    const updatedTestimonials = testimonials.filter((_, i) => i !== index)
    onUpdate(updatedTestimonials)
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2">
            Testimonials
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
            Add Testimonial
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
          Manage client testimonials and reviews for this project
        </Typography>

        {testimonials.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No testimonials yet
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleOpen}
              sx={{ mt: 2 }}
            >
              Add First Testimonial
            </Button>
          </Box>
        ) : (
          <Stack spacing={2}>
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id || index} variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.clientName}
                        sx={{ width: 56, height: 56 }}
                      >
                        {testimonial.clientName.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {testimonial.clientName}
                          </Typography>
                          {testimonial.isVerified && (
                            <Chip
                              icon={<Verified />}
                              label="Verified"
                              size="small"
                              color="success"
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.clientRole}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
                          <Rating value={testimonial.rating} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.rating} stars
                          </Typography>
                        </Box>
                        <Typography variant="body2">{testimonial.comment}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(index)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(index)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingIndex !== null ? 'Edit Testimonial' : 'Add Testimonial'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                fullWidth
                label="Client Name"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Client Role"
                value={formData.clientRole}
                onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
              <TextField
                fullWidth
                label="Rating"
                type="number"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
                inputProps={{ min: 1, max: 5 }}
              />
              <TextField
                fullWidth
                label="Comment"
                multiline
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton onClick={handleSubmit} variant="contained">
              {editingIndex !== null ? 'Update' : 'Add'} Testimonial
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default ProjectTestimonials

