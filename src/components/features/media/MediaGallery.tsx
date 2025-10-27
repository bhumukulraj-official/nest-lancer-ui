import { Delete, Visibility } from '@mui/icons-material'
import { Box, Grid, Card, CardMedia, CardContent, IconButton, Typography } from '@mui/material'
import React from 'react'

interface MediaGalleryProps {
  media: Array<{ id: string; url: string; type: string; name?: string }>
  onView?: (id: string) => void
  onDelete?: (id: string) => void
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ media, onView, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {media.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardMedia component="img" height="200" image={item.url} />
            <CardContent>
              <Typography variant="body2" noWrap>
                {item.name || 'Untitled'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
                {onView && <IconButton size="small" onClick={() => onView(item.id)}><Visibility /></IconButton>}
                {onDelete && <IconButton size="small" color="error" onClick={() => onDelete(item.id)}><Delete /></IconButton>}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
export default MediaGallery

