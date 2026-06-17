// === Scroll Animations ===
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// === Quotes Carousel ===
const quotes = document.querySelectorAll('.quote-card');
const dotsContainer = document.querySelector('.quote-dots');
let currentQuote = 0;
let quoteInterval;

// Create dots
quotes.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToQuote(i));
    dotsContainer.appendChild(dot);
});

function goToQuote(index) {
    quotes[currentQuote].classList.remove('active');
    document.querySelectorAll('.quote-dots .dot')[currentQuote].classList.remove('active');
    currentQuote = index;
    quotes[currentQuote].classList.add('active');
    document.querySelectorAll('.quote-dots .dot')[currentQuote].classList.add('active');
}

function nextQuote() {
    const next = (currentQuote + 1) % quotes.length;
    goToQuote(next);
}

// Auto-advance quotes
quoteInterval = setInterval(nextQuote, 4000);

// Pause on hover
const carousel = document.querySelector('.quotes-carousel');
carousel.addEventListener('mouseenter', () => clearInterval(quoteInterval));
carousel.addEventListener('mouseleave', () => {
    quoteInterval = setInterval(nextQuote, 4000);
});

// === Konami Code Easter Egg ===
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }

    // Close easter egg with Escape
    if (e.key === 'Escape') {
        document.getElementById('easter-egg-overlay').classList.add('hidden');
    }
});

function activateEasterEgg() {
    const overlay = document.getElementById('easter-egg-overlay');
    overlay.classList.remove('hidden');
    
    // Add scooter rain
    createScooterRain();
}

function createScooterRain() {
    const overlay = document.getElementById('easter-egg-overlay');
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const scooter = document.createElement('div');
            scooter.textContent = '🛴';
            scooter.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 2 + 1}rem;
                left: ${Math.random() * 100}%;
                top: -50px;
                animation: scooterFall ${Math.random() * 3 + 2}s linear forwards;
                pointer-events: none;
            `;
            overlay.appendChild(scooter);
            
            setTimeout(() => scooter.remove(), 5000);
        }, i * 200);
    }
}

// Add scooter fall animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes scooterFall {
        to {
            top: 110vh;
            transform: rotate(${Math.random() * 720}deg);
        }
    }
`;
document.head.appendChild(style);

// === Secret click Easter Egg on Hero Title ===
let clickCount = 0;
const heroTitle = document.querySelector('.hero-title');

if (heroTitle) {
    heroTitle.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 5) {
            heroTitle.style.animation = 'none';
            heroTitle.style.background = `linear-gradient(${Math.random() * 360}deg, 
                var(--neon-pink), var(--neon-blue), var(--neon-green), var(--neon-yellow))`;
            heroTitle.style.webkitBackgroundClip = 'text';
            heroTitle.style.webkitTextFillColor = 'transparent';
            heroTitle.style.backgroundClip = 'text';
            
            setTimeout(() => {
                heroTitle.style.animation = '';
                heroTitle.style.background = '';
                heroTitle.style.webkitBackgroundClip = '';
                heroTitle.style.webkitTextFillColor = '';
                heroTitle.style.backgroundClip = '';
                clickCount = 0;
            }, 3000);
        }
    });
}

// === Smooth scroll for scroll indicator ===
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const bioSection = document.getElementById('bio');
        if (bioSection) {
            bioSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// === Album cards hover sound effect (visual feedback) ===
const albumCards = document.querySelectorAll('.album-card');
albumCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'rgba(131, 56, 236, 0.3)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'rgba(255, 255, 255, 0.05)';
    });
});

// === Parallax effect on hero ===
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// === Console Easter Egg ===
console.log('%c🛴 Oliver Tree Forever 🛴', 
    'font-size: 24px; color: #ff006e; font-weight: bold; text-shadow: 2px 2px #8338ec;');
console.log('%cHint: Try the Konami Code (↑↑↓↓←→←→BA)', 
    'font-size: 12px; color: #6c6c8a;');
