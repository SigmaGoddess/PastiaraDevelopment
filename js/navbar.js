console.log('navbar.js cargado');

// ===============================================================
// 1. MANEJADOR DE CLIC (MUESTRA/OCULTA FORMULARIO)
// ===============================================================
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
                // Muestra el input y lo enfoca
                setTimeout(() => input.focus(), 50);
            } else {
                // Oculta el input, limpia el valor y oculta los resultados
                if (input) input.value = '';
                boxSearch?.classList.remove('show');
            }
        }
    };

    if (btnDesk) {
        e.preventDefault();
        toggleForm('search-form');
    }

    if (btnMob) {
        e.preventDefault();
        toggleForm('search-form-mobile');
    }

    // Ocultar la lista de resultados si se hace clic fuera
    const isInsideForm = e.target.closest('#search-form') || e.target.closest('#search-form-mobile');
    const isInsideBoxSearch = e.target.closest('#box-search');
    const isInsideButton = btnDesk || btnMob;

    if (!isInsideForm && !isInsideButton && !isInsideBoxSearch) {
        document.getElementById('search-form')?.classList.add('d-none');
        document.getElementById('search-form-mobile')?.classList.add('d-none');
        boxSearch?.classList.remove('show');
    }
});


// ===============================================================
// 2. FUNCIONES DE FILTRADO Y EVENTOS DE BÚSQUEDA (USA DOMContentLoaded)
// ===============================================================
document.addEventListener('DOMContentLoaded', () => {
    // 🚩 DOMContentLoaded garantiza que los inputs inyectados existan.
    const boxSearch = document.getElementById('box-search');
    const inputDesk = document.getElementById('searchInput');
    const inputMob = document.getElementById('searchInputMobile');

    if (!boxSearch) return;

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

            // Muestra la caja si hay coincidencias Y el input no está vacío.
            if (match && query !== '') hasVisibleItems = true;
        });

        // Control de visibilidad (agrega/quita la clase .show)
        if (hasVisibleItems) {
            boxSearch.classList.add('show');
        } else {
            boxSearch.classList.remove('show');
        }
    };

    const showBox = (e) => {
        // Solo ejecuta el filtro (y potencialmente muestra la caja) si hay texto.
        // Esto previene que se muestre con input vacío al hacer focus.
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

    // Adjuntar eventos
    if (inputDesk) {
        inputDesk.addEventListener('focus', showBox);
        inputDesk.addEventListener('input', filterSearch);
        inputDesk.addEventListener('blur', hideBox);
    }

    if (inputMob) {
        inputMob.addEventListener('focus', showBox);
        inputMob.addEventListener('input', filterSearch);
        inputMob.addEventListener('blur', hideBox);
    }
});