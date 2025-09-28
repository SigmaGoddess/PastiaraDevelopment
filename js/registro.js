document.addEventListener('DOMContentLoaded', function () {
    
    // --- SELECTORES DE ELEMENTOS ---
    
    // Para cambiar entre formularios
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showSignUpLink = document.getElementById('show-sign-up-link');
    const showLoginLink = document.getElementById('show-login-link');

    // Para los campos de contraseña del login
    const loginPassword = document.querySelector('#login-password');
    const toggleLoginPassword = document.querySelector('#toggleLoginPassword');

    // Para los campos de contraseña del registro
    const registerPassword = document.querySelector('#sign-up-password');
    const toggleRegisterPassword = document.querySelector('#toggleSignUpPassword');
    const confirmPassword = document.querySelector('#confirm-password');
    const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');


    // --- LÓGICA DE CAMBIO ENTRE FORMULARIOS ---
    
    if (showSignUpLink) {
        showSignUpLink.addEventListener('click', function(event) {
            event.preventDefault(); 
            loginForm.classList.add('d-none'); 
            registerForm.classList.remove('d-none'); 
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(event) {
            event.preventDefault(); 
            registerForm.classList.add('d-none'); 
            loginForm.classList.remove('d-none'); 
        });
    }


    // --- FUNCIÓN PARA MOSTRAR/OCULTAR CONTRASEÑA ---

    const setupPasswordToggle = (passwordInput, toggleIcon) => {
        if (passwordInput && toggleIcon) {
            toggleIcon.addEventListener('click', function () {
                // Cambia el tipo del input
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Cambia el ícono del ojo
                this.classList.toggle('bi-eye');
                this.classList.toggle('bi-eye-slash');
            });
        }
    };


    // --- ASIGNACIÓN DE LA FUNCIÓN A CADA CAMPO DE CONTRASEÑA ---
    
    setupPasswordToggle(loginPassword, toggleLoginPassword);
    setupPasswordToggle(registerPassword, toggleRegisterPassword);
    setupPasswordToggle(confirmPassword, toggleConfirmPassword);

});