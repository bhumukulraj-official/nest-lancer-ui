/**
 * Request Status Manager Component
 * Manage request status and workflow
 */

import React from 'react'
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { LoadingButton } from '@/components/shared/Button/LoadingButton'

interface RequestStatusManagerProps {
  request: any
  onStatusChange: (status: string) => void
}

const RequestStatusManager: React.FC<RequestStatusManagerProps> = ({ request, onStatusChange }) => {
  const [status, setStatus] = React.useState(request.status)

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    onStatusChange(newStatus)
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Request Status Management
      </Typography>

      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Update the status to reflect the current state of this request in the workflow.
        </Typography>
      </Box>
    </Paper>
  )
}

export default RequestStatusManager

