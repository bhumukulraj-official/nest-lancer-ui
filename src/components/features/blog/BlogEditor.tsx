import { Save, Publish } from '@mui/icons-material'
import { Box, TextField, Button, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import React, { useState } from 'react'

export const BlogEditor: React.FC<{ onPublish?: (data: any) => void; onSave?: (data: any) => void }> = ({ onPublish, onSave }) => {
  const [formData, setFormData] = useState({ title: '', content: '', category: '', excerpt: '' })
  
  return (
    <Box>
      <TextField fullWidth label="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} sx={{ mb: 2 }} />
      <TextField fullWidth label="Excerpt" value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} sx={{ mb: 2 }} />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
          <MenuItem value="tech">Technology</MenuItem>
          <MenuItem value="design">Design</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth multiline rows={15} label="Content" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} sx={{ mb: 2 }} />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={() => onSave?.(formData)} startIcon={<Save />}>Save Draft</Button>
        <Button variant="contained" onClick={() => onPublish?.(formData)} startIcon={<Publish />}>Publish</Button>
      </Stack>
    </Box>
  )
}
export default BlogEditor

