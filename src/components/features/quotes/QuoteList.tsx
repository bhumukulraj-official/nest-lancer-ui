/**
 * QuoteList Component
 * Quote list component with filtering, sorting, and status management
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
import { Quote } from '@/types/models/quote.types'

import { QuoteCard } from './QuoteCard'

interface QuoteListProps {
  quotes: Quote[]
  onViewQuote?: (quote: Quote) => void
  onEditQuote?: (quote: Quote) => void
  onDeleteQuote?: (quote: Quote) => void
  onAcceptQuote?: (quote: Quote) => void
  loading?: boolean
}

type ViewMode = 'grid' | 'list'
type SortOption = 'newest' | 'oldest' | 'amount' | 'deadline'
type FilterStatus = 'all' | 'pending' | 'accepted' | 'rejected'

export const QuoteList: React.FC<QuoteListProps> = ({
  quotes,
  onViewQuote,
  onEditQuote,
  onDeleteQuote,
  onAcceptQuote,
  loading = false,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and sort quotes
  const filteredAndSortedQuotes = useMemo(() => {
    let result = [...quotes]

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(quote => quote.status === filterStatus)
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        quote =>
          quote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quote.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort quotes
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'amount':
          return b.totalAmount - a.totalAmount
        case 'deadline':
          return (a.deadline ? new Date(a.deadline).getTime() : 0) - (b.deadline ? new Date(b.deadline).getTime() : 0)
        default:
          return 0
      }
    })

    return result
  }, [quotes, filterStatus, sortBy, searchQuery])

  const statusCounts = useMemo(() => {
    const counts = { all: quotes.length, pending: 0, accepted: 0, rejected: 0 }
    quotes.forEach(quote => {
      if (quote.status in counts) {
        counts[quote.status as keyof typeof counts]++
      }
    })
    return counts
  }, [quotes])

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
              placeholder="Search quotes..."
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
                <MenuItem value="accepted">Accepted ({statusCounts.accepted})</MenuItem>
                <MenuItem value="rejected">Rejected ({statusCounts.rejected})</MenuItem>
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
                <MenuItem value="amount">Amount</MenuItem>
                <MenuItem value="deadline">Deadline</MenuItem>
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
      {filteredAndSortedQuotes.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No quotes found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchQuery || filterStatus !== 'all'
              ? 'Try adjusting your filters'
              : 'No quotes available at this time'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredAndSortedQuotes.map(quote => (
            <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} key={quote.id}>
              <QuoteCard
                quote={quote}
                onView={onViewQuote}
                onEdit={onEditQuote}
                onDelete={onDeleteQuote}
                onAccept={onAcceptQuote}
                variant={viewMode === 'grid' ? 'default' : 'compact'}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Summary */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Showing {filteredAndSortedQuotes.length} of {quotes.length} quotes
        </Typography>
      </Box>
    </Box>
  )
}

export default QuoteList

