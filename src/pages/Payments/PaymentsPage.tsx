/**
 * PaymentsPage Component
 * Main page for managing payments and transactions
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Stack,
  Fab,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Payment,
  History,
  Receipt,
  Add,
  TrendingUp,
  AttachMoney,
  CheckCircle,
} from '@mui/icons-material'
import { PaymentHistory, RazorpayCheckout } from '../../components/features/payments'
import { PaymentApiService } from '../../services/payment'
import { Payment as PaymentType, PaymentFilters, PaymentStats } from '../../types/models/payment.types'
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
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

const PaymentsPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { showToast } = useToast()

  // State management
  const [activeTab, setActiveTab] = useState(0)
  const [payments, setPayments] = useState<PaymentType[]>([])
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PaymentFilters>({})

  // Load data on component mount
  useEffect(() => {
    loadPayments()
    loadStats()
  }, [filters])

  const loadPayments = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await PaymentApiService.getPaymentHistory(filters)
      setPayments(result.data)
    } catch (err) {
      setError('Failed to load payments. Please try again.')
      console.error('Error loading payments:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const statsData = await PaymentApiService.getPaymentStats()
      setStats(statsData)
    } catch (err) {
      console.error('Error loading payment stats:', err)
    }
  }

  const handlePaymentSuccess = () => {
    showToast('Payment completed successfully!', 'success')
    loadPayments()
    loadStats()
  }

  const handlePaymentError = (error: any) => {
    showToast('Payment failed. Please try again.', 'error')
    console.error('Payment error:', error)
  }

  const handleDownloadReceipt = async (payment: PaymentType) => {
    try {
      const blob = await PaymentApiService.downloadReceipt(payment.id)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `receipt_${payment.orderId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      showToast('Receipt downloaded successfully!', 'success')
    } catch (err) {
      showToast('Failed to download receipt. Please try again.', 'error')
      console.error('Error downloading receipt:', err)
    }
  }

  const handleRefresh = () => {
    loadPayments()
    loadStats()
  }

  const handleFiltersChange = (newFilters: PaymentFilters) => {
    setFilters(newFilters)
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount / 100)
  }

  const StatCard: React.FC<{
    title: string
    value: string
    icon: React.ReactNode
    color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  }> = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              backgroundColor: `${color}.light`,
              color: `${color}.contrastText`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h6" component="div">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Payments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage payments, view transaction history, and process new payments
        </Typography>
      </Box>

      {/* Payment Statistics */}
      {stats && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Revenue"
              value={formatCurrency(stats.totalAmount, stats.currency)}
              icon={<AttachMoney />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Payments"
              value={stats.totalPayments.toString()}
              icon={<Payment />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Success Rate"
              value={`${Math.round((stats.successfulPayments / stats.totalPayments) * 100)}%`}
              icon={<CheckCircle />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Avg. Amount"
              value={formatCurrency(stats.averagePaymentAmount, stats.currency)}
              icon={<TrendingUp />}
              color="warning"
            />
          </Grid>
        </Grid>
      )}

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="payment tabs">
          <Tab label="Payment History" icon={<History />} iconPosition="start" />
          <Tab label="New Payment" icon={<Payment />} iconPosition="start" />
          <Tab label="Receipts" icon={<Receipt />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Payment History Tab */}
      <TabPanel value={activeTab} index={0}>
        <PaymentHistory
          payments={payments}
          loading={loading}
          error={error}
          onRefresh={handleRefresh}
          onViewPayment={(payment) => {
            console.log('View payment:', payment.id)
            showToast('Payment details coming soon!', 'info')
          }}
          onDownloadReceipt={handleDownloadReceipt}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          showActions={true}
          variant={isMobile ? 'cards' : 'table'}
        />
      </TabPanel>

      {/* New Payment Tab */}
      <TabPanel value={activeTab} index={1}>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <RazorpayCheckout
            paymentData={{
              amount: 10000, // Example amount in cents/paise
              currency: 'INR',
              description: 'Sample payment for project',
              clientId: 'client_123',
              clientName: 'John Doe',
              clientEmail: 'john@example.com',
              projectId: 'project_123',
              projectTitle: 'Sample Project'
            }}
            onSuccess={() => handlePaymentSuccess()}
            onError={handlePaymentError}
            onCancel={() => showToast('Payment cancelled', 'info')}
          />
        </Box>
      </TabPanel>

      {/* Receipts Tab */}
      <TabPanel value={activeTab} index={2}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Receipt Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Download and manage payment receipts
          </Typography>
        </Box>
      </TabPanel>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="new payment"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000
          }}
          onClick={() => setActiveTab(1)}
        >
          <Add />
        </Fab>
      )}
    </Box>
  )
}

export default PaymentsPage
