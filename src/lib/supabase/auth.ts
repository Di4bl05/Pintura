import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function requireAdminFromRequest(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return { ok: false, status: 401, error: "Missing auth token" } as const;
  }

  const token = authorization.replace("Bearer ", "").trim();
  const adminClient = createSupabaseAdminClient();

  const { data: userData, error: userError } = await adminClient.auth.getUser(token);

  if (userError || !userData.user) {
    return { ok: false, status: 401, error: "Invalid auth token" } as const;
  }

  const { data: adminProfile, error: adminError } = await adminClient
    .from("admin_profiles")
    .select("id, role")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (adminError || !adminProfile || adminProfile.role !== "admin") {
    return { ok: false, status: 403, error: "Admin access required" } as const;
  }

  return { ok: true, userId: userData.user.id } as const;
}
