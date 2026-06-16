export interface Warehouse {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  managerName: string;
  isActive: boolean;
  createdAt: string;
}

export interface StockEntry {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
}

export interface StockReservation {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  expiresAt: string;
  createdAt: string;
}

export interface WarehouseTransfer {
  id: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  productId: string;
  quantity: number;
  createdBy: string;
  createdAt: string;
  note?: string;
}

export const warehouses: Warehouse[] = [
  {
    id: "wh-istanbul",
    name: "İstanbul Depo",
    city: "İstanbul",
    address: "Hadımköy OSB, Kapadokya Cad. No:12, Arnavutköy / İstanbul",
    phone: "+90 212 555 10 20",
    managerName: "Kemal Şahin",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "wh-ankara",
    name: "Ankara Depo",
    city: "Ankara",
    address: "Ostim OSB, 100. Yıl Bulvarı No:45, Yenimahalle / Ankara",
    phone: "+90 312 555 30 40",
    managerName: "Elif Çelik",
    isActive: true,
    createdAt: "2024-03-20",
  },
  {
    id: "wh-izmir",
    name: "İzmir Depo",
    city: "İzmir",
    address: "Atatürk OSB, Çiğli Bulvarı No:78, Çiğli / İzmir",
    phone: "+90 232 555 50 60",
    managerName: "Barış Yıldız",
    isActive: true,
    createdAt: "2024-06-10",
  },
];

export const initialStocks: StockEntry[] = [
  // İstanbul
  { id: "s1", productId: "pro-clear-ultra", warehouseId: "wh-istanbul", quantity: 120 },
  { id: "s2", productId: "deep-pour-max", warehouseId: "wh-istanbul", quantity: 85 },
  { id: "s3", productId: "hobi-crystal", warehouseId: "wh-istanbul", quantity: 210 },
  { id: "s4", productId: "uv-resin-pro", warehouseId: "wh-istanbul", quantity: 34 },
  { id: "s5", productId: "metalik-pigment-set", warehouseId: "wh-istanbul", quantity: 7 },
  // Ankara
  { id: "s6", productId: "pro-clear-ultra", warehouseId: "wh-ankara", quantity: 60 },
  { id: "s7", productId: "deep-pour-max", warehouseId: "wh-ankara", quantity: 40 },
  { id: "s8", productId: "hobi-crystal", warehouseId: "wh-ankara", quantity: 95 },
  { id: "s9", productId: "uv-resin-pro", warehouseId: "wh-ankara", quantity: 18 },
  { id: "s10", productId: "metalik-pigment-set", warehouseId: "wh-ankara", quantity: 3 },
  // İzmir
  { id: "s11", productId: "pro-clear-ultra", warehouseId: "wh-izmir", quantity: 45 },
  { id: "s12", productId: "deep-pour-max", warehouseId: "wh-izmir", quantity: 25 },
  { id: "s13", productId: "hobi-crystal", warehouseId: "wh-izmir", quantity: 70 },
  { id: "s14", productId: "uv-resin-pro", warehouseId: "wh-izmir", quantity: 12 },
  { id: "s15", productId: "metalik-pigment-set", warehouseId: "wh-izmir", quantity: 2 },
];

export const CRITICAL_STOCK_THRESHOLD = 10;
export const RESERVATION_MINUTES = 15;
