/**
 * RequestTracking Component
 * Request tracking timeline with status updates and progress monitoring
 */

import {
  CheckCircle,
  Pending,
  Pending as InProgress,
  Cancel,
} from '@mui/icons-material'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
} from '@mui/material'
import React from 'react'

import { formatDate } from '@/utils'

interface TrackingEvent {
  id: string
  status: string
  description: string
  timestamp: Date
  user?: {
    name: string
    avatar?: string
  }
}

interface RequestTrackingProps {
  events: TrackingEvent[]
  currentStatus: string
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle color="success" />
    case 'in_progress':
      return <InProgress color="info" />
    case 'cancelled':
      return <Cancel color="error" />
    default:
      return <Pending color="warning" />
  }
}

export const RequestTracking: React.FC<RequestTrackingProps> = ({
  events,
  currentStatus,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Request Timeline
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Timeline>
            {events.map((event, index) => (
              <TimelineItem key={event.id}>
                <TimelineSeparator>
                  <TimelineDot color={event.status === 'completed' ? 'success' : 'primary'}>
                    {getStatusIcon(event.status)}
                  </TimelineDot>
                  {index < events.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: 3 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Chip
                        label={event.status.replace('_', ' ').toUpperCase()}
                        size="small"
                        color={event.status === 'completed' ? 'success' : 'default'}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(event.timestamp)}
                      </Typography>
                    </Box>
                    <Typography variant="body1" gutterBottom>
                      {event.description}
                    </Typography>
                    {event.user && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Avatar
                          src={event.user.avatar}
                          sx={{ width: 24, height: 24 }}
                        >
                          {event.user.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" color="text.secondary">
                          {event.user.name}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Current Status:
          </Typography>
          <Chip
            label={currentStatus.replace('_', ' ').toUpperCase()}
            color={currentStatus === 'completed' ? 'success' : 'default'}
            sx={{ mt: 1 }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default RequestTracking

