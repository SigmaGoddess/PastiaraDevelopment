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

    // manejar botón móvil
    if (btnMob) {
        e.preventDefault();
        toggleForm('search-form-mobile');
    }

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
    const boxSearch = document.getElementById('box-search'); // desktop
    const boxSearchMobile = document.getElementById('box-search-mobile'); // mobile
    const inputDesk = document.getElementById('searchInput');
    const inputMob = document.getElementById('searchInputMobile');

    const filterForBox = (box, q) => {
        if (!box) return false;
        const items = box.querySelectorAll('.search-item');
        let any = false;
        items.forEach(item => {
            const link = item.querySelector('.search-link');
            const txt = (link?.textContent || '').trim().toUpperCase();
            const match = q.length > 0 && txt.includes(q);
            item.style.display = match ? '' : 'none';
            any = any || match;
        });
        box.classList.toggle('show', any);
        return any;
    };

    const onInput = (e) => {
        const q = (e.target.value || '').trim().toUpperCase();
        const box = e.target.id === 'searchInputMobile'
            ? document.getElementById('box-search-mobile')
            : document.getElementById('box-search');
        filterForBox(box, q);
    };

    const onFocus = (e) => {
        if ((e.target.value || '').trim() === '') {
            const box = e.target.id === 'searchInputMobile'
                ? document.getElementById('box-search-mobile')
                : document.getElementById('box-search');
            box?.classList.remove('show');
        } else {
            onInput(e);
        }
    };

    const onBlur = (e) => {
        const box = e.target.id === 'searchInputMobile' ? boxSearchMobile : boxSearch;
        setTimeout(() => box?.classList.remove('show'), 200);
    };

    if (inputDesk) {
        inputDesk.addEventListener('focus', onFocus);
        inputDesk.addEventListener('input', onInput);
        inputDesk.addEventListener('blur', onBlur);
    }
    if (inputMob) {
        inputMob.addEventListener('focus', onFocus);
        inputMob.addEventListener('input', onInput);
        inputMob.addEventListener('blur', onBlur);
    }
};

// ejecutar initSearch como ya haces (load)
window.addEventListener('load', initSearch);
// Alternativa más rápida si 'load' es muy lento: Intenta llamar initSearch() directamente aquí
// Y quita el window.addEventListener, confiando en que el script está al final del body.
// initSearch();