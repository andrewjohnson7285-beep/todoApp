import axios from 'axios';
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  Todo,
  CreateTodoDto,
  UpdateTodoDto,
  FilterStatus,
  SortBy,
  SortOrder,
} from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data.data;
  },

  create: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await api.post('/categories', data);
    return response.data.data;
  },

  update: async (id: string, data: UpdateCategoryDto): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};

export const todosApi = {
  getAll: async (
    status?: FilterStatus,
    categoryId?: string,
    sortBy?: SortBy,
    sortOrder?: SortOrder
  ): Promise<Todo[]> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (categoryId) params.append('categoryId', categoryId);
    if (sortBy) params.append('sortBy', sortBy);
    if (sortOrder) params.append('sortOrder', sortOrder);

    const response = await api.get(`/todos?${params.toString()}`);
    return response.data.data;
  },

  create: async (data: CreateTodoDto): Promise<Todo> => {
    const response = await api.post('/todos', data);
    return response.data.data;
  },

  update: async (id: string, data: UpdateTodoDto): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data.data;
  },

  toggle: async (id: string): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};

