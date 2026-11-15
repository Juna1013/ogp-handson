// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // og:image は絶対URLで出力する必要があるため、公開先の URL を設定する。
  site: 'https://example.com',
  integrations: [react()]
});