/**
 * Admin Role Enums
 * TypeScript enumeration for admin roles
 */

export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SUPPORT = 'support',
  ANALYST = 'analyst',
  MANAGER = 'manager'
}

export enum AdminPermission {
  USER_MANAGEMENT = 'user_management',
  PROJECT_MANAGEMENT = 'project_management',
  PAYMENT_MANAGEMENT = 'payment_management',
  SYSTEM_CONFIGURATION = 'system_configuration',
  ANALYTICS_ACCESS = 'analytics_access',
  AUDIT_LOGS = 'audit_logs',
  WEBHOOK_MANAGEMENT = 'webhook_management',
  STORAGE_MANAGEMENT = 'storage_management'
}

export enum AdminAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  APPROVE = 'approve',
  REJECT = 'reject',
  SUSPEND = 'suspend',
  ACTIVATE = 'activate',
  EXPORT = 'export',
  IMPORT = 'import'
}
