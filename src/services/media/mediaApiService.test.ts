/**
 * Media API Service Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { apiClient } from '../api/client'

import mediaApiService from './mediaApiService'

vi.mock('../api/client')

describe('mediaApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch media files', async () => {
    const mockMedia = [{ id: '1', filename: 'image.jpg' }]
    ;(apiClient.get as any).mockResolvedValue(mockMedia)

    const result = await mediaApiService.getMedia()

    expect(apiClient.get).toHaveBeenCalledWith('/media')
    expect(result).toEqual(mockMedia)
  })

  it('should upload media file', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const formData = new FormData()
    formData.append('file', file)

    ;(apiClient.post as any).mockResolvedValue({ id: '1', filename: 'test.jpg' })

    const result = await mediaApiService.uploadMedia(file)

    expect(apiClient.post).toHaveBeenCalled()
    expect(result).toHaveProperty('id')
  })
})

