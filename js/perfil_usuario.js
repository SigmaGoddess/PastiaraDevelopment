document.addEventListener('DOMContentLoaded', function() {

    // --- SECCIÓN DE FUNCIONES AUXILIARES (DEFINIDAS PRIMERO PARA EVITAR ERRORES) ---

    // Función para limpiar cualquier intento de inyectar HTML (Anti-XSS)
    function sanitizeHTML(text) {
        const temp = document.createElement('div');
        temp.textContent = text;
        return temp.innerHTML;
    }

    // Funciones de validación
    function validateNombre(input) {
        let name = sanitizeHTML(input.value).trim().replace(/\s+/g, ' ');
        input.value = name;
        if (name.length < 2) { showError(input, 'El nombre es demasiado corto.'); return false; }
        if (/\d/.test(name)) { showError(input, 'El nombre no puede contener números.'); return false; }
        return true;
    }

    function validateFecha(input) {
        const dateString = input.value;
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/;
        if (!regex.test(dateString)) { showError(input, 'Usa el formato dd/mm/aaaa.'); return false; }
        const parts = dateString.split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            showError(input, 'La fecha no es válida (ej. 31/02/2000 no existe).');
            return false;
        }
        if (date > new Date()) {
            showError(input, 'La fecha de nacimiento no puede ser futura.');
            return false;
        }
        return true;
    }

    function validateTelefono(input) {
        const phone = input.value.replace(/\D/g, '');
        if (phone.length !== 10) { showError(input, 'El teléfono debe tener 10 dígitos.'); return false; }
        return true;
    }

    function validateCorreo(input) {
        const email = input.value.trim();
        input.value = email;
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) { showError(input, 'El formato del correo no es válido.'); return false; }
        return true;
    }

    // Funciones para mostrar y limpiar errores
    function showError(inputElement, message) {
        const parent = inputElement.parentElement;
        clearError(inputElement);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        inputElement.classList.add('is-invalid');
        parent.appendChild(errorDiv);
    }

    function clearError(inputElement) {
        const parent = inputElement.parentElement;
        const error = parent.querySelector('.error-message');
        if (error) error.remove();
        inputElement.classList.remove('is-invalid');
    }

    function clearAllErrors() {
        const dataContainer = document.getElementById('datos-personales-container');
        if (dataContainer) {
            dataContainer.querySelectorAll('.error-message').forEach(e => e.remove());
            dataContainer.querySelectorAll('.is-invalid').forEach(i => i.classList.remove('is-invalid'));
        }
    }

    // --- LÓGICA PRINCIPAL DE LA PÁGINA ---

    // 1. Navegación por Pestañas (Tabs)
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.tab;
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 2. Funcionalidad de "Datos Personales"
    const editBtn = document.getElementById('btn-editar');
    const dataContainer = document.getElementById('datos-personales-container');

    if (editBtn && dataContainer) {
        const fields = {
            nombre: { input: document.getElementById('input-nombre'), display: dataContainer.querySelector('[data-key="nombre"]') },
            fecha: { input: document.getElementById('input-fecha'), display: dataContainer.querySelector('[data-key="fecha"]') },
            telefono: { input: document.getElementById('input-telefono'), display: dataContainer.querySelector('[data-key="telefono"]') },
            correo: { input: document.getElementById('input-correo'), display: dataContainer.querySelector('[data-key="correo"]') }
        };

        function loadUserData() {
            const userDataJSON = localStorage.getItem('pastiaraUserData');
            if (userDataJSON) {
                const userData = JSON.parse(userDataJSON);
                if (userData.nombre) fields.nombre.display.textContent = userData.nombre;
                if (userData.fecha) fields.fecha.display.textContent = userData.fecha;
                if (userData.telefono) fields.telefono.display.textContent = userData.telefono;
                if (userData.correo) fields.correo.display.textContent = userData.correo;
            }
        }

        // --- CÓDIGO MODIFICADO ---
        editBtn.addEventListener('click', function() {
            // Verificamos si existe una "llave" en localStorage que indique que el usuario inició sesión.
            // **Importante:** Deberás asegurarte de crear esta llave al momento del login.
            if (!localStorage.getItem('authToken')) { // ** <---- Aquí se cambió pastiaraUserToken por authToken
                // Si la llave NO existe, el usuario no ha iniciado sesión.
                const authModal = document.getElementById('auth-modal');
                authModal.style.display = 'flex'; // Mostramos el modal
                // Agregamos la clase 'visible' para la transición de opacidad
                setTimeout(() => authModal.classList.add('visible'), 10);
                return; // Detenemos la ejecución para que no se active el modo de edición.
            }
    
            // El resto de tu código original continúa aquí si el usuario SÍ ha iniciado sesión
            const isEditing = dataContainer.classList.contains('editing');
            if (isEditing) {
                clearAllErrors();
                if (validateNombre(fields.nombre.input) && validateFecha(fields.fecha.input) && validateTelefono(fields.telefono.input) && validateCorreo(fields.correo.input)) {
                    const userDataToSave = {
                        nombre: fields.nombre.input.value,
                        fecha: fields.fecha.input.value,
                        telefono: fields.telefono.input.value,
                        correo: fields.correo.input.value
                    };
                    localStorage.setItem('pastiaraUserData', JSON.stringify(userDataToSave));
                    loadUserData();
                    dataContainer.classList.remove('editing');
                    editBtn.textContent = 'Editar';
                    Toastify({ text: "¡Datos guardados con éxito!", duration: 3000, gravity: "top", position: 'right', style: { background: "linear-gradient(to right, #B58A6A, #B58A6A)" } }).showToast();
                }
            } else {
                for (const key in fields) {
                    fields[key].input.value = fields[key].display.textContent;
                }
                dataContainer.classList.add('editing');
                editBtn.textContent = 'Guardar';
                fields.nombre.input.focus();
            }
        });
        // --- FIN DEL CÓDIGO MODIFICADO ---

        fields.nombre.input.addEventListener('input', (e) => {
            const filteredValue = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            e.target.value = filteredValue.slice(0, 20);
        });
        fields.fecha.input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
            if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
            e.target.value = value;
        });
        fields.telefono.input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '').slice(0, 10);
            let formattedValue = '';
            if (value.length > 0) formattedValue = value.slice(0, 2);
            if (value.length > 2) formattedValue += ' ' + value.slice(2, 6);
            if (value.length > 6) formattedValue += ' ' + value.slice(6, 10);
            e.target.value = formattedValue;
        });
        fields.correo.input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\s/g, '');
        });

        loadUserData();
    }

    // 3. Funcionalidad de "Favoritos"
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

    // 4. Funcionalidad de "Mis Cotizaciones"
    // ... (Tu código de cotizaciones permanece igual)
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

    // --- CÓDIGO NUEVO AÑADIDO PARA GESTIONAR EL MODAL ---
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        const closeModalBtn = document.getElementById('auth-modal-close');

        function closeModal() {
            authModal.classList.remove('visible');
            // Esperamos a que la transición termine para ocultar el elemento
            setTimeout(() => {
                authModal.style.display = 'none';
            }, 300); // Este tiempo debe coincidir con la duración de la transición en el CSS
        }

        closeModalBtn.addEventListener('click', closeModal);

        // Cierra el modal si se hace clic en el fondo oscuro
        authModal.addEventListener('click', function(event) {
            // Se cierra solo si el clic es en el overlay y no en el contenido
            if (event.target === authModal) {
                closeModal();
            }
        });
    }
    // --- FIN DEL CÓDIGO NUEVO AÑADIDO ---

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

// Mostrar la pestaña correspondiente según el hash (personales | favoritos)
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
    
});