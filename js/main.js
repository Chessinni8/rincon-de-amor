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