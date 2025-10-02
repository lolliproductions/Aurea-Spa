document.addEventListener('DOMContentLoaded', () => {
  // cible uniquement tes paragraphes
  const els = document.querySelectorAll('.introduction p.animate__animated');

  // 1) on mémorise et retire la/les classes d’animation présentes au chargement
  els.forEach(el => {
    const animClasses = [...el.classList].filter(c => c.startsWith('animate__') && c !== 'animate__animated');
    el.dataset.animate = animClasses.join(' ');
    animClasses.forEach(c => el.classList.remove(c)); // empêche l’anim au chargement
  });

  // 2) on observe l’entrée dans le viewport
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      // remet la/les classes d’animation + rend visible
      el.classList.add('is-visible');
      el.dataset.animate.split(' ').forEach(c => el.classList.add(c));

      io.unobserve(el); // joue une seule fois; enlève cette ligne si tu veux rejouer à chaque scroll
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

  els.forEach(el => io.observe(el));
});
