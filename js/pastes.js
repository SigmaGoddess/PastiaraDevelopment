// Esperamos a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    const containerProductos = document.getElementById('container-products'); // Donde se van a renderizar los productos
    const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || []; // Traemos favoritos desde localStorage

    //  Función para generar el HTML de un producto
    function crearCardProducto(producto) {
        // Creamos un div para la columna del grid de Bootstrap
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-5';

        // HTML del card, usando los datos del backend
        col.innerHTML = `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${producto.imagenUrl}" alt="${producto.nombre}" class="product-image">
                    <button class="heart-favorite" data-product="${producto.id}" aria-label="Marcar como favorito">
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

    //  Función para actualizar los botones de favoritos según localStorage
    function actualizarBotones() {
        const botonesFavorito = document.querySelectorAll('.heart-favorite');
        botonesFavorito.forEach(boton => {
            const productId = boton.dataset.product;
            if (favoritosGuardados.some(fav => fav.id == productId)) {
                boton.classList.add('active');
            }
        });
    }

    //  Función para gestionar favoritos
    function gestionarFavorito(producto, boton) {
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

    //  Función para mostrar notificaciones (Toastify)
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

    //  Función principal para traer los productos del backend y renderizarlos
    async function cargarProductos() {
        try {
            // ID del producto
            const categoriaId = 1; 
            const response = await fetch(`/api/productos/categoria/${categoriaId}`);
            if (!response.ok) throw new Error('Error al cargar productos');

            const productos = await response.json();

            // Limpiamos el contenedor antes de agregar
            containerProductos.innerHTML = '';

            productos.forEach(producto => {
                const card = crearCardProducto(producto);
                containerProductos.appendChild(card);
            });

            // Después de renderizar los cards, agregamos los listeners de favoritos
            const botonesFavorito = document.querySelectorAll('.heart-favorite');
            botonesFavorito.forEach(boton => {
                const productCard = boton.closest('.product-card');
                const producto = {
                    id: boton.dataset.product,
                    nombre: productCard.querySelector('h3').textContent,
                    precio: productCard.querySelector('.price').textContent,
                    descripcion: productCard.querySelector('.description').textContent,
                    imagen: productCard.querySelector('.product-image').src
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