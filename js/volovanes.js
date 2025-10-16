// Espera a que todo el contenido del HTML se cargue antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona todos los botones que tienen la clase 'heart-favorite'.
    const botonesFavorito = document.querySelectorAll('.heart-favorite');

    // Recupera los favoritos guardados para marcar los corazones correctos al cargar la página.
    // NOTA: Usaremos 'pastiaraFavorites' como tú lo tenías, para mantener consistencia.
    const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];

    // Función para actualizar el estado visual de los botones al cargar la página.
    function actualizarBotones() {
        botonesFavorito.forEach(boton => {
            const productId = boton.dataset.product;
            // Si el ID del producto del botón está en la lista de favoritos, se le añade la clase 'active'.
            if (favoritosGuardados.some(fav => fav.id === productId)) {
                boton.classList.add('active');
            }
        });
    }

    // Llama a la función para que los corazones de los favoritos aparezcan marcados desde el inicio.
    actualizarBotones();

    // Recorre cada botón encontrado para añadirle un evento de 'click'.
    botonesFavorito.forEach(boton => {
        boton.addEventListener('click', () => {
            // Cuando se hace clic, busca el 'product-card' más cercano para obtener todos sus datos.
            const productCard = boton.closest('.product-card');

            // Crea un objeto 'producto' con toda la información extraída del HTML.
            const producto = {
                id: boton.dataset.product, // El ID único que pusimos en 'data-product'.
                nombre: productCard.querySelector('h3').textContent,
                precio: productCard.querySelector('.price').textContent,
                descripcion: productCard.querySelector('.description').textContent,
                imagen: productCard.querySelector('.product-image').src
            };

            // Llama a la función que gestiona si se agrega o elimina de localStorage.
            gestionarFavorito(producto, boton);
        });
    });
});

/**
 * Función que añade o elimina un producto de la lista de favoritos en localStorage.
 * @param {object} producto - El objeto del producto sobre el que se hizo clic.
 * @param {HTMLElement} boton - El botón que fue presionado, para cambiar su estilo.
 */
function gestionarFavorito(producto, boton) {
    // Obtiene la lista actual de favoritos. Si no existe, crea un array vacío.
    let favoritos = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];

    // Busca si el producto ya está en la lista usando su ID.
    const productoIndex = favoritos.findIndex(item => item.id === producto.id);

    if (productoIndex > -1) {
        // Si el producto ya existe (índice 0 o mayor), se elimina de la lista.
        favoritos.splice(productoIndex, 1);
        // Quita la clase 'active' del botón para que el corazón vuelva a su color original.
        boton.classList.remove('active');
        // Muestra una notificación de que fue eliminado.
        mostrarNotificacion(`${producto.nombre} eliminado de favoritos`);
    } else {
        // Si el producto no existe (índice -1), se añade a la lista.
        favoritos.push(producto);
        // Añade la clase 'active' al botón para que el corazón cambie de color.
        boton.classList.add('active');
        // Muestra una notificación de que fue añadido.
        mostrarNotificacion(`${producto.nombre} añadido a favoritos ❤️`);
    }

    // Guarda la lista (ya sea modificada o con el nuevo item) de vuelta en localStorage.
    localStorage.setItem('pastiaraFavorites', JSON.stringify(favoritos));
}


/**
 * Muestra una notificación en pantalla usando la librería Toastify.
 * @param {string} mensaje - El texto que se mostrará en la notificación.
 */
function mostrarNotificacion(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            // Usando los colores de tu Toastify original para consistencia
            background: "linear-gradient(to right, #B58A6A, #a07551)",
        },
    }).showToast();
}