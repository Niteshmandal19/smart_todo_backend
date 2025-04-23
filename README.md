# Smart Todo Backend

Backend for Smart Todo List application

## Deployment on Render

This project is configured for deployment on Render.com.

### Setup Steps:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Name**: smart-todo-backend (or your preferred name)
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: npm start
   - **Plan**: Free or your preferred plan

### Environment Variables:

Set the following environment variables in Render dashboard:

```
NODE_ENV=production
PORT=10000
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=5432
```

### Database Setup:

For a PostgreSQL database, you can:
1. Create a Render PostgreSQL service
2. Connect it to your web service
3. Render will automatically set the DATABASE_URL environment variable

Alternatively, use any PostgreSQL provider and update the environment variables accordingly.

## Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## API Endpoints

- `GET /`: Health check endpoint
- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a new task
- `GET /api/tasks/:id`: Get a task by ID
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

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