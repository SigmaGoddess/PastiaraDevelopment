document.addEventListener('DOMContentLoaded', function() {
    
    // --- AJUSTE CLAVE: Se cambió el selector para los nuevos enlaces ---
    const navLinks = document.querySelectorAll('.tab-link'); // Antes era 'aside .nav-link'
    const sections = document.querySelectorAll('section.user-section');

    // El resto de tu código JavaScript funciona exactamente igual.
    // No necesitas cambiar la función showSection ni el resto de la lógica.

    function showSection(targetId) {
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        const activeLink = document.querySelector(`.tab-link[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);
            history.pushState(null, '', targetId);
        });
    });

    const initialHash = window.location.hash;
    if (initialHash && document.querySelector(initialHash)) {
        showSection(initialHash);
    } else {
        showSection('#datos-personales-section');
    }

    // --- AQUÍ VA EL RESTO DE TU CÓDIGO JS PARA EDITAR, ELIMINAR, ETC. ---
});