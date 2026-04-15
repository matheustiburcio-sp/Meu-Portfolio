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

  // === MENU HAMBURGER ===
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".navbar-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
});
