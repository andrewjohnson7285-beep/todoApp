import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteCategory } from '../../store/categoriesSlice';
import { setFilterCategory } from '../../store/todosSlice';

export const CategoryList = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const { categoryId: selectedCategoryId } = useAppSelector((state) => state.todos.filters);

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this category? Todos in this category must be reassigned first.')) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
      } catch (error) {
        alert('Cannot delete category with existing todos');
      }
    }
  };

  const handleCategoryClick = (categoryId: string | null) => {
    dispatch(setFilterCategory(categoryId));
  };

  return (
    <div className="category-list">
      <h3>Categories</h3>
      <button
        className={`category-item ${selectedCategoryId === null ? 'active' : ''}`}
        onClick={() => handleCategoryClick(null)}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <div key={category.id} className="category-item-container">
          <button
            className={`category-item ${selectedCategoryId === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <span
              className="category-color"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </button>
          <button
            onClick={() => handleDelete(category.id)}
            className="btn-delete"
            title="Delete category"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

