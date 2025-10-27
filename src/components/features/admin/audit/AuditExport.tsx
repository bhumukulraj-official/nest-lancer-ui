/**
 * Audit Export Component
 */

import { Download } from '@mui/icons-material'
import { Box, Paper, Typography, Button, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React, { useState } from 'react'

const AuditExport: React.FC = () => {
  const [exportFormat, setExportFormat] = useState('csv')

  const handleExport = () => {
    console.log('Export in format:', exportFormat)
  }

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Export Audit Logs
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Select Format
          </Typography>
          <RadioGroup
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
          >
            <FormControlLabel value="csv" control={<Radio />} label="CSV" />
            <FormControlLabel value="xlsx" control={<Radio />} label="Excel (XLSX)" />
            <FormControlLabel value="json" control={<Radio />} label="JSON" />
          </RadioGroup>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="contained" startIcon={<Download />} onClick={handleExport}>
            Export
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default AuditExport

