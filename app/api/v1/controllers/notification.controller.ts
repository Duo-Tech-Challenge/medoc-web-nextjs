/**
 * NotificationController
 * Gère les endpoints pour les notifications et alertes
 * - Récupérer les notifications
 * - Marquer comme lues
 * - Preferences
 * - Alertes admin
 * - Audit logs
 *
 * Routes protégées: Tous les utilisateurs authentifiés
 */

import { NextRequest, NextResponse } from 'next/server';
import NotificationService from '../services/notification.service';
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response';
import { logger } from '@/lib/logger';

/**
 * GET /api/v1/notifications
 * Récupérer les notifications de l'utilisateur
 *
 * Query params:
 * - unreadOnly: boolean (default: false)
 */
export async function getUserNotifications(_request: NextRequest): Promise<NextResponse> {
  try {
    // TODO: Extraire userId depuis le JWT token
    const userId = 'user-001';
    const { searchParams } = new URL(_request.url);
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    const notifications = NotificationService.getUserNotifications(userId, unreadOnly);

    logger.debug(`[NotificationController] Notifications fetched for user: ${userId}`);
    return createSuccessResponse(notifications, 'Notifications retrieved', 200);
  } catch (error: unknown) {
    logger.error('[NotificationController] Error fetching notifications:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * PUT /api/v1/notifications/:id/read
 * Marquer une notification comme lue
 */
export async function markNotificationAsRead(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id: notificationId } = await params;

    const notification = NotificationService.markAsRead(notificationId);

    logger.info(`[NotificationController] Notification marked as read: ${notificationId}`);
    return createSuccessResponse(notification, 'Notification marked as read', 200);
  } catch (error: unknown) {
    logger.error('[NotificationController] Error marking notification:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/notifications/preferences
 * Récupérer les préférences de notification de l'utilisateur
 */
export async function getUserPreferences(_request: NextRequest): Promise<NextResponse> {
  try {
    const userId = 'user-001'; // TODO: Extraire du JWT

    const preferences = NotificationService.getUserPreferences(userId);

    logger.debug(`[NotificationController] User preferences fetched for user: ${userId}`);
    return createSuccessResponse(preferences, 'User preferences retrieved', 200);
  } catch (error: unknown) {
    logger.error('[NotificationController] Error fetching preferences:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * PUT /api/v1/notifications/preferences
 * Mettre à jour les préférences de notification
 */
export async function updateUserPreferences(_request: NextRequest): Promise<NextResponse> {
  try {
    const userId = 'user-001'; // TODO: Extraire du JWT
    const body = await _request.json();

    const preferences = NotificationService.updateUserPreferences(userId, body);

    logger.info(`[NotificationController] User preferences updated for user: ${userId}`);
    return createSuccessResponse(preferences, 'Preferences updated successfully', 200);
  } catch (error: unknown) {
    logger.error('[NotificationController] Error updating preferences:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/admin/alerts
 * Récupérer les alertes admin non lues
 * (Admin uniquement)
 */
export async function getAdminAlerts(_request: NextRequest): Promise<NextResponse> {
  try {
    const alerts = NotificationService.getPendingAdminAlerts();

    logger.debug('[NotificationController] Admin alerts fetched');
    return createSuccessResponse(alerts, 'Admin alerts retrieved', 200);
  } catch (error: unknown) {
    logger.error('[NotificationController] Error fetching admin alerts:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * PUT /api/v1/admin/alerts/:id/dismiss
 * Dismisser une alerte admin
 */
export async function dismissAdminAlert(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id: alertId } = await params;
    const adminId = 'admin-001'; // TODO: Extraire du JWT

    const alert = NotificationService.dismissAdminAlert(alertId, adminId);

    logger.info(`[NotificationController] Admin alert dismissed: ${alertId}`);
    return createSuccessResponse(alert, 'Alert dismissed successfully', 200);
  } catch (error: unknown) {
    logger.error('[NotificationController] Error dismissing alert:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/admin/audit-logs
 * Récupérer les audit logs (admin uniquement)
 *
 * Query params:
 * - resourceType: string (optional)
 * - resourceId: string (optional)
 * - actorId: string (optional)
 * - limit: number (default: 50)
 */
export async function getAuditLogs(_request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(_request.url);
    const resourceType = searchParams.get('resourceType');
    const resourceId = searchParams.get('resourceId');
    const actorId = searchParams.get('actorId');
    const limit = parseInt(searchParams.get('limit') || '50');

    let auditLogs: any[];

    if (resourceType && resourceId) {
      auditLogs = NotificationService.getResourceAuditLogs(resourceType, resourceId);
    } else if (actorId) {
      auditLogs = NotificationService.getActorAuditLogs(actorId, limit);
    } else {
      // Récupérer tous les logs (à implémenter)
      auditLogs = [];
    }

    logger.debug('[NotificationController] Audit logs fetched');
    return createSuccessResponse(auditLogs, 'Audit logs retrieved', 200);
  } catch (error: unknown) {
    logger.error('[NotificationController] Error fetching audit logs:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/admin/notification-stats
 * Récupérer les statistiques des notifications
 * (Admin uniquement)
 */
export async function getNotificationStats(_request: NextRequest): Promise<NextResponse> {
  try {
    const stats = NotificationService.getNotificationStats();

    logger.debug('[NotificationController] Notification statistics fetched');
    return createSuccessResponse(stats, 'Statistics retrieved', 200);
  } catch (error: unknown) {
    logger.error('[NotificationController] Error fetching statistics:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}
