// Lista de imágenes
let images = [
    'assets/geotecnia/1.png',
    'assets/geotecnia/2.png',
    'assets/geotecnia/3.png',
    'assets/geotecnia/4.png',
    'assets/geotecnia/5.png',
    'assets/geotecnia/6.png',
    'assets/geotecnia/7.jpg',
    'assets/geotecnia/8.jpg',
    'assets/geotecnia/9.png',
    'assets/geotecnia/10.jpg',
    'assets/geotecnia/11.png'
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
