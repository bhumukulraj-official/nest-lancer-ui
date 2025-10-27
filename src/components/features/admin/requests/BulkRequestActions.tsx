/**
 * Bulk Request Actions Component
 * Actions for managing multiple requests at once
 */

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
} from '@mui/material'
import React, { useState } from 'react'

import { LoadingButton } from '@/components/shared/Button/LoadingButton'

interface BulkRequestActionsProps {
  selectedRequests: string[]
  onActionComplete: () => void
}

const BulkRequestActions: React.FC<BulkRequestActionsProps> = ({ selectedRequests, onActionComplete }) => {
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
      console.log('Bulk action:', action, 'for requests:', selectedRequests)
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
      <Button variant="contained" onClick={handleOpen} disabled={selectedRequests.length === 0}>
        Bulk Actions ({selectedRequests.length} selected)
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Bulk Request Actions</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {selectedRequests.length} request(s) selected
          </Typography>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>Action</InputLabel>
            <Select
              value={action}
              label="Action"
              onChange={(e) => setAction(e.target.value)}
            >
              <MenuItem value="approve">Approve Requests</MenuItem>
              <MenuItem value="reject">Reject Requests</MenuItem>
              <MenuItem value="archive">Archive Requests</MenuItem>
              <MenuItem value="delete">Delete Requests</MenuItem>
            </Select>
          </FormControl>

          {action && (
            <Box sx={{ mt: 2 }}>
              <Chip
                label={`This action will affect ${selectedRequests.length} request(s)`}
                color="warning"
                size="small"
              />
            </Box>
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

export default BulkRequestActions

