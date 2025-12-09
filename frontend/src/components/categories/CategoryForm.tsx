import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { createCategory } from '../../store/categoriesSlice';

export const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      await dispatch(createCategory({ name, color }));
      setName('');
      setColor('#3B82F6');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="btn-primary">
        New Category
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        maxLength={50}
        required
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit" className="btn-primary">Create</button>
      <button type="button" onClick={() => setIsOpen(false)} className="btn-secondary">
        Cancel
      </button>
    </form>
  );
};

