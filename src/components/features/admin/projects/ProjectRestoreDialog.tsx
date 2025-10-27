/**
 * Project Restore Dialog Component
 * Confirmation dialog for restoring deleted projects
 */

import { Restore, CheckCircle } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import React, { useState } from 'react'

import { LoadingButton } from '@/components/shared/Button/LoadingButton'

interface ProjectRestoreDialogProps {
  open: boolean
  projectTitle: string
  projectDeletedDate?: string
  onConfirm: () => void
  onCancel: () => void
}

const ProjectRestoreDialog: React.FC<ProjectRestoreDialogProps> = ({
  open,
  projectTitle,
  projectDeletedDate,
  onConfirm,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
      handleClose()
    } catch (error) {
      console.error('Error restoring project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onCancel()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Restore /> Restore Project
      </DialogTitle>
      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          This will restore the project and make it active again.
        </Alert>

        <Typography variant="body1" gutterBottom>
          Are you sure you want to restore the project{' '}
          <strong>{projectTitle}</strong>?
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Restoring this project will:
        </Typography>

        <List dense>
          <ListItem>
            <CheckCircle color="success" sx={{ mr: 1, fontSize: 20 }} />
            <ListItemText primary="Make the project active again" />
          </ListItem>
          <ListItem>
            <CheckCircle color="success" sx={{ mr: 1, fontSize: 20 }} />
            <ListItemText primary="Restore all project data and files" />
          </ListItem>
          <ListItem>
            <CheckCircle color="success" sx={{ mr: 1, fontSize: 20 }} />
            <ListItemText primary="Allow users to view and interact with the project" />
          </ListItem>
        </List>

        {projectDeletedDate && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Deleted on: {new Date(projectDeletedDate).toLocaleString()}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={handleClose} disabled={loading}>
          Cancel
        </LoadingButton>
        <LoadingButton
          onClick={handleConfirm}
          variant="contained"
          color="success"
          loading={loading}
          startIcon={<Restore />}
        >
          Restore Project
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectRestoreDialog

