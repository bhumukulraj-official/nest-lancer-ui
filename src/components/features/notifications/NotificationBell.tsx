import { Notifications } from '@mui/icons-material'
import { Badge, IconButton, Tooltip, Menu, MenuItem, Box, Typography } from '@mui/material'
import React from 'react'

export const NotificationBell: React.FC<{ count: number; notifications?: any[]; onClick?: () => void }> = ({ count, notifications = [], onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  
  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={(e) => { setAnchorEl(e.currentTarget); onClick?.() }}>
          <Badge badgeContent={count} color="error">
            <Notifications />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {notifications.length === 0 ? (
          <MenuItem>No new notifications</MenuItem>
        ) : (
          notifications.slice(0, 5).map((notif: any) => (
            <MenuItem key={notif.id} onClick={() => setAnchorEl(null)}>
              <Box>
                <Typography variant="body2">{notif.title}</Typography>
                <Typography variant="caption" color="text.secondary">{notif.message}</Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  )
}
export default NotificationBell

