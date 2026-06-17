// Fade in sections on scroll
(function() {
    var sections = document.querySelectorAll('.intro, .sobre, .galeria, .discografia, .timeline, .video-sec, .mensaje');

    sections.forEach(function(sec) {
        sec.classList.add('fade-in');
    });

    function checkScroll() {
        var triggerBottom = window.innerHeight * 0.88;

        sections.forEach(function(sec) {
            var top = sec.getBoundingClientRect().top;
            if (top < triggerBottom) {
                sec.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
})();
