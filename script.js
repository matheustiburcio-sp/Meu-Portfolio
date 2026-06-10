// === ANIMAÇÃO DE REVEAL para o layout PC (scroll-based) ===
(function () {
    const pcObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        { threshold: 0.05 }
    );

    function initPcObserver() {
        document.querySelectorAll(".animate-scroll, .animate-hero").forEach((el) => {
            pcObserver.observe(el);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPcObserver);
    } else {
        initPcObserver();
    }
})();

const sections = ["home", "skills", "education", "contact", "projects"];
let currentIndex = 0;

const navLinks = {
    education: document.getElementById("nav-education"),
    contact: document.getElementById("nav-contact"),
    projects: document.getElementById("nav-projects")
};

const navDefaults = {
    education: { text: "(educação)", target: "education" },
    contact: { text: "(contact)", target: "contact" },
    projects: { text: "(projects)", target: "projects" }
};

const backBtn = document.getElementById("backBtn");
const homeBtn = document.getElementById("homeBtn");
const navbar = document.getElementById("navbar");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const content = document.getElementById("content");
let isTouchScrolling = false;
let touchStartY = 0;

function resetNavLinks() {
    Object.keys(navLinks).forEach((key) => {
        const link = navLinks[key];
        const cfg = navDefaults[key];
        link.textContent = cfg.text;
        link.style.display = "inline";
        link.onclick = () => navigateTo(cfg.target);
        link.classList.remove("active");
        link.classList.remove("contact-edu-shift");
    });
}

function showSection(id) {
    const index = sections.indexOf(id);
    if (index === -1 || index === currentIndex) {
        return;
    }

    currentIndex = index;
    updateView(true);
}

function navigateTo(id) {
    showSection(id);
}

function nextSection() {
    if (isTouchScrolling) {
        return;
    }

    if (currentIndex < sections.length - 1) {
        currentIndex += 1;
        updateView(true);
    }
}

function prevSection() {
    if (isTouchScrolling) {
        return;
    }

    if (currentIndex > 0) {
        currentIndex -= 1;
        updateView(true);
    }
}

function goBack() {
    prevSection();
}

function updateButtons() {
    btnPrev.style.display = "inline-block";
    btnNext.style.display = "inline-block";
    btnPrev.textContent = "VOLTAR";
    btnNext.textContent = "AVANÇAR";

    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === sections.length - 1;
}

function updateNavBySection(currentId) {
    resetNavLinks();
    navbar.classList.toggle("is-home", currentId === "home");

    backBtn.style.display = "none";
    homeBtn.style.display = "none";

    if (currentId === "home" || currentId === "skills") {
        return;
    }

    if (currentId === "education") {
        backBtn.style.display = "block";
        homeBtn.style.display = "block";
        navLinks.education.style.display = "none";
        return;
    }

    if (currentId === "contact") {
        backBtn.style.display = "block";
        homeBtn.style.display = "block";
        navLinks.education.textContent = "(habilidades)";
        navLinks.education.onclick = () => navigateTo("skills");
        navLinks.education.classList.add("contact-edu-shift");
        navLinks.contact.style.display = "none";
        return;
    }

    if (currentId === "projects") {
        backBtn.style.display = "block";
        homeBtn.style.display = "block";
        navLinks.projects.style.display = "none";
    }
}

function updateView(animate) {
    const currentId = sections[currentIndex];

    document.querySelectorAll(".page-section").forEach((section) => {
        section.classList.remove("active", "entering");
    });

    const activeSection = document.getElementById(currentId);
    if (activeSection) {
        activeSection.classList.add("active");

        if (animate) {
            activeSection.classList.add("entering");
            window.setTimeout(() => {
                activeSection.classList.remove("entering");
            }, 520);
        }
    }

    updateNavBySection(currentId);
    updateButtons();
    content.scrollTop = 0;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextSection();
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        prevSection();
    }
});

content.addEventListener(
    "touchstart",
    (event) => {
        touchStartY = event.changedTouches[0].screenY;
        isTouchScrolling = false;
    },
    { passive: true }
);

content.addEventListener(
    "touchmove",
    (event) => {
        const touchY = event.changedTouches[0].screenY;
        if (Math.abs(touchStartY - touchY) > 8) {
            isTouchScrolling = true;
        }
    },
    { passive: true }
);

content.addEventListener(
    "touchend",
    () => {
        window.setTimeout(() => {
            isTouchScrolling = false;
        }, 140);
    },
    { passive: true }
);

updateView(false);
function initPCScrollSpy() {
    const sections = document.querySelectorAll('.pc-section[id]');
    const navLinks = document.querySelectorAll('.pc-navbar-links a');
 
    if (!sections.length || !navLinks.length) return;
 
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach((link) => {
                        const href = link.getAttribute('href');
                        link.classList.toggle('active', href === `#${id}`);
                    });
                }
            });
        },
        {
            root: null,
            // Dispara quando a seção ocupa pelo menos 40% da tela
            threshold: 0.4,
        }
    );
 
    sections.forEach((section) => observer.observe(section));
}
 
/* ----------------------------------------------------------------
   PARTE B — Mobile (ativa o link ao clicar na nav)
   O site mobile já usa JS para trocar seções, então
   basta marcar .active no link clicado
---------------------------------------------------------------- */
function initMobileNavActive() {
    const navLinks = document.querySelectorAll('.top-nav a');
 
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
 
    // Marca "Inicio" como ativo por padrão ao carregar
    const homeLink = document.querySelector('.top-nav a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
}
 
/* ----------------------------------------------------------------
   PARTE C — Navbar PC com blur suave ao rolar
   Aumenta opacidade do backdrop quando a página não está no topo
---------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.querySelector('.pc-navbar');
    if (!navbar) return;
 
    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.style.backdropFilter = 'blur(14px)';
            navbar.style.background = 'linear-gradient(to right, #332419e8, #1d1916cc, #3d312b40, #a58578cc)';
        } else {
            navbar.style.backdropFilter = 'blur(8px)';
            navbar.style.background = 'var(--nav-bg)';
        }
    };
 
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // chama uma vez ao carregar
}
 
/* ----------------------------------------------------------------
   INICIALIZAÇÃO
   Roda quando o DOM estiver pronto
---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    initPCScrollSpy();
    initMobileNavActive();
    initNavbarScroll();
});