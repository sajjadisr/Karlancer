import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Karlancer/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'src/pages/projects.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        projectDetail: resolve(__dirname, 'src/pages/project-detail.html'),
      },
    },
  },
})
