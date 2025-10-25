/**
 * Razorpay UI Service
 * Handles Razorpay client-side integration
 * UI-only service for payment gateway integration
 */

import type { RazorpayConfig, RazorpayOrder, RazorpayPayment } from '../../types/models/payment.types'

declare global {
  interface Window {
    Razorpay: any
  }
}

export class RazorpayUIService {
  private static razorpayLoaded = false
  private static loadPromise: Promise<void> | null = null

  /**
   * Load Razorpay script dynamically
   */
  private static async loadRazorpayScript(): Promise<void> {
    if (this.razorpayLoaded && window.Razorpay) {
      return Promise.resolve()
    }

    if (this.loadPromise) {
      return this.loadPromise
    }

    this.loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => {
        this.razorpayLoaded = true
        resolve()
      }
      script.onerror = () => {
        reject(new Error('Failed to load Razorpay script'))
      }
      document.head.appendChild(script)
    })

    return this.loadPromise
  }

  /**
   * Initialize Razorpay payment
   */
  static async initializePayment(
    config: RazorpayConfig,
    order: RazorpayOrder,
    callbacks: {
      onSuccess?: (payment: RazorpayPayment) => void
      onError?: (error: any) => void
      onDismiss?: () => void
    }
  ): Promise<void> {
    try {
      await this.loadRazorpayScript()

      const options = {
        key: config.keyId,
        amount: order.amount,
        currency: order.currency,
        name: config.name,
        description: config.description,
        order_id: order.id,
        receipt: order.receipt,
        prefill: config.prefill || {},
        theme: config.theme || {},
        handler: (response: any) => {
          if (callbacks.onSuccess) {
            callbacks.onSuccess(response)
          }
        },
        modal: {
          ondismiss: () => {
            if (callbacks.onDismiss) {
              callbacks.onDismiss()
            }
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', (response: any) => {
        if (callbacks.onError) {
          callbacks.onError(response.error)
        }
      })

      razorpay.open()
    } catch (error) {
      console.error('Error initializing Razorpay payment:', error)
      if (callbacks.onError) {
        callbacks.onError(error)
      }
    }
  }

  /**
   * Create Razorpay payment button
   */
  static async createPaymentButton(
    config: RazorpayConfig,
    order: RazorpayOrder,
    buttonText: string = 'Pay Now',
    callbacks: {
      onSuccess?: (payment: RazorpayPayment) => void
      onError?: (error: any) => void
      onDismiss?: () => void
    }
  ): Promise<HTMLButtonElement> {
    try {
      await this.loadRazorpayScript()

      const button = document.createElement('button')
      button.textContent = buttonText
      button.className = 'razorpay-payment-button'
      button.style.cssText = `
        background-color: #3395ff;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
      `

      button.addEventListener('click', () => {
        this.initializePayment(config, order, callbacks)
      })

      button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#2a7ce6'
      })

      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#3395ff'
      })

      return button
    } catch (error) {
      console.error('Error creating Razorpay payment button:', error)
      throw error
    }
  }

  /**
   * Verify payment signature
   */
  static verifySignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    secret: string
  ): boolean {
    try {
      const crypto = require('crypto')
      const body = razorpayOrderId + '|' + razorpayPaymentId
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body)
        .digest('hex')

      return expectedSignature === razorpaySignature
    } catch (error) {
      console.error('Error verifying Razorpay signature:', error)
      return false
    }
  }

  /**
   * Format amount for Razorpay (convert to paise for INR)
   */
  static formatAmount(amount: number, currency: string): number {
    if (currency === 'INR') {
      return Math.round(amount * 100) // Convert to paise
    }
    return Math.round(amount * 100) // Convert to cents for other currencies
  }

  /**
   * Format amount for display
   */
  static formatAmountForDisplay(amount: number, currency: string): string {
    const displayAmount = currency === 'INR' ? amount / 100 : amount / 100
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(displayAmount)
  }

  /**
   * Get supported payment methods for currency
   */
  static getSupportedMethods(currency: string): string[] {
    const methods: Record<string, string[]> = {
      'INR': ['card', 'upi', 'netbanking', 'wallet', 'emi'],
      'USD': ['card'],
      'EUR': ['card'],
      'GBP': ['card']
    }
    return methods[currency] || ['card']
  }

  /**
   * Get payment method display name
   */
  static getMethodDisplayName(method: string): string {
    const methodNames: Record<string, string> = {
      'card': 'Credit/Debit Card',
      'upi': 'UPI',
      'netbanking': 'Net Banking',
      'wallet': 'Digital Wallet',
      'emi': 'EMI',
      'cod': 'Cash on Delivery'
    }
    return methodNames[method] || method
  }

  /**
   * Get payment method icon
   */
  static getMethodIcon(method: string): string {
    const methodIcons: Record<string, string> = {
      'card': '💳',
      'upi': '📱',
      'netbanking': '🏦',
      'wallet': '👛',
      'emi': '📅',
      'cod': '💰'
    }
    return methodIcons[method] || '💳'
  }

  /**
   * Check if Razorpay is available
   */
  static isAvailable(): boolean {
    return this.razorpayLoaded && !!window.Razorpay
  }

  /**
   * Get Razorpay version
   */
  static getVersion(): string {
    if (this.isAvailable()) {
      return window.Razorpay.version || '1.0.0'
    }
    return '0.0.0'
  }

  /**
   * Close any open Razorpay modal
   */
  static closeModal(): void {
    if (this.isAvailable() && window.Razorpay.close) {
      window.Razorpay.close()
    }
  }
}

export default RazorpayUIService
