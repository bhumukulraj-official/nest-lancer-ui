/**
 * Payment Detail Admin Component
 * Detailed admin view for managing individual payments
 */

import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Chip,
  Grid,
  Divider,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { Edit, Delete, ArrowBack, Print } from '@mui/icons-material'
import { formatDate } from '@/utils/formatters/dateFormatter'
import { formatCurrency } from '@/utils/formatters/currencyFormatter'

interface PaymentDetailAdminProps {
  paymentId?: string
}

const PaymentDetailAdmin: React.FC<PaymentDetailAdminProps> = ({ paymentId }) => {
  // Mock data - replace with actual API call
  const payment = {
    id: paymentId || '1',
    orderId: 'ORD-001',
    amount: 5000,
    status: 'completed',
    paymentMethod: 'Razorpay',
    createdAt: new Date().toISOString(),
    transactionId: 'TXN-001',
  }

  const handleRefund = () => {
    console.log('Refund payment:', payment)
  }

  const handlePrint = () => {
    window.print()
  }

  const paymentDetails = [
    { label: 'Transaction ID', value: payment.transactionId },
    { label: 'Order ID', value: payment.orderId },
    { label: 'Amount', value: formatCurrency(payment.amount) },
    { label: 'Payment Method', value: payment.paymentMethod },
    { label: 'Status', value: payment.status.toUpperCase() },
    { label: 'Created At', value: formatDate(payment.createdAt) },
  ]

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button startIcon={<ArrowBack />} variant="outlined">
          Back to List
        </Button>
        <Button startIcon={<Print />} variant="outlined" onClick={handlePrint}>
          Print Receipt
        </Button>
        <Button variant="contained" color="warning" onClick={handleRefund}>
          Process Refund
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Divider sx={{ my: 2 }} />

            <TableContainer>
              <Table>
                <TableBody>
                  {paymentDetails.map(({ label, value }) => (
                    <TableRow key={label}>
                      <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>{label}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Refund Information
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Refundable Amount: {formatCurrency(payment.amount)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              This amount will be refunded to the original payment method.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PaymentDetailAdmin

