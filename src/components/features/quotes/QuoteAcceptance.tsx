/**
 * QuoteAcceptance Component
 * Quote acceptance component with terms review and payment integration
 */

import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Button,
  Alert,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material'
import {
  CheckCircle,
  Payment,
} from '@mui/icons-material'
import { Quote } from '@/types/models/quote.types'
import { formatCurrency } from '@/utils'

interface QuoteAcceptanceProps {
  quote: Quote
  onAccept: () => Promise<void>
  onReject?: () => void
  loading?: boolean
}

export const QuoteAcceptance: React.FC<QuoteAcceptanceProps> = ({
  quote,
  onAccept,
  onReject,
  loading = false,
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAccept = async () => {
    if (!acceptedTerms) {
      setError('Please accept the terms and conditions to proceed')
      return
    }

    setError(null)
    try {
      await onAccept()
    } catch (err) {
      setError('Failed to accept quote. Please try again.')
      console.error('Quote acceptance error:', err)
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Accept Quote
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Review the quote details and accept to proceed with the project
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Quote Summary */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Quote Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Total Amount
                </Typography>
                <Typography variant="h4" color="primary">
                  {formatCurrency(quote.totalAmount)}
                </Typography>
              </Box>
            </Grid>
            {quote.estimatedDuration && (
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Estimated Duration
                  </Typography>
                  <Typography variant="h5">{quote.estimatedDuration} days</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Terms and Conditions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Terms and Conditions
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              borderRadius: 1,
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            <Typography variant="body2">
              {quote.termsAndConditions || 'No specific terms mentioned.'}
            </Typography>
          </Box>
        </Box>

        {/* Acceptance Checkbox */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptedTerms}
                onChange={e => setAcceptedTerms(e.target.checked)}
                disabled={loading}
              />
            }
            label={
              <Typography variant="body2">
                I have read and agree to the terms and conditions of this quote
              </Typography>
            }
          />
        </Box>

        {/* Actions */}
        <Divider sx={{ my: 3 }} />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onReject && (
            <Button variant="outlined" color="error" onClick={onReject} disabled={loading}>
              Reject Quote
            </Button>
          )}
          <Button
            variant="contained"
            color="success"
            startIcon={loading ? <CheckCircle /> : <Payment />}
            onClick={handleAccept}
            disabled={loading || !acceptedTerms}
          >
            {loading ? 'Processing...' : 'Accept & Proceed to Payment'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default QuoteAcceptance

