
 // Seleccionamos todos los links del navbar y del menú lateral
    const allLinks = document.querySelectorAll('#menu .nav-link, #menu #list-link');
    
    

    allLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        

        // Obtener el identificador (ej: "inicio", "servicios", etc.)
        const name = this.dataset.name;
        // Quitar 'active' de todos los links
        allLinks.forEach(l =>{
           l.classList.remove('active')
          });

        // Agregar 'active' a todos los links con el mismo data-name
        document.querySelectorAll(`[data-name="${name}"]`).forEach(l => {
          
          l.classList.add('active');
        });
      });
    });



//
  