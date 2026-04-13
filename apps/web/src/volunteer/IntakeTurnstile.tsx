import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, params: Record<string, unknown>) => string;
      remove?: (widgetId: string) => void;
    };
  }
}

type Props = {
  siteKey: string;
  onToken: (token: string | null) => void;
};

/**
 * Minimal Cloudflare Turnstile widget (public site key only).
 * Loads api.js once; resets token on expiry/error.
 */
export function IntakeTurnstile({ siteKey, onToken }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  const stableOnToken = useCallback((t: string | null) => {
    onTokenRef.current(t);
  }, []);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let cancelled = false;

    function renderWidget() {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => stableOnToken(token),
        "error-callback": () => stableOnToken(null),
        "expired-callback": () => stableOnToken(null),
      });
    }

    const existing = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]',
    ) as HTMLScriptElement | null;

    if (existing) {
      if (window.turnstile) renderWidget();
      else existing.addEventListener("load", renderWidget);
    } else {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => renderWidget();
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      stableOnToken(null);
      const id = widgetIdRef.current;
      if (id && window.turnstile?.remove) {
        try {
          window.turnstile.remove(id);
        } catch {
          /* ignore */
        }
      }
      widgetIdRef.current = null;
    };
  }, [siteKey, stableOnToken]);

  return (
    <div
      ref={containerRef}
      className="vo-turnstile"
      aria-label="Verification"
    />
  );
}
