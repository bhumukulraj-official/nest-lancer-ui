/**
 * Table Filters Component
 * Table filtering component for search and filter functionality
 * Includes multiple filter types, filter persistence, and clear all functionality
 */

import React, { FC } from 'react'
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  IconButton,
} from '@mui/material'
import { Clear, Search, FilterList } from '@mui/icons-material'

interface FilterOption {
  value: string | number
  label: string
}

interface Filter {
  id: string
  type: 'text' | 'select' | 'date' | 'number'
  label: string
  options?: FilterOption[]
  value: any
}

interface TableFiltersProps {
  filters: Filter[]
  onChange: (filters: Filter[]) => void
  onClear?: () => void
}

export const TableFilters: FC<TableFiltersProps> = ({
  filters,
  onChange,
  onClear,
}) => {
  const handleFilterChange = (filterId: string, value: any) => {
    const updatedFilters = filters.map(filter =>
      filter.id === filterId ? { ...filter, value } : filter
    )
    onChange(updatedFilters)
  }
  
  const handleClearAll = () => {
    const clearedFilters = filters.map(filter => ({ ...filter, value: '' }))
    onChange(clearedFilters)
    onClear?.()
  }
  
  const hasActiveFilters = filters.some(filter => filter.value)
  
  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <FilterList color="primary" />
        
        {filters.map((filter) => (
          <Box key={filter.id} sx={{ minWidth: 200 }}>
            {filter.type === 'select' && filter.options ? (
              <FormControl fullWidth size="small">
                <InputLabel>{filter.label}</InputLabel>
                <Select
                  value={filter.value || ''}
                  label={filter.label}
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                >
                  {filter.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                size="small"
                label={filter.label}
                type={filter.type === 'number' ? 'number' : 'text'}
                value={filter.value || ''}
                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                InputProps={{
                  startAdornment: filter.type === 'text' && <Search fontSize="small" />,
                }}
              />
            )}
          </Box>
        ))}
        
        {hasActiveFilters && (
          <IconButton onClick={handleClearAll} size="small">
            <Clear />
          </IconButton>
        )}
      </Stack>
      
      {hasActiveFilters && (
        <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
          {filters
            .filter(filter => filter.value)
            .map((filter) => (
              <Chip
                key={filter.id}
                label={`${filter.label}: ${filter.value}`}
                onDelete={() => handleFilterChange(filter.id, '')}
                size="small"
              />
            ))}
        </Stack>
      )}
    </Box>
  )
}

export default TableFilters

