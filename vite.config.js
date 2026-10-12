import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The sandbox preview proxy forwards requests to this dev server using the
// sandbox hostname, and loads the page from the public preview origin.
// Both must be allowed, but only while running in the Base44 preview so the
// shared config keeps its default behaviour everywhere else.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Bind mounts do not emit native file events reliably inside the sandbox.
    watch: { usePolling: true, interval: 250 },
    allowedHosts: previewMode && sandboxDomain ? ['.' + sandboxDomain] : undefined,
    // The preview is served over HTTPS on port 443 in front of the proxy.
    hmr: previewMode ? { clientPort: 443 } : undefined,
  },
})
