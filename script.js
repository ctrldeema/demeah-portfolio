const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const modal = document.querySelector('#imageModal');
const modalImg = modal?.querySelector('img');
const closeBtn = modal?.querySelector('.modal-close');

document.querySelectorAll('[data-full]').forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.getAttribute('data-full');
    const img = button.querySelector('img');
    if (!src || !modal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = img?.alt || 'Project screenshot preview';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  if (!modal || !modalImg) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
  document.body.style.overflow = '';
}

closeBtn?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
