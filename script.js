document.addEventListener('DOMContentLoaded', () => {
  const bodyPage = document.body.dataset.page || '';
  const header = document.querySelector('.site-header');
  const landingHero = document.querySelector('.landing-hero');
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const yearSpan = document.getElementById('year');

  // ===== Theme toggle (manual override + persistence) =====
  // Usage:
  // - Add a button somewhere: <button id="theme-toggle" class="btn ghost" type="button">Toggle theme</button>
  // - Or any element with [data-theme-toggle]
  const root = document.documentElement;
  const themeToggleBtn =
    document.getElementById('theme-toggle') || document.querySelector('[data-theme-toggle]');

  // Apply saved theme if present
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    root.setAttribute('data-theme', savedTheme);
  }

  // Optional: keep button label/icon in sync (safe if you don't use it)
  function updateThemeToggleUI() {
    if (!themeToggleBtn) return;

    // Determine active theme: manual override wins; otherwise system preference
    const manual = root.getAttribute('data-theme');
    const isDark = manual
      ? manual === 'dark'
      : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');

    // If you want text to change, uncomment:
    // themeToggleBtn.textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme');

    // If no manual theme yet, toggle from system-derived state
    if (!current) {
      const prefersDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const next = prefersDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeToggleUI();
      return;
    }

    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeToggleUI();
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
    updateThemeToggleUI();
  }

  // If user changes OS theme and you haven't set a manual override, keep UI in sync
  if (window.matchMedia) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemThemeChange = () => {
      if (!root.getAttribute('data-theme')) updateThemeToggleUI();
    };
    // Safari uses addListener/removeListener; modern browsers use addEventListener
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onSystemThemeChange);
    } else if (typeof mql.addListener === 'function') {
      mql.addListener(onSystemThemeChange);
    }
  }

  // ===== Footer year =====
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===== Mobile nav toggle =====
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

  // ===== Home page: header appears + hero fades on scroll =====
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