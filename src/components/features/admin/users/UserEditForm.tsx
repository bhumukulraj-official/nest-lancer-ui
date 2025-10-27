/**
 * User Edit Form Component
 * Form for editing user information and roles
 */

import React, { useState } from 'react'
import { Box, Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { LoadingButton } from '@/components/shared/Button/LoadingButton'
import { Input } from '@/components/shared/FormControls/Input'
import { User } from '@/types/models/user.types'
import { UserRole } from '@/types/models/user.types'

interface UserEditFormProps {
  user: User
  onSubmit: (data: Partial<User>) => void
  onCancel: () => void
}

const UserEditForm: React.FC<UserEditFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email,
    phone: user.phone || '',
    role: user.role,
    isActive: user.isActive || false,
    bio: user.bio || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error updating user:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Edit User
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
              required
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              >
                <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                <MenuItem value={UserRole.FREELANCER}>Freelancer</MenuItem>
                <MenuItem value={UserRole.CLIENT}>Client</MenuItem>
                <MenuItem value={UserRole.USER}>User</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.isActive ? 'active' : 'inactive'}
                label="Status"
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <LoadingButton variant="outlined" onClick={onCancel} disabled={loading}>
                Cancel
              </LoadingButton>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Save Changes
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default UserEditForm

