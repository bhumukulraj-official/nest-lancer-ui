/**
 * API Client Configuration
 * Axios HTTP client setup with base configuration and interceptors
 * Core API communication layer for all backend requests
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { envConfig } from '@/config/env.config'

// API Client Interface
export interface ApiClient extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
}

// Create Axios instance with base configuration
const createApiClient = (): ApiClient => {
  const client = axios.create({
    baseURL: envConfig.API_BASE_URL,
    timeout: envConfig.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: false, // UI-only app, no cookies needed
  }) as ApiClient

  // Override methods to return data directly instead of full response
  const originalGet = client.get
  const originalPost = client.post
  const originalPut = client.put
  const originalPatch = client.patch
  const originalDelete = client.delete

  client.get = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await originalGet(url, config)
    return response.data
  }

  client.post = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await originalPost(url, data, config)
    return response.data
  }

  client.put = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await originalPut(url, data, config)
    return response.data
  }

  client.patch = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await originalPatch(url, data, config)
    return response.data
  }

  client.delete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await originalDelete(url, config)
    return response.data
  }

  return client
}

// Create and export the API client instance
export const apiClient = createApiClient()

// Request/Response logging in development
if (import.meta.env.DEV) {
  apiClient.interceptors.request.use(
    (config) => {
      console.log(`🔵 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params,
      })
      return config
    },
    (error) => {
      console.error('🔴 API Request Error:', error)
      return Promise.reject(error)
    }
  )

  apiClient.interceptors.response.use(
    (response) => {
      console.log(`🟢 API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      })
      return response
    },
    (error) => {
      console.error('🔴 API Response Error:', error.response?.data || error.message)
      return Promise.reject(error)
    }
  )
}

export default apiClient
