document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const toggleBtn = document.getElementById('mobile-toggle');
    const body = document.body;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('mobile-nav-active');

            // Toggle icon
            const icon = toggleBtn.querySelector('i');
            if (body.classList.contains('mobile-nav-active')) {
                icon.classList.remove('ri-menu-3-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-3-line');
            }
        });
    }

    // Scroll Animation Observer for .fade-up and .fade-in
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'in-view' class which triggers the CSS transition
                entry.target.classList.add('in-view');
                // Optional: Stop observing once the animation has triggered (if you only want it once)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all animate-able elements
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');

    // Initial delay so the hero items animate gracefully on load, while scrolling triggers the rest
    setTimeout(() => {
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }, 100);
});
