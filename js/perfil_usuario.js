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
    // Funcionalidad de "Favoritos"
    const contenedorFavoritos = document.getElementById('favoritos-grid');

    if (contenedorFavoritos) {

        // Obtenemos el token para las peticiones
        const token = localStorage.getItem('authToken');

        /**
         * Carga los favoritos desde la API del backend.
         * Ya no usa localStorage.
         */
        async function cargarFavoritos() {
            // Si no hay token, el usuario no ha iniciado sesión.
            if (!token) {
                contenedorFavoritos.innerHTML = '<p class="empty-favorites-message">Debes iniciar sesión para ver tus favoritos.</p>';
                return;
            }

            contenedorFavoritos.innerHTML = '<p class="loading-message">Cargando tus favoritos...</p>';

            try {
                // NUEVO: Llamada a tu API de backend
                const response = await fetch('/api/favoritos', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    // Maneja errores (ej. token expirado 401, o error 500)
                    throw new Error('No se pudo cargar favoritos. Status: ' + response.status);
                }

                // La respuesta de tu controller es Set<ProductoResponseDTO>
                const favoritos = await response.json();

                contenedorFavoritos.innerHTML = ''; // Limpiar "Cargando..."

                if (!favoritos || favoritos.length === 0) {
                    contenedorFavoritos.innerHTML = '<p class="empty-favorites-message">Todavía no has agregado productos a tus favoritos.</p>';
                    return;
                }

                // Renderizamos los productos que vinieron de la base de datos
                // Asumimos que tu ProductoResponseDTO tiene: id, imagen, nombre, precio, descripcion
                favoritos.forEach(producto => {
                    const columna = document.createElement('div');
                    columna.className = 'favorite-product-item';

                    // Usamos tu función de sanitizar por seguridad
                    const nombreSeguro = sanitizeHTML(producto.nombre);
                    const descSegura = sanitizeHTML(producto.descripcion || 'Sin descripción'); // Fallback si no viene
                    const precioFormateado = producto.precio ? `$${Number(producto.precio).toFixed(2)}` : 'Precio no disponible';

                    columna.innerHTML = `
                        <div class="product-card">
                            <div class="product-image-container">
                                <img src="${producto.imagen}" alt="${nombreSeguro}" class="product-image">
                                <button class="heart-favorite active" data-product-id="${producto.id}" aria-label="Eliminar ${nombreSeguro} de favoritos">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                            <div class="product-info">
                                <h3>${nombreSeguro}</h3>
                                <p class="price">${precioFormateado}</p>
                                <p class="description">${descSegura}</p>
                            </div>
                        </div>`;
                    contenedorFavoritos.appendChild(columna);
                });

            } catch (error) {
                console.error('Error al cargar favoritos:', error);
                contenedorFavoritos.innerHTML = '<p class="error-message">Hubo un problema al cargar tus favoritos. Por favor, intenta de nuevo más tarde.</p>';
            }
        }

        /**
         * Elimina un favorito llamando a la API del backend.
         * Ya no usa localStorage.
         */
        async function eliminarFavorito(id) {
            if (!token) {
                Toastify({ text: "Debes iniciar sesión para hacer esto", duration: 2000 }).showToast();
                return;
            }

            try {
                // NUEVO: Llamada DELETE a tu API de backend
                const response = await fetch(`/api/favoritos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    // Tu controller devuelve 204 (noContent) si tiene éxito.
                    // !response.ok se activará para 404, 500, 401, etc.
                    throw new Error('No se pudo eliminar el favorito.');
                }

                // Éxito
                Toastify({ text: "Eliminado de favoritos", duration: 2000, gravity: "bottom", position: "right" }).showToast();

                // Recargamos la lista desde el servidor para que se refleje el cambio
                cargarFavoritos();

            } catch (error) {
                console.error('Error al eliminar favorito:', error);
                Toastify({ text: "Error al eliminar. Intenta más tarde.", duration: 2000, gravity: "bottom" }).showToast();
            }
        }

        // --- Event Listener (Sin cambios) ---
        // Este listener ya está bien, porque llama a las funciones por su nombre.
        // Ahora simplemente llamará a las nuevas versiones "async" que usan fetch.
        contenedorFavoritos.addEventListener('click', (e) => {
            const heartButton = e.target.closest('.heart-favorite');
            if (heartButton) {
                const productoId = heartButton.dataset.productId;
                eliminarFavorito(productoId); // Llama a la nueva función
            }
        });

        // Carga inicial al entrar a la pestaña
        cargarFavoritos();
    }

    /*// Funcionalidad de "Mis Cotizaciones"
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
    }*/

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


