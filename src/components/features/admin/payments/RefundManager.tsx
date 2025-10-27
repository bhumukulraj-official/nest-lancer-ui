/**
 * Refund Manager Component
 * Manages payment refunds and refund tracking
 */

import React, { useState } from 'react'
import { Box, Paper, Typography, TextField, Button, Stack, Divider, Typography as MuiTypography } from '@mui/material'
import { Receipt, ArrowBack } from '@mui/icons-material'
import { formatDate } from '@/utils/formatters/dateFormatter'
import { formatCurrency } from '@/utils/formatters/currencyFormatter'

interface Refund {
  id: string
  paymentId: string
  amount: number
  reason: string
  status: string
  createdAt: string
}

interface RefundManagerProps {
  paymentId?: string
}

const RefundManager: React.FC<RefundManagerProps> = ({ paymentId }) => {
  const [amount, setAmount] = useState<number>(0)
  const [reason, setReason] = useState('')

  // Mock refund history
  const refundHistory: Refund[] = []

  const handleCreateRefund = () => {
    console.log('Create refund:', { paymentId, amount, reason })
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Create Refund
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <MuiTypography variant="body2" color="textSecondary" gutterBottom>
            Payment ID
          </MuiTypography>
          <Typography variant="body1">{paymentId || 'N/A'}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <MuiTypography variant="body2" color="textSecondary" gutterBottom>
            Refund Amount *
          </MuiTypography>
          <TextField
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            helperText={`Maximum: ${formatCurrency(5000)}`}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <MuiTypography variant="body2" color="textSecondary" gutterBottom>
            Refund Reason *
          </MuiTypography>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter refund reason..."
          />
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<Receipt />} onClick={handleCreateRefund}>
            Process Refund
          </Button>
          <Button variant="outlined" onClick={() => {
            setAmount(0)
            setReason('')
          }}>
            Clear
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Refund History
        </Typography>
        <Divider sx={{ my: 2 }} />

        {refundHistory.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No refunds processed yet
          </Typography>
        ) : (
          refundHistory.map((refund) => (
            <Box key={refund.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
              <Typography variant="body1" fontWeight="bold">
                {formatCurrency(refund.amount)} - {refund.status.toUpperCase()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {refund.reason}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatDate(refund.createdAt)}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  )
}

export default RefundManager

