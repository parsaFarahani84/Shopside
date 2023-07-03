import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../counter/CounterSlice";
import { useState } from "react";

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
          // const tempArr = [...state];
          // const index = tempArr.findIndex(
          //   (item) => item.id === action.payload.id
          // );

          // if (index !== -1) {
          //   tempArr[index] = {
          //     ...tempArr[index],
          //     count: tempArr[index].count - 1,
          //   };
          // }
          console.log("remove dude");
        default:
          return state;
      }
    },
  },
});
