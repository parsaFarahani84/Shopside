import React, { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import illu from "../../img/illu.png";

function Product() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/`).then((i) => {
      setData(i.data);
    });
  }, []);
  //   console.log(data);
  return (
    <div className="main-nav-p">
      <div className="box">
        {data &&
          data.map((i) => (
            <div className="data-box">
              <img src={i.image} />
              <div className="text-section">
                <h3>{i.title}</h3>
                <p>{i.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Product;
