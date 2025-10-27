/**
 * RequestList Component
 * Request list component with filtering, sorting, and status-based organization
 */

import {
  ViewList,
  ViewModule,
  Search,
} from '@mui/icons-material'
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Card,
} from '@mui/material'
import React, { useState, useMemo } from 'react'

import { Spinner } from '@/components/shared'
import { Request } from '@/types/models/request.types'

import { RequestCard } from './RequestCard'

interface RequestListProps {
  requests: Request[]
  onViewRequest?: (request: Request) => void
  onEditRequest?: (request: Request) => void
  onDeleteRequest?: (request: Request) => void
  loading?: boolean
}

type ViewMode = 'grid' | 'list'
type SortOption = 'newest' | 'oldest' | 'deadline' | 'budget'
type FilterStatus = 'all' | 'pending' | 'in_progress' | 'completed' | 'cancelled'

export const RequestList: React.FC<RequestListProps> = ({
  requests,
  onViewRequest,
  onEditRequest,
  onDeleteRequest,
  loading = false,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and sort requests
  const filteredAndSortedRequests = useMemo(() => {
    let result = [...requests]

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(req => req.status === filterStatus)
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        req =>
          req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort requests
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'deadline':
          return (a.deadline ? new Date(a.deadline).getTime() : 0) - (b.deadline ? new Date(b.deadline).getTime() : 0)
        case 'budget':
          return b.budget - a.budget
        default:
          return 0
      }
    })

    return result
  }, [requests, filterStatus, sortBy, searchQuery])

  const statusCounts = useMemo(() => {
    const counts = { all: requests.length, pending: 0, in_progress: 0, completed: 0, cancelled: 0 }
    requests.forEach(req => {
      if (req.status in counts) {
        counts[req.status as keyof typeof counts]++
      }
    })
    return counts
  }, [requests])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Spinner />
      </Box>
    )
  }

  return (
    <Box>
      {/* Filters and Controls */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>

          {/* Status Filter */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={e => setFilterStatus(e.target.value as FilterStatus)}
              >
                <MenuItem value="all">All ({statusCounts.all})</MenuItem>
                <MenuItem value="pending">Pending ({statusCounts.pending})</MenuItem>
                <MenuItem value="in_progress">In Progress ({statusCounts.in_progress})</MenuItem>
                <MenuItem value="completed">Completed ({statusCounts.completed})</MenuItem>
                <MenuItem value="cancelled">Cancelled ({statusCounts.cancelled})</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sort */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={e => setSortBy(e.target.value as SortOption)}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="deadline">Deadline</MenuItem>
                <MenuItem value="budget">Budget</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* View Toggle */}
          <Grid item xs={12} md={2}>
            <Box display="flex" justifyContent="flex-end">
              <Tooltip title={viewMode === 'grid' ? 'List View' : 'Grid View'}>
                <IconButton onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                  {viewMode === 'grid' ? <ViewList /> : <ViewModule />}
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Results */}
      {filteredAndSortedRequests.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No requests found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchQuery || filterStatus !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first request to get started'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredAndSortedRequests.map(request => (
            <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} key={request.id}>
              <RequestCard
                request={request}
                onView={onViewRequest}
                onEdit={onEditRequest}
                onDelete={onDeleteRequest}
                variant={viewMode === 'grid' ? 'default' : 'compact'}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Summary */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Showing {filteredAndSortedRequests.length} of {requests.length} requests
        </Typography>
      </Box>
    </Box>
  )
}

export default RequestList

