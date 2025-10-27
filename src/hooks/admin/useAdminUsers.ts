/**
 * Admin Users Hook
 * Custom hook for admin user management
 * UI-only hook - no business logic processing
 */

import { useState, useCallback, useEffect } from 'react'
import { UserApiService } from '../../services/user/userApiService'
import type {
  User,
  UserCreateData,
  UserUpdateData,
  UserFilters,
  UserSearchResult
} from '../../types/models/user.types'

export interface UseAdminUsersOptions {
  autoFetch?: boolean
  initialFilters?: UserFilters
}

export interface UseAdminUsersReturn {
  // State
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  filters: UserFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }

  // Actions
  fetchUsers: (filters?: UserFilters) => Promise<void>
  fetchUser: (id: string) => Promise<void>
  createUser: (data: UserCreateData) => Promise<User>
  updateUser: (id: string, data: UserUpdateData) => Promise<User>
  deleteUser: (id: string) => Promise<void>
  softDeleteUser: (id: string) => Promise<User>
  restoreUser: (id: string) => Promise<User>
  updateUserStatus: (id: string, status: string) => Promise<User>
  updateUserRole: (id: string, role: string) => Promise<User>
  bulkUpdateUsers: (updates: Array<{ id: string; data: UserUpdateData }>) => Promise<User[]>
  exportUsers: (filters?: UserFilters) => Promise<Blob>
  setFilters: (filters: UserFilters) => void
  setCurrentUser: (user: User | null) => void
  clearError: () => void
  refresh: () => Promise<void>
}

export function useAdminUsers(options: UseAdminUsersOptions = {}): UseAdminUsersReturn {
  const { autoFetch = true, initialFilters = {} } = options

  // State
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<UserFilters>(initialFilters)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  // Fetch users
  const fetchUsers = useCallback(async (newFilters?: UserFilters) => {
    try {
      setLoading(true)
      setError(null)

      const searchFilters = newFilters || filters
      const result: UserSearchResult = await UserApiService.getUsers(searchFilters)

      setUsers(result.data)
      setPagination({
        page: result.pagination.page,
        limit: result.pagination.limit,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users'
      setError(errorMessage)
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Fetch single user
  const fetchUser = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const user = await UserApiService.getUser(id)
      setCurrentUser(user)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user'
      setError(errorMessage)
      console.error('Error fetching user:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create user
  const createUser = useCallback(async (data: UserCreateData): Promise<User> => {
    try {
      setLoading(true)
      setError(null)

      const user = await UserApiService.createUser(data)
      setUsers(prev => [user, ...prev])
      setCurrentUser(user)
      
      return user
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user'
      setError(errorMessage)
      console.error('Error creating user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update user
  const updateUser = useCallback(async (id: string, data: UserUpdateData): Promise<User> => {
    try {
      setLoading(true)
      setError(null)

      const user = await UserApiService.updateUser(id, data)
      
      setUsers(prev => prev.map(u => u.id === id ? user : u))
      if (currentUser?.id === id) {
        setCurrentUser(user)
      }
      
      return user
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user'
      setError(errorMessage)
      console.error('Error updating user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // Delete user
  const deleteUser = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      await UserApiService.deleteUser(id)
      
      setUsers(prev => prev.filter(u => u.id !== id))
      if (currentUser?.id === id) {
        setCurrentUser(null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user'
      setError(errorMessage)
      console.error('Error deleting user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // Soft delete user
  const softDeleteUser = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const user = await UserApiService.softDeleteUser(id)
      
      setUsers(prev => prev.map(u => u.id === id ? user : u))
      if (currentUser?.id === id) {
        setCurrentUser(user)
      }
      
      return user
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to soft delete user'
      setError(errorMessage)
      console.error('Error soft deleting user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // Restore user
  const restoreUser = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const user = await UserApiService.restoreUser(id)
      
      setUsers(prev => prev.map(u => u.id === id ? user : u))
      if (currentUser?.id === id) {
        setCurrentUser(user)
      }
      
      return user
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to restore user'
      setError(errorMessage)
      console.error('Error restoring user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // Update user status
  const updateUserStatus = useCallback(async (id: string, status: string) => {
    try {
      setLoading(true)
      setError(null)

      const user = await UserApiService.updateUserStatus(id, status as any)
      
      setUsers(prev => prev.map(u => u.id === id ? user : u))
      if (currentUser?.id === id) {
        setCurrentUser(user)
      }
      
      return user
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user status'
      setError(errorMessage)
      console.error('Error updating user status:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // Update user role
  const updateUserRole = useCallback(async (id: string, role: string) => {
    try {
      setLoading(true)
      setError(null)

      const user = await UserApiService.updateUserRole(id, role as any)
      
      setUsers(prev => prev.map(u => u.id === id ? user : u))
      if (currentUser?.id === id) {
        setCurrentUser(user)
      }
      
      return user
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user role'
      setError(errorMessage)
      console.error('Error updating user role:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // Bulk update users
  const bulkUpdateUsers = useCallback(async (updates: Array<{ id: string; data: UserUpdateData }>) => {
    try {
      setLoading(true)
      setError(null)

      const updatedUsers = await UserApiService.bulkUpdateUsers(updates)
      
      setUsers(prev => prev.map(user => {
        const update = updates.find(u => u.id === user.id)
        if (update) {
          const updatedUser = updatedUsers.find(u => u.id === user.id)
          return updatedUser || user
        }
        return user
      }))
      
      return updatedUsers
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to bulk update users'
      setError(errorMessage)
      console.error('Error bulk updating users:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Export users
  const exportUsers = useCallback(async (exportFilters?: UserFilters) => {
    try {
      setLoading(true)
      setError(null)

      const filtersToUse = exportFilters || filters
      const blob = await UserApiService.exportUsers(filtersToUse)
      
      return blob
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export users'
      setError(errorMessage)
      console.error('Error exporting users:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Set filters
  const handleSetFilters = useCallback((newFilters: UserFilters) => {
    setFilters(newFilters)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Refresh
  const refresh = useCallback(async () => {
    await fetchUsers()
  }, [fetchUsers])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchUsers()
    }
  }, [autoFetch, fetchUsers])

  return {
    // State
    users,
    currentUser,
    loading,
    error,
    filters,
    pagination,

    // Actions
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    softDeleteUser,
    restoreUser,
    updateUserStatus,
    updateUserRole,
    bulkUpdateUsers,
    exportUsers,
    setFilters: handleSetFilters,
    setCurrentUser,
    clearError,
    refresh
  }
}

export default useAdminUsers
