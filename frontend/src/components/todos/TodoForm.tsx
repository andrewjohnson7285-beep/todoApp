import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createTodo, updateTodo } from '../../store/todosSlice';
import type { Todo } from '../../types';

interface TodoFormProps {
  todo?: Todo;
  onClose: () => void;
}

export const TodoForm = ({ todo, onClose }: TodoFormProps) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [dueDate, setDueDate] = useState(
    todo?.dueDate ? todo.dueDate.slice(0, 16) : ''
  );
  const [categoryId, setCategoryId] = useState(todo?.categoryId || '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !dueDate || !categoryId) {
      alert('Please fill in all required fields');
      return;
    }

    const todoData = {
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      categoryId,
    };

    if (todo) {
      await dispatch(updateTodo({ id: todo.id, data: todoData }));
    } else {
      await dispatch(createTodo(todoData));
    }
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{todo ? 'Edit Todo' : 'New Todo'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Due Date *</label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {todo ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

