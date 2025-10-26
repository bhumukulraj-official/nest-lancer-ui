/**
 * Tooltip Component
 * Enhanced tooltip with positioning
 * Includes help text, additional information, and accessibility
 */

import React, { FC } from 'react'
import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from '@mui/material'

export interface TooltipProps extends MuiTooltipProps {
  title: React.ReactNode
  children: React.ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
  arrow?: boolean
  open?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const Tooltip: FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  arrow = true,
  ...props
}) => {
  return (
    <MuiTooltip
      title={title}
      placement={placement}
      arrow={arrow}
      {...props}
    >
      {children}
    </MuiTooltip>
  )
}

export default Tooltip

