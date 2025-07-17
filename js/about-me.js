document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about-me-content > div');
    
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden-fade'); 
        observer.observe(section);
    });
});

    const aboutMeParagraphs = document.querySelectorAll('#sobre-mi .about-me-content > div'); 
    const aboutMeVisual = document.querySelector('#sobre-mi .about-me-visual');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2
    };

    const aboutMeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-scroll'); 
            }else {
                entry.target.classList.remove('visible-scroll');
            }
        });
    }, observerOptions);

    aboutMeParagraphs.forEach(el => {
        el.classList.add('hidden-scroll');
        aboutMeObserver.observe(el);
    });

    if (aboutMeVisual) { 
        aboutMeVisual.classList.add('hidden-scroll');
        aboutMeObserver.observe(aboutMeVisual);
    }

    const profilePic = document.querySelector('.profile-pic');
    const socialBubble = document.createElement('div'); 
    socialBubble.className = 'social-bubble';
    socialBubble.innerHTML = `
        <a href="https://linkedin.com/in/yocxanychaves" target="_blank" aria-label="LinkedIn">
            <img src="/img/logos/linkedin-icon-2.svg" alt="LinkedIn">
        </a>
        <a href="https://github.com/tu-usuario" target="_blank" aria-label="GitHub">
            <img src="/img/logos/github-icon-1.svg" alt="GitHub">
        </a>
        <a href="https://github.com/tu-usuario" target="_blank" aria-label="Facebook">
            <img src="/img/logos/facebook-3-2.svg" alt="GitHub">
        </a>
        <a href="https://github.com/tu-usuario" target="_blank" aria-label="Instagram">
            <img src="/img/logos/instagram-2016-5.svg" alt="GitHub">
        </a>
        <a href="https://github.com/tu-usuario" target="_blank" aria-label="GitHub">
            <img src="/img/logos/x-2.svg" alt="Twiter(X)">
        </a>
        <a href="https://github.com/tu-usuario" target="_blank" aria-label="GitHub">
            <img src="/img/logos/discord-6.svg" alt="Discord">
        </a>
        <button class="social-bubble-close">X</button>
    `;

    if (profilePic) {
        profilePic.addEventListener('click', (event) => {
            event.stopPropagation();
            if (socialBubble.classList.contains('show')) {
                socialBubble.classList.remove('show');
            } else {
                document.body.appendChild(socialBubble); 
                socialBubble.classList.add('show');
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (socialBubble.classList.contains('show') && !socialBubble.contains(event.target) && event.target !== profilePic) {
            socialBubble.classList.remove('show');
            socialBubble.remove(); // Remueve del DOM cuando se cierra
        }
    });

    socialBubble.addEventListener('click', (event) => {
        if (event.target.classList.contains('social-bubble-close')) {
            socialBubble.classList.remove('show');
            socialBubble.remove();
        }
    });


