/**
 * Environment Config Component
 * Environment variable configuration and management
 * UI-only component - manages environment settings
 */

import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  Save,
  Lock,
  Warning as WarningIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@/components/shared/Button'

// Environment variable interface
interface EnvironmentVariable {
  id: string
  key: string
  value: string
  type: 'string' | 'number' | 'boolean' | 'secret'
  required: boolean
  description?: string
  sensitive: boolean
}

// Environment interface
interface Environment {
  id: string
  name: string
  active: boolean
  variables: EnvironmentVariable[]
}

const EnvironmentConfig: React.FC = () => {
  const [environments, setEnvironments] = useState<Environment[]>([])
  const [selectedEnv, setSelectedEnv] = useState<string>('')
  const [editingVariable, setEditingVariable] = useState<EnvironmentVariable | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Mock data - in real app, this would come from API
  React.useEffect(() => {
    const mockEnvironments: Environment[] = [
      {
        id: '1',
        name: 'Development',
        active: true,
        variables: [
          {
            id: '1',
            key: 'DATABASE_URL',
            value: 'postgresql://localhost:5432/nestlancer_dev',
            type: 'string',
            required: true,
            description: 'Database connection URL',
            sensitive: true,
          },
          {
            id: '2',
            key: 'JWT_SECRET',
            value: 'dev-secret-key',
            type: 'secret',
            required: true,
            description: 'JWT secret key',
            sensitive: true,
          },
          {
            id: '3',
            key: 'API_PORT',
            value: '3000',
            type: 'number',
            required: true,
            description: 'API server port',
            sensitive: false,
          },
          {
            id: '4',
            key: 'DEBUG_MODE',
            value: 'true',
            type: 'boolean',
            required: false,
            description: 'Enable debug mode',
            sensitive: false,
          },
        ],
      },
      {
        id: '2',
        name: 'Production',
        active: true,
        variables: [
          {
            id: '5',
            key: 'DATABASE_URL',
            value: 'postgresql://prod-db:5432/nestlancer',
            type: 'string',
            required: true,
            description: 'Database connection URL',
            sensitive: true,
          },
          {
            id: '6',
            key: 'JWT_SECRET',
            value: '***HIDDEN***',
            type: 'secret',
            required: true,
            description: 'JWT secret key',
            sensitive: true,
          },
        ],
      },
    ]
    
    setEnvironments(mockEnvironments)
    if (mockEnvironments.length > 0) {
      setSelectedEnv(mockEnvironments[0].id)
    }
  }, [])
  
  const currentEnvironment = environments.find(env => env.id === selectedEnv)
  
  const handleAddVariable = () => {
    setEditingVariable({
      id: '',
      key: '',
      value: '',
      type: 'string',
      required: false,
      sensitive: false,
    })
    setShowAddDialog(true)
  }
  
  const handleEditVariable = (variable: EnvironmentVariable) => {
    setEditingVariable(variable)
    setShowAddDialog(true)
  }
  
  const handleDeleteVariable = (id: string) => {
    console.log('Delete variable:', id)
    // In real app, this would call API
  }
  
  const handleSaveVariable = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Save variable:', editingVariable)
    setIsSaving(false)
    setShowAddDialog(false)
    setEditingVariable(null)
  }
  
  const handleToggleEnvironment = (envId: string) => {
    setEnvironments(prev => prev.map(env => ({
      ...env,
      active: env.id === envId ? !env.active : env.active,
    })))
  }
  
  const getValueDisplay = (variable: EnvironmentVariable) => {
    if (variable.sensitive) {
      return '***HIDDEN***'
    }
    return variable.value
  }
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6" component="h2">
            Environment Configuration
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddVariable}
          >
            Add Variable
          </Button>
        </Stack>
        
        <Alert severity="info" icon={<WarningIcon />} sx={{ mb: 3 }}>
          Environment variables manage configuration for different deployment environments.
          Changes require server restart to take effect.
        </Alert>
        
        {/* Environment Selector */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Environment</InputLabel>
          <Select
            value={selectedEnv}
            label="Select Environment"
            onChange={(e) => setSelectedEnv(e.target.value)}
          >
            {environments.map(env => (
              <MenuItem key={env.id} value={env.id}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography>{env.name}</Typography>
                  <Chip
                    label={env.active ? 'Active' : 'Inactive'}
                    size="small"
                    color={env.active ? 'success' : 'default'}
                  />
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {/* Environment Switch */}
        {currentEnvironment && (
          <FormControlLabel
            control={
              <Switch
                checked={currentEnvironment.active}
                onChange={() => handleToggleEnvironment(currentEnvironment.id)}
              />
            }
            label={`Environment "${currentEnvironment.name}" is ${currentEnvironment.active ? 'Active' : 'Inactive'}`}
          />
        )}
      </Paper>
      
      {/* Variables List */}
      {currentEnvironment && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Variables ({currentEnvironment.variables.length})
          </Typography>
          
          <List>
            {currentEnvironment.variables.map((variable, index) => (
              <React.Fragment key={variable.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="subtitle2">{variable.key}</Typography>
                        {variable.required && (
                          <Chip label="Required" size="small" color="error" />
                        )}
                        {variable.sensitive && (
                          <Chip icon={<Lock />} label="Sensitive" size="small" color="warning" />
                        )}
                      </Stack>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {getValueDisplay(variable)}
                        </Typography>
                        {variable.description && (
                          <Typography variant="caption" color="text.secondary">
                            {variable.description}
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                          Type: {variable.type}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleEditVariable(variable)} size="small">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteVariable(variable.id)} size="small" color="error">
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < currentEnvironment.variables.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
      
      {/* Add/Edit Variable Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingVariable?.id ? 'Edit Variable' : 'Add New Variable'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Key"
                fullWidth
                value={editingVariable?.key || ''}
                onChange={(e) => setEditingVariable(prev => prev ? { ...prev, key: e.target.value } : null)}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Value"
                fullWidth
                type={editingVariable?.sensitive ? 'password' : 'text'}
                value={editingVariable?.value || ''}
                onChange={(e) => setEditingVariable(prev => prev ? { ...prev, value: e.target.value } : null)}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={editingVariable?.type || 'string'}
                  label="Type"
                  onChange={(e) => setEditingVariable(prev => prev ? { ...prev, type: e.target.value as any } : null)}
                >
                  <MenuItem value="string">String</MenuItem>
                  <MenuItem value="number">Number</MenuItem>
                  <MenuItem value="boolean">Boolean</MenuItem>
                  <MenuItem value="secret">Secret</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={editingVariable?.description || ''}
                onChange={(e) => setEditingVariable(prev => prev ? { ...prev, description: e.target.value } : null)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editingVariable?.required || false}
                      onChange={(e) => setEditingVariable(prev => prev ? { ...prev, required: e.target.checked } : null)}
                    />
                  }
                  label="Required"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={editingVariable?.sensitive || false}
                      onChange={(e) => setEditingVariable(prev => prev ? { ...prev, sensitive: e.target.checked } : null)}
                    />
                  }
                  label="Sensitive"
                />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveVariable}
            loading={isSaving}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default EnvironmentConfig

