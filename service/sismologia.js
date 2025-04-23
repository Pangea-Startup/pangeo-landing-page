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
                mobileMenu.style.display = "flex";
                setTimeout(() => {
                    mobileMenu.classList.add("active"); 
                }, 10);
                header.classList.add("menu-active");
                header.style.transform = "translateY(0)";
                window.removeEventListener("scroll", handleScroll);
            } else {
                mobileMenu.classList.remove("active");
                header.classList.remove("menu-active");
                setTimeout(() => {
                    if (!isMenuActive) mobileMenu.style.display = "none";
                }, 400); // Se espera que termine la animación antes de ocultar
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



// Lista de imágenes para Geofísica y Sismología
let images = [
    '../assets/sismologia/Análisis de Ajuste Espectral.png',
    '../assets/sismologia/Análisis de Respuesta de Sitio.png',
    '../assets/sismologia/sismologia-ima.png',
];

let currentIndex = 0;
const imageElement = document.getElementById('carouselImage');

// Mostrar la imagen inicial correctamente
function showImage(index) {
    imageElement.src = images[index];
    imageElement.style.transform = 'translateX(0)';
}

// Función para pasar a la siguiente imagen con efecto de cinta
function nextImage() {
    imageElement.style.transition = 'transform 0.8s ease-in-out';
    imageElement.style.transform = 'translateX(-100%)';

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex];
        imageElement.style.transition = 'none';  // Elimina la transición para el reinicio
        imageElement.style.transform = 'translateX(100%)'; // La nueva imagen inicia desde la derecha

        setTimeout(() => {
            imageElement.style.transition = 'transform 0.8s ease-in-out';
            imageElement.style.transform = 'translateX(0)'; // Imagen vuelve al centro suavemente
        }, 50);
    }, 750); // Ajusté el tiempo para que no desaparezca antes de tiempo
}

// Función para pasar a la imagen anterior
function prevImage() {
    imageElement.style.transition = 'transform 0.8s ease-in-out';
    imageElement.style.transform = 'translateX(100%)';

    setTimeout(() => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        imageElement.src = images[currentIndex];
        imageElement.style.transition = 'none'; // Elimina la transición para el reinicio
        imageElement.style.transform = 'translateX(-100%)'; // La nueva imagen inicia desde la izquierda

        setTimeout(() => {
            imageElement.style.transition = 'transform 0.8s ease-in-out';
            imageElement.style.transform = 'translateX(0)'; // Imagen vuelve al centro suavemente
        }, 50);
    }, 750); // Ajusté el tiempo para que no desaparezca antes de tiempo
}

// Cambio automático cada 5 segundos
setInterval(nextImage, 5000);

// Mostrar la imagen inicial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showImage(currentIndex);
});

// Eventos para botones de navegación
document.querySelector('.carousel-button.left-2').addEventListener('click', prevImage);
document.querySelector('.carousel-button.right-2').addEventListener('click', nextImage);
