// 'DOMContentLoaded' es un evento que se dispara cuando el HTML ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', function() {

    // -- LÓGICA PARA LOS MODALES DE BOOTSTRAP --
    // AUNQUE LOS BOTONES DEL FOOTER SE QUITARON, CONSERVAMOS LA LÓGICA
    // POR SI LOS MODALES SE USAN DESDE OTRA PARTE.

    // Obtenemos una referencia a nuestros elementos modales del HTML usando sus IDs.
    const registerModalEl = document.getElementById('registerModal');
    const loginModalEl = document.getElementById('loginModal');

    // Creamos instancias de los modales de Bootstrap.
    const registerModal = new bootstrap.Modal(registerModalEl);
    const loginModal = new bootstrap.Modal(loginModalEl);

    // Las funciones para ABRIR los modales (openRegisterModal, openLoginModal) se eliminaron
    // porque los botones que las llamaban estaban en el footer.

    // -- LÓGICA PARA EL FORMULARIO DE REGISTRO --
    window.handleRegister = function() {
        // Obtenemos los valores de los campos del formulario.
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Validación simple.
        if (!name || !email || !password) {
            Toastify({ text: "Por favor, completa todos los campos.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#e74c3c" }).showToast();
            return;
        }

        if (password !== confirmPassword) {
            Toastify({ text: "Las contraseñas no coinciden.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#e74c3c" }).showToast();
            return;
        }

        console.log('Registrando usuario:', { name, email });
        
        Toastify({ text: `¡Bienvenido, ${name}! Tu cuenta ha sido creada.`, duration: 3000, gravity: "top", position: "right", backgroundColor: "#2ecc71" }).showToast();
        
        registerModal.hide();
        document.getElementById('registerForm').reset();
    }

    // -- LÓGICA PARA EL FORMULARIO DE INICIO DE SESIÓN --
    window.handleLogin = function() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            Toastify({ text: "Ingresa tu correo y contraseña.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#e74c3c" }).showToast();
            return;
        }

        console.log('Iniciando sesión con:', { email });
        
        Toastify({ text: "¡Has iniciado sesión correctamente!", duration: 3000, gravity: "top", position: "right", backgroundColor: "#2ecc71" }).showToast();
        
        loginModal.hide();
        document.getElementById('loginForm').reset();
    }


    // -- LÓGICA PARA EL SCROLL SUAVE (ELIMINADA) --
    // La función scrollToSection se eliminó porque pertenecía a los enlaces del navbar.


    // -- LÓGICA DEL SISTEMA DE FAVORITOS (INTACTA) --
    
    function loadFavorites() {
        const favorites = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        
        favorites.forEach(productName => {
            const heartIcon = document.querySelector(`.heart-favorite[data-product="${productName}"]`);
            if (heartIcon) {
                heartIcon.classList.add('active'); // Se corrigió a 'active' para coincidir con tu CSS
            }
        });
    }

    window.toggleFavorite = function(productName) {
        const heartIcon = document.querySelector(`.heart-favorite[data-product="${productName}"]`);
        
        const isFavorite = heartIcon.classList.toggle('active'); // Se corrigió a 'active'

        let favorites = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        
        if (isFavorite) {
            if (!favorites.includes(productName)) {
                favorites.push(productName);
            }
            Toastify({ text: "Añadido a favoritos ❤️", duration: 2000, gravity: "bottom", position: "center", style: { background: "linear-gradient(to right, #B58A6A, #a07551)"} }).showToast();
        } else {
            favorites = favorites.filter(item => item !== productName);
            Toastify({ text: "Eliminado de favoritos", duration: 2000, gravity: "bottom", position: "center" }).showToast();
        }

        localStorage.setItem('pastiaraFavorites', JSON.stringify(favorites));
    }

    loadFavorites();

});