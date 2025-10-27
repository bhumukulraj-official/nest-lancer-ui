/**
 * Dialog Component
 * Enhanced dialog component with Material-UI integration
 * Supports confirmations, alerts, and form dialogs
 */

import {
  Close,
  Info,
  Warning,
  Error,
  CheckCircle,
  Help,
} from '@mui/icons-material'
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import React, { forwardRef } from 'react'

import { Button } from '@/components/shared/Button/Button'

// Dialog type
export type DialogType = 'default' | 'info' | 'warning' | 'error' | 'success' | 'confirm'

// Extended dialog props
export interface DialogProps extends Omit<MuiDialogProps, 'children' | 'title'> {
  // Content
  title?: React.ReactNode
  children?: React.ReactNode
  description?: React.ReactNode
  
  // Dialog type
  type?: DialogType
  
  // Actions
  actions?: React.ReactNode
  primaryAction?: {
    label: string
    onClick: () => void
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    variant?: 'text' | 'outlined' | 'contained'
    loading?: boolean
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    variant?: 'text' | 'outlined' | 'contained'
  }
  
  // Behavior
  closable?: boolean
  persistent?: boolean
  
  // Styling
  icon?: React.ReactNode
  
  // Events
  onClose?: () => void
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      title,
      children,
      description,
      type = 'default',
      actions,
      primaryAction,
      secondaryAction,
      closable = true,
      persistent = false,
      icon,
      open,
      onClose,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    
    // Get type-specific settings
    const getTypeSettings = () => {
      switch (type) {
        case 'info':
          return {
            icon: <Info />,
            color: theme.palette.info.main,
          }
        case 'warning':
          return {
            icon: <Warning />,
            color: theme.palette.warning.main,
          }
        case 'error':
          return {
            icon: <Error />,
            color: theme.palette.error.main,
          }
        case 'success':
          return {
            icon: <CheckCircle />,
            color: theme.palette.success.main,
          }
        case 'confirm':
          return {
            icon: <Help />,
            color: theme.palette.primary.main,
          }
        default:
          return {
            icon: null,
            color: theme.palette.text.primary,
          }
      }
    }
    
    // Handle close
    const handleClose = (_event: {}, reason?: 'backdropClick' | 'escapeKeyDown') => {
      if (persistent && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
        return
      }
      
      onClose?.()
    }
    
    // Build dialog actions
    const buildActions = () => {
      const actionElements: React.ReactNode[] = []
      
      if (secondaryAction) {
        actionElements.push(
          <Button
            key="secondary"
            onClick={secondaryAction.onClick}
            color={secondaryAction.color || 'primary'}
            variant={secondaryAction.variant || 'outlined'}
          >
            {secondaryAction.label}
          </Button>
        )
      }
      
      if (primaryAction) {
        actionElements.push(
          <Button
            key="primary"
            onClick={primaryAction.onClick}
            color={primaryAction.color || 'primary'}
            variant={primaryAction.variant || 'contained'}
            loading={primaryAction.loading}
          >
            {primaryAction.label}
          </Button>
        )
      }
      
      if (actions) {
        actionElements.push(actions)
      }
      
      return actionElements.length > 0 ? actionElements : null
    }
    
    const typeSettings = getTypeSettings()
    const dialogIcon = icon || typeSettings.icon
    const dialogActions = buildActions()
    
    return (
      <MuiDialog
        ref={ref}
        open={open}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth
        {...props}
      >
        {/* Dialog Title */}
        {(title || closable) && (
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pb: description && !children ? 1 : 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {dialogIcon && (
                <Box
                  sx={{
                    color: typeSettings.color,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {dialogIcon}
                </Box>
              )}
              
              {title && (
                <Typography variant="h6" component="span">
                  {title}
                </Typography>
              )}
            </Box>
            
            {closable && (
              <IconButton
                size="small"
                onClick={() => onClose?.()}
                sx={{
                  color: 'text.secondary',
                  ml: 1,
                }}
              >
                <Close />
              </IconButton>
            )}
          </DialogTitle>
        )}
        
        {/* Dialog Content */}
        {(children || description) && (
          <DialogContent
            sx={{
              pt: title ? 0 : 2,
            }}
          >
            {description && (
              <DialogContentText
                sx={{
                  mb: children ? 2 : 0,
                  color: 'text.primary',
                }}
              >
                {description}
              </DialogContentText>
            )}
            
            {children}
          </DialogContent>
        )}
        
        {/* Dialog Actions */}
        {dialogActions && (
          <DialogActions
            sx={{
              px: 3,
              pb: 3,
              gap: 1,
            }}
          >
            {dialogActions}
          </DialogActions>
        )}
      </MuiDialog>
    )
  }
)

// Preset dialog variants
export const ConfirmDialog: React.FC<Omit<DialogProps, 'type'> & {
  onConfirm?: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  loading?: boolean
}> = ({
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  loading = false,
  ...props
}) => (
  <Dialog
    {...props}
    type="confirm"
    persistent
    primaryAction={{
      label: confirmLabel,
      onClick: onConfirm || (() => {}),
      color: destructive ? 'error' : 'primary',
      loading,
    }}
    secondaryAction={{
      label: cancelLabel,
      onClick: onCancel || (() => {}),
    }}
  />
)

export const AlertDialog: React.FC<Omit<DialogProps, 'type'> & {
  onOk?: () => void
  okLabel?: string
  alertType?: 'info' | 'warning' | 'error' | 'success'
}> = ({
  onOk,
  okLabel = 'OK',
  alertType = 'info',
  ...props
}) => (
  <Dialog
    {...props}
    type={alertType}
    primaryAction={{
      label: okLabel,
      onClick: onOk || (() => {}),
    }}
  />
)

export const InfoDialog: React.FC<Omit<DialogProps, 'type'>> = (props) => (
  <AlertDialog {...props} alertType="info" />
)

export const WarningDialog: React.FC<Omit<DialogProps, 'type'>> = (props) => (
  <AlertDialog {...props} alertType="warning" />
)

export const ErrorDialog: React.FC<Omit<DialogProps, 'type'>> = (props) => (
  <AlertDialog {...props} alertType="error" />
)

export const SuccessDialog: React.FC<Omit<DialogProps, 'type'>> = (props) => (
  <AlertDialog {...props} alertType="success" />
)

// Form dialog for complex forms
export const FormDialog: React.FC<DialogProps & {
  onSubmit?: () => void
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
  loading?: boolean
  submitDisabled?: boolean
}> = ({
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  loading = false,
  submitDisabled = false,
  ...props
}) => (
  <Dialog
    {...props}
    persistent
    primaryAction={{
      label: submitLabel,
      onClick: onSubmit || (() => {}),
      loading,
      // disabled: submitDisabled, // Button component should handle this
    }}
    secondaryAction={{
      label: cancelLabel,
      onClick: onCancel || (() => {}),
    }}
  />
)

Dialog.displayName = 'Dialog'
ConfirmDialog.displayName = 'ConfirmDialog'
AlertDialog.displayName = 'AlertDialog'
InfoDialog.displayName = 'InfoDialog'
WarningDialog.displayName = 'WarningDialog'
ErrorDialog.displayName = 'ErrorDialog'
SuccessDialog.displayName = 'SuccessDialog'
FormDialog.displayName = 'FormDialog'

export default Dialog
