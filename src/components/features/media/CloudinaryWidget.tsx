import React, { useEffect } from 'react'
import { Box, Alert } from '@mui/material'
import { CloudinaryUIService } from '@/services/media'

export const CloudinaryWidget: React.FC<{ onUploadComplete?: (url: string) => void }> = ({ onUploadComplete }) => {
  useEffect(() => {
    const initWidget = () => {
      // Cloudinary widget initialization
      CloudinaryUIService.openUploadWidget({
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        multiple: false,
      })
        .then((result: any) => {
          if (result.event === 'success' && result.info?.url) {
            onUploadComplete?.(result.info.url)
          }
        })
        .catch((error) => {
          console.error('Upload failed:', error)
        })
    }
    initWidget()
  }, [onUploadComplete])

  return (
    <Box>
      <Alert severity="info">Loading Cloudinary upload widget...</Alert>
    </Box>
  )
}
export default CloudinaryWidget

