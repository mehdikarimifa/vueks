import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@ksCoreUi': fileURLToPath(
        new URL('./src/components/ui', import.meta.url)
      )
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
})
