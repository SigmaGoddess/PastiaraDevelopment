import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                conocenos: resolve(__dirname, 'pages/pag-conocenos/conocenos.html'),
                navbar: resolve(__dirname, 'pages/pag-navbar/navbar.html'),
                footer: resolve(__dirname, 'pages/pag-footer/footer.html'),
                registro: resolve(__dirname, 'pages/pag-registro/registro.html'),
                perfilDeUsuario: resolve(__dirname, 'pages/pag-perfilDeUsuario/perfil_usuario.html'),
                regalar: resolve(__dirname, 'pages/pag-productosParaRegalar/pag-regalar.html'),
            },
        },
    },
})