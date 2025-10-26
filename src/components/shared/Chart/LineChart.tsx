/**
 * Line Chart Component
 * Line chart using Recharts for project progress and analytics
 * Includes data points, tooltips, legends, and responsive design
 */

import React, { FC } from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChartProps as RechartsLineChartProps,
} from 'recharts'

export interface LineChartData {
  name: string
  [key: string]: string | number
}

interface LineChartProps {
  // Data
  data: LineChartData[]
  
  // Lines configuration
  lines: Array<{
    dataKey: string
    color?: string
    name?: string
    strokeWidth?: number
    strokeDasharray?: string
  }>
  
  // Display
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  
  // Axes
  xAxisKey?: string
  xAxisLabel?: string
  yAxisLabel?: string
  
  // Styling
  height?: number | string
  width?: string
  
  // Behavior
  dot?: boolean
  connectNulls?: boolean
  isAnimationActive?: boolean
  
  // Callbacks
  onClick?: (data: any, index: number) => void
  
  // Additional props
  [key: string]: any
}

export const LineChart: FC<LineChartProps> = ({
  data,
  lines,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisKey = 'name',
  xAxisLabel,
  yAxisLabel,
  height = 400,
  width = '100%',
  dot = true,
  connectNulls = true,
  isAnimationActive = true,
  onClick,
  ...props
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        {...props}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        
        <XAxis
          dataKey={xAxisKey}
          label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined}
        />
        
        <YAxis
          label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
        />
        
        {showTooltip && <Tooltip />}
        
        {showLegend && <Legend />}
        
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name || line.dataKey}
            stroke={line.color}
            strokeWidth={line.strokeWidth || 2}
            strokeDasharray={line.strokeDasharray}
            dot={dot}
            connectNulls={connectNulls}
            isAnimationActive={isAnimationActive}
            onClick={onClick}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export default LineChart

