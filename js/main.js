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

// Parallax sutil en hero
const heroImage = document.querySelector('.hero-image');
const heroOverlay = document.querySelector('.hero-overlay');
const catHeroImage = document.querySelector('.cat-hero-image');
const catHeroOverlay = document.querySelector('.cat-hero-overlay');
const activeHero = document.querySelector('.hero') || document.querySelector('.cat-hero');

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