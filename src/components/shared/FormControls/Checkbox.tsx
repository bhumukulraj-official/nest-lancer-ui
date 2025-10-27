/**
 * Checkbox Component
 * Enhanced checkbox component with Material-UI integration
 * Supports controlled/uncontrolled state with custom styling and validation
 */

import {
  CheckBox,
  CheckBoxOutlineBlank,
  IndeterminateCheckBox,
  Error as ErrorIcon,
  CheckCircle,
} from '@mui/icons-material'
import {
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Box,
  Typography,
  alpha,
  useTheme,
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material'
import React, { forwardRef } from 'react'

// Extended checkbox props
export interface CheckboxProps extends Omit<MuiCheckboxProps, 'color'> {
  // Basic props
  label?: React.ReactNode
  description?: React.ReactNode
  
  // Validation
  error?: boolean
  helperText?: React.ReactNode
  validationState?: 'error' | 'warning' | 'success' | null
  
  // Visual variants
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  variant?: 'standard' | 'outlined' | 'filled'
  
  // Layout
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom'
  
  // Custom styling
  rounded?: boolean
  compact?: boolean
  
  // Group support
  groupLabel?: string
  groupError?: boolean
  groupHelperText?: React.ReactNode
}

// Checkbox group props
export interface CheckboxGroupProps {
  children: React.ReactElement<CheckboxProps>[]
  label?: string
  error?: boolean
  helperText?: React.ReactNode
  row?: boolean
  required?: boolean
  disabled?: boolean
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      label,
      description,
      error = false,
      helperText,
      validationState,
      color = 'primary',
      variant = 'standard',
      labelPlacement = 'end',
      rounded = false,
      compact = false,
      groupLabel,
      groupError = false,
      groupHelperText,
      checked,
      indeterminate,
      disabled,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    
    // Determine validation color
    const getValidationColor = () => {
      if (error || validationState === 'error' || groupError) return theme.palette.error.main
      if (validationState === 'warning') return theme.palette.warning.main
      if (validationState === 'success') return theme.palette.success.main
      return undefined
    }
    
    // Get appropriate icon based on state
    const getIcon = () => {
      if (variant === 'outlined') {
        return <CheckBoxOutlineBlank />
      }
      return <CheckBoxOutlineBlank />
    }
    
    const getCheckedIcon = () => {
      if (variant === 'filled') {
        return <CheckBox />
      }
      return <CheckBox />
    }
    
    const getIndeterminateIcon = () => {
      return <IndeterminateCheckBox />
    }
    
    // Build the checkbox component
    const checkboxComponent = (
      <MuiCheckbox
        ref={ref}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        color={color}
        icon={getIcon()}
        checkedIcon={getCheckedIcon()}
        indeterminateIcon={getIndeterminateIcon()}
        sx={{
          ...(rounded && {
            borderRadius: 1,
          }),
          ...(compact && {
            padding: 0.5,
          }),
          ...(validationState && {
            color: getValidationColor(),
            '&.Mui-checked': {
              color: getValidationColor(),
            },
          }),
          // Custom variant styles
          ...(variant === 'outlined' && {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-checked': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }),
          ...(variant === 'filled' && {
            backgroundColor: alpha(theme.palette.action.selected, 0.08),
            borderRadius: 1,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
            },
            '&.Mui-checked': {
              backgroundColor: alpha(theme.palette.primary.main, 0.16),
            },
          }),
          ...sx,
        }}
        {...props}
      />
    )
    
    // Build label content
    const labelContent = label && (
      <Box>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'medium',
            ...(error || validationState === 'error' || groupError) && {
              color: 'error.main',
            },
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            component="div"
            sx={{
              color: 'text.secondary',
              mt: 0.25,
              lineHeight: 1.4,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    )
    
    // Build validation icons
    const validationIcon = () => {
      if (error || validationState === 'error' || groupError) {
        return (
          <ErrorIcon
            sx={{
              color: 'error.main',
              fontSize: 16,
              ml: 0.5,
            }}
          />
        )
      } else if (validationState === 'success' && checked) {
        return (
          <CheckCircle
            sx={{
              color: 'success.main',
              fontSize: 16,
              ml: 0.5,
            }}
          />
        )
      }
      return null
    }
    
    // Render with or without label
    if (!label && !groupLabel) {
      return (
        <Box>
          {checkboxComponent}
          {(helperText || groupHelperText) && (
            <FormHelperText
              error={error || groupError}
              sx={{ ml: 0, mt: 0.5 }}
            >
              {helperText || groupHelperText}
            </FormHelperText>
          )}
        </Box>
      )
    }
    
    // Render with FormControlLabel
    const formControlLabel = (
      <FormControlLabel
        control={checkboxComponent}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {labelContent}
            {validationIcon()}
          </Box>
        }
        labelPlacement={labelPlacement}
        disabled={disabled}
        sx={{
          alignItems: labelPlacement === 'top' || labelPlacement === 'bottom' ? 'center' : 'flex-start',
          ...(compact && {
            margin: 0.5,
          }),
        }}
      />
    )
    
    // Render with group support
    if (groupLabel || groupHelperText) {
      return (
        <FormControl
          error={error || groupError}
          disabled={disabled}
        >
          {groupLabel && (
            <FormLabel component="legend" sx={{ mb: 1 }}>
              {groupLabel}
            </FormLabel>
          )}
          {formControlLabel}
          {(helperText || groupHelperText) && (
            <FormHelperText>
              {helperText || groupHelperText}
            </FormHelperText>
          )}
        </FormControl>
      )
    }
    
    return (
      <Box>
        {formControlLabel}
        {helperText && (
          <FormHelperText
            error={error}
            sx={{ ml: 0, mt: 0.5 }}
          >
            {helperText}
          </FormHelperText>
        )}
      </Box>
    )
  }
)

// Checkbox Group Component
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  label,
  error = false,
  helperText,
  row = false,
  required = false,
  disabled = false,
}) => {
  return (
    <FormControl
      component="fieldset"
      error={error}
      required={required}
      disabled={disabled}
    >
      {label && (
        <FormLabel component="legend" sx={{ mb: 1 }}>
          {label}
        </FormLabel>
      )}
      
      <FormGroup row={row}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            disabled: disabled || child.props.disabled,
            groupError: error,
          })
        )}
      </FormGroup>
      
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

Checkbox.displayName = 'Checkbox'
CheckboxGroup.displayName = 'CheckboxGroup'

export default Checkbox
