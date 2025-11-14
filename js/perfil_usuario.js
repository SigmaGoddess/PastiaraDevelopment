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

    // FUNCIONALIDAD DE FAVORITOS
    const contenedorFavoritos = document.getElementById('favoritos-grid');

    if (contenedorFavoritos) {

        // Obtenemos el token para las peticiones
        const token = localStorage.getItem('authToken');

        /**
         * Carga los favoritos desde la API del backend.
         */
        async function cargarFavoritos() {
            const contenedorFavoritos = document.getElementById('favoritos-grid');
            if (!contenedorFavoritos) return;

            const token = localStorage.getItem('authToken');
            if (!token) {
                contenedorFavoritos.innerHTML = '<p class="empty-favorites-message">Debes iniciar sesión para ver tus favoritos.</p>';
                return;
            }

            try {
                const response = await fetch('https://pastiara.duckdns.org/api/favoritos', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const favoritos = await response.json();

                if (!favoritos || favoritos.length === 0) {
                    contenedorFavoritos.innerHTML = '<p class="empty-favorites-message">Aún no tienes productos favoritos.</p>';
                    return;
                }

                contenedorFavoritos.innerHTML = '';
                favoritos.forEach(producto => {
                    // 1. Creamos la tarjeta como el elemento principal
                    const cardElement = document.createElement('div');
                    cardElement.className = 'product-card'; // La tarjeta ES el item del grid

                    // 2. Llenamos su HTML (sin el div "product-card" extra)
                    cardElement.innerHTML = `
                         <div class="product-image-container">
                            <img src="${producto.imagenUrl || '/images/placeholder.webp'}" alt="${sanitizeHTML(producto.nombre)}" class="product-image">
                            <button class="heart-favorite" data-product-id="${producto.id}" aria-label="Marcar como favorito"><i class="fas fa-heart"></i></button>
                         </div>
                         <div class="product-info">
                            <h3>${sanitizeHTML(producto.nombre)}</h3>
                            ${producto.precio ? `<p class="price">$${producto.precio}</p>` : ''}
                            ${producto.descripcion ? `<p class="description">${sanitizeHTML(producto.descripcion)}</p>` : ''}
                        </div>
`;
                    6
                    // 3. Añadimos la tarjeta directamente al grid
                    contenedorFavoritos.appendChild(cardElement);
                });
                // Agregar manejador de eventos para quitar favoritos
                contenedorFavoritos.addEventListener('click', async (e) => {
                    const heartBtn = e.target.closest('.heart-favorite');
                    if (!heartBtn) return;

                    const productId = heartBtn.dataset.productId;
                    if (!productId) return;

                    try {
                        const response = await fetch(`https://pastiara.duckdns.org/api/favoritos/${productId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (!response.ok) {
                            throw new Error('Error al quitar de favoritos');
                        }

                        // UI: quitar el producto inmediatamente
                        heartBtn.closest('.product-card').remove();

                        // Si no quedan favoritos, mostrar mensaje
                        if (contenedorFavoritos.children.length === 0) {
                            contenedorFavoritos.innerHTML = '<p class="empty-favorites-message">Aún no tienes productos favoritos.</p>';
                        }

                        Toastify({
                            text: "Quitado de favoritos",
                            duration: 2000,
                            gravity: "bottom",
                            position: "right",
                            style: { background: "#B58A6A" }
                        }).showToast();

                    } catch (error) {
                        console.error('Error:', error);
                        Toastify({
                            text: "No se pudo quitar el producto de favoritos",
                            duration: 2000,
                            gravity: "bottom",
                            position: "right",
                            style: { background: "#ff4444" }
                        }).showToast();
                    }
                });

            } catch (error) {
                console.error('Error al cargar favoritos:', error);
                contenedorFavoritos.innerHTML = '<p class="error-message">Error al cargar tus favoritos. Intenta más tarde.</p>';
            }
        }

        // Carga inicial al entrar a la pestaña
        cargarFavoritos();
    }

    // ===============================================================================================

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
/*(function () {
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
})();*/



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

const resumenes = document.querySelectorAll('.cotizacion-resumen');

// 2. Recorre cada uno y les añade un "escuchador" de clics
resumenes.forEach(resumen => {

    resumen.addEventListener('click', () => {

        // 3. Busca el contenedor padre (el .cotizacion-item)
        const item = resumen.closest('.cotizacion-item');

        // 4. "Conmuta" (toggle) la clase 'active'
        //    Si la tiene, se la quita. Si no la tiene, se la pone.
        item.classList.toggle('active');

    });
});



// Codigo para cargar el resumen de cotizaziones

document.addEventListener("DOMContentLoaded", () => {

    // 1. Elemento contenedor
    const historialContainer = document.getElementById("contenedor-cotizaciones");
    if (!historialContainer) {
        console.error("No se encontró el contenedor #contenedor-cotizaciones");
        return;
    }

    // 2. Llama a la función principal para cargar los datos
    cargarHistorial(historialContainer);

    // 3. --- ¡LÓGICA DEL ACORDEÓN RESTAURADA! ---
    // Añadimos un listener al contenedor (delegación de eventos)
    historialContainer.addEventListener("click", (event) => {

        // Buscamos si el clic fue en el resumen
        const resumenClickeado = event.target.closest(".cotizacion-resumen");

        // Si no se hizo clic en un resumen, no hacemos nada
        if (!resumenClickeado) return;

        // Si se hizo clic, encontramos el 'item' padre
        const cotizacionItem = resumenClickeado.closest(".cotizacion-item");
        if (!cotizacionItem) return;

        // --- ¡LA MAGIA! ---
        // Alternamos (toggle) la clase 'active' en el item padre.
        // Tu CSS se encargará de la animación.
        cotizacionItem.classList.toggle("active");

        // (Bonus) Cambiamos el icono de '+' a '−'
        const icono = cotizacionItem.querySelector(".icono");
        if (icono) {
            if (cotizacionItem.classList.contains("active")) {
                icono.textContent = "−"; // Signo de menos
            } else {
                icono.textContent = "+";
            }
        }
    });
});

/**
 * ========================================
 * FUNCIÓN PRINCIPAL DE CARGA
 * ========================================
 */
async function cargarHistorial(container) {
    const apiUrl = "https://pastiara.duckdns.org/api/cotizaciones"; // O /api/cotizaciones/mis-cotizaciones
    container.innerHTML = "<p>Cargando historial...</p>";

    // Usamos el token de localStorage (como lo pediste)
    const token = localStorage.getItem("authToken");

    if (!token) {
        container.innerHTML = "<p>Debes <a href='/login.html'>iniciar sesión</a> para ver tu historial.</p>";
        return;
    }

    try {
        // Llama a la API con el token
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                container.innerHTML = "<p>Tu sesión ha expirado. Por favor, <a href='/login.html'>inicia sesión</a>.</p>";
            } else {
                throw new Error("No se pudo cargar el historial.");
            }
            return;
        }

        const cotizaciones = await response.json();

        if (cotizaciones.length === 0) {
            container.innerHTML = '<p style="color: #999;">Aún no tienes cotizaciones en tu historial.</p>';
            return;
        }

        // Limpia el contenedor y construye el HTML
        container.innerHTML = "";
        cotizaciones.forEach(cotizacion => {
            container.innerHTML += buildCotizacionHtml(cotizacion);
        });

    } catch (error) {
        console.error("Error al cargar historial:", error);
        container.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}


/**
 * ========================================
 * FUNCIONES AUXILIARES (BUILDERS)
 * ========================================
 * (Estas funciones son idénticas a las que te di antes,
 * construyen el HTML basado en tu plantilla)
 */

function buildProductosHtml(detalles) {
    if (!detalles || detalles.length === 0) {
        return "<p>Esta cotización no tiene productos.</p>";
    }

    const productosPorCategoria = detalles.reduce((acc, detalle) => {
        const categoria = detalle.categoriaNombre || "Otros";
        if (!acc[categoria]) acc[categoria] = [];
        acc[categoria].push(detalle);
        return acc;
    }, {});

    let html = "";
    for (const categoriaNombre in productosPorCategoria) {
        html += `
            <div class="producto-categoria">
                <h4 class="categoria-titulo">${categoriaNombre}</h4>
                <ul class="lista-productos">
        `;
        productosPorCategoria[categoriaNombre].forEach(detalle => {
            html += `
                <li class="producto-item">
                    <span class="producto-nombre">${detalle.nombreProducto}</span>
                    <span class="producto-cantidad">x ${detalle.cantidad}</span>
                </li>
            `;
        });
        html += `</ul></div>`;
    }
    return html;
}

function buildDireccionHtml(direccion) {
    if (!direccion) return "<p>Sin dirección registrada.</p>";
    return `
        <p>
            ${direccion.calle || ''}<br>
            ${direccion.colonia || ''}, ${direccion.municipio || ''}, C.P. ${direccion.codigoPostal || ''}<br>
            ${direccion.estado || ''}
        </p>
    `;
}

function buildCotizacionHtml(cotizacion) {

    const fechaEnvio = new Date(cotizacion.fechaCreacion).toLocaleDateString("es-MX");
    const fechaEvento = new Date(cotizacion.fechaEvento).toLocaleDateString("es-MX");
    const total = cotizacion.totalCotizado.toFixed(2);
    const productosHtml = buildProductosHtml(cotizacion.detalles);
    const direccionHtml = buildDireccionHtml(cotizacion.direccionEnvio);

    // Plantilla final (los detalles están ocultos por defecto por tu CSS)
    return `
        <div class="cotizacion-item">
            <div class="cotizacion-resumen">
                <div class="resumen-info">
                    <div class="resumen-fila">
                        <div class="info-item">
                            <small>Id cotización:</small>
                            <strong>#${String(cotizacion.id).padStart(3, '0')}</strong>
                        </div>
                        <div class="info-item">
                            <small>Tipo de evento:</small>
                            <strong>${cotizacion.tipoDeEvento || 'N/A'}</strong>
                        </div>
                    </div>
                    <div class="resumen-fila">
                        <div class="info-item">
                            <small>Fecha de envío:</small>
                            <strong>${fechaEnvio}</strong>
                        </div>
                        <div class="info-item">
                            <small>Total:</small>
                            <strong>$${total}</strong>
                        </div>
                    </div>
                </div>
                <div class="resumen-accion">
                    <span class="icono">+</span> 
                </div>
            </div>
            <div class="cotizacion-detalles"> 
                <div class="detalles-body">
                    <div class="detalles-columna">
                        <div class="detalle-bloque">
                            <strong>Dirección de Envío:</strong>
                            ${direccionHtml}
                        </div>
                        <div class="detalle-bloque">
                            <strong>Fecha de evento:</strong>
                            <p>${fechaEvento}</p>
                        </div>
                        <div class="detalle-bloque">
                            <strong>Comentarios Adicionales:</strong>
                            <p>"${cotizacion.comentarios || 'Sin comentarios'}"</p>
                        </div>
                    </div>
                    <div class="detalles-columna">
                        <div class="detalle-bloque">
                            <strong>Productos Cotizados:</strong>
                            ${productosHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


