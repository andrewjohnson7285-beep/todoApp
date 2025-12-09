import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/inMemoryDb';
import { Todo, CreateTodoDto, UpdateTodoDto, TodoFilters } from '../types';
import { AppError } from '../middleware/errorHandler';

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let todos = db.getAllTodos();

    // Apply filters
    const { status, categoryId, sortBy = 'createdAt', sortOrder = 'desc' } = req.query as TodoFilters;

    // Filter by status
    if (status && status !== 'all') {
      if (status === 'active') {
        todos = todos.filter((todo) => !todo.isCompleted);
      } else if (status === 'completed') {
        todos = todos.filter((todo) => todo.isCompleted);
      }
    }

    // Filter by category
    if (categoryId) {
      todos = todos.filter((todo) => todo.categoryId === categoryId);
    }

    // Sort todos
    todos.sort((a, b) => {
      const field = sortBy || 'createdAt';
      const aValue = a[field];
      const bValue = b[field];

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    res.json({
      success: true,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = db.getTodoById(id);

    if (!todo) {
      throw new AppError(404, 'Todo not found');
    }

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dto: CreateTodoDto = req.body;

    // Validate category exists
    if (!db.categoryExists(dto.categoryId)) {
      throw new AppError(400, 'Invalid category ID');
    }

    const newTodo: Todo = {
      id: uuidv4(),
      title: dto.title,
      description: dto.description,
      dueDate: new Date(dto.dueDate),
      categoryId: dto.categoryId,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const todo = db.createTodo(newTodo);

    res.status(201).json({
      success: true,
      data: todo,
      message: 'Todo created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const dto: UpdateTodoDto = req.body;

    // Validate category exists if categoryId is being updated
    if (dto.categoryId && !db.categoryExists(dto.categoryId)) {
      throw new AppError(400, 'Invalid category ID');
    }

    // Convert dueDate string to Date if provided
    const updates: Partial<Todo> = {
      title: dto.title,
      description: dto.description,
      categoryId: dto.categoryId,
      isCompleted: dto.isCompleted,
    };
    if (dto.dueDate) {
      updates.dueDate = new Date(dto.dueDate);
    }

    const todo = db.updateTodo(id, updates);

    if (!todo) {
      throw new AppError(404, 'Todo not found');
    }

    res.json({
      success: true,
      data: todo,
      message: 'Todo updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const toggleTodoCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = db.getTodoById(id);

    if (!todo) {
      throw new AppError(404, 'Todo not found');
    }

    const updatedTodo = db.updateTodo(id, {
      isCompleted: !todo.isCompleted,
    });

    res.json({
      success: true,
      data: updatedTodo,
      message: 'Todo status updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!db.getTodoById(id)) {
      throw new AppError(404, 'Todo not found');
    }

    db.deleteTodo(id);

    res.json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

