/**
 * Application Entry Point
 * Main entry point with React 18 createRoot API, performance monitoring,
 * and development tools integration
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { envConfig, validateEnvConfig } from '@/config'

import App from './App'

// Import global styles
import '@/styles/globals.css'

/**
 * Initialize performance monitoring
 */
const initPerformanceMonitoring = async () => {
  // Web Vitals monitoring
  const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals')
  
  const sendToAnalytics = (metric: any) => {
    // TODO: Send metrics to analytics service when implemented
    if (envConfig.ENABLE_DEV_TOOLS) {
      console.log('Web Vital:', metric)
    }
  }
  
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}

/**
 * Initialize application
 */
const initApp = () => {
  // Validate environment configuration
  const isValidConfig = validateEnvConfig()
  
  if (!isValidConfig) {
    console.error('❌ Invalid environment configuration. Please check your .env file.')
    return
  }
  
  // Log startup information in development
  if (envConfig.ENABLE_DEV_TOOLS) {
    console.log('🚀 NestLancer Frontend Starting...')
    console.log('📊 Environment:', import.meta.env.MODE)
    console.log('🔧 API URL:', envConfig.API_BASE_URL)
    console.log('📱 App Version:', envConfig.APP_VERSION)
    console.log('🎨 Dev Tools:', envConfig.ENABLE_DEV_TOOLS ? 'Enabled' : 'Disabled')
  }
  
  // Get root element
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    console.error('❌ Root element not found!')
    return
  }
  
  // Create React root and render app
  const root = createRoot(rootElement)
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  
  // Initialize performance monitoring
  if (envConfig.ENABLE_DEV_TOOLS || !import.meta.env.DEV) {
    initPerformanceMonitoring().catch(console.error)
  }
  
  // Log successful startup
  if (envConfig.ENABLE_DEV_TOOLS) {
    console.log('✅ NestLancer Frontend started successfully!')
  }
}

/**
 * Register Service Worker (PWA)
 */
const registerServiceWorker = async () => {
  if (envConfig.PWA_ENABLED && 'serviceWorker' in navigator && !import.meta.env.DEV) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('✅ Service Worker registered:', registration)
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error)
    }
  }
}

/**
 * Handle unhandled errors
 */
const setupErrorHandling = () => {
  // Global error handler
  window.addEventListener('error', (event) => {
    console.error('❌ Global error:', event.error)
    // TODO: Send to error monitoring service when implemented
  })
  
  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled promise rejection:', event.reason)
    // TODO: Send to error monitoring service when implemented
  })
}

/**
 * Start the application
 */
const bootstrap = async () => {
  try {
    // Setup error handling
    setupErrorHandling()
    
    // Initialize the app
    initApp()
    
    // Register service worker if enabled
    await registerServiceWorker()
    
  } catch (error) {
    console.error('❌ Failed to bootstrap application:', error)
    
    // Show user-friendly error message
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh; 
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          text-align: center;
          background-color: #fafafa;
        ">
          <h1 style="color: #f44336; margin-bottom: 1rem;">Application Error</h1>
          <p style="color: #666; margin-bottom: 1rem;">
            Sorry, something went wrong while starting the application.
          </p>
          <button 
            onclick="location.reload()" 
            style="
              padding: 0.75rem 1.5rem;
              background-color: #1976d2;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 1rem;
            "
          >
            Reload Page
          </button>
          <details style="margin-top: 2rem; max-width: 600px;">
            <summary style="cursor: pointer; color: #666;">Technical Details</summary>
            <pre style="
              text-align: left; 
              background: #f5f5f5; 
              padding: 1rem; 
              border-radius: 4px; 
              margin-top: 1rem;
              overflow: auto;
              font-size: 0.875rem;
            ">${error instanceof Error ? error.stack : String(error)}</pre>
          </details>
        </div>
      `
    }
  }
}

// Start the application
bootstrap()
