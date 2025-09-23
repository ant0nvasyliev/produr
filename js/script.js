// Анімація при скролі
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const serviceCards = document.querySelectorAll('.service-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const processSteps = document.querySelectorAll('.process-step');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Ефект фіксації навігації при скролі
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
        
        // Анімація елементів при скролі
        animateOnScroll(serviceCards, 'visible');
        animateOnScroll(galleryItems, 'visible');
        animateOnScroll(processSteps, 'visible');
    });
    
    function animateOnScroll(elements, className) {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add(className);
            }
        });
    }
    
    // Ініціалізація анімацій при завантаженні
    animateOnScroll(serviceCards, 'visible');
    animateOnScroll(galleryItems, 'visible');
    animateOnScroll(processSteps, 'visible');
    
    // Мобільне меню
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Закриття меню при кліку на посилання
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
});