/**
 * Select Component
 * Enhanced select dropdown component with search, multi-select, and Material-UI integration
 * Supports single/multi-select with autocomplete functionality
 */

import React, { forwardRef, useState, useMemo } from 'react'
import {
  TextField,
  Autocomplete,
  Chip,
  Box,
  InputAdornment,
  CircularProgress,
  useTheme,
  AutocompleteProps,
} from '@mui/material'
import {
  ExpandMore,
  Clear,
  Check,
  Error as ErrorIcon,
} from '@mui/icons-material'

// Option interface
export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  group?: string
  description?: string
  icon?: React.ReactNode
}

// Select props interface
export interface SelectProps
  extends Omit<
    AutocompleteProps<SelectOption, boolean, boolean, boolean>,
    'options' | 'renderInput' | 'multiple' | 'value' | 'onChange' | 'renderOption'
  > {
  // Basic props
  label?: string
  placeholder?: string
  helperText?: string
  error?: boolean
  required?: boolean
  disabled?: boolean
  
  // Options
  options: SelectOption[]
  
  // Value handling
  value?: string | number | (string | number)[] | null
  onChange?: (value: string | number | (string | number)[] | null) => void
  
  // Variant options
  variant?: 'outlined' | 'filled' | 'standard'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  
  // Enhanced functionality
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  creatable?: boolean
  
  // Loading state
  loading?: boolean
  
  // Validation
  validationState?: 'error' | 'warning' | 'success' | null
  
  // Icons
  startIcon?: React.ReactNode
  
  // Styling
  fullWidth?: boolean
  size?: 'small' | 'medium'
  rounded?: boolean
  compact?: boolean
  
  // Custom rendering
  renderOption?: (option: SelectOption) => React.ReactNode
  renderValue?: (value: SelectOption | SelectOption[]) => React.ReactNode
  
  // Event handlers
  onSearchChange?: (searchValue: string) => void
  onCreateOption?: (inputValue: string) => SelectOption | Promise<SelectOption>
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      placeholder,
      helperText,
      error = false,
      required = false,
      disabled = false,
      options = [],
      value,
      onChange,
      variant = 'outlined',
      color = 'primary',
      multiple = false,
      searchable = false,
      clearable = true,
      creatable = false,
      loading = false,
      validationState,
      startIcon,
      fullWidth = true,
      size = 'medium',
      rounded = false,
      compact = false,
      renderOption,
      renderValue,
      onSearchChange,
      onCreateOption,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    const [searchValue, setSearchValue] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    
    // Convert value to options format
    const selectedOptions = useMemo(() => {
      if (!value) return multiple ? [] : null
      
      if (multiple && Array.isArray(value)) {
        return options.filter(option => value.includes(option.value))
      } else if (!multiple && !Array.isArray(value)) {
        return options.find(option => option.value === value) || null
      }
      
      return multiple ? [] : null
    }, [value, options, multiple])
    
    
    // Handle input change for search
    const handleInputChange = (_event: React.SyntheticEvent, newInputValue: string) => {
      setSearchValue(newInputValue)
      onSearchChange?.(newInputValue)
    }
    
    // Handle creating new option
    const handleCreateOption = async (inputValue: string) => {
      if (!creatable || !onCreateOption) return
      
      try {
        setIsCreating(true)
        const newOption = await onCreateOption(inputValue)
        
        // Add the new option to current selection
        if (multiple) {
          const currentValues = Array.isArray(value) ? value : []
          onChange?.([...currentValues, newOption.value])
        } else {
          onChange?.(newOption.value)
        }
        
        setSearchValue('')
      } catch (error) {
        console.error('Failed to create option:', error)
      } finally {
        setIsCreating(false)
      }
    }
    
    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!searchable || !searchValue) return options
      
      const lowercaseSearch = searchValue.toLowerCase()
      return options.filter(option =>
        option.label.toLowerCase().includes(lowercaseSearch) ||
        option.description?.toLowerCase().includes(lowercaseSearch)
      )
    }, [options, searchValue, searchable])
    
    // Determine validation color
    const getValidationColor = () => {
      if (error || validationState === 'error') return theme.palette.error.main
      if (validationState === 'warning') return theme.palette.warning.main
      if (validationState === 'success') return theme.palette.success.main
      return undefined
    }
    
    // Custom option renderer
    const defaultRenderOption = (props: any, option: SelectOption) => (
      <Box component="li" {...props} key={option.value}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {option.icon && (
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              {option.icon}
            </Box>
          )}
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ fontWeight: 'medium' }}>
              {option.label}
            </Box>
            {option.description && (
              <Box
                sx={{
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  mt: 0.25,
                }}
              >
                {option.description}
              </Box>
            )}
          </Box>
          
          {multiple && selectedOptions && Array.isArray(selectedOptions) && 
           selectedOptions.some(selected => selected.value === option.value) && (
            <Check sx={{ color: 'primary.main', fontSize: 18 }} />
          )}
        </Box>
      </Box>
    )
    
    // Custom input renderer
    const renderInput = (params: any) => (
      <TextField
        {...params}
        label={label}
        placeholder={placeholder}
        variant={variant}
        color={color}
        error={error || validationState === 'error'}
        helperText={helperText}
        required={required}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <>
              {startIcon && (
                <InputAdornment position="start">
                  {startIcon}
                </InputAdornment>
              )}
              {params.InputProps.startAdornment}
            </>
          ),
          endAdornment: (
            <>
              {loading && <CircularProgress color="inherit" size={20} />}
              {validationState === 'error' && (
                <ErrorIcon sx={{ color: 'error.main', fontSize: 20, mr: 1 }} />
              )}
              {params.InputProps.endAdornment}
            </>
          ),
          sx: {
            ...(rounded && {
              borderRadius: 2,
            }),
            ...(compact && {
              '& .MuiOutlinedInput-input': {
                py: 1,
              },
            }),
            ...params.InputProps.sx,
          },
        }}
        sx={{
          ...(validationState && {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: getValidationColor(),
              },
              '&.Mui-focused fieldset': {
                borderColor: getValidationColor(),
              },
            },
          }),
        }}
      />
    )
    
    // Custom tag renderer for multiple select
    const renderTags = (tagValue: SelectOption[], getTagProps: any) =>
      tagValue.map((option, index) => (
        <Chip
          {...getTagProps({ index })}
          key={option.value}
          label={option.label}
          size={size}
          icon={option.icon}
          sx={{
            maxWidth: 200,
            '& .MuiChip-label': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
        />
      ))
    
    return (
      <Autocomplete
        ref={ref}
        options={filteredOptions}
        value={selectedOptions}
        onChange={(_event, value) => {
          if (multiple && Array.isArray(value)) {
            const values = value.map(option => typeof option === 'string' ? option : option.value)
            onChange?.(values)
          } else if (!multiple && value && !Array.isArray(value)) {
            const val = typeof value === 'string' ? value : value.value
            onChange?.(val)
          } else {
            onChange?.(null)
          }
        }}
        onInputChange={searchable ? handleInputChange : undefined}
        multiple={multiple}
        disableCloseOnSelect={multiple}
        disableClearable={!clearable}
        disabled={disabled || isCreating}
        loading={loading || isCreating}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option
          return option.label
        }}
        getOptionDisabled={(option) => option.disabled || false}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        groupBy={(option) => option.group || ''}
        renderOption={renderOption ? (_props, option) => renderOption(option) : defaultRenderOption}
        renderInput={renderInput}
        renderTags={multiple ? renderTags : undefined}
        filterOptions={(options, params) => {
          const filtered = options
          
          // Add create option if enabled
          if (creatable && params.inputValue && onCreateOption) {
            const exists = options.some(
              option => option.label.toLowerCase() === params.inputValue.toLowerCase()
            )
            
            if (!exists) {
              filtered.push({
                label: `Create "${params.inputValue}"`,
                value: `__create__${params.inputValue}`,
                description: 'Click to create new option',
              })
            }
          }
          
          return filtered
        }}
        onKeyDown={(event) => {
          // Handle creating new option on Enter
          if (
            event.key === 'Enter' &&
            creatable &&
            searchValue &&
            onCreateOption
          ) {
            event.preventDefault()
            handleCreateOption(searchValue)
          }
        }}
        popupIcon={<ExpandMore />}
        clearIcon={<Clear />}
        sx={{
          ...(fullWidth && { width: '100%' }),
        }}
        {...props}
      />
    )
  }
)

Select.displayName = 'Select'

export default Select
