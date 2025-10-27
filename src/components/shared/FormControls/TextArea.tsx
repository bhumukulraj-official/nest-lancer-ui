/**
 * TextArea Component
 * Multi-line text input with character counting
 * Includes validation, formatting, and responsive design
 */

import {
  TextField,
  TextFieldProps,
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import { forwardRef } from 'react'

export interface TextAreaProps extends Omit<TextFieldProps, 'multiline'> {
  variant?: 'outlined' | 'filled' | 'standard'
  color?: 'primary' | 'secondary'
  minRows?: number
  maxRows?: number
  maxLength?: number
  showCharCount?: boolean
  validationState?: 'error' | 'success'
  clearable?: boolean
}

export const TextArea = forwardRef<HTMLInputElement, TextAreaProps>(
  ({
    variant = 'outlined',
    maxLength,
    showCharCount = true,
    minRows = 3,
    maxRows = 6,
    validationState,
    error,
    helperText,
    value,
    onChange,
    sx,
    ...props
  }, ref) => {
    const theme = useTheme()
    const currentLength = typeof value === 'string' ? value.length : 0
    const hasError = error || validationState === 'error'
    const isSuccess = validationState === 'success'
    const showLimit = maxLength && showCharCount
    
    return (
      <Box>
        <TextField
          ref={ref}
          multiline
          variant={variant}
          minRows={minRows}
          maxRows={maxRows}
          inputProps={{ maxLength }}
          error={hasError}
          value={value}
          onChange={onChange}
          helperText={
            helperText || (
              showLimit && (
                <Typography
                  variant="caption"
                  color={currentLength >= (maxLength || 0) * 0.9 ? 'error' : 'text.secondary'}
                >
                  {currentLength} / {maxLength}
                </Typography>
              )
            )
          }
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              ...(isSuccess && {
                '&:hover fieldset': {
                  borderColor: theme.palette.success.main,
                },
                '& fieldset': {
                  borderColor: theme.palette.success.main,
                },
              }),
            },
            ...sx,
          }}
          {...props}
        />
      </Box>
    )
  }
)

TextArea.displayName = 'TextArea'
export default TextArea

