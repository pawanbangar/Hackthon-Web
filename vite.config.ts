import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: '/',
    define: {
      "process.env": env,
    },
    plugins: [react()],
    server: {
      allowedHosts: [
        'aef7-115-99-16-246.ngrok-free.app',
        '.ngrok-free.app', // This will allow all ngrok-free.app subdomains
        'hackathon.crescentliveevents.com'
      ],
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  };
});