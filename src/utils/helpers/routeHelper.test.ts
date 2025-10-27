/**
 * Route Helper Tests
 */

import { describe, it, expect } from 'vitest'

import {
  generateRoute,
} from './routeHelper'

describe('routeHelper', () => {
  describe('generateRoute', () => {
    it('should generate path with params', () => {
      expect(generateRoute('/projects/:id', { id: '123' })).toBe('/projects/123')
    })

    it('should handle multiple params', () => {
      expect(generateRoute('/projects/:projectId/quotes/:quoteId', {
        projectId: '1',
        quoteId: '2',
      })).toBe('/projects/1/quotes/2')
    })
  })
})

