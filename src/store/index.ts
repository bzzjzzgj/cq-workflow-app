import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import workflowReducer from "./slices/workflowSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    workflow: workflowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
