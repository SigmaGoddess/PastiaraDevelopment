// Esperamos a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    const containerProductos = document.getElementById('productos-container'); // Contenedor de productos
    const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];

    // Función para crear el HTML de un producto con el diseño específico de "Para regalar"
    function crearCardProducto(producto, position) {
        const section = document.createElement('div');
        section.className = 'pastiara-full-banner-section';

        section.innerHTML = `
            <div class="pastiara-banner-background"></div>
            
            <div class="pastiara-product-container">
                <div class="pastiara-product-${position}">
                    <div class="pastiara-product-wrapper">
                        <h3 class="pastiara-product-name">${producto.nombre}</h3>

                        <article class="product-3d">
                            <img src="${producto.imagenUrl}" alt="${producto.nombre}" class="pastiara-product-img">
                            <button class="heart-favorite" data-product="${producto.id}" aria-label="Marcar como favorito">
                                <i class="fas fa-heart"></i>
                            </button>
                        </article>

                        <div class="pastiara-product-info">
                            <p class="pastiara-description-text">${producto.descripcion}</p>
                            <p class="pastiara-price">$${producto.precio}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return section;
    }

    // Función para actualizar los botones de favoritos según localStorage
    function actualizarBotones() {
        const botonesFavorito = document.querySelectorAll('.heart-favorite');
        botonesFavorito.forEach(boton => {
            const productId = boton.dataset.product;
            if (favoritosGuardados.some(fav => fav.id == productId)) {
                boton.classList.add('active');
            }
        });
    }

    // Función para gestionar favoritos (con verificación de login mediante JWT)
    function gestionarFavorito(producto, boton) {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = '/pages/pag-registro/registro.html#login-form';
            return;
        }

        let favoritos = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        const index = favoritos.findIndex(item => item.id == producto.id);

        if (index > -1) {
            favoritos.splice(index, 1);
            boton.classList.remove('active');
            mostrarNotificacion(`${producto.nombre} eliminado de favoritos`);
        } else {
            favoritos.push(producto);
            boton.classList.add('active');
            mostrarNotificacion(`${producto.nombre} añadido a favoritos ❤️`);
        }

        localStorage.setItem('pastiaraFavorites', JSON.stringify(favoritos));
    }

    // Función para mostrar notificaciones (Toastify)
    function mostrarNotificacion(mensaje) {
        Toastify({
            text: mensaje,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #B58A6A, #a07551)",
            },
        }).showToast();
    }

    // Función principal para traer los productos del backend y renderizarlos
    async function cargarProductos() {
        try {
            const categoriaId = 4; // ID de la categoría "Para regalar"
            const response = await fetch(`https://pastiara.duckdns.org/api/productos/categoria/${categoriaId}`);
            if (!response.ok) throw new Error('Error al cargar productos');

            const productos = await response.json();

            // Limpiamos el contenedor antes de agregar
            containerProductos.innerHTML = '';

            // Posiciones específicas para cada producto
            const posiciones = ['left', 'right', 'center'];

            productos.forEach((producto, index) => {
                const position = posiciones[index];
                const card = crearCardProducto(producto, position);
                containerProductos.appendChild(card);
            });

            // Después de renderizar los cards, agregamos los listeners de favoritos
            const botonesFavorito = document.querySelectorAll('.heart-favorite');
            botonesFavorito.forEach(boton => {
                const productWrapper = boton.closest('.pastiara-product-wrapper');
                const producto = {
                    id: boton.dataset.product,
                    nombre: productWrapper.querySelector('.pastiara-product-name').textContent,
                    precio: productWrapper.querySelector('.pastiara-price').textContent.replace('$', ''),
                    descripcion: productWrapper.querySelector('.pastiara-description-text').textContent,
                    imagenUrl: productWrapper.querySelector('.pastiara-product-img').src
                };
                boton.addEventListener('click', () => gestionarFavorito(producto, boton));
            });

            // Activamos los corazones según favoritos guardados
            actualizarBotones();

        } catch (error) {
            console.error(error);
            containerProductos.innerHTML = `<p>Error al cargar los productos. Intenta más tarde.</p>`;
        }
    }

    // Se llama a la función principal
    cargarProductos();

});