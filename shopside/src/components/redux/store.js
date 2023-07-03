import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../counter/CounterSlice";

let initialState = [];

export default configureStore({
  reducer: {
    counter: CounterSlice,
    addcard(state = initialState, action) {
      switch (action.type) {
        case "ADD":
          return (initialState = [...state, action.payload]);
        default:
          return state;
      }
    },
  },
});
