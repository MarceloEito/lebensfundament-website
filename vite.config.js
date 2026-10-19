import { existsSync } from 'node:fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Only allow the services the site actually uses. Added to the production
// build only: the dev server needs an inline script for hot reloading.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  'frame-src https://www.google.com',
  "connect-src 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "base-uri 'self'"
].join('; ');

const contentSecurityPolicy = {
  name: 'content-security-policy',
  apply: 'build',
  transformIndexHtml: () => [
    {
      tag: 'meta',
      attrs: { 'http-equiv': 'Content-Security-Policy', content: CONTENT_SECURITY_POLICY },
      injectTo: 'head-prepend'
    }
  ]
};

// The dev server does not serve public/<folder>/index.html for "/<folder>/"
// (static hosts do), so the Impressum and Datenschutz pages would show the
// app instead. Rewrite those URLs during development.
const staticFolderPages = {
  name: 'static-folder-pages',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const match = req.url && req.url.match(/^\/([\w-]+)\/?(\?.*)?$/);
      if (match && existsSync(`public/${match[1]}/index.html`)) {
        req.url = `/${match[1]}/index.html`;
      }
      next();
    });
  }
};

// Link previews (WhatsApp, Signal, Facebook …) need absolute URLs. The deploy
// workflow sets SITE_URL; locally it can go into .env. Builds without it are
// kept out of search engines.
const sharePreview = (siteUrl) => ({
  name: 'share-preview',
  transformIndexHtml(html) {
    const tags = !siteUrl
      ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex' }, injectTo: 'head' }]
      : [];
    return { html: html.replaceAll('%SITE_URL%', siteUrl.replace(/\/$/, '')), tags };
  },
  buildStart() {
    if (!siteUrl) {
      this.warn('SITE_URL is not set: link previews will use relative URLs.');
    }
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      contentSecurityPolicy,
      staticFolderPages,
      sharePreview(env.SITE_URL || '')
    ],
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'build'
    }
  };
});
