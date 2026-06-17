// Loader
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').classList.add('done');
        document.querySelector('.hero').classList.add('loaded');
    }, 1400);
});

// Scroll reveal
(function() {
    var items = document.querySelectorAll('.sobre-layout, .disco-card, .tl-item, .contexto, .cierre, .video-sec, .galeria-head, .song, .songs-sec .sec-titulo, .songs-sec .sec-sub, .hit-card, .hits-sec .sec-titulo, .hits-sec .sec-sub, .spotify-sec .sec-titulo, .spotify-frame, .tributo, .tributos-sec .sec-titulo, .era-card, .eras-sec .sec-titulo, .wallpaper-sec .sec-titulo, .wp-builder, .velas-sec .sec-titulo, .velas-counter');

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

// Velas
(function() {
    var grid = document.getElementById('velas-grid');
    var numEl = document.getElementById('velas-num');
    var btn = document.getElementById('vela-btn');
    if (!grid || !btn) return;

    var count = parseInt(localStorage.getItem('ot_velas') || '0', 10);

    function crearVela() {
        var v = document.createElement('div');
        v.className = 'vela';
        v.innerHTML = '<div class="vela-glow"></div><div class="vela-llama"></div><div class="vela-body"></div>';
        grid.appendChild(v);
    }

    function render() {
        numEl.textContent = count;
        grid.innerHTML = '';
        var mostrar = Math.min(count, 200);
        for (var i = 0; i < mostrar; i++) crearVela();
    }

    render();

    btn.addEventListener('click', function() {
        count++;
        localStorage.setItem('ot_velas', count);
        numEl.textContent = count;
        crearVela();
        grid.scrollTop = grid.scrollHeight;
    });
})();

// Wallpaper generator
(function() {
    var canvas = document.getElementById('wp-canvas');
    var fraseEl = document.getElementById('wp-frase');
    var downloadBtn = document.getElementById('wp-download');
    var colorBtns = document.querySelectorAll('.wp-color');
    if (!canvas || !fraseEl) return;
    var ctx = canvas.getContext('2d');
    var W = 1080, H = 1920;

    var currentBg = '#080810';
    var currentText = '#eaeaea';

    // Set color button backgrounds
    colorBtns.forEach(function(b) {
        b.style.background = b.dataset.color;
    });

    function drawStripe(y) {
        var colors = ['#d6263b','#efe7d2','#2d3adf','#efe7d2'];
        var sw = 30;
        ctx.save();
        ctx.translate(W / 2, y);
        ctx.rotate(0);
        var totalW = 400;
        var startX = -totalW / 2;
        for (var i = 0; i < Math.ceil(totalW / sw); i++) {
            ctx.fillStyle = colors[i % colors.length];
            ctx.fillRect(startX + i * sw, -4, sw, 8);
        }
        ctx.restore();
    }

    function renderCanvas() {
        ctx.fillStyle = currentBg;
        ctx.fillRect(0, 0, W, H);

        // IN MEMORIAM
        ctx.fillStyle = currentText;
        ctx.globalAlpha = 0.4;
        ctx.font = '300 28px sans-serif';
        ctx.textAlign = 'center';
        ctx.letterSpacing = '8px';
        ctx.fillText('IN MEMORIAM', W / 2, 700);
        ctx.globalAlpha = 1;

        // Name
        ctx.font = '300 140px serif';
        ctx.fillStyle = currentText;
        ctx.fillText('Oliver', W / 2, 870);
        ctx.fillText('Tree', W / 2, 1020);

        // Stripe
        drawStripe(1070);

        // Years
        ctx.font = '200 36px sans-serif';
        ctx.globalAlpha = 0.8;
        ctx.fillText('1993  \u2014  2026', W / 2, 1140);
        ctx.globalAlpha = 1;

        // Quote
        var frase = fraseEl.value;
        ctx.font = 'italic 300 42px serif';
        ctx.globalAlpha = 0.7;
        ctx.fillText('"' + frase + '"', W / 2, 1260);
        ctx.globalAlpha = 1;

        // Subtle bottom credit
        ctx.font = '200 20px sans-serif';
        ctx.globalAlpha = 0.2;
        ctx.fillText('olivertree.online', W / 2, H - 60);
        ctx.globalAlpha = 1;
    }

    renderCanvas();

    fraseEl.addEventListener('change', renderCanvas);

    colorBtns.forEach(function(b) {
        b.addEventListener('click', function() {
            colorBtns.forEach(function(c) { c.classList.remove('active'); });
            b.classList.add('active');
            currentBg = b.dataset.color;
            currentText = b.dataset.text;
            renderCanvas();
        });
    });

    downloadBtn.addEventListener('click', function() {
        var link = document.createElement('a');
        link.download = 'oliver-tree-wallpaper.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
})();
