import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import "./Shop.css";
import { Link } from "react-router-dom";
import { decrement } from "../counter/CounterSlice";
import { TiTrash } from "react-icons/ti";
import { makeitclear } from "../counter/CounterSlice";

function ShopList() {
  const state = useSelector((state) => state.addcard);
  const dispatch = useDispatch();

  const remove = (i) => {
    let objRemove = { type: "REMOVE", payload: i };
    dispatch(objRemove);
  };

  let removeAll = () => {
    let objTest = { type: "ALL", payload: state };
    console.log(state);
    dispatch(objTest);
    dispatch(makeitclear());
  };

  return (
    <div>
      <div className="kiki">
        <Link to="/products">
          <MdArrowBackIos className="imoj g" />
        </Link>
        <TiTrash onClick={() => removeAll()} className="imoj g k" />
      </div>
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
              <button
                onClick={() => {
                  remove(i);
                  dispatch(decrement());
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShopList;
