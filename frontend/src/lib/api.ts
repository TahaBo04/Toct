// frontend/src/lib/api.ts
// Hardcode the backend URL to remove all env var issues for now.
const BASE = "https://toct-backend.onrender.com"; // ← your backend URL (no trailing slash)

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    mode: "cors",
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}
export default api;
