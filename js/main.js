// Preloader
const preloader = document.getElementById('preloader');
if (preloader) {
  if (sessionStorage.getItem('preloader-shown')) {
    preloader.remove();
  } else {
    sessionStorage.setItem('preloader-shown', 'true');
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hide');
        preloader.addEventListener('transitionend', () => preloader.remove());
      }, 600);
    });
  }
}

// Navbar: cambiar estilo al hacer scroll
const navbar = document.getElementById('navbar');

// Ajustar padding del hero según altura real del navbar
function ajustarHero() {
  const alturaNavbar = navbar.offsetHeight;
  const hero = document.querySelector('.hero');
  const catHero = document.querySelector('.cat-hero');
  if (hero) hero.style.paddingTop = alturaNavbar + 'px';
  if (catHero) catHero.style.paddingTop = alturaNavbar + 'px';
}

// Ejecutar al cargar y al cambiar tamaño de ventana
ajustarHero();
window.addEventListener('resize', ajustarHero);

// Menú hamburguesa (móvil)
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Cerrar menú al hacer click fuera de él
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

// Intersection Observer — Scroll Reveal
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// Parallax sutil en hero
const heroImage = document.querySelector('.hero-image');
const heroOverlay = document.querySelector('.hero-overlay');
const catHeroImage = document.querySelector('.cat-hero-image');
const catHeroOverlay = document.querySelector('.cat-hero-overlay');
const activeHero = document.querySelector('.hero') || document.querySelector('.cat-hero');

// Hero image blur-up
if (heroImage) {
  if (heroImage.complete) {
    heroImage.classList.add('loaded');
  } else {
    heroImage.addEventListener('load', () => heroImage.classList.add('loaded'));
  }
}

if (heroImage || catHeroImage) {
  const targetImage = heroImage || catHeroImage;
  const targetOverlay = heroOverlay || catHeroOverlay;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = activeHero.offsetHeight;
    
    if (scrolled < heroHeight) {
      const parallaxSpeed = 0.4;
      targetImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      
      if (targetOverlay) {
        const overlayOpacity = 0.45 + (scrolled / heroHeight) * 0.3;
        targetOverlay.style.background = `linear-gradient(to bottom, rgba(58, 37, 48, ${overlayOpacity}) 0%, rgba(58, 37, 48, ${overlayOpacity - 0.2}) 50%, rgba(58, 37, 48, ${overlayOpacity + 0.1}) 100%)`;
      }
    }
  }, { passive: true });
}

// Back to top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Lightbox galería
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
const galeriaItems = document.querySelectorAll('.galeria-item');

if (lightbox && galeriaItems.length > 0) {
  const images = Array.from(galeriaItems).map(item => {
    const img = item.querySelector('img');
    return { src: img.src, alt: img.alt };
  });
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
  }

  galeriaItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}