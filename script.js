// ─── flag JS-on (used to scope .reveal hiding so the page stays visible without JS)
document.documentElement.classList.add('js');

// ─── year
document.getElementById('y').textContent = new Date().getFullYear();

// ─── nav: stick on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ─── mobile burger
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');
burger?.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});
links?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
  })
);

// ─── reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ─── contact form (mock submit)
const form = document.querySelector('.contact__form');
const success = form?.querySelector('.form__success');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span>Envoi…</span>';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled = false;
    form.reset();
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => (success.hidden = true), 7000);
  }, 900);
});
