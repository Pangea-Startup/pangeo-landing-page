// Lista de imágenes
let images = [
    'assets/geotecnia/1.png',
    'assets/geotecnia/2.png',
    'assets/geotecnia/3.png'
];
let currentIndex = 0;

function showImage(index) {
    const imageElement = document.getElementById('carouselImage');
    imageElement.style.opacity = 0;

    setTimeout(() => {
        imageElement.src = images[index];
        imageElement.style.opacity = 1;
    }, 500);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}
