const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/parrykg', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✓ Подключение к MongoDB успешно'))
.catch((err) => console.log('✗ Ошибка подключения к MongoDB:', err));

// Import маршрутов
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');

// Routes
app.use('/auth', authRoutes);
app.use('/payment', paymentRoutes);

// Приветственный маршрут
app.get('/', (req, res) => {
  res.json({ message: '❤ Добро пожаловать на Parrykg Backend API' });
});

// Проверка здоровья сервера
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Защищенный маршрут
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: '✓ Это защищенный маршрут', user: req.user });
});

// Middleware для проверки JWT токена
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен не найден' });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Недействительный токен' });
    }
    req.user = user;
    next();
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});

module.exports = app;
