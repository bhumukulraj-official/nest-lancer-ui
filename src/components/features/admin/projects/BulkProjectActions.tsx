/**
 * Bulk Project Actions Component
 * Actions for managing multiple projects at once
 */

import React, { useState } from 'react'
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
import { LoadingButton } from '@/components/shared/Button/LoadingButton'

interface BulkProjectActionsProps {
  selectedProjects: string[]
  onActionComplete: () => void
}

const BulkProjectActions: React.FC<BulkProjectActionsProps> = ({
  selectedProjects,
  onActionComplete,
}) => {
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
      console.log('Bulk action:', action, 'for projects:', selectedProjects)
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
      <Button
        variant="contained"
        onClick={handleOpen}
        disabled={selectedProjects.length === 0}
      >
        Bulk Actions ({selectedProjects.length} selected)
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Bulk Project Actions</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {selectedProjects.length} project(s) selected
          </Typography>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>Action</InputLabel>
            <Select
              value={action}
              label="Action"
              onChange={(e) => setAction(e.target.value)}
            >
              <MenuItem value="activate">Activate Projects</MenuItem>
              <MenuItem value="deactivate">Deactivate Projects</MenuItem>
              <MenuItem value="delete">Delete Projects</MenuItem>
              <MenuItem value="archive">Archive Projects</MenuItem>
            </Select>
          </FormControl>

          {action && (
            <Box sx={{ mt: 2 }}>
              <Chip
                label={`This action will affect ${selectedProjects.length} project(s)`}
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

export default BulkProjectActions

