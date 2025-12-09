import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo, CreateTodoDto, UpdateTodoDto, FilterStatus, SortBy, SortOrder } from '../types';
import { todosApi } from '../services/api';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  filters: {
    status: FilterStatus;
    categoryId: string | null;
    sortBy: SortBy;
    sortOrder: SortOrder;
  };
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    categoryId: null,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchAll',
  async (_, { getState }) => {
    const state = getState() as { todos: TodosState };
    const { status, categoryId, sortBy, sortOrder } = state.todos.filters;
    return await todosApi.getAll(
      status,
      categoryId || undefined,
      sortBy,
      sortOrder
    );
  }
);

export const createTodo = createAsyncThunk(
  'todos/create',
  async (data: CreateTodoDto) => {
    return await todosApi.create(data);
  }
);

export const updateTodo = createAsyncThunk(
  'todos/update',
  async ({ id, data }: { id: string; data: UpdateTodoDto }) => {
    return await todosApi.update(id, data);
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggle',
  async (id: string) => {
    return await todosApi.toggle(id);
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (id: string) => {
    await todosApi.delete(id);
    return id;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.filters.status = action.payload;
    },
    setFilterCategory: (state, action: PayloadAction<string | null>) => {
      state.filters.categoryId = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.filters.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.filters.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  },
});

export const { setFilterStatus, setFilterCategory, setSortBy, setSortOrder } = todosSlice.actions;
export default todosSlice.reducer;

