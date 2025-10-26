/**
 * Table Pagination Component
 * Pagination controls for large datasets
 * Includes page size selection, total count display, page navigation, and accessibility features
 */

import React, { FC } from 'react'
import { TablePagination as MuiTablePagination, TablePaginationProps } from '@mui/material'

interface TablePaginationComponentProps extends TablePaginationProps {
  count: number
  page: number
  onPageChange: (event: unknown, newPage: number) => void
  rowsPerPage: number
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowsPerPageOptions?: number[]
  labelRowsPerPage?: string
  labelDisplayedRows?: (params: { from: number; to: number; count: number }) => string
  showFirstButton?: boolean
  showLastButton?: boolean
}

export const TablePagination: FC<TablePaginationComponentProps> = ({
  count,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
  labelRowsPerPage = 'Rows per page:',
  labelDisplayedRows,
  showFirstButton = true,
  showLastButton = true,
  ...props
}) => {
  return (
    <MuiTablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={rowsPerPageOptions}
      labelRowsPerPage={labelRowsPerPage}
      labelDisplayedRows={labelDisplayedRows}
      {...(showFirstButton && { showFirstButton })}
      {...(showLastButton && { showLastButton })}
      {...props}
    />
  )
}

export default TablePagination

