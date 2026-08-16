document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const bookingForm = document.getElementById('booking-form');

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

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

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
  });
});
