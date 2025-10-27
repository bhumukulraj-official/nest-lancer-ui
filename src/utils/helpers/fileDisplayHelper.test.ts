/**
 * File Display Helper Tests
 */

import { describe, it, expect } from 'vitest'

import { getFileIcon, formatFileSize, isImageFile } from './fileDisplayHelper'

describe('fileDisplayHelper', () => {
  describe('getFileIcon', () => {
    it('should return icon for PDF', () => {
      expect(getFileIcon('application/pdf')).toBe('📄')
    })

    it('should return icon for image', () => {
      expect(getFileIcon('image/jpeg')).toBe('🖼️')
    })
  })

  describe('formatFileSize', () => {
    it('should format file size', () => {
      expect(formatFileSize(1024)).toContain('KB')
    })
  })

  describe('isImageFile', () => {
    it('should detect image files', () => {
      expect(isImageFile('image/jpeg')).toBe(true)
      expect(isImageFile('application/pdf')).toBe(false)
    })
  })
})

