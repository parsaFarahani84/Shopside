import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../counter/CounterSlice";

const initialState = [];

export default configureStore({
  reducer: {
    counter: CounterSlice,
    addcard(state = initialState, action) {
      switch (action.type) {
        default:
          return state;
      }
    },
  },
});
