import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                navbar: resolve(__dirname, 'pages/pag-navbar/navbar.html'),
                footer: resolve(__dirname, 'pages/pag-footer/footer.html'),
                conocenos: resolve(__dirname, 'pages/pag-conocenos/conocenos.html'),
                pastes: resolve(__dirname, 'pages/pag-productosPastes/pastes.html'),
                volovanes: resolve(__dirname, 'pages/pag-productosVolovanes/volovanes.html'),
                panaderia: resolve(__dirname, 'pages/pag-productosPanaderiaArtesanal/productosPanaderiaArtesanal.html'),
                regalar: resolve(__dirname, 'pages/pag-productosParaRegalar/pag-regalar.html'),
                perfilDeUsuario: resolve(__dirname, 'pages/pag-perfilDeUsuario/perfil_usuario.html'),
                registro: resolve(__dirname, 'pages/pag-registro/registro.html'),
                cotizador: resolve(__dirname, 'pages/pag-cotizador/cotizador.html'),
                administrador: resolve(__dirname, 'pages/pag-administrador/administrador.html'),
                loader: resolve(__dirname, 'pages/pag-loader/loader.html')
            },
        },
    },
})