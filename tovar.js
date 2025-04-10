document.addEventListener("DOMContentLoaded", () => {
    // Себетке қосу функциясы
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').innerText;
            const productPrice = productCard.querySelector('.product-price').innerText.replace(/[^\d]/g, '');
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Тауар себетте бар ма тексеру
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: parseInt(productPrice),
                    quantity: 1,
                    image: productCard.querySelector('img').src
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Хабарлама көрсету
            showNotification(`${productName} себетке қосылды!`, 'success');
            
            // Себеттегі тауарлар санын жаңарту
            updateCartCount();
        });
    });
    
    // Сұрыптау функциясы
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const productsGrid = document.querySelector('.products-grid');
            const products = Array.from(productsGrid.querySelectorAll('.product-card'));
            
            products.sort((a, b) => {
                const priceA = parseInt(a.querySelector('.product-price').innerText.replace(/[^\d]/g, ''));
                const priceB = parseInt(b.querySelector('.product-price').innerText.replace(/[^\d]/g, ''));
                const nameA = a.querySelector('.product-title').innerText.toLowerCase();
                const nameB = b.querySelector('.product-title').innerText.toLowerCase();
                
                switch(this.value) {
                    case 'price-asc': return priceA - priceB;
                    case 'price-desc': return priceB - priceA;
                    case 'name-asc': return nameA.localeCompare(nameB);
                    case 'name-desc': return nameB.localeCompare(nameA);
                    default: return 0;
                }
            });
            
            // Өзгерістерді қолдану
            products.forEach(product => productsGrid.appendChild(product));
        });
    }
    
    // Хабарлама көрсету функциясы
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
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
    
    // Себеттегі тауарлар санын жаңарту
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartIcon = document.querySelector('.header-icons a[aria-label="Себет"]');
        if (cartIcon) {
            let badge = cartIcon.querySelector('.cart-badge');
            
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                cartIcon.appendChild(badge);
            }
            
            badge.textContent = totalItems > 0 ? totalItems : '';
        }
    }
    
    // Бастапқы жүктеу
    updateCartCount();
});