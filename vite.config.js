import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'src/pages/projects.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        register: resolve(__dirname, 'src/pages/register.html')
      }
    }
  }
})
