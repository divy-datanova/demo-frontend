import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Port 5500 must match CLIENT_URL in the backend .env (CORS and the
// redirect back to the app after Google login).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5500, strictPort: true },
  preview: { port: 5500, strictPort: true },
});
