document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");

    // selectores corregidos y fiables para detectar botones/enlaces de login/registro
    const possibleSelectors = [
        '.acciones-col-footer',
        '.btn-registro-footer',
        '.btn-login-footer',
        '.footer-login',
        '.footer-register',
        'a[href*="registro"]',
        'a[href*="login"]'
    ];

    const findLoginElements = () => {
        return Array.from(new Set(
            possibleSelectors.flatMap(sel => Array.from(document.querySelectorAll(sel)))
        ));
    };

    const hideLoginElements = () => {
        const els = findLoginElements();
        els.forEach(el => {
            // si el elemento está dentro de un <a>, ocultar el <a> para eliminar enlace
            const anchor = el.closest && el.closest('a');
            if (anchor) anchor.style.display = 'none';
            else el.style.display = 'none';
        });
    };

    const showLoginElements = () => {
        const els = findLoginElements();
        els.forEach(el => {
            const anchor = el.closest && el.closest('a');
            if (anchor) anchor.style.display = '';
            else el.style.display = '';
        });
    };

    const ensureLogoutButton = () => {
        if (document.getElementById("btn-logout")) return;
        const logoutBtn = document.createElement("button");
        logoutBtn.id = "btn-logout";
        logoutBtn.className = "btn btn-logout mt-3";
        logoutBtn.textContent = "Cerrar sesión";
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("authToken");
            location.reload();
        });

        // intentar insertar en el contenedor de acciones o en el footer
        const insertTarget = document.querySelector('.acciones-col-footer')?.parentElement
            || document.querySelector('.container-footer')
            || document.querySelector('footer');
        if (insertTarget) insertTarget.appendChild(logoutBtn);
    };

    const processAuthUI = () => {
        if (localStorage.getItem("authToken")) {
            hideLoginElements();
            ensureLogoutButton();
        } else {
            showLoginElements();
            const logoutBtn = document.getElementById("btn-logout");
            if (logoutBtn) logoutBtn.remove();
        }
    };

    // Ejecutar ahora (si el footer ya está en el DOM)
    processAuthUI();

    // Si los elementos aún no existen (footer inyectado después), observar el DOM y re-ejecutar
    const observer = new MutationObserver((mutations, obs) => {
        const footerPresent = document.querySelector('footer') || document.querySelector('.acciones-col-footer');
        if (footerPresent) {
            processAuthUI();
            // desconectar después de detectar e intentar (evitar observer permanente)
            obs.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Safety: desconectar observer después de 6s si no se detecta nada
    setTimeout(() => observer.disconnect(), 6000);
});