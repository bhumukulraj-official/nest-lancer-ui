/**
 * Contact Information Component
 * Displays company contact information with Material-UI cards
 * Includes office location, contact details, and social media links
 */

import { FC } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  IconButton,
  Link,
  Divider,
} from '@mui/material'
import {
  Email,
  Phone,
  LocationOn,
  Schedule,
  LinkedIn,
  Twitter,
  GitHub,
  Language,
} from '@mui/icons-material'

export interface ContactInfoProps {
  variant?: 'grid' | 'cards' | 'compact'
  showSocialMedia?: boolean
}

interface ContactItem {
  icon: React.ReactNode
  label: string
  value: string
  link?: string
  linkType?: 'email' | 'phone' | 'external'
}

export const ContactInfo: FC<ContactInfoProps> = ({
  variant = 'grid',
  showSocialMedia = true,
}) => {
  // Contact information
  const contactDetails: ContactItem[] = [
    {
      icon: <Email color="primary" />,
      label: 'Email',
      value: 'hello@nestlancer.com',
      link: 'mailto:hello@nestlancer.com',
      linkType: 'email',
    },
    {
      icon: <Phone color="primary" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      linkType: 'phone',
    },
    {
      icon: <LocationOn color="primary" />,
      label: 'Office',
      value: '123 Business Street, Suite 100, City, State 12345',
      link: 'https://maps.google.com',
      linkType: 'external',
    },
    {
      icon: <Schedule color="primary" />,
      label: 'Business Hours',
      value: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
    },
  ]

  // Social media links
  const socialMedia = [
    {
      icon: <LinkedIn />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/company/nestlancer',
    },
    {
      icon: <Twitter />,
      label: 'Twitter',
      url: 'https://twitter.com/nestlancer',
    },
    {
      icon: <GitHub />,
      label: 'GitHub',
      url: 'https://github.com/nestlancer',
    },
    {
      icon: <Language />,
      label: 'Website',
      url: 'https://nestlancer.com',
    },
  ]

  // Render contact item
  const renderContactItem = (item: ContactItem) => {
    const content = (
      <Stack spacing={1} sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {item.icon}
          <Typography variant="subtitle2" color="text.secondary">
            {item.label}
          </Typography>
        </Box>
        <Typography variant="body1" fontWeight={500}>
          {item.value}
        </Typography>
      </Stack>
    )

    if (item.link) {
      return (
        <Link
          href={item.link}
          target={item.linkType === 'external' ? '_blank' : undefined}
          rel={
            item.linkType === 'external' ? 'noopener noreferrer' : undefined
          }
          underline="none"
          sx={{
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          {content}
        </Link>
      )
    }

    return content
  }

  // Card variant
  if (variant === 'cards') {
    return (
      <Box>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Contact Information
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Get in touch with us. We're here to help!
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {contactDetails.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                variant="outlined"
                sx={{
                  p: 2,
                  height: '100%',
                  '&:hover': {
                    boxShadow: 3,
                  },
                  transition: 'box-shadow 0.3s',
                }}
              >
                {renderContactItem(item)}
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Social Media */}
        {showSocialMedia && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {socialMedia.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    )
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          Contact Us
        </Typography>
        {contactDetails.map((item, index) => (
          <Box key={index}>{renderContactItem(item)}</Box>
        ))}

        {/* Social Media */}
        {showSocialMedia && (
          <>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" spacing={1}>
              {socialMedia.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    )
  }

  // Default grid variant
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Contact Information
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {contactDetails.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              variant="outlined"
              sx={{
                p: 2.5,
                height: '100%',
                '&:hover': {
                  boxShadow: 4,
                },
                transition: 'box-shadow 0.3s',
              }}
            >
              {renderContactItem(item)}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Social Media */}
      {showSocialMedia && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Connect With Us
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {socialMedia.map((social, index) => (
              <Card
                key={index}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{
                  p: 1.5,
                  textAlign: 'center',
                  minWidth: 80,
                  '&:hover': {
                    boxShadow: 4,
                  },
                  transition: 'box-shadow 0.3s',
                }}
              >
                <Stack spacing={0.5}>
                  {social.icon}
                  <Typography variant="caption" fontSize="0.7rem">
                    {social.label}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default ContactInfo

