import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import "./Shop.css";
import { Link } from "react-router-dom";

function ShopList() {
  const state = useSelector((state) => state.addcard);
  const dispatch = useDispatch();
  console.log(state);

  let remove = () => {
    let objTest = { type: "REMOVE", payload: state };
    dispatch(objTest);
  };

  return (
    <div>
      <Link to="/products">
        <div className="kiki">
          <MdArrowBackIos className="imoj g" />
        </div>
      </Link>
      {state.map((i) => {
        return (
          <div className="pa" key={i.id}>
            <div className="shop">
              <img src={i.image} />
              <div className="text-section">
                <h3 className="x">X{i.count}</h3>
                <h3>{i.title}</h3>
                <p>${i.price}</p>
              </div>
              <button>
                <FaTrash onClick={() => remove()} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShopList;
