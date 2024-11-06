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
