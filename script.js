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

// Mostrar/ocultar el menú de navegación en móviles
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});

// Cerrar el menú al hacer clic en un enlace
const menuLinks = mobileMenu.querySelectorAll("a");
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
    });
});