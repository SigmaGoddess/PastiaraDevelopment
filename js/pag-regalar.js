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

    const containerProductos = document.querySelector('.pastiara-full-banner-section'); // Contenedor de productos
    
  // Asegúrate de que exista el contenedor antes de continuar
    if (!containerProductos) {
        console.error("No se encontró el contenedor de productos. Verifica el selector.");
        return;

    }

    // 2. FUNCIÓN PARA GESTIONAR FAVORITOS (con verificación de login mediante JWT)
    function gestionarFavorito(producto, boton) {
        const token = localStorage.getItem('authToken'); // Revisar si hay token
        if (!token) {
            // Si no hay token, redirige a registro/login
            window.location.href = '/pages/pag-registro/registro.html#register-form';
            return;
        }

        let favoritos = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
        // Usamos el ID del producto para buscarlo
        const index = favoritos.findIndex(item => item.id == producto.id);

        if (index > -1) {
            // Eliminar de favoritos
            favoritos.splice(index, 1);
            boton.classList.remove('active');
            mostrarNotificacion(`${producto.nombre} eliminado de favoritos 💔`);
        } else {
            // Agregar a favoritos
            // Guardamos el objeto completo del producto para futura visualización
            favoritos.push(producto);
            boton.classList.add('active');
            mostrarNotificacion(`${producto.nombre} añadido a favoritos ❤️`);
        }

        localStorage.setItem('pastiaraFavorites', JSON.stringify(favoritos));
    }

// Función para mostrar notificaciones (asumiendo que Toastify está cargado)
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



// 3. FUNCIÓN PARA CREAR EL HTML DE CADA PRODUCTO (Ajustado a tu estructura)
    function crearCardProducto(producto, favoritosGuardados) {
        // Usamos la clase del contenedor de tu HTML original: pastiara-product-container
        const wrapper = document.createElement('div');
        wrapper.className = 'pastiara-product-container';

        // Determina si el producto está en favoritos para añadir la clase 'active'
        const isFavorite = favoritosGuardados.some(fav => fav.id == producto.id);
        const activeClass = isFavorite ? 'active' : '';

        wrapper.innerHTML = `
            <div class="pastiara-product-left">
                <div class="pastiara-product-wrapper">
                    <h3 class="pastiara-product-name">${producto.nombre}</h3>
                </div>
                <article class="product-3d">
                    <img src="${producto.imagenUrl}" alt="${producto.nombre}" class="pastiara-product-img product-image">
                    <button class="heart-favorite ${activeClass}" data-product="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}" data-description="${producto.descripcion}" data-image="${producto.imagenUrl}" aria-label="Marcar como favorito">
                        <i class="fas fa-heart"></i>
                    </button>
                </article>
            </div>
            <div class="pastiara-product-info">
                <p class="pastiara-description-text description">${producto.descripcion}</p>
                <p class="pastiara-price price">$${producto.precio}</p>
            </div>
        `;
        return wrapper;
    }

    // 4. FUNCIÓN PRINCIPAL PARA CARGAR PRODUCTOS DESDE LA API
    async function cargarProductos() {
        try {
            const categoriaId = 3; 
            const response = await fetch(`http://localhost:8080/api/productos/categoria/1`);
            if (!response.ok) throw new Error('Error al cargar productos');

            const productos = await response.json();
            const favoritosGuardados = JSON.parse(localStorage.getItem('pastiaraFavorites')) || [];
            
            // Limpiar contenedor antes de añadir nuevos productos
            // (Asegúrate de no borrar otros elementos necesarios, sino solo el área de productos)
            containerProductos.innerHTML = ''; 

            productos.forEach(producto => {
                // El HTML de la API asume que tienes propiedades como id, nombre, precio, descripcion, imagenUrl.
                const card = crearCardProducto(producto, favoritosGuardados);
                containerProductos.appendChild(card);

                // 5. ASIGNACIÓN DE EVENT LISTENER Y EXTRACCIÓN DE DATOS SIMPLIFICADA
                // Obtenemos el botón recién creado.
                const boton = card.querySelector('.heart-favorite');

                // Creamos un objeto 'producto' completo a partir de los datos de la API (es más fácil)
                // Opcional: Si la API te da un objeto muy grande, puedes construir uno más ligero 
                // usando los atributos 'data-' del botón para consistencia.
                const productoData = {
                    id: boton.dataset.product,
                    nombre: boton.dataset.name,
                    precio: boton.dataset.price,
                    descripcion: boton.dataset.description,
                    imagenUrl: boton.dataset.image
                };
                
                // Añadimos el listener
                boton.addEventListener('click', () => gestionarFavorito(productoData, boton));
            });

        } catch (error) {
            console.error('Error en cargarProductos:', error);
            containerProductos.innerHTML = `<p>Error al cargar los productos. Intenta más tarde.</p>`;
        }
    }

    cargarProductos(); 
});*/


/*document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.heart-favorite');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      boton.classList.toggle('active');
      boton.classList.add('animate');

      setTimeout(() => boton.classList.remove('animate'), 600);

      const nombre = boton.closest('.pastiara-product-wrapper')
                         .querySelector('.pastiara-product-name').textContent;

      Toastify({
        text: boton.classList.contains('active') 
          ? `${nombre} añadido a favoritos ❤️` 
          : `${nombre} eliminado de favoritos 💔`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: { background: "linear-gradient(to right, #B58A6A, #a07551)" },
      }).showToast();
    });
  });
});*/



document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.heart-favorite');

    botones.forEach(boton => {
        boton.addEventListener('click', async (event) => { // Agregamos 'async' para usar await
            event.preventDefault(); // Opcional: Previene cualquier acción por defecto del botón

            const productId = boton.getAttribute('data-product-id');
            const isAdding = !boton.classList.contains('active'); // Determina si se va a añadir o eliminar
            
            // 1. Efecto visual (opcional, para feedback rápido)
            boton.classList.toggle('active');
            boton.classList.add('animate');
            setTimeout(() => boton.classList.remove('animate'), 600);

            // 2. Información para el Toast
            const wrapper = boton.closest('.pastiara-product-wrapper');
            const nombre = wrapper ? wrapper.querySelector('.pastiara-product-name').textContent : 'Producto';
            let toastText = `${nombre} ${isAdding ? 'añadido a favoritos ❤️' : 'eliminado de favoritos 💔'}`;
            let toastBackground = isAdding ? "linear-gradient(to right, #B58A6A, #a07551)" : "linear-gradient(to right, #7a7a7a, #5c5c5c)";

            // 3. Comunicación con el Backend
             
            try {
                // Configura la URL y el método de la solicitud.
                // Reemplaza esta URL con la ruta real de tu backend.
                const categoriaId = 4; // ID de volovanes en la base de datos
                const response = await fetch(`http://localhost:8080/api/productos/categoria/4`, {
                    method: 'POST', // Usamos POST para crear/modificar el estado
                    headers: {
                        'Content-Type': 'application/json',
                        // Si usas tokens de autenticación (JWT), agrégalo aquí:
                        // 'Authorization': `Bearer ${token_del_usuario}`
                    },
                    body: JSON.stringify({
                        productId: productId,
                        action: isAdding ? 'add' : 'remove'
                        // Puedes enviar el ID del usuario aquí, o dejar que el backend lo obtenga
                        // desde la sesión o el token de autenticación.
                    })
                });

                if (!response.ok) {
                    // Si el servidor responde con un error (4xx o 5xx)
                    throw new Error(`Error del servidor: ${response.statusText}`);
                }

                // Opcional: Puedes procesar la respuesta del servidor si retorna datos
                // const data = await response.json(); 
                
                // Muestra el Toast de éxito
                Toastify({
                    text: toastText,
                    duration: 2000,
                    gravity: "bottom",
                    position: "right",
                    style: { background: toastBackground },
                }).showToast();

            } catch (error) {
                console.error('Error al actualizar favoritos:', error);
                
                // ⚠️ IMPORTANTE: Si falla el backend, debemos revertir el cambio visual
                boton.classList.toggle('active', !isAdding); // Vuelve al estado anterior

                // Muestra un Toast de error
                Toastify({
                    text: `Error al actualizar: ${error.message || 'Inténtalo de nuevo.'}`,
                    duration: 3000,
                    gravity: "bottom",
                    position: "right",
                    style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" },
                }).showToast();
            }
        });
    });
});

