import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Type for task status
type TaskStatus = 'pending' | 'complete';

// Type for a single task
export interface Task {
  name: string;
  done: TaskStatus;
  id: string;
}

// Type for the initial state
type TaskState = Task[];

// Initial state with some example tasks
const initialState: TaskState = [
  { id: '1', name: 'Task 1', done: 'pending' },
  { id: '2', name: 'Task 2', done: 'pending' },
  { id: '3', name: 'Task 3', done: 'complete' },
];

const tasksSlice = createSlice({
  name: 'tasks', // Name of the slice
  initialState, // Initial state for the slice
  reducers: {
    // Reducer to add a new task
    addTask: (state, action: PayloadAction<{ name: string }>) => {
      const newTask: Task = {
        id: Date.now().toString(), // Generate a unique ID
        name: action.payload.name,
        done: 'pending', // Default status is 'pending'
      };
      state.push(newTask); // Add the new task to the state
    },
    // Reducer to update the status of a task
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.find((t) => t.id === action.payload.id); // Find the task by ID
      if (task) {
        task.done = action.payload.status; // Update the task's status
      }
    },
  },
});

// Export actions and reducer
export const { addTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
