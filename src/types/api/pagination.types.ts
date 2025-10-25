/**
 * Pagination and Filtering Types
 * TypeScript type definitions for pagination, filtering, and sorting
 */

// Pagination Types
export interface PaginationParams {
  page: number
  limit: number
  offset?: number
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  nextPage?: number
  prevPage?: number
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: PaginationMeta
}

// Sorting Types
export interface SortParams {
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export interface SortOption {
  field: string
  label: string
  direction?: 'asc' | 'desc'
}

// Filtering Types
export interface FilterParams {
  [key: string]: any
}

export interface FilterOption {
  field: string
  operator: FilterOperator
  value: any
  label?: string
}

export interface FilterGroup {
  operator: 'AND' | 'OR'
  filters: (FilterOption | FilterGroup)[]
}

export enum FilterOperator {
  EQUALS = 'eq',
  NOT_EQUALS = 'ne',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUAL = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUAL = 'lte',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with',
  IN = 'in',
  NOT_IN = 'not_in',
  BETWEEN = 'between',
  IS_NULL = 'is_null',
  IS_NOT_NULL = 'is_not_null',
  REGEX = 'regex'
}

// Search Types
export interface SearchParams {
  query: string
  fields?: string[]
  fuzzy?: boolean
  caseSensitive?: boolean
}

export interface SearchResult<T> {
  data: T[]
  query: string
  total: number
  searchTime: number
  suggestions?: string[]
}

// Date Range Types
export interface DateRange {
  from: string | Date
  to: string | Date
}

export interface DateRangeParams {
  dateFrom?: string
  dateTo?: string
  startDate?: string
  endDate?: string
}

// Generic List Request
export interface ListRequestParams {
  // Pagination
  page?: number
  limit?: number
  offset?: number
  
  // Sorting
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  
  // Search
  search?: string
  query?: string
  
  // Date Range
  dateFrom?: string
  dateTo?: string
  startDate?: string
  endDate?: string
  
  // Filters
  filters?: Record<string, any>
  status?: string[]
  category?: string[]
  tags?: string[]
  
  // Additional params
  [key: string]: any
}

// Generic List Response
export interface ListResponse<T> {
  data: T[]
  pagination: PaginationMeta
  filters?: {
    applied: FilterParams
    available: FilterOption[]
  }
  search?: {
    query: string
    total: number
    searchTime: number
  }
}

// Bulk Operations
export interface BulkActionParams {
  action: string
  ids: string[]
  data?: Record<string, any>
}

export interface BulkActionResult {
  success: string[]
  failed: Array<{
    id: string
    error: string
  }>
  total: number
  successCount: number
  failureCount: number
}

// Export/Import Types
export interface ExportParams {
  format: 'json' | 'csv' | 'xlsx' | 'pdf'
  fields?: string[]
  filters?: FilterParams
  dateRange?: DateRange
  includeDeleted?: boolean
}

export interface ImportParams {
  file: File
  format: 'json' | 'csv' | 'xlsx'
  mapping?: Record<string, string>
  options?: {
    skipHeader?: boolean
    delimiter?: string
    encoding?: string
    validateData?: boolean
  }
}

export interface ImportResult {
  total: number
  imported: number
  skipped: number
  errors: Array<{
    row: number
    field?: string
    error: string
    data?: any
  }>
  warnings: Array<{
    row: number
    field?: string
    warning: string
    data?: any
  }>
}

// Cache Types
export interface CacheParams {
  ttl?: number // Time to live in seconds
  key?: string
  tags?: string[]
  version?: string
}

export interface CacheResult<T> {
  data: T
  cached: boolean
  cachedAt?: string
  expiresAt?: string
  hit: boolean
}

// API Response Wrapper
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code: string
    status: number
    details?: any
  }
  meta?: {
    pagination?: PaginationMeta
    filters?: FilterParams
    search?: {
      query: string
      total: number
      searchTime: number
    }
    cache?: {
      hit: boolean
      cachedAt?: string
      expiresAt?: string
    }
  }
  timestamp: string
}

// Query Builder Types
export interface QueryBuilder {
  where(field: string, operator: FilterOperator, value: any): QueryBuilder
  orWhere(field: string, operator: FilterOperator, value: any): QueryBuilder
  whereIn(field: string, values: any[]): QueryBuilder
  whereNotIn(field: string, values: any[]): QueryBuilder
  whereBetween(field: string, values: [any, any]): QueryBuilder
  whereNull(field: string): QueryBuilder
  whereNotNull(field: string): QueryBuilder
  orderBy(field: string, direction?: 'asc' | 'desc'): QueryBuilder
  limit(count: number): QueryBuilder
  offset(count: number): QueryBuilder
  page(page: number, limit: number): QueryBuilder
  search(query: string, fields?: string[]): QueryBuilder
  build(): ListRequestParams
}

// Advanced Filtering
export interface AdvancedFilter {
  field: string
  operator: FilterOperator
  value: any
  label?: string
  type?: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'boolean'
  options?: Array<{
    value: any
    label: string
  }>
}

export interface FilterPreset {
  id: string
  name: string
  description?: string
  filters: AdvancedFilter[]
  isDefault?: boolean
  isPublic?: boolean
  createdBy?: string
  createdAt: string
  updatedAt: string
}

// Faceted Search
export interface Facet {
  field: string
  label: string
  type: 'terms' | 'range' | 'date'
  values: Array<{
    value: any
    label: string
    count: number
  }>
}

export interface FacetedSearchResult<T> {
  data: T[]
  facets: Facet[]
  pagination: PaginationMeta
  search: {
    query: string
    total: number
    searchTime: number
  }
}

// Aggregation Types
export interface AggregationParams {
  field: string
  function: 'count' | 'sum' | 'avg' | 'min' | 'max' | 'distinct'
  groupBy?: string[]
  filters?: FilterParams
}

export interface AggregationResult {
  field: string
  function: string
  value: number
  groups?: Array<{
    key: string
    value: number
    count?: number
  }>
}

// Real-time Updates
export interface RealtimeUpdate<T = any> {
  type: 'create' | 'update' | 'delete' | 'bulk_update'
  data: T | T[]
  timestamp: string
  source: string
  filters?: FilterParams
}

export interface SubscriptionParams {
  filters?: FilterParams
  fields?: string[]
  realtime?: boolean
  callback?: (update: RealtimeUpdate) => void
}
