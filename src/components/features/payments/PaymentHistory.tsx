/**
 * PaymentHistory Component
 * Displays payment transaction history
 */

import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Avatar
} from '@mui/material'
import {
  Download,
  Refresh,
  Search,
  FilterList,
  Visibility,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material'
import { Payment as PaymentType, PaymentStatus, PaymentFilters, PaymentSortBy } from '../../../types/models/payment.types'

interface PaymentHistoryProps {
  payments: PaymentType[]
  loading?: boolean
  error?: string | null
  onRefresh?: () => void
  onViewPayment?: (payment: PaymentType) => void
  onDownloadReceipt?: (payment: PaymentType) => void
  filters?: PaymentFilters
  onFiltersChange?: (filters: PaymentFilters) => void
  showActions?: boolean
  variant?: 'table' | 'cards'
  onVariantChange?: (variant: 'table' | 'cards') => void
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  payments,
  loading = false,
  error = null,
  onRefresh,
  onViewPayment,
  onDownloadReceipt,
  filters = {},
  onFiltersChange,
  showActions = true,
  variant = 'table'
}) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '')
  const [statusFilter, setStatusFilter] = useState<PaymentStatus[]>(filters.status || [])
  const [sortBy, setSortBy] = useState<PaymentSortBy>(filters.sortBy || PaymentSortBy.CREATED_AT)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(filters.sortOrder || 'desc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPayment, _setSelectedPayment] = useState<PaymentType | null>(null)
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false)

  // Filter and sort payments
  const filteredPayments = useMemo(() => {
    let filtered = [...payments]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter(payment => statusFilter.includes(payment.status))
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case PaymentSortBy.AMOUNT:
          aValue = a.amount
          bValue = b.amount
          break
        case PaymentSortBy.STATUS:
          aValue = a.status
          bValue = b.status
          break
        case PaymentSortBy.CLIENT_NAME:
          aValue = a.clientName.toLowerCase()
          bValue = b.clientName.toLowerCase()
          break
        case PaymentSortBy.PROJECT_TITLE:
          aValue = (a.projectTitle || '').toLowerCase()
          bValue = (b.projectTitle || '').toLowerCase()
          break
        case PaymentSortBy.UPDATED_AT:
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
        default:
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [payments, searchTerm, statusFilter, sortBy, sortOrder])

  const getStatusColor = (status: PaymentStatus): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (status) {
      case PaymentStatus.COMPLETED:
        return 'success'
      case PaymentStatus.PENDING:
      case PaymentStatus.PROCESSING:
        return 'warning'
      case PaymentStatus.FAILED:
      case PaymentStatus.CANCELLED:
        return 'error'
      case PaymentStatus.REFUNDED:
      case PaymentStatus.PARTIALLY_REFUNDED:
        return 'info'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: PaymentStatus): string => {
    switch (status) {
      case PaymentStatus.COMPLETED:
        return 'Completed'
      case PaymentStatus.PENDING:
        return 'Pending'
      case PaymentStatus.PROCESSING:
        return 'Processing'
      case PaymentStatus.FAILED:
        return 'Failed'
      case PaymentStatus.CANCELLED:
        return 'Cancelled'
      case PaymentStatus.REFUNDED:
        return 'Refunded'
      case PaymentStatus.PARTIALLY_REFUNDED:
        return 'Partially Refunded'
      default:
        return status
    }
  }

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount / 100) // Convert from cents/paise
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    onFiltersChange?.({ ...filters, search: value })
  }

  const handleStatusFilterChange = (event: any) => {
    const value = event.target.value
    setStatusFilter(typeof value === 'string' ? value.split(',') : value)
    onFiltersChange?.({ ...filters, status: value })
  }

  const handleSortChange = (event: SelectChangeEvent<PaymentSortBy>) => {
    const value = event.target.value as PaymentSortBy
    setSortBy(value)
    onFiltersChange?.({ ...filters, sortBy: value })
  }

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newOrder)
    onFiltersChange?.({ ...filters, sortOrder: newOrder })
  }


  const handleDownloadReceipt = (payment: PaymentType) => {
    onDownloadReceipt?.(payment)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter([])
    setSortBy(PaymentSortBy.CREATED_AT)
    setSortOrder('desc')
    onFiltersChange?.({})
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Payment History ({filteredPayments.length})
        </Typography>
        <Stack direction="row" spacing={1}>
          {onRefresh && (
            <Tooltip title="Refresh">
              <IconButton onClick={onRefresh}>
                <Refresh />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search payments..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </Stack>

        {/* Advanced Filters */}
        {showFilters && (
          <Box sx={{ 
            p: 2, 
            border: 1, 
            borderColor: 'divider', 
            borderRadius: 1,
            mb: 2,
            backgroundColor: 'background.paper'
          }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  multiple
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={getStatusLabel(value)} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {Object.values(PaymentStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {getStatusLabel(status)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} onChange={handleSortChange}>
                  <MenuItem value={PaymentSortBy.CREATED_AT}>Created Date</MenuItem>
                  <MenuItem value={PaymentSortBy.UPDATED_AT}>Updated Date</MenuItem>
                  <MenuItem value={PaymentSortBy.AMOUNT}>Amount</MenuItem>
                  <MenuItem value={PaymentSortBy.STATUS}>Status</MenuItem>
                  <MenuItem value={PaymentSortBy.CLIENT_NAME}>Client</MenuItem>
                  <MenuItem value={PaymentSortBy.PROJECT_TITLE}>Project</MenuItem>
                </Select>
              </FormControl>

              <Button variant="outlined" onClick={handleSortOrderChange}>
                {sortOrder === 'desc' ? <TrendingDown /> : <TrendingUp />}
              </Button>

              <Button variant="outlined" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Stack>
          </Box>
        )}
      </Box>

      {/* Payments Display */}
      {filteredPayments.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No payments found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm || statusFilter.length > 0
              ? 'Try adjusting your search criteria'
              : 'No payment transactions yet'
            }
          </Typography>
        </Box>
      ) : variant === 'table' ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                {showActions && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {payment.orderId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24 }}>
                        {payment.clientName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2">
                        {payment.clientName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {payment.projectTitle || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {formatCurrency(payment.amount, payment.currency)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(payment.status)}
                      color={getStatusColor(payment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(payment.createdAt)}
                    </Typography>
                  </TableCell>
                  {showActions && (
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="View Details">
                          <IconButton size="small" onClick={() => onViewPayment?.(payment)}>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Receipt">
                          <IconButton size="small" onClick={() => handleDownloadReceipt(payment)}>
                            <Download />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={2}>
          {filteredPayments.map((payment) => (
            <Grid item xs={12} sm={6} md={4} key={payment.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" noWrap>
                      {payment.orderId}
                    </Typography>
                    <Chip
                      label={getStatusLabel(payment.status)}
                      color={getStatusColor(payment.status)}
                      size="small"
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Avatar sx={{ width: 24, height: 24 }}>
                      {payment.clientName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      {payment.clientName}
                    </Typography>
                  </Box>

                  {payment.projectTitle && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Project: {payment.projectTitle}
                    </Typography>
                  )}

                  <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                    {formatCurrency(payment.amount, payment.currency)}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {formatDate(payment.createdAt)}
                  </Typography>

                  {showActions && (
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => onViewPayment?.(payment)}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Download />}
                        onClick={() => handleDownloadReceipt(payment)}
                      >
                        Receipt
                      </Button>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Receipt Dialog */}
      <Dialog
        open={receiptDialogOpen}
        onClose={() => setReceiptDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Payment Receipt</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Payment Receipt #{selectedPayment.orderId}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedPayment.description}
              </Typography>
              {/* Receipt content would be rendered here */}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReceiptDialogOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => selectedPayment && handleDownloadReceipt(selectedPayment)}>
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PaymentHistory
