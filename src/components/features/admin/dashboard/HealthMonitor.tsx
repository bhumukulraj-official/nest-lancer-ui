/**
 * Health Monitor Component
 * System health monitoring and status indicators
 * UI-only component - displays backend health data
 */

import {
  CheckCircle,
  Warning,
  Error,
  Refresh,
} from '@mui/icons-material'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Alert,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import { LoadingButton } from '@/components/shared/Button'

// Service health interface
interface ServiceHealth {
  id: string
  name: string
  status: 'healthy' | 'warning' | 'critical' | 'down'
  uptime: string
  responseTime: number
  lastCheck: Date
  details?: string
}

// Alert interface
interface AlertItem {
  id: string
  severity: 'success' | 'warning' | 'error' | 'info'
  message: string
  timestamp: Date
  resolved: boolean
}

// Service health card component
const ServiceHealthCard: React.FC<{ service: ServiceHealth }> = ({ service }) => {
  const getStatusColor = () => {
    switch (service.status) {
      case 'healthy':
        return 'success'
      case 'warning':
        return 'warning'
      case 'critical':
        return 'error'
      case 'down':
        return 'error'
      default:
        return 'default'
    }
  }
  
  const getStatusIcon = () => {
    switch (service.status) {
      case 'healthy':
        return <CheckCircle sx={{ fontSize: 20 }} />
      case 'warning':
        return <Warning sx={{ fontSize: 20 }} />
      case 'critical':
      case 'down':
        return <Error sx={{ fontSize: 20 }} />
      default:
        return undefined
    }
  }
  
  const getStatusLabel = () => {
    switch (service.status) {
      case 'healthy':
        return 'Operational'
      case 'warning':
        return 'Degraded'
      case 'critical':
        return 'Critical'
      case 'down':
        return 'Down'
      default:
        return 'Unknown'
    }
  }
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {service.name}
          </Typography>
          <Chip
            icon={getStatusIcon()}
            label={getStatusLabel()}
            size="small"
            color={getStatusColor() as any}
          />
        </Stack>
        
        <Stack spacing={1}>
          <Box>
            <Stack direction="row" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption" color="text.secondary">
                Uptime
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {service.uptime}
              </Typography>
            </Stack>
          </Box>
          
          <Box>
            <Stack direction="row" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption" color="text.secondary">
                Response Time
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ fontWeight: 600 }}
                color={service.responseTime > 500 ? 'error.main' : 'success.main'}
              >
                {service.responseTime}ms
              </Typography>
            </Stack>
          </Box>
          
          {service.details && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {service.details}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

// Main health monitor component
export const HealthMonitor: React.FC = () => {
  const [services, setServices] = useState<ServiceHealth[]>([])
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  useEffect(() => {
    loadHealthData()
  }, [])
  
  const loadHealthData = () => {
    // Mock data - in real app, this would come from API
    const mockServices: ServiceHealth[] = [
      {
        id: '1',
        name: 'API Server',
        status: 'healthy',
        uptime: '99.99%',
        responseTime: 45,
        lastCheck: new Date(),
      },
      {
        id: '2',
        name: 'Database',
        status: 'healthy',
        uptime: '99.95%',
        responseTime: 12,
        lastCheck: new Date(),
      },
      {
        id: '3',
        name: 'Payment Gateway',
        status: 'warning',
        uptime: '98.5%',
        responseTime: 1250,
        lastCheck: new Date(),
        details: 'Response time increased',
      },
      {
        id: '4',
        name: 'File Storage',
        status: 'healthy',
        uptime: '100%',
        responseTime: 89,
        lastCheck: new Date(),
      },
      {
        id: '5',
        name: 'Email Service',
        status: 'healthy',
        uptime: '99.8%',
        responseTime: 234,
        lastCheck: new Date(),
      },
      {
        id: '6',
        name: 'WebSocket',
        status: 'healthy',
        uptime: '99.9%',
        responseTime: 15,
        lastCheck: new Date(),
      },
    ]
    
    const mockAlerts: AlertItem[] = [
      {
        id: '1',
        severity: 'success',
        message: 'All systems operational',
        timestamp: new Date(Date.now() - 300000),
        resolved: true,
      },
      {
        id: '2',
        severity: 'warning',
        message: 'Payment gateway response time elevated',
        timestamp: new Date(Date.now() - 1800000),
        resolved: false,
      },
    ]
    
    setServices(mockServices)
    setAlerts(mockAlerts)
    setLastRefresh(new Date())
  }
  
  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    loadHealthData()
    setIsRefreshing(false)
  }
  
  const getOverallStatus = () => {
    const criticalServices = services.filter(s => s.status === 'critical' || s.status === 'down')
    const warningServices = services.filter(s => s.status === 'warning')
    
    if (criticalServices.length > 0) return { status: 'critical', label: 'Critical', color: 'error' }
    if (warningServices.length > 0) return { status: 'warning', label: 'Warning', color: 'warning' }
    return { status: 'healthy', label: 'All Systems Operational', color: 'success' }
  }
  
  const overallStatus = getOverallStatus()
  
  const unresolvedAlerts = alerts.filter(a => !a.resolved)
  
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            System Health Monitor
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </Typography>
        </Box>
        <LoadingButton
          variant="outlined"
          startIcon={<Refresh />}
          onClick={handleRefresh}
          loading={isRefreshing}
        >
          Refresh
        </LoadingButton>
      </Stack>
      
      {/* Overall Status Alert */}
      <Alert 
        severity={overallStatus.color as any}
        sx={{ mb: 3 }}
        icon={<CheckCircle />}
      >
        <strong>{overallStatus.label}</strong>
        {unresolvedAlerts.length > 0 && (
          <> - {unresolvedAlerts.length} active alert{unresolvedAlerts.length > 1 ? 's' : ''}</>
        )}
      </Alert>
      
      {/* Service Health Cards */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        Service Status
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {services.map(service => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <ServiceHealthCard service={service} />
          </Grid>
        ))}
      </Grid>
      
      {/* Active Alerts */}
      {unresolvedAlerts.length > 0 && (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Active Alerts
          </Typography>
          <Stack spacing={2}>
            {unresolvedAlerts.map((alert) => (
              <Alert key={alert.id} severity={alert.severity as any}>
                {alert.message}
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  {alert.timestamp.toLocaleString()}
                </Typography>
              </Alert>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default HealthMonitor

