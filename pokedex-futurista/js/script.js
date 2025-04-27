// Particle Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < (window.innerWidth < 600 ? 50 : 100); i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 204, 255, 0.5)';
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Typing Effect
const h1 = document.querySelector('h1.typing');
const text = h1.textContent;
h1.textContent = '';
let i = 0;
function type() {
    if (i < text.length) {
        h1.textContent += text[i];
        i++;
        setTimeout(type, 100);
    } else {
        h1.classList.remove('typing');
    }
}
setTimeout(type, 500);

// Carousel
const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.carousel .card');
const totalCards = cards.length;
const radius = window.innerWidth < 600 ? 180 : 250; // Reducido para mantener tarjetas visibles
let angleOffset = 0;

function updateCarousel() {
    angleOffset += 0.5;
    cards.forEach((card, index) => {
        const angle = (index / totalCards) * 360 + angleOffset;
        const rad = angle * Math.PI / 180;
        const x = Math.cos(rad) * radius;
        const z = Math.sin(rad) * radius;
        // Reducir el ángulo de rotación para mantener tarjetas frontales
        card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-(angle % 360) / 2}deg)`;
        const distance = Math.abs(z);
        const scale = 1 - distance / (radius * 2);
        const opacity = 1 - distance / (radius * 1.5);
        card.style.transform += ` scale(${Math.max(scale, 0.8)})`;
        card.style.opacity = Math.max(opacity, 0.8); // Aumentado para mejor visibilidad
        card.style.zIndex = Math.round(100 - distance);
    });
    requestAnimationFrame(updateCarousel);
}
updateCarousel();

// Image Error Handling
cards.forEach(card => {
    const img = card.querySelector('img');
    img.onerror = () => {
        console.warn(`Error al cargar la imagen: ${img.src}`);
        img.src = 'assets/placeholder.png';
    };
});

// Card Flip and Audio
let audioEnabled = true;
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
const pokemonCries = {
    venusaur: new Audio('https://pokemoncries.com/cries/3.mp3'),
    charizard: new Audio('https://pokemoncries.com/cries/6.mp3'),
    blastoise: new Audio('https://pokemoncries.com/cries/9.mp3'),
    pidgeot: new Audio('https://pokemoncries.com/cries/18.mp3'),
    alakazam: new Audio('https://pokemoncries.com/cries/65.mp3'),
    machamp: new Audio('https://pokemoncries.com/cries/68.mp3'),
    golem: new Audio('https://pokemoncries.com/cries/76.mp3'),
    gengar: new Audio('https://pokemoncries.com/cries/94.mp3'),
    dragonite: new Audio('https://pokemoncries.com/cries/149.mp3'),
    mew: new Audio('https://pokemoncries.com/cries/151.mp3')
};

// Manejo de errores para sonidos
Object.values(pokemonCries).forEach(cry => {
    cry.onerror = () => {
        console.warn('Error al cargar el sonido del Pokémon');
    };
});

function flipCard(card, pokemon) {
    card.classList.toggle('flipped');
    if (audioEnabled) {
        clickSound.play().catch(err => console.warn('Error al reproducir el sonido de clic:', err));
        if (pokemonCries[pokemon]) {
            pokemonCries[pokemon].play().catch(err => console.warn(`Error al reproducir el grito de ${pokemon}:`, err));
        }
    }
}

function toggleAudio() {
    audioEnabled = !audioEnabled;
    document.getElementById('audio-toggle').textContent = audioEnabled ? '🔊' : '🔇';
}

// Resize Handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});