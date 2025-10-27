/**
 * Quote Accept Page
 * Page for accepting quotes with payment integration
 */

import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Button, Card, CardContent, Divider, Alert } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { QuoteAcceptance } from '@/components/features/quotes'
import { QuoteApiService } from '@/services/quote'
import { useAuth } from '@/hooks/auth/useAuth'

export const QuoteAcceptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [quote, setQuote] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accepting, setAccepting] = useState(false)

  React.useEffect(() => {
    const fetchQuote = async () => {
      if (!id) {
        setError('Quote ID is required')
        setLoading(false)
        return
      }

      try {
        const data = await QuoteApiService.getQuote(id)
        setQuote(data)
      } catch (err) {
        setError('Failed to load quote details')
        console.error('Error fetching quote:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuote()
  }, [id])

  const handleAccept = async () => {
    if (!quote || !user) return

    setAccepting(true)
    try {
      await QuoteApiService.acceptQuote(quote.id, {
        acceptedBy: user.id,
        acceptedAt: new Date().toISOString(),
        acceptanceType: 'full',
        ipAddress: '', // This would come from the request
        userAgent: navigator.userAgent,
        notes: 'Quote accepted by user'
      })
      // Redirect to payment or success page
      navigate(`/user/quotes/${quote.id}`)
    } catch (err) {
      setError('Failed to accept quote. Please try again.')
      console.error('Error accepting quote:', err)
    } finally {
      setAccepting(false)
    }
  }

  const handleReject = async () => {
    if (!quote || !user) return

    try {
      await QuoteApiService.rejectQuote(quote.id, {
        rejectedBy: user.id,
        rejectedAt: new Date().toISOString(),
        reason: 'Quote rejected by user',
        canRenegotiate: false
      })
      navigate('/user/quotes')
    } catch (err) {
      setError('Failed to reject quote. Please try again.')
      console.error('Error rejecting quote:', err)
    }
  }

  if (loading) {
    return (
      <UserLayout>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Typography>Loading quote...</Typography>
          </Box>
        </Container>
      </UserLayout>
    )
  }

  if (error && !quote) {
    return (
      <UserLayout>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button onClick={() => navigate('/user/quotes')} variant="outlined">
            Back to Quotes
          </Button>
        </Container>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Accept Quote
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {quote && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quote Details
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Request Title
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {quote.request?.title || quote.title || 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="h6" color="primary">
                  ${quote.totalAmount?.toFixed(2) || '0.00'}
                </Typography>
              </Box>
              {quote.description && (
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1">{quote.description}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {quote && (
          <QuoteAcceptance
            quote={quote}
            onAccept={handleAccept}
            onReject={handleReject}
            loading={accepting}
          />
        )}
      </Container>
    </UserLayout>
  )
}

export default QuoteAcceptPage
