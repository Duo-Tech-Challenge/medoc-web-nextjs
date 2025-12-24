/**
 * NotificationService
 * Gère les notifications système, alertes admin et logs d'audit
 * - Queue de notifications
 * - Retry automatique
 * - Alertes admin
 * - Audit trail
 */

import { logger } from '@/lib/logger';
import {
  NotificationDTO,
  CreateNotificationDTO,
  NotificationStatus,
  NotificationType,
  NotificationPriority,
  AuditLogDTO,
  CreateAuditLogDTO,
  AdminAlertDTO,
  NotificationStatsDTO,
  UserNotificationPreferencesDTO,
  NotificationQueueDTO,
} from '@/types/notifications';

/**
 * Mock data - À remplacer par vraies requêtes Prisma + queue system (Bull, RabbitMQ, etc.)
 */
const notificationQueue: NotificationQueueDTO[] = [];
const notifications: NotificationDTO[] = [];
const auditLogs: AuditLogDTO[] = [];
const adminAlerts: AdminAlertDTO[] = [];
const userPreferences: Map<string, UserNotificationPreferencesDTO> = new Map();

export class NotificationService {
  /**
   * Créer et enqueuer une notification
   */
  static createNotification(request: CreateNotificationDTO): NotificationDTO {
    logger.info(
      `[NotificationService] Creating notification for ${request.recipientEmail} (${request.type})`,
    );

    const notification: NotificationDTO = {
      id: `notif-${Date.now()}`,
      recipientId: request.recipientId,
      recipientEmail: request.recipientEmail,
      type: request.type,
      priority: request.priority || NotificationPriority.NORMAL,
      status: NotificationStatus.PENDING,
      subject: request.subject,
      message: request.message,
      payload: request.payload,
      createdAt: new Date(),
    };

    notifications.push(notification);

    // Enqueuer pour envoi
    const queueItem: NotificationQueueDTO = {
      id: `queue-${Date.now()}`,
      notification,
      retryCount: 0,
      maxRetries: 3,
      status: 'PENDING',
    };

    notificationQueue.push(queueItem);

    logger.info(
      `[NotificationService] Notification enqueued for ${request.recipientEmail}`,
    );
    return notification;
  }

  /**
   * Marquer une notification comme lue
   */
  static markAsRead(notificationId: string): NotificationDTO {
    logger.debug(`[NotificationService] Marking notification as read: ${notificationId}`);

    const notification = notifications.find((n) => n.id === notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.status = NotificationStatus.READ;
    notification.readAt = new Date();

    return notification;
  }

  /**
   * Récupérer les notifications d'un utilisateur
   */
  static getUserNotifications(userId: string, unreadOnly: boolean = false): NotificationDTO[] {
    logger.debug(`[NotificationService] Fetching notifications for user: ${userId}`);

    let userNotifs = notifications.filter((n) => n.recipientId === userId);

    if (unreadOnly) {
      userNotifs = userNotifs.filter((n) => n.status !== NotificationStatus.READ);
    }

    // Trier par date (plus récents d'abord)
    return userNotifs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Créer un audit log
   */
  static createAuditLog(request: CreateAuditLogDTO): AuditLogDTO {
    logger.debug(
      `[NotificationService] Creating audit log: ${request.action} on ${request.resourceType}`,
    );

    const auditLog: AuditLogDTO = {
      id: `audit-${Date.now()}`,
      timestamp: new Date(),
      actor: request.actor,
      action: request.action,
      resourceType: request.resourceType,
      resourceId: request.resourceId,
      changes: request.changes,
      ipAddress: request.ipAddress,
      userAgent: request.userAgent,
      status: request.status,
      errorMessage: request.errorMessage,
    };

    auditLogs.push(auditLog);

    logger.debug(`[NotificationService] Audit log created: ${auditLog.id}`);
    return auditLog;
  }

  /**
   * Récupérer les audit logs pour une ressource
   */
  static getResourceAuditLogs(resourceType: string, resourceId: string): AuditLogDTO[] {
    logger.debug(
      `[NotificationService] Fetching audit logs for ${resourceType}/${resourceId}`,
    );

    return auditLogs
      .filter((log) => log.resourceType === resourceType && log.resourceId === resourceId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Récupérer les audit logs d'un acteur
   */
  static getActorAuditLogs(actorId: string, limit: number = 50): AuditLogDTO[] {
    logger.debug(`[NotificationService] Fetching audit logs for actor: ${actorId}`);

    return auditLogs
      .filter((log) => log.actor.id === actorId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Créer une alerte admin
   */
  static createAdminAlert(
    severity: 'INFO' | 'WARNING' | 'CRITICAL',
    title: string,
    description: string,
    affectedResource?: { type: string; id: string },
    actionUrl?: string,
  ): AdminAlertDTO {
    logger.warn(`[NotificationService] Creating admin alert: ${title}`);

    const alert: AdminAlertDTO = {
      id: `alert-${Date.now()}`,
      createdAt: new Date(),
      severity,
      title,
      description,
      affectedResource,
      actionUrl,
      dismissed: false,
    };

    adminAlerts.push(alert);

    // Créer aussi une notification pour les admins
    this.createNotification({
      recipientId: 'admin-001', // TODO: Récupérer tous les admins
      recipientEmail: 'admin@medoc.fr',
      type: NotificationType.SYSTEM_ALERT,
      priority: severity === 'CRITICAL' ? NotificationPriority.CRITICAL : NotificationPriority.HIGH,
      subject: title,
      message: description,
      payload: { alertId: alert.id },
    });

    logger.warn(`[NotificationService] Admin alert created: ${alert.id}`);
    return alert;
  }

  /**
   * Obtenir les alertes non lues
   */
  static getPendingAdminAlerts(): AdminAlertDTO[] {
    logger.debug('[NotificationService] Fetching pending admin alerts');

    return adminAlerts
      .filter((a) => !a.dismissed)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Dismisser une alerte admin
   */
  static dismissAdminAlert(alertId: string, adminId: string): AdminAlertDTO {
    logger.info(`[NotificationService] Dismissing admin alert: ${alertId}`);

    const alert = adminAlerts.find((a) => a.id === alertId);
    if (!alert) {
      throw new Error('Alert not found');
    }

    alert.dismissed = true;
    alert.dismissedAt = new Date();
    alert.dismissedBy = adminId;

    return alert;
  }

  /**
   * Récupérer les statistiques de notifications
   */
  static getNotificationStats(): NotificationStatsDTO {
    logger.debug('[NotificationService] Fetching notification statistics');

    const sent = notifications.filter((n) => n.status === NotificationStatus.SENT).length;
    const failed = notifications.filter((n) => n.status === NotificationStatus.FAILED).length;
    const delivered = notifications.filter((n) => n.status === NotificationStatus.DELIVERED)
      .length;
    const read = notifications.filter((n) => n.status === NotificationStatus.READ).length;
    const pending = notifications.filter((n) => n.status === NotificationStatus.PENDING).length;

    const averageDeliveryTime =
      delivered > 0
        ? notifications
            .filter((n) => n.deliveredAt && n.createdAt)
            .reduce((sum, n) => {
              const time = n.deliveredAt!.getTime() - n.createdAt.getTime();
              return sum + time / 1000; // en secondes
            }, 0) / delivered
        : 0;

    const failureRate =
      notifications.length > 0 ? (failed / notifications.length) * 100 : 0;

    return {
      totalNotifications: notifications.length,
      sentCount: sent,
      failedCount: failed,
      deliveredCount: delivered,
      readCount: read,
      pendingCount: pending,
      averageDeliveryTime,
      failureRate,
    };
  }

  /**
   * Récupérer les préférences de notification d'un utilisateur
   */
  static getUserPreferences(userId: string): UserNotificationPreferencesDTO {
    logger.debug(`[NotificationService] Fetching notification preferences for user: ${userId}`);

    let preferences = userPreferences.get(userId);
    if (!preferences) {
      preferences = {
        userId,
        enableNotifications: true,
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        notificationTypes: {
          [NotificationType.AVAILABILITY_CHANGED]: true,
          [NotificationType.FAVORITE_BACK_IN_STOCK]: true,
          [NotificationType.NEW_REVIEW_RECEIVED]: false,
        },
        quietHoursEnabled: false,
        updatedAt: new Date(),
      };
      userPreferences.set(userId, preferences);
    }

    return preferences;
  }

  /**
   * Mettre à jour les préférences de notification d'un utilisateur
   */
  static updateUserPreferences(
    userId: string,
    updates: Partial<UserNotificationPreferencesDTO>,
  ): UserNotificationPreferencesDTO {
    logger.info(`[NotificationService] Updating notification preferences for user: ${userId}`);

    let preferences = this.getUserPreferences(userId);
    Object.assign(preferences, updates);
    preferences.updatedAt = new Date();
    userPreferences.set(userId, preferences);

    logger.info(`[NotificationService] User preferences updated for user: ${userId}`);
    return preferences;
  }

  /**
   * Traiter la queue de notifications (appelé par un worker/cron)
   * TODO: Implémenter avec Bull, RabbitMQ, ou système de queue
   */
  static async processNotificationQueue(): Promise<void> {
    logger.info('[NotificationService] Processing notification queue');

    for (const item of notificationQueue) {
      if (item.status !== 'PENDING') continue;

      try {
        item.status = 'PROCESSING';

        // TODO: Envoyer l'email/SMS/push ici
        logger.info(
          `[NotificationService] Sending notification ${item.id} to ${item.notification.recipientEmail}`,
        );

        // Simuler l'envoi
        item.notification.status = NotificationStatus.SENT;
        item.notification.sentAt = new Date();
        item.status = 'SENT';

        // Simuler la livraison
        setTimeout(() => {
          item.notification.status = NotificationStatus.DELIVERED;
          item.notification.deliveredAt = new Date();
        }, 1000);
      } catch (error: unknown) {
        logger.error('[NotificationService] Error sending notification:', error);

        item.retryCount++;
        if (item.retryCount < item.maxRetries) {
          item.nextRetryAt = new Date(Date.now() + 5 * 60 * 1000); // Retry dans 5 min
          item.status = 'PENDING';
          item.notification.status = NotificationStatus.PENDING;
        } else {
          item.status = 'FAILED';
          item.notification.status = NotificationStatus.FAILED;
          item.notification.failureReason = error instanceof Error ? error.message : 'Unknown';
        }
      }
    }

    logger.info('[NotificationService] Notification queue processing completed');
  }
}

export default NotificationService;
