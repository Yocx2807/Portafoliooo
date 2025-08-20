document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const formMessage = document.getElementById('formMessage');

            if (name && email && message) {
                formMessage.textContent = `¡Gracias, ${name}! Tu mensaje ha sido enviado. Te responderé pronto.`;
                formMessage.style.color = '#76ff03'; 
            } else {
                formMessage.textContent = 'Por favor, completa todos los campos.';
                formMessage.style.color = '#ff5252';
            }
        });