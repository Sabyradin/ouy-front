document.addEventListener("DOMContentLoaded", () => {
    // API URL
    const API_URL = 'http://localhost:3000/api';
    
    // Аутентификацияны тексеру
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token || !user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Элементтерді таңдау
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const inputs = document.querySelectorAll('.input-with-icon input, .input-with-icon textarea');
    const logoutBtn = document.querySelector('.btn-logout');
    const profileLink = document.getElementById('profileLink');
    
    // Бастапқы мәндерді сақтау
    const originalValues = {};
    inputs.forEach(input => {
        originalValues[input.id] = input.value;
    });
    
    // Профиль деректерін толтыру
    function loadProfileData() {
        document.getElementById('name').value = user.name || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('address').value = user.address || '';
    }
    
    // Өзгерту режимін іске қосу
    function enableEditMode() {
        inputs.forEach(input => {
            input.removeAttribute('readonly');
            input.style.backgroundColor = 'var(--white)';
            input.style.borderColor = 'var(--primary-color)';
        });
        editBtn.style.display = 'none';
        saveBtn.style.display = 'flex';
        cancelBtn.style.display = 'flex';
    }
    
    // Өзгерту режимін өшіру
    function disableEditMode() {
        inputs.forEach(input => {
            input.setAttribute('readonly', true);
            input.style.backgroundColor = 'var(--bg-light)';
            input.style.borderColor = 'var(--border-color)';
        });
        editBtn.style.display = 'flex';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    }
    
    // Деректерді сақтау
    async function saveProfileData() {
        const updatedData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };
        
        try {
            const response = await fetch(`${API_URL}/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                disableEditMode();
                localStorage.setItem('user', JSON.stringify({ ...user, ...updatedData }));
                showNotification('Профиль мәліметтері сәтті сақталды!', 'success');
            } else {
                showNotification(data.message || 'Сақтау кезінде қате орын алды', 'error');
            }
        } catch (error) {
            showNotification('Сервер қатесі', 'error');
            console.error('Update error:', error);
        }
    }
    
    // Хабарлама көрсету
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Шығу функциясы
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        showNotification('Сіз жүйеден сәтті шықтыңыз', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
    
    // Ивенттерді байлау
    editBtn.addEventListener('click', enableEditMode);
    saveBtn.addEventListener('click', saveProfileData);
    
    cancelBtn.addEventListener('click', () => {
        inputs.forEach(input => {
            input.value = originalValues[input.id];
        });
        disableEditMode();
    });
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    if (profileLink) {
        profileLink.href = 'profile.html';
    }
    
    // Деректерді жүктеу
    loadProfileData();
});