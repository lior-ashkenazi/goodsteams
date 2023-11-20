import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "http://accc52bd071e845e98e3d42433b7731c-1862567432.us-east-1.elb.amazonaws.com",
        changeOrigin: true,
      },
    },
  },
});
