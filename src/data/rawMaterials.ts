/**
 * Hammadde Depo Yönetimi
 * Reçine tankları, sertleştirici tankları, pigmentler, katkı kimyasalları,
 * ambalaj stokları. Sipariş gerçekleştiğinde set bileşenleri üzerinden
 * stoklar otomatik düşürülür.
 */

export type RawMaterialType =
  | "resin"
  | "hardener"
  | "pigment"
  | "additive"
  | "packaging";

export interface RawMaterial {
  id: string;
  type: RawMaterialType;
  name: string;
  code: string;
  /** Birim — kg / lt / adet */
  unit: "kg" | "lt" | "adet";
  /** Mevcut stok */
  currentStock: number;
  /** Minimum stok seviyesi — altı kritik */
  minStock: number;
  /** Sipariş için tetik kritik seviyesi */
  reorderLevel: number;
  /** Birim maliyet (TRY) */
  unitCost: number;
  /** Bağlı tedarikçi adı */
  supplier?: string;
  /** Tankın bulunduğu depo / lokasyon */
  location: string;
}

export const rawMaterials: RawMaterial[] = [
  // === Reçineler ===
  {
    id: "raw-resin-clear-a",
    type: "resin",
    name: "Crystal Clear Reçine A",
    code: "RES-CC-A",
    unit: "kg",
    currentStock: 1840,
    minStock: 400,
    reorderLevel: 600,
    unitCost: 380,
    supplier: "PetroKim A.Ş.",
    location: "Tank-01 / İstanbul Üretim",
  },
  {
    id: "raw-resin-deep-a",
    type: "resin",
    name: "Deep Pour Reçine A",
    code: "RES-DP-A",
    unit: "kg",
    currentStock: 2350,
    minStock: 500,
    reorderLevel: 800,
    unitCost: 145,
    supplier: "PetroKim A.Ş.",
    location: "Tank-02 / İstanbul Üretim",
  },
  {
    id: "raw-resin-hobi-a",
    type: "resin",
    name: "Hobi Reçine A",
    code: "RES-HB-A",
    unit: "kg",
    currentStock: 410,
    minStock: 200,
    reorderLevel: 300,
    unitCost: 295,
    supplier: "PetroKim A.Ş.",
    location: "Tank-03 / İstanbul Üretim",
  },
  {
    id: "raw-resin-emprenye-a",
    type: "resin",
    name: "Emprenye Reçine A",
    code: "RES-EM-A",
    unit: "kg",
    currentStock: 940,
    minStock: 250,
    reorderLevel: 400,
    unitCost: 165,
    supplier: "PetroKim A.Ş.",
    location: "Tank-04 / İstanbul Üretim",
  },
  {
    id: "raw-resin-coating-a",
    type: "resin",
    name: "Coating Reçine A",
    code: "RES-CT-A",
    unit: "kg",
    currentStock: 720,
    minStock: 200,
    reorderLevel: 350,
    unitCost: 135,
    supplier: "PetroKim A.Ş.",
    location: "Tank-05 / İstanbul Üretim",
  },

  // === Sertleştiriciler ===
  {
    id: "raw-hardener-clear-b",
    type: "hardener",
    name: "Crystal Clear Sertleştirici B",
    code: "HRD-CC-B",
    unit: "kg",
    currentStock: 920,
    minStock: 200,
    reorderLevel: 300,
    unitCost: 420,
    supplier: "ChemTech Ltd.",
    location: "Tank-06 / İstanbul Üretim",
  },
  {
    id: "raw-hardener-deep-b",
    type: "hardener",
    name: "Deep Pour Sertleştirici B",
    code: "HRD-DP-B",
    unit: "kg",
    currentStock: 780,
    minStock: 200,
    reorderLevel: 300,
    unitCost: 160,
    supplier: "ChemTech Ltd.",
    location: "Tank-07 / İstanbul Üretim",
  },
  {
    id: "raw-hardener-hobi-b",
    type: "hardener",
    name: "Hobi Sertleştirici B",
    code: "HRD-HB-B",
    unit: "kg",
    currentStock: 95,
    minStock: 100,
    reorderLevel: 150,
    unitCost: 310,
    supplier: "ChemTech Ltd.",
    location: "Tank-08 / İstanbul Üretim",
  },
  {
    id: "raw-hardener-emprenye-b",
    type: "hardener",
    name: "Emprenye Sertleştirici B",
    code: "HRD-EM-B",
    unit: "kg",
    currentStock: 320,
    minStock: 100,
    reorderLevel: 150,
    unitCost: 185,
    supplier: "ChemTech Ltd.",
    location: "Tank-09 / İstanbul Üretim",
  },
  {
    id: "raw-hardener-coating-b",
    type: "hardener",
    name: "Coating Sertleştirici B",
    code: "HRD-CT-B",
    unit: "kg",
    currentStock: 290,
    minStock: 100,
    reorderLevel: 150,
    unitCost: 155,
    supplier: "ChemTech Ltd.",
    location: "Tank-10 / İstanbul Üretim",
  },

  // === Pigmentler ===
  {
    id: "raw-pigment-ocean-blue",
    type: "pigment",
    name: "Pigment — Ocean Blue",
    code: "PG-OCB",
    unit: "lt",
    currentStock: 68,
    minStock: 20,
    reorderLevel: 30,
    unitCost: 740,
    supplier: "Sun Chem GmbH",
    location: "Raf-A1 / Pigment Deposu",
  },
  {
    id: "raw-pigment-walnut",
    type: "pigment",
    name: "Pigment — Walnut Brown",
    code: "PG-WLN",
    unit: "lt",
    currentStock: 42,
    minStock: 15,
    reorderLevel: 25,
    unitCost: 680,
    supplier: "Sun Chem GmbH",
    location: "Raf-A2 / Pigment Deposu",
  },
  {
    id: "raw-pigment-gold",
    type: "pigment",
    name: "Metalik Pigment — Gold",
    code: "PG-GLD",
    unit: "lt",
    currentStock: 18,
    minStock: 10,
    reorderLevel: 20,
    unitCost: 1240,
    supplier: "Sun Chem GmbH",
    location: "Raf-A3 / Pigment Deposu",
  },

  // === Katkı kimyasalları ===
  {
    id: "raw-additive-uv",
    type: "additive",
    name: "UV Stabilizer Katkı",
    code: "ADD-UV",
    unit: "kg",
    currentStock: 140,
    minStock: 30,
    reorderLevel: 60,
    unitCost: 980,
    supplier: "BASF",
    location: "Raf-B1 / Katkı Deposu",
  },
  {
    id: "raw-additive-defoamer",
    type: "additive",
    name: "Kabarcık Giderici (Defoamer)",
    code: "ADD-DEF",
    unit: "lt",
    currentStock: 88,
    minStock: 20,
    reorderLevel: 40,
    unitCost: 720,
    supplier: "BASF",
    location: "Raf-B2 / Katkı Deposu",
  },

  // === Ambalaj ===
  {
    id: "raw-pack-1_5",
    type: "packaging",
    name: "1.5 kg Set Ambalajı",
    code: "PK-1_5",
    unit: "adet",
    currentStock: 1240,
    minStock: 400,
    reorderLevel: 600,
    unitCost: 14,
    supplier: "Resin Pack",
    location: "Raf-C1 / Ambalaj Deposu",
  },
  {
    id: "raw-pack-3",
    type: "packaging",
    name: "3 kg Set Ambalajı",
    code: "PK-3",
    unit: "adet",
    currentStock: 980,
    minStock: 300,
    reorderLevel: 500,
    unitCost: 22,
    supplier: "Resin Pack",
    location: "Raf-C2 / Ambalaj Deposu",
  },
  {
    id: "raw-pack-7_5",
    type: "packaging",
    name: "7.5 kg Set Ambalajı",
    code: "PK-7_5",
    unit: "adet",
    currentStock: 560,
    minStock: 200,
    reorderLevel: 320,
    unitCost: 38,
    supplier: "Resin Pack",
    location: "Raf-C3 / Ambalaj Deposu",
  },
  {
    id: "raw-pack-15",
    type: "packaging",
    name: "15 kg Set Ambalajı",
    code: "PK-15",
    unit: "adet",
    currentStock: 320,
    minStock: 100,
    reorderLevel: 180,
    unitCost: 64,
    supplier: "Resin Pack",
    location: "Raf-C4 / Ambalaj Deposu",
  },
];

/** Stok hareketi (giriş/çıkış) */
export interface StockMovement {
  id: string;
  rawMaterialId: string;
  date: string; // ISO
  type: "in" | "out" | "adjust";
  quantity: number;
  reason: string;
  reference?: string; // Sipariş no, irsaliye no vb.
}

export const stockMovements: StockMovement[] = [
  {
    id: "mv-1",
    rawMaterialId: "raw-resin-clear-a",
    date: "2026-06-06T09:00:00.000Z",
    type: "in",
    quantity: 800,
    reason: "Tedarikçi sevkiyatı",
    reference: "İRS-2026-1142",
  },
  {
    id: "mv-2",
    rawMaterialId: "raw-resin-clear-a",
    date: "2026-06-06T14:23:00.000Z",
    type: "out",
    quantity: 10,
    reason: "Sipariş üretimi",
    reference: "RES-2026-00#4421",
  },
  {
    id: "mv-3",
    rawMaterialId: "raw-hardener-hobi-b",
    date: "2026-06-05T11:10:00.000Z",
    type: "out",
    quantity: 35,
    reason: "Sipariş üretimi",
    reference: "RES-2026-00#4417",
  },
  {
    id: "mv-4",
    rawMaterialId: "raw-pigment-gold",
    date: "2026-06-04T15:00:00.000Z",
    type: "adjust",
    quantity: -2,
    reason: "Sayım farkı düzeltme",
  },
];

export function getRawMaterialById(id: string): RawMaterial | undefined {
  return rawMaterials.find((r) => r.id === id);
}

/** Stok durumu */
export type StockStatus = "ok" | "low" | "critical" | "out";

export function stockStatus(material: RawMaterial): StockStatus {
  if (material.currentStock <= 0) return "out";
  if (material.currentStock <= material.minStock) return "critical";
  if (material.currentStock <= material.reorderLevel) return "low";
  return "ok";
}

/** Stok durumu için Tailwind renk sınıfları */
export const STOCK_STATUS_LABEL: Record<StockStatus, string> = {
  ok: "Stokta",
  low: "Düşük",
  critical: "Kritik",
  out: "Bitti",
};

export const STOCK_STATUS_COLOR: Record<StockStatus, string> = {
  ok: "#16A34A",
  low: "#D4AF37",
  critical: "#DC2626",
  out: "#7F1D1D",
};
