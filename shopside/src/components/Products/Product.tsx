import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

// Define the type for the product
type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
};

function Product() {
  const [data, setData] = useState<ProductType[]>([]);

  // GET ALL DATA
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-[2rem]">
      <div className="text-center mb-12 text-4xl text-orange-500">
        <h1 className="flex items-center justify-center">
          <RiShoppingBag3Fill />
          Products
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 md:grid-cols-4">
        {data &&
          data.map((i) => (
            <Link to={`/products/${i.id}`} key={i.id}>
              <div className="max-w-sm overflow-hidden bg-white h-[25rem] flex flex-col justify-between transition-all duration-300 ease-in-out rounded-[1.5rem] hover:translate-y-[-8px]">
                <div>
                  <img
                    className="w-full h-48 object-cover duration-300 p-[1.5rem] transition-all ease-in-out hover:p-[0.5rem]"
                    src={i.image}
                    alt="Product Image"
                  />
                  <div className="font-bold text-xl mb-2 text-gray-800 p-6">
                    {i.title.length > 30 ? i.title.slice(0, 30) : i.title}
                  </div>
                </div>

                <div className="flex justify-between items-center px-[2rem] pb-[1rem]">
                  <p className="text-gray-600 text-base flex items-center">
                    Price: ${i.price}
                  </p>
                  <span className="flex items-center">click to buy</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Product;
