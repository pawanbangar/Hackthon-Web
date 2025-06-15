import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [react(), // disable cache if linting doesn't update
    ],
    server: {
      allowedHosts: [
        'aef7-115-99-16-246.ngrok-free.app',
        '.ngrok-free.app' // This will allow all ngrok-free.app subdomains
      ]
    }
  };
});