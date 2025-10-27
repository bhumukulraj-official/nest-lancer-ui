/**
 * Project API Service Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { apiClient } from '../api/client'
import { ProjectVisibility } from '@/types/models/project.types'

import projectApiService from './projectApiService'

vi.mock('../api/client')

describe('projectApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch projects', async () => {
    const mockProjects = [{ id: '1', name: 'Project 1' }]
    ;(apiClient.get as any).mockResolvedValue(mockProjects)

    const result = await projectApiService.getProjects()

    expect(apiClient.get).toHaveBeenCalledWith('/projects')
    expect(result).toEqual(mockProjects)
  })

  it('should create project', async () => {
    const projectData = {
      title: 'New Project',
      description: 'Description',
      category: 'web-development',
      budget: 5000,
      currency: 'USD',
      duration: 30,
      startDate: '2024-01-01',
      clientName: 'Test Client',
      clientEmail: 'client@example.com',
      technologies: ['React'],
      requirements: ['Requirement 1'],
      deliverables: ['Deliverable 1'],
      tags: ['tag1'],
      visibility: ProjectVisibility.PUBLIC
    }
    ;(apiClient.post as any).mockResolvedValue({ id: '1', ...projectData })

    const result = await projectApiService.createProject(projectData)

    expect(apiClient.post).toHaveBeenCalledWith('/projects', projectData)
    expect(result).toHaveProperty('id')
  })
})

