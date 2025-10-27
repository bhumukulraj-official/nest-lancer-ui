/**
 * Radio Component
 * Radio button group component for form selections
 * Includes proper grouping, accessibility, and validation
 */

import {
  RadioGroup,
  RadioGroupProps,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio as MuiRadio,
  FormHelperText,
} from '@mui/material'
import { FC } from 'react'

export interface RadioProps extends Omit<RadioGroupProps, 'onChange'> {
  label?: string
  helperText?: string
  error?: boolean
  options: Array<{ value: string; label: string; disabled?: boolean }>
  value: string
  onChange: (value: string) => void
}

export const Radio: FC<RadioProps> = ({
  label,
  helperText,
  error,
  options,
  value,
  onChange,
  row = false,
  ...props
}) => {
  return (
    <FormControl component="fieldset" error={error} fullWidth>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup
        value={value}
        onChange={(e) => onChange(e.target.value)}
        row={row}
        {...props}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<MuiRadio />}
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default Radio

