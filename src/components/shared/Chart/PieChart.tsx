/**
 * Pie Chart Component
 * Pie and donut charts for payment methods and project categories
 * Includes percentage labels, donut support, and click interactions
 */

import React, { FC } from 'react'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChartProps as RechartsPieChartProps,
  LegendProps,
  LabelList,
  Sector,
} from 'recharts'

export interface PieChartData {
  name: string
  value: number
  color?: string
}

interface PieChartProps {
  // Data
  data: PieChartData[]
  
  // Display
  dataKey?: string
  nameKey?: string
  showTooltip?: boolean
  showLegend?: boolean
  showLabel?: boolean
  label?: boolean | string | ((entry: any) => any)
  
  // Styling
  innerRadius?: number | string
  outerRadius?: number | string
  height?: number | string
  width?: string
  
  // Behavior
  isAnimationActive?: boolean
  startAngle?: number
  endAngle?: number
  paddingAngle?: number
  minAngle?: number
  
  // Legend
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  
  // Callbacks
  onClick?: (data: any, index: number) => void
  onMouseEnter?: (data: any, index: number) => void
  onMouseLeave?: (data: any, index: number) => void
  
  // Custom colors
  colors?: string[]
  
  // Additional props
  [key: string]: any
}

export const PieChart: FC<PieChartProps> = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  showTooltip = true,
  showLegend = true,
  showLabel = true,
  label,
  innerRadius = 0,
  outerRadius = 80,
  height = 400,
  width = '100%',
  isAnimationActive = true,
  startAngle = 0,
  endAngle = 360,
  paddingAngle = 0,
  minAngle = 0,
  legendPosition = 'bottom',
  onClick,
  onMouseEnter,
  onMouseLeave,
  colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'],
  ...props
}) => {
  // Default label function
  const renderLabel = (entry: any) => {
    if (label === false) return null
    if (typeof label === 'string') return label
    if (typeof label === 'function') return label(entry)
    if (showLabel && label === true) {
      return `${entry[nameKey]}: ${((entry[dataKey] / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%`
    }
    return entry[nameKey]
  }
  
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsPieChart {...props}>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          label={renderLabel}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="#8884d8"
          startAngle={startAngle}
          endAngle={endAngle}
          paddingAngle={paddingAngle}
          minAngle={minAngle}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          isAnimationActive={isAnimationActive}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
          ))}
        </Pie>
        
        {showTooltip && <Tooltip />}
        
        {showLegend && (
          <Legend
            verticalAlign={legendPosition}
            height={legendPosition === 'top' || legendPosition === 'bottom' ? 36 : undefined}
          />
        )}
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

export default PieChart

