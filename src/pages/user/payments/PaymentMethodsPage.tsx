/**
 * Payment Methods Page
 * Page for managing payment methods
 */

import { Add, CreditCard, AccountBalance } from '@mui/icons-material'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Divider,
} from '@mui/material'
import React from 'react'

import { UserLayout } from '@/components/layout'


export const PaymentMethodsPage: React.FC = () => {
  // Mock payment methods
  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 4242',
      brand: 'Visa',
      icon: <CreditCard />,
      isDefault: true,
    },
    {
      id: '2',
      type: 'bank',
      name: 'Bank Account',
      brand: 'Chase',
      icon: <AccountBalance />,
      isDefault: false,
    },
  ]

  return (
    <UserLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Payment Methods
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your payment methods for seamless transactions
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            size="large"
            onClick={() => {
              // Handle add payment method
              console.log('Add payment method')
            }}
          >
            Add Payment Method
          </Button>
        </Box>

        <Grid container spacing={3}>
          {paymentMethods.map((method) => (
            <Grid item xs={12} md={6} key={method.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2, color: 'primary.main' }}>{method.icon}</Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div">
                        {method.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {method.brand}
                      </Typography>
                    </Box>
                    {method.isDefault && (
                      <Typography
                        variant="caption"
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        Default
                      </Typography>
                    )}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" disabled={method.isDefault}>
                      Set as Default
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {paymentMethods.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 3,
            }}
          >
            <CreditCard sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No payment methods added
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add a payment method to get started with payments
            </Typography>
            <Button variant="contained" startIcon={<Add />}>
              Add Payment Method
            </Button>
          </Box>
        )}
      </Container>
    </UserLayout>
  )
}

export default PaymentMethodsPage

