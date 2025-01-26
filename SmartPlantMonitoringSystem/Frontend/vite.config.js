import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/AI-Enhanced-IOT-System-for-Real-Time-Diagnosting-and-Monitoring/',
  plugins: [react()],
  server: {
    host: '0.0.0.0'  // This exposes the server on all network interfaces
  }
})
