/**
 * Payment-related TypeScript type definitions
 * These types represent the data structures for payment management
 */

export interface Payment {
  id: string
  orderId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: PaymentMethod
  description: string
  projectId?: string
  projectTitle?: string
  clientId: string
  clientName: string
  clientEmail: string
  razorpayPaymentId?: string
  razorpayOrderId?: string
  razorpaySignature?: string
  receipt?: string
  notes?: string
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
  paidAt?: string
  refundedAt?: string
  refundAmount?: number
  refundReason?: string
}

export interface PaymentMethod {
  id: string
  type: PaymentMethodType
  provider: PaymentProvider
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  isActive: boolean
  createdAt: string
}

export interface PaymentOrder {
  id: string
  amount: number
  currency: string
  receipt: string
  status: OrderStatus
  notes?: string
  razorpayOrderId?: string
  createdAt: string
  expiresAt: string
}

export interface PaymentReceipt {
  id: string
  paymentId: string
  receiptNumber: string
  amount: number
  currency: string
  status: PaymentStatus
  clientName: string
  clientEmail: string
  projectTitle?: string
  description: string
  paidAt: string
  paymentMethod: string
  transactionId: string
  invoiceUrl?: string
  downloadUrl?: string
}

export interface PaymentRefund {
  id: string
  paymentId: string
  amount: number
  reason: string
  status: RefundStatus
  razorpayRefundId?: string
  processedAt?: string
  createdAt: string
}

export interface PaymentStats {
  totalPayments: number
  totalAmount: number
  currency: string
  successfulPayments: number
  failedPayments: number
  pendingPayments: number
  refundedPayments: number
  averagePaymentAmount: number
  monthlyRevenue: MonthlyRevenue[]
  paymentMethodBreakdown: PaymentMethodStats[]
  projectRevenue: ProjectRevenue[]
}

export interface MonthlyRevenue {
  month: string
  year: number
  amount: number
  count: number
}

export interface PaymentMethodStats {
  method: PaymentMethodType
  count: number
  amount: number
  percentage: number
}

export interface ProjectRevenue {
  projectId: string
  projectTitle: string
  amount: number
  count: number
}

export interface RazorpayConfig {
  keyId: string
  keySecret: string
  currency: string
  name: string
  description: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
}

export interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
  created_at: number
}

export interface RazorpayPayment {
  id: string
  order_id: string
  amount: number
  currency: string
  status: string
  method: string
  description: string
  created_at: number
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface PaymentFilters {
  status?: PaymentStatus[]
  method?: PaymentMethodType[]
  projectId?: string
  clientId?: string
  dateFrom?: string
  dateTo?: string
  amountMin?: number
  amountMax?: number
  search?: string
  sortBy?: PaymentSortBy
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface PaymentCreateData {
  amount: number
  currency: string
  description: string
  projectId?: string
  projectTitle?: string
  clientId: string
  clientName: string
  clientEmail: string
  notes?: string
  metadata?: Record<string, any>
}

export interface PaymentUpdateData {
  status?: PaymentStatus
  notes?: string
  metadata?: Record<string, any>
}

export interface RefundCreateData {
  paymentId: string
  amount: number
  reason: string
}

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

export enum PaymentSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  AMOUNT = 'amount',
  STATUS = 'status',
  CLIENT_NAME = 'clientName',
  PROJECT_TITLE = 'projectTitle'
}

export interface PaymentSearchResult {
  payments: Payment[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaymentWebhookData {
  event: string
  payload: {
    payment: RazorpayPayment
    order: RazorpayOrder
  }
  created_at: number
}

export interface PaymentAnalytics {
  totalRevenue: number
  totalTransactions: number
  successRate: number
  averageTransactionValue: number
  topPaymentMethods: PaymentMethodStats[]
  revenueByMonth: MonthlyRevenue[]
  projectRevenue: ProjectRevenue[]
  clientRevenue: ClientRevenue[]
}

export interface ClientRevenue {
  clientId: string
  clientName: string
  totalAmount: number
  transactionCount: number
  lastPaymentDate: string
}

export interface PaymentNotification {
  id: string
  type: PaymentNotificationType
  paymentId: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

export enum PaymentNotificationType {
  PAYMENT_RECEIVED = 'payment_received',
  PAYMENT_FAILED = 'payment_failed',
  REFUND_PROCESSED = 'refund_processed',
  PAYMENT_PENDING = 'payment_pending'
}
