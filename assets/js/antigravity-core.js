document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target all elements we want to animate on scroll
  document.querySelectorAll('.archive__item, .page__content > h1, .page__content > h2, .page__content > h3, .page__content > p, .page__content > ul').forEach(el => {
    el.classList.add('reveal-item');
    observer.observe(el);
  });

  // 2. Mouse Glow Effect on Glassmorphic Cards
  const cards = document.querySelectorAll('.archive__item, .glass-card');
  document.addEventListener('mousemove', e => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});
