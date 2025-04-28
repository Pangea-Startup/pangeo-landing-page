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
    '../assets/geofisica y sismologia/1 Ensayo de Refracción Sísmica.jpeg',
    '../assets/geofisica y sismologia/2. Refraccion sismica.jpg',
    '../assets/geofisica y sismologia/3. Sondaje MASW.jpg',
    '../assets/geofisica y sismologia/13 Procesamiento de ensayo MASW.png',
    '../assets/geofisica y sismologia/3.jpg',
    '../assets/geofisica y sismologia/5 Ensayo MASW.jpg',
    '../assets/geofisica y sismologia/9 Ensayo de Microtremores.jpg',
    '../assets/geofisica y sismologia/7. Multiple filter analysis (MFA).png',
    '../assets/geofisica y sismologia/11 espectro3D.png',
    '../assets/geofisica y sismologia/12 figure.png',
];

let currentIndex = 0;
const imageElement = document.getElementById('carouselImage');
let transitionInProgress = false;
let intervalId;
const TRANSITION_TIME = 800;

// Mostrar imagen directamente
function showImage(index) {
    imageElement.src = images[index];
    imageElement.style.transition = 'none';
    imageElement.style.transform = 'translateX(0)';
}

// Precargar imagen
function preloadImage(src, callback) {
    const img = new Image();
    img.onload = callback;
    img.src = src;
}

function changeImage(direction) {
    if (transitionInProgress) return;
    transitionInProgress = true;

    const offsetOut = direction === 'next' ? '-100%' : '100%';
    const offsetIn = direction === 'next' ? '100%' : '-100%';

    // Transición de salida
    imageElement.style.transition = `transform ${TRANSITION_TIME}ms ease-in-out`;
    imageElement.style.transform = `translateX(${offsetOut})`;

    setTimeout(() => {
        // Cálculo del siguiente índice
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }

        // Precarga la imagen
        preloadImage(images[currentIndex], () => {
            // Reset sin transición
            imageElement.style.transition = 'none';
            imageElement.style.transform = `translateX(${offsetIn})`;
            imageElement.src = images[currentIndex];

            // Forzar reflujo y aplicar entrada
            void imageElement.offsetWidth;

            imageElement.style.transition = `transform ${TRANSITION_TIME}ms ease-in-out`;
            imageElement.style.transform = 'translateX(0)';

            setTimeout(() => {
                transitionInProgress = false;
            }, TRANSITION_TIME);
        });
    }, TRANSITION_TIME);
}

// Auto-slide
function startAutoSlide() {
    clearInterval(intervalId);
    intervalId = setInterval(() => changeImage('next'), 8000);
}

// Botones
document.querySelector('.carousel-button.left-2').addEventListener('click', () => {
    changeImage('prev');
    startAutoSlide();
});

document.querySelector('.carousel-button.right-2').addEventListener('click', () => {
    changeImage('next');
    startAutoSlide();
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    showImage(currentIndex);
    startAutoSlide();
});