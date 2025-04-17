import { createSlice } from "@reduxjs/toolkit";

const loadTodosFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Failed to load todos from localStorage", err);
    return [];
  }
};

const saveTodosToStorage = (todos) => {
  try {
    const serializedState = JSON.stringify(todos);
    localStorage.setItem("todos", serializedState);
  } catch (err) {
    console.warn("Failed to save todos to localStorage", err);
  }
};

const initialState = loadTodosFromStorage();

const TodoSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {
    AddTodo: (state, action) => {
      const newTask = {
        ...action.payload,
        id: Date.now().toString(),
        completed: false,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      };
      state.push(newTask);
      saveTodosToStorage(state);
    },
    DeleteTodo: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      saveTodosToStorage(newState);
      return newState;
    },
    ToggleComplete: (state, action) => {
      const task = state.find((item) => item.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toLocaleString();
        saveTodosToStorage(state);
      }
    },
    UpdateTodo: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.updates,
          updatedAt: new Date().toLocaleString(),
        };
        saveTodosToStorage(state);
      }
    },

    ClearAllTodos: () => {
      localStorage.removeItem("todos");
      return [];
    },

    LoadTodos: (state, action) => {
      saveTodosToStorage(action.payload);
      return action.payload;
    },
  },
});

export const {
  AddTodo,
  DeleteTodo,
  ToggleComplete,
  UpdateTodo,
  ClearAllTodos,
  LoadTodos,
} = TodoSlice.actions;

export default TodoSlice.reducer;
