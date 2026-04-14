/**
 * Target URL for Supabase magic-link redirects (`emailRedirectTo`).
 *
 * When `VITE_APP_ORIGIN` is set (e.g. production Netlify URL), the current path
 * and query are appended so OTP requested from localhost still opens the live site.
 */
export function getEmailRedirectUrl(): string {
  if (typeof window === "undefined") return "";
  const pathWithQuery = `${window.location.pathname}${window.location.search}`;
  const configured = import.meta.env.VITE_APP_ORIGIN?.trim();
  if (configured) {
    const base = configured.replace(/\/$/, "");
    return `${base}${pathWithQuery}`;
  }
  return `${window.location.origin}${pathWithQuery}`;
}
