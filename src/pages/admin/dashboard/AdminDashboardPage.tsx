/**
 * Admin Dashboard Page
 * Main admin dashboard with overview, metrics, and real-time stats
 */

import { Container, Tabs, Tab, Box } from '@mui/material'
import React from 'react'

import {
  AdminOverview,
  SystemMetrics,
  RealTimeStats,
  HealthMonitor,
} from '@/components/features/admin/dashboard'
import { AdminLayout } from '@/components/layout/AdminLayout'

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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

const AdminDashboardPage: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="admin dashboard tabs"
          sx={{ mb: 3 }}
        >
          <Tab label="Overview" />
          <Tab label="System Metrics" />
          <Tab label="Real-Time Stats" />
          <Tab label="Health Monitor" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <AdminOverview />
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <SystemMetrics />
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <RealTimeStats />
        </TabPanel>

        <TabPanel value={currentTab} index={3}>
          <HealthMonitor />
        </TabPanel>
      </Container>
    </AdminLayout>
  )
}

export default AdminDashboardPage

