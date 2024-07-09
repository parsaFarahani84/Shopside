import { configureStore, AnyAction } from "@reduxjs/toolkit";
import CounterSlice from "../counter/CounterSlice";

type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
  count: number;
};

let initialState: ProductType[] = [];

const addcardReducer = (
  state = initialState,
  action: AnyAction
): ProductType[] => {
  switch (action.type) {
    case "ADD":
      if (!state.find((item) => item.id === action.payload.id)) {
        return [
          ...state,
          {
            ...action.payload,
            count: 1,
          },
        ];
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
      return [];

    case "remover":
      const tempall = [...state];
      const newArr = tempall.filter((e) => e.id !== action.payload.id);
      return newArr;

    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    counter: CounterSlice,
    addcard: addcardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
