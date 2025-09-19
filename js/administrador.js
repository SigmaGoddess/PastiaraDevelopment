 /*
 // Obtener todos los links
  const navLinks = document.querySelectorAll('#menu .nav-link, #menu #list-link');
// para cada link aplicamos la función 
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Quitar "active" de todos
      navLinks.forEach(l => l.classList.remove('active'));
      // Agregar "active" solo al que se le dió click
      this.classList.add('active');
    });
  });
*/

 // Seleccionamos todos los links del navbar y del menú lateral
    const allLinks = document.querySelectorAll('#menu .nav-link, #menu #list-link');
    console.log(allLinks);

    allLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        

        // Obtener el identificador (ej: "inicio", "servicios", etc.)
        const name = this.dataset.name;
        console.log(name);
        // Quitar 'active' de todos los links
        allLinks.forEach(l => l.classList.remove('active'));

        // Agregar 'active' a todos los links con el mismo data-name
        document.querySelectorAll(`[data-name="${name}"]`).forEach(l => {
          
          l.classList.add('active');
        });
      });
    });
  