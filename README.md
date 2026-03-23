# Parrykg Backend

Этот проект представляет собой backend для приложения parrykg с системой платежей и верификацией пользователей.

## Установка

1. Перейдите в папку backend:
   ```
   cd backend
   ```

2. Установите зависимости:
   ```
   npm install
   ```

3. Запустите сервер:
   ```
   npm start
   ```

Сервер будет запущен на http://localhost:3003.

## API Endpoints

### Аутентификация

- `POST /register` - Регистрация нового пользователя. Требует `email` и `password`.
- `POST /login` - Логин пользователя. Возвращает JWT токен.

### Платежи

- `POST /create-payment-intent` - Создание платежного намерения (требует аутентификации). Требует `amount` в центах.

### Другие

- `GET /` - Приветственное сообщение.
- `GET /health` - Проверка здоровья сервера.
- `GET /protected` - Защищенный маршрут (требует токена).

## Переменные окружения

- `STRIPE_SECRET_KEY` - Секретный ключ Stripe для платежей.
- `JWT_SECRET` - Секретный ключ для JWT (в коде hardcoded как 'your_secret_key', замените в продакшене).

## Зависимости

- express
- cors
- stripe
- jsonwebtoken
- bcryptjs
- mongoose

## База данных

Проект использует MongoDB для хранения пользователей. Запустите MongoDB локально или через Docker:

```
docker run -d --name mongodb -p 27017:27017 mongo:latest
```