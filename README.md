# rentals-calendar-backend

### Основные возможности

1. **Пользователи и авторизация**: Регистрация и аутентификация пользователей (арендодателей).
2. **Объекты недвижимости**: Управление данными о недвижимости (добавление, редактирование, удаление).
3. **Календарь аренды**: Управление бронированиями и их синхронизация с разными платформами.
4. **Интеграция с платформами**: API для синхронизации с такими платформами, как Airbnb, Booking.com и т.д.
5. **Уведомления и оповещения**: Уведомления о новых бронированиях, изменениях и отменах.

## Установка

### Шаг 1: Клонирование репозитория

Клонируйте репозиторий на локальную машину:
`bash
git clone https://github.com/ваш-репозиторий/rental-calendar-backend.git
cd rental-calendar-backend
`

### Шаг 2: Установка зависимостей

Установите все необходимые зависимости с помощью npm:
`bash
npm install
`

### Шаг 3: Настройка переменных окружения

Создайте файл `.env` в корне проекта и добавьте в него следующие переменные:
`env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
`

Замените `your_mongodb_connection_string` на строку подключения к вашей базе данных MongoDB и `your_jwt_secret` на ваш секретный ключ для JWT.

### Шаг 4: Запуск приложения

Запустите сервер с помощью следующей команды:
`bash
npm start
`

Сервер будет запущен на порту, указанном в файле `.env`.

## Документация API

### Регистрация пользователя

**URL**: `/api/auth/register`

**Метод**: `POST`

**Тело запроса**:
`json
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}
`

**Ответ**:
`json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "username": "your_username",
    "email": "your_email"
  }
}
`

### Логин пользователя

**URL**: `/api/auth/login`

**Метод**: `POST`

**Тело запроса**:
`json
{
  "email": "your_email",
  "password": "your_password"
}
`

**Ответ**:
`json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "username": "your_username",
    "email": "your_email"
  }
}
`

### Получение списка объектов недвижимости

**URL**: `/api/properties`

**Метод**: `GET`

**Ответ**:
`json
[
  {
    "_id": "property_id",
    "name": "property_name",
    "location": "property_location",
    "platformIds": {
      "airbnb": "airbnb_id",
      "booking": "booking_id"
    }
  }
]
`

### Добавление объекта недвижимости

**URL**: `/api/properties`

**Метод**: `POST`

**Тело запроса**:
`json
{
  "name": "property_name",
  "location": "property_location",
  "platformIds": {
    "airbnb": "airbnb_id",
    "booking": "booking_id"
  }
}
`

**Ответ**:
`json
{
  "_id": "property_id",
  "name": "property_name",
  "location": "property_location",
  "platformIds": {
    "airbnb": "airbnb_id",
    "booking": "booking_id"
  }
}
`

### Получение бронирования для объекта недвижимости

**URL**: `/api/properties/:id/bookings`

**Метод**: `GET`

**Параметры**:
- `id`: ID объекта недвижимости

**Ответ**:
`json
[
  {
    "_id": "booking_id",
    "startDate": "booking_start_date",
    "endDate": "booking_end_date",
    "platform": "booking_platform",
    "status": "booking_status"
  }
]
`

### Синхронизация данных с платформами

**URL**: `/api/sync`

**Метод**: `POST`

**Ответ**:
`json
{
  "message": "Synchronization started"
}
`

## Docker

Для запуска приложения в Docker, используйте комманду ниже.

`bash
docker-compose up --build
`

Ваше приложение будет доступно по адресу `http://localhost:5000`.

## Лицензия

Этот проект лицензируется на условиях MIT License. Подробности см. в LICENSE.
