import { Clear, CheckCircle, Error, Info } from '@mui/icons-material'
import { Box, Card, CardContent, Typography, Divider, Stack, IconButton, Chip } from '@mui/material'
import React from 'react'

export const NotificationCenter: React.FC<{ notifications: any[]; onClear?: () => void; onMarkRead?: (id: string) => void }> = ({ notifications, onClear }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Notifications</Typography>
          {onClear && <IconButton onClick={onClear}><Clear /></IconButton>}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={2}>
          {notifications.map((notif: any) => (
            <Box key={notif.id} sx={{ p: 2, border: 1, borderRadius: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {notif.type === 'success' && <CheckCircle color="success" />}
                    {notif.type === 'error' && <Error color="error" />}
                    {notif.type === 'info' && <Info color="info" />}
                    <Typography variant="subtitle2">{notif.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{notif.message}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {new Date(notif.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                {!notif.read && <Chip label="New" size="small" color="primary" />}
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
export default NotificationCenter

