/**
 * File Upload Hook Tests
 * Unit tests for the useFileUpload hook
 */

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { useFileUpload } from './useFileUpload'

describe('useFileUpload', () => {
  let mockFile1: File
  let mockFile2: File
  let mockFileList: FileList

  beforeEach(() => {
    mockFile1 = new File(['content1'], 'test1.txt', { type: 'text/plain' })
    mockFile2 = new File(['content2'], 'test2.txt', { type: 'text/plain' })
    
    // Create a FileList mock
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(mockFile1)
    mockFileList = dataTransfer.files
  })

  describe('Initialization', () => {
    it('should initialize with empty state', () => {
      const { result } = renderHook(() => useFileUpload())

      expect(result.current.files).toEqual([])
      expect(result.current.uploading).toBe(false)
      expect(result.current.progress).toEqual({})
      expect(result.current.errors).toEqual({})
      expect(result.current.completed).toEqual({})
    })

    it('should initialize with custom options', () => {
      const { result } = renderHook(() =>
        useFileUpload({
          maxFiles: 5,
          maxFileSize: 1024,
          multiple: true
        })
      )

      expect(result.current.canUpload).toBe(false)
      expect(result.current.totalProgress).toBe(0)
    })
  })

  describe('Select Files', () => {
    it('should select files', () => {
      const { result } = renderHook(() => useFileUpload())

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      expect(result.current.files.length).toBe(1)
      expect(result.current.files[0]).toBe(mockFile1)
    })

    it('should reject files exceeding max files limit', () => {
      const { result } = renderHook(() =>
        useFileUpload({ maxFiles: 1 })
      )

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      expect(result.current.files.length).toBe(1)
      
      act(() => {
        result.current.selectFiles(mockFileList)
      })

      expect(result.current.files.length).toBe(1)
    })

    it('should reject single file when multiple is disabled', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      const { result } = renderHook(() =>
        useFileUpload({ multiple: false })
      )

      const multiFileList = new DataTransfer()
      multiFileList.items.add(mockFile1)
      multiFileList.items.add(mockFile2)

      act(() => {
        result.current.selectFiles(multiFileList.files)
      })

      expect(consoleSpy).toHaveBeenCalled()
      expect(result.current.files.length).toBe(0)
      
      consoleSpy.mockRestore()
    })
  })

  describe('Remove Files', () => {
    it('should remove file by ID', () => {
      const { result } = renderHook(() => useFileUpload())

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      expect(result.current.files.length).toBe(1)

      act(() => {
        result.current.removeFile('file_1')
      })

      expect(result.current.files.length).toBe(0)
    })

    it('should clear all files', () => {
      const { result } = renderHook(() => useFileUpload())

      act(() => {
        result.current.selectFiles(mockFileList)
        result.current.clearFiles()
      })

      expect(result.current.files.length).toBe(0)
      expect(result.current.progress).toEqual({})
      expect(result.current.errors).toEqual({})
      expect(result.current.completed).toEqual({})
    })
  })

  describe('Upload', () => {
    it('should upload files successfully', async () => {
      const onUpload = vi.fn().mockResolvedValue({ success: true })
      const onSuccess = vi.fn()

      const { result } = renderHook(() =>
        useFileUpload({
          onUpload,
          onSuccess
        })
      )

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      await act(async () => {
        await result.current.uploadFiles()
      })

      expect(onUpload).toHaveBeenCalled()
    })

    it('should handle upload errors', async () => {
      const onUpload = vi.fn().mockRejectedValue(new Error('Upload failed'))
      const onError = vi.fn()

      const { result } = renderHook(() =>
        useFileUpload({
          onUpload,
          onError
        })
      )

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      await act(async () => {
        await result.current.uploadFiles()
      })

      expect(onError).toHaveBeenCalled()
    })

    it('should not upload when no files', async () => {
      const onUpload = vi.fn()

      const { result } = renderHook(() =>
        useFileUpload({ onUpload })
      )

      await act(async () => {
        await result.current.uploadFiles()
      })

      expect(onUpload).not.toHaveBeenCalled()
    })
  })

  describe('Progress Tracking', () => {
    it('should track upload progress', async () => {
      const onUpload = vi.fn().mockImplementation(() => {
        return new Promise(resolve => {
          setTimeout(() => resolve({}), 100)
        })
      })
      const onProgress = vi.fn()

      const { result } = renderHook(() =>
        useFileUpload({
          onUpload,
          onProgress
        })
      )

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      await act(async () => {
        await result.current.uploadFiles()
      })

      expect(result.current.uploading).toBe(false)
    })
  })

  describe('Retry Upload', () => {
    it('should retry failed upload', async () => {
      const onUpload = vi
        .fn()
        .mockRejectedValueOnce(new Error('Upload failed'))
        .mockResolvedValueOnce({ success: true })

      const { result } = renderHook(() =>
        useFileUpload({ onUpload })
      )

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      await act(async () => {
        await result.current.uploadFiles()
      })

      await act(async () => {
        await result.current.retryUpload('file_1')
      })

      expect(onUpload).toHaveBeenCalledTimes(2)
    })
  })

  describe('Helper Functions', () => {
    it('should get file by ID', () => {
      const { result } = renderHook(() => useFileUpload())

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      const file = result.current.getFileById('file_1')
      expect(file).toBe(mockFile1)
    })

    it('should get file progress', () => {
      const { result } = renderHook(() => useFileUpload())

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      const progress = result.current.getFileProgress('file_1')
      expect(progress).toBe(0)
    })

    it('should get file error', () => {
      const { result } = renderHook(() => useFileUpload())

      const error = result.current.getFileError('file_1')
      expect(error).toBeUndefined()
    })

    it('should check if file is completed', () => {
      const { result } = renderHook(() => useFileUpload())

      const completed = result.current.isFileCompleted('file_1')
      expect(completed).toBe(false)
    })
  })

  describe('Validation', () => {
    it('should validate file size', () => {
      const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.txt')

      const { result } = renderHook(() =>
        useFileUpload({
          maxFileSize: 10 * 1024 * 1024
        })
      )

      act(() => {
        result.current.selectFiles([largeFile])
      })

      // Should have error for oversized file
      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0)
    })

    it('should validate file type', () => {
      const { result } = renderHook(() =>
        useFileUpload({
          acceptedTypes: ['image/png', 'image/jpeg']
        })
      )

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      // Should have error for unsupported type
      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0)
    })
  })

  describe('Computed Values', () => {
    it('should calculate canUpload', () => {
      const { result } = renderHook(() => useFileUpload())

      expect(result.current.canUpload).toBe(false)

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      expect(result.current.canUpload).toBe(true)
    })

    it('should calculate total progress', () => {
      const { result } = renderHook(() => useFileUpload())

      expect(result.current.totalProgress).toBe(0)

      act(() => {
        result.current.selectFiles(mockFileList)
      })

      expect(result.current.totalProgress).toBeGreaterThanOrEqual(0)
    })
  })
})

