/**
 * Storage Admin Component
 */

import React from 'react'
import { Box, Paper, Typography, Grid, LinearProgress, Divider } from '@mui/material'

const StorageAdmin: React.FC = () => {
  const storageData = {
    total: 1024,
    used: 640,
    available: 384,
  }

  const percentage = (storageData.used / storageData.total) * 100

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Storage Administration
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Storage Usage
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {(storageData.used / 1024).toFixed(2)} GB / {(storageData.total / 1024).toFixed(2)} GB used
            </Typography>
            <LinearProgress variant="determinate" value={percentage} sx={{ mt: 2, height: 8, borderRadius: 4 }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StorageAdmin

