/**
 * useQuery Hook
 * Generic query hook for API data fetching using React Query
 * Provides caching, loading states, and error handling
 */

import { 
  useQuery as useReactQuery, 
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query'
import { apiClient } from '@/services/api/client'
import { ApiError } from '@/types/api/error.types'

// Query configuration options
export interface QueryOptions<TData = any, TError = ApiError> 
  extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  // Custom options
  showErrorToast?: boolean
  retryOnError?: boolean
}

/**
 * Generic query hook for GET requests
 */
export function useQuery<TData = any, TError = ApiError>(
  queryKey: QueryKey,
  endpoint: string,
  options: QueryOptions<TData, TError> = {}
): UseQueryResult<TData, TError> {
  const {
    showErrorToast = false,
    retryOnError = true,
    ...reactQueryOptions
  } = options
  
  return useReactQuery(queryKey, async () => {
    const response = await apiClient.get<TData>(endpoint)
    return response
  }, {
    retry: retryOnError ? 3 : false,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    ...reactQueryOptions,
  })
}

/**
 * Hook for paginated queries
 */
export interface PaginatedQueryOptions<TData = any> extends QueryOptions<TData> {
  page?: number
  limit?: number
  params?: Record<string, any>
}

export function usePaginatedQuery<TData = any>(
  queryKey: QueryKey,
  endpoint: string,
  options: PaginatedQueryOptions<TData> = {}
) {
  const { page = 1, limit = 10, params = {}, ...queryOptions } = options
  
  // Build query parameters
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...params,
  }).toString()
  
  const fullEndpoint = `${endpoint}?${queryParams}`
  
  return useQuery<TData>(
    [...(queryKey as any[]), { page, limit, ...params }],
    fullEndpoint,
    queryOptions
  )
}

/**
 * Hook for queries with search/filter parameters
 */
export interface SearchQueryOptions<TData = any> extends QueryOptions<TData> {
  search?: string
  filters?: Record<string, any>
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  enabled?: boolean
}

export function useSearchQuery<TData = any>(
  queryKey: QueryKey,
  endpoint: string,
  options: SearchQueryOptions<TData> = {}
) {
  const { 
    search, 
    filters = {}, 
    sortBy, 
    sortOrder = 'desc',
    enabled = true,
    ...queryOptions 
  } = options
  
  // Build query parameters
  const params: Record<string, string> = {}
  
  if (search) params.search = search
  if (sortBy) {
    params.sortBy = sortBy
    params.sortOrder = sortOrder
  }
  
  // Add filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = value.toString()
    }
  })
  
  const queryParams = new URLSearchParams(params).toString()
  const fullEndpoint = queryParams ? `${endpoint}?${queryParams}` : endpoint
  
  return useQuery<TData>(
    [...(queryKey as any[]), { search, filters, sortBy, sortOrder }],
    fullEndpoint,
    {
      enabled: enabled && Boolean(search || Object.keys(filters).length > 0 || !search),
      ...queryOptions,
    }
  )
}

/**
 * Hook for queries that depend on other data
 */
export function useDependentQuery<TData = any>(
  queryKey: QueryKey,
  endpoint: string | (() => string),
  dependencies: any[],
  options: QueryOptions<TData> = {}
) {
  const isEnabled = dependencies.every(dep => dep !== undefined && dep !== null)
  
  return useQuery<TData>(
    [...(queryKey as any[]), ...dependencies],
    typeof endpoint === 'function' ? endpoint() : endpoint,
    {
      enabled: isEnabled,
      ...options,
    }
  )
}

/**
 * Hook for queries with automatic refetching
 */
export function usePollingQuery<TData = any>(
  queryKey: QueryKey,
  endpoint: string,
  interval: number = 30000, // 30 seconds default
  options: QueryOptions<TData> = {}
) {
  return useQuery<TData>(
    queryKey,
    endpoint,
    {
      refetchInterval: interval,
      refetchIntervalInBackground: false,
      ...options,
    }
  )
}

/**
 * Hook for lazy queries (manually triggered)
 */
export function useLazyQuery<TData = any>(
  queryKey: QueryKey,
  endpoint: string,
  options: QueryOptions<TData> = {}
) {
  const query = useQuery<TData>(
    queryKey,
    endpoint,
    {
      enabled: false,
      ...options,
    }
  )
  
  const execute = () => {
    query.refetch()
  }
  
  return {
    ...query,
    execute,
  }
}

// Re-export React Query hooks for convenience
export { useQueryClient, useIsFetching, useIsMutating } from '@tanstack/react-query'

export default useQuery
