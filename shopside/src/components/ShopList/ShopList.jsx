import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import { FaTrash, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { decrement } from "../counter/CounterSlice";
import { PiBroomBold } from "react-icons/pi";
import { makeitclear, decreseTot } from "../counter/CounterSlice";

function ShopList() {
  const state = useSelector((state) => state.addcard);
  const dispatch = useDispatch();

  const remove = (i) => {
    let objRemove = { type: "REMOVE", payload: i };
    dispatch(objRemove);
  };

  let removeAll = () => {
    let objTest = { type: "ALL", payload: state };
    dispatch(objTest);
    dispatch(makeitclear());
  };

  let remover = (i) => {
    let objtest = { type: "remover", payload: i };
    dispatch(objtest);
    dispatch(decreseTot(i.count));
  };

  return (
    <div>
      <div className="inline-flex text-green-600">
        <Link to="/products">
          <MdArrowBackIos className="text-[2.5rem] ml-[1rem] hover:text-green-800" />
        </Link>
        <PiBroomBold
          onClick={() => removeAll()}
          className="text-[2.5rem] ml-[0.4rem] cursor-pointer transition-all ease-in-out duration-200 hover:text-green-800"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-[1rem] sm:p-[2rem] md:p-[3rem]">
        {state.map((i) => {
          return (
            <div
              className="p-[1rem] sm:p-[1.5rem] md:p-[2rem] max-w-full sm:max-w-xs overflow-hidden bg-white h-auto sm:h-[25rem] flex flex-col justify-between transition-all duration-300 ease-in-out rounded-[1.5rem] hover:translate-y-[-8px]"
              key={i.id}
            >
              <img
                src={i.image}
                className="w-full h-48 object-cover cursor-pointer duration-300 transition-all ease-in-out p-[1rem] sm:p-[1.5rem] hover:p-[0.5rem]"
              />
              <div>
                <span className="flex gap-[1rem] items-center">
                  <h3 className="text-[1rem] sm:text-[1.5rem] text-green-600">
                    X{i.count}
                  </h3>
                  <p className="text-[1rem] sm:text-[1.5rem] text-green-600">
                    ${i.price}
                  </p>
                </span>
                <h3>{i.title}</h3>
              </div>
              <div className="flex justify-around mt-[0.5rem] sm:mt-[1rem]">
                <button
                  className="bg-green-600 text-pink-50 border-[2px] border-green-600 border-solid py-[0.4rem] sm:py-[0.6rem] px-[1rem] sm:px-[2rem] text-center gap-[0.5rem] no-underline text-[0.8rem] sm:text-[1rem] rounded-[7px] inline-flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600"
                  onClick={() => {
                    remove(i);
                    dispatch(decrement());
                  }}
                >
                  <FaMinus />
                </button>
                <button
                  className="bg-green-600 text-pink-50 border-[2px] border-green-600 border-solid py-[0.4rem] sm:py-[0.6rem] px-[1rem] sm:px-[2rem] text-center gap-[0.5rem] no-underline text-[0.8rem] sm:text-[1rem] rounded-[7px] inline-flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:text-green-600"
                  onClick={() => {
                    remover(i);
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
    </div>
  );
}

export default ShopList;
