/**
 * Payment History Page
 * Page for displaying user's payment history
 */

import { Container, Box, Typography } from '@mui/material'
import React from 'react'

import { PaymentHistory } from '@/components/features/payments'
import { UserLayout } from '@/components/layout'

export const PaymentHistoryPage: React.FC = () => {
  // This would typically fetch from API
  const payments: any[] = []

  return (
    <UserLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Payment History
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View all your past payments and transactions
          </Typography>
        </Box>

        <PaymentHistory payments={payments} />
      </Container>
    </UserLayout>
  )
}

export default PaymentHistoryPage

