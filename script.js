document.addEventListener('DOMContentLoaded', function () {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    /* HAMBURGER MENU */
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    /* CLOSE MENU ON CLICK */
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* SCROLL EFFECT */
    window.addEventListener('scroll', function () {

        // Navbar style change (FIXED)
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        /* ACTIVE NAV LINK */
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');

            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* INTERSECTION OBSERVER (KEEPED SAME DESIGN) */
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';

                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    /* SKILL BAR ANIMATION */
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    /* CONTACT FORM */
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('.form-input');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#10b981';
            }
        });

        if (valid) {
            alert('Message sent successfully');
            contactForm.reset();

            inputs.forEach(input => {
                input.style.borderColor = '#e2e8f0';
            });
        } else {
            alert('Please fill all fields');
        }
    });

    /* SMOOTH SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

});