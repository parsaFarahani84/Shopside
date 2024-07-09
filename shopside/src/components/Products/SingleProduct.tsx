import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { increment } from "../counter/CounterSlice";
// ----------ICONS----------
import { CgDollar } from "react-icons/cg";
import { TiArrowBack } from "react-icons/ti";
import { SiChainlink } from "react-icons/si";
import { FaShoppingBasket } from "react-icons/fa";
// ----------DATA----------
import { useDispatch } from "react-redux";
// ----------TOSTIFY----------
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// Define the type for a single product
type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

// Define the type for the URL parameters
type ParamsType = {
  id: string;
};

function SingleProduct() {
  const [real, setReal] = useState<ProductType | null>(null);
  const data = useParams<ParamsType>();
  const dispatch = useDispatch();

  // ADD THE PRODUCT
  const increase = () => {
    if (real) {
      let objTest = { type: "ADD", payload: real };
      dispatch(objTest);
      toast.success("product added");
    }
  };

  // RENDER THE DATA
  useEffect(() => {
    if (data.id) {
      axios
        .get(`https://fakestoreapi.com/products/${data.id}`)
        .then((response) => setReal(response.data));
    }
  }, [data.id]);

  const notify = () => toast("Your product will be available soon!");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-[#aff9b2] mt-[2rem] p-[2rem] md:p-[5rem] rounded-[10px] border-y-[6px] border-solid border-y-[#45a049] w-full md:w-[100vw]">
      <div className="flex justify-center mb-4 md:mb-0">
        {real && (
          <img src={real.image} className="h-auto md:w-[60%] rounded-[1rem]" />
        )}
      </div>

      <div className="w-full md:w-[90%] py-0 px-[20px]">
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
        {real && (
          <div className="mb-[10px]">
            <h1 className="text-[1.5rem] md:text-[2.5rem] mt-0">
              {real.title}
            </h1>
            <h3 className="flex items-center mt-[1rem] text-[1.2rem] md:text-[1.5rem]">
              <span className="flex items-center text-green-700">Price:</span>
              <CgDollar />
              {real.price}
            </h3>
            <h4 className="flex items-center gap-[0.3rem] text-[1rem] md:text-[1.2rem]">
              <SiChainlink />
              Product Id: {real.id}
            </h4>
            <p className="text-[1rem] md:text-[1.4rem] py-[1rem] my-0">
              {real.description}
            </p>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-center justify-between items-center py-[1rem] mx-0 w-full rounded-[1rem]">
          <button
            className="bg-green-600 text-pink-50 w-full md:w-[120%] border-[2px] border-green-600 border-solid py-[1rem] px-[2rem] text-center gap-[0.5rem] no-underline text-[1rem] rounded-[7px] mb-[20px] md:mb-0 md:mr-[1.5rem] inline-flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600"
            onClick={() => {
              dispatch(increment());
              increase();
            }}
          >
            <FaShoppingBasket />
            Add To List
          </button>
          <Link to="/products" className="w-full">
            <button className="bg-green-600 text-pink-50 w-full mb-[5rem] md:mb-0 md:items-center md:w-[80%] border-[2px] border-green-600 border-solid py-[1rem] px-[2rem] text-center gap-[0.5rem] no-underline text-[1rem] rounded-[7px] inline-flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600">
              <TiArrowBack />
              back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
