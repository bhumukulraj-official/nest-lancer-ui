/**
 * Drawer Component
 * Slide-out drawer component for mobile navigation and quick actions
 * Includes swipe gestures, backdrop control, and responsive behavior
 */

import { FC, ReactNode } from 'react'
import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  Box,
  IconButton,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Close } from '@mui/icons-material'

export interface DrawerProps extends Omit<MuiDrawerProps, 'title'> {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  anchor?: 'left' | 'right' | 'top' | 'bottom'
  width?: number | string
  showCloseButton?: boolean
  persistent?: boolean
  variant?: 'permanent' | 'persistent' | 'temporary'
}

export const Drawer: FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  anchor = 'right',
  width = 360,
  showCloseButton = true,
  persistent = false,
  variant = 'temporary',
  PaperProps,
  ...props
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  return (
    <MuiDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      variant={variant}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : width,
          maxWidth: '90vw',
          ...PaperProps?.sx,
        },
        ...PaperProps,
      }}
      ModalProps={{
        keepMounted: variant === 'persistent',
        ...(persistent && {
          disableAutoFocus: true,
          disableEnforceFocus: true,
          disableRestoreFocus: true,
        }),
      }}
      {...props}
    >
      {(title || showCloseButton) && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              minHeight: 56,
            }}
          >
            {title && (
              <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                {title}
              </Typography>
            )}
            
            {showCloseButton && (
              <IconButton
                size="small"
                onClick={onClose}
                sx={{ ml: title ? 1 : 0 }}
              >
                <Close />
              </IconButton>
            )}
          </Box>
          <Divider />
        </>
      )}
      
      {children}
    </MuiDrawer>
  )
}

export default Drawer

