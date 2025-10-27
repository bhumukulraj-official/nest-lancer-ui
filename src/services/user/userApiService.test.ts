/**
 * User API Service Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { apiClient } from '../api/client'

import userApiService from './userApiService'

vi.mock('../api/client')

describe('userApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch user by id', async () => {
    const mockUser = { id: '1', name: 'Test User' }
    ;(apiClient.get as any).mockResolvedValue(mockUser)

    const result = await userApiService.getUser('1')

    expect(apiClient.get).toHaveBeenCalledWith('/users/1')
    expect(result).toEqual(mockUser)
  })

  it('should update user', async () => {
    const updateData = { firstName: 'Updated', lastName: 'Name' }
    ;(apiClient.put as any).mockResolvedValue({ success: true })

    await userApiService.updateUser('1', updateData)

    expect(apiClient.put).toHaveBeenCalledWith('/users/1', updateData)
  })
})

