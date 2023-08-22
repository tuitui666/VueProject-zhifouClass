import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: false,
    port: 3000,
    proxy: {
      '/api' : {
        target:'http://117.33.255.178:8082/zhifou-study',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,'')
      },
    },
  },
})
