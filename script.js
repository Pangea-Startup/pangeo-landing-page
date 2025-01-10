// Lógica para el formulario de contacto y funcionalidades adicionales
document.addEventListener("DOMContentLoaded", () => {
    // Lógica para el formulario de contacto
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Obtener valores del formulario
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            // Validación simple
            if (!name || !email || !message) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            // Mostrar los datos en la consola (para pruebas)
            console.log("Nombre:", name);
            console.log("Correo Electrónico:", email);
            console.log("Mensaje:", message);

            // Aquí puedes agregar la lógica para enviar los datos a un servidor o API
            alert("Mensaje enviado. ¡Gracias por contactarnos!");
        });
    }


    const header = document.querySelector("header");
    const heroSection = document.querySelector(".hero-section");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    let lastScrollTop = 0;
    let isMenuActive = false;

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScrollTop && !isMenuActive) {
            header.style.transform = "translateY(-100%)";
        } else if (!isMenuActive) {
            header.style.transform = "translateY(0)";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        if (!isMenuActive) {
            if (currentScroll > heroSection.offsetHeight - 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    };

    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting && !isMenuActive) {
            header.classList.add("scrolled");
        } else if (!isMenuActive) {
            header.classList.remove("scrolled");
        }
    }, { root: null, threshold: 0.1 });
    observer.observe(heroSection);

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            isMenuActive = !isMenuActive;

            if (isMenuActive) {
                mobileMenu.style.display = "flex";
                setTimeout(() => {
                    mobileMenu.classList.add("active");
                }, 10);
                header.classList.add("menu-active");
                header.style.transform = "translateY(0)";
                window.removeEventListener("scroll", handleScroll); // Desactiva el scroll
            } else {
                mobileMenu.classList.remove("active");
                header.classList.remove("menu-active");
                mobileMenu.addEventListener("transitionend", () => {
                    if (!isMenuActive) mobileMenu.style.display = "none";
                });
                window.addEventListener("scroll", handleScroll); // Reactiva el scroll
            }
        });

        const menuLinks = mobileMenu.querySelectorAll("a");
        menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                isMenuActive = false;
                mobileMenu.classList.remove("active");
                header.classList.remove("menu-active");
                mobileMenu.addEventListener("transitionend", () => {
                    if (!isMenuActive) mobileMenu.style.display = "none";
                });
                window.addEventListener("scroll", handleScroll);
            });
        });
    }

    window.addEventListener("scroll", handleScroll);

    let currentLanguage = "es";
    let translations = {};

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`./i18n/${lang}.json`);
            translations = await response.json();
            updateText();
        } catch (error) {
            console.error("Error al cargar las traducciones:", error);
            translations = {};
            updateText();
        }
    }

    function updatePlaceholders() {
        document.querySelectorAll("[data-placeholder-i18n]").forEach((element) => {
            const placeholderKey = element.getAttribute("data-placeholder-i18n");
            const keys = placeholderKey.split(".");
            let text = translations;
            keys.forEach((key) => {
                text = text[key];
            });
            element.placeholder = text || "";
        });
    }

    function updateText() {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const keys = element.getAttribute("data-i18n").split(".");
            let text = translations;
            keys.forEach((key) => {
                text = text[key];
            });
            element.textContent = text || "";
        });
        updatePlaceholders();
    }

    function changeLanguage(lang) {
        currentLanguage = lang;
        loadTranslations(lang);
        highlightCurrentLanguage(lang);
    }

    function highlightCurrentLanguage(lang) {
        document.querySelectorAll("[data-lang-switch]").forEach((button) => {
            button.classList.toggle("lang-active", button.getAttribute("data-lang-switch") === lang);
        });
    }

    loadTranslations(currentLanguage);

    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
        button.addEventListener("click", (e) => {
            const lang = e.target.getAttribute("data-lang-switch");
            changeLanguage(lang);
        });
    });
});
