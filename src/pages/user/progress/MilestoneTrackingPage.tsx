/**
 * Milestone Tracking Page
 * Page for tracking and managing project milestones
 */

import { Container, Box, Typography, Button, Grid, Card, CardContent, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { MilestoneCard, MilestoneForm } from '@/components/features/progress'
import { UserLayout } from '@/components/layout'
import { ProgressApiService } from '@/services/progress'

export const MilestoneTrackingPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [milestones, setMilestones] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  React.useEffect(() => {
    const fetchMilestones = async () => {
      if (!projectId) {
        setError('Project ID is required')
        setLoading(false)
        return
      }

      try {
        const data = await ProgressApiService.getMilestones(projectId)
        setMilestones(data)
      } catch (err) {
        setError('Failed to load milestones')
        console.error('Error fetching milestones:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMilestones()
  }, [projectId])

  const handleCreateMilestone = async (milestoneData: any) => {
    if (!projectId) return

    try {
      const newMilestone = await ProgressApiService.createMilestone(projectId, milestoneData)
      setMilestones([...milestones, newMilestone])
      setShowCreateForm(false)
    } catch (err) {
      setError('Failed to create milestone')
      console.error('Error creating milestone:', err)
    }
  }

  const handleUpdateMilestone = async (milestoneId: string, milestoneData: any) => {
    if (!projectId) return

    try {
      const updatedMilestone = await ProgressApiService.updateMilestone(projectId, milestoneId, milestoneData)
      setMilestones(milestones.map(m => m.id === milestoneId ? updatedMilestone : m))
    } catch (err) {
      setError('Failed to update milestone')
      console.error('Error updating milestone:', err)
    }
  }

  const handleDeleteMilestone = async (milestoneId: string) => {
    if (!projectId) return

    try {
      await ProgressApiService.deleteMilestone(projectId, milestoneId)
      setMilestones(milestones.filter(m => m.id !== milestoneId))
    } catch (err) {
      setError('Failed to delete milestone')
      console.error('Error deleting milestone:', err)
    }
  }

  if (loading) {
    return (
      <UserLayout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Typography>Loading milestones...</Typography>
          </Box>
        </Container>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Milestone Tracking
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShowCreateForm(!showCreateForm)}
            sx={{ display: showCreateForm ? 'none' : 'block' }}
          >
            Add Milestone
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {showCreateForm && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <MilestoneForm
                onSubmit={handleCreateMilestone}
                onCancel={() => setShowCreateForm(false)}
              />
            </CardContent>
          </Card>
        )}

        {milestones.length === 0 ? (
          <Alert severity="info">
            No milestones found. Create your first milestone to track progress.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {milestones.map((milestone) => (
              <Grid item xs={12} md={6} key={milestone.id}>
                <MilestoneCard
                  id={milestone.id}
                  title={milestone.title}
                  description={milestone.description}
                  status={milestone.status || 'pending'}
                  dueDate={new Date(milestone.dueDate)}
                  completedDate={milestone.completedDate ? new Date(milestone.completedDate) : undefined}
                  progress={milestone.progress}
                  onEdit={(id: string) => handleUpdateMilestone(id, milestone)}
                  onDelete={(id: string) => handleDeleteMilestone(id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </UserLayout>
  )
}

export default MilestoneTrackingPage
