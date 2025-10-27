/**
 * Analytics Charts Component
 * Reusable chart components for analytics visualization
 * UI-only component - displays backend analytics data
 */

import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material'
import { LineChart, BarChart } from '@/components/shared/Chart'

// Chart data interface
export interface ChartDataPoint {
  label: string
  value: number
  date?: string
}

// Chart props interface
export interface AnalyticsChartProps {
  title?: string
  data: ChartDataPoint[]
  type?: 'line' | 'bar'
  color?: string
  height?: number
  showTooltip?: boolean
  dateRange?: string
}

// Individual chart component
export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  data,
  type = 'line',
  color,
  height = 300,
  showTooltip = true,
  dateRange,
}) => {
  const theme = useTheme()
  
  const chartColor = color || theme.palette.primary.main
  
  // Transform data for charts
  const chartData = data.map(point => ({
    name: point.label,
    value: point.value,
    date: point.date,
  }))
  
  return (
    <Card>
      <CardContent>
        {title && (
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            {title}
          </Typography>
        )}
        {type === 'line' && (
          <LineChart
            data={chartData}
            dataKey="value"
            height={height}
            color={chartColor}
            showTooltip={showTooltip}
          />
        )}
        {type === 'bar' && (
          <BarChart
            data={chartData}
            dataKey="value"
            height={height}
            color={chartColor}
            showTooltip={showTooltip}
          />
        )}
      </CardContent>
    </Card>
  )
}

// Chart with date range selector
export interface ChartWithControlsProps extends AnalyticsChartProps {
  onDateRangeChange?: (range: string) => void
  dateRangeOptions?: { value: string; label: string }[]
  isLoading?: boolean
}

export const ChartWithControls: React.FC<ChartWithControlsProps> = ({
  title,
  data,
  type = 'line',
  height = 300,
  onDateRangeChange,
  dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
  ],
  isLoading = false,
  ...chartProps
}) => {
  const [selectedRange, setSelectedRange] = React.useState('30d')
  
  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRange = event.target.value
    setSelectedRange(newRange)
    onDateRangeChange?.(newRange)
  }
  
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        {title && (
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        )}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Date Range</InputLabel>
          <Select
            value={selectedRange}
            label="Date Range"
            onChange={handleRangeChange}
          >
            {dateRangeOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      
      <AnalyticsChart
        {...chartProps}
        title={undefined}
        data={data}
        type={type}
        height={height}
      />
    </Box>
  )
}

// Multi-series chart
export interface MultiSeriesChartProps {
  title?: string
  series: Array<{
    name: string
    data: ChartDataPoint[]
    color?: string
  }>
  height?: number
  dateRange?: string
}

export const MultiSeriesChart: React.FC<MultiSeriesChartProps> = ({
  title,
  series,
  height = 300,
  dateRange,
}) => {
  const theme = useTheme()
  const colors = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main]
  
  return (
    <Card>
      <CardContent>
        {title && (
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            {title}
          </Typography>
        )}
        <Box
          sx={{
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Multi-series chart visualization would go here
            <br />
            Series: {series.length}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AnalyticsChart

