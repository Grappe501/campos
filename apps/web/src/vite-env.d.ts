/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  /** Public site origin for magic-link redirects (no trailing slash), e.g. https://campose.netlify.app */
  readonly VITE_APP_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
