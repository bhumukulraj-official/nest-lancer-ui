/**
 * API Hooks Index
 * Central export point for all API-related hooks
 */

// Query hooks
export { 
  useQuery,
  usePaginatedQuery,
  useSearchQuery,
  useDependentQuery,
  usePollingQuery,
  useLazyQuery,
  useQueryClient,
  useIsFetching,
  useIsMutating,
  type QueryOptions,
  type PaginatedQueryOptions,
  type SearchQueryOptions 
} from './useQuery'

// Mutation hooks
export { 
  useMutation,
  useCreateMutation,
  useUpdateMutation,
  usePatchMutation,
  useDeleteMutation,
  useBulkMutation,
  useUploadMutation,
  type MutationOptions,
  type MutationVariables,
  type HttpMethod,
  type UploadVariables 
} from './useMutation'

// Re-export for convenience
export { useQuery as default } from './useQuery'
