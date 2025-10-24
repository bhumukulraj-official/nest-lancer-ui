/**
 * Modal Component
 * Enhanced modal component with Material-UI integration
 * Supports various sizes, animations, and interactive features
 */

import React, { forwardRef } from 'react'
import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Box,
  Paper,
  IconButton,
  Typography,
  Divider,
  Fade,
  Slide,
  Zoom,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Close,
  Fullscreen,
  FullscreenExit,
} from '@mui/icons-material'
import { Button } from '@/components/shared/Button/Button'

// Animation type
export type ModalAnimation = 'fade' | 'slide' | 'zoom' | 'none'

// Modal size type
export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'

// Extended modal props
export interface ModalProps extends Omit<MuiModalProps, 'children' | 'title'> {
  // Content
  title?: React.ReactNode
  children: React.ReactNode
  actions?: React.ReactNode
  
  // Size and layout
  size?: ModalSize
  maxWidth?: string | number
  maxHeight?: string | number
  fullHeight?: boolean
  centered?: boolean
  
  // Behavior
  closable?: boolean
  fullscreenable?: boolean
  persistent?: boolean
  
  // Animation
  animation?: ModalAnimation
  animationTimeout?: number
  
  // Styling
  padding?: boolean
  dividers?: boolean
  scrollable?: boolean
  
  // Events
  onClose?: () => void
  onFullscreenToggle?: (fullscreen: boolean) => void
  
  // Accessibility
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      title,
      children,
      actions,
      size = 'md',
      maxWidth,
      maxHeight,
      fullHeight = false,
      centered = true,
      closable = true,
      fullscreenable = false,
      persistent = false,
      animation = 'fade',
      animationTimeout = 300,
      padding = true,
      dividers = false,
      scrollable = false,
      open,
      onClose,
      onFullscreenToggle,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [isFullscreen, setIsFullscreen] = React.useState(false)
    
    // Get modal size values
    const getSizeStyles = () => {
      if (isFullscreen) {
        return {
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          borderRadius: 0,
        }
      }
      
      const sizeMap = {
        xs: { width: 300, maxWidth: '90vw' },
        sm: { width: 400, maxWidth: '90vw' },
        md: { width: 600, maxWidth: '90vw' },
        lg: { width: 800, maxWidth: '95vw' },
        xl: { width: 1200, maxWidth: '95vw' },
        fullscreen: { width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh' },
      }
      
      const baseSize = sizeMap[size] || sizeMap.md
      
      return {
        ...baseSize,
        ...(maxWidth && { maxWidth }),
        ...(maxHeight && { maxHeight }),
        ...(fullHeight && { height: '90vh' }),
        ...(isMobile && {
          width: '95vw',
          maxWidth: '95vw',
          ...(fullHeight && { height: '90vh' }),
        }),
      }
    }
    
    // Handle close
    const handleClose = (_event: {}, reason?: 'backdropClick' | 'escapeKeyDown') => {
      if (persistent && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
        return
      }
      
      onClose?.()
    }
    
    // Handle fullscreen toggle
    const handleFullscreenToggle = () => {
      const newFullscreen = !isFullscreen
      setIsFullscreen(newFullscreen)
      onFullscreenToggle?.(newFullscreen)
    }
    
    // Build header actions
    const buildHeaderActions = () => {
      const actionElements: React.ReactNode[] = []
      
      if (fullscreenable) {
        actionElements.push(
          <IconButton
            key="fullscreen"
            size="small"
            onClick={handleFullscreenToggle}
            sx={{ color: 'text.secondary' }}
          >
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        )
      }
      
      if (closable) {
        actionElements.push(
          <IconButton
            key="close"
            size="small"
            onClick={() => onClose?.()}
            sx={{ color: 'text.secondary' }}
          >
            <Close />
          </IconButton>
        )
      }
      
      return actionElements.length > 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {actionElements}
        </Box>
      ) : null
    }
    
    // Render modal content with animation
    const renderModalContent = () => {
      const content = (
        <Paper
          ref={ref}
          elevation={8}
          sx={{
            position: 'absolute',
            top: centered ? '50%' : 100,
            left: '50%',
            transform: centered 
              ? 'translate(-50%, -50%)' 
              : 'translate(-50%, 0)',
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            ...getSizeStyles(),
            ...sx,
          }}
          {...props}
        >
          {/* Header */}
          {(title || closable || fullscreenable) && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: padding ? 2 : 0,
                  minHeight: 56,
                }}
              >
                {title && (
                  <Typography
                    variant="h6"
                    component="h2"
                    id={ariaLabelledBy}
                    sx={{ flex: 1, pr: 1 }}
                  >
                    {title}
                  </Typography>
                )}
                
                {buildHeaderActions()}
              </Box>
              
              {dividers && <Divider />}
            </>
          )}
          
          {/* Content */}
          <Box
            sx={{
              flex: 1,
              ...(scrollable && {
                overflow: 'auto',
                maxHeight: isFullscreen ? 'calc(100vh - 120px)' : '60vh',
              }),
              ...(padding && { p: 2 }),
              ...(padding && (title || closable || fullscreenable) && { pt: 0 }),
              ...(padding && actions && { pb: 0 }),
            }}
            id={ariaDescribedBy}
          >
            {children}
          </Box>
          
          {/* Actions */}
          {actions && (
            <>
              {dividers && <Divider />}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                  p: padding ? 2 : 0,
                  pt: padding ? 1 : 0,
                }}
              >
                {actions}
              </Box>
            </>
          )}
        </Paper>
      )
      
      // Apply animation wrapper
      switch (animation) {
        case 'slide':
          return (
            <Slide
              direction="up"
              in={open}
              timeout={animationTimeout}
              mountOnEnter
              unmountOnExit
            >
              {content}
            </Slide>
          )
          
        case 'zoom':
          return (
            <Zoom
              in={open}
              timeout={animationTimeout}
              mountOnEnter
              unmountOnExit
            >
              {content}
            </Zoom>
          )
          
        case 'fade':
          return (
            <Fade
              in={open}
              timeout={animationTimeout}
              mountOnEnter
              unmountOnExit
            >
              {content}
            </Fade>
          )
          
        case 'none':
        default:
          return content
      }
    }
    
    return (
      <MuiModal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: centered ? 'center' : 'flex-start',
          justifyContent: 'center',
          p: isMobile ? 1 : 2,
        }}
        {...props}
      >
        {renderModalContent()}
      </MuiModal>
    )
  }
)

// Preset modal variants
export const ConfirmationModal: React.FC<Omit<ModalProps, 'size'> & {
  onConfirm?: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}> = ({
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  ...props
}) => {
  const actions = (
    <>
      <Button onClick={onCancel} variant="outlined">
        {cancelLabel}
      </Button>
      <Button 
        onClick={onConfirm}
        variant="contained"
        color={destructive ? 'error' : 'primary'}
      >
        {confirmLabel}
      </Button>
    </>
  )
  
  return (
    <Modal
      {...props}
      size="sm"
      actions={actions}
      closable={false}
      persistent
    />
  )
}

export const AlertModal: React.FC<Omit<ModalProps, 'size'> & {
  onOk?: () => void
  okLabel?: string
}> = ({
  onOk,
  okLabel = 'OK',
  ...props
}) => {
  const actions = (
    <Button onClick={onOk} variant="contained">
      {okLabel}
    </Button>
  )
  
  return (
    <Modal
      {...props}
      size="sm"
      actions={actions}
      closable={false}
    />
  )
}

Modal.displayName = 'Modal'
ConfirmationModal.displayName = 'ConfirmationModal'
AlertModal.displayName = 'AlertModal'

export default Modal
