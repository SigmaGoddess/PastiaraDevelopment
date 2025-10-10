// pag-regalar.js
document.addEventListener('DOMContentLoaded', () => {
  console.log("Pastiara - Página Para Regalar Mejorada cargada");

  // Animación de scroll reveal mejorada
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
  productInfos.forEach((info, index) => {
    info.style.opacity = '0';
    info.style.transform = 'translateY(20px)';
    info.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(info);
  });

  // Efecto parallax suave en los banners
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const banners = document.querySelectorAll('.pastiara-banner-background');
        banners.forEach(banner => {
          const scrolled = window.pageYOffset;
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

  // Animación de entrada para productos
  const products = document.querySelectorAll('.pastiara-product-left, .pastiara-product-right, .pastiara-product-center');
  products.forEach((product, index) => {
    setTimeout(() => {
      product.style.opacity = '0';
      observer.observe(product);
      setTimeout(() => {
        product.style.opacity = '1';
      }, 100);
    }, index * 200);
  });
});