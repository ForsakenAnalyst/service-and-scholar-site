document.addEventListener('DOMContentLoaded', () => {
  const bodyPage = document.body.dataset.page || '';
  const header = document.querySelector('.site-header');
  const landingHero = document.querySelector('.landing-hero');
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const yearSpan = document.getElementById('year');

  // Footer year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Home page: header appears + hero fades on scroll
  if (bodyPage === 'home') {
    function handleScroll() {
      const scrolled = window.scrollY > 80;

      if (header) {
        header.classList.toggle('header-visible', scrolled);
      }
      if (landingHero) {
        landingHero.classList.toggle('hero-faded', scrolled);
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on load
  } else {
    // Non-home pages: header should always be visible
    if (header) {
      header.classList.add('header-visible');
    }
  }
});