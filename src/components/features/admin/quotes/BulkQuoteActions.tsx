/**
 * Bulk Quote Actions Component
 * Handles bulk operations on multiple quotes
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from '@mui/material'

interface BulkQuoteActionsProps {
  selectedQuotes: string[]
  onActionComplete: () => void
}

const BulkQuoteActions: React.FC<BulkQuoteActionsProps> = ({ selectedQuotes, onActionComplete }) => {
  const [openApprove, setOpenApprove] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleBulkApprove = () => {
    console.log('Bulk approve quotes:', selectedQuotes)
    setOpenApprove(false)
    onActionComplete()
  }

  const handleBulkReject = () => {
    console.log('Bulk reject quotes:', selectedQuotes)
    setOpenReject(false)
    onActionComplete()
  }

  const handleBulkDelete = () => {
    console.log('Bulk delete quotes:', selectedQuotes)
    setOpenDelete(false)
    onActionComplete()
  }

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={() => setOpenApprove(true)}>
          Approve Selected ({selectedQuotes.length})
        </Button>
        <Button variant="contained" color="warning" onClick={() => setOpenReject(true)}>
          Reject Selected ({selectedQuotes.length})
        </Button>
        <Button variant="contained" color="error" onClick={() => setOpenDelete(true)}>
          Delete Selected ({selectedQuotes.length})
        </Button>
      </Stack>

      <Dialog open={openApprove} onClose={() => setOpenApprove(false)}>
        <DialogTitle>Approve Selected Quotes</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to approve {selectedQuotes.length} quote(s)?</Typography>
          <List>
            {selectedQuotes.slice(0, 5).map((id) => (
              <ListItem key={id}>
                <Checkbox checked />
                <ListItemText primary={`Quote ID: ${id}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApprove(false)}>Cancel</Button>
          <Button onClick={handleBulkApprove} variant="contained">
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openReject} onClose={() => setOpenReject(false)}>
        <DialogTitle>Reject Selected Quotes</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to reject {selectedQuotes.length} quote(s)?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReject(false)}>Cancel</Button>
          <Button onClick={handleBulkReject} variant="contained" color="warning">
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Selected Quotes</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {selectedQuotes.length} quote(s)? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleBulkDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BulkQuoteActions

