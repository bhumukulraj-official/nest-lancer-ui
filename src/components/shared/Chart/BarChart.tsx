/**
 * Bar Chart Component
 * Bar chart for user statistics and project comparisons
 * Includes horizontal/vertical orientation, data labels, and interactive features
 */

import { FC } from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export interface BarChartData {
  name: string
  [key: string]: string | number
}

interface BarChartProps {
  // Data
  data: BarChartData[]
  
  // Bars configuration
  bars: Array<{
    dataKey: string
    color?: string
    name?: string
    stackId?: string
    radius?: number | [number, number, number, number]
    fill?: string
  }>
  
  // Display
  orientation?: 'horizontal' | 'vertical'
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
  layout?: 'horizontal' | 'vertical'
  
  // Behavior
  isAnimationActive?: boolean
  barGap?: number
  
  // Callbacks
  onClick?: (data: any, index: number) => void
  
  // Additional props
  [key: string]: any
}

export const BarChart: FC<BarChartProps> = ({
  data,
  bars,
  orientation = 'vertical',
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisKey = 'name',
  xAxisLabel,
  yAxisLabel,
  height = 400,
  width = '100%',
  layout = 'vertical',
  isAnimationActive = true,
  barGap = 0,
  onClick,
  ...props
}) => {
  const chartLayout = layout === 'horizontal' ? { layout: 'vertical' as const, margin: { right: 20 } } : {}
  
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        {...chartLayout}
        {...props}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        
        {layout === 'vertical' ? (
          <>
            <XAxis dataKey={xAxisKey} label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined} />
            <YAxis label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined} />
          </>
        ) : (
          <>
            <XAxis type="number" label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined} />
            <YAxis dataKey={xAxisKey} type="category" label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined} />
          </>
        )}
        
        {showTooltip && <Tooltip />}
        
        {showLegend && <Legend />}
        
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            name={bar.name || bar.dataKey}
            stackId={bar.stackId}
            radius={bar.radius}
            fill={bar.fill || bar.color}
            onClick={onClick}
            isAnimationActive={isAnimationActive}
          >
            {bar.color && (
              <Cell fill={bar.color} />
            )}
          </Bar>
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart

