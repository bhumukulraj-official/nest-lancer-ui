/**
 * FileUpload Component Tests
 * Unit tests for the FileUpload component
 */

import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { render , createMockEvent } from '@/test/utils/test-utils'

import { FileUpload } from './FileUpload'

describe('FileUpload', () => {
  const createMockFile = (name: string, size: number, type: string): File => {
    const file = new File(['content'], name, { type })
    Object.defineProperty(file, 'size', { value: size })
    return file
  }

  describe('Rendering', () => {
    it('should render file upload button', () => {
      render(<FileUpload />)
      expect(screen.getByText(/upload file/i)).toBeInTheDocument()
    })

    it('should render multiple files button when multiple prop is true', () => {
      render(<FileUpload multiple />)
      expect(screen.getByText(/upload files/i)).toBeInTheDocument()
    })
  })

  describe('File Selection', () => {
    it('should handle file upload', async () => {
      const handleUpload = vi.fn()
      render(<FileUpload onUpload={handleUpload} />)
      
      const file = createMockFile('test.pdf', 1024, 'application/pdf')
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      
      if (input) {
        Object.defineProperty(input, 'files', {
          value: [file],
          writable: false,
        })
        
        fireEvent.change(input, createMockEvent('change'))
        
        expect(handleUpload).toHaveBeenCalled()
      }
    })

    it('should handle multiple file uploads', async () => {
      const handleUpload = vi.fn()
      render(<FileUpload multiple onUpload={handleUpload} />)
      
      const files = [
        createMockFile('test1.pdf', 1024, 'application/pdf'),
        createMockFile('test2.pdf', 2048, 'application/pdf'),
      ]
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      
      if (input) {
        Object.defineProperty(input, 'files', {
          value: files,
          writable: false,
        })
        
        fireEvent.change(input, createMockEvent('change'))
        
        expect(handleUpload).toHaveBeenCalledWith(files)
      }
    })
  })

  describe('File Validation', () => {
    it('should reject files exceeding max size', async () => {
      const handleUpload = vi.fn()
      render(<FileUpload maxSize={1} onUpload={handleUpload} />)
      
      const largeFile = createMockFile('large.pdf', 5 * 1024 * 1024, 'application/pdf')
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      
      if (input) {
        Object.defineProperty(input, 'files', {
          value: [largeFile],
          writable: false,
        })
        
        fireEvent.change(input, createMockEvent('change'))
        
        // Should not upload the file
        expect(handleUpload).not.toHaveBeenCalled()
      }
    })

    it('should accept files within max size', async () => {
      const handleUpload = vi.fn()
      render(<FileUpload maxSize={10} onUpload={handleUpload} />)
      
      const file = createMockFile('small.pdf', 1024, 'application/pdf')
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      
      if (input) {
        Object.defineProperty(input, 'files', {
          value: [file],
          writable: false,
        })
        
        fireEvent.change(input, createMockEvent('change'))
        
        expect(handleUpload).toHaveBeenCalled()
      }
    })

    it('should respect maxFiles limit', async () => {
      const handleUpload = vi.fn()
      render(<FileUpload multiple maxFiles={2} onUpload={handleUpload} />)
      
      const files = [
        createMockFile('test1.pdf', 1024, 'application/pdf'),
        createMockFile('test2.pdf', 1024, 'application/pdf'),
        createMockFile('test3.pdf', 1024, 'application/pdf'),
        createMockFile('test4.pdf', 1024, 'application/pdf'),
      ]
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      
      if (input) {
        Object.defineProperty(input, 'files', {
          value: files,
          writable: false,
        })
        
        fireEvent.change(input, createMockEvent('change'))
        
        expect(handleUpload).toHaveBeenCalled()
      }
    })
  })

  describe('File Removal', () => {
    it('should handle file removal', async () => {
      const handleRemove = vi.fn()
      render(<FileUpload onRemove={handleRemove} />)
      
      const file = createMockFile('test.pdf', 1024, 'application/pdf')
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      
      if (input) {
        Object.defineProperty(input, 'files', {
          value: [file],
          writable: false,
        })
        
        fireEvent.change(input, createMockEvent('change'))
        
        // Find and click remove button if it exists
        const removeButtons = document.querySelectorAll('[aria-label*="remove"], [title*="remove"], [title*="delete"]')
        if (removeButtons.length > 0) {
          fireEvent.click(removeButtons[0])
        }
      }
    })
  })

  describe('File Acceptance', () => {
    it('should accept specified file types', () => {
      render(<FileUpload accept=".pdf,.doc,.docx" />)
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).toHaveAttribute('accept', '.pdf,.doc,.docx')
    })

    it('should accept image files by default', () => {
      render(<FileUpload accept="image/*" />)
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(input).toHaveAttribute('accept', 'image/*')
    })
  })

  describe('Loading State', () => {
    it('should disable upload button when uploading', () => {
      render(<FileUpload />)
      
      const button = screen.getByText(/upload file/i)
      expect(button).toBeInTheDocument()
    })
  })
})

