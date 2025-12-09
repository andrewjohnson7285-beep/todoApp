import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchTodos } from '../../store/todosSlice';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { TodoFilters } from './TodoFilters';
import type { Todo } from '../../types';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todos, loading, error, filters } = useAppSelector((state) => state.todos);
  const { categories } = useAppSelector((state) => state.categories);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch, filters]);

  const groupedTodos = () => {
    const groups: { [key: string]: Todo[] } = {};
    
    todos.forEach((todo) => {
      const categoryId = todo.categoryId;
      if (!groups[categoryId]) {
        groups[categoryId] = [];
      }
      groups[categoryId].push(todo);
    });

    return groups;
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  if (loading) return <div className="loading">Loading todos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const groups = groupedTodos();

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h2>Todos</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          New Todo
        </button>
      </div>

      <TodoFilters />

      {todos.length === 0 ? (
        <p className="no-todos">No todos found. Create one to get started!</p>
      ) : (
        <div className="todo-groups">
          {Object.entries(groups).map(([categoryId, categoryTodos]) => {
            const category = categories.find((c) => c.id === categoryId);
            return (
              <div key={categoryId} className="todo-group">
                <h3 className="group-title">
                  {category ? (
                    <>
                      <span
                        className="category-color"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </>
                  ) : (
                    'Unknown Category'
                  )}
                  <span className="group-count">({categoryTodos.length})</span>
                </h3>
                <div className="todo-items">
                  {categoryTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <TodoForm todo={editingTodo || undefined} onClose={handleCloseForm} />
      )}
    </div>
  );
};

