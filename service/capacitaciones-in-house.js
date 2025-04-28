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
let transitionInProgressCapacitaciones = false;
let intervalIdCapacitaciones;
const TRANSITION_TIME_CAPACITACIONES = 800;

// Mostrar imagen directamente
function showImageCapacitaciones(index) {
    imageElementCapacitaciones.src = imagesCapacitaciones[index];
    imageElementCapacitaciones.style.transition = 'none';
    imageElementCapacitaciones.style.transform = 'translateX(0)';
}

// Precargar imagen
function preloadImageCapacitaciones(src, callback) {
    const img = new Image();
    img.onload = callback;
    img.src = src;
}

function changeImageCapacitaciones(direction) {
    if (transitionInProgressCapacitaciones) return;
    transitionInProgressCapacitaciones = true;

    const offsetOut = direction === 'next' ? '-100%' : '100%';
    const offsetIn = direction === 'next' ? '100%' : '-100%';

    // Transición de salida
    imageElementCapacitaciones.style.transition = `transform ${TRANSITION_TIME_CAPACITACIONES}ms ease-in-out`;
    imageElementCapacitaciones.style.transform = `translateX(${offsetOut})`;

    setTimeout(() => {
        if (direction === 'next') {
            currentIndexCapacitaciones = (currentIndexCapacitaciones + 1) % imagesCapacitaciones.length;
        } else {
            currentIndexCapacitaciones = (currentIndexCapacitaciones - 1 + imagesCapacitaciones.length) % imagesCapacitaciones.length;
        }

        // Precargar imagen
        preloadImageCapacitaciones(imagesCapacitaciones[currentIndexCapacitaciones], () => {
            imageElementCapacitaciones.style.transition = 'none';
            imageElementCapacitaciones.style.transform = `translateX(${offsetIn})`;
            imageElementCapacitaciones.src = imagesCapacitaciones[currentIndexCapacitaciones];

            void imageElementCapacitaciones.offsetWidth;

            imageElementCapacitaciones.style.transition = `transform ${TRANSITION_TIME_CAPACITACIONES}ms ease-in-out`;
            imageElementCapacitaciones.style.transform = 'translateX(0)';

            setTimeout(() => {
                transitionInProgressCapacitaciones = false;
            }, TRANSITION_TIME_CAPACITACIONES);
        });
    }, TRANSITION_TIME_CAPACITACIONES);
}

// Auto-slide
function startAutoSlideCapacitaciones() {
    clearInterval(intervalIdCapacitaciones);
    intervalIdCapacitaciones = setInterval(() => changeImageCapacitaciones('next'), 8000);
}

// Botones con reinicio de temporizador
document.querySelector('.carousel-button.left-2').addEventListener('click', () => {
    changeImageCapacitaciones('prev');
    startAutoSlideCapacitaciones();
});

document.querySelector('.carousel-button.right-2').addEventListener('click', () => {
    changeImageCapacitaciones('next');
    startAutoSlideCapacitaciones();
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    showImageCapacitaciones(currentIndexCapacitaciones);
    startAutoSlideCapacitaciones();
});