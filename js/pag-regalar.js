

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar animaciones de scroll
    initScrollAnimations();
    
    // Inicializar efectos de hover en imágenes
    initImageEffects();
    
    // Inicializar smooth scroll
    initSmoothScroll();
    
    // Agregar efecto parallax sutil al header
    initParallaxHeader();
});

// ========================================
// Animaciones al hacer scroll
// ========================================
function initScrollAnimations() {
    const cards = document.querySelectorAll('.regalar-product-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// ========================================
// Efectos de imagen mejorados
// ========================================
function initImageEffects() {
    const imageWrappers = document.querySelectorAll('.regalar-image-wrapper');
    
    imageWrappers.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        
        // Efecto de carga de imagen suave
        img.addEventListener('load', function() {
            wrapper.classList.add('loaded');
        });
        
        // Efecto de hover con movimiento del mouse
        wrapper.addEventListener('mousemove', function(e) {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 5;
            const moveY = (y - centerY) / centerY * 5;
            
            img.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        });
        
        wrapper.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1) translate(0, 0)';
        });
    });
}

// ========================================
// Smooth scroll para navegación
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// Efecto parallax en el header
// ========================================
function initParallaxHeader() {
    const header = document.querySelector('.regalar-header');
    
    if (!header) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                
                if (scrolled < window.innerHeight) {
                    header.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                    header.style.opacity = 1 - (scrolled / 500);
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ========================================
// Animación de los badges al pasar el mouse
// ========================================
document.querySelectorAll('.regalar-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function()