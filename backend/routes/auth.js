const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /auth/register - Регистрация нового пользователя
router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Валидация
    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    // Проверка, существует ли пользователь
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с этим email уже существует' });
    }

    // Создание нового пользователя
    const user = new User({ email, password, username });
    await user.save();

    res.status(201).json({ 
      message: '✓ Пользователь успешно зарегистрирован',
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при регистрации: ' + error.message });
  }
});

// POST /auth/login - Логин пользователя
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Валидация
    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    // Поиск пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    // Проверка пароля
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    // Создание JWT токена
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      message: '✓ Вы успешно вошли',
      token,
      user: {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при логине: ' + error.message });
  }
});

module.exports = router;
