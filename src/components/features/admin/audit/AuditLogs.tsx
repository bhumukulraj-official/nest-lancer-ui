/**
 * Audit Logs Component
 */

import { Download, FilterList, Refresh } from '@mui/icons-material'
import { Box, Paper, Typography, Chip, IconButton, Tooltip, TextField } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useState } from 'react'

import { formatDate } from '@/utils/formatters/dateFormatter'

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const logs: any[] = []

  const columns: GridColDef[] = [
    { field: 'action', headerName: 'Action', flex: 1 },
    { field: 'user', headerName: 'User', flex: 1 },
    { field: 'resource', headerName: 'Resource', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => <Chip label={params.value} size="small" />,
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => <Typography variant="body2">{formatDate(params.value)}</Typography>,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: () => (
        <Box>
          <Tooltip title="Download">
            <IconButton size="small">
              <Download fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Audit Logs</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search logs..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Tooltip title="Filter">
            <IconButton>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Paper sx={{ p: 2 }}>
        <DataGrid
          rows={logs}
          columns={columns}
          autoHeight
          pageSizeOptions={[10, 25, 50]}
        />
      </Paper>
    </Box>
  )
}

export default AuditLogs

