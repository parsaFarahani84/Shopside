import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const [real, setReal] = useState([]);
  const data = useParams();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${data.id}`)
      .then((i) => setReal(i.data));
  }, []);

  return <div></div>;
}

export default SingleProduct;
