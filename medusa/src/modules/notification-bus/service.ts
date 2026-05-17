/**
 * Notification-bus module service (minimal stub)
 *
 * Sprint 11 Pha 2b (D28 Path D drop)
 *
 * STATUS: All 6 service methods dropped do 2/2 INSERT target tables MISSING.
 *
 * Service methods dropped:
 * - send (notification.notification_delivery INSERT — table MISSING)
 * - sendBatch (calls send loop)
 * - markDelivered (notification.notification_delivery UPDATE — table MISSING)
 * - markFailed (notification.notification_delivery UPDATE)
 * - suppress (notification.suppression_list INSERT — table MISSING)
 * - get (notification.notification_delivery SELECT)
 *
 * Schema reality notification.* (9 tables, none match service):
 * - notification_batch, notification_dead_letter_queue, notification_dedup_record,
 *   notification_delivery_attempt, notification_event, notification_event_type_master,
 *   notification_subscription_rule, notification_template_per_channel,
 *   notification_throttle_state
 *
 * Service expected:
 * - notification.notification_delivery (NOT EXISTS — closest is notification_delivery_attempt)
 * - notification.suppression_list (NOT EXISTS)
 *
 * Cross-module L27 verified:
 * - 0 storefront imports notification-bus
 * - 0 admin UI routes
 * - 10 backend cascade files (1 job + 6 subs + 1 worker + 2 webhooks)
 *
 * Sprint 12+ TODO (MEDIUM priority):
 * - Rewrite full module với schema reality cols
 * - Use notification_delivery_attempt + notification_event + suppression via
 *   subscription_rule pattern
 * - 8-12h estimate Pha 2a pattern
 * - Pre-requisite: business decision on event bus implementation
 *   (Postgres pub/sub / Redis / Kafka)
 *
 * Schema tables PRESERVED (no migration).
 */

import { MedusaService } from "@medusajs/framework/utils"

class NotificationBusService extends MedusaService({}) {
  // STUB: All 6 methods dropped Sprint 11 Pha 2b D28 Path D.
  // See class docstring above for rationale.
  // Sprint 12+ rewrite: Pha 2a communication pattern + event bus design.
}

export default NotificationBusService
