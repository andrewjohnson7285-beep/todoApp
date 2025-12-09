import { Category, Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

class InMemoryDatabase {
  private categories: Map<string, Category> = new Map();
  private todos: Map<string, Todo> = new Map();

  constructor() {
    this.seedData();
  }

  // Seed with initial data
  private seedData() {
    const defaultCategories: Category[] = [
      {
        id: uuidv4(),
        name: 'Work',
        color: '#3B82F6',
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Personal',
        color: '#10B981',
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Shopping',
        color: '#F59E0B',
        createdAt: new Date(),
      },
    ];

    defaultCategories.forEach((category) => {
      this.categories.set(category.id, category);
    });
  }

  // Category methods
  getAllCategories(): Category[] {
    return Array.from(this.categories.values());
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.get(id);
  }

  createCategory(category: Category): Category {
    this.categories.set(category.id, category);
    return category;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | undefined {
    const category = this.categories.get(id);
    if (!category) return undefined;

    const updatedCategory = { ...category, ...updates };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  deleteCategory(id: string): boolean {
    // Check if any todos are using this category
    const todosInCategory = Array.from(this.todos.values()).filter(
      (todo) => todo.categoryId === id
    );

    if (todosInCategory.length > 0) {
      return false; // Cannot delete category with todos
    }

    return this.categories.delete(id);
  }

  // Todo methods
  getAllTodos(): Todo[] {
    return Array.from(this.todos.values());
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  createTodo(todo: Todo): Todo {
    this.todos.set(todo.id, todo);
    return todo;
  }

  updateTodo(id: string, updates: Partial<Todo>): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) return undefined;

    const updatedTodo = {
      ...todo,
      ...updates,
      updatedAt: new Date(),
    };
    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  deleteTodo(id: string): boolean {
    return this.todos.delete(id);
  }

  // Helper method to check if category exists
  categoryExists(id: string): boolean {
    return this.categories.has(id);
  }
}

// Export singleton instance
export const db = new InMemoryDatabase();


