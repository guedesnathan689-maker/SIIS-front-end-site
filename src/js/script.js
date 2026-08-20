const topbar = document.querySelector(".topbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const backToTop = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");

/* NAVBAR AO ROLAR */

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        topbar.classList.add("scrolled");
    } else {
        topbar.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

});


/* MENU MOBILE */

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");
        menuToggle.textContent = "☰";

    });

});


/* ANIMAÇÕES AO ROLAR */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* FAQ */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const activeItem = document.querySelector(".faq-item.active");

        if (activeItem && activeItem !== item) {

            activeItem.classList.remove("active");

            activeItem.querySelector(".faq-answer").style.maxHeight = null;

        }

        item.classList.toggle("active");

        if (item.classList.contains("active")) {

            answer.style.maxHeight = answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});


/* VOLTAR AO TOPO */

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* CONTADORES */

const counters = document.querySelectorAll("[data-count]");

let countersStarted = false;

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting && !countersStarted) {

            countersStarted = true;

            counters.forEach(counter => {

                const target = Number(counter.dataset.count);

                let current = 0;

                const duration = 1200;

                const increment = target / (duration / 20);

                const interval = setInterval(() => {

                    current += increment;

                    if (current >= target) {

                        counter.textContent = target;
                        clearInterval(interval);

                    } else {

                        counter.textContent = Math.floor(current);

                    }

                }, 20);

            });

        }

    });

}, {
    threshold: 0.3
});


const statsSection = document.querySelector(".stats-section");

if (statsSection) {
    counterObserver.observe(statsSection);
}


/* TEMA ESCURO */

const savedTheme = localStorage.getItem("siis-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    themeToggle.textContent = darkMode ? "☀" : "☾";

    localStorage.setItem(
        "siis-theme",
        darkMode ? "dark" : "light"
    );

});


/* DESTACAR ITEM DO MENU */

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}, {
    threshold: 0.35
});


sections.forEach(section => {

    sectionObserver.observe(section);

});