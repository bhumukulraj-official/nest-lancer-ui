/**
 * Quote List Admin Component
 * Admin view for managing quotes
 */

import { Edit, Delete, Visibility } from '@mui/icons-material'
import { Box, Paper, Typography, Chip, IconButton, Tooltip, TextField } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { useState } from 'react'

import { formatCurrency } from '@/utils/formatters/currencyFormatter'
import { formatDate } from '@/utils/formatters/dateFormatter'

interface Quote {
  id: string
  requestId: string
  clientId: string
  amount: number
  status: string
  createdAt: string
}

const QuoteListAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data - replace with actual API call
  const quotes: Quote[] = []

  const handleRowSelection = (selectionModel: any) => {
    // Handle row selection if needed
    console.log('Selected rows:', selectionModel)
  }

  const handleView = (quote: Quote) => {
    console.log('View quote:', quote)
  }

  const handleEdit = (quote: Quote) => {
    console.log('Edit quote:', quote)
  }

  const handleDelete = (quote: Quote) => {
    console.log('Delete quote:', quote)
  }

  const columns: GridColDef[] = [
    {
      field: 'requestId',
      headerName: 'Request ID',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'clientId',
      headerName: 'Client ID',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">{formatCurrency(params.value)}</Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label={params.value} color="primary" size="small" />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">{formatDate(params.value)}</Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="View">
            <IconButton size="small" onClick={() => handleView(params.row)}>
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(params.row)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={() => handleDelete(params.row)}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  const filteredQuotes = quotes.filter((quote) =>
    quote.requestId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Quote Management</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search quotes..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>

      <Paper sx={{ p: 2 }}>
        <DataGrid
          rows={filteredQuotes}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelection}
          disableRowSelectionOnClick
          autoHeight
          pageSizeOptions={[10, 25, 50]}
        />
      </Paper>
    </Box>
  )
}

export default QuoteListAdmin

