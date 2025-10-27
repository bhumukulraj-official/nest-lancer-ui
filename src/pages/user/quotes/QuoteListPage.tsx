import React from 'react'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { QuoteList } from '@/components/features/quotes'

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

