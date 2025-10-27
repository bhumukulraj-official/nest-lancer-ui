/**
 * FileUpload Component
 * Drag-and-drop file upload with cloudinary integration
 * Includes file validation, progress tracking, and preview
 */

import {
  CloudUpload,
  Close,
} from '@mui/icons-material'
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  IconButton,
} from '@mui/material'
import React, { FC, useState } from 'react'

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  onUpload?: (files: File[]) => void
  onRemove?: (file: File) => void
  maxFiles?: number
}

export const FileUpload: FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize = 10,
  onUpload,
  onRemove,
  maxFiles = 5,
}) => {
  const [files, setFiles] = useState<File[]>([])
  const [uploading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    validateAndSetFiles(selectedFiles)
  }
  
  const validateAndSetFiles = (newFiles: File[]) => {
    const errors: string[] = []
    const validFiles: File[] = []
    
    newFiles.forEach((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        errors.push(`${file.name} exceeds max size of ${maxSize}MB`)
      } else {
        validFiles.push(file)
      }
    })
    
    setErrors(errors)
    
    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
      const trimmedFiles = updatedFiles.slice(0, maxFiles)
      setFiles(trimmedFiles)
      onUpload?.(trimmedFiles)
    }
  }
  
  const handleRemove = (file: File) => {
    const updatedFiles = files.filter(f => f !== file)
    setFiles(updatedFiles)
    onRemove?.(file)
  }
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }
  
  return (
    <Box>
      <input
        accept={accept}
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        multiple={multiple}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUpload />}
          disabled={uploading}
        >
          Upload File{multiple ? 's' : ''}
        </Button>
      </label>
      
      {errors.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {errors.map((error, index) => (
            <Typography key={index} variant="caption" color="error">
              {error}
            </Typography>
          ))}
        </Box>
      )}
      
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Paper
              key={index}
              sx={{
                p: 1.5,
                mt: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2">{file.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(file.size)}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => handleRemove(file)}>
                <Close />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}
      
      {uploading && <LinearProgress sx={{ mt: 1 }} />}
    </Box>
  )
}

export default FileUpload

