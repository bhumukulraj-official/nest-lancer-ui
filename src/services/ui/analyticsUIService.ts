/**
 * Analytics UI Service
 * Handles frontend analytics tracking
 * UI-only service - no business logic processing
 */

export interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  customParameters?: Record<string, any>
}

export interface PageViewEvent {
  page: string
  title: string
  url: string
  referrer?: string
  customParameters?: Record<string, any>
}

export interface UserEvent {
  userId: string
  userProperties?: Record<string, any>
}

export interface EcommerceEvent {
  transactionId: string
  value: number
  currency: string
  items: Array<{
    itemId: string
    itemName: string
    category: string
    quantity: number
    price: number
  }>
}

export class AnalyticsUIService {
  private static isInitialized = false
  private static userId: string | null = null
  private static userProperties: Record<string, any> = {}

  /**
   * Initialize analytics service
   */
  static initialize(config: {
    trackingId?: string
    userId?: string
    userProperties?: Record<string, any>
    debug?: boolean
  }): void {
    try {
      // Initialize Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', config.trackingId, {
          page_title: document.title,
          page_location: window.location.href,
          custom_map: config.userProperties
        })
      }

      // Initialize other analytics providers
      this.initializeOtherProviders(config)

      this.userId = config.userId || null
      this.userProperties = config.userProperties || {}
      this.isInitialized = true

      console.log('Analytics UI Service initialized')
    } catch (error) {
      console.error('Error initializing analytics service:', error)
    }
  }

  /**
   * Initialize other analytics providers
   */
  private static initializeOtherProviders(config: any): void {
    // Initialize Mixpanel if available
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.init(config.mixpanelToken)
    }

    // Initialize Amplitude if available
    if (typeof window !== 'undefined' && (window as any).amplitude) {
      (window as any).amplitude.getInstance().init(config.amplitudeApiKey)
    }

    // Initialize custom analytics providers
    this.initializeCustomProviders(config)
  }

  /**
   * Initialize custom analytics providers
   */
  private static initializeCustomProviders(_config: any): void {
    // Add custom analytics initialization here
    // This could include custom tracking services, internal analytics, etc.
  }

  /**
   * Track page view
   */
  static trackPageView(event: PageViewEvent): void {
    if (!this.isInitialized) {
      console.warn('Analytics service not initialized')
      return
    }

    try {
      // Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: event.title,
          page_location: event.url,
          page_referrer: event.referrer,
          custom_map: event.customParameters
        })
      }

      // Mixpanel
      if (typeof window !== 'undefined' && (window as any).mixpanel) {
        (window as any).mixpanel.track('Page View', {
          page: event.page,
          title: event.title,
          url: event.url,
          referrer: event.referrer,
          ...event.customParameters
        })
      }

      // Amplitude
      if (typeof window !== 'undefined' && (window as any).amplitude) {
        (window as any).amplitude.getInstance().logEvent('Page View', {
          page: event.page,
          title: event.title,
          url: event.url,
          referrer: event.referrer,
          ...event.customParameters
        })
      }

      // Custom analytics
      this.trackCustomEvent('page_view', {
        page: event.page,
        title: event.title,
        url: event.url,
        referrer: event.referrer,
        ...event.customParameters
      })

      console.log('Page view tracked:', event)
    } catch (error) {
      console.error('Error tracking page view:', error)
    }
  }

  /**
   * Track custom event
   */
  static trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized) {
      console.warn('Analytics service not initialized')
      return
    }

    try {
      const eventData = {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.customParameters
      }

      // Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.action, eventData)
      }

      // Mixpanel
      if (typeof window !== 'undefined' && (window as any).mixpanel) {
        (window as any).mixpanel.track(event.event, {
          category: event.category,
          action: event.action,
          label: event.label,
          value: event.value,
          ...event.customParameters
        })
      }

      // Amplitude
      if (typeof window !== 'undefined' && (window as any).amplitude) {
        (window as any).amplitude.getInstance().logEvent(event.event, {
          category: event.category,
          action: event.action,
          label: event.label,
          value: event.value,
          ...event.customParameters
        })
      }

      // Custom analytics
      this.trackCustomEvent(event.event, {
        category: event.category,
        action: event.action,
        label: event.label,
        value: event.value,
        ...event.customParameters
      })

      console.log('Event tracked:', event)
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }

  /**
   * Track user identification
   */
  static identifyUser(event: UserEvent): void {
    if (!this.isInitialized) {
      console.warn('Analytics service not initialized')
      return
    }

    try {
      this.userId = event.userId
      this.userProperties = event.userProperties || {}

      // Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          user_id: event.userId,
          custom_map: event.userProperties
        })
      }

      // Mixpanel
      if (typeof window !== 'undefined' && (window as any).mixpanel) {
        (window as any).mixpanel.identify(event.userId)
        if (event.userProperties) {
          (window as any).mixpanel.people.set(event.userProperties)
        }
      }

      // Amplitude
      if (typeof window !== 'undefined' && (window as any).amplitude) {
        (window as any).amplitude.getInstance().setUserId(event.userId)
        if (event.userProperties) {
          (window as any).amplitude.getInstance().setUserProperties(event.userProperties)
        }
      }

      // Custom analytics
      this.trackCustomEvent('user_identify', {
        userId: event.userId,
        userProperties: event.userProperties
      })

      console.log('User identified:', event)
    } catch (error) {
      console.error('Error identifying user:', error)
    }
  }

  /**
   * Track ecommerce event
   */
  static trackEcommerceEvent(event: EcommerceEvent): void {
    if (!this.isInitialized) {
      console.warn('Analytics service not initialized')
      return
    }

    try {
      // Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
          transaction_id: event.transactionId,
          value: event.value,
          currency: event.currency,
          items: event.items
        })
      }

      // Mixpanel
      if (typeof window !== 'undefined' && (window as any).mixpanel) {
        (window as any).mixpanel.track('Purchase', {
          transactionId: event.transactionId,
          value: event.value,
          currency: event.currency,
          items: event.items
        })
      }

      // Amplitude
      if (typeof window !== 'undefined' && (window as any).amplitude) {
        (window as any).amplitude.getInstance().logEvent('Purchase', {
          transactionId: event.transactionId,
          value: event.value,
          currency: event.currency,
          items: event.items
        })
      }

      // Custom analytics
      this.trackCustomEvent('purchase', {
        transactionId: event.transactionId,
        value: event.value,
        currency: event.currency,
        items: event.items
      })

      console.log('Ecommerce event tracked:', event)
    } catch (error) {
      console.error('Error tracking ecommerce event:', error)
    }
  }

  /**
   * Track custom event (internal analytics)
   */
  private static trackCustomEvent(eventName: string, data: any): void {
    try {
      // Send to internal analytics API
      if (typeof fetch !== 'undefined') {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: eventName,
            data,
            userId: this.userId,
            userProperties: this.userProperties,
            timestamp: new Date().toISOString(),
            url: typeof window !== 'undefined' ? window.location.href : '',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
          })
        }).catch(error => {
          console.error('Error sending analytics to internal API:', error)
        })
      }
    } catch (error) {
      console.error('Error tracking custom event:', error)
    }
  }

  /**
   * Set user properties
   */
  static setUserProperties(properties: Record<string, any>): void {
    if (!this.isInitialized) {
      console.warn('Analytics service not initialized')
      return
    }

    try {
      this.userProperties = { ...this.userProperties, ...properties }

      // Mixpanel
      if (typeof window !== 'undefined' && (window as any).mixpanel) {
        (window as any).mixpanel.people.set(properties)
      }

      // Amplitude
      if (typeof window !== 'undefined' && (window as any).amplitude) {
        (window as any).amplitude.getInstance().setUserProperties(properties)
      }

      console.log('User properties set:', properties)
    } catch (error) {
      console.error('Error setting user properties:', error)
    }
  }

  /**
   * Track conversion
   */
  static trackConversion(conversionId: string, value?: number, currency?: string): void {
    this.trackEvent({
      event: 'conversion',
      category: 'conversion',
      action: 'conversion',
      label: conversionId,
      value,
      customParameters: { currency }
    })
  }

  /**
   * Track error
   */
  static trackError(error: Error, context?: string): void {
    this.trackEvent({
      event: 'error',
      category: 'error',
      action: 'error',
      label: error.message,
      customParameters: {
        errorName: error.name,
        errorStack: error.stack,
        context
      }
    })
  }

  /**
   * Track performance
   */
  static trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.trackEvent({
      event: 'performance',
      category: 'performance',
      action: metric,
      value,
      customParameters: { unit }
    })
  }

  /**
   * Get analytics status
   */
  static getStatus(): { initialized: boolean; userId: string | null; userProperties: Record<string, any> } {
    return {
      initialized: this.isInitialized,
      userId: this.userId,
      userProperties: this.userProperties
    }
  }

  /**
   * Reset analytics data
   */
  static reset(): void {
    this.userId = null
    this.userProperties = {}
    this.isInitialized = false
  }
}

// Extend Window interface for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    mixpanel?: any
    amplitude?: any
  }
}

export default AnalyticsUIService
