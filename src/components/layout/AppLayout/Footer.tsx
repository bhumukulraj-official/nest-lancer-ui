/**
 * Footer Component
 * Application footer with company information, links, and responsive design
 * Includes social media links, legal pages, and contact information
 */

import { FC } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material'

const Footer: FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    services: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Mobile Apps', href: '/services/mobile-apps' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design' },
      { label: 'Consulting', href: '/services/consulting' },
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'API Reference', href: '/api-docs' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
    ],
  }
  
  const socialLinks = [
    { icon: <GitHub />, href: 'https://github.com/nestlancer', label: 'GitHub' },
    { icon: <LinkedIn />, href: 'https://linkedin.com/company/nestlancer', label: 'LinkedIn' },
    { icon: <Twitter />, href: 'https://twitter.com/nestlancer', label: 'Twitter' },
  ]
  
  const contactInfo = [
    { icon: <Email />, text: 'hello@nestlancer.com', href: 'mailto:hello@nestlancer.com' },
    { icon: <Phone />, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: <LocationOn />, text: 'San Francisco, CA', href: '#' },
  ]

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'grey.100',
        py: { xs: 4, md: 6 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.light',
                mb: 2,
              }}
            >
              NestLancer
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: 'grey.300',
                lineHeight: 1.6,
              }}
            >
              Connect talented freelancers with amazing projects. 
              Building the future of remote work, one project at a time.
            </Typography>
            
            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: 'grey.400',
                    '&:hover': {
                      color: 'primary.light',
                      bgcolor: 'rgba(255,255,255,0.08)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          
          {/* Footer Links */}
          {!isMobile && (
            <>
              {/* Company Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'grey.100',
                  }}
                >
                  Company
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.company.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      variant="body2"
                      sx={{
                        color: 'grey.400',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'grey.100',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>
              
              {/* Services Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'grey.100',
                  }}
                >
                  Services
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.services.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      variant="body2"
                      sx={{
                        color: 'grey.400',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'grey.100',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>
              
              {/* Resources Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'grey.100',
                  }}
                >
                  Resources
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.resources.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      variant="body2"
                      sx={{
                        color: 'grey.400',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'grey.100',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>
              
              {/* Legal Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'grey.100',
                  }}
                >
                  Legal
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.legal.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      variant="body2"
                      sx={{
                        color: 'grey.400',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'grey.100',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>
            </>
          )}
          
          {/* Contact Info (Mobile) */}
          {isMobile && (
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'grey.100',
                }}
              >
                Contact
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {contactInfo.map((contact, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box sx={{ color: 'grey.400' }}>
                      {contact.icon}
                    </Box>
                    <Link
                      href={contact.href}
                      variant="body2"
                      sx={{
                        color: 'grey.400',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'grey.100',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {contact.text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />
        
        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'grey.500' }}
          >
            © {currentYear} NestLancer. All rights reserved.
          </Typography>
          
          <Typography
            variant="body2"
            sx={{ color: 'grey.500' }}
          >
            Made with ❤️ for freelancers worldwide
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
