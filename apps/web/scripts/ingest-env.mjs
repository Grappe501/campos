#!/usr/bin/env node
/**
 * Interactive helper to build apps/web/.env.local with validated VITE_* values.
 * Run from repo root: npm run env:ingest -w @campos/web
 * Or: cd apps/web && npm run env:ingest
 *
 * Validates:
 * - VITE_SUPABASE_URL — GET /auth/v1/health
 * - VITE_SUPABASE_ANON_KEY — GET /auth/v1/settings with apikey headers
 * - VITE_TURNSTILE_SITE_KEY — optional; format check only (public key)
 */

import { readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as readline from "readline/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = join(__dirname, "..", ".env.local");

const MANAGED = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY",
  "VITE_TURNSTILE_SITE_KEY",
];

function normalizeUrl(raw) {
  const t = raw.trim().replace(/\/+$/, "");
  if (!t) return "";
  return t;
}

async function validateSupabaseUrl(url) {
  const u = normalizeUrl(url);
  if (!u) return { ok: false, error: "Empty URL." };
  if (!/^https:\/\/.+/i.test(u)) {
    return { ok: false, error: "URL should start with https://" };
  }
  try {
    const r = await fetch(`${u}/auth/v1/health`, {
      signal: AbortSignal.timeout(15_000),
    });
    if (!r.ok) {
      return {
        ok: false,
        error: `Health check failed (HTTP ${r.status}). Check project URL.`,
      };
    }
    return { ok: true, url: u };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      error: `Network error: ${msg}. Is the URL correct and reachable?`,
    };
  }
}

async function validateAnonKey(url, anonKey) {
  const u = normalizeUrl(url);
  const k = anonKey.trim();
  if (!k) return { ok: false, error: "Empty anon key." };
  try {
    const r = await fetch(`${u}/auth/v1/settings`, {
      headers: {
        apikey: k,
        Authorization: `Bearer ${k}`,
      },
      signal: AbortSignal.timeout(15_000),
    });
    if (r.status === 401 || r.status === 403) {
      return { ok: false, error: "Key rejected (401/403). Wrong key or project." };
    }
    if (!r.ok) {
      return {
        ok: false,
        error: `Unexpected HTTP ${r.status} when validating anon key.`,
      };
    }
    return { ok: true, key: k };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: `Network error: ${msg}` };
  }
}

function validateTurnstileSiteKey(key) {
  const t = key.trim();
  if (!t) return { ok: true, key: "" };
  if (t.length < 10) {
    return { ok: false, error: "Site key looks too short." };
  }
  return { ok: true, key: t };
}

async function loadManagedFromDisk() {
  const out = {};
  try {
    const raw = await readFile(ENV_PATH, "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(
        /^(VITE_SUPABASE_URL|VITE_SUPABASE_ANON_KEY|VITE_TURNSTILE_SITE_KEY)=(.*)$/,
      );
      if (m) out[m[1]] = m[2].trim();
    }
  } catch {
    /* no file */
  }
  return out;
}

async function writeEnvFile(managed) {
  let rest = "";
  try {
    const raw = await readFile(ENV_PATH, "utf8");
    rest = raw
      .split("\n")
      .filter((line) => {
        const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=/);
        if (!m) return true;
        return !MANAGED.includes(m[1]);
      })
      .join("\n")
      .trim();
  } catch {
    /* no file */
  }

  const lines = [
    "# apps/web/.env.local",
    "# Managed keys written by: npm run env:ingest",
    "",
    `VITE_SUPABASE_URL=${managed.VITE_SUPABASE_URL}`,
    `VITE_SUPABASE_ANON_KEY=${managed.VITE_SUPABASE_ANON_KEY}`,
  ];
  if (managed.VITE_TURNSTILE_SITE_KEY) {
    lines.push(`VITE_TURNSTILE_SITE_KEY=${managed.VITE_TURNSTILE_SITE_KEY}`);
  }
  lines.push("");
  const out = lines.join("\n") + (rest ? `${rest}\n` : "");
  await writeFile(ENV_PATH, out, "utf8");
}

async function promptUntilValid(rl, label, validate, initial) {
  for (;;) {
    const hint =
      initial && initial.length
        ? `\n${label} (Enter to keep current)\n> `
        : `\n${label}\n(paste value, then Enter)\n> `;
    const raw = await rl.question(hint);
    const input = raw.trim();
    const use = input || initial;
    if (!use) {
      console.log("Value required.\n");
      continue;
    }
    const result = await validate(use);
    if (!result.ok) {
      console.log(`\n✗ ${result.error}\n`);
      continue;
    }
    return result;
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`
╔══════════════════════════════════════════════════════════╗
║  CAMPOS — env.local ingestion (apps/web)                 ║
║  Paste values from Supabase Dashboard → Settings → API  ║
╚══════════════════════════════════════════════════════════╝
`);

  const existing = await loadManagedFromDisk();
  const managed = {
    VITE_SUPABASE_URL: existing.VITE_SUPABASE_URL || "",
    VITE_SUPABASE_ANON_KEY: existing.VITE_SUPABASE_ANON_KEY || "",
    VITE_TURNSTILE_SITE_KEY: existing.VITE_TURNSTILE_SITE_KEY || "",
  };

  try {
    const urlResult = await promptUntilValid(
      rl,
      "VITE_SUPABASE_URL — Project URL (e.g. https://xxxx.supabase.co)",
      async (raw) => validateSupabaseUrl(raw),
      managed.VITE_SUPABASE_URL,
    );
    managed.VITE_SUPABASE_URL = urlResult.url;
    await writeEnvFile(managed);
    console.log(`\n✓ URL OK — saved to ${ENV_PATH}\n`);

    const keyResult = await promptUntilValid(
      rl,
      "VITE_SUPABASE_ANON_KEY — anon / public key (not service_role)",
      async (raw) => validateAnonKey(managed.VITE_SUPABASE_URL, raw),
      managed.VITE_SUPABASE_ANON_KEY,
    );
    managed.VITE_SUPABASE_ANON_KEY = keyResult.key;
    await writeEnvFile(managed);
    console.log(`\n✓ Anon key OK — saved to ${ENV_PATH}\n`);

    const tsHint =
      "VITE_TURNSTILE_SITE_KEY — optional (Cloudflare Turnstile site key). Enter to skip.";
    const tsRaw = await rl.question(`\n${tsHint}\n> `);
    const tsTrim = tsRaw.trim();
    if (tsTrim) {
      const ts = validateTurnstileSiteKey(tsTrim);
      if (!ts.ok) {
        console.log(`\n✗ ${ts.error}`);
      } else {
        managed.VITE_TURNSTILE_SITE_KEY = ts.key;
        await writeEnvFile(managed);
        console.log(`\n✓ Turnstile site key saved.\n`);
      }
    } else {
      console.log("\nSkipped Turnstile (optional).\n");
    }

    console.log(`Done. File: ${ENV_PATH}`);
    console.log("Next: npm run dev -w @campos/web\n");
  } finally {
    rl.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
