document.addEventListener('DOMContentLoaded', function () {

    // --- SECCIÓN DE FUNCIONES AUXILIARES (DEFINIDAS PRIMERO PARA EVITAR ERRORES) ---

    // Función para limpiar cualquier intento de inyectar HTML (Anti-XSS)
    function sanitizeHTML(text) {
        const temp = document.createElement('div');
        temp.textContent = text;
        return temp.innerHTML;
    }

    // --- LÓGICA PRINCIPAL DE LA PÁGINA ---

    // Navegación por Pestañas (Tabs)
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.dataset.tab;
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Funcionalidad de "Favoritos"
    // ... (Tu código de favoritos permanece igual)
    const contenedorFavoritos = document.getElementById('favoritos-grid');
    if (contenedorFavoritos) {
        function cargarFavoritos() {
            const favoritos = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
            contenedorFavoritos.innerHTML = '';
            if (favoritos.length === 0) {
                contenedorFavoritos.innerHTML = '<p class="empty-favorites-message">Todavía no has agregado productos a tus favoritos.</p>';
                return;
            }
            favoritos.forEach(producto => {
                const columna = document.createElement('div');
                columna.className = 'favorite-product-item';
                columna.innerHTML = `
                    <div class="product-card">
                        <div class="product-image-container">
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
                            <button class="heart-favorite active" data-product-id="${producto.id}" aria-label="Eliminar ${producto.nombre} de favoritos">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                        <div class="product-info">
                            <h3>${producto.nombre}</h3>
                            <p class="price">${producto.precio}</p>
                            <p class="description">${producto.descripcion}</p>
                        </div>
                    </div>`;
                contenedorFavoritos.appendChild(columna);
            });
        }
        cargarFavoritos();
        contenedorFavoritos.addEventListener('click', (e) => {
            const heartButton = e.target.closest('.heart-favorite');
            if (heartButton) {
                const productoId = heartButton.dataset.productId;
                eliminarFavorito(productoId);
            }
        });
        function eliminarFavorito(id) {
            let favoritos = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
            const nuevosFavoritos = favoritos.filter(producto => producto.id !== id);
            localStorage.setItem('pastiaraFavorites', JSON.stringify(nuevosFavoritos));
            cargarFavoritos();
            Toastify({ text: "Eliminado de favoritos", duration: 2000, gravity: "bottom", position: "right" }).showToast();
        }
    }

    // Funcionalidad de "Mis Cotizaciones"
    const contenedorCotizaciones = document.getElementById('contenedor-cotizaciones');
    if (contenedorCotizaciones) {
        function cargarCotizaciones() {
            contenedorCotizaciones.innerHTML = '<p class="loading-message">Cargando tus cotizaciones...</p>';
            fetch('/api/cotizaciones/mis-cotizaciones')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo obtener la información del servidor. Código: ' + response.status);
                    }
                    return response.json();
                })
                .then(cotizaciones => {
                    contenedorCotizaciones.innerHTML = '';
                    if (cotizaciones && cotizaciones.length > 0) {
                        cotizaciones.forEach(cotizacion => {
                            const productosHTML = cotizacion.productos.map(p => `
                                <li class="producto-item">
                                    <span>${p.cantidad} x ${sanitizeHTML(p.nombre)}</span>
                                    <span>$${p.total.toFixed(2)}</span>
                                </li>
                            `).join('');
                            const cotizacionCardHTML = `
                                <div class="card-cotizacion">
                                    <div class="card-header">
                                        <h3>Evento: ${sanitizeHTML(cotizacion.tipoEvento)}</h3>
                                        <p><strong>Fecha:</strong> ${new Date(cotizacion.fechaEvento).toLocaleDateString()}</p>
                                    </div>
                                    <div class="card-body">
                                        <p><strong>Dirección de Envío:</strong></p>
                                        <address>
                                            ${sanitizeHTML(cotizacion.calle)} ${sanitizeHTML(cotizacion.numeroExterior)}
                                            <br>${sanitizeHTML(cotizacion.colonia)}, C.P. ${sanitizeHTML(cotizacion.codigoPostal)}
                                            <br>${sanitizeHTML(cotizacion.municipio)}, ${sanitizeHTML(cotizacion.estado)}
                                        </address>
                                        <h4>Productos:</h4>
                                        <ul class="lista-productos-cotizacion">
                                            ${productosHTML}
                                        </ul>
                                    </div>
                                    <div class="card-footer">
                                        <p><strong>Suma Total: $${cotizacion.sumaTotal.toFixed(2)}</strong></p>
                                    </div>
                                </div>
                            `;
                            contenedorCotizaciones.innerHTML += cotizacionCardHTML;
                        });
                    } else {
                        contenedorCotizaciones.innerHTML = '<p class="empty-message">Aún no tienes cotizaciones.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error al cargar las cotizaciones:', error);
                    contenedorCotizaciones.innerHTML = '<p class="error-message">Hubo un problema al cargar tus cotizaciones. Por favor, intenta de nuevo más tarde.</p>';
                });
        }
        cargarCotizaciones();
    }

    //* Código para la sección según el hash en la url
    window.addEventListener('load', () => {
        const hash = window.location.hash;
        if (hash) {
            const tabName = hash.substring(1);
            const navLinks = document.querySelectorAll('.sidebar-nav a');
            const tabContents = document.querySelectorAll('.tab-content');

            // Quitar clases activas actuales
            navLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Activar la pestaña y link que correspondan
            const targetTab = document.getElementById(tabName);
            const targetLink = document.querySelector(`.sidebar-nav a[data-tab="${tabName}"]`);

            if (targetTab && targetLink) {
                targetTab.classList.add('active');
                targetLink.classList.add('active');
            }
        }
    });

});

// --------------- FUNCIÓN PARA TRAER DATOS DEL USUARIO DESDE BASE DE DATOS UNA VEZ LOGGEADO ----------------------


const token = localStorage.getItem('authToken'); // Suponiendo que el token JWT se guarda en localStorage bajo la llave 'authToken'
const API_PROFILE_URL = 'https://pastiara.duckdns.org/api/auth/profile';

/**
 * Mapear respuesta del API a los campos de la UI y inputs editables.
 */


function populateUserProfile(user) {
    if (!user) return;

    const nombre = user.nombre || user.name || user.fullName || '';
    const correo = user.email || user.correo || user.mail || '';
    const telefono = user.numeroTelefono || user.phone || user.telefonoMovil || '';

    const elNombreDisplay = document.querySelector('[data-key="nombre"]');
    const elTelefonoDisplay = document.querySelector('[data-key="telefono"]');
    const elCorreoDisplay = document.querySelector('[data-key="correo"]');

    const inputNombre = document.getElementById('input-nombre');
    const inputTelefono = document.getElementById('input-telefono');
    const inputCorreo = document.getElementById('input-correo');

    if (elNombreDisplay) elNombreDisplay.textContent = nombre;
    if (elTelefonoDisplay) elTelefonoDisplay.textContent = telefono;
    if (elCorreoDisplay) elCorreoDisplay.textContent = correo;

    if (inputNombre) inputNombre.value = nombre;
    if (inputTelefono) inputTelefono.value = telefono;
    if (inputCorreo) inputCorreo.value = correo;
}

// Ejecutar fetch y poblar UI después de cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Si no hay token usar datos locales si existen
        const local = localStorage.getItem('pastiaraUserData');
        if (local) {
            populateUserProfile(JSON.parse(local));
        }
        return;
    }

    (async () => {
        try {
            const API_PROFILE_URL = 'https://pastiara.duckdns.org/api/auth/profile';
            const resp = await fetch(API_PROFILE_URL, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!resp.ok) {
                console.warn('No se pudo obtener perfil. Status:', resp.status);
                const local = localStorage.getItem('pastiaraUserData');
                if (local) populateUserProfile(JSON.parse(local));
                return;
            }
            const userData = await resp.json();
            populateUserProfile(userData);
            console.log('Perfil cargado:', userData);
        } catch (err) {
            console.error('Error fetch perfil:', err);
            const local = localStorage.getItem('pastiaraUserData');
            if (local) populateUserProfile(JSON.parse(local));
        }
    })();
});

// --- EDIT PROFILE MODAL HANDLERS ---
(function () {
    const modal = document.getElementById('edit-profile-modal');
    const btnEditar = document.getElementById('btn-editar');
    const closeBtns = [
        document.getElementById('edit-modal-close'),
        document.getElementById('edit-cancel')
    ].filter(Boolean);
    const inputNombre = document.getElementById('edit-nombre');
    const inputTelefono = document.getElementById('edit-telefono');
    const inputCorreo = document.getElementById('edit-correo');
    const saveBtn = document.getElementById('edit-save');
    const API = 'https://pastiara.duckdns.org/api/auth/profile';

    function openModal() {
        // rellenar con valores visibles / inputs actuales
        const current = {
            nombre: document.querySelector('[data-key="nombre"]')?.textContent?.trim() || '',
            telefono: document.querySelector('[data-key="telefono"]')?.textContent?.trim() || '',
            correo: document.querySelector('[data-key="correo"]')?.textContent?.trim() || ''
        };
        if (inputNombre) inputNombre.value = current.nombre === 'Sin especificar' ? '' : current.nombre;
        if (inputTelefono) inputTelefono.value = current.telefono === 'Sin especificar' ? '' : current.telefono;
        if (inputCorreo) inputCorreo.value = current.correo === 'Sin especificar' ? '' : current.correo;

        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('visible'), 10);
        inputNombre?.focus();
    }

    function closeModal() {
        modal.classList.remove('visible');
        setTimeout(() => modal.style.display = 'none', 200);
    }

    async function saveChanges() {
        // validaciones sencillas
        const nombre = (inputNombre?.value || '').trim();
        const telefono = (inputTelefono?.value || '').trim();
        const correo = (inputCorreo?.value || '').trim();
        if (nombre.length < 2) { alert('Nombre inválido'); return; }
        if (telefono && !/^\d{7,15}$/.test(telefono)) { alert('Teléfono inválido'); return; }
        if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) { alert('Correo inválido'); return; }

        const payload = { nombre, numeroTelefono: telefono, email: correo };

        // actualiza UI optimista
        populateUserProfile({ nombre, telefono, correo });

        // envia al backend si token existe
        const token = localStorage.getItem('authToken');
        if (!token) { closeModal(); return; }

        try {
            const res = await fetch(API, {
                method: 'PATCH', // o 'PUT' según tu API
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                throw new Error('Error al guardar');
            }
            const updated = await res.json();
            populateUserProfile(updated);
            Toastify({ text: "Datos actualizados", duration: 2000, gravity: "bottom", position: "right" }).showToast();
            closeModal();
        } catch (err) {
            console.error(err);
            alert('No se pudo guardar. Intenta más tarde.');
            // revertir si quieres: recargar desde localStorage o re-fetch
        }
    }

    if (btnEditar) btnEditar.addEventListener('click', openModal);
    closeBtns.forEach(b => b.addEventListener('click', closeModal));
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    if (saveBtn) saveBtn.addEventListener('click', saveChanges);
})();



// --------------- GESTIÓN DE PESTAÑAS SEGÚN EL HASH EN LA URL ----------------------
// Mostrar la pestaña correspondiente según el hash (personales | favoritos | cotizaciones)
(function handleInitialHashAndChanges() {
    function activateTabByName(tabName) {
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        const tabContents = document.querySelectorAll('.tab-content');

        navLinks.forEach(navLink => navLink.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        const targetLink = document.querySelector(`.sidebar-nav a[data-tab="${tabName}"]`);
        const targetTab = document.getElementById(tabName);

        if (targetLink && targetTab) {
            targetLink.classList.add('active');
            targetTab.classList.add('active');
        }
    }

    function handleHash() {
        const hash = (window.location.hash || '').replace('#', '');
        if (hash === 'favoritos' || hash === 'cotizaciones' || hash === 'personales') {
            activateTabByName(hash);
        } else {
            // si no hay hash válido, mostrar personales por defecto
            activateTabByName('personales');
        }
    }

    // al cargar la página
    document.addEventListener('DOMContentLoaded', handleHash);
    // cuando cambia el hash (cuando el navbar redirige con #favoritos)
    window.addEventListener('hashchange', handleHash);
})();

// Listener para el botón de cerrar sesión dentro del perfil
document.addEventListener('click', (e) => {
    const logoutBtn = e.target.closest('#btn-logout');
    if (!logoutBtn) return;

    e.preventDefault();

    // 1. Limpiar sesión
    localStorage.removeItem('authToken'); // <--- Cambiar por token de la base de datos
    localStorage.removeItem('pastiaraUserData');
    localStorage.removeItem('pastiaraFavorites');

    // 2. Redirigir a login
    window.location.href = '/pages/pag-registro/registro.html';

    // 3. Mensaje opcional
    Toastify({
        text: "Has cerrado sesión",
        duration: 2500,
        gravity: "top",
        position: "right",
        style: { background: "linear-gradient(to right, #B58A6A, #B58A6A)" }
    }).showToast();
});


