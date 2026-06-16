/**
 * Sepet (Cart) Store
 * Basit, localStorage tabanlı, kütüphane bağımsız store.
 * - addToCart, removeFromCart, updateQuantity, clearCart
 * - useCart() hook: items, totalCount, subtotal, mutasyon fonksiyonları
 * - Custom event `cart:change` ile sayfa içi senkronizasyon (header rozet vb.)
 */

"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "resinova-cart-v1";
const CHANGE_EVENT = "cart:change";
export const CART_OPEN_EVENT = "cart:open";

export interface CartItem {
  /** Ürün slug */
  productSlug: string;
  /** Set / varyant id (sets.ts -> EpoxySet.id) — yoksa "default" */
  setId: string;
  /** Görüntü adı */
  name: string;
  /** Varyant etiketi — "1.5 kg Set" */
  size: string;
  /** Birim fiyat */
  unitPrice: number;
  /** Adet */
  quantity: number;
  /** Görsel */
  image: string;
}

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

/** Sepete ürün ekle — varsa miktarı arttır, drawer'ı açar */
export function addToCart(item: CartItem): void {
  const items = readStorage();
  const key = `${item.productSlug}::${item.setId}`;
  const idx = items.findIndex(
    (i) => `${i.productSlug}::${i.setId}` === key
  );
  if (idx >= 0) {
    items[idx] = { ...items[idx], quantity: items[idx].quantity + item.quantity };
  } else {
    items.push(item);
  }
  writeStorage(items);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CART_OPEN_EVENT, { detail: { slug: item.productSlug } }));
  }
}

/** Birden fazla ürünü topluca ekle (akıllı hesaplayıcı çıktısı) */
export function addManyToCart(itemsToAdd: CartItem[]): void {
  const items = readStorage();
  for (const item of itemsToAdd) {
    const key = `${item.productSlug}::${item.setId}`;
    const idx = items.findIndex(
      (i) => `${i.productSlug}::${i.setId}` === key
    );
    if (idx >= 0) {
      items[idx] = { ...items[idx], quantity: items[idx].quantity + item.quantity };
    } else {
      items.push(item);
    }
  }
  writeStorage(items);
}

export function removeFromCart(productSlug: string, setId: string): void {
  const items = readStorage().filter(
    (i) => !(i.productSlug === productSlug && i.setId === setId)
  );
  writeStorage(items);
}

export function updateQuantity(
  productSlug: string,
  setId: string,
  quantity: number
): void {
  if (quantity <= 0) {
    removeFromCart(productSlug, setId);
    return;
  }
  const items = readStorage().map((i) =>
    i.productSlug === productSlug && i.setId === setId
      ? { ...i, quantity }
      : i
  );
  writeStorage(items);
}

export function clearCart(): void {
  writeStorage([]);
}

/** React hook'u — items, totalCount, subtotal, mutasyon API'leri */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const sync = useCallback(() => {
    setItems(readStorage());
  }, []);

  useEffect(() => {
    sync();
    const handler = () => sync();
    window.addEventListener(CHANGE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, [sync]);

  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);

  return {
    items,
    totalCount,
    subtotal,
    add: addToCart,
    addMany: addManyToCart,
    remove: removeFromCart,
    updateQty: updateQuantity,
    clear: clearCart,
  };
}
