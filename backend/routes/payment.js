const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware для проверки JWT токена
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен не найден' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Недействительный токен' });
    }
    req.user = user;
    next();
  });
}

// POST /payment/create-intent - Создание платежного намерения
router.post('/create-intent', authenticateToken, async (req, res) => {
  try {
    const { amount, currency = 'usd', description } = req.body;

    // Валидация
    if (!amount) {
      return res.status(400).json({ error: 'Сумма обязательна' });
    }

    if (amount < 50) {
      return res.status(400).json({ error: 'Минимальная сумма 0.50 USD (50 центов)' });
    }

    // Создание платежного намерения через Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      description: description || `Payment for user ${req.user.userId}`,
      metadata: {
        userId: req.user.userId,
        userEmail: req.user.email,
      },
    });

    res.json({
      message: '✓ Платежное намерение создано',
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании платежного намерения: ' + error.message });
  }
});

// POST /payment/confirm-intent - Подтверждение платежного намерения
router.post('/confirm-intent', authenticateToken, async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Payment Intent ID обязателен' });
    }

    // Получение информации о платежном намерении
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      message: '✓ Информация о платежном намерении получена',
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении платежного намерения: ' + error.message });
  }
});

module.exports = router;
