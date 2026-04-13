/**
 * Shared helpers: resolve Supabase Auth user from request JWT and map email → volunteer.
 */

import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import type { User } from "https://esm.sh/@supabase/supabase-js@2.49.8";

export const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export async function getUserFromRequest(
  req: Request,
  supabaseUrl: string,
  anonKey: string,
): Promise<User | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user?.email) return null;
  return user;
}

/**
 * Canonical person path first (person_contact_methods), then volunteers.email (case-insensitive).
 */
export async function resolveVolunteerIdForEmail(
  admin: SupabaseClient,
  email: string,
): Promise<number | null> {
  const normalized = email.trim().toLowerCase();

  const { data: contactRow } = await admin
    .from("person_contact_methods")
    .select("person_id")
    .eq("contact_type", "email")
    .eq("contact_value", normalized)
    .maybeSingle();

  if (contactRow?.person_id) {
    const { data: vols } = await admin
      .from("volunteers")
      .select("id")
      .eq("person_id", contactRow.person_id)
      .order("id", { ascending: false })
      .limit(1);
    if (vols?.length) return vols[0].id;
  }

  const { data: byVolunteerEmail } = await admin
    .from("volunteers")
    .select("id")
    .ilike("email", normalized)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  return byVolunteerEmail?.id ?? null;
}
