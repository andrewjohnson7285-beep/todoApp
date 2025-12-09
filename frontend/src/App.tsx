import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { fetchCategories } from './store/categoriesSlice';
import { CategoryForm } from './components/categories/CategoryForm';
import { CategoryList } from './components/categories/CategoryList';
import { TodoList } from './components/todos/TodoList';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo Application</h1>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          <CategoryForm />
          <CategoryList />
        </aside>
        
        <main className="main-content">
          <TodoList />
        </main>
      </div>
    </div>
  );
}

export default App;
