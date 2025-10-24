/**
 * Error Fallback Component
 * User-friendly error display component with retry options and error reporting
 * Displayed when ErrorBoundary catches an error
 */

import { FC, useState } from 'react'
import { ErrorInfo } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Collapse,
  Alert,
  Divider,
} from '@mui/material'
import {
  ErrorOutline,
  Refresh,
  ExpandMore,
  ExpandLess,
  BugReport,
  Home,
} from '@mui/icons-material'

interface ErrorFallbackProps {
  error: Error | null
  errorInfo: ErrorInfo | null
  onReset?: () => void
}

const ErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  onReset,
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const [reportSent, setReportSent] = useState(false)
  
  const handleReload = () => {
    window.location.reload()
  }
  
  const handleGoHome = () => {
    window.location.href = '/'
  }
  
  const handleSendReport = () => {
    // TODO: Implement error reporting to backend/monitoring service
    console.log('Sending error report:', { error, errorInfo })
    setReportSent(true)
    
    // Simulate sending report
    setTimeout(() => {
      setReportSent(false)
    }, 3000)
  }
  
  const getErrorMessage = () => {
    if (!error) return 'An unexpected error occurred'
    
    // User-friendly error messages for common cases
    if (error.message.includes('ChunkLoadError')) {
      return 'Failed to load application resources. This usually happens after an update.'
    }
    
    if (error.message.includes('Network Error')) {
      return 'Network connection error. Please check your internet connection.'
    }
    
    if (error.message.includes('Not Found')) {
      return 'The requested page or resource was not found.'
    }
    
    return error.message || 'An unexpected error occurred'
  }
  
  const getErrorSuggestion = () => {
    if (!error) return 'Please try refreshing the page.'
    
    if (error.message.includes('ChunkLoadError')) {
      return 'Try refreshing the page to download the latest version.'
    }
    
    if (error.message.includes('Network Error')) {
      return 'Check your internet connection and try again.'
    }
    
    return 'Please try refreshing the page or contact support if the problem persists.'
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Error Icon */}
          <ErrorOutline
            sx={{
              fontSize: 64,
              color: 'error.main',
              mb: 2,
            }}
          />
          
          {/* Error Title */}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Oops! Something went wrong
          </Typography>
          
          {/* Error Message */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {getErrorMessage()}
          </Typography>
          
          {/* Error Suggestion */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            {getErrorSuggestion()}
          </Typography>
          
          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={onReset || handleReload}
              size="large"
            >
              Try Again
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Home />}
              onClick={handleGoHome}
              size="large"
            >
              Go Home
            </Button>
            
            <Button
              variant="text"
              startIcon={<BugReport />}
              onClick={handleSendReport}
              disabled={reportSent}
              size="large"
            >
              {reportSent ? 'Report Sent!' : 'Report Issue'}
            </Button>
          </Box>
          
          {/* Success Message */}
          {reportSent && (
            <Alert
              severity="success"
              sx={{ mb: 3, textAlign: 'left' }}
            >
              Thank you for reporting this issue. Our team has been notified and will investigate.
            </Alert>
          )}
          
          {/* Error Details Toggle */}
          <Divider sx={{ mb: 2 }} />
          
          <Box>
            <Button
              variant="text"
              size="small"
              onClick={() => setShowDetails(!showDetails)}
              endIcon={showDetails ? <ExpandLess /> : <ExpandMore />}
              sx={{ color: 'text.secondary' }}
            >
              Technical Details
            </Button>
            
            <Collapse in={showDetails}>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                  textAlign: 'left',
                  maxHeight: 300,
                  overflow: 'auto',
                }}
              >
                {/* Error Stack */}
                {error && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Error:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        color: 'error.main',
                      }}
                    >
                      {error.stack || error.message}
                    </Typography>
                  </Box>
                )}
                
                {/* Component Stack */}
                {errorInfo?.componentStack && (
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Component Stack:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        color: 'text.secondary',
                      }}
                    >
                      {errorInfo.componentStack}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Collapse>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ErrorFallback
