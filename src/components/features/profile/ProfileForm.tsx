/**
 * ProfileForm Component
 * Profile editing form for personal information, skills, and portfolio
 */

import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Grid,
  Typography,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material'
import {
  Save,
  Cancel,
  Add,
  Edit,
  LinkedIn,
  GitHub,
  Twitter,
  Language,
  LocationOn,
  Work,
  Email,
  Phone,
} from '@mui/icons-material'
import { useAuth } from '@/hooks/auth/useAuth'
import { UserApiService } from '@/services/user'

interface ProfileFormProps {
  onSave?: (data: any) => void
  onCancel?: () => void
  loading?: boolean
  initialData?: any
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSave,
  onCancel,
  loading = false,
  initialData,
}) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    yearsOfExperience: 0,
    hourlyRate: 0,
    availability: 'available',
    skills: [] as string[],
    languages: [] as string[],
    timezone: '',
    tagline: '',
  })

  const [newSkill, setNewSkill] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        twitter: user.twitter || '',
        yearsOfExperience: user.yearsOfExperience || 0,
        hourlyRate: user.hourlyRate || 0,
        availability: user.availability || 'available',
        skills: user.skills || [],
        languages: user.languages || [],
        timezone: user.timezone || '',
        tagline: user.tagline || '',
      })
    }
  }, [initialData, user])

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      handleChange('skills', [...formData.skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    handleChange(
      'skills',
      formData.skills.filter(s => s !== skill)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      await UserApiService.updateCurrentUser(formData)
      setSuccess(true)
      onSave?.(formData)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to update profile. Please try again.')
      console.error('Profile update error:', err)
    }
  }

  return (
    <Card>
      <CardHeader
        title="Edit Profile"
        subheader="Update your personal information and preferences"
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Profile updated successfully!
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                required
                InputProps={{
                  startAdornment: <Edit sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                required
                disabled
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={e => handleChange('location', e.target.value)}
                InputProps={{
                  startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tagline"
                value={formData.tagline}
                onChange={e => handleChange('tagline', e.target.value)}
                placeholder="e.g., Full-Stack Developer specializing in React & Node.js"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Bio"
                value={formData.bio}
                onChange={e => handleChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </Grid>

            {/* Skills */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Skills
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
                  startIcon={<Add />}
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

            {/* Social Links */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Social Links
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Website"
                value={formData.website}
                onChange={e => handleChange('website', e.target.value)}
                InputProps={{
                  startAdornment: <Language sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="LinkedIn"
                value={formData.linkedin}
                onChange={e => handleChange('linkedin', e.target.value)}
                InputProps={{
                  startAdornment: <LinkedIn sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GitHub"
                value={formData.github}
                onChange={e => handleChange('github', e.target.value)}
                InputProps={{
                  startAdornment: <GitHub sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Twitter"
                value={formData.twitter}
                onChange={e => handleChange('twitter', e.target.value)}
                InputProps={{
                  startAdornment: <Twitter sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            {/* Professional Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Professional Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Years of Experience"
                value={formData.yearsOfExperience}
                onChange={e => handleChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                InputProps={{
                  startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Hourly Rate ($)"
                value={formData.hourlyRate}
                onChange={e => handleChange('hourlyRate', parseFloat(e.target.value) || 0)}
              />
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
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileForm
