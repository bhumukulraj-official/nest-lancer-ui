/**
 * Layout Components Index
 * Central export point for all layout components
 * This file exports all layout wrappers used across the application
 */

// App Layout
export { AppLayout, Header, Footer, Sidebar } from './AppLayout'

// Auth Layout
export { AuthLayout } from './AuthLayout'
export type { AuthLayoutProps } from './AuthLayout/AuthLayout'

// User Layout
export { UserLayout, UserHeader, UserSidebar, UserContent } from './UserLayout'

// Admin Layout
export { 
  AdminLayout, 
  AdminHeader, 
  AdminSidebar, 
  AdminContent, 
  AdminNavigation 
} from './AdminLayout'

/**
 * Re-export for convenience
 */
export { AppLayout as default } from './AppLayout'
