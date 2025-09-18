 // Obtener todos los links
  const navLinks = document.querySelectorAll('#menu .nav-link');
// para cada link aplicamos la función 
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Quitar "active" de todos
      navLinks.forEach(l => l.classList.remove('active'));
      // Agregar "active" solo al que se le dió click
      this.classList.add('active');
    });
  });

  