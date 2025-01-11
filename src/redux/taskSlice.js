import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, newTask } = action.payload;
      const index = state.tasks.findIndex((task) => task._id === id);
      if (index !== -1) {
        state.tasks[index] = newTask;
      }
    },
    moveTask: (state, action) => {
      const { id, newTask } = action.payload;
      const index = state.tasks.findIndex((task) => task._id === id);
      if (index !== -1) {
        state.tasks[index] = newTask;
      }
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== id);
    },
  },
});

export const { addTask, moveTask, setTasks, deleteTask, editTask } =
  taskSlice.actions;
export default taskSlice.reducer;
