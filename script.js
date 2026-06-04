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
