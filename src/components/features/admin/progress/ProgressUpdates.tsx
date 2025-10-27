/**
 * Progress Updates Admin Component
 * Admin view for managing progress updates
 */

import { Box, Paper, Typography, Chip, List, ListItem, ListItemText, Divider } from '@mui/material'
import React from 'react'

import { formatDate } from '@/utils/formatters/dateFormatter'

interface ProgressUpdate {
  id: string
  projectId: string
  title: string
  description: string
  percentage: number
  createdAt: string
}

const ProgressUpdates: React.FC = () => {
  // Mock data
  const updates: ProgressUpdate[] = []

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Progress Updates
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Paper sx={{ p: 2 }}>
        {updates.length === 0 ? (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 4 }}>
            No progress updates available
          </Typography>
        ) : (
          <List>
            {updates.map((update, index) => (
              <React.Fragment key={update.id}>
                <ListItem>
                  <ListItemText
                    primary={update.title}
                    secondary={
                      <>
                        <Typography variant="caption" color="textSecondary">
                          Project: {update.projectId} | {formatDate(update.createdAt)}
                        </Typography>
                        <br />
                        {update.description}
                        <Box sx={{ mt: 1 }}>
                          <Chip label={`${update.percentage}% Complete`} size="small" />
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                {index < updates.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}

export default ProgressUpdates

