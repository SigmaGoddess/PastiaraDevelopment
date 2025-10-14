const btnPastes = document.getElementById('btnradio1');
const btnVolovanes = document.getElementById('btnradio2');
const btnPanaderia = document.getElementById('btnradio3');

const sectionPastes = document.querySelector('.pastes');
const sectionVolovanes = document.querySelector('.volovanes');
const sectionPanaderia = document.querySelector('.panaderia');

// ========================= 
// FUNCIÓN PARA MOSTRAR SECCIÓN 
// ========================= 
function showSection(section) {
    // Ocultar todas las secciones
    [sectionPastes, sectionVolovanes, sectionPanaderia].forEach(sec => {
        sec.classList.remove('active-section');
        sec.style.display = 'none'; // asegura que no se vea
    });

    // Mostrar la sección seleccionada
    section.classList.add('active-section');
    section.style.display = 'block';

    // Destruir Swiper anterior si existe
    if (window.swiperInstance) {
        window.swiperInstance.destroy(true, true);
    }

    // Inicializar Swiper en la sección visible
    window.swiperInstance = new Swiper(section.querySelector('.card-wrapper'), {
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: section.querySelector('.swiper-pagination'),
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: section.querySelector('.swiper-button-next'),
            prevEl: section.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
        }
    });
}

// =========================
// EVENTOS DE BOTONES
// =========================
btnPastes.addEventListener('change', () => showSection(sectionPastes));
btnVolovanes.addEventListener('change', () => showSection(sectionVolovanes));
btnPanaderia.addEventListener('change', () => showSection(sectionPanaderia));

// =========================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// =========================
document.addEventListener('DOMContentLoaded', () => {
    showSection(sectionPastes); // Carrusel inicial
});

// =========================
// NAVEGACIÓN CON BOTONES DENTRO DE LAS TARJETAS
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-button[data-href]');
    if (!btn) return;
    const url = btn.getAttribute('data-href');
    if (url) {
        // navegación simple
        window.location.href = url;
        // o usar: window.location.assign(url);
    }
});
// ...existing code...