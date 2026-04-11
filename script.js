// === ANIMAÇÃO DE REVEAL (hero + scroll) ===
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".animate-scroll, .animate-hero").forEach((el) => {
    observer.observe(el);
  });
});
