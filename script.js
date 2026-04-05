// ─── MOBILE NAV ───
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
}
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => mobileNav?.classList.remove('open'));
});

// ─── ACTIVE NAV LINK ───
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links-list a, .mobile-nav a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ─── FAQ ACCORDION ───
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.style.maxHeight = '0';
  });
  if (!isOpen) {
    btn.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ─── COUNTER ANIMATION ───
function animateCounter(el) {
  const target = el.dataset.target;
  const isNum = !isNaN(target);
  if (!isNum) return;
  const duration = 1600;
  const num = parseInt(target);
  const suffix = el.dataset.suffix || '';
  const step = num / (duration / 16);
  let current = 0;
  const t = setInterval(() => {
    current += step;
    if (current >= num) { el.textContent = num.toLocaleString() + suffix; clearInterval(t); }
    else el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

// ─── SCROLL REVEAL ───
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('revealed'), (parseInt(e.target.dataset.delay) || 0));
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  el.style.cssText = 'opacity:0;transform:translateY(24px);transition:opacity .5s ease,transform .5s ease;';
  revealObs.observe(el);
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.revealed').forEach(el => {
    el.style.opacity = '1'; el.style.transform = 'translateY(0)';
  });
});
document.head.insertAdjacentHTML('beforeend', '<style>.revealed{opacity:1!important;transform:translateY(0)!important}</style>');
