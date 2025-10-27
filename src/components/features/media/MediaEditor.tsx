import React from 'react'
import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material'
import { Save, Cancel } from '@mui/icons-material'

export const MediaEditor: React.FC<{ url: string; onSave?: (edits: any) => void; onCancel?: () => void }> = ({ url, onSave, onCancel }) => {
  
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Media Editor</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" onClick={onCancel} startIcon={<Cancel />}>Cancel</Button>
            <Button variant="contained" size="small" onClick={() => onSave?.({})} startIcon={<Save />}>
              Save Changes
            </Button>
          </Stack>
        </Box>
        <Box sx={{ textAlign: 'center', p: 4, bgcolor: 'background.default', borderRadius: 1 }}>
          <img src={url} alt="Preview" style={{ maxWidth: '100%', maxHeight: 400 }} />
        </Box>
      </CardContent>
    </Card>
  )
}
export default MediaEditor

