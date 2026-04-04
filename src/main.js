import './style.css';

// SVG Icons for Theme Toggle
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27a10.15,10.15,0,0,0,10.14,10.14h.35A8.08,8.08,0,0,1,12.14,19.69Z"/></svg>`;
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,4.64A7.36,7.36,0,1,0,19.36,12,7.37,7.37,0,0,0,12,4.64Zm0,12.72A5.36,5.36,0,1,1,17.36,12,5.37,5.37,0,0,1,12,17.36ZM21.5,11h-1a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2ZM3.5,11h-1a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2ZM12,2.5a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0v-1A1,1,0,0,0,12,2.5Zm0,16a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0v-1A1,1,0,0,0,12,18.5Zm6.36-12.07a1,1,0,0,0-1.41-1.41l-.71.71a1,1,0,0,0,1.41,1.41ZM5.05,18.95a1,1,0,0,0,1.41-1.41l-.71-.71a1,1,0,0,0-1.41,1.41Zm12.49,0a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41l-.71-.71a1,1,0,0,0-1.41,1.41Zm-11.08-11L5.75,7.24A1,1,0,0,0,7.16,8.65l.71-.71A1,1,0,0,0,6.46,6.53Z"/></svg>`;

// Theme Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Initialize Theme
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
  if (theme === 'light') {
    body.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = moonIcon; // Show moon to switch to dark
  } else {
    body.removeAttribute('data-theme');
    themeToggle.innerHTML = sunIcon; // Show sun to switch to light
  }
  localStorage.setItem('theme', theme);
};

// Apply Initial Theme
setTheme(getInitialTheme());

// Toggle Event
themeToggle.addEventListener('click', () => {
  const isDark = !body.hasAttribute('data-theme');
  setTheme(isDark ? 'light' : 'dark');
});

// Simple Scroll Animation (Intersection Observer)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.glass-card').forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(card);
});
