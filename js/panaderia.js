// Esperamos a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    const containerProductos = document.getElementById('productos').querySelector('.row'); // Contenedor de productos
    const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || []; // Favoritos del localStorage

    // Función para crear el HTML de cada producto
    function crearCardProducto(producto) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-5';

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

    // Función para actualizar los corazones según favoritos guardados
    function actualizarBotones() {
        const botonesFavorito = containerProductos.querySelectorAll('.heart-favorite');
        botonesFavorito.forEach(boton => {
            const productId = boton.dataset.product;
            if (favoritosGuardados.some(fav => fav.id == productId)) {
                boton.classList.add('active');
            }
        });
    }

    //  Función para gestionar favoritos (con verificación de login mediante JWT)
    function gestionarFavorito(producto, boton) {
        const token = localStorage.getItem('authToken'); // Revisar si hay token
        if (!token) {
            // Si no hay token, redirige a registro/login
            window.location.href = '/pages/pag-registro/registro.html#register-form';
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

    // Función para mostrar notificaciones
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

    // Función principal para cargar productos desde la API
    async function cargarProductos() {
        try {
            const categoriaId = 3; // Cambia este ID al que corresponda a panadería en tu base
            const response = await fetch(`https://pastiara.duckdns.org/api/productos/categoria/3`);
            if (!response.ok) throw new Error('Error al cargar productos');

            const productos = await response.json();
            containerProductos.innerHTML = ''; // Limpiar contenedor

            productos.forEach(producto => {
                const card = crearCardProducto(producto);
                containerProductos.appendChild(card);
            });

            // Agregamos listeners a los botones recién creados
            const botonesFavorito = containerProductos.querySelectorAll('.heart-favorite');
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

            actualizarBotones(); // Marcar favoritos al cargar

        } catch (error) {
            console.error(error);
            containerProductos.innerHTML = `<p>Error al cargar los productos. Intenta más tarde.</p>`;
        }
    }

    cargarProductos();
});