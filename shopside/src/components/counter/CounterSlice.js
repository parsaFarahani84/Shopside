import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    makeitclear: (state) => {
      state.value = 0;
    },
    decreseTot: (state, action) => {
      state.value = state.value - action.payload + 1;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  makeitclear,
  decreseTot,
} = counterSlice.actions;

export default counterSlice.reducer;
