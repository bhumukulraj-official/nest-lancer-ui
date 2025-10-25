/**
 * File Upload Hook
 * Custom hook for file upload handling
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useRef } from 'react'

export interface FileUploadState {
  files: File[]
  uploading: boolean
  progress: Record<string, number>
  errors: Record<string, string>
  completed: Record<string, boolean>
}

export interface FileUploadOptions {
  maxFiles?: number
  maxFileSize?: number
  acceptedTypes?: string[]
  multiple?: boolean
  onUpload?: (files: File[]) => Promise<any>
  onProgress?: (fileId: string, progress: number) => void
  onSuccess?: (fileId: string, result: any) => void
  onError?: (fileId: string, error: string) => void
  onComplete?: (results: Array<{ fileId: string; result?: any; error?: string }>) => void
}

export interface UseFileUploadReturn {
  // State
  files: File[]
  uploading: boolean
  progress: Record<string, number>
  errors: Record<string, string>
  completed: Record<string, boolean>
  
  // Actions
  selectFiles: (files: FileList | File[]) => void
  removeFile: (fileId: string) => void
  clearFiles: () => void
  uploadFiles: () => Promise<void>
  retryUpload: (fileId: string) => Promise<void>
  
  // Helpers
  getFileById: (fileId: string) => File | undefined
  getFileProgress: (fileId: string) => number
  getFileError: (fileId: string) => string | undefined
  isFileCompleted: (fileId: string) => boolean
  canUpload: boolean
  totalProgress: number
}

export function useFileUpload(options: FileUploadOptions = {}): UseFileUploadReturn {
  const {
    maxFiles = 10,
    maxFileSize = 10 * 1024 * 1024, // 10MB
    acceptedTypes = [],
    multiple = true,
    onUpload,
    onProgress,
    onSuccess,
    onError,
    onComplete
  } = options

  // State
  const [state, setState] = useState<FileUploadState>({
    files: [],
    uploading: false,
    progress: {},
    errors: {},
    completed: {}
  })

  // Refs
  const fileIdCounter = useRef(0)

  // Generate unique file ID
  const generateFileId = useCallback(() => {
    return `file_${++fileIdCounter.current}_${Date.now()}`
  }, [])

  // Validate file
  const validateFile = useCallback((file: File): string | undefined => {
    // Check file size
    if (file.size > maxFileSize) {
      return `File size must be less than ${Math.round(maxFileSize / 1024 / 1024)}MB`
    }

    // Check file type
    if (acceptedTypes.length > 0) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase()
      const mimeType = file.type.toLowerCase()
      
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type.slice(1)
        }
        if (type.includes('/')) {
          return mimeType === type || mimeType.startsWith(type.split('/')[0] + '/')
        }
        return false
      })

      if (!isValidType) {
        return `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`
      }
    }

    return undefined
  }, [maxFileSize, acceptedTypes])

  // Select files
  const selectFiles = useCallback((fileList: FileList | File[]) => {
    const files = Array.from(fileList)
    
    // Check max files limit
    if (!multiple && files.length > 1) {
      console.warn('Multiple files not allowed')
      return
    }

    if (state.files.length + files.length > maxFiles) {
      console.warn(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Validate files
    const validFiles: File[] = []
    const errors: Record<string, string> = {}

    files.forEach(file => {
      const error = validateFile(file)
      if (error) {
        const fileId = generateFileId()
        errors[fileId] = error
      } else {
        validFiles.push(file)
      }
    })

    setState(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles],
      errors: { ...prev.errors, ...errors }
    }))
  }, [state.files.length, maxFiles, multiple, validateFile, generateFileId])

  // Remove file
  const removeFile = useCallback((fileId: string) => {
    setState(prev => {
      const newFiles = prev.files.filter((_, index) => {
        const currentFileId = `file_${index + 1}`
        return currentFileId !== fileId
      })

      const newProgress = { ...prev.progress }
      const newErrors = { ...prev.errors }
      const newCompleted = { ...prev.completed }

      delete newProgress[fileId]
      delete newErrors[fileId]
      delete newCompleted[fileId]

      return {
        ...prev,
        files: newFiles,
        progress: newProgress,
        errors: newErrors,
        completed: newCompleted
      }
    })
  }, [])

  // Clear all files
  const clearFiles = useCallback(() => {
    setState({
      files: [],
      uploading: false,
      progress: {},
      errors: {},
      completed: {}
    })
  }, [])

  // Upload files
  const uploadFiles = useCallback(async () => {
    if (!onUpload || state.files.length === 0) return

    setState(prev => ({ ...prev, uploading: true }))

    const results: Array<{ fileId: string; result?: any; error?: string }> = []

    try {
      // Upload all files
      const uploadPromises = state.files.map(async (file, index) => {
        const fileId = `file_${index + 1}`
        
        try {
          // Simulate progress for demonstration
          const progressInterval = setInterval(() => {
            const currentProgress = Math.random() * 100
            setState(prev => ({
              ...prev,
              progress: { ...prev.progress, [fileId]: currentProgress }
            }))
            onProgress?.(fileId, currentProgress)
          }, 100)

          const result = await onUpload([file])
          
          clearInterval(progressInterval)
          
          setState(prev => ({
            ...prev,
            progress: { ...prev.progress, [fileId]: 100 },
            completed: { ...prev.completed, [fileId]: true }
          }))

          onSuccess?.(fileId, result)
          results.push({ fileId, result })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Upload failed'
          
          setState(prev => ({
            ...prev,
            errors: { ...prev.errors, [fileId]: errorMessage }
          }))

          onError?.(fileId, errorMessage)
          results.push({ fileId, error: errorMessage })
        }
      })

      await Promise.allSettled(uploadPromises)
    } finally {
      setState(prev => ({ ...prev, uploading: false }))
      onComplete?.(results)
    }
  }, [onUpload, state.files, onProgress, onSuccess, onError, onComplete])

  // Retry upload for specific file
  const retryUpload = useCallback(async (fileId: string) => {
    if (!onUpload) return

    const fileIndex = parseInt(fileId.split('_')[1]) - 1
    const file = state.files[fileIndex]
    
    if (!file) return

    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [fileId]: '' },
      completed: { ...prev.completed, [fileId]: false }
    }))

    try {
      const result = await onUpload([file])
      
      setState(prev => ({
        ...prev,
        progress: { ...prev.progress, [fileId]: 100 },
        completed: { ...prev.completed, [fileId]: true }
      }))

      onSuccess?.(fileId, result)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [fileId]: errorMessage }
      }))

      onError?.(fileId, errorMessage)
    }
  }, [onUpload, state.files, onSuccess, onError])

  // Helper functions
  const getFileById = useCallback((fileId: string): File | undefined => {
    const fileIndex = parseInt(fileId.split('_')[1]) - 1
    return state.files[fileIndex]
  }, [state.files])

  const getFileProgress = useCallback((fileId: string): number => {
    return state.progress[fileId] || 0
  }, [state.progress])

  const getFileError = useCallback((fileId: string): string | undefined => {
    return state.errors[fileId]
  }, [state.errors])

  const isFileCompleted = useCallback((fileId: string): boolean => {
    return state.completed[fileId] || false
  }, [state.completed])

  // Computed values
  const canUpload = state.files.length > 0 && !state.uploading
  const totalProgress = state.files.length > 0 
    ? Object.values(state.progress).reduce((sum, progress) => sum + progress, 0) / state.files.length
    : 0

  return {
    // State
    files: state.files,
    uploading: state.uploading,
    progress: state.progress,
    errors: state.errors,
    completed: state.completed,

    // Actions
    selectFiles,
    removeFile,
    clearFiles,
    uploadFiles,
    retryUpload,

    // Helpers
    getFileById,
    getFileProgress,
    getFileError,
    isFileCompleted,
    canUpload,
    totalProgress
  }
}

export default useFileUpload
