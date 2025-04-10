document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
    
    document.getElementById('clear').addEventListener('click', clearCart);
    document.getElementById('buy').addEventListener('click', buyItems);
});

// Себеттегі тауарлар санын жаңарту
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalCount;
}

// Себетті рендерлеу
function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalPriceContainer = document.getElementById('subtotal-price');
    const deliveryPriceContainer = document.getElementById('delivery-price');
    const totalPriceContainer = document.getElementById('total-price');
    
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Себетіңіз бос</p>
            </div>
        `;
        subtotalPriceContainer.textContent = '0 ₸';
        deliveryPriceContainer.textContent = '0 ₸';
        totalPriceContainer.textContent = '0 ₸';
        return;
    }
    
    let subtotal = 0;
    
    cartItems.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/100?text=No+Image'}" 
                 alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">${item.price} ₸</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-times"></i> Өшіру
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    // Жеткізу құнын есептеу (мысал ретінде 1000 теңге)
    const deliveryPrice = 1000;
    const totalPrice = subtotal + deliveryPrice;
    
    subtotalPriceContainer.textContent = `${subtotal} ₸`;
    deliveryPriceContainer.textContent = `${deliveryPrice} ₸`;
    totalPriceContainer.textContent = `${totalPrice} ₸`;
    
    // Минус және плюс батырмаларына іс-әрекеттерді қосу
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    // Өшіру батырмаларына іс-әрекеттерді қосу
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

// Санын азайту
function decreaseQuantity(e) {
    const index = e.target.dataset.index;
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    } else {
        cartItems.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    renderCart();
}

// Санын көбейту
function increaseQuantity(e) {
    const index = e.target.dataset.index;
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartItems[index].quantity++;
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    renderCart();
}

// Тауарды өшіру
function removeItem(e) {
    if (confirm('Бұл тауарды себеттен шынымен алып тастағыңыз келе ме?')) {
        const index = e.target.closest('.remove-item').dataset.index;
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        
        cartItems.splice(index, 1);
        
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();
        renderCart();
    }
}

// Себетті тазалау
function clearCart() {
    if (confirm('Себетті толығымен тазалағыңыз келе ме?')) {
        localStorage.removeItem('cart');
        updateCartCount();
        renderCart();
    }
}

// Сатып алу
function buyItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cartItems.length === 0) {
        alert('Себетіңіз бос. Алдымен тауар қосыңыз!');
        return;
    }
    
    // Мұнда төлемді өңдеу логикасын қосуға болады
    alert('Тапсырысыңыз қабылданды! Рақмет сатып алу үшін.');
    
    // Төлемнен кейін себетті тазалау
    localStorage.removeItem('cart');
    updateCartCount();
    renderCart();
}document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.id.replace('-btn', '');
        
        if(action === 'search') {
            window.location.href = 'search.html';
        } 
        else if(action === 'profile') {
            window.location.href = 'profile.html';
        }
        else if(action === 'cart') {
            window.location.href = 'cart.html';
        }
    });
});

// Себеттегі заттар санын жаңарту (мысал ретінде)
function updateCartCount(count) {
    document.querySelector('.cart-badge').textContent = count;
}