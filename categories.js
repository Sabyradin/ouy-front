document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        alert(`${card.querySelector('p').innerText} категориясы ашылды!`);
        // Мұнда нақты категория бетіне өту логикасын қосуға болады
    });
});

document.querySelector('.icons').addEventListener('click', () => {
    alert('Профиль, Себет немесе Іздеу басылды!');
});
