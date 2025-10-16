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
		slidesPerView: 1,
		spaceBetween: 20,
	  
	  },
      600: {
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
		slidesPerView: 1,
		spaceBetween: 20,
	  
	  },
      600: {
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
		slidesPerView: 1,
		spaceBetween: 20,
	  
	  },
      600: {
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
		slidesPerView: 1,
		spaceBetween: 20,
	  
	  },
      600: {
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
//console.log(productos);

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

// ------------------Sección de resumen de cotización --------------------------------
const btnMostrarResumen = document.getElementById('btnMostrarResumen');
const modal = document.getElementById('resumenModal');
const direccionModal = document.getElementById('direccion-modal');
const productosModal = document.getElementById('productos-modal');
const eventoModal = document.getElementById('evento-modal');
const totalModal = document.getElementById('total-modal');
const spanCerrar = document.querySelector('.cerrar');
const entradaTipoDeEvento = document.querySelector('#entradaTipoDeEvento');
const entradaFechaDeEvento = document.getElementById('entradaFechaDeEvento');
const entradaCalle = document.getElementById('entradaCalle');
const entradaNumeroExterior = document.getElementById('entradaNumeroExterior');
const entradaNumeroInterior = document.getElementById('entradaNumeroInterior');
const entradaColonia = document.getElementById('entradaColonia');
const entradaMunicipio = document.getElementById('entradaMunicipio');
const entradaCodigoPostal = document.getElementById('entradaCodigoPostal');
const entradaEstado = document.getElementById('entradaEstado');
const entradaProductos = document.querySelectorAll('#cantidad')
const alerta = document.getElementById('alerta');

// --- CÓDIGO MODIFICADO ---
// Variable para guardar los datos de la cotización que se mostrará en el modal.
// La declaramos aquí para que sea accesible desde la función de confirmar y enviar.
let datosCotizacionParaEnviar = {};


//ABRIR EL MODAL AL HACER CLIC EN "ENVIAR COTIZACIÓN"
btnMostrarResumen.onclick = function() {
    // --- Recolectar datos ---
    const evento = entradaTipoDeEvento.value;
    const fechaEvento = entradaFechaDeEvento.value;
    const calle = entradaCalle.value;
    const numeroExterior = entradaNumeroExterior.value;
    const numeroInterior = entradaNumeroInterior.value;
    const colonia = entradaColonia.value;
    const municipio = entradaMunicipio.value;
    const codigoPostal = entradaCodigoPostal.value;
    const estado = entradaEstado.value;

    // Limpiamos el resumen anterior
    direccionModal.innerHTML = '';
    productosModal.innerHTML = '';
    eventoModal.innerHTML = '';
    totalModal.innerHTML = '';

    //Llenamos la sección de evento en el resumen con los datos que proporcionó el usuario
    eventoModal.innerHTML = `
        <p class="my-1"><strong>Tipo de evento:</strong> ${evento}</p>
        <p class="my-1"><strong>Fecha:</strong> ${fechaEvento}</p>
    `;

    //llenamos el bloque de dirección
    if (numeroInterior === '') {
        direccionModal.innerHTML = `
        <h5 class="my-1">${calle} ${numeroExterior}</h5>
        <p class="my-1">${colonia}, ${municipio}, ${codigoPostal}</p>
        <p class="my-1">${estado}</p>
        `;
    } else {
        direccionModal.innerHTML = `
        <h5 class="my-1">${calle} ${numeroExterior}, ${numeroInterior}</h5>
        <p class="my-1">${colonia}, ${municipio}, ${codigoPostal}</p>
        <p class="my-1">${estado}</p>
        `;
    }

    // --- CÓDIGO MODIFICADO ---
    // Reiniciamos las variables para un cálculo limpio cada vez que se abre el modal
    let totalcotizacion = 0;
    let productosSeleccionados = [];
    let hayProductos = false;

    // Llenamos el resumen de productos
    entradaProductos.forEach(input => {
        const cantidad = parseInt(input.textContent, 10);
        const nombre = input.getAttribute('data-nombre');
        const precio = parseFloat(input.getAttribute('data-precio'));
        
        if (cantidad > 0) {
            hayProductos = true;
            //Realizamos la operación para obtener el total del precio del producto
            const precioFinalProducto = cantidad * precio;
            totalcotizacion += precioFinalProducto;

            // Agregamos el producto al array que enviaremos al servidor
            productosSeleccionados.push({
                nombre: nombre,
                cantidad: cantidad,
                total: precioFinalProducto
            });

            // Mostramos el producto en el modal
            productosModal.innerHTML += `
            <div id="list-modal-productos">
                <h5>${nombre}</h5>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Cantidad:${cantidad}</span>
                    <span>Total:$${precioFinalProducto}</span>
                </div>
            </div>
            `;
        }
    });

    totalModal.innerHTML = `<p><strong>Suma total:</strong> $${totalcotizacion}</p>`;

    // --- Validar y mostrar ---
    if (evento.trim() === '' || fechaEvento.trim() === '' || calle.trim() === '' || numeroExterior.trim() === '' || colonia.trim() === '' || municipio.trim() === '' || codigoPostal.trim() === '' || estado.trim() === '' || !hayProductos) {
        alerta.classList.remove('d-none');
        return; // Detenemos la función si faltan datos
    }

    //Quitamos el bloque de alerta
    alerta.classList.add('d-none');
    
    // --- CÓDIGO AÑADIDO ---
    // Guardamos todos los datos recolectados en la variable global para poder enviarlos después.
    datosCotizacionParaEnviar = {
        tipoEvento: evento,
        fechaEvento: fechaEvento,
        calle: calle,
        numeroExterior: numeroExterior,
        numeroInterior: numeroInterior,
        colonia: colonia,
        municipio: municipio,
        codigoPostal: codigoPostal,
        estado: estado,
        productos: productosSeleccionados,
        sumaTotal: totalcotizacion
    };

    // Mostramos el modal
    modal.style.display = 'block';
}

// CERRAR EL MODAL
// Al hacer clic en la 'x'
spanCerrar.onclick = function() {
    modal.style.display = 'none';
}

// Al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


// --- NUEVO CÓDIGO AÑADIDO PARA ENVIAR LA COTIZACIÓN ---

// 1. Obtenemos el botón de "Confirmar y Enviar" del modal.
//    Asegúrate de que tu botón en el HTML tenga el id="btnConfirmarEnviar"
const btnConfirmarEnviar = document.getElementById('btnConfirmarEnviar');

// 2. Agregamos el evento 'click' al botón.
btnConfirmarEnviar.addEventListener('click', function(event) {
    // Prevenimos cualquier comportamiento por defecto del botón.
    event.preventDefault();

    // 3. Usamos la API fetch para enviar los datos al backend.
    //    La URL '/api/cotizaciones/guardar' es un ejemplo, deberás crear este endpoint en tu servidor.
    fetch('/api/cotizaciones/guardar', {
        method: 'POST', // Usamos POST para crear una nueva cotización.
        headers: {
            'Content-Type': 'application/json' // Indicamos que el contenido es JSON.
        },
        // Convertimos el objeto que guardamos previamente a un string JSON.
        body: JSON.stringify(datosCotizacionParaEnviar) 
    })
    .then(response => {
        // Verificamos si la respuesta del servidor fue exitosa.
        if (!response.ok) {
            // Si no fue exitosa, lanzamos un error para que lo capture el .catch()
            throw new Error('Hubo un problema con la respuesta del servidor.');
        }
        return response.json(); // Convertimos la respuesta del servidor a JSON.
    })
    .then(data => {
        // Si todo salió bien, el servidor nos devuelve una confirmación.
        console.log('Respuesta del servidor:', data);
        alert('¡Tu cotización ha sido enviada y guardada con éxito!');
        
        // Cerramos el modal.
        modal.style.display = 'none';
        
        // Opcional: Redirigir al usuario a su página de cotizaciones después de guardar.
        // window.location.href = '/perfil/mis-cotizaciones.html'; 
    })
    .catch(error => {
        // Si algo falló durante el proceso, mostramos un error.
        console.error('Error al enviar la cotización:', error);
        alert('Hubo un problema al guardar tu cotización. Por favor, inténtalo de nuevo.');
        
        // También cerramos el modal en caso de error.
        modal.style.display = 'none';
    });
});

// --- FIN DEL NUEVO CÓDIGO ---
    /*

    // 4. ACCIÓN AL CONFIRMAR LA COTIZACIÓN

    btnConfirmar.onclick = function() {

        // Aquí es donde pondrías la lógica para enviar el formulario REALMENTE

        // Por ejemplo, usando fetch() para enviar los datos a un servidor,

        // o simplemente llamando al envío del formulario.

       

        alert('¡Cotización confirmada y enviada!');

       

        // Opcional: para enviar el formulario de verdad

        // document.getElementById('cotizacionForm').submit();



        // Cerramos el modal

        modal.style.display = 'none';

    }*/