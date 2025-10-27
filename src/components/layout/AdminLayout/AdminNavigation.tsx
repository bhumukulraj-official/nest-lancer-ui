/**
 * Admin Navigation Component
 * Breadcrumb and quick actions for admin panel
 */

import { FC, ReactNode } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import { Breadcrumbs } from '@/components/shared/Navigation'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface AdminNavigationProps {
  breadcrumbs?: BreadcrumbItem[]
  title?: string
  actions?: ReactNode
}

export const AdminNavigation: FC<AdminNavigationProps> = ({
  breadcrumbs = [],
  title,
  actions,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}
      
      {title && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            {title}
          </Typography>
          
          {actions && (
            <Stack direction="row" spacing={2}>
              {actions}
            </Stack>
          )}
        </Box>
      )}
    </Box>
  )
}

export default AdminNavigation

