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

    // Lógica del menú hamburguesa
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
        // Mostrar/ocultar el menú móvil
        menuToggle.addEventListener("click", () => {
            if (mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.remove("hidden");
                mobileMenu.classList.add("block");
            } else {
                mobileMenu.classList.remove("block");
                mobileMenu.classList.add("hidden");
            }
        });

        // Cerrar el menú al hacer clic en un enlace
        const menuLinks = mobileMenu.querySelectorAll("a");
        menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("block");
                mobileMenu.classList.add("hidden");
            });
        });
    }

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

    // Función para actualizar los textos en el HTML
    function updateText() {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const keys = element.getAttribute("data-i18n").split(".");
            let text = translations;
            keys.forEach((key) => {
                text = text[key]; // Navega por las claves del JSON
            });
            element.textContent = text || "Traducción no encontrada"; // Maneja textos no encontrados
        });
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
            if (button.getAttribute("data-lang-switch") === lang) {
                button.classList.add("lang-active");
            } else {
                button.classList.remove("lang-active");
            }
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
