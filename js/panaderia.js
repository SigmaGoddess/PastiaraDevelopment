// Este código es el que debes tener en empanadas.js, panaderia.js, etc.

document.addEventListener('DOMContentLoaded', () => {

    const botonesFavorito = document.querySelectorAll('.heart-favorite');
    const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];

    // Función para marcar los corazones al cargar la página
    function actualizarBotones() {
        botonesFavorito.forEach(boton => {
            const productId = boton.dataset.product;
            if (favoritosGuardados.some(fav => fav.id === productId)) {
                boton.classList.add('active');
            }
        });
    }

    actualizarBotones();

    // Listener para cada botón
    botonesFavorito.forEach(boton => {
        boton.addEventListener('click', () => {
            const productCard = boton.closest('.product-card');
            const producto = {
                id: boton.dataset.product,
                nombre: productCard.querySelector('h3').textContent,
                precio: productCard.querySelector('.price').textContent,
                descripcion: productCard.querySelector('.description').textContent,
                imagen: productCard.querySelector('.product-image').src
            };
            gestionarFavorito(producto, boton);
        });
    });
});

// Función que guarda o elimina de localStorage
function gestionarFavorito(producto, boton) {
    let favoritos = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
    const productoIndex = favoritos.findIndex(item => item.id === producto.id);

    if (productoIndex > -1) {
        favoritos.splice(productoIndex, 1);
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