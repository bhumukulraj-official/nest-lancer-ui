/**
 * Stats Cards Component
 * Detailed statistics cards for dashboard metrics
 */

import {
  TrendingUp,
  TrendingDown,
  Assignment,
  Payment,
  Schedule,
  CheckCircle,
} from '@mui/icons-material'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  useTheme,
} from '@mui/material'
import React from 'react'

// Stats card interface
interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
    period: string
  }
  progress?: number
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  progress,
  icon,
  color,
}) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[6],
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 700, mb: 0.5 }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              bgcolor: `${color}.main`,
              color: 'white',
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Stack>

        {trend && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: progress ? 2 : 0 }}
          >
            {trend.isPositive ? (
              <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
            ) : (
              <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
            )}
            <Typography
              variant="body2"
              sx={{
                color: trend.isPositive ? 'success.main' : 'error.main',
                fontWeight: 600,
              }}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              vs {trend.period}
            </Typography>
          </Stack>
        )}

        {progress !== undefined && (
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {progress}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  bgcolor: `${color}.main`,
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

// Main stats cards component
export const StatsCards: React.FC = () => {
  const statsData: StatsCardProps[] = [
    {
      title: 'Total Projects',
      value: 12,
      subtitle: '3 active, 9 completed',
      trend: { value: 15, isPositive: true, period: 'last month' },
      icon: <Assignment sx={{ fontSize: 24 }} />,
      color: 'primary',
    },
    {
      title: 'Monthly Earnings',
      value: '$3,250',
      subtitle: 'Target: $4,000',
      trend: { value: 8, isPositive: true, period: 'last month' },
      progress: 81,
      icon: <Payment sx={{ fontSize: 24 }} />,
      color: 'success',
    },
    {
      title: 'Response Time',
      value: '2.4h',
      subtitle: 'Average response time',
      trend: { value: 12, isPositive: false, period: 'last week' },
      icon: <Schedule sx={{ fontSize: 24 }} />,
      color: 'warning',
    },
    {
      title: 'Completion Rate',
      value: '94%',
      subtitle: 'Projects completed on time',
      trend: { value: 3, isPositive: true, period: 'last month' },
      progress: 94,
      icon: <CheckCircle sx={{ fontSize: 24 }} />,
      color: 'info',
    },
  ]

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
        Performance Metrics
      </Typography>

      <Grid container spacing={3}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default StatsCards
