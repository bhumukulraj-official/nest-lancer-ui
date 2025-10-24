/**
 * UI Store
 * Zustand store for UI state management
 * Handles modals, drawers, loading states, and other UI-only state
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Theme mode type
export type ThemeMode = 'light' | 'dark' | 'system'

// Modal state interface
export interface ModalState {
  isOpen: boolean
  title?: string
  content?: React.ReactNode
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'danger'
  }>
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
}

// Drawer state interface
export interface DrawerState {
  isOpen: boolean
  content?: React.ReactNode
  title?: string
  anchor?: 'left' | 'right' | 'top' | 'bottom'
  width?: number | string
}

// Loading state interface
export interface LoadingState {
  isLoading: boolean
  message?: string
  progress?: number
}

// UI Store state interface
export interface UIState {
  // Theme
  themeMode: ThemeMode
  
  // Layout
  sidebarCollapsed: boolean
  sidebarOpen: boolean // For mobile
  
  // Modal state
  modal: ModalState
  
  // Drawer state
  drawer: DrawerState
  
  // Loading states
  globalLoading: LoadingState
  loadingStates: Record<string, LoadingState>
  
  // UI preferences
  preferences: {
    animations: boolean
    reducedMotion: boolean
    compactMode: boolean
    showTooltips: boolean
  }
  
  // Actions
  // Theme actions
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
  
  // Layout actions
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setSidebarOpen: (open: boolean) => void
  
  // Modal actions
  openModal: (modal: Partial<ModalState>) => void
  closeModal: () => void
  
  // Drawer actions
  openDrawer: (drawer: Partial<DrawerState>) => void
  closeDrawer: () => void
  
  // Loading actions
  setGlobalLoading: (loading: Partial<LoadingState>) => void
  clearGlobalLoading: () => void
  setLoading: (key: string, loading: Partial<LoadingState>) => void
  clearLoading: (key: string) => void
  clearAllLoading: () => void
  
  // Preference actions
  setPreference: <K extends keyof UIState['preferences']>(
    key: K,
    value: UIState['preferences'][K]
  ) => void
  resetPreferences: () => void
}

// Default preferences
const defaultPreferences = {
  animations: true,
  reducedMotion: false,
  compactMode: false,
  showTooltips: true,
}

// Create UI store with persistence for preferences
export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Initial state
      themeMode: 'system',
      sidebarCollapsed: false,
      sidebarOpen: false,
      
      modal: {
        isOpen: false,
      },
      
      drawer: {
        isOpen: false,
      },
      
      globalLoading: {
        isLoading: false,
      },
      
      loadingStates: {},
      
      preferences: defaultPreferences,

      // Theme actions
      setThemeMode: (mode: ThemeMode) => {
        set({ themeMode: mode })
      },

      toggleTheme: () => {
        const { themeMode } = get()
        const newMode = themeMode === 'light' ? 'dark' : 'light'
        set({ themeMode: newMode })
      },

      // Layout actions
      toggleSidebar: () => {
        const { sidebarCollapsed } = get()
        set({ sidebarCollapsed: !sidebarCollapsed })
      },

      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed })
      },

      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open })
      },

      // Modal actions
      openModal: (modalData: Partial<ModalState>) => {
        set({
          modal: {
            isOpen: true,
            closable: true,
            size: 'md',
            ...modalData,
          },
        })
      },

      closeModal: () => {
        set({
          modal: {
            isOpen: false,
          },
        })
      },

      // Drawer actions
      openDrawer: (drawerData: Partial<DrawerState>) => {
        set({
          drawer: {
            isOpen: true,
            anchor: 'right',
            ...drawerData,
          },
        })
      },

      closeDrawer: () => {
        set({
          drawer: {
            isOpen: false,
          },
        })
      },

      // Loading actions
      setGlobalLoading: (loading: Partial<LoadingState>) => {
        const { globalLoading } = get()
        set({
          globalLoading: {
            ...globalLoading,
            ...loading,
            isLoading: loading.isLoading ?? true,
          },
        })
      },

      clearGlobalLoading: () => {
        set({
          globalLoading: {
            isLoading: false,
          },
        })
      },

      setLoading: (key: string, loading: Partial<LoadingState>) => {
        const { loadingStates } = get()
        set({
          loadingStates: {
            ...loadingStates,
            [key]: {
              ...loadingStates[key],
              ...loading,
              isLoading: loading.isLoading ?? true,
            },
          },
        })
      },

      clearLoading: (key: string) => {
        const { loadingStates } = get()
        const newLoadingStates = { ...loadingStates }
        delete newLoadingStates[key]
        set({ loadingStates: newLoadingStates })
      },

      clearAllLoading: () => {
        set({
          globalLoading: { isLoading: false },
          loadingStates: {},
        })
      },

      // Preference actions
      setPreference: (key, value) => {
        const { preferences } = get()
        set({
          preferences: {
            ...preferences,
            [key]: value,
          },
        })
      },

      resetPreferences: () => {
        set({ preferences: defaultPreferences })
      },
    }),
    {
      name: 'nestlancer-ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        sidebarCollapsed: state.sidebarCollapsed,
        preferences: state.preferences,
        // Don't persist modal, drawer, or loading states
      }),
    }
  )
)

// Utility functions for common UI operations
export const uiUtils = {
  // Show loading with optional message
  showLoading: (message?: string, progress?: number) => {
    useUIStore.getState().setGlobalLoading({
      isLoading: true,
      message,
      progress,
    })
  },

  // Hide global loading
  hideLoading: () => {
    useUIStore.getState().clearGlobalLoading()
  },

  // Show loading for specific operation
  showOperationLoading: (operation: string, message?: string) => {
    useUIStore.getState().setLoading(operation, {
      isLoading: true,
      message,
    })
  },

  // Hide loading for specific operation
  hideOperationLoading: (operation: string) => {
    useUIStore.getState().clearLoading(operation)
  },

  // Check if any loading is active
  isAnyLoading: (): boolean => {
    const { globalLoading, loadingStates } = useUIStore.getState()
    return globalLoading.isLoading || Object.values(loadingStates).some(state => state.isLoading)
  },

  // Get loading state for specific operation
  getLoadingState: (operation: string): LoadingState | undefined => {
    return useUIStore.getState().loadingStates[operation]
  },

  // Simple confirmation modal
  showConfirmation: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    useUIStore.getState().openModal({
      title,
      content: message,
      actions: [
        {
          label: 'Cancel',
          onClick: () => {
            useUIStore.getState().closeModal()
            onCancel?.()
          },
          variant: 'secondary',
        },
        {
          label: 'Confirm',
          onClick: () => {
            useUIStore.getState().closeModal()
            onConfirm()
          },
          variant: 'primary',
        },
      ],
    })
  },

  // Simple alert modal
  showAlert: (title: string, message: string, onClose?: () => void) => {
    useUIStore.getState().openModal({
      title,
      content: message,
      actions: [
        {
          label: 'OK',
          onClick: () => {
            useUIStore.getState().closeModal()
            onClose?.()
          },
          variant: 'primary',
        },
      ],
    })
  },
}

// Export store
export default useUIStore
