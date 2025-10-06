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
    const singUpEmailInput = document.getElementById('sign-up-email');
    const phoneInput = document.getElementById('phone-number');


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
        const feedback = input.nextElementSibling;
        input.classList.add('is-invalid');
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
        } else { 
             const parentGroup = input.closest('.input-group');
             const feedbackInGroup = parentGroup.querySelector('.invalid-feedback');
             feedbackInGroup.textContent = message;
        }
    };
    
    // Función para limpiar errores
    const clearError = (input) => {
        input.classList.remove('is-invalid');
    };

    //--------------------VALIDACIÓN DE FORMULARIOS: REGISTRO----------------------------

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let isValid = true;

        // Limpiar errores previos
        [nameInput, lastNameInput, singUpEmailInput, phoneInput, signUpPassword, confirmPassword].forEach(clearError);

        // Validaciones básicas de los campos

        // 1. Validar Nombre
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Por favor, ingresa tu nombre(s).');
            isValid = false;
        }

        // 2. Validar Apellido
        if (lastNameInput.value.trim() === '') {
            showError(lastNameInput, 'Por favor, ingresa tu primer apellido.');
            isValid = false;
        }

        // 3. Validar formato del Correo Electrónico
        if (!emailRegex.test(singUpEmailInput.value.trim())) {
            showError(singUpEmailInput, 'Por favor, ingresa un correo válido.');
            isValid = false;
        }

        // 4. Validar Teléfono
        if (!phoneRegex.test(phoneInput.value.trim())) {
            showError(phoneInput, 'El teléfono debe tener 10 dígitos.');
            isValid = false;
        }

        // 5. Validar requisitos de Contraseña
        if (!passwordRegex.test(signUpPassword.value)) {
            showError(signUpPassword, 'La contraseña no cumple los requisitos.');
            isValid = false;
        }

        // 6. Validar que las contraseñas coincidan
        if (signUpPassword.value !== confirmPassword.value || confirmPassword.value === '') {
            showError(confirmPassword, 'Las contraseñas no coinciden.');
            isValid = false;
        }

        // Si todos los caompos son validos: 
        if (isValid) {

            // obtener lista de usuarios y el email a verificar.
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const newUserEmail = singUpEmailInput.value.trim().toLowerCase();

            // Validar que el correo no esté duplicado
            const emailExists = users.some(user => user.email === newUserEmail);

            if (emailExists) {
                showError(singUpEmailInput, 'Este correo ya está registrado.');

            } else {
                // Registrar al usuario.
                const user = {
                    nombreCompleto: `${nameInput.value.trim()} ${lastNameInput.value.trim()}`,
                    telefono: phoneInput.value.trim(),
                    email: newUserEmail,
                    password: signUpPassword.value
                };

                // Añadir el usuario a la lista y guardarlo
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                console.log('Registro exitoso. Lista de usuarios actualizada:', users);

                Swal.fire({
                     title: "¡Tasty!",
                text: "Registro exitoso",
                imageUrl: "/images/REGISTRO/IconoDeInicioSesion.png",
                imageWidth: 150,
                imageHeight: 90,
                imageAlt: "Icono de paste"            
                });

                registerForm.reset();

                // Monstrar formulario de login
                registerForm.classList.add('d-none');
                loginForm.classList.remove('d-none');
            }
        }
    });

    // ----------------- VALIDACIÓN DE FORMULARIOS:INICIO DE SESIÓN---------------------

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const enteredEmail = loginEmailInput.value.trim().toLowerCase();
        const enteredPassword = loginPassword.value.trim();

        clearError(loginEmailInput);
        clearError(loginPassword);

        // Validar campos vacíos
        if (enteredEmail === '' || enteredPassword === '') {
            showError(loginEmailInput, 'Por favor, completa todos los campos.');
            showError(loginPassword, ' '); 
            return; // Detener ejecución si hay campos vacíos
        }

        // Obtener la lista de usuarios para buscar email y contraseña 
        const users = JSON.parse(localStorage.getItem('users')) || [];

        //Validar que existan y conincidan email y contraseña

        const foundUser = users.find(user =>
            user.email === enteredEmail &&
            user.password === enteredPassword
        );

        if (foundUser) {
            // Inicio de sesión exitoso
            Swal.fire({
                title: `¡Bienvenido, ${foundUser.nombreCompleto}!`,
                text: "Inicio de sesión exitoso.",
                icon: "success"
            }).then(() => {
                window.location.href = 'index.html'; // Redirección a la página principal
            });
        } else {
            // No se encontró a nadie que coincida
            showError(loginEmailInput, 'Correo o contraseña inválidos.');
            showError(loginPassword, 'Correo o contraseña inválidos.');
        }
    });
})