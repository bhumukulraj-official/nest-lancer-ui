/**
 * useFormValidation Hook Tests
 */

import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { useFormValidation } from './useFormValidation'

describe('useFormValidation', () => {
  it('should validate form fields', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        rules: {
          email: { required: true }
        }
      })
    )

    const error = result.current.validateField('email', '')
    expect(error).toBe('This field is required')
  })
})

