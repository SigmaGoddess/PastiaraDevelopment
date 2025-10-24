// pag-regalar.js - Versión final optimizada y segura
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ Pastiara - Página Para Regalar cargada correctamente");

  // ===============================
  // FUNCIONES AUXILIARES
  // ===============================
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeAttr(str) { return escapeHtml(str); }

  // ===============================
  // FETCH E INYECCIÓN DE PRODUCTOS
  // ===============================
  async function fetchEInyectarParaRegalar() {
    try {
      const categoriaId = 4;
      const res = await fetch(`http://localhost:8080/api/productos/categoria/${categoriaId}`);
      if (!res.ok) {
        console.warn('Fetch para "Para Regalar" devolvió status', res.status);
        return;
      }
      const productos = await res.json();
      if (!Array.isArray(productos) || productos.length === 0) {
        console.log('No hay productos para "Para Regalar" (array vacío)');
        return;
      }

      const main = document.querySelector('main.body-regalar');
      if (!main) return console.warn('No se encontró main.body-regalar en DOM');

      // Eliminar secciones previas
      main.querySelectorAll('.pastiara-full-banner-section').forEach(e => e.remove());

      // Insertar productos
      productos.forEach((p, i) => {
        const alignClass = (i % 3 === 0) ? 'pastiara-product-left' : (i % 3 === 1) ? 'pastiara-product-right' : 'pastiara-product-center';
        const imgBase = p.imagenUrl || '/images/PARA-REGALAR/cajapararegalar.png';
        const img3d = p.imagen3D || '/images/PARA-REGALAR/barqui3ds.png';

        const html = `
          <div class="pastiara-full-banner-section">
            <div class="pastiara-banner-background"></div>
            <div class="pastiara-product-container">
              <div class="${alignClass}">
                <div class="pastiara-product-wrapper">
                  <h3 class="pastiara-product-name">${escapeHtml(p.nombre || '')}</h3>
                  <article class="product-3d">
                    <img src="${escapeAttr(imgBase)}" alt="${escapeAttr(p.nombre || '')}" class="pastiara-product-img">
                    <img src="${escapeAttr(img3d)}" alt="Vista 3D">
                  </article>
                  <div class="pastiara-product-info">
                    <p class="pastiara-description-text">${escapeHtml(p.descripcion || '')}</p>
                    <p class="pastiara-price">$${escapeHtml(String(p.precio != null ? p.precio : '0'))}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        main.insertAdjacentHTML('beforeend', html);
      });

      console.log(`🎉 Inyectados ${productos.length} productos en "Para Regalar"`);

      // Después de inyectar, inicializar efectos y animaciones
      initEfectos3D();
      initAnimaciones();
      initParallax();
      runTestDiagnostico();
    } catch (err) {
      console.error('Error al inyectar productos Para Regalar:', err);
    }
  }

  // ===============================
  // EFECTOS 3D Y HOVER
  // ===============================
  function initEfectos3D() {
    const products3D = document.querySelectorAll('.product-3d');
    console.log('\n🎯 === INICIALIZANDO EFECTO 3D ===');
    console.log(`📦 Productos 3D encontrados: ${products3D.length}`);

    products3D.forEach((product, index) => {
      const images = product.querySelectorAll('img');
      if (images.length < 2) return;

      product.style.transformStyle = 'preserve-3d';
      product.style.perspective = '1500px';

      const floatingImg = images[1];
      if (floatingImg) {
        floatingImg.style.position = 'absolute';
        floatingImg.style.pointerEvents = 'none';
        floatingImg.style.zIndex = '3';
      }

      product.addEventListener('mouseenter', function () {
        console.log(`🎯 HOVER activado en producto ${index + 1}`);
        setTimeout(() => {
          const lastImg = this.querySelector('img:last-child');
          const computedStyle = window.getComputedStyle(lastImg);
          console.log('   📊 Estado de imagen flotante:');
          console.log('      - Opacity:', computedStyle.opacity);
          console.log('      - Transform:', computedStyle.transform);
        }, 100);
      });

      product.addEventListener('mouseleave', function () {
        console.log(`👋 Hover desactivado en producto ${index + 1}`);
      });
    });
  }

  // ===============================
  // ANIMACIONES DE ENTRADA
  // ===============================
  function initAnimaciones() {
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -80px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    const productInfos = document.querySelectorAll('.pastiara-product-info');
    productInfos.forEach((info, index) => {
      info.style.opacity = '0';
      info.style.transform = 'translateY(20px)';
      info.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
      observer.observe(info);
    });

    const products = document.querySelectorAll('.pastiara-product-left, .pastiara-product-right, .pastiara-product-center');
    products.forEach((product, index) => {
      product.style.opacity = '0';
      product.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(product);
      setTimeout(() => { product.style.transitionDelay = `${index * 0.2}s`; }, 50);
    });
  }

  // ===============================
  // EFECTO PARALLAX
  // ===============================
  function initParallax() {
    let ticking = false;
    const banners = document.querySelectorAll('.pastiara-banner-background');
    if (banners.length === 0) return;

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
  }

  // ===============================
  // TEST AUTOMÁTICO DE DIAGNÓSTICO
  // ===============================
  function runTestDiagnostico() {
    setTimeout(() => {
      const firstProduct = document.querySelector('.product-3d');
      if (!firstProduct) return;

      const images = firstProduct.querySelectorAll('img');
      if (images.length < 2) return;

      setTimeout(() => {
        const floatingImg = images[1];
        const finalStyle = window.getComputedStyle(floatingImg);
        console.log('\n📋 Diagnóstico final de imagen flotante:');
        console.log(`   Visible: ${finalStyle.opacity > 0.5 ? '✅ SÍ' : '❌ NO'}`);
        console.log(`   Opacity: ${finalStyle.opacity}`);
        console.log(`   Display: ${finalStyle.display}`);
        console.log(`   Visibility: ${finalStyle.visibility}`);
      }, 5000);
    }, 2000);
  }

  // ===============================
  // INICIAR FETCH
  // ===============================
  fetchEInyectarParaRegalar();
});