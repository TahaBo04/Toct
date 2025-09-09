// src/lib/api.ts
export const BASE = process.env.NEXT_PUBLIC_API_BASE || "https://toct-backend.onrender.com";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    cache: "no-store",
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) }
  });
  if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText));
  return res.json() as Promise<T>;
}
