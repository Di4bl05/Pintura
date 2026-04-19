"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export async function getAdminAccessToken() {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function adminFetch(input: string, init: RequestInit = {}) {
  const token = await getAdminAccessToken();

  if (!token) {
    throw new Error("No active session");
  }

  const headers = new Headers(init.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(input, {
    ...init,
    headers,
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.error || "Request failed");
  }

  return payload;
}
