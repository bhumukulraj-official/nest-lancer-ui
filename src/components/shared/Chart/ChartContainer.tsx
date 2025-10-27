/**
 * Chart Container Component
 * Wrapper component for chart styling and responsive behavior
 * Includes loading states, error handling, and export functionality
 */

import {
  Download,
  Refresh,
  Fullscreen,
  Settings,
} from '@mui/icons-material'
import {
  Box,
  Paper,
  Typography,
  BoxProps,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material'
import { FC, ReactNode } from 'react'

interface ChartContainerProps extends BoxProps {
  // Chart content
  children: ReactNode
  
  // Display
  title?: string
  subtitle?: string
  height?: string | number
  width?: string | number
  
  // States
  loading?: boolean
  error?: string | Error | null
  
  // Actions
  showActions?: boolean
  onExport?: () => void
  onRefresh?: () => void
  onSettings?: () => void
  onFullscreen?: () => void
  
  // Variant
  variant?: 'paper' | 'plain'
  elevation?: number
  
  // Styling
  showBorder?: boolean
  showBackground?: boolean
  spacing?: number
}

export const ChartContainer: FC<ChartContainerProps> = ({
  children,
  title,
  subtitle,
  height = 400,
  width = '100%',
  loading = false,
  error = null,
  showActions = false,
  onExport,
  onRefresh,
  onSettings,
  onFullscreen,
  variant = 'paper',
  elevation = 2,
  showBorder = true,
  showBackground = true,
  spacing = 2,
  sx,
  className,
  style,
  ...otherProps
}) => {
  const errorMessage = error instanceof Error ? error.message : error
  
  if (variant === 'paper') {
    return (
      <Paper
        elevation={elevation}
        sx={{
          width,
          height: loading || error ? height : 'auto',
          p: spacing,
          ...(showBorder && {
            border: 1,
            borderColor: 'divider',
          }),
          ...(showBackground && {
            bgcolor: 'background.paper',
          }),
          borderRadius: 2,
          ...sx,
        }}
      >
      {/* Header */}
      {(title || subtitle || showActions) && (
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              {title && (
                <Typography variant="h6" color="text.primary">
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            
            {showActions && (
              <Stack direction="row" spacing={0.5}>
                {onSettings && (
                  <Tooltip title="Settings">
                    <IconButton size="small" onClick={onSettings}>
                      <Settings fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                
                {onRefresh && (
                  <Tooltip title="Refresh">
                    <IconButton size="small" onClick={onRefresh}>
                      <Refresh fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                
                {onExport && (
                  <Tooltip title="Download">
                    <IconButton size="small" onClick={onExport}>
                      <Download fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                
                {onFullscreen && (
                  <Tooltip title="Fullscreen">
                    <IconButton size="small" onClick={onFullscreen}>
                      <Fullscreen fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            )}
          </Stack>
        </Box>
      )}
      
      {/* Content */}
      <Box
        sx={{
          width: '100%',
          height,
          position: 'relative',
          minHeight: loading || error ? 200 : undefined,
        }}
      >
        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <CircularProgress size={40} />
          </Box>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Alert severity="error">{errorMessage || 'Failed to load chart data'}</Alert>
          </Box>
        )}
        
        {/* Chart Content */}
        {!loading && !error && (
          <Box sx={{ width: '100%', height: '100%' }}>
            {children}
          </Box>
        )}
      </Box>
    </Paper>
    )
  }

  return (
    <Box
      className={className}
      style={style}
      sx={{
        width,
        height: loading || error ? height : 'auto',
        p: spacing,
        ...(showBorder && {
          border: 1,
          borderColor: 'divider',
        }),
        ...(showBackground && {
          bgcolor: 'background.paper',
        }),
        borderRadius: 2,
        ...sx,
      }}
      {...otherProps}
    >
      {/* Header */}
      {(title || subtitle || showActions) && (
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              {title && (
                <Typography variant="h6" color="text.primary">
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>

            {showActions && (
              <Stack direction="row" spacing={0.5}>
                {onSettings && (
                  <Tooltip title="Settings">
                    <IconButton size="small" onClick={onSettings}>
                      <Settings fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}

                {onRefresh && (
                  <Tooltip title="Refresh">
                    <IconButton size="small" onClick={onRefresh}>
                      <Refresh fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}

                {onExport && (
                  <Tooltip title="Download">
                    <IconButton size="small" onClick={onExport}>
                      <Download fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}

                {onFullscreen && (
                  <Tooltip title="Fullscreen">
                    <IconButton size="small" onClick={onFullscreen}>
                      <Fullscreen fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            )}
          </Stack>
        </Box>
      )}

      {/* Content */}
      <Box
        sx={{
          width: '100%',
          height,
          position: 'relative',
          minHeight: loading || error ? 200 : undefined,
        }}
      >
        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <CircularProgress size={40} />
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Alert severity="error">{errorMessage || 'Failed to load chart data'}</Alert>
          </Box>
        )}

        {/* Chart Content */}
        {!loading && !error && (
          <Box sx={{ width: '100%', height: '100%' }}>
            {children}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ChartContainer

