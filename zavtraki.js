document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            cart.push({
                name: productName,
                price: productPrice
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} себетке қосылды!`);
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Қазір сатып алу батырмаларын табу
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.dataset.name,
                price: Number(productCard.dataset.price),
                quantity: 1
            };

            // Себеттен бұрын бар ма, тексеру
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existing = cart.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Төлем бетіне өту
            window.location.href = 'payment.html';
        });
    });
});

