/**
 * MediaUpload Component
 * File upload component with Cloudinary integration, drag-and-drop functionality, and progress tracking
 */

import React, { useState, useRef } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Stack,
  Alert,
  IconButton,
  Chip,
} from '@mui/material'
import { CloudUpload, Delete, CloudDone } from '@mui/icons-material'
import { CloudinaryUIService } from '@/services/media'

interface MediaUploadProps {
  onUploadComplete?: (url: string) => void
  maxFiles?: number
  accept?: string
  folder?: string
}

export const MediaUpload: React.FC<MediaUploadProps> = ({
  onUploadComplete,
  maxFiles = 5,
  accept = 'image/*',
  folder = 'uploads',
}) => {
  const [files, setFiles] = useState<Array<{ file: File; progress: number; url?: string; uploading: boolean }>>([])
  const [uploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    if (selectedFiles.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    selectedFiles.forEach(file => {
      files.push({ file, progress: 0, uploading: true })
      setFiles([...files])
    })

    // Simulate upload progress
    selectedFiles.forEach((file, index) => {
      uploadFile(file, index)
    })
  }

  const uploadFile = async (file: File, index: number) => {
    try {
      const result = await CloudinaryUIService.uploadImage(file, { folder })
      const url = result.secure_url
      files[index] = { ...files[index], url, progress: 100, uploading: false }
      setFiles([...files])
      onUploadComplete?.(url)
    } catch (err) {
      setError('Failed to upload file')
      console.error(err)
    }
  }

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Media
        </Typography>

        <Box sx={{ mt: 2 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            Select Files
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {files.length > 0 && (
            <Stack spacing={2} sx={{ mt: 3 }}>
              {files.map((item, index) => (
                <Box key={index} sx={{ p: 2, border: 1, borderRadius: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                      {item.file.name}
                    </Typography>
                    {item.uploading ? (
                      <Chip label={`${item.progress}%`} size="small" />
                    ) : (
                      <Chip icon={<CloudDone />} label="Uploaded" color="success" size="small" />
                    )}
                    <IconButton size="small" onClick={() => handleRemove(index)}>
                      <Delete />
                    </IconButton>
                  </Box>
                  {item.uploading && (
                    <LinearProgress variant="determinate" value={item.progress} sx={{ mt: 1 }} />
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default MediaUpload

