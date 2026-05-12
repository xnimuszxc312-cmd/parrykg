# Используем базовый образ Node.js
FROM node:18-alpine

# Установим рабочую директорию
WORKDIR /app

# Скопируем package files
COPY package*.json ./

# Установим зависимости
RUN npm install

# Скопируем весь код
COPY . .

# Expose порт
EXPOSE 3003

# Запустим сервер
CMD ["npm", "run", "dev"]
