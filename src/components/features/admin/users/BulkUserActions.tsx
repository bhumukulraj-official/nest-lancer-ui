/**
 * Bulk User Actions Component
 * Actions for managing multiple users at once
 */

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, FormControl, InputLabel , Typography } from '@mui/material'
import React, { useState } from 'react'

import { LoadingButton } from '@/components/shared/Button/LoadingButton'


interface BulkUserActionsProps {
  selectedUsers: string[]
  onActionComplete: () => void
}

const BulkUserActions: React.FC<BulkUserActionsProps> = ({ selectedUsers, onActionComplete }) => {
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setAction('')
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Implement bulk action logic
      console.log('Bulk action:', action, 'for users:', selectedUsers)
      onActionComplete()
      handleClose()
    } catch (error) {
      console.error('Error performing bulk action:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen} disabled={selectedUsers.length === 0}>
        Bulk Actions ({selectedUsers.length} selected)
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Bulk User Actions</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {selectedUsers.length} user(s) selected
          </Typography>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>Action</InputLabel>
            <Select
              value={action}
              label="Action"
              onChange={(e) => setAction(e.target.value)}
            >
              <MenuItem value="activate">Activate Users</MenuItem>
              <MenuItem value="deactivate">Deactivate Users</MenuItem>
              <MenuItem value="delete">Delete Users</MenuItem>
              <MenuItem value="export">Export Users</MenuItem>
            </Select>
          </FormControl>

          {action && (
            <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
              This action will affect {selectedUsers.length} user(s). Are you sure?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={loading}
            disabled={!action}
          >
            Apply Action
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BulkUserActions

