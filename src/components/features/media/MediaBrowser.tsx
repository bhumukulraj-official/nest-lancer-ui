import React from 'react'
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material'

export const MediaBrowser: React.FC<{ media: any[]; onSelect?: (id: string) => void }> = ({ media, onSelect }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Media Library</Typography>
        <FormControl size="small">
          <InputLabel>Filter</InputLabel>
          <Select value="all" label="Filter">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="images">Images</MenuItem>
            <MenuItem value="videos">Videos</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {media.map((item) => (
          <Grid item key={item.id} onClick={() => onSelect?.(item.id)}>
            <Box sx={{ p: 2, border: 1, borderRadius: 1, cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}>
              <Typography variant="body2">{item.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
export default MediaBrowser

