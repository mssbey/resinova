/**
 * WhatsApp Helper (V3)
 *
 * Önceden hazırlanmış mesaj şablonlarını WhatsApp'ın `wa.me` API'siyle açılacak
 * URL'lere dönüştürür. Hem desktop hem mobil tarayıcılarla uyumlu.
 */

/** Resinova teknik destek WhatsApp hattı (E.164 formatında, +/space yok) */
export const WHATSAPP_NUMBER = "905321112233";

export interface WhatsAppMessageOptions {
  productName?: string;
  productUrl?: string;
  context?: string;
}

export function buildProductMessage(opts: WhatsAppMessageOptions): string {
  const lines = ["Merhaba,"];
  if (opts.productName) {
    lines.push("", `Resinova ${opts.productName} ürünü hakkında bilgi almak istiyorum.`);
  } else {
    lines.push("", "Resinova ürünleri hakkında bilgi almak istiyorum.");
  }
  if (opts.context) {
    lines.push("", opts.context);
  }
  if (opts.productUrl) {
    lines.push("", `Ürün: ${opts.productUrl}`);
  }
  lines.push("", "Teknik danışmanlığınız için teşekkür ederim.");
  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildProductWhatsAppUrl(opts: WhatsAppMessageOptions): string {
  return buildWhatsAppUrl(buildProductMessage(opts));
}
