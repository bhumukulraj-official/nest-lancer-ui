/**
 * RequestStatus Component
 * Request status display with timeline and indicators
 */

import { Done, Schedule, Pending as InProgress, Cancel } from '@mui/icons-material'
import { Box, Typography, Stepper, Step, StepLabel, Chip, Card, CardContent } from '@mui/material'
import React from 'react'

interface RequestStatusProps {
  status: string
  progressPercentage?: number
}

const statusSteps = [
  { label: 'Pending', value: 'pending', icon: <Schedule /> },
  { label: 'In Progress', value: 'in_progress', icon: <InProgress /> },
  { label: 'Completed', value: 'completed', icon: <Done /> },
]

export const RequestStatus: React.FC<RequestStatusProps> = ({
  status,
  progressPercentage,
}) => {
  const getActiveStep = () => {
    switch (status) {
      case 'pending':
        return 0
      case 'in_progress':
        return 1
      case 'completed':
        return 2
      case 'cancelled':
        return -1
      default:
        return 0
    }
  }

  const activeStep = getActiveStep()
  const isCancelled = status === 'cancelled'

  if (isCancelled) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Cancel color="error" />
            <Typography variant="h6">Status: Cancelled</Typography>
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Request Status
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 3 }}>
          {statusSteps.map((step) => (
            <Step key={step.value} completed={activeStep > statusSteps.indexOf(step)}>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={status.replace('_', ' ').toUpperCase()}
            color={status === 'completed' ? 'success' : status === 'in_progress' ? 'info' : 'warning'}
          />
          {progressPercentage !== undefined && (
            <Typography variant="body2" color="text.secondary">
              {progressPercentage}% Complete
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default RequestStatus

