document.addEventListener('DOMContentLoaded', () => {
    // 0. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            const isActive = navLinks.classList.contains('mobile-active');

            // Toggle icon classes dynamically
            if (isActive) {
                mobileMenuBtn.classList.remove('ri-menu-3-line');
                mobileMenuBtn.classList.add('ri-close-line');
            } else {
                mobileMenuBtn.classList.remove('ri-close-line');
                mobileMenuBtn.classList.add('ri-menu-3-line');
            }
        });
    }

    // 1. Header Scroll Effect
    const header = document.querySelector('.modern-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 1.5 Hero Slideshow Logic
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;

    const goToSlide = (index) => {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    };

    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000); // 5s duration

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                goToSlide(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    // 2. Parallax Hero Effect
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if (heroBg) {
            heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
        }
    });

    // 3. Modern Reveal Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.slide-up-trigger, .zoom-in-trigger');
    animatedElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. AIS-Style Dynamic Counters
    const counterObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16);

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, counterObserverOptions);

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 5. Custom Cursor & Magnetic Buttons
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Follower interpolation
    setInterval(() => {
        posX += (mouseX - posX) / 6;
        posY += (mouseY - posY) / 6;
        if (follower) {
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
        }
    }, 16);

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
    });

    // Interactive elements trigger cursor expansion
    const links = document.querySelectorAll('a, .btn-primary, .btn-secondary');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        link.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.btn-primary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btn.style.transform = `translate(${(x - rect.width / 2) * 0.3}px, ${(y - rect.height / 2) * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 6. WhatsApp Contact Form Integration
    const contactForm = document.getElementById('wa-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('c-name').value.trim();
            const phone = document.getElementById('c-phone').value.trim();
            const email = document.getElementById('c-email').value.trim();
            const service = document.getElementById('c-service').value;
            const projectMsg = document.getElementById('c-message').value.trim();

            // Format message for WhatsApp
            let message = `Hello WinFab!%0A%0AI would like to start a project discussion.%0A*Name:* ${name}%0A*Contact:* ${phone}`;

            if (email) message += `%0A*Email:* ${email}`;
            message += `%0A*Service:* ${service}`;
            if (projectMsg) message += `%0A%0A*Project Details:*%0A${projectMsg}`;

            // Build the wa.me URL
            const whatsappUrl = `https://wa.me/919873555667?text=${message}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
        });
    }
    // 7. Responsive Navbar Estimate Button
    const estBtn = document.getElementById('estimate-btn');
    if (estBtn) {
        estBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.innerWidth > 1024) {
                // Desktop: smoothly scroll to contact form
                const contactSec = document.getElementById('contact');
                if (contactSec) {
                    contactSec.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Mobile: dialpad
                window.location.href = "tel:+919873555667";
            }
        });
    }
});
