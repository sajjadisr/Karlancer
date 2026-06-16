import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
<<<<<<< HEAD
  base: '/Karlancer/',
  build: {
=======
  base: './',
  root: '.',
  build: {
    outDir: 'dist',
>>>>>>> 03a838b (Fixed)
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'src/pages/projects.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
<<<<<<< HEAD
        projectDetail: resolve(__dirname, 'src/pages/project-detail.html'),
      },
    },
  },
})
=======
        'project-detail': resolve(__dirname, 'src/pages/project-detail.html'),
      }
    }
  },
  server: {
    open: true
  }
})
>>>>>>> 03a838b (Fixed)
