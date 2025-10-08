document.addEventListener('DOMContentLoaded', function () {

    // ------------------- SELECTORES DE ELEMENTOS ------------------------------

    // Campos de formularios y enlaces 
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showSignUpLink = document.getElementById('show-sign-up-link');
    const showLoginLink = document.getElementById('show-login-link');

    // Campos de loginForm
    const loginEmailInput = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');

    // Campos de registerForm
    const signUpPassword = document.getElementById('sign-up-password');
    const toggleSignUpPassword = document.getElementById('toggleSignUpPassword');
    const confirmPassword = document.getElementById('confirm-password');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('last-name');
    const signUpEmailInput = document.getElementById('sign-up-email');
    const phoneInput = document.getElementById('phone-number');

    // ---------------------- CONFIGURACIÓN API --------------------------------------
    const API_BASE_URL = 'https://reqres.in/api';

    // ------------------ FUNCIÓN PARA CAMBIO ENTRE FORMULARIOS ---------------------

    if (showSignUpLink) {
        showSignUpLink.addEventListener('click', function (event) {
            event.preventDefault();
            loginForm.classList.add('d-none');
            registerForm.classList.remove('d-none');
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function (event) {
            event.preventDefault();
            registerForm.classList.add('d-none');
            loginForm.classList.remove('d-none');
        });
    }


    // --------------- FUNCIÓN PARA MOSTRAR/OCULTAR CONTRASEÑA ----------------------

    const setupPasswordToggle = (passwordInput, toggleIcon) => {
        if (passwordInput && toggleIcon) {
            toggleIcon.addEventListener('click', function () {

                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                this.classList.toggle('bi-eye');
                this.classList.toggle('bi-eye-slash');
            });
        }
    };

    // Asignación de la función a cada campo de contraseña
    setupPasswordToggle(loginPassword, toggleLoginPassword);     //Login
    setupPasswordToggle(signUpPassword, toggleSignUpPassword);   //Registro 
    setupPasswordToggle(confirmPassword, toggleConfirmPassword); //Confirmación de registro


    // ---------------------- VALIDACIÓN DE FORMULARIOS_----------------------------

    // Expresiones regulares para validaciones
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Valida un número de 10 dígitos
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Función para mostrar errores
    const showError = (input, message) => {
        input.classList.add('is-invalid');
        const feedback = input.closest('.input-group')?.querySelector('.invalid-feedback') ||
            input.parentElement.querySelector('.invalid-feedback');

        if (feedback) feedback.textContent = message;
    };
    
    // Función para limpiar errores
    const clearError = (input) => {
        input.classList.remove('is-invalid');
    };

    //--------------------VALIDACIÓN DE FORMULARIOS: REGISTRO----------------------------

    registerForm.addEventListener('submit', async function (event) { // función asíncrona
        event.preventDefault();

        const button = registerForm.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = "Cargando..";

        let isValid = true;

        // Limpiar errores previos
        [nameInput, lastNameInput, signUpEmailInput, phoneInput, signUpPassword, confirmPassword].forEach(clearError);

        // Validaciones básicas de los campos
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Por favor, ingresa tu nombre(s).');
            isValid = false;
        }
        if (lastNameInput.value.trim() === '') {
            showError(lastNameInput, 'Por favor, ingresa tu primer apellido.');
            isValid = false;
        }
        if (!emailRegex.test(signUpEmailInput.value.trim())) {
            showError(signUpEmailInput, 'Por favor, ingresa un correo válido.');
            isValid = false;
        }
        if (!phoneRegex.test(phoneInput.value.trim())) {
            showError(phoneInput, 'El teléfono debe tener 10 dígitos.');
            isValid = false;
        }
        if (!passwordRegex.test(signUpPassword.value)) {
            showError(signUpPassword, 'La contraseña no cumple los requisitos.');
            isValid = false;
        }
        if (signUpPassword.value.trim() !== confirmPassword.value.trim()) {
            showError(confirmPassword, 'Las contraseñas no coinciden.');
            isValid = false;
        }
        // Si los campos no pasan validación:
        if (!isValid) {
            button.disabled = false;
            button.textContent = "Crear cuenta";
            return;
        }
        //Si todos los campos son aceptados:

        const newUserEmail = signUpEmailInput.value.trim().toLowerCase();
        const newUserPassword = signUpPassword.value;


        // Try - catch para manejar errores de red
        try {
            // Se crea la petición POST con fetch
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'x-api-key': 'reqres-free-v1',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email: newUserEmail,
                    password: newUserPassword
                    // Nota: en reqres.in solo se esta utiizando email y password para el registro. Pendiente aregar los demás datos.

                })
            });

            const data = await response.json();

            // Verificación respuesta del servidor (exitosa = código 2xx)
            if (response.ok) {
                console.log('Registro exitoso en el servidor:', data);

                Swal.fire({
                    title: "¡Tasty!",
                    text: "Registro exitoso",
                    imageUrl: "/images/REGISTRO/IconoDeInicioSesion.png",
                    imageWidth: 150,
                    imageHeight: 90,
                    imageAlt: "Icono de paste"
                });

                registerForm.reset();
                registerForm.classList.add('d-none');
                loginForm.classList.remove('d-none');

            } else {
                // Si el servidor responde con un error (email duplicado)
                showError(signUpEmailInput, data.error || 'Este correo ya está en uso.');
            }
            //Respuesta con error de conexión al servidor
        } catch (error) {
            console.error('Error de conexión:', error);
            Swal.fire({
                title: "Error de conexión",
                text: "No se pudo conectar con el servidor. Intenta más tarde.",
                icon: "error"
            });
        } finally {
            button.disabled = false;
            button.textContent = "Crear cuenta";
        }

    });

    // ----------------- VALIDACIÓN DE FORMULARIOS:INICIO DE SESIÓN---------------------

    loginForm.addEventListener('submit', async function (event) { // función asíncrona
        event.preventDefault();

        const button = event.target.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = "Ingresando..";

        const enteredEmail = loginEmailInput.value.trim().toLowerCase();
        const enteredPassword = loginPassword.value;

        clearError(loginEmailInput);
        clearError(loginPassword);

        if (enteredEmail === '' || enteredPassword === '') {
            showError(loginEmailInput, 'Por favor, completa todos los campos.');
            showError(loginPassword, ' ');
            button.disabled = false; 
            button.textContent = "Iniciar sesión";
            return;
        }

        try {
            // Se crea la petición POST con fetch
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'x-api-key': 'reqres-free-v1',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword
                })
            });

            const data = await response.json();

            // Verificación respuesta
            if (response.ok) {
                console.log('Inicio de sesión exitoso. Token:', data.token);
                                
                Swal.fire({
                    title: `¡Bienvenido de nuevo!`, 
                    text: "Inicio de sesión exitoso.",
                    icon: "success"
                }).then(() => {
                    loginForm.reset();
                    window.location.href = 'index.html'; // Redirección a la página principal
                });

            } else {
                // Si el servidor responde con un error (credenciales inválidas)
                showError(loginEmailInput, data.error || 'Correo o contraseña inválidos.');
                showError(loginPassword, ' ');
            }
        //Respuesta con error de conexión al servidor
        } catch (error) {
            Swal.fire({
                title: "Error de conexión",
                text: "Intenta más tarde",
                icon: "error"
            });
        } finally {
            button.disabled = false;
            button.textContent = "Iniciar sesión";
        }
    });
});