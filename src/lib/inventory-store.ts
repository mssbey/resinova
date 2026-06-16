"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Warehouse,
  StockEntry,
  StockReservation,
  WarehouseTransfer,
  warehouses as defaultWarehouses,
  initialStocks,
  RESERVATION_MINUTES,
} from "@/data/warehouses";

const KEYS = {
  warehouses: "resinova-warehouses-v1",
  stocks: "resinova-stocks-v1",
  reservations: "resinova-reservations-v1",
  transfers: "resinova-transfers-v1",
};

const CHANGE_EVENT = "inventory:change";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

function initIfEmpty(): void {
  if (typeof window === "undefined") return;
  if (!window.localStorage.getItem(KEYS.warehouses)) {
    write(KEYS.warehouses, defaultWarehouses);
  }
  if (!window.localStorage.getItem(KEYS.stocks)) {
    write(KEYS.stocks, initialStocks);
  }
  if (!window.localStorage.getItem(KEYS.reservations)) {
    write(KEYS.reservations, []);
  }
  if (!window.localStorage.getItem(KEYS.transfers)) {
    write(KEYS.transfers, []);
  }
}

// ─── Warehouses ──────────────────────────────────────────────────────────────

export function getWarehouses(): Warehouse[] {
  initIfEmpty();
  return read<Warehouse[]>(KEYS.warehouses, defaultWarehouses);
}

export function createWarehouse(data: Omit<Warehouse, "id" | "createdAt">): Warehouse {
  const warehouses = getWarehouses();
  const wh: Warehouse = {
    ...data,
    id: `wh-${Date.now()}`,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  write(KEYS.warehouses, [...warehouses, wh]);
  return wh;
}

export function updateWarehouse(id: string, data: Partial<Warehouse>): void {
  const warehouses = getWarehouses().map((w) => (w.id === id ? { ...w, ...data } : w));
  write(KEYS.warehouses, warehouses);
}

export function deleteWarehouse(id: string): void {
  write(KEYS.warehouses, getWarehouses().filter((w) => w.id !== id));
  write(KEYS.stocks, getStocks().filter((s) => s.warehouseId !== id));
}

// ─── Stocks ──────────────────────────────────────────────────────────────────

export function getStocks(): StockEntry[] {
  initIfEmpty();
  return read<StockEntry[]>(KEYS.stocks, initialStocks);
}

export function getStockForProduct(productId: string): StockEntry[] {
  return getStocks().filter((s) => s.productId === productId);
}

export function getStockForWarehouse(warehouseId: string): StockEntry[] {
  return getStocks().filter((s) => s.warehouseId === warehouseId);
}

export function adjustStock(productId: string, warehouseId: string, delta: number): void {
  const stocks = getStocks();
  const idx = stocks.findIndex(
    (s) => s.productId === productId && s.warehouseId === warehouseId
  );
  if (idx >= 0) {
    stocks[idx] = { ...stocks[idx], quantity: Math.max(0, stocks[idx].quantity + delta) };
  } else {
    stocks.push({ id: `s-${Date.now()}`, productId, warehouseId, quantity: Math.max(0, delta) });
  }
  write(KEYS.stocks, stocks);
}

// ─── Reservations ────────────────────────────────────────────────────────────

export function getReservations(): StockReservation[] {
  initIfEmpty();
  const all = read<StockReservation[]>(KEYS.reservations, []);
  const now = Date.now();
  const active = all.filter((r) => new Date(r.expiresAt).getTime() > now);
  if (active.length !== all.length) write(KEYS.reservations, active);
  return active;
}

export function createReservation(
  productId: string,
  orderId: string,
  quantity: number
): StockReservation {
  const reservation: StockReservation = {
    id: `res-${Date.now()}`,
    productId,
    orderId,
    quantity,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + RESERVATION_MINUTES * 60 * 1000).toISOString(),
  };
  const existing = read<StockReservation[]>(KEYS.reservations, []);
  write(KEYS.reservations, [...existing, reservation]);
  return reservation;
}

export function releaseReservation(reservationId: string): void {
  write(
    KEYS.reservations,
    read<StockReservation[]>(KEYS.reservations, []).filter((r) => r.id !== reservationId)
  );
}

export function getReservedQuantity(productId: string): number {
  return getReservations()
    .filter((r) => r.productId === productId)
    .reduce((acc, r) => acc + r.quantity, 0);
}

export function getAvailableStock(productId: string): number {
  const total = getStocks()
    .filter((s) => s.productId === productId)
    .reduce((acc, s) => acc + s.quantity, 0);
  return Math.max(0, total - getReservedQuantity(productId));
}

// ─── Transfers ───────────────────────────────────────────────────────────────

export function getTransfers(): WarehouseTransfer[] {
  initIfEmpty();
  return read<WarehouseTransfer[]>(KEYS.transfers, []);
}

export function createTransfer(data: Omit<WarehouseTransfer, "id" | "createdAt">): WarehouseTransfer {
  const transfer: WarehouseTransfer = {
    ...data,
    id: `tr-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  adjustStock(data.productId, data.fromWarehouseId, -data.quantity);
  adjustStock(data.productId, data.toWarehouseId, data.quantity);
  write(KEYS.transfers, [...getTransfers(), transfer]);
  return transfer;
}

// ─── React hooks ─────────────────────────────────────────────────────────────

export function useInventory() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [stocks, setStocks] = useState<StockEntry[]>([]);
  const [reservations, setReservations] = useState<StockReservation[]>([]);
  const [transfers, setTransfers] = useState<WarehouseTransfer[]>([]);

  const sync = useCallback(() => {
    setWarehouses(getWarehouses());
    setStocks(getStocks());
    setReservations(getReservations());
    setTransfers(getTransfers());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  const totalStock = stocks.reduce((acc, s) => acc + s.quantity, 0);
  const totalReserved = reservations.reduce((acc, r) => acc + r.quantity, 0);
  const totalAvailable = Math.max(0, totalStock - totalReserved);

  return {
    warehouses,
    stocks,
    reservations,
    transfers,
    totalStock,
    totalReserved,
    totalAvailable,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    adjustStock,
    createReservation,
    releaseReservation,
    getAvailableStock,
    createTransfer,
    sync,
  };
}
