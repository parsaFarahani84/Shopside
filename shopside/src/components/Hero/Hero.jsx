import React from "react";
import Navbar from "../Navbar/Navbar";
import "../Navbar/Navbar.css";
import illu from "../../img/illu.png";
import { ImSearch } from "react-icons/im";

function Hero() {
  return (
    <div className="all">
      <Navbar />
      <div className="hero">
        <div className="h1-div">
          <h1 className="hero-h1">
            Best Online Website That You Can <ImSearch /> AnyThing
          </h1>
          <p className="hero-p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eum
            cupiditate laborum iure voluptatum corporis.
          </p>
        </div>
        <div className="img-illu">
          <img src={illu} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
