// Mostrar/ocultar buscador
const searchBtn = document.getElementById("search-btn");
if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        document.getElementById("search-form").classList.toggle("d-none");
    });
}
