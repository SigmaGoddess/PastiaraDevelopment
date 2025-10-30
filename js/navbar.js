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


document.removeEventListener('click', handleNavbarClick);
function handleNavbarClick(e) {
    const perfilBtn = e.target.closest('.btn-perfil');
    const favBtn = e.target.closest('#btn-favoritos');

    if (perfilBtn) {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        console.log('Token detectado:', token);

        if (token) {
            window.location.href = '/pages/pag-perfilDeUsuario/perfil_usuario.html';
        } else {
            window.location.href = '/pages/pag-registro/registro.html';
        }
    }

    if (favBtn) {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        console.log('Token detectado (favoritos):', token);

        if (token) {
            window.location.href = '/pages/pag-perfilDeUsuario/perfil_usuario.html#favoritos';
        } else {
            window.location.href = '/pages/pag-registro/registro.html';
        }
    }
}

document.addEventListener('click', handleNavbarClick);

document.addEventListener('click', (e) => {
    const perfilBtn = e.target.closest('#btn-perfil');
    if (perfilBtn) {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        console.log('Token detectado:', token);
        
        if (token) {
            // Sesión iniciada → ir al perfil
            window.location.href = '/pages/pag-perfilDeUsuario/perfil_usuario.html';
        } else {
            // Sin sesión → ir a login
            window.location.href = '/pages/pag-registro/registro.html';
        }
    }
});


document.addEventListener('click', (e) => {
    const heartBtn = e.target.closest('#btn-favoritos');
    if (heartBtn) {
        e.preventDefault();
        if (localStorage.getItem('authToken')) {
            // Usuario logueado → ir a favoritos
            window.location.href = '/pages/pag-perfilDeUsuario/perfil_usuario.html#favoritos';
        } else {
            // Usuario no logueado → ir a login
            window.location.href = '/pages/pag-registro/registro.html';
        }
    }
});

// --- REDIRECCIONES (solo una vez) ---
document.addEventListener('click', (e) => {
  const perfilBtn = e.target.closest('.btn-perfil');
  const favBtn = e.target.closest('#btn-favoritos');
  const token = localStorage.getItem('authToken'); // usa la clave que tienes en tu app

  if (perfilBtn) {
    e.preventDefault();
    if (token) {
      window.location.href = '/pages/pag-perfilDeUsuario/perfil_usuario.html';
    } else {
      window.location.href = '/pages/pag-registro/registro.html';
    }
    return;
  }

  if (favBtn) {
    e.preventDefault();
    if (token) {
      // redirige con hash para que la página de perfil sepa mostrar favoritos
      window.location.href = '/pages/pag-perfilDeUsuario/perfil_usuario.html#favoritos';
    } else {
      window.location.href = '/pages/pag-registro/registro.html';
    }
    return;
  }
});

// Funcionalidad para cerrar sesión
document.addEventListener('click', (e) => {
    const logoutBtn = e.target.closest('#btn-logout');
    if (!logoutBtn) return;

    e.preventDefault();

    // Limpiar sesión
    localStorage.removeItem('authToken');
    localStorage.removeItem('pastiaraUserData');
    localStorage.removeItem('pastiaraFavorites');

    // Redirigir a login
    window.location.href = '/pages/pag-registro/registro.html';

    // Toast opcional
    Toastify({
        text: "Has cerrado sesión",
        duration: 2500,
        gravity: "top",
        position: "right",
        style: { background: "linear-gradient(to right, #B58A6A, #B58A6A)" }
    }).showToast();
});





// ejecutar initSearch como ya haces (load)
window.addEventListener('load', initSearch);
// Alternativa más rápida si 'load' es muy lento: Intenta llamar initSearch() directamente aquí
// Y quita el window.addEventListener, confiando en que el script está al final del body.
// initSearch();