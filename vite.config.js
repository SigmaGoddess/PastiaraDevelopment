import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                conocenos: resolve(__dirname, 'pages/pag-conocenos/conocenos.html'),
                menu: resolve(__dirname, 'pages/pag-navbar/navbar.html'),
                /*aboutUs: resolve(__dirname, 'src/pages/about-us/about-us.html'),
                contact: resolve(__dirname, 'src/pages/contact/contact.html'),*/
                registro: resolve(__dirname, 'pages/pag-registro/registro.html'),
                perfilDeUsuario: resolve(__dirname, 'pages/pag-perfilDeUsuario/perfil_usuario.html'),
                regalar: resolve(__dirname, 'pages/pag-productosParaRegalar/pag-regalar.html'),
                cotizador: resolve(__dirname, 'pages/pag-cotizador/cotizador.html'),
            },
        },
    },
})