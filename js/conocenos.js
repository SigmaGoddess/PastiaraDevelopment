document.addEventListener('DOMContentLoaded', () => {
    // Se coloco la clase "fade-in"
    const elementosAnimados = document.querySelectorAll('.fade-in');

    // Se crea un nuevo observador
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento es visible
            if (entry.isIntersecting) {
                // Se coloca la clase 'is-visible' para activar la animación
                entry.target.classList.add('is-visible');
                // Deja de observar el elemento una vez que la animación se activa
                observer.unobserve(entry.target);
            }
        });
    }, {
        // La animación se activa cuando el 10% del elemento sea visible
        threshold: 0.1
    });

    // Observa cada uno de los elementos seleccionados
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });
});