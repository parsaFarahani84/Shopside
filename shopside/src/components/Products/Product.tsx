// Product.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { RiShoppingBag3Fill } from "react-icons/ri";
import "./loading.css";
import { useDispatch } from "react-redux";
import { increment, addProduct } from "../counter/CounterSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// Define the type for the product, including the 'count' property
type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
  count: number; // Adding 'count' property here
};

function Product() {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  // Fetch all data
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/`)
      .then((response) => {
        // Add 'count' property with initial value 1 to each product
        const productsWithCount = response.data.map(
          (product: Omit<ProductType, "count">) => ({
            ...product,
            count: 1,
          })
        );
        setData(productsWithCount);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Add product to the cart
  const increase = useCallback(
    (product: ProductType) => {
      dispatch(addProduct(product)); // Dispatch addProduct action with the selected product
      toast.success("Product added to the cart");
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col items-center justify-center p-[2rem]">
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="text-center mb-12 text-4xl text-pink-100">
        <h1 className="flex items-center justify-center">
          <RiShoppingBag3Fill />
          Products
        </h1>
      </div>
      {loading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 md:grid-cols-4">
          {data.map((product) => (
            <div
              key={product.id}
              className="max-w-sm overflow-hidden bg-white h-[25rem] flex flex-col justify-between transition-all duration-300 ease-in-out rounded-[1.5rem] hover:translate-y-[-8px]"
            >
              <div>
                <img
                  className="w-full h-48 object-cover duration-300 p-[1.5rem] transition-all ease-in-out hover:p-[0.5rem]"
                  src={product.image}
                  alt="Product Image"
                />
                <div className="font-bold text-xl mb-2 text-gray-800 p-6">
                  {product.title.length > 30
                    ? product.title.slice(0, 30)
                    : product.title}
                </div>
              </div>
              <div className="flex justify-between items-center px-[2rem] pb-[1rem]">
                <p className="text-gray-600 text-base flex items-center">
                  Price: ${product.price}
                </p>
                <button
                  className="flex items-center bg-green-600 text-pink-50 border-2 border-green-600 py-2 px-4 text-sm rounded-md hover:bg-transparent hover:text-green-600"
                  onClick={() => {
                    dispatch(increment());
                    increase(product); // Pass the product to increase function
                  }}
                >
                  click to buy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Product;
