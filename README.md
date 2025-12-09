# Todo Application

A full-stack todo application built with Node.js, Express.js, React, Redux Toolkit, and TypeScript.

## Tech Stack

**Backend:** Node.js, Express.js, TypeScript, Zod (validation)

**Frontend:** React, Redux Toolkit, TypeScript, Vite

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`

**Note:** Ensure the backend server is running before starting the frontend.

## Features

- Create, edit, and delete todo items with title, description, and due date
- Assign categories to todo items
- View todos grouped by categories
- Mark todos as complete or incomplete
- Filter todos by status (all, active, completed)
- Sort todos by due date or creation date
- Create and manage categories with custom colors
- In-memory database (data resets on server restart)

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle completion status
- `DELETE /api/todos/:id` - Delete a todo

### Query Parameters for GET /api/todos
- `status` - all | active | completed
- `categoryId` - Filter by category
- `sortBy` - dueDate | createdAt
- `sortOrder` - asc | desc


