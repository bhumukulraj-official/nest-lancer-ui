/**
 * User List Component
 * Admin user management with filtering, sorting, and bulk actions
 */

import { Edit, Delete, Block, CheckCircle } from '@mui/icons-material'
import { Box, Paper, Typography, Chip, IconButton, Tooltip } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { useState } from 'react'

import { User, UserRole } from '@/types/models/user.types'
import { formatDate } from '@/utils/formatters/dateFormatter'

interface MockUser extends User {
  status?: string
}

const UserList: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  // Mock data - replace with actual hook when available
  const users: MockUser[] = []
  const isLoading = false

  const handleRowSelection = (selection: string[]) => {
    setSelectedRows(selection)
  }

  const handleEdit = (user: User) => {
    // Navigate to edit page
    console.log('Edit user:', user)
  }

  const handleDelete = (user: User) => {
    // Handle delete action
    console.log('Delete user:', user)
  }

  const handleStatusChange = (user: User, isActive: boolean) => {
    // Handle status change
    console.log('Toggle user status:', user, isActive)
  }

  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const roleColor = params.value === UserRole.ADMIN ? 'error' : 'default'
        return <Chip label={params.value} size="small" color={roleColor} />
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const isActive = params.row.isActive || params.value === 'active'
        return (
          <Chip
            label={isActive ? 'Active' : 'Inactive'}
            size="small"
            color={isActive ? 'success' : 'default'}
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
          <Tooltip title="Edit User">
            <IconButton size="small" onClick={() => handleEdit(params.row)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Status">
            <IconButton
              size="small"
              onClick={() => handleStatusChange(params.row, false)}
            >
              {params.row.isActive ? (
                <Block fontSize="small" />
              ) : (
                <CheckCircle fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
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
          User Management
        </Typography>
        {selectedRows.length > 0 && (
          <Chip label={`${selectedRows.length} selected`} color="primary" />
        )}
      </Box>

      <DataGrid
        rows={users || []}
        columns={columns}
        loading={isLoading}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          handleRowSelection(newSelection as string[])
        }}
        autoHeight
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        sx={{
          '& .MuiDataGrid-cell': {
            fontSize: '0.875rem',
          },
        }}
      />
    </Paper>
  )
}

export default UserList

