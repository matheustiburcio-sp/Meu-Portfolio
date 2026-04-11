// === ANIMAÇÃO DE ENTRADA NA PÁGINA (hero) ===
document.addEventListener("DOMContentLoaded", () => {
  const heroElements = document.querySelectorAll(".animate-hero");
  heroElements.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.3}s`;
    el.classList.add("fade-in-down");
  });

  // === ANIMAÇÃO AO ROLAR A PÁGINA (scroll) ===
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".animate-scroll").forEach((el) => {
    observer.observe(el);
  });
});
