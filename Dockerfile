# Указываем базовый образ
FROM node

# Устанавливаем рабочую директорию
WORKDIR /person

# Копируем package.json  для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 5100

CMD ["npm", "run", "start:devPersonsDD"]