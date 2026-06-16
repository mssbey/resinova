/**
 * Auth Store (V3)
 *
 * Demo amaçlı localStorage tabanlı oturum yönetimi.
 * Üretimde NextAuth/Auth.js + JWT/Session ile değiştirilecek.
 *
 * - useAuth() hook → { user, isAuthed, login, logout, register }
 * - Role-based gate için useRequireAuth(redirect) helper
 * - Custom event "auth:change" ile header & private layout senkronu
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { DEMO_USERS, type UserSession, type UserRole } from "@/data/auth";

const STORAGE_KEY = "resinova-auth-v1";
const REMEMBER_KEY = "resinova-auth-remember";
const CHANGE_EVENT = "auth:change";

function readSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserSession;
  } catch {
    return null;
  }
}

function writeSession(user: UserSession | null, remember = true): void {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    window.localStorage.setItem(REMEMBER_KEY, remember ? "1" : "0");
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(REMEMBER_KEY);
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export interface LoginResult {
  ok: boolean;
  error?: string;
  user?: UserSession;
}

export function login(
  email: string,
  password: string,
  remember = true
): LoginResult {
  const found = DEMO_USERS.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.password === password
  );
  if (!found) {
    return { ok: false, error: "E-posta veya şifre hatalı" };
  }
  // password alanını oturuma yazma
  const { password: _pw, ...session } = found;
  void _pw;
  writeSession(session, remember);
  return { ok: true, user: session };
}

export interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export function register(input: RegisterInput): LoginResult {
  if (
    DEMO_USERS.some(
      (u) => u.email.toLowerCase() === input.email.toLowerCase().trim()
    )
  ) {
    return { ok: false, error: "Bu e-posta zaten kayıtlı" };
  }
  const newUser: UserSession = {
    id: `user-${Date.now()}`,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    role: "CUSTOMER",
    emailVerified: false,
    createdAt: new Date().toISOString().split("T")[0],
  };
  writeSession(newUser, true);
  return { ok: true, user: newUser };
}

export function logout(): void {
  writeSession(null);
}

export function updateProfile(patch: Partial<UserSession>): UserSession | null {
  const current = readSession();
  if (!current) return null;
  const next = { ...current, ...patch };
  writeSession(next);
  return next;
}

export function hasRole(user: UserSession | null, role: UserRole): boolean {
  return !!user && user.role === role;
}

export function useAuth() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [ready, setReady] = useState(false);

  const sync = useCallback(() => {
    setUser(readSession());
    setReady(true);
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

  return {
    user,
    ready,
    isAuthed: !!user,
    role: user?.role ?? null,
    login,
    register,
    logout,
    updateProfile,
  };
}
