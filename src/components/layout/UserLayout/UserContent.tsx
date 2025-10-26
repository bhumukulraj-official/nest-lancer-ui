/**
 * User Content
 */

import React, { FC, ReactNode } from 'react'
import { Container, Box } from '@mui/material'

interface UserContentProps {
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}

export const UserContent: FC<UserContentProps> = ({
  children,
  maxWidth = 'lg',
}) => {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 3 }}>
      {children}
    </Container>
  )
}

export default UserContent

