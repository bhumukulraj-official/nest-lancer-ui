/**
 * Admin Content
 */

import { Container } from '@mui/material'
import { FC, ReactNode } from 'react'

interface AdminContentProps {
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}

export const AdminContent: FC<AdminContentProps> = ({
  children,
  maxWidth = 'xl',
}) => {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 3 }}>
      {children}
    </Container>
  )
}

export default AdminContent

