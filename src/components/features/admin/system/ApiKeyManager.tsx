/**
 * API Key Manager Component
 * Manage API keys for system integrations
 */

import { Add, ContentCopy, Delete, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import React, { useState } from 'react'

import { LoadingButton } from '@/components/shared/Button/LoadingButton'

interface ApiKey {
  id: string
  name: string
  key: string
  status: 'active' | 'inactive'
  createdAt: string
  lastUsed?: string
}

const ApiKeyManager: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [open, setOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())

  const handleGenerateKey = async () => {
    // Generate new API key logic
    console.log('Generate key:', newKeyName)
    setOpen(false)
    setNewKeyName('')
  }

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter(key => key.id !== id))
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  const toggleVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisibleKeys(newVisible)
  }

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="h2">
            API Key Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            Generate New Key
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>{key.name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {visibleKeys.has(key.id) ? key.key : '••••••••••••••••'}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => toggleVisibility(key.id)}
                      >
                        {visibleKeys.has(key.id) ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={key.status}
                      size="small"
                      color={key.status === 'active' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{key.createdAt}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleCopyKey(key.key)}>
                      <ContentCopy fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteKey(key.id)}>
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate New API Key</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Key Name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <LoadingButton variant="contained" onClick={handleGenerateKey}>
            Generate Key
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ApiKeyManager

