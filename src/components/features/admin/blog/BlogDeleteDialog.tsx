/**
 * Blog Delete Dialog Component
 */

import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'

interface BlogDeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  blogId?: string
}

const BlogDeleteDialog: React.FC<BlogDeleteDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Blog Post</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this blog post? This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BlogDeleteDialog

