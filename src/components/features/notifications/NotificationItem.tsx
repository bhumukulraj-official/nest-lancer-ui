import { Delete, CheckCircle } from '@mui/icons-material'
import { Box, Typography, IconButton, Chip } from '@mui/material'
import React from 'react'

export const NotificationItem: React.FC<{ notification: any; onDelete?: (id: string) => void; onMarkRead?: (id: string) => void }> = ({ notification, onDelete, onMarkRead }) => {
  return (
    <Box sx={{ p: 2, border: 1, borderRadius: 1, borderColor: 'divider', display: 'flex', gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2">{notification.title}</Typography>
          {!notification.read && <Chip label="New" size="small" color="primary" />}
        </Box>
        <Typography variant="body2" color="text.secondary">{notification.message}</Typography>
        <Typography variant="caption" color="text.secondary">{new Date(notification.createdAt).toLocaleString()}</Typography>
      </Box>
      <Box>
        {onMarkRead && <IconButton size="small" onClick={() => onMarkRead(notification.id)}><CheckCircle /></IconButton>}
        {onDelete && <IconButton size="small" color="error" onClick={() => onDelete(notification.id)}><Delete /></IconButton>}
      </Box>
    </Box>
  )
}
export default NotificationItem

