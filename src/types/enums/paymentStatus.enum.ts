/**
 * Payment Status Enums
 * TypeScript enumeration for payment status values
 */

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export enum PaymentMethodType {
  CARD = 'card',
  UPI = 'upi',
  NETBANKING = 'netbanking',
  WALLET = 'wallet',
  EMI = 'emi',
  COD = 'cod'
}

export enum PaymentProvider {
  RAZORPAY = 'razorpay',
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  PAYTM = 'paytm'
}

export enum OrderStatus {
  CREATED = 'created',
  ATTEMPTED = 'attempted',
  PAID = 'paid',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

export enum RefundStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum PaymentCurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
  CHF = 'CHF',
  CNY = 'CNY',
  INR = 'INR',
  BRL = 'BRL',
  RUB = 'RUB',
  KRW = 'KRW'
}

export enum PaymentSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  AMOUNT = 'amount',
  STATUS = 'status',
  CLIENT_NAME = 'clientName',
  PROJECT_TITLE = 'projectTitle'
}
