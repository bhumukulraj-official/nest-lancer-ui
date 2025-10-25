/**
 * Cloudinary UI Service
 * Handles Cloudinary widget integration for media uploads
 * UI-only service - no business logic processing
 */

import { Cloudinary } from '@cloudinary/url-gen'

// Cloudinary configuration
const cloudinaryConfig = {
  cloudName: process.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  apiKey: process.env.VITE_CLOUDINARY_API_KEY || '',
  uploadPreset: process.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
}

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: cloudinaryConfig.cloudName
  }
})

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
  created_at: string
  tags?: string[]
  context?: Record<string, string>
}

export interface CloudinaryUploadOptions {
  folder?: string
  tags?: string[]
  context?: Record<string, string>
  transformation?: {
    width?: number
    height?: number
    crop?: string
    quality?: string
    format?: string
  }
  eager?: Array<{
    width?: number
    height?: number
    crop?: string
    quality?: string
    format?: string
  }>
}

export interface CloudinaryWidgetOptions {
  cloudName: string
  uploadPreset: string
  folder?: string
  tags?: string[]
  context?: Record<string, string>
  multiple?: boolean
  maxFiles?: number
  maxFileSize?: number
  allowedFormats?: string[]
  cropping?: boolean
  croppingAspectRatio?: number
  croppingShowDimensions?: boolean
  theme?: 'light' | 'dark' | 'minimal'
  styles?: {
    palette?: {
      window?: string
      sourceBg?: string
      windowBorder?: string
      tabIcon?: string
      inactiveTabIcon?: string
      menuIcons?: string
      link?: string
      action?: string
      inProgress?: string
      complete?: string
      error?: string
      textDark?: string
      textLight?: string
    }
    fonts?: {
      default?: string
      "'sans-serif'": string
    }
  }
}

export class CloudinaryUIService {
  /**
   * Initialize Cloudinary widget
   */
  static initializeWidget(options: CloudinaryWidgetOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // Load Cloudinary widget script if not already loaded
        if (!window.cloudinary) {
          const script = document.createElement('script')
          script.src = 'https://widget.cloudinary.com/v2.0/global/all.js'
          script.onload = () => {
            this.createWidget(options, resolve, reject)
          }
          script.onerror = () => {
            reject(new Error('Failed to load Cloudinary widget'))
          }
          document.head.appendChild(script)
        } else {
          this.createWidget(options, resolve, reject)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Create Cloudinary widget
   */
  private static createWidget(options: CloudinaryWidgetOptions, resolve: Function, reject: Function): void {
    try {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: options.cloudName,
          uploadPreset: options.uploadPreset,
          folder: options.folder,
          tags: options.tags,
          context: options.context,
          multiple: options.multiple || false,
          maxFiles: options.maxFiles || 10,
          maxFileSize: options.maxFileSize || 10000000, // 10MB
          allowedFormats: options.allowedFormats || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi'],
          cropping: options.cropping || false,
          croppingAspectRatio: options.croppingAspectRatio,
          croppingShowDimensions: options.croppingShowDimensions || true,
          theme: options.theme || 'light',
          styles: options.styles
        },
        (error: any, result: any) => {
          if (error) {
            reject(error)
          } else if (result && result.event === 'success') {
            resolve(result.info)
          }
        }
      )

      // Store widget reference for later use
      ;(window as any).cloudinaryWidget = widget
    } catch (error) {
      reject(error)
    }
  }

  /**
   * Open Cloudinary widget
   */
  static openWidget(): Promise<CloudinaryUploadResult[]> {
    return new Promise((resolve, reject) => {
      try {
        const widget = (window as any).cloudinaryWidget
        if (!widget) {
          reject(new Error('Cloudinary widget not initialized'))
          return
        }

        widget.open()
        
        // Listen for upload completion
        const handleUploadComplete = (error: any, result: any) => {
          if (error) {
            reject(error)
          } else if (result && result.event === 'success') {
            resolve([result.info])
          } else if (result && result.event === 'batch-success') {
            resolve(result.info)
          }
        }

        // Add event listener
        widget.on('upload', handleUploadComplete)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Close Cloudinary widget
   */
  static closeWidget(): void {
    try {
      const widget = (window as any).cloudinaryWidget
      if (widget) {
        widget.close()
      }
    } catch (error) {
      console.error('Error closing Cloudinary widget:', error)
    }
  }

  /**
   * Generate Cloudinary image URL
   */
  static generateImageUrl(publicId: string, options?: CloudinaryUploadOptions['transformation']): string {
    try {
      const image = cld.image(publicId)
      
      if (options) {
        if (options.width) image.resize({ width: options.width })
        if (options.height) image.resize({ height: options.height })
        if (options.crop) image.resize({ crop: options.crop as any })
        if (options.quality) image.quality(options.quality)
        if (options.format) image.format(options.format as any)
      }
      
      return image.toURL()
    } catch (error) {
      console.error('Error generating Cloudinary image URL:', error)
      return ''
    }
  }

  /**
   * Generate Cloudinary video URL
   */
  static generateVideoUrl(publicId: string, options?: CloudinaryUploadOptions['transformation']): string {
    try {
      const video = cld.video(publicId)
      
      if (options) {
        if (options.width) video.resize({ width: options.width })
        if (options.height) video.resize({ height: options.height })
        if (options.crop) video.resize({ crop: options.crop as any })
        if (options.quality) video.quality(options.quality)
        if (options.format) video.format(options.format as any)
      }
      
      return video.toURL()
    } catch (error) {
      console.error('Error generating Cloudinary video URL:', error)
      return ''
    }
  }

  /**
   * Get Cloudinary resource info
   */
  static async getResourceInfo(publicId: string): Promise<any> {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/resources/image/upload/${publicId}`,
        {
          headers: {
            'Authorization': `Basic ${btoa(`${cloudinaryConfig.apiKey}:${process.env.VITE_CLOUDINARY_API_SECRET || ''}`)}`
          }
        }
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch resource info')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error getting Cloudinary resource info:', error)
      throw error
    }
  }

  /**
   * Delete Cloudinary resource
   */
  static async deleteResource(publicId: string): Promise<void> {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/resources/image/upload/${publicId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Basic ${btoa(`${cloudinaryConfig.apiKey}:${process.env.VITE_CLOUDINARY_API_SECRET || ''}`)}`
          }
        }
      )
      
      if (!response.ok) {
        throw new Error('Failed to delete resource')
      }
    } catch (error) {
      console.error('Error deleting Cloudinary resource:', error)
      throw error
    }
  }

  /**
   * Get Cloudinary configuration
   */
  static getConfig(): typeof cloudinaryConfig {
    return { ...cloudinaryConfig }
  }

  /**
   * Check if Cloudinary is configured
   */
  static isConfigured(): boolean {
    return !!(cloudinaryConfig.cloudName && cloudinaryConfig.apiKey && cloudinaryConfig.uploadPreset)
  }
}

// Extend Window interface for Cloudinary
declare global {
  interface Window {
    cloudinary: any
    cloudinaryWidget: any
  }
}

export default CloudinaryUIService
