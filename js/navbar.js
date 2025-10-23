
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

document.addEventListener('keyup', (e) => {

    if (e.target.matches('#search-form input, #search-form-mobile input')) {
        document.querySelectorAll('.search-suggestion').forEach(suggestion => {
            suggestion.style.display = 'none';
        });
    }
});