// Lógica para el formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function(event) {
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

// Lógica para ocultar y mostrar la barra de navegación
let lastScrollPosition = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > lastScrollPosition) {
        navbar.classList.add("hidden-navbar");
    } else {
        navbar.classList.remove("hidden-navbar");
    }

    lastScrollPosition = currentScrollPosition;
});

