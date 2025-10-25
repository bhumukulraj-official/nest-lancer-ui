/**
 * Pagination Constants
 * Pagination defaults and configuration
 */

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZES: [5, 10, 20, 50, 100],
  SHOW_SIZE_CHANGER: true,
  SHOW_QUICK_JUMPER: true,
  SHOW_TOTAL: true,
} as const

export const PAGINATION_LABELS = {
  ITEMS_PER_PAGE: 'Items per page',
  TOTAL_ITEMS: 'Total {total} items',
  SHOWING: 'Showing {start} to {end} of {total} items',
  PREVIOUS: 'Previous',
  NEXT: 'Next',
  FIRST: 'First',
  LAST: 'Last',
} as const
