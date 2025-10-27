/**
 * useMutation Hook
 * Generic mutation hook for API data mutations using React Query
 * Provides optimistic updates, loading states, and error handling
 */

import { 
  useMutation as useReactQueryMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

import { apiClient } from '@/services/api/client'
import { useNotificationStore } from '@/stores/notificationStore'
import { ApiError } from '@/types/api/error.types'

// HTTP methods
export type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Mutation variables
export interface MutationVariables<TData = any> {
  data?: TData
  params?: Record<string, any>
}

// Mutation options
export interface MutationOptions<TData = any, TVariables = any, TError = ApiError> 
  extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
  // API configuration
  method?: HttpMethod
  
  // UI feedback
  showSuccessToast?: boolean
  showErrorToast?: boolean
  successMessage?: string | ((data: TData) => string)
  errorMessage?: string | ((error: TError) => string)
  
  // Cache invalidation
  invalidateQueries?: string | string[]
  
  // Optimistic updates
  optimisticUpdate?: {
    queryKey: string | string[]
    updater: (oldData: any, variables: TVariables) => any
  }
}

/**
 * Generic mutation hook
 */
export function useMutation<TData = any, TVariables = MutationVariables, TError = ApiError>(
  endpoint: string | ((variables: TVariables) => string),
  options: MutationOptions<TData, TVariables, TError> = {}
): UseMutationResult<TData, TError, TVariables> {
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotificationStore()
  
  const {
    method = 'POST',
    showSuccessToast = false,
    showErrorToast = true,
    successMessage,
    errorMessage,
    invalidateQueries,
    optimisticUpdate,
    onSuccess,
    onError,
    onSettled,
    ...reactQueryOptions
  } = options
  
  return useReactQueryMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const url = typeof endpoint === 'function' ? endpoint(variables) : endpoint
      
      // Extract data and params from variables
      const { data, params } = variables as MutationVariables
      
      // Build URL with params if provided
      let finalUrl = url
      if (params && Object.keys(params).length > 0) {
        const queryParams = new URLSearchParams(params).toString()
        finalUrl = `${url}?${queryParams}`
      }
      
      // Make API call based on method
      switch (method) {
        case 'POST':
          return await apiClient.post<TData>(finalUrl, data)
        case 'PUT':
          return await apiClient.put<TData>(finalUrl, data)
        case 'PATCH':
          return await apiClient.patch<TData>(finalUrl, data)
        case 'DELETE':
          return await apiClient.delete<TData>(finalUrl)
        default:
          throw new Error(`Unsupported HTTP method: ${method}`)
      }
    },
    
    onMutate: async (variables: TVariables) => {
      // Optimistic update
      if (optimisticUpdate) {
        await queryClient.cancelQueries({ queryKey: [optimisticUpdate.queryKey] })
        
        const previousData = queryClient.getQueryData([optimisticUpdate.queryKey])
        
        queryClient.setQueryData(
          [optimisticUpdate.queryKey],
          (oldData: any) => optimisticUpdate.updater(oldData, variables)
        )
        
        return { previousData }
      }
      
      // Call original onMutate if provided
      return reactQueryOptions.onMutate?.(variables)
    },
    
    onSuccess: (data: TData, variables: TVariables, context: any) => {
      // Show success toast
      if (showSuccessToast) {
        const message = typeof successMessage === 'function' 
          ? successMessage(data)
          : successMessage || 'Operation completed successfully'
        showSuccess(message)
      }
      
      // Invalidate queries
      if (invalidateQueries) {
        const queries = Array.isArray(invalidateQueries) ? invalidateQueries : [invalidateQueries]
        queries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        })
      }
      
      // Call original onSuccess
      onSuccess?.(data, variables, context)
    },
    
    onError: (error: TError, variables: TVariables, context: any) => {
      // Rollback optimistic update
      if (optimisticUpdate && context?.previousData) {
        queryClient.setQueryData([optimisticUpdate.queryKey], context.previousData)
      }
      
      // Show error toast
      if (showErrorToast) {
        const message = typeof errorMessage === 'function'
          ? errorMessage(error)  
          : errorMessage || (error as any)?.message || 'Operation failed'
        showError(message)
      }
      
      // Call original onError
      onError?.(error, variables, context)
    },
    
    onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context: any) => {
      // Call original onSettled
      onSettled?.(data, error, variables, context)
    },
    
    ...reactQueryOptions,
  })
}

/**
 * Hook for POST mutations
 */
export function useCreateMutation<TData = any, TVariables = any>(
  endpoint: string | ((variables: TVariables) => string),
  options: Omit<MutationOptions<TData, TVariables>, 'method'> = {}
) {
  return useMutation<TData, TVariables>(endpoint, {
    method: 'POST',
    showSuccessToast: true,
    successMessage: 'Created successfully',
    ...options,
  })
}

/**
 * Hook for PUT mutations
 */
export function useUpdateMutation<TData = any, TVariables = any>(
  endpoint: string | ((variables: TVariables) => string),
  options: Omit<MutationOptions<TData, TVariables>, 'method'> = {}
) {
  return useMutation<TData, TVariables>(endpoint, {
    method: 'PUT',
    showSuccessToast: true,
    successMessage: 'Updated successfully',
    ...options,
  })
}

/**
 * Hook for PATCH mutations
 */
export function usePatchMutation<TData = any, TVariables = any>(
  endpoint: string | ((variables: TVariables) => string),
  options: Omit<MutationOptions<TData, TVariables>, 'method'> = {}
) {
  return useMutation<TData, TVariables>(endpoint, {
    method: 'PATCH',
    showSuccessToast: true,
    successMessage: 'Updated successfully',
    ...options,
  })
}

/**
 * Hook for DELETE mutations
 */
export function useDeleteMutation<TData = any, TVariables = any>(
  endpoint: string | ((variables: TVariables) => string),
  options: Omit<MutationOptions<TData, TVariables>, 'method'> = {}
) {
  return useMutation<TData, TVariables>(endpoint, {
    method: 'DELETE',
    showSuccessToast: true,
    successMessage: 'Deleted successfully',
    ...options,
  })
}

/**
 * Hook for bulk operations
 */
export function useBulkMutation<TData = any, TVariables = any>(
  endpoint: string,
  options: MutationOptions<TData, TVariables> = {}
) {
  return useMutation<TData, TVariables>(endpoint, {
    method: 'POST',
    showSuccessToast: true,
    successMessage: 'Bulk operation completed successfully',
    ...options,
  })
}

/**
 * Hook for file upload mutations
 */
export interface UploadVariables {
  file: File
  data?: Record<string, any>
}

export function useUploadMutation<TData = any>(
  endpoint: string,
  options: Omit<MutationOptions<TData, UploadVariables>, 'method'> = {}
) {
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useNotificationStore()
  
  const {
    showSuccessToast = true,
    showErrorToast = true,
    successMessage = 'File uploaded successfully',
    errorMessage,
    invalidateQueries,
    onSuccess,
    onError,
    ...reactQueryOptions
  } = options
  
  return useReactQueryMutation<TData, ApiError, UploadVariables>({
    mutationFn: async ({ file, data = {} }) => {
      const formData = new FormData()
      formData.append('file', file)
      
      // Add additional data
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      
      return await apiClient.post<TData>(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    
    onSuccess: (data: TData, variables: UploadVariables, context: any) => {
      if (showSuccessToast) {
        const message = typeof successMessage === 'function' 
          ? successMessage(data)
          : successMessage || 'File uploaded successfully'
        showSuccess(message)
      }
      
      if (invalidateQueries) {
        const queries = Array.isArray(invalidateQueries) ? invalidateQueries : [invalidateQueries]
        queries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        })
      }
      
      onSuccess?.(data, variables, context)
    },
    
    onError: (error: ApiError, variables: UploadVariables, context: any) => {
      if (showErrorToast) {
        const message = typeof errorMessage === 'function'
          ? errorMessage(error)
          : errorMessage || error?.message || 'Upload failed'
        showError(message)
      }
      
      onError?.(error, variables, context)
    },
    
    ...reactQueryOptions,
  })
}

export default useMutation
