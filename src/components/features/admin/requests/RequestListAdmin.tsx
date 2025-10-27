/**
 * Request List Admin Component
 * Admin view for managing service requests
 */

import { Edit, Delete, Visibility } from '@mui/icons-material'
import { Box, Paper, Typography, Chip, IconButton, Tooltip, TextField } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { useState } from 'react'

import { formatCurrency } from '@/utils/formatters/currencyFormatter'
import { formatDate } from '@/utils/formatters/dateFormatter'

interface Request {
  id: string
  title: string
  category: string
  budget: number
  status: string
  createdAt: string
}

const RequestListAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data - replace with actual API call
  const requests: Request[] = []

  const handleRowSelection = (selectionModel: any) => {
    // Handle row selection if needed
    console.log('Selected rows:', selectionModel)
  }

  const handleView = (request: Request) => {
    console.log('View request:', request)
  }

  const handleEdit = (request: Request) => {
    console.log('Edit request:', request)
  }

  const handleDelete = (request: Request) => {
    console.log('Delete request:', request)
  }

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
    },
    {
      field: 'budget',
      headerName: 'Budget',
      width: 120,
      renderCell: (params: GridRenderCellParams) => formatCurrency(params.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const statusColors: Record<string, 'success' | 'warning' | 'default'> = {
          active: 'success',
          pending: 'warning',
          completed: 'default',
        }
        return (
          <Chip
            label={params.value}
            size="small"
            color={statusColors[params.value] || 'default'}
          />
        )
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 150,
      renderCell: (params: GridRenderCellParams) => formatDate(params.value),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
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
            <IconButton size="small" onClick={() => handleDelete(params.row)}>
              <Delete fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h2">
          Request Management
        </Typography>
        <TextField
          placeholder="Search requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ width: 250 }}
        />
      </Box>

      <DataGrid
        rows={requests}
        columns={columns}
        loading={false}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          handleRowSelection(newSelection as string[])
        }}
        autoHeight
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
    </Paper>
  )
}

export default RequestListAdmin

