// Mostrar/ocultar buscador
// Logic for the mobile search button
const searchBtnMobile = document.getElementById("search-btn-mobile");
const searchFormMobile = document.getElementById("search-form-mobile");

if (searchBtnMobile && searchFormMobile) {
    searchBtnMobile.addEventListener("click", () => {
        searchFormMobile.classList.toggle("d-none");
    });
}

// Logic for the desktop search button
const searchBtnDesktop = document.getElementById("search-btn");
const searchFormDesktop = document.getElementById("search-form");

if (searchBtnDesktop && searchFormDesktop) {
    searchBtnDesktop.addEventListener('click', (e) => {
        const btn = e.target.closest('#search-btn'); // o '.search-btn' según tu HTML
        if (!btn) return;
        e.preventDefault();
        // lógica de búsqueda / toggle input
        const input = document.querySelector('#searchInput');
        input?.classList.toggle('visible');
    });
}