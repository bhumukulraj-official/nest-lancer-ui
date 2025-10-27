/**
 * System Health Component
 * Detailed system health monitoring with comprehensive metrics
 * UI-only component - displays backend system health data
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Divider,
  Paper,
  useTheme,
  CircularProgress,
} from '@mui/material'
import {
  CheckCircle,
  Warning,
  Error,
  Refresh,
  Database,
  Storage,
  Memory,
  Speed,
  Cloud,
  Security,
} from '@mui/icons-material'
import { LoadingButton } from '@/components/shared/Button'

// Service health interface
interface ServiceHealthData {
  id: string
  name: string
  status: 'healthy' | 'warning' | 'critical' | 'down'
  uptime: string
  responseTime: number
  lastCheck: string
  details?: string
}

// System resource interface
interface SystemResource {
  id: string
  name: string
  used: number
  total: number
  unit: string
  percentage: number
  status: 'healthy' | 'warning' | 'critical'
}

// Performance metric interface
interface PerformanceMetric {
  id: string
  label: string
  current: number
  average: number
  peak: number
  unit: string
  status: 'healthy' | 'warning' | 'critical'
}

// Service health card component
const ServiceHealthCard: React.FC<{ service: ServiceHealthData }> = ({ service }) => {
  const theme = useTheme()
  
  const getStatusColor = () => {
    switch (service.status) {
      case 'healthy':
        return 'success'
      case 'warning':
        return 'warning'
      case 'critical':
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

// Resource usage card component
const ResourceUsageCard: React.FC<{ resource: SystemResource }> = ({ resource }) => {
  const getStatusColor = () => {
    switch (resource.status) {
      case 'healthy':
        return 'success'
      case 'warning':
        return 'warning'
      case 'critical':
        return 'error'
      default:
        return 'default'
    }
  }
  
  const getStatusIcon = () => {
    const icons = {
      'CPU': <Speed sx={{ fontSize: 20 }} />,
      'Memory': <Memory sx={{ fontSize: 20 }} />,
      'Database': <Database sx={{ fontSize: 20 }} />,
      'Storage': <Storage sx={{ fontSize: 20 }} />,
    }
    return icons[resource.name as keyof typeof icons] || <Cloud sx={{ fontSize: 20 }} />
  }
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          {getStatusIcon()}
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {resource.name}
          </Typography>
        </Stack>
        
        <Stack spacing={2}>
          <Box>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {resource.used} / {resource.total} {resource.unit}
              </Typography>
              <Chip
                label={resource.percentage.toFixed(1)}%
                size="small"
                color={getStatusColor() as any}
              />
            </Stack>
            <LinearProgress
              variant="determinate"
              value={resource.percentage}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  bgcolor: `${getStatusColor()}.main`,
                },
              }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

// Performance metric card component
const PerformanceMetricCard: React.FC<{ metric: PerformanceMetric }> = ({ metric }) => {
  const getStatusColor = () => {
    switch (metric.status) {
      case 'healthy':
        return 'success'
      case 'warning':
        return 'warning'
      case 'critical':
        return 'error'
      default:
        return 'default'
    }
  }
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          {metric.label}
        </Typography>
        
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Current
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {metric.current} {metric.unit}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="caption" color="text.secondary">
              Average
            </Typography>
            <Typography variant="body2">
              {metric.average} {metric.unit}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="caption" color="text.secondary">
              Peak
            </Typography>
            <Typography variant="body2">
              {metric.peak} {metric.unit}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

// Main system health component
export const SystemHealth: React.FC = () => {
  const theme = useTheme()
  const [services, setServices] = useState<ServiceHealthData[]>([])
  const [resources, setResources] = useState<SystemResource[]>([])
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([])
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [overallStatus, setOverallStatus] = useState<'healthy' | 'warning' | 'critical'>('healthy')
  
  useEffect(() => {
    loadHealthData()
  }, [])
  
  const loadHealthData = () => {
    // Mock data - in real app, this would come from API
    const mockServices: ServiceHealthData[] = [
      {
        id: '1',
        name: 'Application Server',
        status: 'healthy',
        uptime: '99.99%',
        responseTime: 45,
        lastCheck: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Database Server',
        status: 'healthy',
        uptime: '99.95%',
        responseTime: 12,
        lastCheck: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'File Storage',
        status: 'warning',
        uptime: '98.5%',
        responseTime: 1250,
        lastCheck: new Date().toISOString(),
        details: 'High latency detected',
      },
      {
        id: '4',
        name: 'Cache Server',
        status: 'healthy',
        uptime: '100%',
        responseTime: 89,
        lastCheck: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Email Service',
        status: 'healthy',
        uptime: '99.8%',
        responseTime: 234,
        lastCheck: new Date().toISOString(),
      },
      {
        id: '6',
        name: 'WebSocket Server',
        status: 'healthy',
        uptime: '99.9%',
        responseTime: 15,
        lastCheck: new Date().toISOString(),
      },
    ]
    
    const mockResources: SystemResource[] = [
      {
        id: '1',
        name: 'CPU',
        used: 68,
        total: 100,
        unit: '%',
        percentage: 68,
        status: 'warning',
      },
      {
        id: '2',
        name: 'Memory',
        used: 4.2,
        total: 8,
        unit: 'GB',
        percentage: 52.5,
        status: 'healthy',
      },
      {
        id: '3',
        name: 'Database',
        used: 156,
        total: 500,
        unit: 'GB',
        percentage: 31.2,
        status: 'healthy',
      },
      {
        id: '4',
        name: 'Storage',
        used: 1.2,
        total: 2,
        unit: 'TB',
        percentage: 60,
        status: 'healthy',
      },
    ]
    
    const mockPerformance: PerformanceMetric[] = [
      {
        id: '1',
        label: 'Request Rate',
        current: 1250,
        average: 1100,
        peak: 2000,
        unit: 'req/min',
        status: 'healthy',
      },
      {
        id: '2',
        label: 'Average Response',
        current: 45,
        average: 52,
        peak: 125,
        unit: 'ms',
        status: 'healthy',
      },
      {
        id: '3',
        label: 'Error Rate',
        current: 0.05,
        average: 0.08,
        peak: 0.15,
        unit: '%',
        status: 'healthy',
      },
    ]
    
    // Calculate overall status
    const criticalServices = mockServices.filter(s => s.status === 'critical' || s.status === 'down')
    const warningServices = mockServices.filter(s => s.status === 'warning')
    
    let calculatedStatus: 'healthy' | 'warning' | 'critical' = 'healthy'
    if (criticalServices.length > 0) {
      calculatedStatus = 'critical'
    } else if (warningServices.length > 0) {
      calculatedStatus = 'warning'
    }
    
    setServices(mockServices)
    setResources(mockResources)
    setPerformanceMetrics(mockPerformance)
    setOverallStatus(calculatedStatus)
    setLastRefresh(new Date())
  }
  
  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    loadHealthData()
    setIsRefreshing(false)
  }
  
  const getOverallStatusInfo = () => {
    switch (overallStatus) {
      case 'healthy':
        return { color: 'success', label: 'All Systems Operational', icon: <CheckCircle /> }
      case 'warning':
        return { color: 'warning', label: 'System Degraded', icon: <Warning /> }
      case 'critical':
        return { color: 'error', label: 'System Critical', icon: <Error /> }
    }
  }
  
  const statusInfo = getOverallStatusInfo()
  
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
        severity={statusInfo.color as any}
        sx={{ mb: 3 }}
        icon={statusInfo.icon}
      >
        <strong>{statusInfo.label}</strong> - All critical systems are {overallStatus === 'healthy' ? 'operational' : overallStatus}
      </Alert>
      
      {/* Resource Usage */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, mt: 3 }}>
        Resource Usage
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {resources.map(resource => (
          <Grid item xs={12} sm={6} md={3} key={resource.id}>
            <ResourceUsageCard resource={resource} />
          </Grid>
        ))}
      </Grid>
      
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
      
      {/* Performance Metrics */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        Performance Metrics
      </Typography>
      <Grid container spacing={3}>
        {performanceMetrics.map(metric => (
          <Grid item xs={12} sm={6} md={4} key={metric.id}>
            <PerformanceMetricCard metric={metric} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SystemHealth

