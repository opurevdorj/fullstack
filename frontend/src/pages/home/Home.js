import React from "react";
import "./Home.css";
import { Header } from "../../components/header";
import { useUserContext } from "../../context/UserContext";

export const Home = () => {
const {currentUser} = useUserContext();

console.log(currentUser);

  return (
    <div>
      <Header />
      Home page
    </div>
  );
};
