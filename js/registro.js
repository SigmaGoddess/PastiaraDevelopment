document.addEventListener('DOMContentLoaded', function () {

    // --- SELECTORES DE ELEMENTOS ---

    // Campos de formularios y enlaces 
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showSignUpLink = document.getElementById('show-sign-up-link');
    const showLoginLink = document.getElementById('show-login-link');

    // Campos de contraseña (login)
    const loginPassword = document.querySelector('#login-password');
    const toggleLoginPassword = document.querySelector('#toggleLoginPassword');

    // Campos de contraseña (Sign up)
    const signUpPassword = document.querySelector('#sign-up-password');
    const toggleSignUpPassword = document.querySelector('#toggleSignUpPassword');
    const confirmPassword = document.querySelector('#confirm-password');
    const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');

    // Campos del formulario de registro
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('sign-up-email');
    const phoneInput = document.getElementById('phone-number');


    // --- FUNCION PARA CAMBIO ENTRE FORMULARIOS ---

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


    // --- FUNCIÓN PARA MOSTRAR/OCULTAR CONTRASEÑA ---

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


    // --- VALIDACIÓN DEL FORMULARIO DE REGISTRO ---

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

    // Event listener para el envío del formulario de registro
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        let isValid = true;

        // Limpiar errores previos
        [nameInput, lastNameInput, emailInput, phoneInput, signUpPassword, confirmPassword].forEach(clearError);

        // 1. Validar Nombre
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Por favor, ingresa tu nombre(s).');
            isValid = false;
        }

        // 2. Validar Apellido
        if (lastNameInput.value.trim() === '') {
            showError(lastNameInput, 'Por favor, ingresa tu apellido.');
            isValid = false;
        }

        // 3. Validar Correo Electrónico
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Por favor, ingresa un correo válido.');
            isValid = false;
        }

        // 4. Validar Teléfono
        if (!phoneRegex.test(phoneInput.value.trim())) {
            showError(phoneInput, 'El teléfono debe tener 10 dígitos.');
            isValid = false;
        }

        // 5. Validar Contraseña
        if (!passwordRegex.test(signUpPassword.value)) {
            showError(signUpPassword, 'La contraseña no cumple los requisitos.');
            isValid = false;
        }
        
        // 6. Validar que las contraseñas coincidan
        if (signUpPassword.value !== confirmPassword.value || confirmPassword.value === '') {
            showError(confirmPassword, 'Las contraseñas no coinciden.');
            isValid = false;
        }

        // Si todo es válido, se crea el objeto JSON
        if (isValid) {
            const user = {
                nombreCompleto: `${nameInput.value.trim()} ${lastNameInput.value.trim()}`,
                telefono: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                password: signUpPassword.value
            };

            // Muestra el objeto JSON en consola
            console.log('Formulario validado con éxito. Objeto JSON creado:');
            console.log(JSON.stringify(user, null, 2));

            // Envío de los datos a un servidor
            Swal.fire({
                title: "¡Tasty!",
                text: "Regisrto exitoso",
                imageUrl: "/images/REGISTRO/IconoDeInicioSesion.png",
                imageWidth: 150,
                imageHeight: 90,
                imageAlt: "Icono de paste"
            })
            
            // Limpiar el formulario
            registerForm.reset();
        }
    });
});