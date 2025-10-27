/**
 * Quote Status Manager Component
 * Manages quote status changes and tracking
 */

import React, { useState } from 'react'
import { Box, Paper, Typography, Select, MenuItem, Button, Stack } from '@mui/material'
import { formatDate } from '@/utils/formatters/dateFormatter'

interface StatusUpdate {
  id: string
  status: string
  updatedBy: string
  updatedAt: string
  notes?: string
}

interface QuoteStatusManagerProps {
  quoteId?: string
  currentStatus?: string
}

const QuoteStatusManager: React.FC<QuoteStatusManagerProps> = ({
  currentStatus = 'pending',
}) => {
  const [status, setStatus] = useState(currentStatus)
  const [notes, setNotes] = useState('')

  // Mock status history
  const statusHistory: StatusUpdate[] = []

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // Call API to update status
    console.log('Update status:', newStatus)
  }

  const handleSave = () => {
    console.log('Save status with notes:', notes)
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quote Status Management
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Current Status
          </Typography>
          <Select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="expired">Expired</MenuItem>
          </Select>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Status Notes
          </Typography>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </Box>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="outlined" onClick={() => setNotes('')}>
            Clear
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Status History
        </Typography>
        {statusHistory.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No status changes yet
          </Typography>
        ) : (
          statusHistory.map((update) => (
            <Box key={update.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
              <Typography variant="body2" color="textSecondary">
                {update.status.toUpperCase()} - {formatDate(update.updatedAt)}
              </Typography>
              <Typography variant="body2">By: {update.updatedBy}</Typography>
              {update.notes && (
                <Typography variant="body2" color="textSecondary">
                  {update.notes}
                </Typography>
              )}
            </Box>
          ))
        )}
      </Paper>
    </Box>
  )
}

export default QuoteStatusManager

