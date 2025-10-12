// 'DOMContentLoaded' es un evento que se dispara cuando el HTML ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', function() {

    // -- LÓGICA DEL SISTEMA DE FAVORITOS (INTACTA) --
    
    function loadFavorites() {
        const favorites = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        
        favorites.forEach(productName => {
            const heartIcon = document.querySelector(`.heart-favorite[data-product="${productName}"]`);
            if (heartIcon) {
                heartIcon.classList.add('active'); // Se corrigió a 'active' para coincidir con tu CSS
            }
        });
    }

    window.toggleFavorite = function(productName) {
        const heartIcon = document.querySelector(`.heart-favorite[data-product="${productName}"]`);
        
        const isFavorite = heartIcon.classList.toggle('active'); // Se corrigió a 'active'

        let favorites = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        
        if (isFavorite) {
            if (!favorites.includes(productName)) {
                favorites.push(productName);
            }
            Toastify({ text: "Añadido a favoritos ❤️", duration: 2000, gravity: "bottom", position: "center", style: { background: "linear-gradient(to right, #B58A6A, #a07551)"} }).showToast();
        } else {
            favorites = favorites.filter(item => item !== productName);
            Toastify({ text: "Eliminado de favoritos", duration: 2000, gravity: "bottom", position: "center" }).showToast();
        }

        localStorage.setItem('pastiaraFavorites', JSON.stringify(favorites));
    }

    loadFavorites();

});
