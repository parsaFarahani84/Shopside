import React, { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import { RiShoppingBag3Fill } from "react-icons/ri";

function Product() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/`).then((i) => {
      setData(i.data);
    });
  }, []);

  return (
    <div className="main-nav-p">
      <div className="h1-head">
        <h1>
          <RiShoppingBag3Fill />
          Products
        </h1>
      </div>
      <div className="box">
        {data &&
          data.map((i) => (
            <div className="data-box">
              <img src={i.image} />
              <div className="text-section">
                <h3>{i.title}</h3>
                <p>${i.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Product;
