import React from 'react'
import { Badge } from '@mui/material'

export const NotificationBadge: React.FC<{ count: number; max?: number; color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' }> = ({ count, max = 99, color = 'error', children }) => {
  return (
    <Badge badgeContent={count > max ? `${max}+` : count} color={color}>
      {children}
    </Badge>
  )
}
export default NotificationBadge

