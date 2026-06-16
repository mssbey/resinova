/**
 * Account Store (V3)
 *
 * Hesabım merkezindeki adresler, oturum cihazları, 2FA durumu gibi
 * istemci-yan state'leri localStorage üzerinden yönetir.
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { seedAddresses, type Address } from "@/data/addresses";
import type { DeviceSession } from "@/data/auth";

/* ───────────────── ADDRESSES ───────────────── */

const ADDR_KEY = "resinova-addresses-v1";
const ADDR_EVENT = "addresses:change";

function readAddresses(): Address[] {
  if (typeof window === "undefined") return seedAddresses;
  try {
    const raw = window.localStorage.getItem(ADDR_KEY);
    if (!raw) return seedAddresses;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Address[]) : seedAddresses;
  } catch {
    return seedAddresses;
  }
}

function writeAddresses(list: Address[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADDR_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(ADDR_EVENT));
}

export function useAddresses(userId?: string) {
  const [items, setItems] = useState<Address[]>([]);

  const sync = useCallback(() => {
    const all = readAddresses();
    setItems(userId ? all.filter((a) => a.userId === userId) : all);
  }, [userId]);

  useEffect(() => {
    sync();
    const handler = () => sync();
    window.addEventListener(ADDR_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(ADDR_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, [sync]);

  const upsert = useCallback((address: Address) => {
    const all = readAddresses();
    const idx = all.findIndex((a) => a.id === address.id);
    if (idx >= 0) {
      all[idx] = address;
    } else {
      all.push(address);
    }
    writeAddresses(all);
  }, []);

  const remove = useCallback((id: string) => {
    writeAddresses(readAddresses().filter((a) => a.id !== id));
  }, []);

  const setDefault = useCallback((id: string, type: Address["type"]) => {
    const all = readAddresses().map((a) =>
      a.userId === userId && a.type === type
        ? { ...a, isDefault: a.id === id }
        : a
    );
    writeAddresses(all);
  }, [userId]);

  return { items, upsert, remove, setDefault };
}

/* ───────────────── DEVICE SESSIONS ───────────────── */

export const demoDeviceSessions: DeviceSession[] = [
  {
    id: "dev-1",
    device: "Chrome 128 • Windows 11",
    location: "İstanbul, TR",
    ip: "78.165.•.•",
    lastSeen: "Şu an",
    current: true,
  },
  {
    id: "dev-2",
    device: "Safari Mobile • iPhone 15",
    location: "İstanbul, TR",
    ip: "176.42.•.•",
    lastSeen: "2 gün önce",
  },
  {
    id: "dev-3",
    device: "Firefox 122 • macOS",
    location: "Ankara, TR",
    ip: "85.110.•.•",
    lastSeen: "1 hafta önce",
  },
];

/* ───────────────── 2FA STATE ───────────────── */

const TFA_KEY = "resinova-tfa-v1";

export function get2FAEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(TFA_KEY) === "1";
}

export function set2FAEnabled(value: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TFA_KEY, value ? "1" : "0");
}
