import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { UserLayout } from '@/components/layout'
import { QuoteDetail } from '@/components/features/quotes'

export const QuoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const mockQuote = { id: id || '1', title: 'Sample Quote', description: '', status: 'pending', totalAmount: 0 }

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <QuoteDetail quote={mockQuote as any} />
      </Container>
    </UserLayout>
  )
}

export default QuoteDetailPage

