document.addEventListener('DOMContentLoaded', () => {
    const containerProductos = document.getElementById('container-products');

    function crearCardProducto(producto) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-5';

        col.innerHTML = `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${producto.imagenUrl}" alt="${producto.nombre}" class="product-image">
                    <button class="heart-favorite" data-product-id="${producto.id}" aria-label="Marcar como favorito">
                        <i class="fas fa-heart"></i> 
                    </button>
                </div>
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p class="price">$${producto.precio}</p>
                    <p class="description">${producto.descripcion}</p>
                </div>
            </div>
        `;
        return col;
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

                // Comprobamos si el ID está en el Set
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
        const token = localStorage.getItem('authToken');

        // 1. Validar que el usuario esté logueado
        if (!token) {
            window.location.href = '/pages/pag-registro/registro.html#login-form'; // Redirección a la página de registro
            return;
        }

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

    function mostrarNotificacion(mensaje, esError = false) {
        Toastify({
            text: mensaje,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: esError ? "#f44336" : "linear-gradient(to right, #B58A6A, #a07551)"
            },
        }).showToast();
    }

    async function cargarProductos() {
        try {
            const categoriaId = 2; // ID de volovanes en la base de datos
            const response = await fetch(`https://pastiara.duckdns.org/api/productos/categoria/${categoriaId}`);
            if (!response.ok) throw new Error('Error al cargar productos');
            const productos = await response.json();

            containerProductos.innerHTML = '';
            productos.forEach(producto => containerProductos.appendChild(crearCardProducto(producto)));

            // Agregar listeners a los botones de favoritos
            const botonesFavorito = document.querySelectorAll('.heart-favorite');
            botonesFavorito.forEach(boton => {

                // Simplificamos la lógica. Solo necesitamos el ID.
                const productId = boton.dataset.productId; // data-product-id

                // Llamamos a gestionarFavorito solo con el ID y el botón
                boton.addEventListener('click', () => gestionarFavorito(productId, boton));
            }); -

                // Llamamos a la nueva función async
                await actualizarBotones();

        } catch (error) {
            console.error(error);
            containerProductos.innerHTML = `<p>Error al cargar los productos. Intenta más tarde.</p>`;
        }
    }

    cargarProductos();
});