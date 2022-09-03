import React from "react";
import { Link } from "react-router-dom";
import cartImg from "../assets/buy.png";

const Navbar = () => {
  return (
    <nav className="flex flex-row-reverse items-center mt-2">
      <Link to="/cart">
        <button
          className="leading-none border  w-12 h-12 border-transparent 
         text-white hover:border-2 hover:border-white lg:mr-5"
        >
          <img src={cartImg} className="w-8 h-8 ml-1" alt="cart"></img>
        </button>
      </Link>
      <Link to="/">
        <button
          className="text-xl leading-none font-bold lg:mr-10
           text-white  hover:text-black
          lg:mt-0"
        >
          Home
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
