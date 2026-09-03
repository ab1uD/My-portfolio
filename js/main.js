// Smooth scrolling for navigation links with offset for sticky navbar
const navbarHeight = document.querySelector('#navbar')?.offsetHeight || 70;

const scrollToSection = (targetId) => {
    const target = document.querySelector(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 18;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            scrollToSection(targetId);
        }
    });
});

// Add active class to nav links on scroll (for single page, but can adapt)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - navbarHeight - 40) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href && href.includes(current)) {
            link.classList.add('active');
        }
    });
});