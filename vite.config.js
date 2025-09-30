import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                conocenos: resolve(__dirname, 'pages/pag-conocenos/conocenos.html'),
                menu: resolve(__dirname, 'pages/pag-navbar/navbar.html')
                /*aboutUs: resolve(__dirname, 'src/pages/about-us/about-us.html'),
                contact: resolve(__dirname, 'src/pages/contact/contact.html'),
                register: resolve(__dirname, 'src/pages/register/register.html'),*/
            },
        },
    },
})