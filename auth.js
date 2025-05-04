document.addEventListener("DOMContentLoaded", () => {
    // MongoDB қосылуы үшін API URL
    const API_URL = 'http://localhost:3000/api'; 

    // Кіру формасы
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                const response = await fetch(`${API_URL}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Аутентификация сәтті болса
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    showNotification('Сәтті кірдіңіз!', 'success');
                    
                    // Профиль бетіне бағыттау
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1500);
                } else {
                    showNotification(data.message || 'Қателік орын алды', 'error');
                }
            } catch (error) {
                showNotification('Сервер қатесі', 'error');
                console.error('Login error:', error);
            }
        });
    }
    
    // Тіркелу формасы
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const phone = document.getElementById('regPhone').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            
            if (password !== confirmPassword) {
                showNotification('Құпия сөздер сәйкес келмейді', 'error');
                return;
            }
            
            try {
                const response = await fetch(`${API_URL}/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, phone, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showNotification('Тіркелу сәтті аяқталды!', 'success');
                    
                    // Кіру бетіне бағыттау
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    showNotification(data.message || 'Тіркелу кезінде қате орын алды', 'error');
                }
            } catch (error) {
                showNotification('Сервер қатесі', 'error');
                console.error('Registration error:', error);
            }
        });
    }
    
    // Хабарлама көрсету функциясы
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
});

// Парольді көрсету/жасыру функциясы
document.addEventListener("DOMContentLoaded", () => {
    // Тіркелу формасында
    const setupPasswordToggle = (toggleBtn, inputField) => {
        toggleBtn.addEventListener('click', () => {
            const isPassword = inputField.getAttribute('type') === 'password';
            inputField.setAttribute('type', isPassword ? 'text' : 'password');
            
            const icon = toggleBtn.querySelector('i');
            icon.classList.toggle('fa-eye', !isPassword);
            icon.classList.toggle('fa-eye-slash', isPassword);
            
            // Анимация эффектісі
            toggleBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 200);
        });
    };

    // Тіркелу формасы
    const toggleRegPassword = document.getElementById('toggleRegPassword');
    const regPassword = document.getElementById('regPassword');
    if (toggleRegPassword && regPassword) {
        setupPasswordToggle(toggleRegPassword, regPassword);
    }

    const toggleRegConfirmPassword = document.getElementById('toggleRegConfirmPassword');
    const regConfirmPassword = document.getElementById('regConfirmPassword');
    if (toggleRegConfirmPassword && regConfirmPassword) {
        setupPasswordToggle(toggleRegConfirmPassword, regConfirmPassword);
    }

    // Кіру формасы
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const loginPassword = document.getElementById('loginPassword');
    if (toggleLoginPassword && loginPassword) {
        setupPasswordToggle(toggleLoginPassword, loginPassword);
    }

    // Парольді растау валидациясы
    const validatePasswords = () => {
        if (regPassword && regConfirmPassword) {
            const password = regPassword.value;
            const confirmPassword = regConfirmPassword.value;
            
            if (password && confirmPassword && password !== confirmPassword) {
                regConfirmPassword.setCustomValidity("Құпия сөздер сәйкес келмейді");
            } else {
                regConfirmPassword.setCustomValidity("");
            }
        }
    };

    if (regPassword && regConfirmPassword) {
        regPassword.addEventListener('input', validatePasswords);
        regConfirmPassword.addEventListener('input', validatePasswords);
    }
});

