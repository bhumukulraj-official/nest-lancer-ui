/**
 * System Config Page
 * Admin page for system configuration
 */

import React from 'react'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { SystemConfigForm } from '@/components/features/admin/system'

const SystemConfigPage: React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    try {
      console.log('Update system config:', data)
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error updating system config:', error)
    }
  }

  const handleCancel = () => {
    navigate('/admin/dashboard')
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <SystemConfigForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Container>
    </AdminLayout>
  )
}

export default SystemConfigPage

