# 🐳 Docker запуск Parrykg

## Вариант 1: Docker Compose (РЕКОМЕНДУЕТСЯ)

### Требования:
- Docker Desktop установлен
- Docker Compose v2.0+

### Быстрый запуск

```bash
# Перейти в корневую папку проекта
cd parrykg

# Запустить все сервисы одновременно
docker-compose up -d

# Проверить статус контейнеров
docker-compose ps

# Просмотреть логи
docker-compose logs -f

# Остановить все контейнеры
docker-compose down

# Удалить все контейнеры и volumes
docker-compose down -v
```

### Доступные сервисы

| Сервис | URL | Статус |
|--------|-----|--------|
| Frontend | http://localhost:5173 | Dev сервер |
| Backend | http://localhost:3003 | Express |
| MongoDB | localhost:27017 | Database |
| Health Check | http://localhost:3003/health | ✅ |

### Данные для подключения к MongoDB

```javascript
// Адрес подключения
mongodb://admin:admin123@localhost:27017/parrykg

// Учетные данные
Username: admin
Password: admin123
Database: parrykg
```

---

## Вариант 2: Запуск MongoDB отдельно

```bash
# Запустить MongoDB контейнер
docker run -d \
  --name parrykg-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo:latest

# Проверить, что MongoDB запущена
docker ps | grep mongodb

# Затем в другом терминале запустить приложение
npm run dev
```

---

## Вариант 3: Docker Compose с Frontend в контейнере

Если вы хотите запустить и Frontend в Docker контейнере:

```bash
# Раскомментируйте секцию 'frontend' в docker-compose.yml
# Затем запустите:

docker-compose up -d

# Frontend будет доступен на http://localhost:80
```

---

## 🛠️ Useful Docker Commands

```bash
# Просмотр логов конкретного сервиса
docker-compose logs backend
docker-compose logs mongodb

# Выполнить команду в контейнере
docker-compose exec backend npm list
docker-compose exec mongodb mongosh -u admin -p admin123

# Перестроить образ
docker-compose build --no-cache

# Запустить в интерактивном режиме
docker-compose up

# Удалить неиспользуемые ресурсы
docker system prune -a
```

---

## 📊 Проверка здоровья приложения

```bash
# Проверить Backend
curl http://localhost:3003/health

# Проверить MongoDB через mongosh
docker-compose exec mongodb mongosh -u admin -p admin123 --eval "db.adminCommand('ping')"
```

---

## 🔧 Переменные окружения

Если нужно изменить переменные, отредактируйте `docker-compose.yml` в секции `environment`:

```yaml
environment:
  MONGODB_URI: mongodb://admin:admin123@mongodb:27017/parrykg
  JWT_SECRET: your_secure_key
  STRIPE_SECRET_KEY: sk_test_your_key
  PORT: 3003
```

---

## 🚨 Решение проблем

### Port 27017 already in use

```bash
# Найти процесс на порте
lsof -i :27017

# Завершить процесс
kill -9 <PID>

# Или изменить порт в docker-compose.yml
ports:
  - "27018:27017"  # Используем порт 27018 вместо 27017
```

### MongoDB connection refused

```bash
# Проверить статус контейнера
docker-compose ps

# Просмотреть логи MongoDB
docker-compose logs mongodb

# Перезапустить MongoDB
docker-compose restart mongodb
```

### Backend не видит MongoDB

```bash
# Убедитесь, что MongoDB запущена
docker-compose ps

# Проверьте URL подключения в .env
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/parrykg
# Заметьте: 'mongodb' это имя сервиса в docker-compose.yml

# Перезапустите оба сервиса
docker-compose restart
```

---

## 📝 Production Deployment

Для production используйте:

```bash
# Собрать optimized образы
docker-compose -f docker-compose.yml build

# Запустить в production режиме
docker-compose -f docker-compose.yml up -d

# Используйте managed MongoDB (MongoDB Atlas)
# и обновите MONGODB_URI в переменных окружения
```

---

## 📚 Дополнительные ресурсы

- [Docker Documentation](https://docs.docker.com)
- [Docker Compose Documentation](https://docs.docker.com/compose)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Node.js Docker Image](https://hub.docker.com/_/node)

---

## ✅ Проверка готовности

После запуска `docker-compose up -d` проверьте:

```bash
# 1. Все контейнеры запущены
✅ docker-compose ps

# 2. MongoDB готова
✅ curl http://localhost:3003/health

# 3. Backend готов
✅ curl http://localhost:3003/

# 4. Frontend готов
✅ Open http://localhost:5173 в браузере

# Готово! 🎉
```
