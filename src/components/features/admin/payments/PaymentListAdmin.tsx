/**
 * Payment List Admin Component
 * Admin view for managing payments
 */

import React, { useState } from 'react'
import { Box, Paper, Typography, Chip, IconButton, Tooltip, TextField } from '@mui/material'
import { Delete, Visibility, Receipt } from '@mui/icons-material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { formatDate } from '@/utils/formatters/dateFormatter'
import { formatCurrency } from '@/utils/formatters/currencyFormatter'

interface Payment {
  id: string
  orderId: string
  amount: number
  status: string
  paymentMethod: string
  createdAt: string
}

const PaymentListAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data - replace with actual API call
  const payments: Payment[] = []

  const handleRowSelection = (selectionModel: any) => {
    // Handle row selection if needed
    console.log('Selected rows:', selectionModel)
  }

  const handleView = (payment: Payment) => {
    console.log('View payment:', payment)
  }

  const handleRefund = (payment: Payment) => {
    console.log('Refund payment:', payment)
  }

  const columns: GridColDef[] = [
    {
      field: 'orderId',
      headerName: 'Order ID',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" color="success.main" fontWeight="bold">
          {formatCurrency(params.value)}
        </Typography>
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
      field: 'paymentMethod',
      headerName: 'Payment Method',
      flex: 1,
      minWidth: 150,
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
      width: 180,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="View">
            <IconButton size="small" onClick={() => handleView(params.row)}>
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refund">
            <IconButton size="small" color="warning" onClick={() => handleRefund(params.row)}>
              <Receipt fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={() => console.log('Delete:', params.row)}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  const filteredPayments = payments.filter((payment) =>
    payment.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Payment Management</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search payments..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>

      <Paper sx={{ p: 2 }}>
        <DataGrid
          rows={filteredPayments}
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

export default PaymentListAdmin

