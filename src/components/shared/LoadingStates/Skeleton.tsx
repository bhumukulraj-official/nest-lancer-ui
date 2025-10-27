/**
 * Skeleton Component
 * Skeleton loading components for different content types
 * Uses MUI Skeleton with proper spacing and animation effects
 */

import {
  Box,
  Skeleton as MuiSkeleton,
  Card,
  CardContent,
  Grid,
} from '@mui/material'
import { FC } from 'react'

interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular'
  width?: number | string
  height?: number | string
  animation?: 'pulse' | 'wave' | false
  lines?: number
  className?: string
}

interface SkeletonPresetProps {
  count?: number
  animation?: 'pulse' | 'wave' | false
}

// Basic Skeleton Component
const Skeleton: FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  lines = 1,
  className,
}) => {
  if (lines > 1 && variant === 'text') {
    return (
      <Box className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <MuiSkeleton
            key={index}
            variant={variant}
            width={index === lines - 1 ? '60%' : width}
            height={height}
            animation={animation}
            sx={{ mb: 0.5 }}
          />
        ))}
      </Box>
    )
  }

  return (
    <MuiSkeleton
      className={className}
      variant={variant}
      width={width}
      height={height}
      animation={animation}
    />
  )
}

// Project Card Skeleton
export const ProjectCardSkeleton: FC<SkeletonPresetProps> = ({ 
  count = 1, 
  animation = 'pulse' 
}) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <Card key={index} sx={{ mb: 2 }}>
        <MuiSkeleton
          variant="rectangular"
          height={200}
          animation={animation}
        />
        <CardContent>
          <MuiSkeleton
            variant="text"
            height={32}
            width="80%"
            animation={animation}
          />
          <MuiSkeleton
            variant="text"
            height={20}
            width="100%"
            animation={animation}
            sx={{ mb: 1 }}
          />
          <MuiSkeleton
            variant="text"
            height={20}
            width="60%"
            animation={animation}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MuiSkeleton
              variant="circular"
              width={24}
              height={24}
              animation={animation}
            />
            <MuiSkeleton
              variant="text"
              width={80}
              height={20}
              animation={animation}
            />
          </Box>
        </CardContent>
      </Card>
    ))}
  </>
)

// User Profile Skeleton
export const UserProfileSkeleton: FC<SkeletonPresetProps> = ({ 
  animation = 'pulse' 
}) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MuiSkeleton
          variant="circular"
          width={80}
          height={80}
          animation={animation}
          sx={{ mr: 2 }}
        />
        <Box sx={{ flex: 1 }}>
          <MuiSkeleton
            variant="text"
            height={32}
            width="60%"
            animation={animation}
          />
          <MuiSkeleton
            variant="text"
            height={20}
            width="40%"
            animation={animation}
          />
        </Box>
      </Box>
      
      <MuiSkeleton
        variant="text"
        height={20}
        width="100%"
        animation={animation}
        sx={{ mb: 1 }}
      />
      <MuiSkeleton
        variant="text"
        height={20}
        width="80%"
        animation={animation}
        sx={{ mb: 1 }}
      />
      <MuiSkeleton
        variant="text"
        height={20}
        width="90%"
        animation={animation}
      />
    </CardContent>
  </Card>
)

// Data Table Skeleton
export const DataTableSkeleton: FC<SkeletonPresetProps & { 
  rows?: number 
  columns?: number 
}> = ({ 
  rows = 5, 
  columns = 4, 
  animation = 'pulse' 
}) => (
  <Box>
    {/* Table Header */}
    <Box sx={{ display: 'flex', gap: 2, mb: 2, p: 2 }}>
      {Array.from({ length: columns }).map((_, index) => (
        <MuiSkeleton
          key={`header-${index}`}
          variant="text"
          height={24}
          width={`${100 / columns}%`}
          animation={animation}
        />
      ))}
    </Box>
    
    {/* Table Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Box key={`row-${rowIndex}`} sx={{ display: 'flex', gap: 2, mb: 1, p: 2 }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <MuiSkeleton
            key={`cell-${rowIndex}-${colIndex}`}
            variant="text"
            height={20}
            width={`${100 / columns}%`}
            animation={animation}
          />
        ))}
      </Box>
    ))}
  </Box>
)

// Dashboard Stats Skeleton
export const DashboardStatsSkeleton: FC<SkeletonPresetProps> = ({ 
  animation = 'pulse' 
}) => (
  <Grid container spacing={3}>
    {Array.from({ length: 4 }).map((_, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MuiSkeleton
                variant="circular"
                width={48}
                height={48}
                animation={animation}
                sx={{ mr: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <MuiSkeleton
                  variant="text"
                  height={24}
                  width="60%"
                  animation={animation}
                />
                <MuiSkeleton
                  variant="text"
                  height={20}
                  width="40%"
                  animation={animation}
                />
              </Box>
            </Box>
            
            <MuiSkeleton
              variant="text"
              height={36}
              width="80%"
              animation={animation}
            />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)

// List Item Skeleton
export const ListItemSkeleton: FC<SkeletonPresetProps & { 
  showAvatar?: boolean 
  showSecondary?: boolean 
}> = ({ 
  count = 5, 
  showAvatar = true, 
  showSecondary = true,
  animation = 'pulse' 
}) => (
  <Box>
    {Array.from({ length: count }).map((_, index) => (
      <Box 
        key={index} 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          py: 2, 
          px: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {showAvatar && (
          <MuiSkeleton
            variant="circular"
            width={40}
            height={40}
            animation={animation}
            sx={{ mr: 2 }}
          />
        )}
        
        <Box sx={{ flex: 1 }}>
          <MuiSkeleton
            variant="text"
            height={24}
            width="70%"
            animation={animation}
          />
          {showSecondary && (
            <MuiSkeleton
              variant="text"
              height={20}
              width="50%"
              animation={animation}
            />
          )}
        </Box>
        
        <MuiSkeleton
          variant="rectangular"
          width={24}
          height={24}
          animation={animation}
        />
      </Box>
    ))}
  </Box>
)

// Chart Skeleton
export const ChartSkeleton: FC<SkeletonPresetProps & { 
  height?: number 
}> = ({ 
  height = 300, 
  animation = 'pulse' 
}) => (
  <Card>
    <CardContent>
      <MuiSkeleton
        variant="text"
        height={32}
        width="40%"
        animation={animation}
        sx={{ mb: 3 }}
      />
      
      <MuiSkeleton
        variant="rectangular"
        height={height}
        width="100%"
        animation={animation}
      />
    </CardContent>
  </Card>
)

// Form Skeleton
export const FormSkeleton: FC<SkeletonPresetProps & { 
  fields?: number 
}> = ({ 
  fields = 4, 
  animation = 'pulse' 
}) => (
  <Card>
    <CardContent>
      <MuiSkeleton
        variant="text"
        height={32}
        width="60%"
        animation={animation}
        sx={{ mb: 3 }}
      />
      
      {Array.from({ length: fields }).map((_, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <MuiSkeleton
            variant="text"
            height={20}
            width="30%"
            animation={animation}
            sx={{ mb: 1 }}
          />
          <MuiSkeleton
            variant="rectangular"
            height={56}
            width="100%"
            animation={animation}
          />
        </Box>
      ))}
      
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <MuiSkeleton
          variant="rectangular"
          height={40}
          width={120}
          animation={animation}
        />
        <MuiSkeleton
          variant="rectangular"
          height={40}
          width={100}
          animation={animation}
        />
      </Box>
    </CardContent>
  </Card>
)

export default Skeleton
