/**
 * Numune Talepleri (V3)
 *
 * Mobilyacı / atölye / mimar / bayi adayları için fiziksel numune talep formu.
 */

export type SampleStatus =
  | "received"
  | "preparing"
  | "shipped"
  | "delivered"
  | "rejected";

export type SampleAudience =
  | "carpenter" // Mobilyacı
  | "workshop" // Atölye
  | "architect" // Mimar
  | "dealer_candidate"; // Bayi adayı

export interface SampleRequest {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  audience: SampleAudience;
  reason: string;
  createdAt: string;
  status: SampleStatus;
  internalNote?: string;
}

export const SAMPLE_AUDIENCE_LABEL: Record<SampleAudience, string> = {
  carpenter: "Mobilyacı",
  workshop: "Atölye",
  architect: "Mimar",
  dealer_candidate: "Bayi Adayı",
};

export const SAMPLE_STATUS_LABEL: Record<SampleStatus, string> = {
  received: "Talep Alındı",
  preparing: "Hazırlanıyor",
  shipped: "Kargoya Verildi",
  delivered: "Teslim Edildi",
  rejected: "Reddedildi",
};

export const SAMPLE_STATUS_COLOR: Record<SampleStatus, string> = {
  received: "#103B73",
  preparing: "#D4AF37",
  shipped: "#1E4E8C",
  delivered: "#22C55E",
  rejected: "#EF4444",
};

export const sampleRequests: SampleRequest[] = [
  {
    id: "SMP-2026-0014",
    companyName: "Atölye 18",
    contactName: "Mehmet Aslan",
    phone: "+90 533 222 33 44",
    email: "mehmet@atolye18.demo",
    city: "İstanbul",
    audience: "workshop",
    reason: "River table müşterileri için numune değerlendirmesi.",
    createdAt: "2026-06-02",
    status: "shipped",
    internalNote: "Pro Clear Ultra 200gr + pigment seti gönderildi.",
  },
  {
    id: "SMP-2026-0015",
    companyName: "AhşapCi Mobilya",
    contactName: "Selma Korkmaz",
    phone: "+90 532 555 11 22",
    email: "selma@ahsapci.demo",
    city: "Bursa",
    audience: "carpenter",
    reason: "Yeni nesil sertleştirici kıyaslaması.",
    createdAt: "2026-06-05",
    status: "preparing",
  },
];
