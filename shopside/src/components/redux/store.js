import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../counter/CounterSlice";

export default configureStore({
  reducer: { counter: CounterSlice },
});
