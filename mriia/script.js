document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const bookingForm = document.getElementById('booking-form');
  const thankYouModal = document.getElementById('thank-you-modal');
  const thankYouHome = document.getElementById('thank-you-home');
  const callToggle = document.getElementById('call-toggle');
  const callMenu = document.getElementById('call-menu');

  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('theme') || 'light'; } catch (error) { /* private mode */ }

  const setTheme = (theme) => {
    root.toggleAttribute('data-theme', theme === 'dark');
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему');
  };

  setTheme(savedTheme);
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try { localStorage.setItem('theme', nextTheme); } catch (error) { /* private mode */ }
  });

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
  });

  const closeMainMenu = () => {
    nav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Відкрити меню');
  };

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMainMenu));

  const sections = document.querySelectorAll('.fade-section');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach((section) => section.classList.add('show'));
  }

  const dateInput = document.getElementById('booking-date');
  const today = new Date();
  dateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  bookingForm.addEventListener('submit', () => {
    const submitButton = document.getElementById('booking-submit');
    submitButton.disabled = true;
    submitButton.textContent = 'Надсилаємо…';

    window.setTimeout(() => {
      bookingForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = 'Надіслати заявку';
      thankYouModal.classList.add('is-visible');
      thankYouModal.setAttribute('aria-hidden', 'false');
      thankYouHome.focus();

      window.setTimeout(returnHome, 4000);
    }, 900);
  });

  function returnHome() {
    thankYouModal.classList.remove('is-visible');
    thankYouModal.setAttribute('aria-hidden', 'true');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  thankYouHome.addEventListener('click', returnHome);
  thankYouModal.addEventListener('click', (event) => {
    if (event.target === thankYouModal) returnHome();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && thankYouModal.classList.contains('is-visible')) returnHome();
    if (event.key === 'Escape') {
      closeCallMenu();
      closeMainMenu();
    }
  });

  function closeCallMenu() {
    callMenu.classList.remove('is-visible');
    callMenu.setAttribute('aria-hidden', 'true');
    callToggle.setAttribute('aria-expanded', 'false');
  }

  callToggle.addEventListener('click', () => {
    const isOpen = callMenu.classList.toggle('is-visible');
    callMenu.setAttribute('aria-hidden', String(!isOpen));
    callToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.call-widget')) closeCallMenu();
    if (!event.target.closest('header')) closeMainMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMainMenu();
  });
});
