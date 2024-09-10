import React, { useState, useMemo } from "react";
import {
  decrement,
  makeitclear,
  decreseTot,
  removeProduct,
  decrementProductCount,
  incrementProductCount,
} from "../counter/CounterSlice";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { PiBroomBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
  count: number;
};

function ShopList() {
  const [total, setTotal] = useState(0);
  const state = useSelector((state: RootState) => state.counter.products);
  const dispatch = useDispatch<AppDispatch>();

  const remove = (product: ProductType) => {
    dispatch(decrementProductCount(product.id));
    dispatch(decrement());
  };

  const removeAll = () => {
    dispatch(makeitclear());
  };

  const remover = (product: ProductType) => {
    dispatch(removeProduct(product.id));
    dispatch(decreseTot(product.count));
  };

  useMemo(() => {
    const totalPrice = state.reduce(
      (acc, product) => acc + product.price * product.count,
      0
    );
    setTotal(parseFloat(totalPrice.toFixed(2)));
  }, [state]);

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 text-green-600">
        <Link to="/products">
          <MdArrowBackIos className="text-3xl ml-4 hover:text-green-800" />
        </Link>
        <PiBroomBold
          onClick={removeAll}
          className="text-3xl ml-2 cursor-pointer transition-all ease-in-out duration-200 hover:text-green-800"
        />
        <p className="text-xl ml-4 cursor-pointer transition-all ease-in-out duration-200 hover:text-green-800">
          Total Price: ${total}
        </p>
      </div>

      <div className="overflow-x-auto">
        {state.length > 0 ? (
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-green-100">
                <th className="py-3 px-6 text-left text-gray-700">#</th>
                <th className="py-3 px-6 text-left text-gray-700">Title</th>
                <th className="py-3 px-6 text-center text-gray-700">
                  Quantity
                </th>
                <th className="py-3 px-6 text-center text-gray-700">Price</th>
                <th className="py-3 px-6 text-center text-gray-700">Total</th>
                <th className="py-3 px-6 text-center text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-green-50">
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{product.title}</td>
                  <td className="py-3 px-6 text-center flex items-center justify-center gap-2">
                    <button
                      className="bg-green-600 text-white border-[2px] border-green-600 py-1 px-3 rounded transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600"
                      onClick={() =>
                        dispatch(decrementProductCount(product.id))
                      }
                    >
                      <FaMinus />
                    </button>
                    X{product.count}
                    <button
                      className="bg-green-600 text-white border-[2px] border-green-600 py-1 px-3 rounded transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600"
                      onClick={() =>
                        dispatch(incrementProductCount(product.id))
                      }
                    >
                      <FaPlus />
                    </button>
                  </td>
                  <td className="py-3 px-6 text-center">${product.price}</td>
                  <td className="py-3 px-6 text-center">
                    ${(product.price * product.count).toFixed(2)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-red-600 text-white border-[2px] border-red-600 py-1 px-3 rounded transition-all duration-200 ease-in-out hover:bg-transparent hover:text-red-600"
                      onClick={() => remover(product)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No products in the cart.
          </p>
        )}
      </div>
    </div>
  );
}

export default ShopList;
