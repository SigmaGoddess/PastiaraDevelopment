// Función para manejar favoritos
function toggleFavorite(btn) {
    btn.classList.toggle('regalar-active');
    
    // Animación al hacer clic
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Configurar eventos de favoritos
    const favoriteBtns = document.querySelectorAll('.regalar-favorite-btn');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleFavorite(this);
        });
    });
    
    // Animación de entrada para las tarjetas
    const cards = document.querySelectorAll('.regalar-product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('regalar-visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Parallax suave para los patrones de taco
    document.addEventListener('mousemove', function(e) {
        const tacos = document.querySelectorAll('.regalar-taco-pattern');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        tacos.forEach((taco, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            taco.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});