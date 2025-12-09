import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFilterStatus, setSortBy, setSortOrder } from '../../store/todosSlice';
import type { FilterStatus, SortBy, SortOrder } from '../../types';

export const TodoFilters = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.todos);

  return (
    <div className="todo-filters">
      <div className="filter-group">
        <label>Status:</label>
        <select
          value={filters.status}
          onChange={(e) => dispatch(setFilterStatus(e.target.value as FilterStatus))}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort by:</label>
        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as SortBy))}
        >
          <option value="createdAt">Creation Date</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Order:</label>
        <select
          value={filters.sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value as SortOrder))}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

