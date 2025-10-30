document.addEventListener("DOMContentLoaded", async function () {

    const token = localStorage.getItem("authToken");
    if (!token) {

        Swal.fire({
            title: `¡Para acceder al cotizador es necesario iniciar sesión`,
            text: "Te redireccionaremos al registro.",
            icon: 'warning'
        }).then(() => {
            window.location.href = '/pages/pag-registro/registro.html#login-form'; // Redirección a la página de registro
        });

        return;
    }
    // Usamos 'await' para asegurarnos de que el HTML se genere
    // ANTES de que el resto del código intente usarlo.
    await cargarContenidoDeAPI(token);
    // ------------------------------------------
    const sswiper = document.querySelectorAll(".swiper-category");
    const sswiperbtn = document.querySelectorAll("#contenedor-collapse-productos")
    console.log(sswiperbtn[0].querySelector('.swiper-button-prev'))
    let contador = 0
    sswiper.forEach(container => {
        //console.log(container);
        new Swiper(container, {
            slidesPerView: 'auto', // O tus breakpoints
            spaceBetween: 10,
            navigation: {
                nextEl: sswiperbtn[contador].querySelector('.swiper-button-next'),
                prevEl: sswiperbtn[contador].querySelector('.swiper-button-prev'),
            },
            breakpoints: { // Si usas breakpoints
                20: { slidesPerView: 1, spaceBetween: 20 },
                600: { slidesPerView: 3, spaceBetween: 10 },
                1010: { slidesPerView: 4, spaceBetween: 10 },
            }
        });
        contador++;
    });


});

document.addEventListener("DOMContentLoaded", function () {

    // 1. Obtiene la fecha y hora actual
    const hoy = new Date();
    //console.log(hoy);
    hoy.setDate(hoy.getDate() + 3);
    const fechaDeHoy = hoy.toISOString().split('T')[0];

    //console.log(fechaDeHoy);  
    // 3. Selecciona el input por su id y establece el atributo 'min'
    document.querySelector("#entradaFechaDeEvento").min = fechaDeHoy;

});

// Variable para guardar los datos de la cotización que se mostrará en el modal.
    // La declaramos aquí para que sea accesible desde la función de confirmar y enviar.
    var datosCotizacionParaEnviar = {};

function resumenCotización() {
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
    const entradaComentarios = document.getElementById('comentarios');
    


    //ABRIR EL MODAL AL HACER CLIC EN "ENVIAR COTIZACIÓN"
    btnMostrarResumen.onclick = function () {
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
        const comentarios = entradaComentarios.value;

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
        let numeracion = ``
        //llenamos el bloque de dirección
        if (numeroInterior === '') {
            numeracion = `${numeroExterior}`
            direccionModal.innerHTML = `
        <h5 class="my-1">${calle} ${numeroExterior}</h5>
        <p class="my-1">${colonia}, ${municipio}, ${codigoPostal}</p>
        <p class="my-1">${estado}</p>
        `;
        } else {
            numeracion = `${numeroExterior}, ${numeroInterior}`
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
            const idproducto = input.getAttribute("data-idp");

            if (cantidad > 0) {
                hayProductos = true;
                //Realizamos la operación para obtener el total del precio del producto
                const precioFinalProducto = cantidad * precio;
                totalcotizacion += precioFinalProducto;

                // Agregamos el producto al array que enviaremos al servidor
                productosSeleccionados.push({
                    productoId: idproducto,
                    cantidad: cantidad

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
        // Guardamos todos los datos recolectados en la variable global para poder enviarlos después

        datosCotizacionParaEnviar={
  direccion: {
    calle: `${calle} ${numeracion}`,
    colonia: colonia,
    municipio: municipio,
    estado: estado,
    codigoPostal: codigoPostal
  },
  tipoDeEvento: evento,
  comentarios: comentarios,
  
  detalles: productosSeleccionados
};

        // Mostramos el modal
        modal.style.display = 'block';

        // CERRAR EL MODAL
        // Al hacer clic en la 'x'
        spanCerrar.onclick = function () {
            modal.style.display = 'none';
        }

        // Al hacer clic fuera del contenido del modal
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }
}
async function cargarContenidoDeAPI(token) {
    // Busca TODOS los divs que marcaste como carruseles de categoría
    const todosLosCarruseles = document.querySelectorAll(".swiper-category"); // ¡Usa una CLASE!

    todosLosCarruseles.forEach((carruselElemento) => {
        // Lee el ID de categoría que pusiste en el HTML (ej. data-category-id="1")
        const categoryId = carruselElemento.dataset.categoryId;
        if (categoryId) {
            // Llama a la función que hace el fetch y construye el HTML
            inicializarCarrusel(carruselElemento, categoryId, token);
        } else {
            console.warn("Se encontró un elemento .swiper-category sin data-category-id");
        }
    });
}

async function inicializarCarrusel(container, categoryId, token) {
    const wrapper = container.querySelector(".swiper-wrapper");
    if (!wrapper) {
        console.error("No se encontró .swiper-wrapper dentro de:", container);
        return; // Sal si no hay wrapper
    }

    wrapper.innerHTML = "<p>Cargando...</p>"; // Mensaje mientras carga
    const apiUrl = `https://pastiara.duckdns.org/api/productos/categoria/${categoryId}`;

    try {
        // --- 1. OBTENCIÓN (FETCH) ---
        const response = await fetch(apiUrl, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Error ${response.status}`);

        const productos = await response.json();
       
        wrapper.innerHTML = ''; // Limpia "Cargando..."

        // --- 2. INYECCIÓN DE HTML ---
        productos.forEach(producto => {
            // ¡IMPORTANTE! Usa CLASES, no IDs repetidos
            const tarjetaHtml = `
                <div class="swiper-slide">
                                                                <div class="card product-card" id="producto">
                                                                    <div class="recorte-contenedor">
                                                                        <img src="${producto.imagenUrl}"
                                                                            class="card-img-top"
                                                                            alt="${producto.nombre}">
                                                                    </div>
                                                                    <div>
                                                                        <div
                                                                            class="d-flex justify-content-between align-items-start mb-0">
                                                                            <h5 class="card-title mb-0">${producto.nombre}</h5>
                                                                            <span class="fs-5 fw-bold">$${producto.precio.toFixed(1)}</span>
                                                                        </div>
                                                                        <div
                                                                            class="d-flex justify-content-between align-items-center">
                                                                            <span class="fs-6" id="total-producto"
                                                                                data-precio=${producto.precio.toFixed(2)}>Total: $0</span>
                                                                            <div class="quantity-selector">
                                                                                <button class="btn btn-sm" type="button"
                                                                                    id="btn-restar">-</button>
                                                                                <span class="quantity-display"
                                                                                    id="cantidad"
                                                                                    data-nombre="${producto.nombre}"
                                                                                    data-precio=${producto.precio.toFixed(2)} data-idp="${producto.id}">0</span>
                                                                                <button class="btn btn-sm" type="button"
                                                                                    id="btn-sumar">+</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
            `;
            // Añade la tarjeta al HTML del wrapper
            wrapper.innerHTML += tarjetaHtml;

        });
        //Añadimos la funcion de suma y resta a cada uno de los botones de las card
        botonSumarRestar();
        resumenCotización();
    } catch (error) {
        console.error(`Error cargando categoría ${categoryId}:`, error);
        wrapper.innerHTML = "<p>Error al cargar productos.</p>";
    }
}
//Funcio
function botonSumarRestar() {
    const productos = document.querySelectorAll('#producto');
    productos.forEach(producto => {
        // Obtenemos los elementos específicos DE CADA producto
        const btnRestar = producto.querySelector('#btn-restar');
        const btnSumar = producto.querySelector('#btn-sumar');
        const cantidadElemento = producto.querySelector('#cantidad'); //Mostramos la cantidad del producto que se ha agegado
        const totalElemento = producto.querySelector('#total-producto'); // Suma del total de la cantidad de productos

        //Tomamos el precio del producto convertido a float
        const precioBase = parseFloat(totalElemento.dataset.precio);

        //Asignamos en 0 la cantidad para cada uno de los productos
        let cantidad = 0;

        // Función para actualizar la UI de este producto específico
        function actualizarProducto() {
            console.log("Actualizar producto");
            const total = cantidad * precioBase;
            cantidadElemento.textContent = cantidad;
            totalElemento.textContent = `Total: $${total}`;
        }

        // Asignamos el evento al botón de sumar
        btnSumar.addEventListener('click', () => {
            console.log("funcion suma")
            cantidad++;
            actualizarProducto();
        });

        // Asignamos el evento al botón de restar
        btnRestar.addEventListener('click', () => {
            console.log("Restar producto");
            // Solo restamos si la cantidad es mayor a 0
            if (cantidad > 0) {
                cantidad--;
                actualizarProducto();
            }
        });
    });
}


const btnConfirmarEnviar = document.getElementById('btnConfirmarEnviar');
const token = localStorage.getItem("authToken");

// 2. Agregamos el evento 'click' al botón.
btnConfirmarEnviar.addEventListener('click', function (event) {
    const modal = document.getElementById('resumenModal');
  // Prevenimos cualquier comportamiento por defecto del botón.
  event.preventDefault();

  // 3. Usamos la API fetch para enviar los datos al backend.
  //    La URL '/api/cotizaciones/guardar' es un ejemplo, deberás crear este endpoint en tu servidor.
  fetch('https://pastiara.duckdns.org/api/cotizaciones', {
    method: 'POST', // Usamos POST para crear una nueva cotización.
    headers: {
      'Content-Type': 'application/json', // Indicamos que el contenido es JSON.
      "Authorization": `Bearer ${token}`
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
      //console.log('Respuesta del servidor:', data);
      //alert('¡Tu cotización ha sido enviada y guardada con éxito!');

      // Cerramos el modal.
      modal.style.display = 'none';

      Swal.fire({
        title: `¡Gracias por elegir pastiara!`,
        text: "En breve te haremos llegar tu cotización al correo de registro",
        imageUrl: "/images/GENERAL/canasta-confirmacion-cotizacion.png",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "Icono de paste"
      }).then(() => {
        window.location.href = '/index.html'; // Redirección a la página de registro
      });
    })
    .catch(error => {
      // Si algo falló durante el proceso, mostramos un error.
      //console.error('Error al enviar la cotización:', error);
      //alert('Hubo un problema al guardar tu cotización. Por favor, inténtalo de nuevo.');
      Swal.fire({
        title: `¡Error!`,
        text: "Estamos teniendo inconvenientes para enviar tu cotización, vuelve a intentarlo más tarde",
        imageUrl: "/images/GENERAL/canasta-confirmacion-cotizacion.png",
        icon: "error"
      })
      // También cerramos el modal en caso de error.
      modal.style.display = 'none';
    });
});
