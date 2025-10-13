// pag-regalar.js - Versión optimizada
document.addEventListener('DOMContentLoaded', () => {
  console.log("Pastiara - Página Para Regalar cargada correctamente");

  // Configuración del observador
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

  // Animar información de productos
  const productInfos = document.querySelectorAll('.pastiara-product-info');
  if (productInfos.length > 0) {
    productInfos.forEach((info, index) => {
      info.style.opacity = '0';
      info.style.transform = 'translateY(20px)';
      info.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
      observer.observe(info);
    });
  }

  // Efecto parallax en banners
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
  }

  // Animación de productos
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
  }

  // Efecto hover en artículos 3D
  const articles = document.querySelectorAll('article.product-3d');
  if (articles.length > 0) {
    articles.forEach(article => {
      article.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      });
      
      article.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }

  console.log("✅ Animaciones inicializadas correctamente");
});