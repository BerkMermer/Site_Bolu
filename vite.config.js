import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // '' öneki: VITE_ ile başlamayan değişkenleri de okur. Bunlar yalnızca bu
  // dosyada kullanılır, tarayıcıya gönderilmez.
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.API_PROXY_TARGET

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      // Geliştirmede CORS ile uğraşmamak için: API_PROXY_TARGET=http://localhost:8000
      // ve VITE_API_URL=/api verilirse /api istekleri Laravel'e yönlendirilir.
      proxy: proxyTarget
        ? { '/api': { target: proxyTarget, changeOrigin: true } }
        : undefined,
    },
  }
})
