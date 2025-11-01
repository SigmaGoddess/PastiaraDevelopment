// Esperamos a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    const containerProductos = document.querySelector('.body-regalar'); // Contenedor principal
    const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || []; // Traemos favoritos desde localStorage

    // Función para crear el HTML de un producto para regalar (cada producto con su propio banner)
    function crearProductoRegalar(producto, index) {
        // Determinamos la clase de posición según el índice
        let posicionClase = 'pastiara-product-center'; // Default
        if (index % 3 === 0) posicionClase = 'pastiara-product-left';
        else if (index % 3 === 1) posicionClase = 'pastiara-product-right';

        const section = document.createElement('div');
        section.className = 'pastiara-full-banner-section';

        section.innerHTML = `
            <div class="pastiara-banner-background"></div>

            <div class="pastiara-product-container">
                <div class="${posicionClase}">
                    <div class="pastiara-product-wrapper">
                        <h3 class="pastiara-product-name">${producto.nombre}</h3>

                        <article class="product-3d">
                            <img src="${producto.imagenUrl}" 
                                 alt="${producto.nombre}" 
                                 class="pastiara-product-img">
                            <button class="heart-favorite" 
                                    data-product="${producto.id}" 
                                    aria-label="Marcar como favorito">
                                <i class="fas fa-heart"></i>
                            </button>
                        </article>

                        <div class="pastiara-product-info">
                            <p class="pastiara-description-text">
                                ${producto.descripcion}
                            </p>
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
        const token = localStorage.getItem('authToken'); // Revisar si hay token
        if (!token) {
            // Si no hay token, redirige a registro/login
            window.location.href = '/pages/pag-registro/registro.html#login-form';
            return;
        }

        // Si hay token, procede a agregar a favoritos
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
            // ID de la categoría "Para Regalar" (ajusta según tu base de datos)
            const categoriaId = 3; // Cambiar según el ID real de tu categoría
            const response = await fetch(`https://pastiara.duckdns.org/api/productos/categoria/${categoriaId}`);
            
            if (!response.ok) throw new Error('Error al cargar productos');

            const productos = await response.json();

            // Buscamos dónde insertar los productos (después del header de "Para regalar")
            const sectionTitle = document.querySelector('.pastiara-section-title');
            const insertPoint = sectionTitle ? sectionTitle.closest('.container') : containerProductos;

            // Limpiamos productos hardcodeados si existen
            const productosExistentes = document.querySelectorAll('.pastiara-full-banner-section');
            productosExistentes.forEach(prod => prod.remove());

            // Renderizamos cada producto en orden correcto
            productos.forEach((producto, index) => {
                const productoElement = crearProductoRegalar(producto, index);
                // Simplemente agregamos al final del contenedor
                containerProductos.appendChild(productoElement);
            });

            // Después de renderizar, agregamos los listeners de favoritos
            const botonesFavorito = document.querySelectorAll('.heart-favorite');
            botonesFavorito.forEach(boton => {
                const productWrapper = boton.closest('.pastiara-product-wrapper');
                const producto = {
                    id: boton.dataset.product,
                    nombre: productWrapper.querySelector('.pastiara-product-name').textContent,
                    precio: productWrapper.querySelector('.pastiara-price').textContent,
                    descripcion: productWrapper.querySelector('.pastiara-description-text').textContent,
                    imagen: productWrapper.querySelector('.pastiara-product-img').src
                };
                
                boton.addEventListener('click', () => gestionarFavorito(producto, boton));
            });

            // Activamos los corazones según favoritos guardados
            actualizarBotones();

        } catch (error) {
            console.error('Error al cargar productos:', error);
            
            // Mensaje de error amigable
            const errorDiv = document.createElement('div');
            errorDiv.className = 'container text-center my-5';
            errorDiv.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    No pudimos cargar los productos. Por favor, intenta más tarde.
                </div>
            `;
            
            const sectionTitle = document.querySelector('.pastiara-section-title');
            if (sectionTitle) {
                sectionTitle.closest('.container').after(errorDiv);
            }
        }
    }

    // Se llama a la función principal
    cargarProductos();

});