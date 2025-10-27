/**
 * DatePicker Component
 * Enhanced date picker component with Material-UI integration
 * Supports date/time/datetime selection with validation and localization
 */

import {
  CalendarToday,
  AccessTime,
  DateRange,
  Error as ErrorIcon,
  CheckCircle,
} from '@mui/icons-material'
import {
  Box,
  TextField,
  InputAdornment,
  FormHelperText,
  useTheme,
} from '@mui/material'
import {
  DatePicker as MuiDatePicker,
  TimePicker,
  DateTimePicker,
  LocalizationProvider,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { isValid } from 'date-fns'
import React, { forwardRef } from 'react'

// DatePicker variant types
export type DatePickerVariant = 'date' | 'time' | 'datetime'

// Extended DatePicker props
export interface DatePickerProps extends Omit<MuiDatePickerProps<Date>, 'renderInput'> {
  // Basic props
  label?: string
  placeholder?: string
  helperText?: React.ReactNode
  error?: boolean
  required?: boolean
  
  // Picker variant
  variant?: DatePickerVariant
  
  // Validation
  validationState?: 'error' | 'warning' | 'success' | null
  
  // Input styling
  inputVariant?: 'outlined' | 'filled' | 'standard'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  size?: 'small' | 'medium'
  fullWidth?: boolean
  
  // Custom styling
  rounded?: boolean
  compact?: boolean
  
  // Format options
  dateFormat?: string
  timeFormat?: string
  displayFormat?: string
  
  // Range selection (for future enhancement)
  isRange?: boolean
  startDate?: Date | null
  endDate?: Date | null
  onRangeChange?: (startDate: Date | null, endDate: Date | null) => void
  
  // Custom icons
  startIcon?: React.ReactNode
  
  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      label,
      placeholder,
      helperText,
      error = false,
      required = false,
      variant = 'date',
      validationState,
      inputVariant = 'outlined',
      color = 'primary',
      size = 'medium',
      fullWidth = true,
      rounded = false,
      compact = false,
      dateFormat,
      timeFormat,
      displayFormat,
      value,
      onChange,
      disabled,
      startIcon,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    
    // Determine format based on variant
    const getFormat = () => {
      if (displayFormat) return displayFormat
      
      switch (variant) {
        case 'time':
          return timeFormat || 'HH:mm'
        case 'datetime':
          return dateFormat || 'MM/dd/yyyy HH:mm'
        case 'date':
        default:
          return dateFormat || 'MM/dd/yyyy'
      }
    }
    
    // Get appropriate icon
    const getIcon = () => {
      if (startIcon) return startIcon
      
      switch (variant) {
        case 'time':
          return <AccessTime />
        case 'datetime':
          return <DateRange />
        case 'date':
        default:
          return <CalendarToday />
      }
    }
    
    // Determine validation color
    const getValidationColor = () => {
      if (error || validationState === 'error') return theme.palette.error.main
      if (validationState === 'warning') return theme.palette.warning.main
      if (validationState === 'success') return theme.palette.success.main
      return undefined
    }
    
    // Build validation icon
    const getValidationIcon = () => {
      if (error || validationState === 'error') {
        return (
          <ErrorIcon
            sx={{
              color: 'error.main',
              fontSize: 20,
              mr: 0.5,
            }}
          />
        )
      } else if (validationState === 'success' && value && isValid(value)) {
        return (
          <CheckCircle
            sx={{
              color: 'success.main',
              fontSize: 20,
              mr: 0.5,
            }}
          />
        )
      }
      return null
    }
    
    
    // Build custom input
    const renderInput = (params: any) => (
      <TextField
        {...params}
        ref={ref}
        label={label}
        placeholder={placeholder}
        variant={inputVariant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        required={required}
        disabled={disabled}
        error={error || validationState === 'error'}
        helperText={helperText}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="start">
              {getIcon()}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {getValidationIcon()}
              {params.InputProps?.endAdornment}
            </InputAdornment>
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
            ...params.InputProps?.sx,
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
    
    // Render appropriate picker based on variant
    const renderPicker = () => {
      const { components, componentsProps, slots, slotProps, ...restProps } = props
      
      // Base props that work for all picker types
      const baseProps = {
        value,
        disabled,
        renderInput,
      }
      
      switch (variant) {
        case 'time':
          return <TimePicker {...baseProps} onChange={onChange as any} />
        case 'datetime':
          return <DateTimePicker {...baseProps} onChange={onChange as any} />
        case 'date':
        default:
          return <MuiDatePicker {...baseProps} {...restProps} onChange={onChange} />
      }
    }
    
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
          {renderPicker()}
          
          {/* Additional helper text for format */}
          {!helperText && (
            <FormHelperText
              sx={{
                ml: 0,
                mt: 0.5,
                color: 'text.secondary',
                fontSize: '0.75rem',
              }}
            >
              Format: {getFormat()}
            </FormHelperText>
          )}
        </Box>
      </LocalizationProvider>
    )
  }
)

// Convenience components for specific variants
export const TimePicker_: React.FC<Omit<DatePickerProps, 'variant'>> = (props) => (
  <DatePicker {...props} variant="time" />
)

export const DateTimePicker_: React.FC<Omit<DatePickerProps, 'variant'>> = (props) => (
  <DatePicker {...props} variant="datetime" />
)

// Date range picker (basic implementation)
export interface DateRangePickerProps extends Omit<DatePickerProps, 'value' | 'onChange'> {
  startDate?: Date | null
  endDate?: Date | null
  onStartDateChange?: (date: Date | null) => void
  onEndDateChange?: (date: Date | null) => void
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  ...props
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <DatePicker
        {...props}
        label="Start Date"
        value={startDate}
        onChange={onStartDateChange}
        maxDate={endDate || undefined}
      />
      
      <Box sx={{ color: 'text.secondary', px: 1 }}>
        to
      </Box>
      
      <DatePicker
        {...props}
        label="End Date"
        value={endDate}
        onChange={onEndDateChange}
        minDate={startDate || undefined}
      />
    </Box>
  )
}

DatePicker.displayName = 'DatePicker'
TimePicker_.displayName = 'TimePicker'
DateTimePicker_.displayName = 'DateTimePicker'
DateRangePicker.displayName = 'DateRangePicker'

export default DatePicker
