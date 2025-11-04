// Esperamos a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    const containerProductos = document.querySelector('.body-regalar'); // Contenedor principal


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
                                    data-product-id="${producto.id}" 
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

    /**
     * Ahora consulta la API para saber qué botones marcar.
     */
    async function actualizarBotones() {
        const token = localStorage.getItem('authToken');
        if (!token) return; // Si no hay login, no hay nada que marcar.

        try {
            // 1. Obtenemos los IDs favoritos REALES desde la API
            const response = await fetch('https://pastiara.duckdns.org/api/favoritos', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) return;

            const favoritos = await response.json(); // Array de objetos [{id: 1}, {id: 5}]
            const idsFavoritos = new Set(favoritos.map(fav => fav.id)); // new Set([1, 5])

            // 2. Recorremos los botones y marcamos los que coincidan
            const botonesFavorito = document.querySelectorAll('.heart-favorite');
            botonesFavorito.forEach(boton => {
                const productId = boton.dataset.productId; // Usamos productId

                if (idsFavoritos.has(Number(productId))) { // Convertimos a Número por si acaso
                    boton.classList.add('active');
                    boton.querySelector('i').classList.replace('bi-heart', 'bi-heart-fill');
                    boton.setAttribute('aria-label', 'Quitar de favoritos');
                }
            });
        } catch (error) {
            console.error("Error al actualizar botones de favoritos:", error);
        }
    }

    /**
     * Función para gestionar favoritos llamando a la API (POST/DELETE).
     */
    async function gestionarFavorito(productId, boton) {
        const token = localStorage.getItem('authToken'); // Revisar si hay token

        // 1. Validar que el usuario esté logueado
        if (!token) {
            window.location.href = '/pages/pag-registro/registro.html#login-form'; // Redirección a la página de registro
            return;
        }

        // 2. Si hay token, procede a llamar a la API
        const estaActivo = boton.classList.contains('active');
        const icon = boton.querySelector('i');
        const url = `https://pastiara.duckdns.org/api/favoritos/${productId}`;

        try {
            if (estaActivo) {
                // --- QUITAR DE FAVORITOS (DELETE) ---
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Error al quitar');

                // Éxito: Actualizar UI
                boton.classList.remove('active');
                icon.classList.replace('bi-heart-fill', 'bi-heart');
                boton.setAttribute('aria-label', 'Agregar a favoritos');
                mostrarNotificacion("Quitado de favoritos");

            } else {
                // --- AGREGAR A FAVORITOS (POST) ---
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Error al agregar');

                // Éxito: Actualizar UI
                boton.classList.add('active');
                icon.classList.replace('bi-heart', 'bi-heart-fill');
                boton.setAttribute('aria-label', 'Quitar de favoritos');
                mostrarNotificacion("¡Agregado a favoritos! ❤️");
            }
        } catch (error) {
            console.error('Error al actualizar favorito:', error);
            mostrarNotificacion("Error al actualizar. Intenta más tarde.", true);
        }

    }

    // Función para mostrar notificaciones (Toastify)
    function mostrarNotificacion(mensaje, esError = false) {
        Toastify({
            text: mensaje,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: esError ? "#f44336" : "linear-gradient(to right, #B58A6A, #a07551)",
            },
        }).showToast();
    }

    // Función principal para traer los productos del backend y renderizarlos
    async function cargarProductos() {
        try {
            // ID de la categoría "Para Regalar" (ajusta según tu base de datos)
            const categoriaId = 4; // Cambiar según el ID real de tu categoría
            const response = await fetch(`https://pastiara.duckdns.org/api/productos/categoria/${categoriaId}`);

            if (!response.ok) throw new Error('Error al cargar productos');

            const productos = await response.json();

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

                // Solo necesitamos el ID del producto
                const productId = boton.dataset.productId;

                // Llamamos a gestionarFavorito solo con el ID y el botón
                boton.addEventListener('click', () => gestionarFavorito(productId, boton));
            });

            // Activamos los corazones (ahora es una función async)
            await actualizarBotones();

        } catch (error) {
            console.error('Error al cargar productos:', error);

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