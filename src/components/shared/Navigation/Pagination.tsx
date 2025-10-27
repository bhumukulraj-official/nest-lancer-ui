/**
 * Pagination Component
 * Pagination controls for data tables with page size selection and total count display
 * Includes accessibility features and responsive design
 */

import React, { FC } from 'react'
import {
  Pagination as MuiPagination,
  PaginationProps as MuiPaginationProps,
  PaginationItem,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
} from '@mui/material'

interface PaginationProps extends Omit<MuiPaginationProps, 'onChange'> {
  // Pagination data
  page: number
  total: number
  count?: number // Total items count
  
  // Page size
  pageSize?: number
  pageSizeOptions?: number[]
  showPageSize?: boolean
  
  // Display
  showFirstLast?: boolean
  showText?: boolean
  showTotal?: boolean
  siblingCount?: number
  
  // Variant
  variant?: 'outlined' | 'text'
  shape?: 'circular' | 'rounded'
  color?: 'primary' | 'secondary' | 'standard'
  
  // Callbacks
  onChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  
  // Table pagination (for table footer)
  useTablePagination?: boolean
  
  // Custom labels
  firstLabel?: string
  lastLabel?: string
  rowsPerPageLabel?: string
  totalItemsLabel?: string
}

export const Pagination: FC<PaginationProps> = ({
  page,
  total,
  count,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSize = true,
  showFirstLast = false,
  showText = true,
  showTotal = false,
  siblingCount = 1,
  variant = 'outlined',
  shape = 'circular',
  color = 'primary',
  onChange,
  onPageSizeChange,
  useTablePagination = false,
  firstLabel = 'First',
  lastLabel = 'Last',
  rowsPerPageLabel = 'Rows per page',
  totalItemsLabel = 'Total items',
  ...props
}) => {
  
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onChange(value)
  }
  
  const handleTablePageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newPageSize = Number(event.target.value)
    onPageSizeChange?.(newPageSize)
  }
  
  // If using table pagination (like in DataGrid footer)
  if (useTablePagination && count !== undefined) {
    return (
      <TablePagination
        component="div"
        count={count}
        page={page - 1}
        onPageChange={(_event, newPage) => onChange(newPage + 1)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleTablePageSizeChange}
        rowsPerPageOptions={pageSizeOptions}
        labelRowsPerPage={rowsPerPageLabel}
        labelDisplayedRows={({ from, to, count: totalCount }) =>
          `${from}–${to} of ${totalCount !== -1 ? totalCount : `more than ${to}`}`
        }
      />
    )
  }
  
  const totalPages = Math.ceil(total / pageSize)
  const startItem = (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, total)
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 2,
      }}
    >
      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {showPageSize && onPageSizeChange && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{rowsPerPageLabel}</InputLabel>
            <Select
              value={pageSize}
              label={rowsPerPageLabel}
              onChange={handleTablePageSizeChange as any}
            >
              {pageSizeOptions.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          variant={variant}
          shape={shape}
          color={color}
          siblingCount={siblingCount}
          showFirstButton={showFirstLast}
          showLastButton={showFirstLast}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              slots={{
                first: () => firstLabel,
                last: () => lastLabel,
              }}
            />
          )}
          sx={{
            '& .MuiPaginationItem-root': {
              '&.Mui-selected': {
                fontWeight: 600,
              },
            },
          }}
          {...props}
        />
      </Box>
      
      {/* Text Display */}
      {showText && (
        <Typography variant="body2" color="text.secondary">
          Showing {startItem} to {endItem} of {total}
        </Typography>
      )}
      
      {/* Total Items Display */}
      {showTotal && count !== undefined && (
        <Typography variant="caption" color="text.secondary">
          {totalItemsLabel}: {count}
        </Typography>
      )}
    </Box>
  )
}

export default Pagination

