/**
 * Types pour le système de notifications et communications
 * - Notifications système
 * - Logs d'audit
 * - Alertes admin
 */

/**
 * Types de notifications
 */
export enum NotificationType {
  // Pour les pharmacies
  PHARMACY_VALIDATED = 'PHARMACY_VALIDATED',
  PHARMACY_REJECTED = 'PHARMACY_REJECTED',
  PHARMACY_SUSPENDED = 'PHARMACY_SUSPENDED',
  PHARMACY_REACTIVATED = 'PHARMACY_REACTIVATED',
  
  // Pour les utilisateurs
  AVAILABILITY_CHANGED = 'AVAILABILITY_CHANGED',
  FAVORITE_BACK_IN_STOCK = 'FAVORITE_BACK_IN_STOCK',
  NEW_REVIEW_RECEIVED = 'NEW_REVIEW_RECEIVED',
  
  // Pour les admins
  PHARMACY_APPLICATION_PENDING = 'PHARMACY_APPLICATION_PENDING',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  HIGH_VOLUME_SEARCHES = 'HIGH_VOLUME_SEARCHES',
  
  // Système
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  DATABASE_ALERT = 'DATABASE_ALERT',
  API_ERROR = 'API_ERROR',
}

/**
 * Priorité des notifications
 */
export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/**
 * Statut d'une notification
 */
export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}

/**
 * DTO: Notification
 */
export interface NotificationDTO {
  id: string;
  recipientId: string;
  recipientEmail: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  subject: string;
  message: string;
  payload?: Record<string, unknown>;
  createdAt: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  failureReason?: string;
}

/**
 * DTO: Request pour créer une notification
 */
export interface CreateNotificationDTO {
  recipientId: string;
  recipientEmail: string;
  type: NotificationType;
  priority?: NotificationPriority;
  subject: string;
  message: string;
  payload?: Record<string, unknown>;
}

/**
 * DTO: Notification brute (avant envoi)
 */
export interface NotificationQueueDTO {
  id: string;
  notification: NotificationDTO;
  retryCount: number;
  maxRetries: number;
  nextRetryAt?: Date;
  status: 'PENDING' | 'PROCESSING' | 'SENT' | 'FAILED';
}

/**
 * DTO: Audit log (trace des actions)
 */
export interface AuditLogDTO {
  id: string;
  timestamp: Date;
  actor: {
    id: string;
    email: string;
    role: 'USER' | 'PHARMACY' | 'ADMIN';
  };
  action: string; // ex: "PHARMACY_VALIDATED", "MEDICATION_UPDATED"
  resourceType: string; // ex: "Pharmacy", "Medication"
  resourceId: string;
  changes?: Record<string, unknown>; // avant/après
  ipAddress?: string;
  userAgent?: string;
  status: 'SUCCESS' | 'FAILURE';
  errorMessage?: string;
}

/**
 * DTO: Request créer un audit log
 */
export interface CreateAuditLogDTO {
  actor: {
    id: string;
    email: string;
    role: 'USER' | 'PHARMACY' | 'ADMIN';
  };
  action: string;
  resourceType: string;
  resourceId: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  status: 'SUCCESS' | 'FAILURE';
  errorMessage?: string;
}

/**
 * DTO: Alert admin (alerte pour les admins)
 */
export interface AdminAlertDTO {
  id: string;
  createdAt: Date;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  description: string;
  affectedResource?: {
    type: string; // ex: "Pharmacy", "User"
    id: string;
  };
  actionUrl?: string; // Lien vers le dashboard admin
  dismissed: boolean;
  dismissedAt?: Date;
  dismissedBy?: string;
}

/**
 * DTO: Statistiques de notifications
 */
export interface NotificationStatsDTO {
  totalNotifications: number;
  sentCount: number;
  failedCount: number;
  deliveredCount: number;
  readCount: number;
  pendingCount: number;
  averageDeliveryTime: number; // en secondes
  failureRate: number; // en pourcentage
}

/**
 * DTO: Configuration des notifications (par utilisateur)
 */
export interface UserNotificationPreferencesDTO {
  userId: string;
  enableNotifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  notificationTypes: {
    [key in NotificationType]?: boolean;
  };
  quietHoursEnabled: boolean;
  quietHoursStart?: string; // HH:mm
  quietHoursEnd?: string; // HH:mm
  updatedAt: Date;
}
