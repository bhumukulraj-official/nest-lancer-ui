/**
 * System Config Form Component
 * Form for managing system configuration settings
 */

import React, { useState } from 'react'
import { Box, Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material'
import { LoadingButton } from '@/components/shared/Button/LoadingButton'
import { Input } from '@/components/shared/FormControls/Input'

interface SystemConfigFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

const SystemConfigForm: React.FC<SystemConfigFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    siteName: '',
    siteUrl: '',
    maintenanceMode: false,
    registrationEnabled: true,
    notificationsEnabled: true,
    maxUploadSize: '10',
    emailService: 'smtp',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error updating system config:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        System Configuration
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Input
              label="Site Name"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Site URL"
              type="url"
              value={formData.siteUrl}
              onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Max Upload Size (MB)"
              type="number"
              value={formData.maxUploadSize}
              onChange={(e) => setFormData({ ...formData, maxUploadSize: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Email Service</InputLabel>
              <Select
                value={formData.emailService}
                label="Email Service"
                onChange={(e) => setFormData({ ...formData, emailService: e.target.value })}
              >
                <MenuItem value="smtp">SMTP</MenuItem>
                <MenuItem value="sendgrid">SendGrid</MenuItem>
                <MenuItem value="ses">AWS SES</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              System Settings
            </Typography>
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.maintenanceMode}
                    onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                  />
                }
                label="Maintenance Mode"
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.registrationEnabled}
                    onChange={(e) => setFormData({ ...formData, registrationEnabled: e.target.checked })}
                  />
                }
                label="Registration Enabled"
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notificationsEnabled}
                    onChange={(e) => setFormData({ ...formData, notificationsEnabled: e.target.checked })}
                  />
                }
                label="Notifications Enabled"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <LoadingButton variant="outlined" onClick={onCancel} disabled={loading}>
                Cancel
              </LoadingButton>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Save Configuration
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default SystemConfigForm

