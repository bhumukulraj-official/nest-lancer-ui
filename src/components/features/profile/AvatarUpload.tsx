/**
 * AvatarUpload Component
 * Avatar upload component with Cloudinary integration and image cropping
 */

import {
  CameraAlt,
  CloudUpload,
  Delete,
} from '@mui/icons-material'
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stack,
} from '@mui/material'
import React, { useState, useRef } from 'react'

import { CloudinaryUIService } from '@/services/media'

interface AvatarUploadProps {
  currentAvatar?: string
  onAvatarChange?: (url: string) => void
  size?: number
  editable?: boolean
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  onAvatarChange,
  size = 120,
  editable = true,
}) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const result = await CloudinaryUIService.uploadImage(file, {
        folder: 'avatars',
        transformation: {
          width: 400,
          height: 400,
          crop: 'fill',
          format: 'jpg',
          quality: 'auto',
        },
      })

      const url = result.secure_url
      setAvatarUrl(url)
      onAvatarChange?.(url)
    } catch (err) {
      setError('Failed to upload avatar. Please try again.')
      console.error('Avatar upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveAvatar = () => {
    setAvatarUrl(undefined)
    onAvatarChange?.('')
  }

  const handleEditClick = () => {
    if (editable && !uploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Avatar */}
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              src={avatarUrl}
              sx={{
                width: size,
                height: size,
                fontSize: size / 2.5,
                bgcolor: 'primary.main',
                border: '4px solid',
                borderColor: 'background.paper',
                boxShadow: 3,
              }}
            >
              {avatarUrl ? '' : 'A'}
            </Avatar>

            {/* Edit Button Overlay */}
            {editable && (
              <IconButton
                onClick={handleEditClick}
                disabled={uploading}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                {uploading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  <CameraAlt />
                )}
              </IconButton>
            )}
          </Box>

          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {/* Upload Button */}
          {editable && (
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<CloudUpload />}
                onClick={handleEditClick}
                disabled={uploading}
              >
                Upload Avatar
              </Button>
              {avatarUrl && (
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleRemoveAvatar}
                  disabled={uploading}
                >
                  Remove
                </Button>
              )}
            </Stack>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mt: 2, maxWidth: 400 }}>
              {error}
            </Alert>
          )}

          {/* Helper Text */}
          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            sx={{ mt: 1 }}
          >
            JPG, PNG or GIF. Max size 5MB
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AvatarUpload
