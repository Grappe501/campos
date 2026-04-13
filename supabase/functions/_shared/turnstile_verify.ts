/**
 * Cloudflare Turnstile server verification for public intake.
 * Secret stays in Edge env (TURNSTILE_SECRET_KEY); never in the client bundle.
 * If the secret is unset, verification is skipped (rate limiting still applies).
 */

function tsLog(
  level: "info" | "warn" | "error",
  msg: string,
  extra?: Record<string, unknown>,
): void {
  const line = JSON.stringify({
    level,
    msg,
    ...extra,
    ts: new Date().toISOString(),
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; code: string; message: string; status: number };

/**
 * When TURNSTILE_SECRET_KEY is set, requires a valid token from siteverify.
 * When unset, returns ok (field-test / dev without Turnstile keys).
 */
export async function verifyTurnstileIfConfigured(
  token: string | null | undefined,
  remoteIp: string,
  correlationId: string,
): Promise<TurnstileVerifyResult> {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY")?.trim();
  if (!secret) {
    tsLog("info", "turnstile verification skipped (no TURNSTILE_SECRET_KEY)", {
      correlationId,
      event: "volunteer_intake_turnstile_skipped",
    });
    return { ok: true };
  }

  const t = typeof token === "string" ? token.trim() : "";
  if (!t) {
    return {
      ok: false,
      code: "TURNSTILE_REQUIRED",
      message: "Complete the verification step and try again.",
      status: 400,
    };
  }

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", t);
  if (remoteIp && remoteIp !== "unknown") {
    params.set("remoteip", remoteIp);
  }

  let res: Response;
  try {
    res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      },
    );
  } catch {
    tsLog("error", "turnstile siteverify fetch failed", {
      correlationId,
      event: "volunteer_intake_turnstile_error",
    });
    return {
      ok: false,
      code: "INTERNAL",
      message: "Could not verify request. Try again in a moment.",
      status: 503,
    };
  }

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    "error-codes"?: string[];
  };

  if (!data.success) {
    tsLog("warn", "turnstile verification failed", {
      correlationId,
      event: "volunteer_intake_turnstile_rejected",
      codes: data["error-codes"],
    });
    return {
      ok: false,
      code: "TURNSTILE_FAILED",
      message: "Verification could not be confirmed. Please try again.",
      status: 400,
    };
  }

  tsLog("info", "turnstile verification ok", {
    correlationId,
    event: "volunteer_intake_turnstile_ok",
  });
  return { ok: true };
}
