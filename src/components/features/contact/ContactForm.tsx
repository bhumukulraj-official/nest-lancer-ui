/**
 * Contact Form Component
 * A comprehensive contact form with file attachments
 * Includes form validation, submission handling, and Material-UI integration
 */

import { FC, useState, ChangeEvent } from 'react'
import {
  Box,
  TextField,
  Typography,
  Stack,
  Alert,
  Button,
  Grid,
  LinearProgress,
  InputAdornment,
  IconButton,
  Chip,
  Paper,
} from '@mui/material'
import {
  Person,
  Email,
  Phone,
  Business,
  Language,
  AttachFile,
  Send,
  Close,
} from '@mui/icons-material'
import { LoadingButton } from '@/components/shared/Button'
import { ContactApiService } from '@/services/contact/contactApiService'
import type { ContactMessageCreateData } from '@/types/models/contact.types'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  company?: string
  website?: string
}

export interface ContactFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const ContactForm: FC<ContactFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '',
    website: '',
  })

  const [attachments, setAttachments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({})

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (formData.phone && !/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle input changes
  const handleInputChange = (field: keyof ContactFormData) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear field error
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }

    // Clear general errors
    if (submitError) setSubmitError(null)
    if (submitSuccess) setSubmitSuccess(false)
  }

  // Handle file attachments
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newFiles = Array.from(files)
    const totalFiles = attachments.length + newFiles.length

    if (totalFiles > 5) {
      setSubmitError('Maximum 5 files allowed')
      return
    }

    // Check file sizes (max 10MB per file)
    const oversizedFiles = newFiles.filter((file) => file.size > 10 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      setSubmitError('File size must not exceed 10MB')
      return
    }

    setAttachments((prev) => [...prev, ...newFiles])
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const contactData: ContactMessageCreateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        website: formData.website || undefined,
      }

      // Submit contact form
      await ContactApiService.createContactMessage(contactData)

      // Upload attachments if any
      if (attachments.length > 0) {
        // Note: In a real implementation, you would need to upload files
        // after getting the contact message ID from the response above
        console.log('Attachments to upload:', attachments)
      }

      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        company: '',
        website: '',
      })
      setAttachments([])
      setFieldErrors({})

      onSuccess?.()

      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again.'
      setSubmitError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        {/* Success Alert */}
        {submitSuccess && (
          <Alert severity="success">
            Thank you! Your message has been sent successfully. We'll get back to
            you soon.
          </Alert>
        )}

        {/* Error Alert */}
        {submitError && (
          <Alert severity="error" onClose={() => setSubmitError(null)}>
            {submitError}
          </Alert>
        )}

        {/* Name & Email Row */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              error={!!fieldErrors.name}
              helperText={fieldErrors.name}
              disabled={isSubmitting}
              required
              autoComplete="name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              disabled={isSubmitting}
              required
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Phone & Company Row */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={!!fieldErrors.phone}
              helperText={fieldErrors.phone || 'Optional'}
              disabled={isSubmitting}
              autoComplete="tel"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company"
              value={formData.company}
              onChange={handleInputChange('company')}
              disabled={isSubmitting}
              helperText="Optional"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Website */}
        <TextField
          fullWidth
          label="Website"
          value={formData.website}
          onChange={handleInputChange('website')}
          disabled={isSubmitting}
          helperText="Optional"
          placeholder="https://example.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Language color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Subject */}
        <TextField
          fullWidth
          label="Subject"
          value={formData.subject}
          onChange={handleInputChange('subject')}
          error={!!fieldErrors.subject}
          helperText={fieldErrors.subject}
          disabled={isSubmitting}
          required
        />

        {/* Message */}
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Message"
          value={formData.message}
          onChange={handleInputChange('message')}
          error={!!fieldErrors.message}
          helperText={
            fieldErrors.message ||
            `${formData.message.length} characters (minimum 10)`
          }
          disabled={isSubmitting}
          required
          inputProps={{
            maxLength: 2000,
          }}
        />

        {/* File Attachments */}
        <Box>
          <Button
            component="label"
            variant="outlined"
            startIcon={<AttachFile />}
            disabled={isSubmitting || attachments.length >= 5}
            sx={{ mb: 2 }}
          >
            Attach Files (Max 5, 10MB each)
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
          </Button>

          {/* Display attachments */}
          {attachments.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {attachments.map((file, index) => (
                <Chip
                  key={index}
                  label={`${file.name} (${formatFileSize(file.size)})`}
                  onDelete={() => handleRemoveAttachment(index)}
                  deleteIcon={<Close />}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* Submit Button */}
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          loading={isSubmitting}
          disabled={isSubmitting || submitSuccess}
          startIcon={<Send />}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </LoadingButton>
      </Stack>
    </Box>
  )
}

export default ContactForm

