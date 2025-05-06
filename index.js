document.addEventListener('DOMContentLoaded', function() {
    // Слайдер
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    
    // Инициализация точек
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Автоматическое переключение слайдов
    let slideInterval = setInterval(nextSlide, 5000);
    
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Слайдер отзывов
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    
    // Инициализация точек для отзывов
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDotsContainer.appendChild(dot);
    });
    
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    function goToTestimonial(index) {
        testimonials[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');
        currentTestimonial = (index + testimonials.length) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }
    
    testimonialNext.addEventListener('click', () => {
        goToTestimonial(currentTestimonial + 1);
    });
    
    testimonialPrev.addEventListener('click', () => {
        goToTestimonial(currentTestimonial - 1);
    });
    
    // Корзина
    const cartBtns = document.querySelectorAll('.btn-add');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    cartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;
            cartCount.classList.add('animate');
            
            // Анимация добавления в корзину
            setTimeout(() => {
                cartCount.classList.remove('animate');
            }, 300);
            
            // Временное уведомление
            showNotification('Тауар себетке қосылды');
        });
    });
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Навигационные иконки
    document.getElementById('search-btn').addEventListener('click', () => {
        window.location.href = 'search.html';
    });
    
    document.getElementById('profile-btn').addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
    
    document.getElementById('cart-btn').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 



document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;

        showPurchaseModal(productName);
    });
});

function showPurchaseModal(productName) {
    const overlay = document.createElement('div');
    overlay.className = 'buy-overlay';
    overlay.innerHTML = `
        <div class="buy-message">
            <p>${productName} сатып алынуда...</p>
            <span class="loader"></span>
        </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.innerHTML = `
            <div class="buy-message success">
                <p>✅ ${productName} сәтті сатып алынды!</p>
                <button onclick="document.body.removeChild(document.querySelector('.buy-overlay'))" class="btn-close">Жабу</button>
            </div>
        `;
    }, 2000);
}


document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;

        showCartToast(`${productName} себетке қосылды ✅`);
    });
});

function showCartToast(message) {
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 2500);
}



document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;

        // Бұл мәліметтерді төлем бетіне жіберу (localStorage арқылы)
        localStorage.setItem('selectedProduct', JSON.stringify({
            name: productName,
            price: productPrice
        }));

        window.location.href = 'payment.html';
    });
});
