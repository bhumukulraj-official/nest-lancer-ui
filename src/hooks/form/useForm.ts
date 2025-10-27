/**
 * Form Hook
 * Custom hook for form state management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useRef, useEffect } from 'react'

export interface FormField {
  value: any
  error?: string
  touched: boolean
  dirty: boolean
}

export interface FormState<T = any> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  dirty: Partial<Record<keyof T, boolean>>
  isValid: boolean
  isSubmitting: boolean
  isDirty: boolean
  submitCount: number
}

export interface FormActions<T = any> {
  setValue: (field: keyof T, value: any) => void
  setError: (field: keyof T, error: string) => void
  setTouched: (field: keyof T, touched?: boolean) => void
  setDirty: (field: keyof T, dirty?: boolean) => void
  setValues: (values: Partial<T>) => void
  setErrors: (errors: Partial<Record<keyof T, string>>) => void
  setTouchedFields: (touched: Partial<Record<keyof T, boolean>>) => void
  setDirtyFields: (dirty: Partial<Record<keyof T, boolean>>) => void
  reset: (values?: Partial<T>) => void
  validate: () => boolean
  validateField: (field: keyof T) => boolean
  handleSubmit: (onSubmit?: (values: T) => void | Promise<void>) => (e?: React.FormEvent) => Promise<void>
  handleChange: (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleBlur: (field: keyof T) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  getFieldProps: (field: keyof T) => {
    value: any
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    error: string | undefined
    touched: boolean
    dirty: boolean
  }
}

export interface UseFormOptions<T = any> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  validateOnChange?: boolean
  validateOnBlur?: boolean
  validateOnMount?: boolean
  enableReinitialize?: boolean
  onSubmit?: (values: T) => void | Promise<void>
}

export function useForm<T extends Record<string, any> = Record<string, any>>(options: UseFormOptions<T>): FormState<T> & FormActions<T> {
  const {
    initialValues,
    validate,
    validateOnChange = true,
    validateOnBlur = true,
    validateOnMount = false,
    enableReinitialize = false,
    onSubmit
  } = options

  // State
  const [values, setValuesState] = useState<T>(initialValues)
  const [errors, setErrorsState] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({})
  const [dirty, setDirtyState] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)

  // Refs
  const initialValuesRef = useRef(initialValues)
  const isInitialMount = useRef(true)

  // Computed values
  const isValid = Object.keys(errors).length === 0
  const isDirty = Object.values(dirty).some(Boolean)

  // Update initial values if enableReinitialize is true
  useEffect(() => {
    if (enableReinitialize && !isInitialMount.current) {
      initialValuesRef.current = initialValues
      setValuesState(initialValues)
      setErrorsState({})
      setTouchedState({})
      setDirtyState({})
    }
    isInitialMount.current = false
  }, [initialValues, enableReinitialize])

  // Validation function
  const validateForm = useCallback((): boolean => {
    if (!validate) return true

    const validationErrors = validate(values)
    setErrorsState(validationErrors)
    return Object.keys(validationErrors).length === 0
  }, [values, validate])

  // Field validation function
  const validateField = useCallback((field: keyof T): boolean => {
    if (!validate) return true

    const validationErrors = validate(values)
    const fieldError = validationErrors[field]
    
    if (fieldError) {
      setErrorsState(prev => ({ ...prev, [field]: fieldError }))
      return false
    } else {
      setErrorsState(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
      return true
    }
  }, [values, validate])

  // Actions
  const setValue = useCallback((field: keyof T, value: any) => {
    setValuesState(prev => ({ ...prev, [field]: value }))
    setDirtyState(prev => ({ ...prev, [field]: true }))
    
    if (validateOnChange) {
      validateField(field)
    }
  }, [validateOnChange, validateField])

  const setError = useCallback((field: keyof T, error: string) => {
    setErrorsState(prev => ({ ...prev, [field]: error }))
  }, [])

  const setTouched = useCallback((field: keyof T, touchedValue: boolean = true) => {
    setTouchedState(prev => ({ ...prev, [field]: touchedValue }))
    
    if (validateOnBlur && touchedValue) {
      validateField(field)
    }
  }, [validateOnBlur, validateField])

  const setDirty = useCallback((field: keyof T, dirtyValue: boolean = true) => {
    setDirtyState(prev => ({ ...prev, [field]: dirtyValue }))
  }, [])

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({ ...prev, ...newValues }))
    
    // Mark all changed fields as dirty
    Object.keys(newValues).forEach(key => {
      setDirtyState(prev => ({ ...prev, [key as keyof T]: true }))
    })
    
    if (validateOnChange) {
      validateForm()
    }
  }, [validateOnChange, validateForm])

  const setErrors = useCallback((newErrors: Partial<Record<keyof T, string>>) => {
    setErrorsState(prev => ({ ...prev, ...newErrors }))
  }, [])

  const setTouchedFields = useCallback((newTouched: Partial<Record<keyof T, boolean>>) => {
    setTouchedState(prev => ({ ...prev, ...newTouched }))
  }, [])

  const setDirtyFields = useCallback((newDirty: Partial<Record<keyof T, boolean>>) => {
    setDirtyState(prev => ({ ...prev, ...newDirty }))
  }, [])

  const reset = useCallback((newValues?: Partial<T>) => {
    const resetValues = newValues ? { ...initialValuesRef.current, ...newValues } : initialValuesRef.current
    setValuesState(resetValues)
    setErrorsState({})
    setTouchedState({})
    setDirtyState({})
    setIsSubmitting(false)
    setSubmitCount(0)
  }, [])

  const handleSubmit = useCallback((onSubmitFn?: (values: T) => void | Promise<void>) => {
    return async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault()
      }

      setIsSubmitting(true)
      setSubmitCount(prev => prev + 1)

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key as keyof T] = true
        return acc
      }, {} as Partial<Record<keyof T, boolean>>)
      setTouchedState(allTouched)

      // Validate form
      const isValidForm = validateForm()

      if (isValidForm) {
        try {
          const submitFn = onSubmitFn || onSubmit
          if (submitFn) {
            await submitFn(values)
          }
        } catch (error) {
          console.error('Form submission error:', error)
        }
      }

      setIsSubmitting(false)
    }
  }, [values, validateForm, onSubmit])

  const handleChange = useCallback((field: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : e.target.value
      
      setValue(field, value)
    }
  }, [setValue])

  const handleBlur = useCallback((field: keyof T) => {
    return (_e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setTouched(field, true)
    }
  }, [setTouched])

  const getFieldProps = useCallback((field: keyof T) => {
    return {
      value: values[field],
      onChange: handleChange(field),
      onBlur: handleBlur(field),
      error: errors[field],
      touched: touched[field] || false,
      dirty: dirty[field] || false
    }
  }, [values, errors, touched, dirty, handleChange, handleBlur])

  // Initial validation on mount
  useEffect(() => {
    if (validateOnMount && validate) {
      validateForm()
    }
  }, [validateOnMount, validateForm])

  return {
    // State
    values,
    errors,
    touched,
    dirty,
    isValid,
    isSubmitting,
    isDirty,
    submitCount,

    // Actions
    setValue,
    setError,
    setTouched,
    setDirty,
    setValues,
    setErrors,
    setTouchedFields,
    setDirtyFields,
    reset,
    validate: validateForm,
    validateField,
    handleSubmit,
    handleChange,
    handleBlur,
    getFieldProps
  }
}

export default useForm
