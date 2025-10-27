/**
 * SettingsForm Component
 * User settings form for notifications, privacy, and account preferences
 */

import {
  Save,
  Notifications,
  Lock,
  Security,
} from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  Alert,
  Grid,
  Stack,
  CircularProgress,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import { useAuth } from '@/hooks/auth/useAuth'
import { UserApiService } from '@/services/user'

interface SettingsFormProps {
  onSave?: (settings: any) => void
  loading?: boolean
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  onSave,
  loading = false,
}) => {
  const { user } = useAuth()
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    messageNotifications: true,
    paymentNotifications: true,

    // Privacy Settings
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,

    // Account Settings
    twoFactorAuth: false,
    loginAlerts: true,
  })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (user?.settings) {
      setSettings(prev => ({
        ...prev,
        ...user.settings,
      }))
    }
  }, [user])

  const handleToggle = (field: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      // Map flat settings to UserPreferences structure
      const preferences = {
        theme: 'light' as const,
        language: 'en',
        currency: 'USD',
        timezone: 'UTC',
        notifications: {
          email: {
            projectUpdates: settings.projectUpdates,
            paymentNotifications: settings.paymentNotifications,
            messageNotifications: settings.messageNotifications,
            systemNotifications: true,
            marketingEmails: false,
          },
          push: {
            projectUpdates: settings.projectUpdates,
            paymentNotifications: settings.paymentNotifications,
            messageNotifications: settings.messageNotifications,
            systemNotifications: true,
          },
          sms: {
            paymentNotifications: false,
            securityAlerts: false,
          },
        },
        privacy: {
          profileVisibility: (settings.profilePublic ? 'public' : 'private') as 'public' | 'private' | 'contacts',
          showEmail: settings.showEmail,
          showPhone: settings.showPhone,
          showLocation: false,
          showLastActive: false,
          allowDirectMessages: settings.allowMessages,
          allowMessages: settings.allowMessages,
          showOnlineStatus: true,
        },
        display: {
          itemsPerPage: 10,
          defaultSort: 'createdAt',
          dateFormat: 'MM/DD/YYYY',
          timeFormat: '12h' as '12h' | '24h',
          compactMode: false,
          showAvatars: true,
          showTimestamps: true,
        },
      }
      await UserApiService.updateUserPreferences(preferences)
      setSuccess(true)
      onSave?.(settings)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to update settings. Please try again.')
      console.error('Settings update error:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Notification Settings */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Notifications color="primary" />
                  <Typography variant="h6">Notifications</Typography>
                </Box>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={() => handleToggle('emailNotifications')}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={() => handleToggle('pushNotifications')}
                    />
                  }
                  label="Push Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.projectUpdates}
                      onChange={() => handleToggle('projectUpdates')}
                    />
                  }
                  label="Project Updates"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.messageNotifications}
                      onChange={() => handleToggle('messageNotifications')}
                    />
                  }
                  label="Message Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.paymentNotifications}
                      onChange={() => handleToggle('paymentNotifications')}
                    />
                  }
                  label="Payment Notifications"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Privacy Settings */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Lock color="primary" />
                  <Typography variant="h6">Privacy</Typography>
                </Box>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.profilePublic}
                      onChange={() => handleToggle('profilePublic')}
                    />
                  }
                  label="Public Profile"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showEmail}
                      onChange={() => handleToggle('showEmail')}
                    />
                  }
                  label="Show Email Address"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showPhone}
                      onChange={() => handleToggle('showPhone')}
                    />
                  }
                  label="Show Phone Number"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.allowMessages}
                      onChange={() => handleToggle('allowMessages')}
                    />
                  }
                  label="Allow Messages from Others"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Account Settings */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security color="primary" />
                  <Typography variant="h6">Security</Typography>
                </Box>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={() => handleToggle('twoFactorAuth')}
                    />
                  }
                  label="Two-Factor Authentication"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.loginAlerts}
                      onChange={() => handleToggle('loginAlerts')}
                    />
                  }
                  label="Login Alerts"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Save />}
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default SettingsForm
