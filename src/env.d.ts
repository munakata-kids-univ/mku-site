/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MICROCMS_SERVICE_DOMAIN: string;
  readonly MICROCMS_API_KEY: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_TITLE?: string;
  readonly PUBLIC_SITE_DESCRIPTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}