import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from "vite";
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [react(),eslint({ cache: false }), // disable cache if linting doesn't update
    ],
  };
});