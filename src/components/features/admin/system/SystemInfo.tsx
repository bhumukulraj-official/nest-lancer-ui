/**
 * System Info Component
 * Display system information and status
 */

import { Info as InfoIcon } from '@mui/icons-material'
import { Box, Paper, Typography, Grid, Chip, Divider } from '@mui/material'
import React from 'react'

interface SystemInfoProps {
  systemInfo: {
    version: string
    environment: string
    nodeVersion: string
    uptime: string
    memory: {
      total: string
      used: string
      free: string
    }
    disk: {
      total: string
      used: string
      free: string
    }
    cpu: {
      usage: string
      cores: number
    }
    services: {
      database: 'online' | 'offline'
      cache: 'online' | 'offline'
      queue: 'online' | 'offline'
    }
  }
}

const SystemInfo: React.FC<SystemInfoProps> = ({ systemInfo }) => {
  const getServiceColor = (status: string) => status === 'online' ? 'success' : 'error'

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <InfoIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          System Information
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Application Information
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Version:</strong> {systemInfo.version}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Environment:</strong>{' '}
              <Chip label={systemInfo.environment} size="small" color="primary" />
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Node Version:</strong> {systemInfo.nodeVersion}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Uptime:</strong> {systemInfo.uptime}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Resources
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Memory:</strong> {systemInfo.memory.used} / {systemInfo.memory.total}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Disk:</strong> {systemInfo.disk.used} / {systemInfo.disk.total}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>CPU Usage:</strong> {systemInfo.cpu.usage}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>CPU Cores:</strong> {systemInfo.cpu.cores}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Service Status
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
            <Chip
              label={`Database: ${systemInfo.services.database}`}
              size="small"
              color={getServiceColor(systemInfo.services.database)}
            />
            <Chip
              label={`Cache: ${systemInfo.services.cache}`}
              size="small"
              color={getServiceColor(systemInfo.services.cache)}
            />
            <Chip
              label={`Queue: ${systemInfo.services.queue}`}
              size="small"
              color={getServiceColor(systemInfo.services.queue)}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SystemInfo

