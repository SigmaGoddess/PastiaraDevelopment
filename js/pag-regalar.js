/*pag-regalar.js - Versión optimizada y corregida
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ Pastiara - Página Para Regalar cargada correctamente");

 

    /* Verificar y reportar estado de las imágenes
    images.forEach((img, imgIndex) => {
      const imgType = imgIndex === 0 ? 'Base' : '3D Flotante';
      console.log(`  - Imagen ${imgIndex + 1} (${imgType}):`, img.src);

      if (img.complete && img.naturalWidth > 0) {
        console.log(`    ✅ Cargada: ${img.naturalWidth}x${img.naturalHeight}px`);

        // Verificar transparencia (aproximado)
        if (imgIndex === 1 && !img.src.toLowerCase().includes('.png')) {
          console.warn('     ⚠️ La imagen flotante debería ser PNG con transparencia');
        }
      } else if (img.complete && img.naturalWidth === 0) {
        console.error(`   ❌ Error: Imagen no encontrada o ruta incorrecta`);
      } else {
        console.log(`   ⏳ Cargando...`);

        img.addEventListener('load', () => {
          console.log(`    ✅ Imagen ${imgIndex + 1} cargada: ${img.naturalWidth}x${img.naturalHeight}px`);
        });

        img.addEventListener('error', () => {
          console.error(`  ❌ ERROR al cargar imagen ${imgIndex + 1}`);
          console.error(`   📍 Ruta: ${img.src}`);
          console.error(` 💡 Verifica que la ruta sea correcta`);
        });
      }
    });

    // Forzar estilos correctos
    product.style.transformStyle = 'preserve-3d';
    product.style.perspective = '1500px';

    // Asegurar que la imagen flotante esté correctamente posicionada
    const floatingImg = images[1];
    if (floatingImg) {
      floatingImg.style.position = 'absolute';
      floatingImg.style.pointerEvents = 'none';
      floatingImg.style.zIndex = '3';
    }

    // Logging detallado del hover
    product.addEventListener('mouseenter', function () {
      console.log(`\n🎯 HOVER activado en producto ${index + 1}`);

      setTimeout(() => {
        const lastImg = this.querySelector('img:last-child');
        const computedStyle = window.getComputedStyle(lastImg);
        console.log('   📊 Estado de imagen flotante:');
        console.log('      - Opacity:', computedStyle.opacity);
        console.log('      - Transform:', computedStyle.transform);
        console.log('      - Z-index:', computedStyle.zIndex);
        console.log('      - Position:', computedStyle.position);

        /* Verificar si el efecto se está aplicando
        if (computedStyle.opacity === '0' || computedStyle.opacity < 0.5) {
          console.warn('   ⚠️ La imagen flotante podría no ser visible (opacity muy baja)');
        }
      }, 100);
    });

    product.addEventListener('mouseleave', function () {
      console.log(`👋 Hover desactivado en producto ${index + 1}`);
    });
  });

  /* Verificar estilos aplicados al primer producto
  if (products3D.length > 0) {
    const testProduct = products3D[0];
    const styles = window.getComputedStyle(testProduct);
    console.log('\n🎨 Estilos del primer producto:');
    console.log('   - perspective:', styles.perspective);
    console.log('   - transform-style:', styles.transformStyle);
    console.log('   - position:', styles.position);
    console.log('   - cursor:', styles.cursor);

    if (styles.perspective === 'none') {
      console.error('   ❌ ERROR: perspective no está aplicándose');
    }
    if (styles.transformStyle !== 'preserve-3d') {
      console.error('   ❌ ERROR: transform-style no está en preserve-3d');
    }
  }

  console.log('\n=========================\n');

  /**  ============================================
  // CONFIGURACIÓN DEL OBSERVADOR DE INTERSECCIÓN
  // ============================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);*/

  // ============================================
  // ANIMACIONES DE ENTRADA
  // ============================================

  /*// Animar información de productos
  const productInfos = document.querySelectorAll('.pastiara-product-info');
  if (productInfos.length > 0) {
    productInfos.forEach((info, index) => {
      info.style.opacity = '0';
      info.style.transform = 'translateY(20px)';
      info.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
      observer.observe(info);
    });
    console.log(`✅ ${productInfos.length} tarjetas de información animadas`);
  }

  // Animar productos
  const products = document.querySelectorAll('.pastiara-product-left, .pastiara-product-right, .pastiara-product-center');
  if (products.length > 0) {
    products.forEach((product, index) => {
      product.style.opacity = '0';
      product.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(product);

      setTimeout(() => {
        product.style.transitionDelay = `${index * 0.2}s`;
      }, 50);
    });
    console.log(`✅ ${products.length} productos animados`);
  }*/

  // ============================================
  // EFECTO PARALLAX EN BANNERS
  // ============================================
 /* let ticking = false;
  const banners = document.querySelectorAll('.pastiara-banner-background');

  if (banners.length > 0) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          banners.forEach(banner => {
            const rect = banner.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              banner.style.transform = `translateY(calc(-50% + ${scrolled * 0.05}px))`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    });
    console.log(`✅ Efecto parallax aplicado a ${banners.length} banners`);
  }

  /*============================================
  // 🧪 TEST AUTOMÁTICO DE DIAGNÓSTICO
  // ============================================
  setTimeout(() => {
    console.log('\n🧪 === TEST DE DIAGNÓSTICO 3D ===');
    const firstProduct = document.querySelector('.product-3d');

    if (!firstProduct) {
      console.error('❌ No se encontró ningún producto para testear');
      return;
    }

    console.log('🔬 Ejecutando test en el primer producto...');

    const images = firstProduct.querySelectorAll('img');
    if (images.length < 2) {
      console.error('❌ TEST FALLIDO: Faltan imágenes');
      return;
    }

    // Verificar rutas
    console.log('\n📍 Verificación de rutas:');
    images.forEach((img, i) => {
      console.log(`${i + 1}. ${img.src}`);
      console.log(`Existe: ${img.complete && img.naturalWidth > 0 ? '✅' : '❌'}`);
    });

    // Limpiar después de 5 segundos
    setTimeout(() => {
      firstProduct.classList.remove('debug-test-3d');
      const style = document.getElementById('debug-3d-style');
      if (style) style.remove();
      console.log('✅ Test completado y limpiado');

      // Diagnóstico final
      const floatingImg = images[1];
      const finalStyle = window.getComputedStyle(floatingImg);
      console.log('\n📋 Diagnóstico final de imagen flotante:');
      console.log(`Visible: ${finalStyle.opacity > 0.5 ? '✅ SÍ' : '❌ NO'}`);
      console.log(`Opacity: ${finalStyle.opacity}`);
      console.log(`Display: ${finalStyle.display}`);
      console.log(`Visibility: ${finalStyle.visibility}`);
    }, 5000);

  }, 2000);

  console.log("\n✅ Inicialización completada\n");
});*/




/* Esperamos a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    const containerProductos = document.getElementById('product-3d').querySelector('pastiara-product-container'); // Contenedor de productos
    const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || []; // Favoritos del localStorage

    // Función para crear el HTML de cada producto
    function crearCardProducto(producto) {
        const col = document.createElement('div');
        col.className = 'pastiara-product-container';

        col.innerHTML = `
            <div class="pastiara-product-name">
                <div class="product-3d">
                    <img src="${producto.imagenUrl}" alt="${producto.nombre}" class="pastiara-product-img">
                    <button class="heart-favorite" data-product="${producto.id}" aria-label="Marcar como favorito">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="pastiara-product-info">
                    <h3>${producto.nombre}</h3>
                    <p class="pastiara-price">$${producto.precio}</p>
                    <p class="pastiara-description-text">${producto.descripcion}</p>
                </div>
            </div>
        `;
        return col;
    }

    // Función para actualizar los corazones según favoritos guardados
    function actualizarBotones() {
        const botonesFavorito = containerProductos.querySelectorAll('.heart-favorite');
        botonesFavorito.forEach(boton => {
            const productId = boton.dataset.product;
            if (favoritosGuardados.some(fav => fav.id == productId)) {
                boton.classList.add('active');
            }
        });
    }

    //  Función para gestionar favoritos (con verificación de login mediante JWT)
function gestionarFavorito(producto, boton) {
    const token = localStorage.getItem('authToken'); // Revisar si hay token
    if (!token) {
        // Si no hay token, redirige a registro/login
        window.location.href = '/pages/pag-registro/registro.html#register-form';
        return;
    }

    // Si hay token, procede a agregar a favoritos
    let favoritos = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
    const index = favoritos.findIndex(item => item.id == producto.id);

    if (index > -1) {
        favoritos.splice(index, 1);
        boton.classList.remove('active');
        mostrarNotificacion(`${producto.nombre} eliminado de favoritos`);
    } else {
        favoritos.push(producto);
        boton.classList.add('active');
        mostrarNotificacion(`${producto.nombre} añadido a favoritos ❤️`);
    }

    localStorage.setItem('pastiaraFavorites', JSON.stringify(favoritos));
}

    // Función para mostrar notificaciones
    function mostrarNotificacion(mensaje) {
        Toastify({
            text: mensaje,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #B58A6A, #a07551)",
            },
        }).showToast();
    }

    // Función principal para cargar productos desde la API
    async function cargarProductos() {
        try {
            const categoriaId = 3; // Cambia este ID al que corresponda a panadería en tu base
            const response = await fetch(`http://localhost:8080/api/productos/categoria/3`);
            if (!response.ok) throw new Error('Error al cargar productos');

            const productos = await response.json();
            containerProductos.innerHTML = ''; // Limpiar contenedor

            productos.forEach(producto => {
                const card = crearCardProducto(producto);
                containerProductos.appendChild(card);
            });

            // Agregamos listeners a los botones recién creados
            const botonesFavorito = containerProductos.querySelectorAll('.heart-favorite');
            botonesFavorito.forEach(boton => {
                const productCard = boton.closest('.product-3d');
                const producto = {
                    id: boton.dataset.product,
                    nombre: productCard.querySelector('h3').textContent,
                    precio: productCard.querySelector('.price').textContent,
                    descripcion: productCard.querySelector('.description').textContent,
                    imagen: productCard.querySelector('.product-image').src
                };
                boton.addEventListener('click', () => gestionarFavorito(producto, boton));
            });

            actualizarBotones(); // Marcar favoritos al cargar

        } catch (error) {
            console.error(error);
            containerProductos.innerHTML = `<p>Error al cargar los productos. Intenta más tarde.</p>`;
        }
    }

    cargarProductos(); 
});*/



// Variable para almacenar los productos cargados desde la API
// DEBE ser accesible por las funciones de gestión y carga.
let productosGlobal = [];
const containerProductos = document.getElementById('pastiara-product-container'); // Definido globalmente para la delegación

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    //  3. DELEGACIÓN DE EVENTOS (El corazón de la solución)
    // ----------------------------------------------------
    // Adjuntamos un ÚNICO listener al contenedor padre.
    containerProductos.addEventListener('click', (event) => {
        // Usamos .closest() para encontrar el botón de favorito, 
        // incluso si el usuario hace clic en el <i> (el corazón).
        const boton = event.target.closest('.heart-favorite');

        if (boton) {
            // Extraemos el ID del producto que guardamos en el HTML (línea 43)
            const productId = boton.dataset.productId;
            
            // Buscamos el objeto de producto COMPLETO en nuestra lista global
            const producto = productosGlobal.find(p => p.id == productId);

            // Verificación esencial antes de llamar a la función de gestión
            if (producto) {
                gestionarFavorito(producto, boton);
            }
        }
    });

    // Carga los productos al iniciar
    cargarProductos();
});

// ----------------------------------------------------
//  1. FUNCIÓN PRINCIPAL PARA CARGAR PRODUCTOS DESDE LA API
// ----------------------------------------------------

async function cargarProductos() {
    try {
        const categoriaId = 3;
        const response = await fetch(`http://localhost:8080/api/productos/categoria/${categoriaId}`);
        if (!response.ok) throw new Error('Error al cargar productos');

        // Almacenamos los productos en la variable global
        productosGlobal = await response.json(); 
        containerProductos.innerHTML = ''; // Limpiar contenedor

        productosGlobal.forEach((producto) => {
            const card = crearCardProducto(producto);
            containerProductos.appendChild(card);
        });

        // Llamamos a actualizar botones una sola vez después de cargar todo
        actualizarBotones(); 

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        containerProductos.innerHTML = `<p>Error al cargar los productos. Intenta más tarde.</p>`;
    }
}

// ----------------------------------------------------
//  2. FUNCIÓN PARA CREAR LA CARD DEL PRODUCTO (Revisada)
// ----------------------------------------------------

function crearCardProducto(producto) {
    const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];

    const col = document.createElement('div');
    col.className = 'pastiara-product-container';

    // Nota: Es mejor usar la clase .product-3d para la tarjeta principal.
    // Usaremos un atributo data-product-id en el botón (ver abajo)
    col.innerHTML = `
        <div class="pastlara-product-name">
            <div class="product-3d">
                <img src="${producto.imagenUrl}" alt="${producto.nombre}" class="pastiara-product-img">
                
                <button class="heart-favorite" data-product-id="${producto.id}" aria-label="Marcar como favorito">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="pastiara-product-info">
                <h3>${producto.nombre}</h3>
                <p class="pastiara-price">$${producto.precio}</p>
                <p class="pastiara-description-text">${producto.descripcion}</p>
            </div>
        </div>
    `;

    return col;
}

// ----------------------------------------------------
//  4. FUNCIÓN PARA ACTUALIZAR LOS CORAZONES (Se mantiene, pero revisa la selección)
// ----------------------------------------------------

function actualizarBotones() {
    // Seleccionamos todos los botones que se cargaron
    const botonesFavorito = containerProductos.querySelectorAll('.heart-favorite');

    botonesFavorito.forEach(boton => {
        const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        // Usamos data-product-id para coincidir con la nueva estructura
        const productId = boton.dataset.productId; 
        
        // El operador == (doble igual) está bien si 'productId' es string y 'fav.id' es número
        // o viceversa, ya que permite la coerción de tipo. Si ambos son números, usa ===
        if (favoritosGuardados.some(fav => fav.id == productId)) {
            boton.classList.add('active');
        } else {
            // Asegura que se quite la clase si ya no está en favoritos (útil si clearStorage se usó)
            boton.classList.remove('active'); 
        }
    });
}

// ----------------------------------------------------
//  5. FUNCIÓN PARA GESTIONAR FAVORITOS (Se mantiene)
// ----------------------------------------------------

function gestionarFavorito(producto, boton) {
    const token = localStorage.getItem('authToken');

    if (!token) {
        window.location.href = '/pages/pag-registro/registro.html#register-form';
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
    const index = favoritos.findIndex(item => item.id == producto.id);

    if (index > -1) {
        favoritos.splice(index, 1);
        boton.classList.remove('active');
        mostrarNotificacion(`${producto.nombre} eliminado de favoritos`);
    } else {
        favoritos.push(producto);
        boton.classList.add('active');
        mostrarNotificacion(`${producto.nombre} añadido a favoritos ❤️`);
    }

    localStorage.setItem('pastiaraFavorites', JSON.stringify(favoritos));
}


// ----------------------------------------------------
//  6. FUNCIÓN PARA MOSTRAR NOTIFICACIONES (Se mantiene)
// ----------------------------------------------------
// Asumo que Toasty está correctamente importado en el HTML.
function mostrarNotificacion(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        position: "right",
        style: {
            background: "linear-gradient(to right, #858A6A, #a07551)",
        },
    }).showToast();
}


