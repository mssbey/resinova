/**
 * Wishlist (Favoriler) Store (V3)
 *
 * Login olmayan kullanıcılar için localStorage; login olunca aynı slug listesi
 * ileride backend ile sync'e hazır olacak şekilde tek API üzerinden yönetilir.
 */

"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "resinova-wishlist-v1";
const CHANGE_EVENT = "wishlist:change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function write(list: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function addToWishlist(slug: string): void {
  const list = read();
  if (!list.includes(slug)) {
    write([...list, slug]);
  }
}

export function removeFromWishlist(slug: string): void {
  write(read().filter((s) => s !== slug));
}

export function toggleWishlist(slug: string): boolean {
  const list = read();
  const exists = list.includes(slug);
  if (exists) {
    write(list.filter((s) => s !== slug));
    return false;
  }
  write([...list, slug]);
  return true;
}

export function clearWishlist(): void {
  write([]);
}

export function bulkRemoveFromWishlist(slugs: string[]): void {
  const set = new Set(slugs);
  write(read().filter((s) => !set.has(s)));
}

export function useWishlist() {
  const [items, setItems] = useState<string[]>([]);

  const sync = useCallback(() => {
    setItems(read());
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

  const isInWishlist = useCallback(
    (slug: string) => items.includes(slug),
    [items]
  );

  return {
    items,
    count: items.length,
    isInWishlist,
    add: addToWishlist,
    remove: removeFromWishlist,
    toggle: toggleWishlist,
    bulkRemove: bulkRemoveFromWishlist,
    clear: clearWishlist,
  };
}
