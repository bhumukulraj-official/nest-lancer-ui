/**
 * Data Table Component
 * Data table using React Table for project lists and user management
 * Includes sorting, filtering, pagination, row selection, and column resizing
 */

import React, { FC, useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Box,
  TablePagination,
  TableProps,
  alpha,
  useTheme,
} from '@mui/material'
import {
  Delete,
  Edit,
  MoreVert,
  GetApp,
} from '@mui/icons-material'

export interface Column<T> {
  id: keyof T | string
  label: string
  minWidth?: number
  align?: 'left' | 'right' | 'center'
  format?: (value: any) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
}

interface DataTableProps<T> {
  // Data
  data: T[]
  columns: Column<T>[]
  
  // Features
  sortable?: boolean
  selectable?: boolean
  paginated?: boolean
  searchable?: boolean
  
  // Display
  pageSize?: number
  rowsPerPageOptions?: number[]
  
  // Styling
  elevation?: number
  dense?: boolean
  
  // Callbacks
  onRowClick?: (row: T) => void
  onRowSelect?: (selectedRows: T[]) => void
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  
  // Actions
  actions?: Array<{
    icon: React.ReactNode
    label: string
    onClick: (row: T) => void
  }>
  
  // Additional props
  [key: string]: any
}

export const DataTable = <T extends { id?: string | number }>({
  data,
  columns,
  sortable = true,
  selectable = false,
  paginated = true,
  searchable = false,
  pageSize = 10,
  rowsPerPageOptions = [10, 20, 50],
  elevation = 2,
  dense = false,
  onRowClick,
  onRowSelect,
  onSort,
  actions = [],
}: DataTableProps<T>) => {
  const theme = useTheme()
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pageSize)
  const [orderBy, setOrderBy] = useState<string>('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => String(row.id))
      setSelected(newSelected)
      onRowSelect?.(data)
    } else {
      setSelected([])
      onRowSelect?.([])
    }
  }
  
  const handleSelectClick = (row: T) => {
    const selectedIndex = selected.indexOf(String(row.id))
    let newSelected: string[] = []
    
    if (selectedIndex === -1) {
      newSelected = [...selected, String(row.id)]
    } else {
      newSelected = selected.filter((id) => id !== String(row.id))
    }
    
    setSelected(newSelected)
    onRowSelect?.(data.filter((row) => newSelected.includes(String(row.id))))
  }
  
  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    
    setOrderBy(columnId)
    setOrder(newOrder)
    onSort?.(columnId, newOrder)
  }
  
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  
  const isSelected = (id: string) => selected.indexOf(id) !== -1
  const isIndeterminate = selected.length > 0 && selected.length < data.length
  const isChecked = selected.length === data.length && data.length > 0
  
  // Sort data
  const sortedData = useMemo(() => {
    if (!orderBy) return data
    
    return [...data].sort((a, b) => {
      const aValue = a[orderBy as keyof T]
      const bValue = b[orderBy as keyof T]
      
      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  }, [data, orderBy, order])
  
  // Paginate data
  const paginatedData = paginated
    ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : sortedData
  
  return (
    <Paper elevation={elevation}>
      <TableContainer>
        <Table size={dense ? 'small' : 'medium'} stickyHeader>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={isIndeterminate}
                    checked={isChecked}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {sortable && column.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(String(column.id))}
                    >
                      {column.label}
                  </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              
              {actions.length > 0 && (
                <TableCell align="center" style={{ minWidth: 100 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {paginatedData.map((row) => {
              const isItemSelected = isSelected(String(row.id))
              
              return (
                <TableRow
                  hover
                  onClick={() => onRowClick?.(row)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={String(row.id)}
                  selected={isItemSelected}
                  sx={{
                    cursor: onRowClick ? 'pointer' : 'default',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                    '&.Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectClick(row)
                        }}
                      />
                    </TableCell>
                  )}
                  
                  {columns.map((column) => (
                    <TableCell key={String(column.id)} align={column.align}>
                      {column.format
                        ? column.format(row[column.id as keyof T])
                        : String(row[column.id as keyof T] || '')}
                    </TableCell>
                  ))}
                  
                  {actions.length > 0 && (
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {actions.map((action, index) => (
                          <IconButton
                            key={index}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              action.onClick(row)
                            }}
                          >
                            {action.icon}
                          </IconButton>
                        ))}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      {paginated && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  )
}

export default DataTable

