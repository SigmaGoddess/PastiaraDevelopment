// Se ejecuta cuando todo el contenido del DOM ha sido cargado y está listo.
document.addEventListener('DOMContentLoaded', function() {

    // =================================================================
    // 1. LÓGICA PARA NAVEGACIÓN POR PESTAÑAS
    // =================================================================
    const navLinks = document.querySelectorAll('aside .nav-link');
    const sections = document.querySelectorAll('main > section');

    /**
     * Muestra una sección específica y resalta su enlace de navegación correspondiente.
     * @param {string} targetId - El ID de la sección a mostrar (ej. '#datos-personales-section').
     */
    function showSection(targetId) {
        // Oculta todas las secciones para empezar de cero.
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Encuentra y muestra la sección objetivo.
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Encuentra y resalta el enlace de navegación correspondiente.
        const activeLink = document.querySelector(`a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Agrega un listener a cada enlace para cambiar de sección al hacer clic.
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evita el salto de página brusco.
            const targetId = this.getAttribute('href');
            showSection(targetId);
        });
    });

    // Por defecto, muestra la primera sección al cargar la página.
    if (navLinks.length > 0) {
        const initialTargetId = navLinks[0].getAttribute('href');
        showSection(initialTargetId);
    }
    
    // =================================================================
    // 2. CONEXIÓN DE BOTONES CON SUS FUNCIONES
    // =================================================================
    const editButton = document.getElementById('btn-editar');
    if (editButton) {
        editButton.addEventListener('click', handleEditProfile);
    }

    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(icon => {
        icon.addEventListener('click', () => toggleFavorite(icon));
    });

    const deleteButton = document.querySelector('.btn-delete');
    if (deleteButton) {
        deleteButton.addEventListener('click', handleDeleteAccount);
    }
    
    const quoteButton = document.getElementById('btn-cotizar');
    if(quoteButton){
        quoteButton.addEventListener('click', handleQuoteRequest);
    }
});


// =================================================================
// 3. DEFINICIÓN DE LAS FUNCIONES DE LOS BOTONES
// =================================================================

// Variable para controlar si el perfil está en modo de edición.
let isEditingProfile = false;

/**
 * Activa o desactiva el modo de edición para los datos personales.
 */
function handleEditProfile() {
    const datosContainer = document.getElementById('datos-personales-container');
    const btnEditarTexto = document.getElementById('btn-editar-texto');

    if (!isEditingProfile) {
        // --- MODO EDICIÓN: Convierte el texto en campos de entrada ---
        datosContainer.querySelectorAll('p').forEach(p => {
            const label = p.querySelector('strong').textContent;
            const span = p.querySelector('span');
            if (span) {
                const currentValue = span.textContent;
                const key = span.dataset.key;
                p.innerHTML = `<strong>${label}</strong> <input type="text" data-key="${key}" class="edit-input" value="${currentValue}">`;
            }
        });
        
        btnEditarTexto.textContent = 'Guardar';
        isEditingProfile = true;

    } else {
        // --- MODO GUARDAR: Convierte los campos de entrada de vuelta a texto ---
        datosContainer.querySelectorAll('input').forEach(input => {
            const key = input.dataset.key;
            const newValue = input.value;
            const p = input.parentElement;
            const label = p.querySelector('strong').textContent;
            p.innerHTML = `<strong>${label}</strong> <span data-key="${key}">${newValue}</span>`;
        });

        btnEditarTexto.textContent = 'Editar';
        isEditingProfile = false;
        // Muestra una notificación de éxito.
        showToast('Datos guardados exitosamente', 'success');
    }
}

/**
 * Añade o quita un artículo de favoritos.
 * @param {HTMLElement} heartElement - El ícono de corazón que fue clickeado.
 */
function toggleFavorite(heartElement) {
    const isActive = heartElement.classList.toggle('favorite-active');
    const path = heartElement.querySelector('path');
    
    // Cambia el color del corazón y muestra una notificación.
    if (isActive) {
        path.setAttribute('fill', '#916e55'); // Color café de la marca
        showToast('Agregado a favoritos', 'info');
    } else {
        path.setAttribute('fill', 'white'); // Color original
        showToast('Eliminado de favoritos', 'info');
    }
}

/**
 * Pide confirmación y simula la eliminación de la cuenta.
 */
function handleDeleteAccount() {
    const confirmed = confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmed) {
        // Aquí iría la lógica para llamar a un API y eliminar la cuenta.
        // Por ahora, solo mostramos una notificación.
        showToast('La cuenta ha sido eliminada.', 'warning');
    }
}

/**
 * Muestra un mensaje informativo para la función de cotizar.
 */
function handleQuoteRequest() {
    showToast('Esta funcionalidad estará disponible pronto.', 'info');
}


// =================================================================
// 4. FUNCIÓN AUXILIAR PARA NOTIFICACIONES (TOASTIFY)
// =================================================================

/**
 * Muestra una notificación en pantalla usando la librería Toastify.
 * @param {string} message - El texto a mostrar.
 * @param {string} type - El tipo de notificación ('info', 'success', 'warning').
 */
function showToast(message, type = 'info') {
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = 'linear-gradient(to right, #00b09b, #96c93d)';
            break;
        case 'warning':
            backgroundColor = 'linear-gradient(to right, #ff5f6d, #ffc371)';
            break;
        case 'info':
        default:
            backgroundColor = '#916e55'; // Color primario de la marca
            break;
    }

    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: backgroundColor,
            borderRadius: "8px",
        },
    }).showToast();
}