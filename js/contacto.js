emailjs.init("CWSQWgnSo2hEyu8rG");

const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageInput = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');

    if (name && email && messageInput) {

        emailjs.sendForm(
            "service_pcpve5a",
            "template_qxp5bn1",
            form
        )
        .then(() => {

            formMessage.textContent =
            `¡Gracias, ${name}! Tu mensaje ha sido enviado.`;

            formMessage.style.color = '#76ff03';

            form.reset();

        })
        .catch((error) => {

            formMessage.textContent =
            'Error al enviar el mensaje ❌';

            formMessage.style.color = '#ff5252';

            console.log(error);

        });

    } else {

        formMessage.textContent =
        'Por favor, completa todos los campos.';

        formMessage.style.color = '#ff5252';

    }

});