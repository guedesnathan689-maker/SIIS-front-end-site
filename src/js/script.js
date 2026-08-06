// Animação das seções ao aparecerem na tela

const sections = document.querySelectorAll(".card-section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {
    threshold:0.15
});


sections.forEach(section => {

    observer.observe(section);

});


// Efeito na navbar ao rolar a página

const navbar = document.querySelector(".nav-menu");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});


// Atualização automática do ano do rodapé

const footerYear = document.querySelector(".footer-page p");

const currentYear = new Date().getFullYear();

footerYear.innerHTML = 
`© SIIS - Todos os direitos reservados ${currentYear}.`;