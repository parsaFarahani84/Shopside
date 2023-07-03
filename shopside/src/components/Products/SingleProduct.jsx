import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SinglePage.css";
import { CgDollar } from "react-icons/cg";
import { BsBack } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { SiChainlink } from "react-icons/si";
import { FaShoppingBasket } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { decrement, increment } from "../counter/CounterSlice";

function SingleProduct() {
  const [real, setReal] = useState([]);
  const data = useParams();
  const dispatch = useDispatch();
  let increase = () => {
    let objTest = { type: "ADD", payload: real };
    dispatch(objTest);

    toast.success("product added");
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${data.id}`)
      .then((i) => setReal(i.data));
  }, []);

  const notify = () => toast("You'r product will be available soon!");

  return (
    <div className="mother">
      <div className="left">
        <img src={real.image} />
      </div>
      <div className="right">
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
        <div className="text-section">
          <h1 className="t-h1">{real.title}</h1>
          <h3>
            <span>Price:</span> <CgDollar />
            {real.price}
          </h3>
          <h4>
            <SiChainlink />
            Product Id: {real.id}
          </h4>
          <p>{real.description}</p>
        </div>
        <div className="ad-re">
          <button
            onClick={() => {
              dispatch(increment());
              increase();
            }}
          >
            <FaShoppingBasket />
            Add To List
          </button>
        </div>
        <button onClick={notify}>
          <BsBack />
          Buy Now
        </button>
        <Link to="/products">
          <button>
            <TiArrowBack />
            back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleProduct;
