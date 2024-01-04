import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";

export const Header = () => {
  const { currentUser, signOut, userContextLoading } = useUserContext();
  const {setProducts} = useProductContext();

  const handleSignOut = () => {
    signOut();
    setProducts([]);
    alert("You have been signed out");
    
  };

  if (userContextLoading) {
    return <div>Loading ...</div>;
  }
  if (!userContextLoading && currentUser) {
    return (
      <div className="Header">
        <div>
          <Link id="homeMenu" className="Menus" to="/">
            UBO
          </Link>
        </div>
        <div>
          <Link className="Menus" to="/products">
            Products
          </Link>
        </div>
        <div>
          <Link className="Menus" to="/note">
            Note
          </Link>
        </div>
        <div className="Menus">{currentUser.user.email}</div>
        <div>
          <Link className="Menus" to="/" onClick={handleSignOut}>
            Sign Out
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="Header">
      <div>
        <Link id="homeMenu" className="Menus" to="/">
          UBO
        </Link>
      </div>
      <div>
        <Link className="Menus" to="/sign-in">
          Sign In
        </Link>
      </div>
      <div>
        <Link className="Menus" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
