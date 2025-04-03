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
