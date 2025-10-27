/**
 * useForm Hook Tests
 * Tests for form state management hook
 */

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useForm } from './useForm'

describe('useForm', () => {
  const initialValues = {
    name: '',
    email: '',
    age: 0,
  }

  const validate = vi.fn((values) => {
    const errors: any = {}
    if (!values.name) errors.name = 'Name is required'
    if (!values.email) errors.email = 'Email is required'
    if (values.age < 18) errors.age = 'Must be 18 or older'
    return errors
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues })
      )

      expect(result.current.values).toEqual(initialValues)
      expect(result.current.errors).toEqual({})
      expect(result.current.touched).toEqual({})
      expect(result.current.dirty).toEqual({})
      expect(result.current.isValid).toBe(true)
      expect(result.current.isSubmitting).toBe(false)
      expect(result.current.isDirty).toBe(false)
      expect(result.current.submitCount).toBe(0)
    })
  })

  describe('setValue', () => {
    it('should update field value', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues })
      )

      act(() => {
        result.current.setValue('name', 'John Doe')
      })

      expect(result.current.values.name).toBe('John Doe')
      expect(result.current.dirty.name).toBe(true)
    })

    it('should validate on change if enabled', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues, validate, validateOnChange: true })
      )

      act(() => {
        result.current.setValue('name', 'John')
      })

      expect(result.current.errors.name).toBeUndefined()
    })
  })

  describe('setError', () => {
    it('should set error for field', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues })
      )

      act(() => {
        result.current.setError('name', 'Name is required')
      })

      expect(result.current.errors.name).toBe('Name is required')
    })
  })

  describe('setTouched', () => {
    it('should mark field as touched', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues })
      )

      act(() => {
        result.current.setTouched('name')
      })

      expect(result.current.touched.name).toBe(true)
    })

    it('should validate on blur if enabled', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues, validate, validateOnBlur: true })
      )

      act(() => {
        result.current.setTouched('name', true)
      })

      expect(validate).toHaveBeenCalled()
    })
  })

  describe('handleSubmit', () => {
    it('should call onSubmit on valid form', async () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useForm({
          initialValues: { ...initialValues, name: 'John', email: 'john@example.com' },
          validate,
          onSubmit,
        })
      )

      await act(async () => {
        await result.current.handleSubmit()()
      })

      expect(onSubmit).toHaveBeenCalledWith({ ...initialValues, name: 'John', email: 'john@example.com' })
    })

    it('should not call onSubmit on invalid form', async () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useForm({ initialValues, validate, onSubmit })
      )

      await act(async () => {
        await result.current.handleSubmit()()
      })

      expect(onSubmit).not.toHaveBeenCalled()
      expect(result.current.submitCount).toBe(1)
    })
  })

  describe('reset', () => {
    it('should reset form to initial values', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues })
      )

      act(() => {
        result.current.setValue('name', 'John')
        result.current.setValue('email', 'john@example.com')
      })

      act(() => {
        result.current.reset()
      })

      expect(result.current.values).toEqual(initialValues)
      expect(result.current.errors).toEqual({})
      expect(result.current.touched).toEqual({})
      expect(result.current.dirty).toEqual({})
    })
  })

  describe('validateField', () => {
    it('should validate specific field', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues, validate })
      )

      act(() => {
        result.current.validateField('name')
      })

      expect(result.current.errors.name).toBe('Name is required')
    })
  })

  describe('getFieldProps', () => {
    it('should return field props with handlers', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues })
      )

      const fieldProps = result.current.getFieldProps('name')

      expect(fieldProps).toHaveProperty('value')
      expect(fieldProps).toHaveProperty('onChange')
      expect(fieldProps).toHaveProperty('onBlur')
      expect(fieldProps).toHaveProperty('error')
      expect(fieldProps).toHaveProperty('touched')
      expect(fieldProps).toHaveProperty('dirty')
    })
  })
})

