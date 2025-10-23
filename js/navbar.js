// Obtiene el contenedor principal de la lista de resultados
const boxSearch = document.querySelector('#box-search');
// Obtiene el campo de entrada de texto
const searchInput = document.querySelector('#searchInput');

// ***************************************************************
// 1. MANEJADOR DE CLIC (MUESTRA/OCULTA EL FORMULARIO)
// ***************************************************************

document.addEventListener('click', (e) => {
    // Usamos el path del evento para compatibilidad con Shadow DOM
    const path = e.composedPath ? e.composedPath() : (e.path || []);

    for (const node of path) {
        if (!node || node === window || node === document) continue;

        // Verifica si se hizo clic en los botones de búsqueda
        if (node.id === 'search-btn-mobile' || node.id === 'search-btn') {
            e.preventDefault();
            console.log('Search button clicked:', node.id);

            const formDesktop = document.getElementById('search-form');
            const formMobile = document.getElementById('search-form-mobile');

            // Muestra u oculta los formularios (si existen)
            formDesktop?.classList.toggle('d-none');
            formMobile?.classList.toggle('d-none');

            // Enfoca el input después de mostrarlo
            searchInput.focus();

            return; // Detiene la propagación y la ejecución del bucle
        }
    }
});

// ***************************************************************
// 2. FUNCIÓN DE FILTRADO (filterSearch)
// ***************************************************************

searchInput.addEventListener('keyup', filterSearch);

function filterSearch() {
    // 1. Prepara el valor del input para la comparación (mayúsculas)
    const filter = searchInput.value.toUpperCase();

    // 2. Obtiene todos los <li> dentro de la caja de resultados.
    const listItems = boxSearch.querySelectorAll('li');

    // 3. Itera sobre los elementos a filtrar
    for (let i = 0; i < listItems.length; i++) {

        const listItem = listItems[i];
        const link = listItem.querySelector('a');

        if (link) {
            // CORRECCIÓN CLAVE: Obtiene el texto del enlace (<a>) e ignora el <i>
            // Usa textContent y lo normaliza (trim) para limpiar espacios.
            const textValue = link.textContent.trim();

            // Comprueba si el texto del enlace incluye el filtro
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                listItem.style.display = ''; // Muestra el <li>. Es mejor que 'block' si no sabes el display original.
            } else {
                listItem.style.display = 'none'; // Oculta el <li>
            }
        }
    }

    // 4. Lógica para mostrar/ocultar la caja de resultados completa
    // Si el input está vacío o solo tiene espacios, oculta la caja.
    if (searchInput.value.trim() === '') {
        boxSearch.style.display = 'none';
    } else {
        // Muestra la caja, si no encuentra elementos, la caja se verá vacía,
        // pero es el comportamiento esperado para una búsqueda activa.
        boxSearch.style.display = 'block';
    }
}
