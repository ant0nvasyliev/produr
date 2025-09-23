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

// Модальне вікно
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openContactModal');
const closeBtn = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const modalContent = document.querySelector('.modal-content');

// Змінна для відстеження стану модального вікна
let isModalOpen = false;

// Функція для блокування скролу body
function disableBodyScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
}

// Функція для розблокування скролу body
function enableBodyScroll() {
    document.body.style.overflow = '';
    document.body.style.height = '';
}

// Відкриття модального вікна
openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    disableBodyScroll();
    isModalOpen = true;
    
    // Автоматично скролимо до верху модального вікна
    setTimeout(() => {
        modalContent.scrollTop = 0;
    }, 10);
});

// Закриття модального вікна
closeBtn.addEventListener('click', closeModal);

// Закриття при кліку поза вікном
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Закриття по ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isModalOpen) {
        closeModal();
    }
});

// Функція закриття модального вікна
function closeModal() {
    modal.style.display = 'none';
    enableBodyScroll();
    isModalOpen = false;
    contactForm.reset();
}

// Обробка скролу всередині модального вікна
modalContent.addEventListener('wheel', (event) => {
    // Дозволяємо скрол всередині модального вікна
    event.stopPropagation();
    
    // Запобігаємо скролу body, коли досягнуто меж модального вікна
    const isAtTop = modalContent.scrollTop === 0;
    const isAtBottom = modalContent.scrollTop + modalContent.clientHeight >= modalContent.scrollHeight - 1;
    
    if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
        event.preventDefault();
    }
}, { passive: false });

// Для тачпадів - обробляємо подію scroll
modalContent.addEventListener('scroll', (event) => {
    event.stopPropagation();
});

// Запобігаємо скролу body при відкритій модалці
document.addEventListener('wheel', (event) => {
    if (isModalOpen && !modalContent.contains(event.target)) {
        event.preventDefault();
    }
}, { passive: false });

// Для тачпадів і мобільних пристроїв
document.addEventListener('touchmove', (event) => {
    if (isModalOpen && !modalContent.contains(event.target)) {
        event.preventDefault();
    }
}, { passive: false });

// Обробка форми
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Тут буде логіка відправки форми
    alert('Дякуємо! Ваше повідомлення відправлено. Ми зв\'яжемося з вами найближчим часом.');
    closeModal();
});