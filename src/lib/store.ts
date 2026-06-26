"use client";

// Simple client-side auth state for demo
// In production, use NextAuth.js or similar

export function getUser() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("ai-zhihang-user");
  return data ? JSON.parse(data) : null;
}

export function setUser(user: { name: string; email: string }) {
  localStorage.setItem("ai-zhihang-user", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("ai-zhihang-user");
}

export function isLoggedIn() {
  return !!getUser();
}
