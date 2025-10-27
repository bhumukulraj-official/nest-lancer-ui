/**
 * Media List Admin Component
 * Admin view for managing media files
 */

import React, { useState } from 'react'
import { Box, Paper, Typography, Chip, IconButton, Tooltip, TextField, Button } from '@mui/material'
import { Edit, Delete, Visibility, CloudUpload } from '@mui/icons-material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { formatDate } from '@/utils/formatters/dateFormatter'

interface MediaFile {
  id: string
  name: string
  type: string
  size: number
  visibility: string
  createdAt: string
}

const MediaListAdmin: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data
  const mediaFiles: MediaFile[] = []

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'File Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'size',
      headerName: 'Size',
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">{(params.value / 1024).toFixed(2)} KB</Typography>
      ),
    },
    {
      field: 'visibility',
      headerName: 'Visibility',
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label={params.value} size="small" />
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
            <IconButton size="small">
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small">
              <Edit fontSize="small" />
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
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Media Management</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search media..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" startIcon={<CloudUpload />}>
            Upload Media
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2 }}>
        <DataGrid
          rows={mediaFiles}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={setSelectedRows}
          disableRowSelectionOnClick
          autoHeight
          pageSizeOptions={[10, 25, 50]}
        />
      </Paper>
    </Box>
  )
}

export default MediaListAdmin

