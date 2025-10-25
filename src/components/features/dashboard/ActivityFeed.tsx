/**
 * Activity Feed Component
 * Recent activity feed showing user's recent actions and updates
 */

import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Divider,
  Stack,
} from '@mui/material'
import {
  Assignment,
  Payment,
  Person,
  Message,
  CheckCircle,
  Schedule,
  TrendingUp,
} from '@mui/icons-material'

// Activity item interface
interface ActivityItem {
  id: string
  type: 'project' | 'payment' | 'message' | 'task' | 'request'
  title: string
  description: string
  timestamp: string
  status?: 'completed' | 'pending' | 'in-progress'
  amount?: number
}

// Activity item component
interface ActivityItemProps {
  activity: ActivityItem
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'project':
        return <Assignment />
      case 'payment':
        return <Payment />
      case 'message':
        return <Message />
      case 'task':
        return <CheckCircle />
      case 'request':
        return <Person />
      default:
        return <TrendingUp />
    }
  }

  const getStatusColor = () => {
    switch (activity.status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'in-progress':
        return 'info'
      default:
        return 'default'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    )

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  return (
    <ListItem
      sx={{
        px: 0,
        py: 2,
        '&:hover': {
          bgcolor: 'action.hover',
          borderRadius: 1,
        },
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: `${getStatusColor()}.main`,
            color: 'white',
            width: 40,
            height: 40,
          }}
        >
          {getActivityIcon()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {activity.title}
            </Typography>
            {activity.status && (
              <Chip
                label={activity.status.replace('-', ' ')}
                size="small"
                color={getStatusColor() as any}
                sx={{ textTransform: 'capitalize' }}
              />
            )}
            {activity.amount && (
              <Chip
                label={`$${activity.amount}`}
                size="small"
                color="success"
                variant="outlined"
              />
            )}
          </Stack>
        }
        secondary={
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {activity.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTimestamp(activity.timestamp)}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  )
}

// Empty state component
const EmptyActivityFeed: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 3,
      }}
    >
      <Schedule sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No recent activity
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Your recent activities will appear here once you start working on
        projects.
      </Typography>
    </Box>
  )
}

// Main activity feed component
export const ActivityFeed: React.FC = () => {
  // Mock data - in real app, this would come from API
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'project',
      title: 'Website Redesign Project',
      description: 'Completed the homepage mockup and sent for client review',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      status: 'completed',
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      description: 'Received payment for Logo Design project',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      status: 'completed',
      amount: 500,
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      description: 'Client sent feedback on the mobile app design',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      status: 'pending',
    },
    {
      id: '4',
      type: 'request',
      title: 'New Project Request',
      description: 'E-commerce website development project',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      status: 'pending',
    },
    {
      id: '5',
      type: 'task',
      title: 'Database Optimization',
      description: 'Working on performance improvements for client database',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      status: 'in-progress',
    },
  ]

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Activity
        </Typography>

        {activities.length > 0 ? (
          <List sx={{ p: 0 }}>
            {activities.map((activity, index) => (
              <React.Fragment key={activity.id}>
                <ActivityItem activity={activity} />
                {index < activities.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <EmptyActivityFeed />
        )}
      </CardContent>
    </Card>
  )
}

export default ActivityFeed
