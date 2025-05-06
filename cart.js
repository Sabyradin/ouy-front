document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();

    const clearBtn = document.getElementById('clear');
    const buyBtn = document.getElementById('buy');

    if (clearBtn) clearBtn.addEventListener('click', clearCart);
    if (buyBtn) buyBtn.addEventListener('click', buyItems);

    // Қазір сатып алу батырмасы
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.dataset.name,
                price: Number(productCard.dataset.price),
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existing = cart.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'payment.html';
        });
    });

    // Жоғарғы панельдегі иконкалар
    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.id.replace('-btn', '');
            if(action === 'search') window.location.href = 'search.html';
            else if(action === 'profile') window.location.href = 'profile.html';
            else if(action === 'cart') window.location.href = 'cart.html';
        });
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.textContent = total;
    const count = document.getElementById('cart-count');
    if (count) count.textContent = total;
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');
    const subtotalBox = document.getElementById('subtotal-price');
    const deliveryBox = document.getElementById('delivery-price');
    const totalBox = document.getElementById('total-price');

    if (!container || !subtotalBox || !deliveryBox || !totalBox) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Себетіңіз бос</p>
            </div>
        `;
        subtotalBox.textContent = '0 ₸';
        deliveryBox.textContent = '0 ₸';
        totalBox.textContent = '0 ₸';
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/100?text=No+Image'}" alt="${item.name}" class="cart-item-img">
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
        container.appendChild(itemEl);
    });

    const delivery = 1000;
    subtotalBox.textContent = `${subtotal} ₸`;
    deliveryBox.textContent = `${delivery} ₸`;
    totalBox.textContent = `${subtotal + delivery} ₸`;

    document.querySelectorAll('.quantity-btn.minus').forEach(btn => btn.addEventListener('click', decreaseQuantity));
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => btn.addEventListener('click', increaseQuantity));
    document.querySelectorAll('.remove-item').forEach(btn => btn.addEventListener('click', removeItem));
}

function decreaseQuantity(e) {
    const index = e.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function increaseQuantity(e) {
    const index = e.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function removeItem(e) {
    if (confirm('Бұл тауарды себеттен шынымен алып тастағыңыз келе ме?')) {
        const index = e.target.closest('.remove-item').dataset.index;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

function clearCart() {
    if (confirm('Себетті толығымен тазалағыңыз келе ме?')) {
        localStorage.removeItem('cart');
        updateCartCount();
        renderCart();
    }
}

function buyItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Себетіңіз бос. Алдымен тауар қосыңыз!');
        return;
    }
    window.location.href = 'payment.html';
}
