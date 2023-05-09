import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  tasks: [],
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setAllTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setDeleteTask: (state, action) => {
      const updatedTask=state.tasks.filter((task)=>task._id!==action.payload.task._id);
      state.tasks=updatedTask;
    },
    setUpadedTask: (state, action) => {
      const updatedTask=state.tasks.map((task)=>{
        if(task._id===action.payload.task._id){
          return action.payload.task;
        }
        return task;
      });
      state.tasks=updatedTask;
    }
  },
});

export const {setLogin, setLogout,setAllTasks,setDeleteTask,setUpadedTask} =authSlice.actions;
export default authSlice.reducer;
