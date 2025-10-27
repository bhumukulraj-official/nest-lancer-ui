/**
 * Media Browser Page
 * Page for browsing, organizing, and managing media files
 */

import { Search, Upload, Clear, Delete } from '@mui/icons-material'
import { Container, Box, Typography, Button, Card, CardContent, TextField, InputAdornment, IconButton, Alert } from '@mui/material'
import React, { useState } from 'react'

import { MediaBrowser } from '@/components/features/media'
import { UserLayout } from '@/components/layout'
import { MediaApiService } from '@/services/media'

export const MediaBrowserPage: React.FC = () => {
  const [media, setMedia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])

  React.useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      setLoading(true)
      const result = await MediaApiService.getMedia()
      const data = result.data
      setMedia(data)
    } catch (err) {
      setError('Failed to load media files')
      console.error('Error fetching media:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleBulkDelete = async () => {
    if (selectedMedia.length === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedMedia.length} media files?`)) return

    try {
      await Promise.all(selectedMedia.map(id => MediaApiService.deleteMedia(id)))
      setMedia(media.filter(m => !selectedMedia.includes(m.id)))
      setSelectedMedia([])
    } catch (err) {
      setError('Failed to delete media files')
      console.error('Error deleting media:', err)
    }
  }

  const filteredMedia = searchQuery
    ? media.filter(item =>
        item.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : media

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Media Browser
          </Typography>
          <Button
            variant="contained"
            startIcon={<Upload />}
            onClick={() => window.location.href = '/user/media/upload'}
          >
            Upload Media
          </Button>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => handleSearch('')}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Bulk Actions */}
        {selectedMedia.length > 0 && (
          <Card sx={{ mb: 3, bgcolor: 'action.selected' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">
                  {selectedMedia.length} item(s) selected
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={handleBulkDelete}
                    color="error"
                    sx={{ mr: 1 }}
                  >
                    Delete Selected
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedMedia([])}
                  >
                    Clear Selection
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Typography>Loading media...</Typography>
          </Box>
        ) : filteredMedia.length === 0 ? (
          <Alert severity="info">
            {searchQuery ? 'No media files found matching your search.' : 'No media files uploaded yet.'}
          </Alert>
        ) : (
          <MediaBrowser
            media={filteredMedia}
            onSelect={(id) => {
              setSelectedMedia(prev =>
                prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
              )
            }}
          />
        )}
      </Container>
    </UserLayout>
  )
}

export default MediaBrowserPage
