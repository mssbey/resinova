/**
 * CRM Notification Service
 * Channel-agnostic abstraction layer for WhatsApp / SMS / Email.
 * Each channel adapter implements NotificationChannel and can be
 * swapped in without touching call-sites.
 */

export type NotificationChannel = "whatsapp" | "sms" | "email";

export interface NotificationPayload {
  to: string;
  subject?: string;
  body: string;
  channel: NotificationChannel;
  meta?: Record<string, unknown>;
}

export interface NotificationResult {
  success: boolean;
  channel: NotificationChannel;
  messageId?: string;
  error?: string;
}

export interface NotificationLog {
  id: string;
  customerId: string;
  channel: NotificationChannel;
  subject?: string;
  body: string;
  sentAt: string;
  status: "sent" | "failed" | "pending";
}

const LOG_KEY = "resinova-notification-log-v1";

function getLogs(): NotificationLog[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(LOG_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function appendLog(log: NotificationLog): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOG_KEY, JSON.stringify([...getLogs(), log]));
}

// ─── Channel adapters ─────────────────────────────────────────────────────────

async function sendWhatsApp(payload: NotificationPayload): Promise<NotificationResult> {
  // TODO: Wire up Twilio / 360dialog / WATI API here.
  console.info("[CRM] WhatsApp →", payload.to, payload.body);
  return { success: true, channel: "whatsapp", messageId: `wa-${Date.now()}` };
}

async function sendSMS(payload: NotificationPayload): Promise<NotificationResult> {
  // TODO: Wire up Netgsm / İleti Merkezi / Twilio SMS here.
  console.info("[CRM] SMS →", payload.to, payload.body);
  return { success: true, channel: "sms", messageId: `sms-${Date.now()}` };
}

async function sendEmail(payload: NotificationPayload): Promise<NotificationResult> {
  // TODO: Wire up Resend / SendGrid / AWS SES here.
  console.info("[CRM] Email →", payload.to, `[${payload.subject}]`, payload.body);
  return { success: true, channel: "email", messageId: `email-${Date.now()}` };
}

const adapters: Record<NotificationChannel, (p: NotificationPayload) => Promise<NotificationResult>> = {
  whatsapp: sendWhatsApp,
  sms: sendSMS,
  email: sendEmail,
};

// ─── Public API ───────────────────────────────────────────────────────────────

export async function sendNotification(
  customerId: string,
  payload: NotificationPayload
): Promise<NotificationResult> {
  const result = await adapters[payload.channel](payload);

  appendLog({
    id: `log-${Date.now()}`,
    customerId,
    channel: payload.channel,
    subject: payload.subject,
    body: payload.body,
    sentAt: new Date().toISOString(),
    status: result.success ? "sent" : "failed",
  });

  return result;
}

export async function sendAbandonedCartReminder(
  customerId: string,
  customerName: string,
  to: string,
  cartValue: number,
  channel: NotificationChannel = "email"
): Promise<NotificationResult> {
  return sendNotification(customerId, {
    to,
    channel,
    subject: "Sepetinizde ürünler bekliyor!",
    body: `Merhaba ${customerName}, ₺${cartValue.toLocaleString("tr-TR")} tutarındaki sepetiniz sizi bekliyor. Hemen tamamlayın ve özel indirimden yararlanın.`,
  });
}

export function getNotificationLogs(customerId?: string): NotificationLog[] {
  const logs = getLogs();
  return customerId ? logs.filter((l) => l.customerId === customerId) : logs;
}

export function clearNotificationLogs(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(LOG_KEY);
}
