import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SinglePage.css";
import { CgDollar } from "react-icons/cg";
import { BsBack, BsPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { SiChainlink } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../counter/CounterSlice";

function SingleProduct() {
  const [real, setReal] = useState([]);
  const data = useParams();
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

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
          <button onClick={() => (count > 0 ? dispatch(decrement()) : 0)}>
            <AiFillMinusCircle />
            remove
          </button>

          <p>{count}</p>
          <button onClick={() => dispatch(increment())}>
            <BsPlusCircleFill />
            Add
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
