require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const productRoutes = require('./routes/productRoutes');


// MongoDB қосылу
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB қосылды'))
.catch(err => console.error('MongoDB қосылу қатесі:', err));

// Орталықтар
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Сессия конфигурациясы
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Көріністер
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Маршруттар
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use('/', authRoutes);
app.use('/profile', profileRoutes);

// 404 қатесі
app.use((req, res) => {
  res.status(404).render('404');
});

// Серверді іске қосу
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер ${PORT} портында іске қосылды`);
});

// app.js-ге қосу
const helmet = require('helmet');
app.use(helmet());

// app.js-ге қосу
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // әр IP үшін 100 запрос
});

app.use(limiter);

// app.js-ге қосу
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// Маршруттарда қолдану
router.get('/register', csrfProtection, (req, res) => {
  res.render('register', { csrfToken: req.csrfToken() });
});

// Формаларға токенді қосу
<input type="hidden" name="_csrf" value="<%= csrfToken %>"></input>