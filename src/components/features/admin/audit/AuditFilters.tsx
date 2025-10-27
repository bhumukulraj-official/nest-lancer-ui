/**
 * Audit Filters Component
 */

import React, { useState } from 'react'
import { Box, Paper, Typography, Select, MenuItem, Button, Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const AuditFilters: React.FC = () => {
  const [filterType, setFilterType] = useState('all')
  const [userFilter, setUserFilter] = useState('')

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filter Audit Logs
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">All Actions</MenuItem>
            <MenuItem value="create">Create</MenuItem>
            <MenuItem value="update">Update</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
          </Select>

          <TextField
            label="User"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            size="small"
          />

          <Button variant="contained">Apply Filters</Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default AuditFilters

