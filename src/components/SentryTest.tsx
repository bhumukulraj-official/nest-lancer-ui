import React from 'react'
import { Button, Box, Typography, Alert } from '@mui/material'
import { captureException, captureMessage } from '@/lib/sentry'

const SentryTest: React.FC = () => {
  const throwError = () => {
    try {
      // Create a test error
      const testError = new Error('Test error from SentryTest component')
      captureException(testError, { 
        component: 'SentryTest', 
        type: 'manual',
        user: 'test-user'
      })
      alert('Test error sent to Sentry! Check your Sentry dashboard.')
    } catch (error) {
      console.error('Failed to send error to Sentry:', error)
    }
  }

  const sendMessage = () => {
    try {
      captureMessage('Test message from SentryTest component', 'info')
      alert('Test message sent to Sentry! Check your Sentry dashboard.')
    } catch (error) {
      console.error('Failed to send message to Sentry:', error)
    }
  }

  return (
    <Box sx={{ p: 3, border: '2px dashed #1976d2', borderRadius: 2, m: 2 }}>
      <Typography variant="h6" gutterBottom color="primary">
        🧪 Sentry Test Component
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        This component tests Sentry error tracking. Click the buttons below to send test data to Sentry.
      </Alert>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          color="error" 
          onClick={throwError}
          sx={{ minWidth: 200 }}
        >
          🚨 Send Test Error
        </Button>
        
        <Button 
          variant="contained" 
          color="info" 
          onClick={sendMessage}
          sx={{ minWidth: 200 }}
        >
          📝 Send Test Message
        </Button>
      </Box>
      
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        Check your Sentry dashboard at: <br/>
        <strong>https://nestlancer.sentry.io/issues/?project=4510248267087872</strong>
      </Typography>
    </Box>
  )
}

export default SentryTest
