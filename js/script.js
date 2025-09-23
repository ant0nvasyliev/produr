// Анімація при скролі
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const serviceCards = document.querySelectorAll('.service-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const processSteps = document.querySelectorAll('.process-step');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Перевірка наявності елементів
    if (!navbar || !mobileMenuBtn || !navLinks) return;
    
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
        document.body.classList.toggle('body-no-scroll', navLinks.classList.contains('active'));
    });
    
    // Закриття меню при кліку на посилання
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.body.classList.remove('body-no-scroll');
        });
    });
    
    // Закриття меню при кліку поза ним
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            navLinks.classList.remove('active');
            document.body.classList.remove('body-no-scroll');
        }
    });
});

// Модальне вікно - спрощена версія без обробки форми
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('openContactModal');
    const closeModalBtn = document.querySelector('.close');
    const modalContent = document.querySelector('.modal-content');
    
    // Перевірка наявності елементів
    if (!modal || !openModalBtn || !closeModalBtn || !modalContent) {
        console.warn('Деякі елементи модального вікна не знайдені');
        return;
    }
    
    // Змінна для відстеження стану модального вікна
    let isModalOpen = false;
    
    // Відкриття модального вікна
    openModalBtn.addEventListener('click', openModal);
    
    // Закриття модального вікна
    closeModalBtn.addEventListener('click', closeModal);
    
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
    }
    
    // Функція відкриття модального вікна
    function openModal() {
        modal.style.display = 'block';
        disableBodyScroll();
        isModalOpen = true;
        
        // Автоматично скролимо до верху модального вікна
        setTimeout(() => {
            modalContent.scrollTop = 0;
            document.getElementById('name')?.focus();
        }, 100);
    }
    
    // Функція для блокування скролу body
    function disableBodyScroll() {
        document.body.classList.add('body-no-scroll');
    }
    
    // Функція для розблокування скролу body
    function enableBodyScroll() {
        document.body.classList.remove('body-no-scroll');
    }
    
    // Обробка скролу всередині модального вікна
    modalContent.addEventListener('wheel', (event) => {
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
    const preventScroll = (event) => {
        if (isModalOpen && !modalContent.contains(event.target)) {
            event.preventDefault();
        }
    };
    
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    
    // Маска для телефонного номера (залишаємо для зручності користувача)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
        phoneInput.addEventListener('keydown', handlePhoneKeydown);
    }
    
    function formatPhoneNumber(event) {
        let value = event.target.value.replace(/\D/g, '');
        
        // Форматуємо тільки якщо номер починається з 38
        if (value.startsWith('38')) {
            value = value.substring(2); // Видаляємо 38
        }
        
        // Обмежуємо довжину (10 цифр без коду країни)
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        // Форматуємо за зразком: +38 (0XX) XXX-XX-XX
        let formattedValue = '+38 (0';
        
        if (value.length > 0) {
            formattedValue += value.substring(0, 2);
        }
        if (value.length > 2) {
            formattedValue += ') ' + value.substring(2, 5);
        }
        if (value.length > 5) {
            formattedValue += '-' + value.substring(5, 7);
        }
        if (value.length > 7) {
            formattedValue += '-' + value.substring(7, 9);
        }
        
        event.target.value = formattedValue;
    }
    
    function handlePhoneKeydown(event) {
        // Дозволяємо тільки цифри та спеціальні клавіші
        if (!/[\d]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(event.key)) {
            event.preventDefault();
        }
    }
});