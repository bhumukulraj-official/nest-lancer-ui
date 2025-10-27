/**
 * Message Inbox Component
 */

import { Box, Paper, Typography, List, ListItem, ListItemText, Chip, Divider } from '@mui/material'
import React from 'react'

const MessageInbox: React.FC = () => {
  const messages: any[] = []

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Message Inbox
      </Typography>

      <Paper sx={{ mt: 2 }}>
        {messages.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              No messages
            </Typography>
          </Box>
        ) : (
          <List>
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                <ListItem>
                  <ListItemText
                    primary={message.subject}
                    secondary={message.message}
                  />
                  <Chip label={message.status} size="small" />
                </ListItem>
                {index < messages.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}

export default MessageInbox

