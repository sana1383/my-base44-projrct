import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
// Read the sandbox host domain from either variable the platform may set
const sandboxDomain =
  process.env.BASE44_SANDBOX_HOST_DOMAIN ||
  process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Allow the preview proxy host in sandbox mode (wildcard matches subdomains)
    allowedHosts: previewMode && sandboxDomain ? [`.${sandboxDomain}`] : undefined,
  },
})
