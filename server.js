require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB қосылу
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qazaq-ecomarket', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Пайдаланушы моделі
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Тіркелу
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        
        // Пайдаланушы бар-жоғын тексеру
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Бұл электрондық пошта бойынша аккаунт бар' });
        }
        
        // Құпия сөзді хэштеу
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Жаңа пайдаланушыны құру
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword
        });
        
        await user.save();
        
        res.status(201).json({ message: 'Пайдаланушы сәтті тіркелді' });
    } catch (error) {
        res.status(500).json({ message: 'Сервер қатесі' });
    }
});

// Кіру
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Пайдаланушыны табу
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Пайдаланушы табылмады' });
        }
        
        // Құпия сөзді тексеру
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Қате құпия сөз' });
        }
        
        // JWT токенін жасау
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );
        
        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Сервер қатесі' });
    }
});

// Профильді жаңарту
app.put('/api/users/update', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Аутентификация жоқ' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userId = decoded.userId;
        
        const { name, email, phone, address } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone, address },
            { new: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'Пайдаланушы табылмады' });
        }
        
        res.json({
            message: 'Профиль сәтті жаңартылды',
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Сервер қатесі' });
    }
});

// Серверді іске қосу
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер ${PORT} портында іске қосылды`);
});