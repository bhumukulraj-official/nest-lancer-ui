/**
 * User API Service
 * Handles all user-related API calls
 * UI-only service - no business logic processing
 */

import type {
  User,
  UserCreateData,
  UserUpdateData,
  UserFilters,
  UserSearchResult,
  UserStats,
  UserPreferences,
  UserActivity,
  UserNotificationSettings,
  UserSecuritySettings,
  UserPrivacySettings
} from '../../types/models/user.types'
import { apiClient } from '../api/client'
import { USER_ENDPOINTS } from '../api/endpoints'

export class UserApiService {
  /**
   * Get all users with optional filtering (Admin only)
   */
  static async getUsers(filters?: UserFilters): Promise<UserSearchResult> {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.LIST, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  /**
   * Get a single user by ID
   */
  static async getUser(id: string): Promise<User> {
    try {
      const response = await apiClient.get(`${USER_ENDPOINTS.BASE}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.ME)
      return response.data
    } catch (error) {
      console.error('Error fetching current user:', error)
      throw error
    }
  }

  /**
   * Create a new user (Admin only)
   */
  static async createUser(userData: UserCreateData): Promise<User> {
    try {
      const response = await apiClient.post(USER_ENDPOINTS.CREATE, userData)
      return response.data
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  /**
   * Update user profile
   */
  static async updateUser(id: string, userData: UserUpdateData): Promise<User> {
    try {
      const response = await apiClient.put(`${USER_ENDPOINTS.BASE}/${id}`, userData)
      return response.data
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  /**
   * Update current user profile
   */
  static async updateCurrentUser(userData: UserUpdateData): Promise<User> {
    try {
      const response = await apiClient.put(USER_ENDPOINTS.ME, userData)
      return response.data
    } catch (error) {
      console.error('Error updating current user:', error)
      throw error
    }
  }

  /**
   * Delete user (Admin only)
   */
  static async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(`${USER_ENDPOINTS.BASE}/${id}`)
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  /**
   * Soft delete user (Admin only)
   */
  static async softDeleteUser(id: string): Promise<User> {
    try {
      const response = await apiClient.patch(`${USER_ENDPOINTS.BASE}/${id}/soft-delete`)
      return response.data
    } catch (error) {
      console.error('Error soft deleting user:', error)
      throw error
    }
  }

  /**
   * Restore soft deleted user (Admin only)
   */
  static async restoreUser(id: string): Promise<User> {
    try {
      const response = await apiClient.patch(`${USER_ENDPOINTS.BASE}/${id}/restore`)
      return response.data
    } catch (error) {
      console.error('Error restoring user:', error)
      throw error
    }
  }

  /**
   * Update user status (Admin only)
   */
  static async updateUserStatus(id: string, status: 'active' | 'inactive' | 'suspended'): Promise<User> {
    try {
      const response = await apiClient.patch(`${USER_ENDPOINTS.BASE}/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating user status:', error)
      throw error
    }
  }

  /**
   * Update user role (Admin only)
   */
  static async updateUserRole(id: string, role: 'user' | 'admin'): Promise<User> {
    try {
      const response = await apiClient.patch(`${USER_ENDPOINTS.BASE}/${id}/role`, { role })
      return response.data
    } catch (error) {
      console.error('Error updating user role:', error)
      throw error
    }
  }

  /**
   * Get user statistics
   */
  static async getUserStats(id: string): Promise<UserStats> {
    try {
      const response = await apiClient.get(`${USER_ENDPOINTS.BASE}/${id}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching user stats:', error)
      throw error
    }
  }

  /**
   * Get user activity log
   */
  static async getUserActivity(id: string, filters?: any): Promise<UserActivity[]> {
    try {
      const response = await apiClient.get(`${USER_ENDPOINTS.BASE}/${id}/activity`, {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching user activity:', error)
      throw error
    }
  }

  /**
   * Update user preferences
   */
  static async updateUserPreferences(preferences: UserPreferences): Promise<User> {
    try {
      const response = await apiClient.patch(USER_ENDPOINTS.PREFERENCES, preferences)
      return response.data
    } catch (error) {
      console.error('Error updating user preferences:', error)
      throw error
    }
  }

  /**
   * Update user notification settings
   */
  static async updateNotificationSettings(settings: UserNotificationSettings): Promise<User> {
    try {
      const response = await apiClient.patch(USER_ENDPOINTS.NOTIFICATION_SETTINGS, settings)
      return response.data
    } catch (error) {
      console.error('Error updating notification settings:', error)
      throw error
    }
  }

  /**
   * Update user security settings
   */
  static async updateSecuritySettings(settings: UserSecuritySettings): Promise<User> {
    try {
      const response = await apiClient.patch(USER_ENDPOINTS.SECURITY_SETTINGS, settings)
      return response.data
    } catch (error) {
      console.error('Error updating security settings:', error)
      throw error
    }
  }

  /**
   * Update user privacy settings
   */
  static async updatePrivacySettings(settings: UserPrivacySettings): Promise<User> {
    try {
      const response = await apiClient.patch(USER_ENDPOINTS.PRIVACY_SETTINGS, settings)
      return response.data
    } catch (error) {
      console.error('Error updating privacy settings:', error)
      throw error
    }
  }

  /**
   * Bulk update users (Admin only)
   */
  static async bulkUpdateUsers(updates: Array<{ id: string; data: UserUpdateData }>): Promise<User[]> {
    try {
      const response = await apiClient.patch(USER_ENDPOINTS.BULK_UPDATE, { updates })
      return response.data
    } catch (error) {
      console.error('Error bulk updating users:', error)
      throw error
    }
  }

  /**
   * Search users
   */
  static async searchUsers(query: string, filters?: UserFilters): Promise<UserSearchResult> {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.SEARCH, {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      console.error('Error searching users:', error)
      throw error
    }
  }

  /**
   * Export users (Admin only)
   */
  static async exportUsers(filters?: UserFilters): Promise<Blob> {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.EXPORT, {
        params: filters,
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting users:', error)
      throw error
    }
  }
}

export default UserApiService
