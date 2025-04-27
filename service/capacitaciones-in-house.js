document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const heroSection = document.querySelector(".hero-section-geofisica");
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
                mobileMenu.classList.remove("hidden");
                mobileMenu.classList.add("flex"); // <--- Asegúrate que el menú se muestre como "flex" o "block"
                header.classList.add("menu-active");
                header.style.transform = "translateY(0)";
                window.removeEventListener("scroll", handleScroll);
            } else {
                mobileMenu.classList.remove("flex");
                mobileMenu.classList.add("hidden");
                header.classList.remove("menu-active");
                window.addEventListener("scroll", handleScroll);
            }
        });

        const menuLinks = mobileMenu.querySelectorAll("a");
        menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                isMenuActive = false;
                mobileMenu.classList.remove("active");
                header.classList.remove("menu-active");
                setTimeout(() => {
                    if (!isMenuActive) mobileMenu.style.display = "none";
                }, 400);
                window.addEventListener("scroll", handleScroll);
            });
        });
    }

    window.addEventListener("scroll", handleScroll);
});

// Lista de imágenes para Capacitaciones In-House
let imagesCapacitaciones = [
    '../assets/capacitaciones in-house/1. Dictado de cursos y capacitaciones In House.jfif',
    '../assets/capacitaciones in-house/2. Explicación de la operatividad de equipos de geofísica.jpeg',
    '../assets/capacitaciones in-house/3. Explicación de la aplicación de equipos de geofísica.jpeg',
    '../assets/capacitaciones in-house/Portada Capacitaciones.jfif',
];

let currentIndexCapacitaciones = 0;
const imageElementCapacitaciones = document.getElementById('carouselImage');

// Mostrar la imagen inicial correctamente para Capacitaciones
function showImageCapacitaciones(index) {
    imageElementCapacitaciones.src = imagesCapacitaciones[index];
    imageElementCapacitaciones.style.transform = 'translateX(0)';
}

// Función para pasar a la siguiente imagen con efecto de cinta para Capacitaciones
function nextImageCapacitaciones() {
    imageElementCapacitaciones.style.transition = 'transform 0.8s ease-in-out';
    imageElementCapacitaciones.style.transform = 'translateX(-100%)';

    setTimeout(() => {
        currentIndexCapacitaciones = (currentIndexCapacitaciones + 1) % imagesCapacitaciones.length;
        imageElementCapacitaciones.src = imagesCapacitaciones[currentIndexCapacitaciones];
        imageElementCapacitaciones.style.transition = 'none';  // Elimina la transición para el reinicio
        imageElementCapacitaciones.style.transform = 'translateX(100%)'; // La nueva imagen inicia desde la derecha

        setTimeout(() => {
            imageElementCapacitaciones.style.transition = 'transform 0.8s ease-in-out';
            imageElementCapacitaciones.style.transform = 'translateX(0)'; // Imagen vuelve al centro suavemente
        }, 50);
    }, 750); // Ajusté el tiempo para que no desaparezca antes de tiempo
}

// Función para pasar a la imagen anterior para Capacitaciones
function prevImageCapacitaciones() {
    imageElementCapacitaciones.style.transition = 'transform 0.8s ease-in-out';
    imageElementCapacitaciones.style.transform = 'translateX(100%)';

    setTimeout(() => {
        currentIndexCapacitaciones = (currentIndexCapacitaciones - 1 + imagesCapacitaciones.length) % imagesCapacitaciones.length;
        imageElementCapacitaciones.src = imagesCapacitaciones[currentIndexCapacitaciones];
        imageElementCapacitaciones.style.transition = 'none'; // Elimina la transición para el reinicio
        imageElementCapacitaciones.style.transform = 'translateX(-100%)'; // La nueva imagen inicia desde la izquierda

        setTimeout(() => {
            imageElementCapacitaciones.style.transition = 'transform 0.8s ease-in-out';
            imageElementCapacitaciones.style.transform = 'translateX(0)'; // Imagen vuelve al centro suavemente
        }, 50);
    }, 750); // Ajusté el tiempo para que no desaparezca antes de tiempo
}

let intervalIdCapacitaciones; // Guardamos el intervalo global

function startAutoSlideCapacitaciones() {
    clearInterval(intervalIdCapacitaciones); // Detiene cualquier intervalo previo
    intervalIdCapacitaciones = setInterval(nextImageCapacitaciones, 8000); // Reinicia
}

// Ajustar botones para reiniciar temporizador
document.querySelector('.carousel-button.left-2').addEventListener('click', () => {
    prevImageCapacitaciones();
    startAutoSlideCapacitaciones(); // 🔄 Reinicia cuando el usuario interactúa
});

document.querySelector('.carousel-button.right-2').addEventListener('click', () => {
    nextImageCapacitaciones();
    startAutoSlideCapacitaciones(); // 🔄 Reinicia cuando el usuario interactúa
});
// Mostrar la imagen inicial al cargar la página para Capacitaciones
document.addEventListener('DOMContentLoaded', () => {
    showImageCapacitaciones(currentIndexCapacitaciones);
    startAutoSlideCapacitaciones(); // 🔄 Empieza automáticamente
});