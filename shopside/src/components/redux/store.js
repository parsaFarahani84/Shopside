import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../counter/CounterSlice";

let initialState = [];

export default configureStore({
  reducer: {
    counter: CounterSlice,
    addcard(state = initialState, action) {
      switch (action.type) {
        case "ADD":
          if (!state.find((item) => item.id === action.payload.id)) {
            return (initialState = [
              ...state,
              {
                ...action.payload,
                count: 1,
              },
            ]);
          } else {
            const tempArr = [...state];
            const index = tempArr.findIndex(
              (item) => item.id === action.payload.id
            );

            if (index !== -1) {
              tempArr[index] = {
                ...tempArr[index],
                count: tempArr[index].count + 1,
              };
            }

            return tempArr;
          }

        case "REMOVE":
          const tempArr = [...state];
          if (action.payload.count > 1) {
            const index = tempArr.findIndex(
              (item) => item.id === action.payload.id
            );
            if (index !== -1) {
              tempArr[index] = {
                ...tempArr[index],
                count: tempArr[index].count - 1,
              };
            }
            return tempArr;
          } else {
            const newArr = tempArr.filter((e) => e.id !== action.payload.id);
            return newArr;
          }

        case "ALL":
          const tempAll = [];
          return tempAll;

        case "remover":
          const tempall = [...state];
          const newArr = tempall.filter((e) => e.id !== action.payload.id);
          return newArr;

        default:
          return state;
      }
    },
  },
});
