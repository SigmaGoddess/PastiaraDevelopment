// 'DOMContentLoaded' es un evento que se dispara cuando el HTML ha sido completamente cargado y parseado.
// Es una buena práctica envolver todo nuestro código en este listener para asegurarnos de que todos los elementos HTML existen antes de intentar manipularlos.
document.addEventListener('DOMContentLoaded', function() {

    // -- LÓGICA PARA LOS MODALES DE BOOTSTRAP --

    // Obtenemos una referencia a nuestros elementos modales del HTML usando sus IDs.
    const registerModalEl = document.getElementById('registerModal');
    const loginModalEl = document.getElementById('loginModal');

    // Creamos instancias de los modales de Bootstrap. Esto nos da un objeto con métodos para controlarlos (como .show() y .hide()).
    const registerModal = new bootstrap.Modal(registerModalEl);
    const loginModal = new bootstrap.Modal(loginModalEl);

    // Hacemos que nuestras funciones para abrir los modales sean globales (asignándolas a 'window').
    // De esta forma, los atributos 'onclick' del HTML pueden encontrarlas y ejecutarlas.
    window.openRegisterModal = function() {
        registerModal.show();
    }

    window.openLoginModal = function() {
        loginModal.show();
    }

    // -- LÓGICA PARA EL FORMULARIO DE REGISTRO --
    window.handleRegister = function() {
        // Obtenemos los valores de los campos del formulario. '.value' nos da el texto que el usuario escribió.
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Validación simple.
        if (!name || !email || !password) {
            // Usamos Toastify para mostrar un mensaje de error.
            Toastify({ text: "Por favor, completa todos los campos.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#e74c3c" }).showToast();
            return; // Detenemos la función si hay un error.
        }

        if (password !== confirmPassword) {
            Toastify({ text: "Las contraseñas no coinciden.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#e74c3c" }).showToast();
            return;
        }

        // Si todo está bien (en una app real, aquí enviaríamos los datos a un servidor).
        console.log('Registrando usuario:', { name, email });
        
        Toastify({ text: `¡Bienvenido, ${name}! Tu cuenta ha sido creada.`, duration: 3000, gravity: "top", position: "right", backgroundColor: "#2ecc71" }).showToast();
        
        registerModal.hide(); // Cerramos el modal.
        document.getElementById('registerForm').reset(); // Limpiamos el formulario.
    }

    // -- LÓGICA PARA EL FORMULARIO DE INICIO DE SESIÓN --
    window.handleLogin = function() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            Toastify({ text: "Ingresa tu correo y contraseña.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#e74c3c" }).showToast();
            return;
        }

        // Lógica de inicio de sesión (simulada). En una aplicación real, aquí se verificarían las credenciales con un servidor.
        console.log('Iniciando sesión con:', { email });
        
        Toastify({ text: "¡Has iniciado sesión correctamente!", duration: 3000, gravity: "top", position: "right", backgroundColor: "#2ecc71" }).showToast();
        
        loginModal.hide();
        document.getElementById('loginForm').reset();
    }


    // -- LÓGICA PARA EL SCROLL SUAVE --
    // Esta función permite que los enlaces de navegación se desplacen suavemente a las secciones correspondientes.
    window.scrollToSection = function(sectionId) {
        // Buscamos la sección en el documento por su ID.
        const section = document.getElementById(sectionId);
        if (section) {
            // El método 'scrollIntoView' nos desplaza suavemente hasta el elemento.
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }


    // -- LÓGICA DEL SISTEMA DE FAVORITOS --
    
    // Función para cargar los favoritos guardados en el LocalStorage cuando la página carga.
    function loadFavorites() {
        // LocalStorage es un almacenamiento web que guarda datos en el navegador y persisten incluso después de cerrar la página.
        // Obtenemos la lista de favoritos. Si no existe, creamos un array vacío.
        const favorites = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        
        // Por cada producto favorito, buscamos su icono de corazón y le añadimos la clase 'favorite'.
        favorites.forEach(productName => {
            const heartIcon = document.querySelector(`.heart-favorite[data-product="${productName}"]`);
            if (heartIcon) {
                heartIcon.classList.add('favorite');
            }
        });
    }

    // Hacemos nuestra función de 'toggle' global para que el 'onclick' del HTML la pueda llamar.
    window.toggleFavorite = function(productName) {
        // Seleccionamos el icono del corazón específico del producto en el que se hizo clic.
        const heartIcon = document.querySelector(`.heart-favorite[data-product="${productName}"]`);
        
        // 'classList.toggle' es muy útil: si la clase existe, la quita; si no existe, la añade.
        const isFavorite = heartIcon.classList.toggle('favorite');

        // Actualizamos la lista de favoritos en el LocalStorage.
        let favorites = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        
        if (isFavorite) {
            // Si ahora es favorito, lo añadimos a la lista (si no estaba ya).
            if (!favorites.includes(productName)) {
                favorites.push(productName);
            }
            Toastify({ text: "Añadido a favoritos ❤️", duration: 2000, gravity: "bottom", position: "center", style: { background: "linear-gradient(to right, #B58A6A, #a07551)"} }).showToast();
        } else {
            // Si ya no es favorito, lo quitamos de la lista.
            favorites = favorites.filter(item => item !== productName);
            Toastify({ text: "Eliminado de favoritos", duration: 2000, gravity: "bottom", position: "center" }).showToast();
        }

        // Guardamos la lista actualizada en LocalStorage. Usamos JSON.stringify para convertir el array en un string.
        localStorage.setItem('pastiaraFavorites', JSON.stringify(favorites));
    }

    // Llamamos a la función para cargar los favoritos en cuanto la página esté lista.
    loadFavorites();

});