# ❤ Parrykg - Современная платежная система

[![Node.js](https://img.shields.io/badge/Node.js-v14.0.0+-green.svg)](https://nodejs.org)
[![Vue.js](https://img.shields.io/badge/Vue.js-v3.3.4-green.svg)](https://vuejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.4+-green.svg)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-v4.18.2-blue.svg)](https://expressjs.com)
[![Stripe](https://img.shields.io/badge/Stripe-API-blue.svg)](https://stripe.com)
[![Docker](https://img.shields.io/badge/Docker-Compatible-blue.svg)](https://docker.com)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](#)

## 🎯 Описание

**Parrykg** - это полнофункциональное веб-приложение для обработки платежей с современным интерфейсом. Включает в себя:

✅ Аутентификацию пользователей (регистрация/вход)  
✅ JWT токены для безопасности (24 часа)  
✅ Интеграцию Stripe для обработки платежей  
✅ MongoDB базу данных  
✅ Адаптивный UI с Vue.js 3  
✅ Docker контейнеризацию  

---

## 🚀 Быстрый старт (2 способа)

### Способ 1: Docker Compose ⭐ РЕКОМЕНДУЕТСЯ

```bash
# Требуется: Docker Desktop

git clone https://github.com/xnimuszxc312-cmd/parrykg.git
cd parrykg

# Запустить все сервисы одновременно
docker-compose up -d

# Откройте в браузере
http://localhost:5173  # Frontend
http://localhost:3003  # Backend API
```

✅ **MongoDB автоматически запустится в контейнере!**

### Способ 2: Локальная установка

```bash
# Требуется: Node.js, MongoDB, npm

git clone https://github.com/xnimuszxc312-cmd/parrykg.git
cd parrykg

# Установить зависимости
npm run install:all

# Запустить MongoDB в Docker
docker run -d --name parrykg-mongodb -p 27017:27017 mongo:latest

# Запустить приложение
npm run dev

# Откройте в браузере
http://localhost:5173  # Frontend
```

---

## 🏗️ Архитектура

```
┌─────────────────┐
│  Frontend       │  Vue 3 + Vite
│  Port 5173      │  Responsive UI
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│  Backend        │  Express.js
│  Port 3003      │  JWT Auth
├─────────────────┤  Stripe Integration
│  MongoDB        │  Database
│  Port 27017     │  Collections: Users
└─────────────────┘
```

---

## 📋 Возможности

### 🔐 Безопасность
- Bcryptjs хеширование паролей (10 salt rounds)
- JWT токены с проверкой на каждый запрос
- CORS защита
- Input валидация
- Защита маршрутов

### 💳 Платежи
- Интеграция с Stripe API
- Payment Intent создание
- Поддержка многих валют (USD, EUR, GBP, RUB)
- Минимальная сумма $0.50

### 📱 UI/UX
- Адаптивный дизайн (mobile/tablet/desktop)
- Гладкие анимации
- Яркие градиент кнопки
- Интуитивная навигация

---

## 📁 Структура проекта

```
parrykg/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Регистрация, вход
│   │   └── payment.js       # Платежи
│   ├── models/
│   │   └── User.js          # MongoDB модель
│   ├── server.js            # Express сервер
│   ├── .env                 # Переменные окружения
│   ├── Dockerfile           # Docker для backend
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.vue
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   ├── Dashboard.vue
│   │   │   └── Payment.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   ├── router.js
│   │   └── style.css
│   ├── index.html
│   ├── vite.config.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml       # Docker Compose конфигурация
├── package.json             # Root package.json
├── SETUP.md                 # Руководство установки
├── DEMO.md                  # Демонстрация
├── DOCKER.md                # Docker инструкции
└── README.md                # Этот файл
```

---

## 🧪 Тестирование

### Test аккаунты

```
Email: test@example.com
Пароль: password123
Имя: Test User
```

### Stripe Test Cards

```
✅ Успешный платеж:
   4242 4242 4242 4242
   12/25, CVC: 123

❌ Отклоненный платеж:
   4000 0000 0000 0002
   12/25, CVC: 123
```

### API Endpoints

```bash
# Регистрация
POST /auth/register
{
  "email": "test@example.com",
  "password": "password123",
  "username": "Test User"
}

# Вход
POST /auth/login
{
  "email": "test@example.com",
  "password": "password123"
}

# Создание платежа (нужен JWT токен)
POST /payment/create-intent
Header: Authorization: Bearer <token>
{
  "amount": 1000,
  "currency": "usd",
  "description": "Платеж за подписку"
}
```

---

## 🐳 Docker команды

```bash
# Запустить все сервисы
docker-compose up -d

# Остановить все сервисы
docker-compose down

# Просмотр логов
docker-compose logs -f

# Перезапустить конкретный сервис
docker-compose restart backend

# Удалить всё включая volumes
docker-compose down -v

# Просмотреть статус
docker-compose ps
```

---

## 🛠️ Требования для разработки

### Способ 1: Docker (рекомендуется)
- Docker Desktop v4.0+
- Docker Compose v2.0+
- 2GB свободной оперативной памяти

### Способ 2: Локальная разработка
- Node.js v14.0.0+
- npm v6.0.0+
- MongoDB v4.4+
- Git

---

## 📚 Документация

- **[SETUP.md](./SETUP.md)** - Полное руководство установки
- **[DEMO.md](./DEMO.md)** - Демонстрация функциональности
- **[DOCKER.md](./DOCKER.md)** - Docker инструкции

---

## 🔗 Полезные ссылки

| Ресурс | URL |
|--------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3003 |
| MongoDB | localhost:27017 |
| Health Check | http://localhost:3003/health |

---

## 🤝 Контрибьютинг

1. Fork репозиторий
2. Создайте feature branch (`git checkout -b feature/improvement`)
3. Commit изменения (`git commit -m 'Add improvement'`)
4. Push на branch (`git push origin feature/improvement`)
5. Откройте Pull Request

---

## 📄 Лицензия

ISC License - см. [LICENSE](./LICENSE) файл

---

## 👨‍💻 Об авторе

**xnimuszxc312-cmd**
- GitHub: [@xnimuszxc312-cmd](https://github.com/xnimuszxc312-cmd)
- Email: xnimuszxc312@gmail.com

---

## 🙏 Благодарности

- Vue.js сообщество
- Express.js авторы
- MongoDB команда
- Stripe разработчики

---

**Made with ❤️ by xnimuszxc312-cmd**

*Дата создания: Май 2026*  
*Последнее обновление: 12 Май 2026*
