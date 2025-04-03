document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = parseInt(product.dataset.price);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({id, name, price, quantity: 1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} себетке қосылды!`);
    });
});

document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const name = product.dataset.name;
        const price = product.dataset.price;
        alert(`Сіз ${name} өнімін ${price} ₸ бағасына сатып алуға тапсырыс бердіңіз!`);
        // Мұнда сатып алу процесі жүзеге асады (тапсырысты рәсімдеу)
    });
});
