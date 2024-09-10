// counterSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
  count: number;
};

type CounterState = {
  value: number;
  products: ProductType[];
};

const initialState: CounterState = {
  value: 0,
  products: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    makeitclear: (state) => {
      state.value = 0;
      state.products = [];
    },
    decreseTot: (state, action: PayloadAction<number>) => {
      state.value = state.value - action.payload + 1;
    },
    addProduct: (state, action: PayloadAction<ProductType>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    decrementProductCount: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload
      );
      state.value -= 1;
      if (existingProduct && existingProduct.count > 1) {
        existingProduct.count -= 1;
      } else {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    },
    incrementProductCount: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload
      );
      state.value += 1;
      if (existingProduct && existingProduct.count > 0) {
        existingProduct.count += 1;
      } else {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  makeitclear,
  decreseTot,
  addProduct,
  removeProduct,
  decrementProductCount,
  incrementProductCount,
} = counterSlice.actions;

export default counterSlice.reducer;
