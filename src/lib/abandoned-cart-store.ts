"use client";

import { useEffect, useState, useCallback } from "react";
import { CartItem, useCart } from "@/lib/cart-store";

const ABANDONED_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = "resinova-abandoned-carts-v1";
const ACTIVITY_KEY = "resinova-cart-last-activity";
const CHANGE_EVENT = "abandoned-cart:change";

export type AbandonedCartStatus = "active" | "abandoned" | "recovered" | "converted";

export interface AbandonedCart {
  id: string;
  customerId: string | null;
  customerName: string;
  customerEmail: string;
  cartValue: number;
  productCount: number;
  products: CartItem[];
  lastActivity: string;
  status: AbandonedCartStatus;
  createdAt: string;
}

function readCarts(): AbandonedCart[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCarts(carts: AbandonedCart[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(carts));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function recordCartActivity(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACTIVITY_KEY, Date.now().toString());
}

export function getLastActivity(): number {
  if (typeof window === "undefined") return Date.now();
  return Number(window.localStorage.getItem(ACTIVITY_KEY) ?? Date.now());
}

export function checkAndMarkAbandoned(
  items: CartItem[],
  subtotal: number
): void {
  if (items.length === 0) return;
  const lastActivity = getLastActivity();
  const elapsed = Date.now() - lastActivity;
  if (elapsed < ABANDONED_TIMEOUT_MS) return;

  const carts = readCarts();
  const alreadyLogged = carts.some(
    (c) =>
      c.status !== "recovered" &&
      c.status !== "converted" &&
      c.cartValue === subtotal &&
      c.productCount === items.length
  );
  if (alreadyLogged) return;

  const abandoned: AbandonedCart = {
    id: `ac-${Date.now()}`,
    customerId: null,
    customerName: "Misafir",
    customerEmail: "",
    cartValue: subtotal,
    productCount: items.length,
    products: items,
    lastActivity: new Date(lastActivity).toISOString(),
    status: "abandoned",
    createdAt: new Date().toISOString(),
  };
  writeCarts([...carts, abandoned]);
}

export function getAbandonedCarts(): AbandonedCart[] {
  return readCarts();
}

export function updateAbandonedCartStatus(
  id: string,
  status: AbandonedCartStatus
): void {
  writeCarts(readCarts().map((c) => (c.id === id ? { ...c, status } : c)));
}

export function addManualAbandonedCart(
  cart: Omit<AbandonedCart, "id" | "createdAt">
): void {
  const entry: AbandonedCart = {
    ...cart,
    id: `ac-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  writeCarts([...readCarts(), entry]);
}

export function useAbandonedCarts() {
  const [carts, setCarts] = useState<AbandonedCart[]>([]);

  const sync = useCallback(() => setCarts(readCarts()), []);

  useEffect(() => {
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  const totalValue = carts
    .filter((c) => c.status === "abandoned")
    .reduce((acc, c) => acc + c.cartValue, 0);

  return {
    carts,
    totalValue,
    abandoned: carts.filter((c) => c.status === "abandoned"),
    recovered: carts.filter((c) => c.status === "recovered"),
    updateStatus: updateAbandonedCartStatus,
    sync,
  };
}

export function useCartActivityTracker() {
  const { items, subtotal } = useCart();

  useEffect(() => {
    recordCartActivity();
  }, [items]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length > 0) {
        checkAndMarkAbandoned(items, subtotal);
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [items, subtotal]);
}
