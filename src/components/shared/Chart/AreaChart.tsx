/**
 * Area Chart Component
 * Area chart for revenue and user growth analytics
 * Includes gradient fills, multiple data series, and time-based filtering
 */

import { FC, MouseEventHandler } from 'react'
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export interface AreaChartData {
  name: string
  [key: string]: string | number
}

interface AreaChartProps {
  // Data
  data: AreaChartData[]
  
  // Areas configuration
  areas: Array<{
    dataKey: string
    color?: string
    name?: string
    stroke?: string
    strokeWidth?: number
    fill?: string
    stackId?: string
    type?: 'monotone' | 'basis' | 'linear'
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
  isAnimationActive?: boolean
  connectNulls?: boolean
  dot?: boolean
  
  // Callbacks
  onClick?: MouseEventHandler
  
  // Additional props
  [key: string]: any
}

export const AreaChart: FC<AreaChartProps> = ({
  data,
  areas,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisKey = 'name',
  xAxisLabel,
  yAxisLabel,
  height = 400,
  width = '100%',
  isAnimationActive = true,
  connectNulls = true,
  dot = false,
  onClick,
  ...props
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsAreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
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
        
        {areas.map((area, index) => (
          <Area
            key={index}
            type={area.type || 'monotone'}
            dataKey={area.dataKey}
            name={area.name || area.dataKey}
            stroke={area.stroke || area.color}
            strokeWidth={area.strokeWidth || 2}
            fill={area.fill || area.color}
            stackId={area.stackId}
            dot={dot}
            connectNulls={connectNulls}
            isAnimationActive={isAnimationActive}
            onClick={onClick}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChart

