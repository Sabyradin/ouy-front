document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout");

    let cart = [];

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.classList.add("cart-item");
            li.innerHTML = `
                ${item.name} - ${item.price} ₸ x ${item.quantity}
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartItems.appendChild(li);
        });
        totalPrice.textContent = total;
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            const price = parseInt(event.target.getAttribute("data-price"));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    cartItems.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        }
    });

    clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateCart();
    });

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Себет бос!");
        } else {
            alert("Сатып алу сәтті аяқталды!");
            cart = [];
            updateCart();
        }
    });

    updateCart();
});
