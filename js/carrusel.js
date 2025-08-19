const projectsContainer = document.querySelector('.projects-container');
const projects = document.querySelectorAll('.project');
let currentIndex = 0;
let isTransitioning = false;

const firstProjects = Array.from(projects).slice(0, 3);
firstProjects.forEach(project => {
    projectsContainer.appendChild(project.cloneNode(true));
});

const projectWidth = projects[0].offsetWidth + 50;

function moveCarousel() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex++;

    projectsContainer.style.transform = `translateX(${-currentIndex * projectWidth}px)`;

    projectsContainer.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex >= projects.length) {
            projectsContainer.style.transition = 'none';
            currentIndex = 0;
            projectsContainer.style.transform = `translateX(${-currentIndex * projectWidth}px)`;
                    
            setTimeout(() => {
                projectsContainer.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            }, 50);
        }
    }, { once: true });
}

    setInterval(moveCarousel, 3000);