/**
 * File Display Helper Utilities
 * File display helpers (icons, names, etc.)
 */

// File Type Icons
export const FILE_TYPE_ICONS: Record<string, string> = {
  // Images
  'image/jpeg': '🖼️',
  'image/png': '🖼️',
  'image/gif': '🖼️',
  'image/webp': '🖼️',
  'image/svg+xml': '🖼️',
  
  // Videos
  'video/mp4': '🎥',
  'video/webm': '🎥',
  'video/avi': '🎥',
  'video/mov': '🎥',
  
  // Audio
  'audio/mpeg': '🎵',
  'audio/wav': '🎵',
  'audio/ogg': '🎵',
  'audio/mp3': '🎵',
  
  // Documents
  'application/pdf': '📄',
  'application/msword': '📄',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📄',
  'application/vnd.ms-excel': '📊',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',
  'application/vnd.ms-powerpoint': '📊',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '📊',
  
  // Archives
  'application/zip': '📦',
  'application/x-rar-compressed': '📦',
  'application/x-7z-compressed': '📦',
  
  // Code
  'text/javascript': '💻',
  'text/css': '💻',
  'text/html': '💻',
  'text/x-python': '💻',
  'text/x-java': '💻',
  'text/x-c': '💻',
  'text/x-c++': '💻',
  
  // Text
  'text/plain': '📝',
  'text/csv': '📝',
  'text/xml': '📝',
  'text/json': '📝',
  
  // Default
  'default': '📁',
}

// Get File Icon
export const getFileIcon = (mimeType: string): string => {
  return FILE_TYPE_ICONS[mimeType] || FILE_TYPE_ICONS.default
}

// Get File Extension
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || ''
}

// Get File Name Without Extension
export const getFileNameWithoutExtension = (filename: string): string => {
  return filename.replace(/\.[^/.]+$/, '')
}

// Format File Size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Get File Type Category
export const getFileTypeCategory = (mimeType: string): string => {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType.startsWith('audio/')) return 'audio'
  if (mimeType.startsWith('text/')) return 'text'
  if (mimeType.startsWith('application/')) return 'application'
  return 'other'
}

// Is Image File
export const isImageFile = (mimeType: string): boolean => {
  return mimeType.startsWith('image/')
}

// Is Video File
export const isVideoFile = (mimeType: string): boolean => {
  return mimeType.startsWith('video/')
}

// Is Audio File
export const isAudioFile = (mimeType: string): boolean => {
  return mimeType.startsWith('audio/')
}

// Is Document File
export const isDocumentFile = (mimeType: string): boolean => {
  const documentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ]
  
  return documentTypes.includes(mimeType)
}

// Is Archive File
export const isArchiveFile = (mimeType: string): boolean => {
  const archiveTypes = [
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
  ]
  
  return archiveTypes.includes(mimeType)
}

// Is Code File
export const isCodeFile = (mimeType: string): boolean => {
  const codeTypes = [
    'text/javascript',
    'text/css',
    'text/html',
    'text/x-python',
    'text/x-java',
    'text/x-c',
    'text/x-c++',
  ]
  
  return codeTypes.includes(mimeType)
}

// Get File Color
export const getFileColor = (mimeType: string): string => {
  const category = getFileTypeCategory(mimeType)
  
  switch (category) {
    case 'image':
      return '#4CAF50' // Green
    case 'video':
      return '#2196F3' // Blue
    case 'audio':
      return '#FF9800' // Orange
    case 'text':
      return '#9C27B0' // Purple
    case 'application':
      return '#607D8B' // Blue Grey
    default:
      return '#9E9E9E' // Grey
  }
}

// Validate File Type
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type)
}

// Validate File Size
export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize
}

// Get File Preview URL
export const getFilePreviewUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (isImageFile(file.type)) {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    } else {
      reject(new Error('File type not supported for preview'))
    }
  })
}
