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

    let lastScrollTop = 0; // Dirección del scroll
    let isMenuActive = false; // Estado del menú hamburguesa

    // Lógica de scroll
    const handleScroll = () => {
        const currentScroll = window.scrollY;

        // Mostrar/ocultar header al hacer scroll
        if (currentScroll > lastScrollTop && !isMenuActive) {
            header.style.transform = "translateY(-100%)"; // Ocultar al bajar
        } else if (!isMenuActive) {
            header.style.transform = "translateY(0)"; // Mostrar al subir
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        // Cambiar color del fondo según la posición
        if (!isMenuActive) {
            if (currentScroll > heroSection.offsetHeight - 50) {
                header.classList.add("scrolled"); // Fondo azul
            } else {
                header.classList.remove("scrolled"); // Fondo transparente
            }
        }
    };

    // Observador para la sección hero
    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            if (!entry.isIntersecting && !isMenuActive) {
                header.classList.add("scrolled"); // Fondo azul fuera del hero
            } else if (!isMenuActive) {
                header.classList.remove("scrolled"); // Fondo transparente en el hero
            }
        },
        { root: null, threshold: 0.1 }
    );
    observer.observe(heroSection);

    // Lógica del menú hamburguesa
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            isMenuActive = !isMenuActive; // Cambiar el estado del menú

            if (isMenuActive) {
                // Abrir el menú
                mobileMenu.style.display = "flex";
                setTimeout(() => {
                    mobileMenu.classList.add("active");
                }, 10);
                header.classList.add("menu-active"); // Forzar fondo azul
                header.style.transform = "translateY(0)"; // Mostrar header
            } else {
                // Cerrar el menú
                mobileMenu.classList.remove("active");
                setTimeout(() => {
                    mobileMenu.style.display = "none";
                }, 300);
                header.classList.remove("menu-active");
                handleScroll(); // Volver a aplicar la lógica de scroll
            }
        });

        // Cerrar el menú al hacer clic en un enlace
        const menuLinks = mobileMenu.querySelectorAll("a");
        menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                isMenuActive = false;
                mobileMenu.classList.remove("active");
                setTimeout(() => {
                    mobileMenu.style.display = "none";
                }, 300);
                header.classList.remove("menu-active");
                handleScroll(); // Actualizar el estado del header
            });
        });
    }

    // Agregar el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Lógica de internacionalización
    let currentLanguage = "es"; // Idioma predeterminado
    let translations = {};

    // Función para cargar las traducciones desde los archivos JSON
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`./i18n/${lang}.json`);
            translations = await response.json();
            updateText(); // Actualiza los textos en la página
        } catch (error) {
            console.error("Error al cargar las traducciones:", error);
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
    
    // Actualizar placeholders cuando se cambie el idioma
    function updateText() {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const keys = element.getAttribute("data-i18n").split(".");
            let text = translations;
            keys.forEach((key) => {
                text = text[key];
            });
            element.textContent = text || "";
        });
        updatePlaceholders(); // Llamar a la función de placeholders
    }

    // Función para cambiar de idioma
    function changeLanguage(lang) {
        currentLanguage = lang;
        loadTranslations(lang);
        highlightCurrentLanguage(lang); // Resalta el idioma seleccionado
    }

    // Resaltar el idioma seleccionado
    function highlightCurrentLanguage(lang) {
        document.querySelectorAll("[data-lang-switch]").forEach((button) => {
            button.classList.toggle("lang-active", button.getAttribute("data-lang-switch") === lang);
        });
    }

    // Inicializar i18n al cargar la página
    loadTranslations(currentLanguage);

    // Agregar eventos a los botones de cambio de idioma
    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
        button.addEventListener("click", (e) => {
            const lang = e.target.getAttribute("data-lang-switch");
            changeLanguage(lang);
        });
    });
});
