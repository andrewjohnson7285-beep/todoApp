import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTodo, deleteTodo } from '../../store/todosSlice';
import type { Todo } from '../../types';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onEdit }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const category = categories.find((c) => c.id === todo.categoryId);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    if (window.confirm('Delete this todo?')) {
      dispatch(deleteTodo(todo.id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleToggle}
        />
      </div>
      
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-meta">
          {category && (
            <span className="todo-category" style={{ backgroundColor: category.color }}>
              {category.name}
            </span>
          )}
          <span className="todo-date">Due: {formatDate(todo.dueDate)}</span>
        </div>
      </div>

      <div className="todo-actions">
        <button onClick={() => onEdit(todo)} className="btn-edit">
          Edit
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

