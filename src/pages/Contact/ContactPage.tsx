import React from 'react'
import { Box, Typography, Container, Grid, Paper } from '@mui/material'
import { ContactForm, ContactInfo } from '@/components/features/contact'

const ContactPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Page Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Get In Touch
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="md" sx={{ mx: 'auto' }}>
          Have a question or need help? We'd love to hear from you. Send us a
          message and we'll respond as soon as possible.
        </Typography>
      </Box>

      {/* Contact Content */}
      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Send us a Message
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Fill out the form below and we'll get back to you within 24 hours.
            </Typography>

            <ContactForm
              onSuccess={() => {
                console.log('Contact form submitted successfully')
              }}
              onError={(error) => {
                console.error('Contact form error:', error)
              }}
            />
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={5}>
          <ContactInfo variant="cards" />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ContactPage
