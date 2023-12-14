import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="Header">
      <div>
        <Link className="Menus" to="/">Home</Link>
      </div>
      <div>
        <Link className="Menus" to="/products">Products</Link>
      </div>
      <div>
        <Link className="Menus" to="/note">Note</Link>
      </div>
      <div>
        <Link className="Menus" to="/sign-in">Sign Out</Link>
      </div>
    </div>
  );
};
