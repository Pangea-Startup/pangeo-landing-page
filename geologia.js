// Lista de imágenes
let images = [
    'assets/geologia/1.png',
    'assets/geologia/2.jpg',
    'assets/geologia/3.png',
    'assets/geologia/4.jpg',
    'assets/geologia/5.png',
    'assets/geologia/6.jpg',
    'assets/geologia/7.jpg',
    'assets/geologia/8.png',
    'assets/geologia/9.png',
    'assets/geologia/10.jpg',
    'assets/geologia/11.jpg',
    'assets/geologia/12.png'
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
