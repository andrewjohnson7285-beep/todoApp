import { z } from 'zod';

// Category validation schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50, 'Category name must be less than 50 characters'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color').optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
});

// Todo validation schemas
export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters'),
  dueDate: z.string().datetime('Invalid date format'),
  categoryId: z.string().uuid('Invalid category ID'),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  dueDate: z.string().datetime().optional(),
  categoryId: z.string().uuid().optional(),
  isCompleted: z.boolean().optional(),
});

export const todoFiltersSchema = z.object({
  status: z.enum(['all', 'active', 'completed']).optional(),
  categoryId: z.string().uuid().optional(),
  sortBy: z.enum(['dueDate', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});


