import React from "react";
import "./Home.css";
import { Header } from "../../components/header";
import { useUserContext } from "../../context/UserContext";
import { Button } from "@mui/material";

export const Home = () => {
  const { currentUser } = useUserContext();

  console.log(currentUser);
  if (!currentUser) {
    return (
      <div className="backgroundContainer">
        <Header />
        <div className="sloganContainer">
        <div className="titleContainer">
          <div className="serviceTitle">
            Lynnwood General Contractor Services
          </div>
          <div className="slogan">We let our creativity shine</div>
          <button className="estimateButton">Estimate</button>
        </div>
       
        </div>
        
      </div>
    );
  }
  return (
    <div className="backgroundContainerwithUser">
      <Header />
      <div className="descriptionContainer">
        <div className="descriptionTitleContainer">
        <div className="paragraphContainer">
        <div className="serviceTitle">The UBO Commitment</div>
          <div className="description">
            We want to ensure that every homeowner who comes to us gets exactly
            what they're looking for, whether it's an easy fix or an extensive
            renovation.When you hire UBO Construction, you get more than just a
            contractor—you get an entire team of professionals dedicated to
            ensuring that your project is finished on time, within budget, and
            with the highest quality possible.
          </div>
        </div>
          
        </div>
      </div>
    </div>
  );
};
