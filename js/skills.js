document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    const infoBubble = document.getElementById('info-bubble');
    const bubbleTitle = document.getElementById('bubble-title');
    const bubbleDescription = document.getElementById('bubble-description');
    const bubbleCloseBtn = document.getElementById('bubble-close');

    // Datos de ejemplo para la burbuja (¡personaliza esto!)
    const skillData = {
        'csharp': {
            title: 'C# (C Sharp)',
            description: 'Dominio en el desarrollo de aplicaciones robustas con C#, especialmente en entornos .NET para desarrollo de escritorio, web (ASP.NET Core) y servicios backend.'
        },
        'cpp': {
            title: 'C++',
            description: 'Conocimientos sólidos en programación de sistemas, algoritmos de alto rendimiento y desarrollo de software de bajo nivel con C++.'
        },
        'dotnet': {
            title: '.NET Framework / .NET Core',
            description: 'Experiencia en el ecosistema .NET para construir aplicaciones escalables y eficientes, incluyendo APIs RESTful y soluciones empresariales.'
        },
        'htmlcss': {
            title: 'HTML & CSS',
            description: 'Habilidades en la creación de estructuras web semánticas con HTML y diseño responsivo y estético con CSS moderno, incluyendo Flexbox y Grid.'
        },
        'javascript': {
            title: 'JavaScript',
            description: 'Amplia experiencia en desarrollo frontend interactivo con JavaScript, manipulación del DOM, y frameworks/librerías (como Three.js en este portafolio).'
        },
        // Añade aquí más objetos para cada data-lang que tengas
        // 'python': {
        //     title: 'Python',
        //     description: 'Dominio en scripting, automatización, análisis de datos y desarrollo web con Python.'
        // },
    };

    // --- Manejo del clic para mostrar la burbuja ---
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            const lang = item.dataset.lang; // Obtiene el valor del atributo data-lang
            const data = skillData[lang];

            if (data) {
                bubbleTitle.textContent = data.title;
                bubbleDescription.textContent = data.description;
                infoBubble.classList.add('show'); // Muestra la burbuja
            }
        });
    });

    // --- Manejo del clic para cerrar la burbuja ---
    bubbleCloseBtn.addEventListener('click', () => {
        infoBubble.classList.remove('show'); // Oculta la burbuja
    });

    // --- Cierra la burbuja al hacer clic fuera de ella (opcional) ---
    // document.addEventListener('click', (event) => {
    //     if (infoBubble.classList.contains('show') && !infoBubble.contains(event.target) && !event.target.closest('.skill-item')) {
    //         infoBubble.classList.remove('show');
    //     }
    // });
});