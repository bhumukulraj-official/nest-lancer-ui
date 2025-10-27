/**
 * User Detail Component
 * Detailed user view with profile information and activity history
 */

import React from 'react'
import { Box, Paper, Typography, Chip, Grid, Avatar, Divider } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import { LoadingButton } from '@/components/shared/Button/LoadingButton'
import { User } from '@/types/models/user.types'
import { formatDate } from '@/utils/formatters/dateFormatter'

interface UserDetailProps {
  user: User
  onEdit?: () => void
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onEdit }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: 80, height: 80 }}
          >
            {user.firstName?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="h5" component="h2">
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              <Chip label={user.role} size="small" color="primary" />
              <Chip
                label={user.isActive ? 'Active' : 'Inactive'}
                size="small"
                color={user.isActive ? 'success' : 'default'}
              />
            </Box>
          </Box>
        </Box>
        <LoadingButton
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onEdit}
        >
          Edit User
        </LoadingButton>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Contact Information
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            {user.phone && (
              <Typography variant="body2" gutterBottom>
                <strong>Phone:</strong> {user.phone}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Account Information
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Created:</strong> {formatDate(user.createdAt)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Last Active:</strong> {user.lastActiveAt ? formatDate(user.lastActiveAt) : 'Never'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Email Verified:</strong>{' '}
              {user.isEmailVerified ? (
                <Chip label="Verified" size="small" color="success" />
              ) : (
                <Chip label="Not Verified" size="small" color="default" />
              )}
            </Typography>
          </Box>
        </Grid>

        {user.bio && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Bio
            </Typography>
            <Typography variant="body2">{user.bio}</Typography>
          </Grid>
        )}

        {user.skills && user.skills.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {user.skills.map((skill, index) => (
                <Chip key={index} label={skill} size="small" />
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default UserDetail

