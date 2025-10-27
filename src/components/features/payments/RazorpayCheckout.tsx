/**
 * RazorpayCheckout Component
 * Razorpay payment integration component
 */

import {
  Payment,
  Security,
  CreditCard,
  Smartphone,
  AccountBalance,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import { RazorpayUIService , PaymentApiService } from '../../../services/payment'
import type {
  RazorpayConfig,
  RazorpayOrder,
  RazorpayPayment,
  PaymentCreateData,
  PaymentMethodType
} from '../../../types/models/payment.types'

interface RazorpayCheckoutProps {
  paymentData: PaymentCreateData
  onSuccess?: (payment: RazorpayPayment) => void
  onError?: (error: any) => void
  onCancel?: () => void
  config?: Partial<RazorpayConfig>
  disabled?: boolean
  loading?: boolean
}

const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({
  paymentData,
  onSuccess,
  onError,
  onCancel,
  config = {},
  disabled = false,
  loading = false
}) => {
  const [razorpayConfig, setRazorpayConfig] = useState<RazorpayConfig | null>(null)
  const [order, setOrder] = useState<RazorpayOrder | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [supportedMethods, setSupportedMethods] = useState<PaymentMethodType[]>([])

  useEffect(() => {
    initializePayment()
  }, [paymentData])

  const initializePayment = async () => {
    try {
      setError(null)
      
      // Get Razorpay configuration
      const configData = await PaymentApiService.getRazorpayConfig()
      setRazorpayConfig({ ...configData, ...config })

      // Get supported payment methods
      const methods = RazorpayUIService.getSupportedMethods(paymentData.currency)
      setSupportedMethods(methods as PaymentMethodType[])

      // Create Razorpay order
      const orderData = await PaymentApiService.createRazorpayOrder({
        amount: RazorpayUIService.formatAmount(paymentData.amount, paymentData.currency),
        currency: paymentData.currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          projectId: paymentData.projectId,
          clientId: paymentData.clientId,
          description: paymentData.description
        }
      })
      setOrder(orderData)
    } catch (err) {
      setError('Failed to initialize payment. Please try again.')
      console.error('Error initializing payment:', err)
    }
  }

  const handlePayment = async () => {
    if (!razorpayConfig || !order) {
      setError('Payment not initialized. Please refresh and try again.')
      return
    }

    try {
      setProcessing(true)
      setError(null)

      await RazorpayUIService.initializePayment(
        razorpayConfig,
        order,
        {
          onSuccess: async (response: RazorpayPayment) => {
            try {
              // Verify payment with backend
              await PaymentApiService.verifyPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })

              setProcessing(false)
              onSuccess?.(response)
            } catch (verifyError) {
              setProcessing(false)
              setError('Payment verification failed. Please contact support.')
              onError?.(verifyError)
            }
          },
          onError: (error: any) => {
            setProcessing(false)
            setError(error.description || 'Payment failed. Please try again.')
            onError?.(error)
          },
          onDismiss: () => {
            setProcessing(false)
            onCancel?.()
          }
        }
      )
    } catch (err) {
      setProcessing(false)
      setError('Failed to process payment. Please try again.')
      onError?.(err)
    }
  }

  const formatAmount = (amount: number, currency: string): string => {
    return RazorpayUIService.formatAmountForDisplay(amount, currency)
  }

  const getMethodIcon = (method: PaymentMethodType) => {
    switch (method) {
      case 'card':
        return <CreditCard />
      case 'upi':
        return <Smartphone />
      case 'netbanking':
        return <AccountBalance />
      case 'wallet':
        return <Payment />
      default:
        return <Payment />
    }
  }

  const getMethodName = (method: PaymentMethodType): string => {
    return RazorpayUIService.getMethodDisplayName(method)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          {/* Payment Summary */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Summary
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Amount
                </Typography>
                <Typography variant="h6" color="primary">
                  {formatAmount(paymentData.amount, paymentData.currency)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body2">
                  {paymentData.description}
                </Typography>
              </Box>
              {paymentData.projectId && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Project
                  </Typography>
                  <Typography variant="body2">
                    {paymentData.projectTitle || 'N/A'}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Payment Methods */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Methods
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {supportedMethods.map((method) => (
                <Chip
                  key={method}
                  icon={getMethodIcon(method)}
                  label={getMethodName(method)}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Stack>
          </Box>

          {/* Security Info */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Security color="success" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Secure Payment
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Your payment information is encrypted and secure. We use Razorpay for secure payment processing.
            </Typography>
          </Box>

          {/* Payment Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={processing ? <CircularProgress size={20} /> : <Payment />}
            onClick={handlePayment}
            disabled={disabled || processing || !order}
            sx={{ py: 1.5 }}
          >
            {processing ? 'Processing...' : `Pay ${formatAmount(paymentData.amount, paymentData.currency)}`}
          </Button>

          {/* Payment Info */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              By proceeding, you agree to our terms and conditions
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Payment Status Dialog */}
      <Dialog open={processing} maxWidth="sm" fullWidth>
        <DialogTitle>Processing Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Please complete your payment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Do not close this window or refresh the page
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default RazorpayCheckout
