import { Container } from '@mui/material'
import React from 'react'

import { QuoteList } from '@/components/features/quotes'
import { UserLayout } from '@/components/layout'

export const QuoteListPage: React.FC = () => {
  const mockQuotes: any[] = []

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <QuoteList quotes={mockQuotes} />
      </Container>
    </UserLayout>
  )
}

export default QuoteListPage

