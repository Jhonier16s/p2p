import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

const HomePageCard = ({ name1, name2, img1, img2, link1, link2 }) => {
  return (
    <>
      <div className="Home-container">
        <div className="Home-Cards-container">
          <div className="Home-Card">
            <h1 className="Home-Card-text">{name1}</h1>
            <a href={link1}>
              <img className="Home-Card-img" src={img1} alt="" />
            </a>
          </div>
          <div className="Home-Card">
            <h1 className="Home-Card-text">{name2}</h1>
            <a href={link2}>
              <img className="Home-Card-img" src={img2} alt="" />
             </a> 
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageCard;
