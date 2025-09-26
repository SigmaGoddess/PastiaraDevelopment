// 'DOMContentLoaded' es un evento que se dispara cuando el HTML ha sido completamente cargado y parseado.
// Es una buena práctica envolver todo nuestro código en este listener para asegurarnos de que todos los elementos HTML existen antes de intentar manipularlos.
document.addEventListener('DOMContentLoaded', function() {

    



     //-- LÓGICA DEL SISTEMA DE FAVORITOS --
    
    // Función para cargar los favoritos guardados en el LocalStorage cuando la página carga.
    function loadFavorites() {
        // LocalStorage es un almacenamiento web que guarda datos en el navegador y persisten incluso después de cerrar la página.
        // Obtenemos la lista de favoritos. Si no existe, creamos un array vacío.
        const favorites = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        
        // Por cada producto favorito, buscamos su icono de corazón y le añadimos la clase 'favorite'.
        favorites.forEach(productName => {
            const heartIcon = document.querySelector(`.heart-favorite[data-product="${productName}"]`);
            if (heartIcon) {
                heartIcon.classList.add('active'); // Se corrigió a 'active' para coincidir con tu CSS
            }
        });
    }

    // Hacemos nuestra función de 'toggle' global para que el 'onclick' del HTML la pueda llamar.
    window.toggleFavorite = function(productName) {
        // Seleccionamos el icono del corazón específico del producto en el que se hizo clic.
        const heartIcon = document.querySelector(`.heart-favorite[data-product="${productName}"]`);
        
        // 'classList.toggle' es muy útil: si la clase existe, la quita; si no existe, la añade.
        const isFavorite = heartIcon.classList.toggle('active');// Se corrigió a 'active'


        // Actualizamos la lista de favoritos en el LocalStorage.
        let favorites = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        
        if (isFavorite) {
            // Si ahora es favorito, lo añadimos a la lista (si no estaba ya).
            if (!favorites.includes(productName)) {
                favorites.push(productName);
            }
            Toastify({ text: "Añadido a favoritos ❤️", duration: 2000, gravity: "bottom", position: "center", style: { background: "linear-gradient(to right, #B58A6A, #a07551)"} }).showToast();
        } else {
            // Si ya no es favorito, lo quitamos de la lista.
            favorites = favorites.filter(item => item !== productName);
            Toastify({ text: "Eliminado de favoritos", duration: 2000, gravity: "bottom", position: "center" }).showToast();
        }

        // Guardamos la lista actualizada en LocalStorage. Usamos JSON.stringify para convertir el array en un string.
        localStorage.setItem('pastiaraFavorites', JSON.stringify(favorites));
    }

    // Llamamos a la función para cargar los favoritos en cuanto la página esté lista.
    loadFavorites();

});


