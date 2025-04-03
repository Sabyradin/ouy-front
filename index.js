document.querySelector('.icons').addEventListener('click', function() {
    alert('Іздеу, Профиль және Себет батырмалары басылды!');
});

document.querySelectorAll('.category').forEach(item => {
    item.addEventListener('click', function() {
        alert(this.textContent + ' категориясы таңдалды!');
    });
});
