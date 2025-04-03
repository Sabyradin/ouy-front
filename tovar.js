document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.parentElement;
        const productName = productCard.querySelector('h4').innerText;
        const productPrice = productCard.querySelector('p').innerText;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(productName + ' себетке қосылды!');
    });
});
