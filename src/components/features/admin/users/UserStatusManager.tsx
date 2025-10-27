/**
 * User Status Manager Component
 * Manage user status, activation, and deactivation
 */

import { Box, Paper, Typography, Chip, Switch, FormControlLabel } from '@mui/material'
import React from 'react'

import { User } from '@/types/models/user.types'

interface UserStatusManagerProps {
  user: User
  onStatusChange: (isActive: boolean) => void
}

const UserStatusManager: React.FC<UserStatusManagerProps> = ({ user, onStatusChange }) => {
  const isActive = user.isActive

  const handleToggle = () => {
    onStatusChange(!isActive)
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        User Status Management
      </Typography>

      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={handleToggle}
              color="primary"
            />
          }
          label={
            <Box>
              <Typography variant="body1">
                Account Status: <strong>{isActive ? 'Active' : 'Inactive'}</strong>
              </Typography>
              <Chip
                label={isActive ? 'Active' : 'Inactive'}
                size="small"
                color={isActive ? 'success' : 'default'}
                sx={{ ml: 1 }}
              />
            </Box>
          }
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {isActive
            ? 'Deactivating this account will prevent the user from logging in and accessing their account.'
            : 'Activating this account will allow the user to log in and access their account.'}
        </Typography>
      </Box>
    </Paper>
  )
}

export default UserStatusManager

