# 🔧 Полное руководство по установке и запуску

## 📋 Требования

- **Node.js**: v14.0.0 или выше
- **npm**: v6.0.0 или выше
- **MongoDB**: v4.4 или выше (локально или в Docker)
- **Stripe account**: Для платежей (опционально для демо)

## 🚀 Быстрый старт (5 минут)

### 1. Клонирование репозитория
```bash
git clone https://github.com/xnimuszxc312-cmd/parrykg.git
cd parrykg
```

### 2. Установка зависимостей
```bash
npm run install:all
```
Это автоматически установит зависимости для backend и frontend.

### 3. Запуск MongoDB (в отдельном терминале)
```bash
docker run -d \
  --name parrykg-mongodb \
  -p 27017:27017 \
  mongo:latest
```

### 4. Запуск приложения
```bash
npm run dev
```

Это запустит обе части одновременно:
- **Backend**: http://localhost:3003
- **Frontend**: http://localhost:5173

## 📁 Структура проекта

```
parrykg/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Аутентификация
│   │   └── payment.js       # Платежи
│   ├── models/
│   │   └── User.js          # MongoDB модель
│   ├── server.js            # Express сервер
│   ├── .env                 # Переменные окружения
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.vue      # Главная
│   │   │   ├── Login.vue     # Вход
│   │   │   ├── Register.vue  # Регистрация
│   │   │   ├── Dashboard.vue # Панель
│   │   │   └── Payment.vue   # Платежи
│   │   ├── App.vue           # Главный компонент
│   │   ├── main.js           # Точка входа
│   │   ├── router.js         # Vue Router
│   │   └── style.css         # Глобальные стили
│   ├── index.html            # HTML шаблон
│   ├── vite.config.js        # Конфигурация Vite
│   └── package.json
│
├── package.json              # Root package.json
├── DEMO.md                   # Демонстрация
├── SETUP.md                  # Это файл
└── README.md                 # Документация
```

## 🔐 Конфигурация окружения

### Backend `.env` файл

Файл `backend/.env` должен содержать:

```env
# Stripe конфигурация
STRIPE_SECRET_KEY=sk_test_your_key_here

# JWT конфигурация
JWT_SECRET=your_super_secret_key_change_in_production

# MongoDB конфигурация
MONGODB_URI=mongodb://localhost:27017/parrykg

# Сервер конфигурация
PORT=3003
NODE_ENV=development
```

### Получение Stripe ключа

1. Зарегистрируйтесь на https://stripe.com
2. Перейдите на Dashboard → API Keys
3. Скопируйте Secret Key
4. Вставьте в `.env` файл

## 🖥️ Запуск отдельно

### Только Backend
```bash
cd backend
npm install
npm run dev
# Доступен на http://localhost:3003
```

### Только Frontend
```bash
cd frontend
npm install
npm run dev
# Доступен на http://localhost:5173
```

## 🧪 Тестирование

### Проверка Backend
```bash
curl http://localhost:3003/health
# Ответ: {"status":"healthy","timestamp":"..."}
```

### Регистрация пользователя
```bash
curl -X POST http://localhost:3003/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "Test User"
  }'
```

### Вход пользователя
```bash
curl -X POST http://localhost:3003/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🐛 Решение проблем

### Порт 3003 уже используется
```bash
# Найти процесс на порту 3003
lsof -i :3003

# Завершить процесс
kill -9 <PID>

# Или изменить порт в backend/.env
PORT=3004
```

### MongoDB connection error
```bash
# Проверить, запущен ли MongoDB
mongosh

# Если MongoDB не запущена
docker run -d --name parrykg-mongodb -p 27017:27017 mongo:latest
```

### CORS ошибка
- Убедитесь, что backend запущен
- Проверьте proxy в `frontend/vite.config.js`
- Перезагрузите браузер (Ctrl+Shift+R)

### Зависимости не установлены
```bash
# Полная переустановка
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json

npm run install:all
```

## 🚢 Деплой на продакшен

### Построение Frontend
```bash
cd frontend
npm run build
# Создает папку dist/
```

### Сервирование из Backend
```javascript
// В backend/server.js
app.use(express.static('../frontend/dist'));
```

### Переменные окружения для продакшена
```env
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_your_real_key
JWT_SECRET=very_long_and_secure_random_string
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/parrykg
PORT=5000
```

## 📚 Полезные команды

```bash
# Запуск обоих сервисов
npm run dev

# Запуск только backend
npm run backend

# Запуск только frontend
npm run frontend

# Построение frontend для продакшена
npm run build

# Предпросмотр собранного frontend
npm run preview

# Переустановка всех зависимостей
npm run install:all
```

## 🎓 Образовательные материалы

- [Vue.js 3 Документация](https://vuejs.org)
- [Express.js Руководство](https://expressjs.com)
- [MongoDB Гайд](https://docs.mongodb.com)
- [Stripe API Reference](https://stripe.com/docs/api)
- [JWT Введение](https://jwt.io/introduction)

## 🤝 Контрибьютинг

Если вы хотите помочь:

1. Fork репозиторий
2. Создайте feature branch (`git checkout -b feature/improvement`)
3. Commit ваши изменения (`git commit -m 'Add improvement'`)
4. Push на branch (`git push origin feature/improvement`)
5. Откройте Pull Request

## 📄 Лицензия

ISC License - смотрите LICENSE файл для деталей

## 👨‍💻 Об авторе

**xnimuszxc312-cmd**
- GitHub: [@xnimuszxc312-cmd](https://github.com/xnimuszxc312-cmd)
- Email: xnimuszxc312@gmail.com

Дата создания: Май 2026
Последнее обновление: 12 Май 2026
