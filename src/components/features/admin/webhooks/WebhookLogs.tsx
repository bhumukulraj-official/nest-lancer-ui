/**
 * Webhook Logs Component
 */

import React from 'react'
import { Box, Paper, Typography, Chip, IconButton, Tooltip } from '@mui/material'
import { Refresh, Visibility } from '@mui/icons-material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatDate } from '@/utils/formatters/dateFormatter'

const WebhookLogs: React.FC = () => {
  const logs: any[] = []

  const columns: GridColDef[] = [
    { field: 'url', headerName: 'URL', flex: 1 },
    { field: 'event', headerName: 'Event', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => <Chip label={params.value} size="small" color={params.value === 'success' ? 'success' : 'error'} />,
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
        <Tooltip title="View Details">
          <IconButton size="small">
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Webhook Logs</Typography>
        <IconButton>
          <Refresh />
        </IconButton>
      </Box>

      <Paper sx={{ p: 2 }}>
        <DataGrid rows={logs} columns={columns} autoHeight pageSizeOptions={[10, 25, 50]} />
      </Paper>
    </Box>
  )
}

export default WebhookLogs

