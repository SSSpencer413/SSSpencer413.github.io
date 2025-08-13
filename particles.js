// Particle Animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const colors = ['var(--accent)', 'var(--accent-dark)', '#66ff99'];

class Particle {
    constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 120; i++) {
    particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
}

function connectParticles() {
    let opacity = 0.2;
    for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
        ctx.strokeStyle = `rgba(0,255,127,${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
        }
    }
    }
}

window.addEventListener('resize', function () {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    init();
});

init();
animate();