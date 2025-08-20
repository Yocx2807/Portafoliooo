let scene, camera, renderer, textMesh, controls;

let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};
let isClick = true;

const myEmail = 'yoc2811@gmail.com';
const copyMessage = document.getElementById('copy-message');

init();
animate();

function init() {
    const container = document.getElementById('canvas-texto-3d');

    if (!container) {
        console.error('Error: No se encontró el elemento con ID "canvas-texto-3d". Las letras 3D no se renderizarán.');
        return;
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.z = 180;

    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffcc66, 1.5);
    pointLight1.position.set(50, 100, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x66ccff, 1.0);
    pointLight2.position.set(-50, -50, 100);
    scene.add(pointLight2);

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/gentilis_bold.typeface.json', function(font) {
        const geometry = new THREE.TextGeometry('Yocxany Ch', {
            font: font,
            size: 18,
            height: 5,
            curveSegments: 15,
            bevelEnabled: true,
            bevelThickness: 0.7,
            bevelSize: 0.4,
            bevelSegments: 4
        });
        geometry.center();

        const material = new THREE.MeshStandardMaterial({
            color: 0xfa4fee,
            metalness: 1.0,
            roughness: 0.4,
            emissive: 0xd1d1d1,
            emissiveIntensity: 0.3
        });

        textMesh = new THREE.Mesh(geometry, material);
        scene.add(textMesh);

        if (controls) controls.target.copy(textMesh.position);
    });

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparente

    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('mouseout', onMouseUp);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const container = document.getElementById('canvas-texto-3d');
    if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (textMesh) {
        textMesh.rotation.y += 0.007;
    }

    if (controls) {
        controls.update();
    }

    renderer.render(scene, camera);
}

function onMouseDown(event) {
    isClick = true;
    if (event.button === 0) {
        const mouse = new THREE.Vector2();
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects([textMesh]);

        if (intersects.length > 0) {
            isDragging = true;
            previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            if (controls) controls.enabled = false;
        } else {
            if (controls) controls.enabled = true;
        }
    }
}

function onMouseUp(event) {
    isDragging = false;
    if (controls) controls.enabled = true;
}

function onMouseMove(event) {
    if (!isDragging || !textMesh) return;

    isClick = false;
    
    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    const rotationSpeed = 0.05;

    textMesh.rotation.y += deltaMove.x * rotationSpeed;
    textMesh.rotation.x += deltaMove.y * rotationSpeed;

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseClick(event) {
    if (!isClick) return;

    const mouse = new THREE.Vector2();
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([textMesh]);

    if (intersects.length > 0) {
        navigator.clipboard.writeText(myEmail)
            .then(() => {
                if (copyMessage) {
                    copyMessage.style.opacity = '1';
                    setTimeout(() => {
                        copyMessage.style.opacity = '0';
                    }, 2000);
                }
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
            });
    }
}