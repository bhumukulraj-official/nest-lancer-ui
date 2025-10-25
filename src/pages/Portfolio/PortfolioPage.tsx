/**
 * PortfolioPage Component
 * Main page for portfolio management and display
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Fab,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Stack
} from '@mui/material'
import {
  Edit,
  Settings,
  Visibility,
  Share
} from '@mui/icons-material'
import { PortfolioView } from '../../components/features/portfolio'
import { PortfolioApiService } from '../../services/portfolio'
import { useToast } from '../../hooks/ui/useToast'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

const PortfolioPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { showToast } = useToast()

  // State management
  const [activeTab, setActiveTab] = useState(0)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleEdit = () => {
    setEditDialogOpen(true)
  }

  const handleSettings = () => {
    setSettingsDialogOpen(true)
  }

  const handlePublish = async () => {
    try {
      setLoading(true)
      await PortfolioApiService.publishPortfolio()
      showToast('Portfolio published successfully!', 'success')
    } catch (err) {
      showToast('Failed to publish portfolio', 'error')
      console.error('Error publishing portfolio:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUnpublish = async () => {
    try {
      setLoading(true)
      await PortfolioApiService.unpublishPortfolio()
      showToast('Portfolio unpublished successfully!', 'success')
    } catch (err) {
      showToast('Failed to unpublish portfolio', 'error')
      console.error('Error unpublishing portfolio:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Portfolio',
        text: 'Check out my portfolio',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast('Portfolio link copied to clipboard!', 'success')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Page Header */}
      <Box sx={{ p: { xs: 2, md: 3 }, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Portfolio
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Showcase your work, skills, and achievements
        </Typography>
      </Box>

      {/* Portfolio Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="portfolio management tabs">
          <Tab label="View Portfolio" icon={<Visibility />} iconPosition="start" />
          <Tab label="Edit Portfolio" icon={<Edit />} iconPosition="start" />
          <Tab label="Settings" icon={<Settings />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* View Portfolio Tab */}
      <TabPanel value={activeTab} index={0}>
        <PortfolioView
          isOwn={true}
          onEdit={handleEdit}
          onSettings={handleSettings}
          showActions={true}
        />
      </TabPanel>

      {/* Edit Portfolio Tab */}
      <TabPanel value={activeTab} index={1}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Portfolio Editor
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Edit your portfolio content, add projects, skills, and more
          </Typography>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={handleEdit}
            sx={{ mt: 2 }}
          >
            Open Editor
          </Button>
        </Box>
      </TabPanel>

      {/* Settings Tab */}
      <TabPanel value={activeTab} index={2}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Portfolio Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure your portfolio appearance, privacy, and sharing options
          </Typography>
          <Button
            variant="contained"
            startIcon={<Settings />}
            onClick={handleSettings}
            sx={{ mt: 2 }}
          >
            Open Settings
          </Button>
        </Box>
      </TabPanel>

      {/* Floating Action Buttons */}
      {isMobile && (
        <>
          <Fab
            color="primary"
            aria-label="edit portfolio"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000
            }}
            onClick={handleEdit}
          >
            <Edit />
          </Fab>
          <Fab
            color="secondary"
            aria-label="share portfolio"
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 16,
              zIndex: 1000
            }}
            onClick={handleShare}
          >
            <Share />
          </Fab>
        </>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Edit Portfolio</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Portfolio Editor Coming Soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Advanced portfolio editing features will be available soon
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog
        open={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Portfolio Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Actions
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="contained"
                startIcon={<Visibility />}
                onClick={handlePublish}
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={20} /> : 'Publish Portfolio'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Visibility />}
                onClick={handleUnpublish}
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={20} /> : 'Unpublish Portfolio'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Share />}
                onClick={handleShare}
                fullWidth
              >
                Share Portfolio
              </Button>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PortfolioPage
