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

// Функціонал модального вікна
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('openContactModal');
    const closeModalBtn = document.querySelector('.close');
    const contactForm = document.getElementById('contactForm');
    
    // Відкриття модального вікна
    openModalBtn.addEventListener('click', openModal);
    
    // Закриття модального вікна
    closeModalBtn.addEventListener('click', closeModal);
    
    // Закриття при кліку поза модальним вікном
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Закриття по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Обробка відправлення форми
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Маска для телефонного номера
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    function openModal() {
        modal.style.display = 'block';
        document.body.classList.add('body-no-scroll');
        setTimeout(() => {
            document.getElementById('name').focus();
        }, 100);
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('body-no-scroll');
        contactForm.reset();
    }
    
    function formatPhoneNumber(event) {
        let value = event.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = '+38 (0' + value.substring(2);
        }
        
        if (value.length > 7) {
            value = value.substring(0, 7) + ') ' + value.substring(7);
        }
        if (value.length > 12) {
            value = value.substring(0, 12) + ' ' + value.substring(12);
        }
        if (value.length > 15) {
            value = value.substring(0, 15) + ' ' + value.substring(15);
        }
        if (value.length > 18) {
            value = value.substring(0, 18);
        }
        
        event.target.value = value;
    }
    
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        // Валідація форми
        if (!validateForm(data)) {
            return;
        }
        
        // Блокування кнопки відправки
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Відправка...';
        submitBtn.disabled = true;
        
        // Додаємо додаткові параметри для Formspree
        const formDataToSend = new FormData(contactForm);
        formDataToSend.append('_replyto', data.email);
        
        // Відправляємо форму
        fetch(contactForm.action, {
            method: 'POST',
            body: formDataToSend,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Форма успішно відправлена - Formspree сам зробить redirect
                // Можна додатково очистити форму
                contactForm.reset();
                
                // Закриваємо модальне вікно
                setTimeout(() => {
                    closeModal();
                }, 500);
            } else {
                throw new Error('Помилка відправки');
            }
        })
        .catch(error => {
            console.error('Помилка відправки:', error);
            // Показуємо просте сповіщення про помилку
            alert('❌ Сталася помилка при відправці. Спробуйте ще раз або зателефонуйте нам.');
        })
        .finally(() => {
            // Розблокувати кнопку
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
    
    function validateForm(data) {
        // Перевірка обов'язкових полів
        if (!data.name.trim()) {
            showFieldError('name', 'Будь ласка, введіть ваше ім\'я');
            return false;
        }
        
        if (!data.email.trim()) {
            showFieldError('email', 'Будь ласка, введіть email');
            return false;
        } else if (!isValidEmail(data.email)) {
            showFieldError('email', 'Будь ласка, введіть коректний email');
            return false;
        }
        
        if (!data.message.trim()) {
            showFieldError('message', 'Будь ласка, введіть повідомлення');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        // Видаляємо попередні помилки
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Додаємо стиль помилки
        field.style.borderColor = '#e74c3c';
        
        // Додаємо повідомлення про помилку
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        formGroup.appendChild(errorElement);
        
        // Фокус на поле з помилкою
        field.focus();
        
        // Видаляємо помилку при зміні значення
        field.addEventListener('input', function() {
            field.style.borderColor = '#ddd';
            if (existingError) {
                existingError.remove();
            }
        }, { once: true });
    }
});