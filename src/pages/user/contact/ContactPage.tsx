/**
 * Contact Page
 * User contact page
 */

import { Container, Box, Typography, Grid } from '@mui/material'
import React from 'react'

import { ContactForm, ContactInfo } from '@/components/features/contact'
import { UserLayout } from '@/components/layout'

export const ContactPage: React.FC = () => {
  const handleSubmit = (data: any) => {
    // Handle form submission
    console.log('Contact form submitted:', data)
  }

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Have questions? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <ContactForm onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={12} md={5}>
            <ContactInfo />
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  )
}

export default ContactPage

