import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Plugin to make CSS non-render-blocking (critical for Lighthouse performance)
function nonBlockingCss() {
  return {
    name: 'non-blocking-css',
    transformIndexHtml(html: string) {
      return html.replace(
        /<link rel="stylesheet"([^>]*)>/g,
        '<link rel="stylesheet"$1 media="print" onload="this.media=\'all\'">'
      )
    },
  }
}

// Plugin to auto-inject font-display: swap into all @font-face rules
// Ensures text remains visible during web font loading (prevents FOUT/FOIT)
function fontDisplaySwap() {
  return {
    name: 'font-display-swap',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.endsWith('.css') && !id.endsWith('.scss') && !id.endsWith('.less')) return null
      // Add font-display: swap to @font-face rules that don't already have it
      const result = code.replace(
        /(@font-face\s*\{[^}]*?)(\s*\})/g,
        (match, rules: string, closing: string) => {
          if (/font-display\s*:/.test(rules)) return match // already has font-display
          return rules + ' font-display: swap;' + closing
        }
      )
      return result === code ? null : { code, map: null }
    },
  }
}

export default defineConfig({
  plugins: [vue(), nonBlockingCss(), fontDisplaySwap()],
  base: import.meta.env.VITE_BASE_URL || '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    devSourcemap: false,
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    cssMinify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    esbuildOptions: {
      drop: ['console', 'debugger'],
      pure: ['console.log', 'console.info'],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
})
