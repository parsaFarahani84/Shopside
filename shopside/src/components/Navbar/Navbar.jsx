import React from "react";
import "./Navbar.css";
import img from "../../img/shopside.png";
import wave from "../../img/wave.svg";

function Navbar() {
  return (
    <div className="main-nav">
      <header>
        <div className="div-header">
          <div className="logo-div">
            <img src={img} />
          </div>
          <div className="tabs-div">
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About Us</a>
              </li>
              <li>
                <a>Contact US</a>
              </li>
            </ul>
          </div>
        </div>
        <img className="wave" src={wave} />
      </header>
    </div>
  );
}

export default Navbar;
