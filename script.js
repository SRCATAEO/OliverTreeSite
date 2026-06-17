// Loader
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').classList.add('done');
        document.querySelector('.hero').classList.add('loaded');
    }, 1400);
});

// Scroll reveal
(function() {
    var items = document.querySelectorAll('.sobre-layout, .disco-card, .tl-item, .contexto, .cierre, .video-sec, .galeria-head, .song, .songs-sec .sec-titulo, .songs-sec .sec-sub, .hit-card, .hits-sec .sec-titulo, .hits-sec .sec-sub, .spotify-sec .sec-titulo, .spotify-frame, .tributo, .tributos-sec .sec-titulo');

    items.forEach(function(el) {
        el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    items.forEach(function(el) {
        observer.observe(el);
    });
})();

// Parallax sutil en hero
(function() {
    var heroContent = document.querySelector('.hero-content');
    var heroImg = document.querySelector('.hero-img');
    var ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                var scrolled = window.pageYOffset;
                var vh = window.innerHeight;

                if (scrolled < vh) {
                    var progress = scrolled / vh;
                    heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
                    heroContent.style.opacity = 1 - progress * 1.2;
                    heroImg.style.transform = 'scale(' + (1 + progress * 0.05) + ')';
                }

                ticking = false;
            });
            ticking = true;
        }
    });
})();

// Contador de días desde su partida
(function() {
    var el = document.getElementById('contador');
    if (!el) return;
    var partida = new Date(2026, 5, 14, 8, 59, 0); // 14 junio 2026
    function actualizar() {
        var ahora = new Date();
        var diff = ahora - partida;
        if (diff < 0) { el.textContent = ''; return; }
        var dias = Math.floor(diff / 86400000);
        el.textContent = 'Hace ' + dias + (dias === 1 ? ' día' : ' días') + ' que Oliver nos dejó';
    }
    actualizar();
    setInterval(actualizar, 60000);
})();

// Stagger timeline items
(function() {
    var tlItems = document.querySelectorAll('.tl-item');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var delay = Array.from(tlItems).indexOf(entry.target) * 100;
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    tlItems.forEach(function(item) {
        observer.observe(item);
    });
})();
