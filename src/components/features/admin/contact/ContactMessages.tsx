/**
 * Contact Messages Component
 */

import { Visibility, Reply, Delete } from '@mui/icons-material'
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'

import { formatDate } from '@/utils/formatters/dateFormatter'

const ContactMessages: React.FC = () => {
  const messages: any[] = []

  const handleRowSelection = () => {
    // Handle row selection if needed
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'subject', headerName: 'Subject', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => <Typography variant="body2">{formatDate(params.value)}</Typography>,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: () => (
        <Box>
          <Tooltip title="View">
            <IconButton size="small">
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reply">
            <IconButton size="small">
              <Reply fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error">
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Contact Messages
      </Typography>

      <Paper sx={{ p: 2, mt: 2 }}>
        <DataGrid
          rows={messages}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelection}
          autoHeight
        />
      </Paper>
    </Box>
  )
}

export default ContactMessages

