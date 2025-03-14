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

    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (!entry.isIntersecting && !isMenuActive) {
                header.classList.add("scrolled");
            } else if (!isMenuActive) {
                header.classList.remove("scrolled");
            }
        }, { root: null, threshold: 0.1 });
    
        observer.observe(heroSection);
    }

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

    // Animación para las imágenes de servicios
    const serviceImages = document.querySelectorAll(".service-image-wrapper");

    // Detectar cuando las imágenes entren en el viewport
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Se agrega la clase para activar la animación
            }
        });
    }, { threshold: 0.2 }); // El 20% de visibilidad activa la animación

    serviceImages.forEach(image => serviceObserver.observe(image));



    let currentLanguage = "es";
    let translations = {};

    async function loadTranslations(lang) {
        try {
            // Detectar si estamos en una subcarpeta
            const isSubfolder = window.location.pathname.includes("service");
    
            // Ajustar la ruta de los archivos JSON de traducción
            const jsonPath = isSubfolder ? "../i18n/" : "./i18n/";
    
            const response = await fetch(`${jsonPath}${lang}.json`);
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


    const images = document.querySelectorAll(".slider-image");
    const prevBtn = document.querySelector(".slider-prev");
    const nextBtn = document.querySelector(".slider-next");
    const sliderContainer = document.querySelector(".slider-container");

    let currentIndex = 0;

    // Mostrar la imagen actual
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove("active");
            if (i === index) {
                img.classList.add("active");
            }
        });

        adjustSliderSize();
    }

    // Ir a la imagen anterior
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    // Ir a la siguiente imagen
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    // Inicializar mostrando la primera imagen
    showImage(currentIndex);


    function adjustImageClasses() {
        document.querySelectorAll(".slider-image").forEach(img => {
            img.classList.remove("wide", "tall"); // Elimina clases anteriores
            if (img.naturalWidth > img.naturalHeight) {
                img.classList.add("wide"); // Imágenes más anchas que altas
            } else {
                img.classList.add("tall"); // Imágenes más altas que anchas
            }
        });
    }
    
    // Función para ajustar el tamaño del contenedor basado en la imagen activa
    function adjustSliderSize() {
        const activeImage = document.querySelector(".slider-image.active");

        if (activeImage) {
            sliderContainer.style.width = `${activeImage.clientWidth}px`;
            sliderContainer.style.height = `${activeImage.clientHeight}px`;
        }
    }
    
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    // Ajustar el tamaño cuando la página carga
    window.addEventListener("load", () => {
        showImage(currentIndex);
    });

    // Ajustar tamaño cuando la página carga
    window.addEventListener("load", adjustSliderSize);

    // Espera a que las imágenes se carguen y ajusta
    window.addEventListener("load", adjustImageClasses);
    

    const isSubfolder = window.location.pathname.includes("service");

    document.querySelectorAll("nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
            link.setAttribute("href", isSubfolder ? `../index.html${href}` : `.${href}`);
        }
    });
});
