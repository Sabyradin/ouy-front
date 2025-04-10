document.addEventListener("DOMContentLoaded", () => {
    console.log("Жеткізу беті жүктелді");
    
    // Себеттегі тауарлар санын көрсету
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }
    
    updateCartCount();
    
    // Карточкаларға анимация қосу
    const deliveryCards = document.querySelectorAll('.delivery-card');
    deliveryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.delivery-icon');
            icon.style.transform = 'rotate(5deg) scale(1.1)';
            icon.style.backgroundColor = var(--primary-color);
            icon.style.color = var(--white);
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.delivery-icon');
            icon.style.transform = 'rotate(0) scale(1)';
            icon.style.backgroundColor = var(--primary-light);
            icon.style.color = var(--primary-dark);
        });
    });
});