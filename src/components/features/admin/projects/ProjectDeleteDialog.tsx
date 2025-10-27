/**
 * Project Delete Dialog Component
 * Confirmation dialog for deleting projects
 */

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from '@mui/material'
import { LoadingButton } from '@/components/shared/Button/LoadingButton'

interface ProjectDeleteDialogProps {
  open: boolean
  projectTitle: string
  onConfirm: () => void
  onCancel: () => void
}

const ProjectDeleteDialog: React.FC<ProjectDeleteDialogProps> = ({
  open,
  projectTitle,
  onConfirm,
  onCancel,
}) => {
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const isConfirmDisabled = confirmText !== 'DELETE'

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
      handleClose()
    } catch (error) {
      console.error('Error deleting project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setConfirmText('')
    onCancel()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete the project <strong>{projectTitle}</strong>?
        </Typography>
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          This action cannot be undone. All project data, files, and associated information will be permanently deleted.
        </Typography>
        <TextField
          fullWidth
          label="Type DELETE to confirm"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          sx={{ mt: 3 }}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={handleClose} disabled={loading}>
          Cancel
        </LoadingButton>
        <LoadingButton
          onClick={handleConfirm}
          variant="contained"
          color="error"
          loading={loading}
          disabled={isConfirmDisabled}
        >
          Delete Project
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectDeleteDialog

