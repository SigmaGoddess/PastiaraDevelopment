console.log('navbar.js cargado');


// 1. MANEJADOR DE CLIC (MUESTRA/OCULTA FORMULARIO)

// (Mantenemos el Bloque 1 intacto, ya funciona correctamente)
document.addEventListener('click', (e) => {
    const btnDesk = e.target.closest('#search-btn');
    const btnMob = e.target.closest('#search-btn-mobile');
    const boxSearch = document.getElementById('box-search');

    const toggleForm = (formId) => {
        const form = document.getElementById(formId);
        if (form) {
            form.classList.toggle('d-none');
            const input = form.querySelector('input');

            if (input && !form.classList.contains('d-none')) {
                setTimeout(() => input.focus(), 50);
            } else {
                if (input) input.value = '';
                boxSearch?.classList.remove('show');
            }
        }
    };

    if (btnDesk) {
        e.preventDefault();
        toggleForm('search-form');
    }
    // ... (Manejo de btnMob y clic fuera sin cambios)
    const isInsideForm = e.target.closest('#search-form') || e.target.closest('#search-form-mobile');
    const isInsideBoxSearch = e.target.closest('#box-search');
    const isInsideButton = btnDesk || btnMob;

    if (!isInsideForm && !isInsideButton && !isInsideBoxSearch) {
        document.getElementById('search-form')?.classList.add('d-none');
        document.getElementById('search-form-mobile')?.classList.add('d-none');
        boxSearch?.classList.remove('show');
    }
});



// 2. FUNCIÓN PRINCIPAL DE INICIALIZACIÓN (A PRUEBA DE INYECCIÓN)


const initSearch = () => {
    const boxSearch = document.getElementById('box-search');
    const inputDesk = document.getElementById('searchInput');
    const inputMob = document.getElementById('searchInputMobile');

    if (!boxSearch || (!inputDesk && !inputMob)) {
        console.warn("NAVBAR JS: Elementos de búsqueda no encontrados. Reintentando en 500ms.");
        // Si no los encuentra, reintenta (último recurso)
        setTimeout(initSearch, 500);
        return;
    }

    console.log("NAVBAR JS: Inputs encontrados. Eventos adjuntados.");

    const filterSearch = (e) => {
        const query = (e.target.value || '').trim().toUpperCase();
        const items = boxSearch.querySelectorAll('.search-item');
        let hasVisibleItems = false;

        items.forEach((item) => {
            const link = item.querySelector('.search-link');
            if (!link) return;

            const textContent = link.textContent.trim().toUpperCase();
            const match = textContent.includes(query);

            item.style.display = match ? '' : 'none';

            if (match && query !== '') hasVisibleItems = true;
        });

        if (hasVisibleItems) {
            boxSearch.classList.add('show');
        } else {
            boxSearch.classList.remove('show');
        }
    };

    const showBox = (e) => {
        if (e.target.value.trim() !== '') {
            filterSearch(e);
        }
    };

    const hideBox = (e) => {
        setTimeout(() => {
            if (!e.relatedTarget || !e.relatedTarget.closest('#box-search')) {
                boxSearch.classList.remove('show');
            }
        }, 200);
    };

    // Registrar eventos para input de escritorio
    if (inputDesk) {
        inputDesk.addEventListener('focus', showBox);
        inputDesk.addEventListener('input', filterSearch);
        inputDesk.addEventListener('blur', hideBox);
    }

    // Registrar eventos para input móvil
    if (inputMob) {
        inputMob.addEventListener('focus', showBox);
        inputMob.addEventListener('input', filterSearch);
        inputMob.addEventListener('blur', hideBox);
    }
};

// 🚩 Ejecuta la inicialización después de que TODA la página (incluyendo imágenes) haya cargado.
window.addEventListener('load', initSearch);
// Alternativa más rápida si 'load' es muy lento: Intenta llamar initSearch() directamente aquí
// Y quita el window.addEventListener, confiando en que el script está al final del body.
// initSearch();