export interface Category {
  id: string;
  name: string;
  color?: string;
  createdAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  categoryId: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  dueDate: string | Date;
  categoryId: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  dueDate?: string | Date;
  categoryId?: string;
  isCompleted?: boolean;
}

export interface TodoFilters {
  status?: 'all' | 'active' | 'completed';
  categoryId?: string;
  sortBy?: 'dueDate' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}


