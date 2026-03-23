cd backend
npm install
cp .env.example .env
npm start# Parrykg Backend

Этот проект представляет собой серверную часть для приложения Parrykg с использованием платежных систем и систем проверки.

## 🚀 Быстрый старт

### 1. Перейдите в папку backend:

```bash
cd backend
```

### 2. Установите зависимости:

```bash
npm install
```

### 3. Создайте файл `.env` на основе примера:

```bash
cp .env.example .env
```

### 4. Настройте переменные окружения в файле `.env`:

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
JWT_SECRET=your_super_secret_jwt_key_change_in_production
MONGODB_URI=mongodb://localhost:27017/parrykg
PORT=3003
NODE_ENV=development
```

### 5. Убедитесь, что MongoDB запущена:

```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

### 6. Запустите сервер:

```bash
npm start
```

Сервер будет запущен по адресу `http://localhost:3003`.

## 📡 API Endpoints

### Аутентификация

#### POST `/auth/register`
Регистрация нового пользователя.

**Требуемые параметры:**
- `email` - адрес электронной почты
- `password` - пароль пользователя
- `username` (опционально) - имя пользователя

**Пример запроса:**
```bash
curl -X POST http://localhost:3003/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "username": "john_doe"
  }'
```

**Пример ответа:**
```json
{
  "message": "✓ Пользователь успешно зарегистрирован",
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com"
}
```

#### POST `/auth/login`
Логин пользователя и получение JWT токена.

**Требуемые параметры:**
- `email` - адрес электронной почты
- `password` - пароль пользователя

**Пример запроса:**
```bash
curl -X POST http://localhost:3003/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Пример ответа:**
```json
{
  "message": "✓ Вы успешно вошли",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "john_doe"
  }
}
```

### Платежи (требуется аутентификация)

#### POST `/payment/create-intent`
Создание платежного намерения. Требует JWT токена в заголовке `Authorization`.

**Требуемые параметры:**
- `amount` - сумма в центах (минимум 50 центов)
- `currency` (опционально) - валюта (по умолчанию 'usd')
- `description` (опционально) - описание платежа

**Пример запроса:**
```bash
curl -X POST http://localhost:3003/payment/create-intent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "amount": 2000,
    "currency": "usd",
    "description": "Покупка подписки"
  }'
```

**Пример ответа:**
```json
{
  "message": "✓ Платежное намерение создано",
  "clientSecret": "pi_3KxZ..._secret_...",
  "paymentIntentId": "pi_3KxZ...",
  "amount": 2000,
  "currency": "usd",
  "status": "requires_payment_method"
}
```

#### POST `/payment/confirm-intent`
Получение информации о платежном намерении.

**Требуемые параметры:**
- `paymentIntentId` - ID платежного намерения

**Пример запроса:**
```bash
curl -X POST http://localhost:3003/payment/confirm-intent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "paymentIntentId": "pi_3KxZ..."
  }'
```

### Дополнительные маршруты

#### GET `/`
Приветственное сообщение.

```bash
curl http://localhost:3003/
```

**Ответ:**
```json
{
  "message": "❤ Добро пожаловать на Parrykg Backend API"
}
```

#### GET `/health`
Проверка здоровья сервера.

```bash
curl http://localhost:3003/health
```

**Ответ:**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-23T10:30:45.123Z"
}
```

#### GET `/protected`
Защищенный маршрут (требует JWT токена).

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:3003/protected
```

**Ответ:**
```json
{
  "message": "✓ Это защищенный маршрут",
  "user": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "user@example.com"
  }
}
```

## 🔑 Переменные окружения

| Переменная | Описание | Пример |
|---|---|---|
| `STRIPE_SECRET_KEY` | Секретный ключ Stripe для обработки платежей | `sk_test_...` |
| `JWT_SECRET` | Секретный ключ для подписания JWT токенов | `your_secret_key` |
| `MONGODB_URI` | URL подключения к MongoDB | `mongodb://localhost:27017/parrykg` |
| `PORT` | Порт, на котором запускается сервер | `3003` |
| `NODE_ENV` | Окружение: development/production | `development` |

⚠️ **ВАЖНО:** В продакшене обязательно измените значение `JWT_SECRET` на надежный ключ!

## 📦 Зависимости

- **express** - веб-фреймворк для Node.js
- **cors** - middleware для обработки CORS запросов
- **stripe** - SDK для работы с платежами Stripe
- **jsonwebtoken** - создание и проверка JWT токенов
- **bcryptjs** - хеширование паролей
- **mongoose** - ODM для работы с MongoDB
- **dotenv** - загрузка переменных окружения из файла .env

## 🗄️ База данных

Проект использует MongoDB для хранения данных пользователей.

### Запуск MongoDB локально через Docker:

```bash
docker run -d \
  --name parrykg-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_DATABASE=parrykg \
  mongo:latest
```

### Проверка подключения:

```bash
docker exec -it parrykg-mongodb mongosh
```

## 📁 Структура проекта

```
parrykg/
├── backend/
│   ├── routes/
│   │   ├── auth.js           # Маршруты аутентификации
│   │   └── payment.js        # Маршруты платежей
│   ├── models/
│   │   └── User.js           # Модель пользователя
│   ├── server.js             # Главный файл сервера
│   ├── package.json          # Зависимости проекта
│   └── .env.example          # Пример переменных окружения
├── frontend/                 # Frontend приложение
│   ├── src/
│   └── public/
├── README.md                 # Данная документация
└── .gitignore               # Файлы, которые игнорируются Git
```

## 🛠️ Локальная разработка

### Установка зависимостей для разработки:

```bash
cd backend
npm install --save-dev nodemon
```

### Запуск с автоперезагрузкой:

```bash
npm run dev
```

## 📝 Примеры использования

### Полный цикл регистрации и платежа:

```bash
# 1. Регистрация
curl -X POST http://localhost:3003/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "secure123"
  }'

# 2. Login и получение токена
TOKEN=$(curl -X POST http://localhost:3003/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "secure123"
  }' | jq -r '.token')

# 3. Создание платежного намерения
curl -X POST http://localhost:3003/payment/create-intent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "amount": 5000,
    "currency": "usd",
    "description": "Подписка"
  }'
```

## 🐛 Решение проблем

### MongoDB подключение не удается:
- Убедитесь, что MongoDB работает: `docker ps`
- Проверьте переменную `MONGODB_URI` в `.env`

### Stripe ошибки:
- Проверьте, что `STRIPE_SECRET_KEY` правильно установлен
- Используйте тестовые ключи для разработки

### Ошибки JWT:
- Убедитесь, что токен передается в заголовке: `Authorization: Bearer TOKEN`
- Проверьте, что `JWT_SECRET` совпадает при создании и проверке токена

## 📞 Поддержка

Для вопросов и проблем, пожалуйста, создайте Issue в GitHub репозитории.

## 📄 Лицензия

ISC
