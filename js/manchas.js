const canvas = document.getElementById('manchas');
const ctx = canvas .getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function r(min, max) 
{
    return Math.random() * (max - min) + min;
}

//Funcion para generar manchas
function generarFormaMancha(scale = 1) 
{
    const path = new Path2D();

    const puntos = 160; // Más puntos = más suavidad
    const angPaso = (Math.PI * 2) / puntos;

    const deformacion = 0.35; // 0 = círculo perfecto, 0.2 = mancha orgánica
    const radioBase = 40 * scale;

    const frecuencia = r(3, 4);          // cuántas "ondas" alrededor
    const fase = r(0, Math.PI * 2);      // fase constante en toda la mancha

    for (let i = 0; i <= puntos; i++) {
        const ang = i * angPaso;
        const variacion = 1 + Math.sin(ang * frecuencia + fase) * deformacion;
        const r = radioBase * variacion;

        const x = Math.cos(ang) * r;
        const y = Math.sin(ang) * r;

        if (i === 0) {
            path.moveTo(x, y);
        } else {
            path.lineTo(x, y);
        }
    }

    path.closePath();
    return path;
}




//Funcion para dibujar manchas con propiedades unicas
let manchas = [];

for(let i = 0; i < 25; i++)
{
    const baseScale = r(0.8, 2);
    const radio = baseScale * 15;

    manchas.push
    ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseScale: baseScale,
        scaleOffset: Math.random() * Math.PI * 2,
        velX: (Math.random() - 0.5) * 0.2, 
        velY: (Math.random() - 0.5) * 0.2,
        angle: Math.random() * Math.PI * 2,
        velAngle: (Math.random() - 0.5) * 0.02,
        forma: generarFormaMancha(1),
        radio
    });
}


// Dibuja una mancha individual
function dibujarManchas(m, escalaAnimada)
{
    ctx.save();
    ctx.translate(m.x, m.y);
    ctx.rotate(m.angle);
    ctx.scale(escalaAnimada, escalaAnimada);
    ctx.fillStyle = 'rgba(93, 64, 55, 1)';
    ctx.fill(m.forma);
    ctx.restore();
}

let tiempo = 0;

function animar()
{
    tiempo += 0.03;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < manchas.length; i++)
    {
        let m = manchas[i];

        //movimiento en linea recta
        m.x += m.velX;
        m.y += m.velY;

        //actualizar angulo con velocidad angular
        m.angle += m.velAngle;

        //rebotes con los bordes
        if(m.x < m.radio || m.x > canvas.width - m.radio) m.velX *= -1;
        if(m.y < m.radio || m.y > canvas.height - m.radio) m.velY *= -1;
            
        //latido en escala
        const escala = m.baseScale + Math.sin(tiempo + m.scaleOffset) * 0.2;
            
        //dibujar manchas
        dibujarManchas(m, escala);
    }

    requestAnimationFrame(animar);

}

animar();

window.addEventListener('resize', () =>
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});