/**
 * UI Store Tests
 * Tests for UI state management with Zustand
 */

import { describe, it, expect, beforeEach } from 'vitest'

import { useUIStore } from './uiStore'

describe('UI Store', () => {
  beforeEach(() => {
    // Reset store to initial state
    useUIStore.setState({
      modal: {
        isOpen: false,
        title: '',
        content: null,
        size: 'md',
        closable: true,
        actions: [],
      },
      drawer: {
        isOpen: false,
        content: null,
        anchor: 'right',
      },
      sidebarOpen: false,
      themeMode: 'light',
    })
  })

  describe('Modal', () => {
    it('should open modal', () => {
      const content = <div>Test Modal</div>
      useUIStore.getState().openModal({
        title: 'Test',
        content,
        size: 'lg',
      })

      const state = useUIStore.getState()
      expect(state.modal.isOpen).toBe(true)
      expect(state.modal.title).toBe('Test')
      expect(state.modal.content).toBe(content)
    })

    it('should close modal', () => {
      useUIStore.setState({
        modal: {
          isOpen: true,
          title: 'Test',
          content: <div>Test</div>,
          size: 'md',
          closable: true,
          actions: [],
        },
      })

      useUIStore.getState().closeModal()

      const state = useUIStore.getState()
      expect(state.modal.isOpen).toBe(false)
    })
  })

  describe('Drawer', () => {
    it('should open drawer', () => {
      const content = <div>Test Drawer</div>
      useUIStore.getState().openDrawer({ content, anchor: 'left' })

      const state = useUIStore.getState()
      expect(state.drawer.isOpen).toBe(true)
      expect(state.drawer.content).toBe(content)
    })

    it('should close drawer', () => {
      useUIStore.setState({
        drawer: { isOpen: true, content: <div>Test</div>, anchor: 'right' },
      })

      useUIStore.getState().closeDrawer()

      const state = useUIStore.getState()
      expect(state.drawer.isOpen).toBe(false)
    })
  })

  describe('Sidebar', () => {
    it('should toggle sidebar', () => {
      useUIStore.getState().toggleSidebar()
      expect(useUIStore.getState().sidebarOpen).toBe(true)

      useUIStore.getState().toggleSidebar()
      expect(useUIStore.getState().sidebarOpen).toBe(false)
    })

    it('should open sidebar', () => {
      useUIStore.getState().setSidebarOpen(true)
      expect(useUIStore.getState().sidebarOpen).toBe(true)
    })

    it('should close sidebar', () => {
      useUIStore.getState().setSidebarOpen(true)
      useUIStore.getState().setSidebarOpen(false)
      expect(useUIStore.getState().sidebarOpen).toBe(false)
    })
  })

  describe('Theme', () => {
    it('should toggle theme mode', () => {
      useUIStore.getState().toggleTheme()
      expect(useUIStore.getState().themeMode).toBe('dark')

      useUIStore.getState().toggleTheme()
      expect(useUIStore.getState().themeMode).toBe('light')
    })

    it('should set theme mode', () => {
      useUIStore.getState().setThemeMode('dark')
      expect(useUIStore.getState().themeMode).toBe('dark')
    })
  })
})

