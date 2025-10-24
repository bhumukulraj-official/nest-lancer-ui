/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_WS_URL: string
  readonly VITE_RAZORPAY_KEY_ID: string
  readonly VITE_CLOUDINARY_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string
  readonly VITE_GA_TRACKING_ID: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_ENABLE_DEV_TOOLS: string
  readonly VITE_PWA_ENABLED: string
  readonly VITE_MAINTENANCE_MODE: string
  readonly VITE_DEFAULT_LOCALE: string
  readonly VITE_FALLBACK_LOCALE: string
  readonly VITE_LOG_LEVEL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
