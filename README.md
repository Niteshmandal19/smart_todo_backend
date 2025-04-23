# Smart Todo List Backend

A Node.js backend for a Smart Todo List application with automatic task status updates based on deadlines.

## Features

- RESTful API for task management (CRUD operations)
- Automatic task status updates based on deadlines
- JWT authentication
- PostgreSQL database with Sequelize ORM
- Scheduled task status checks using node-cron

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smart-todo-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE smart_todo;
   ```

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

5. Run database migrations:
   ```bash
   npm run migrate
   ```

6. Start the server:
   ```bash
   npm start
   ```

## API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Task Endpoints

#### Get All Tasks
- **GET** `/api/tasks`
- **Headers**: `Authorization: Bearer <token>`

#### Get Task by ID
- **GET** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`

#### Create Task
- **POST** `/api/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "deadline": "ISO date string"
  }
  ```

#### Update Task
- **PUT** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "deadline": "ISO date string",
    "status": "ongoing|success|failure"
  }
  ```

#### Delete Task
- **DELETE** `/api/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`

## Task Status Logic

Tasks are automatically updated based on their deadlines:
- **Ongoing**: Before deadline and not marked complete
- **Success**: Manually marked complete before deadline
- **Failure**: Deadline passed without completion

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 