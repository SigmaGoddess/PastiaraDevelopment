// pag-regalar.js - Versión optimizada y corregida
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ Pastiara - Página Para Regalar cargada correctamente");

  // ============================================
  // 🔍 VERIFICACIÓN Y CORRECCIÓN DEL EFECTO 3D
  // ============================================
  const products3D = document.querySelectorAll('.product-3d');

  console.log('\n🎯 === INICIALIZANDO EFECTO 3D ===');
  console.log(`📦 Productos 3D encontrados: ${products3D.length}`);

  if (products3D.length === 0) {
    console.warn('⚠️ No se encontraron productos con clase .product-3d');
  }

  products3D.forEach((product, index) => {
    const images = product.querySelectorAll('img');
    console.log(`\n🎁 Producto ${index + 1}:`);
    console.log(`   📸 Total imágenes: ${images.length}`);

    if (images.length < 2) {
      console.error(`   ❌ ERROR: Se necesitan 2 imágenes, solo hay ${images.length}`);
      return;
    }

    // Verificar y reportar estado de las imágenes
    images.forEach((img, imgIndex) => {
      const imgType = imgIndex === 0 ? 'Base' : '3D Flotante';
      console.log(`   - Imagen ${imgIndex + 1} (${imgType}):`, img.src);

      if (img.complete && img.naturalWidth > 0) {
        console.log(`     ✅ Cargada: ${img.naturalWidth}x${img.naturalHeight}px`);

        // Verificar transparencia (aproximado)
        if (imgIndex === 1 && !img.src.toLowerCase().includes('.png')) {
          console.warn('     ⚠️ La imagen flotante debería ser PNG con transparencia');
        }
      } else if (img.complete && img.naturalWidth === 0) {
        console.error(`     ❌ Error: Imagen no encontrada o ruta incorrecta`);
      } else {
        console.log(`     ⏳ Cargando...`);

        img.addEventListener('load', () => {
          console.log(`     ✅ Imagen ${imgIndex + 1} cargada: ${img.naturalWidth}x${img.naturalHeight}px`);
        });

        img.addEventListener('error', () => {
          console.error(`     ❌ ERROR al cargar imagen ${imgIndex + 1}`);
          console.error(`     📍 Ruta: ${img.src}`);
          console.error(`     💡 Verifica que la ruta sea correcta`);
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

        // Verificar si el efecto se está aplicando
        if (computedStyle.opacity === '0' || computedStyle.opacity < 0.5) {
          console.warn('   ⚠️ La imagen flotante podría no ser visible (opacity muy baja)');
        }
      }, 100);
    });

    product.addEventListener('mouseleave', function () {
      console.log(`👋 Hover desactivado en producto ${index + 1}`);
    });
  });

  // Verificar estilos aplicados al primer producto
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

  // ============================================
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
  }, observerOptions);

  // ============================================
  // ANIMACIONES DE ENTRADA
  // ============================================

  // Animar información de productos
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
  }

  // ============================================
  // EFECTO PARALLAX EN BANNERS
  // ============================================
  let ticking = false;
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

  // ============================================
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
      console.log(`   ${i + 1}. ${img.src}`);
      console.log(`      Existe: ${img.complete && img.naturalWidth > 0 ? '✅' : '❌'}`);
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
      console.log(`   Visible: ${finalStyle.opacity > 0.5 ? '✅ SÍ' : '❌ NO'}`);
      console.log(`   Opacity: ${finalStyle.opacity}`);
      console.log(`   Display: ${finalStyle.display}`);
      console.log(`   Visibility: ${finalStyle.visibility}`);
    }, 5000);

  }, 2000);

  console.log("\n✅ Inicialización completada\n");
});