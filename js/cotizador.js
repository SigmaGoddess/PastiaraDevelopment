//Sección para carrusel con swiper
let swiper1 = new Swiper('.swiper-container-pastes', {
	navigation: {
	  nextEl: '#contenedor-collapse-productos-pastes .swiper-button-next',
	  prevEl: '#contenedor-collapse-productos-pastes .swiper-button-prev'
	},
	slidesPerView: 0,
	spaceBetween: 0,

    

  
	breakpoints: {
	  20: {
		slidesPerView: 2,
		spaceBetween: 30,
	  
	  },
      815: {
		slidesPerView: 3,
		spaceBetween: 10,
	  },

	  1010: {
		slidesPerView: 4,
		spaceBetween: 10,
	  },
	} 
    });

let swiper2 = new Swiper('#contenedor-collapse-productos-volovanes .swiper-container', {
	navigation: {
	  nextEl: '#contenedor-collapse-productos-volovanes .swiper-button-next',
	  prevEl: '#contenedor-collapse-productos-volovanes .swiper-button-prev'
	},
	slidesPerView: 0,
	spaceBetween: 0,

    

  
	breakpoints: {
	  20: {
		slidesPerView: 2,
		spaceBetween: 30,
	  
	  },
      815: {
		slidesPerView: 3,
		spaceBetween: 10,
	  },

	  1010: {
		slidesPerView: 4,
		spaceBetween: 10,
	  },
	} 
    });

let swiper3 = new Swiper('#contenedor-collapse-productos-panaderia .swiper-container-panaderia', {
	
	navigation: {
	  nextEl: '#contenedor-collapse-productos-panaderia .swiper-button-next',
	  prevEl: '#contenedor-collapse-productos-panaderia .swiper-button-prev'
	},
	slidesPerView: 0,
	spaceBetween: 0,
	breakpoints: {
	  20: {
		slidesPerView: 2,
		spaceBetween: 30,
	  
	  },
      815: {
		slidesPerView: 3,
		spaceBetween: 10,
	  },

	  1010: {
		slidesPerView: 4,
		spaceBetween: 10,
	  },
	} 
    });

let swiper4 = new Swiper('#contenedor-collapse-productos-regalar .swiper-container', {
	
	navigation: {
	  nextEl: '#contenedor-collapse-productos-regalar .swiper-button-next',
	  prevEl: '#contenedor-collapse-productos-regalar .swiper-button-prev'
	},
	slidesPerView: 0,
	spaceBetween: 0,
	breakpoints: {
	  20: {
		slidesPerView: 2,
		spaceBetween: 30,
	  
	  },
      815: {
		slidesPerView: 3,
		spaceBetween: 10,
	  },

	  1010: {
		slidesPerView: 4,
		spaceBetween: 10,
	  },
	} 
    });

//----------------------- interacción para sumar o restar cantidad en en productos-------------------------
const productos = document.querySelectorAll('#producto');
console.log(productos);

productos.forEach(producto => {
  // Obtenemos los elementos específicos DE CADA producto
  const btnRestar = producto.querySelector('#btn-restar');
  const btnSumar = producto.querySelector('#btn-sumar');
  const cantidadElemento = producto.querySelector('#cantidad');
  const totalElemento = producto.querySelector('#total-producto');

//Tomamos el precio del producto convertido a float
  const precioBase = parseFloat(totalElemento.dataset.precio);

  //Asignamos en 0 la cantidad para cada uno de los productos
  let cantidad = 0;

  // Función para actualizar la UI de este producto específico
  function actualizarProducto() {
    const total = cantidad * precioBase;
    cantidadElemento.textContent = cantidad;
    totalElemento.textContent = `Total: $${total}`;
  }

  // Asignamos el evento al botón de sumar
  btnSumar.addEventListener('click', () => {
    cantidad++;
    actualizarProducto();
  });

  // Asignamos el evento al botón de restar
  btnRestar.addEventListener('click', () => {
    // Solo restamos si la cantidad es mayor a 0
    if (cantidad > 0) {
      cantidad--;
      actualizarProducto();
    }
  });

});

//