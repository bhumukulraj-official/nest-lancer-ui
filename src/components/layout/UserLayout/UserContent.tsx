/**
 * User Content
 */

import { FC, ReactNode } from 'react'
import { Container } from '@mui/material'

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

