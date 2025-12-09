export interface Category {
  id: string;
  name: string;
  color?: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  color?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  color?: string;
}

export interface CreateTodoDto {
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  dueDate?: string;
  categoryId?: string;
  isCompleted?: boolean;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortBy = 'dueDate' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

