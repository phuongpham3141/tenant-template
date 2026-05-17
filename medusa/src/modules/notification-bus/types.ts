/**
 * Notification-bus module types (minimal stub)
 *
 * Sprint 11 Pha 2b (D28 Path D drop)
 *
 * STATUS: Channel enum + 2 interfaces dropped:
 * - Channel enum (8 values: email/sms/whatsapp/zalo/wechat/push/in_app/webhook)
 * - NotificationRequest interface (11 input fields)
 * - NotificationDelivery interface (13 entity fields, broken cols)
 *
 * See service.ts class docstring for full rationale.
 *
 * PRESERVED minimal types so cascade files (10 backend files referencing module)
 * can stub gracefully without ripple TS errors.
 *
 * Sprint 12+ TODO: Rewrite với schema reality cols:
 * - NotificationDeliveryAttempt (match notification_delivery_attempt)
 * - NotificationEvent (match notification_event)
 * - SubscriptionRule (match notification_subscription_rule)
 * - EventType (match notification_event_type_master)
 */

// Minimal type aliases for cascade compatibility
export type Channel = string
export type NotificationRequest = Record<string, unknown>
export type NotificationDelivery = { id: string; tenantId: string }
