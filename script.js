document.addEventListener('DOMContentLoaded', () => {
  const bodyPage = document.body.dataset.page || '';
  const header = document.querySelector('.site-header');
  const landingHero = document.querySelector('.landing-hero');
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const yearSpan = document.getElementById('year');

  // ===== Footer year =====
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===== Mobile nav toggle (robust: closes on outside click + Esc + resize) =====
  const openNav = () => {
    if (!navToggle || !navMobile) return;
    navMobile.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  const closeNav = () => {
    if (!navToggle || !navMobile) return;
    navMobile.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const isNavOpen = () => navMobile?.classList.contains('open');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isNavOpen()) closeNav();
      else openNav();
    });

    // Close when a link is clicked
    navMobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeNav());
    });

    // Close on outside click (when open)
    document.addEventListener('click', (e) => {
      if (!isNavOpen()) return;
      const target = e.target;
      const clickedInsideNav = navMobile.contains(target);
      const clickedToggle = navToggle.contains(target);
      if (!clickedInsideNav && !clickedToggle) closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isNavOpen()) closeNav();
    });

    // Close if user resizes to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980 && isNavOpen()) closeNav();
    });
  }

  // ===== Home page: header appears + hero fades on scroll =====
  if (bodyPage === 'home') {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      if (header) header.classList.toggle('header-visible', scrolled);
      if (landingHero) landingHero.classList.toggle('hero-faded', scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load
  } else {
    // Non-home pages: header should always be visible
    if (header) header.classList.add('header-visible');
  }
});
=