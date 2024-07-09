import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-gray-900 text-white h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-lg sm:text-2xl mb-8">
          Find the best products just for you
        </p>
        <Link to="/products">
          <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
