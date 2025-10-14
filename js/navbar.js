// Mostrar/ocultar buscador
// Logic for the mobile search button
/*const searchBtnMobile = document.getElementById("search-btn-mobile");
const searchFormMobile = document.getElementById("search-form-mobile");

if (searchBtnMobile && searchFormMobile) {
    searchBtnMobile.addEventListener("click", () => {
        console.log("Mobile search button clicked");
        searchFormMobile.classList.toggle("d-none");
    });
}*/

/*const searchBtnDesktop = document.querySelector("#search-btn");
const searchFormDesktop = document.getElementById("search-form");

if (searchBtnDesktop && searchFormDesktop) {
    searchBtnDesktop.addEventListener("click", () => {
        console.log("Desktop search button clicked");
        searchFormDesktop.classList.toggle("d-none");
    });
    searchFormMobile.classList.toggle("d-none");
}*/

// Logic for the desktop search button
/*const searchBtnDesktop = document.getElementById("search-btn");
const searchFormDesktop = document.getElementById("search-form");

if (searchBtnDesktop && searchFormDesktop) {
    searchBtnDesktop.addEventListener('click', (e) => {
        const btn = e.target.closest('#search-btn');
        if (!btn) return;
        e.preventDefault();
        // lógica de búsqueda / toggle input
        const input = document.querySelector('#searchInput');
        input?.classList.toggle('visible');
    });
}*/

// Delegación global que funciona incluso si el botón está dentro de un Shadow DOM
document.addEventListener('click', (e) => {
    const path = e.composedPath ? e.composedPath() : (e.path || []);
    for (const node of path) {
        if (!node || node === window || node === document) continue;
        // ajustar selectores a tus ids / clases reales
        if (node.id === 'search-btn-mobile' || node.id === 'search-btn') {
            e.preventDefault();
            console.log('Search button clicked via composedPath', node.id);
            // Lógica de toggle (puedes customizar)
            if (node.id === 'search-btn' || node.id === 'search-btn-mobile') {
                const form = document.getElementById('search-form');
                const form1 = document.getElementById('search-form-mobile');
                form?.classList.toggle('d-none');
                form1?.classList.toggle('d-none');
            } else {
                const input = document.querySelector('#searchInput');
                input?.classList.toggle('visible');
            }
            return;
        }
    }
});
