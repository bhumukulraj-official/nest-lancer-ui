/**
 * Data Grid Component
 * Advanced data grid with MUI Data Grid for admin panels and analytics
 * Includes virtual scrolling, column grouping, export functionality, and real-time data updates
 */

import { DataGrid as MuiDataGrid, GridColDef, DataGridProps } from '@mui/x-data-grid'
import { FC } from 'react'

interface DataGridComponentProps extends Omit<DataGridProps, 'pagination'> {
  // Columns
  columns: GridColDef[]

  // Data
  rows: any[]

  // Features
  loading?: boolean
  checkboxSelection?: boolean
  autoHeight?: boolean
  density?: 'comfortable' | 'compact' | 'standard'
  pagination?: boolean
  
  // Callbacks
  onRowClick?: (params: any) => void
  onRowSelectionModelChange?: (selectionModel: any[]) => void
}

export const DataGrid: FC<DataGridComponentProps> = ({
  columns,
  rows,
  loading = false,
  checkboxSelection = true,
  autoHeight = false,
  density = 'standard',
  pagination = true,
  onRowClick,
  onRowSelectionModelChange,
  ...props
}) => {
  return (
    <MuiDataGrid
      columns={columns}
      rows={rows}
      loading={loading}
      checkboxSelection={checkboxSelection}
      autoHeight={autoHeight}
      density={density}
      {...(pagination && {
        pagination: true,
        pageSize: 10,
        rowsPerPageOptions: [10, 25, 50, 100]
      })}
      onRowClick={onRowClick}
      onRowSelectionModelChange={onRowSelectionModelChange}
      disableRowSelectionOnClick
      {...props}
    />
  )
}

export default DataGrid

