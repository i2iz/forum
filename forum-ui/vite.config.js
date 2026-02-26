import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // spring boot
        changeOrigin: true,
        secure: false, // 로컬 환경이므로 인증서 검증은 무시한다
      },
    },
  },
});
