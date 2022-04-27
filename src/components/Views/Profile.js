import React from "react";
import "../../styles/Profile.css";
import Card from "../Card";
import Lists from "../Lists";

const Profile = () => {
  return (
    <>
      <h1 className="Profile-tittle">Perfil</h1>
      <div className="Profile-container">
        <div className="Profile-card1">
          <h1>Calification</h1>
          <Lists />
          <Lists />
          <Lists />
          <Lists />
          <h5>Most Califications</h5>
        </div>
        <div className="Profile-card2">
          <h1>Reviews</h1>
          <div className="Cards-container">
            <div className="Cards-container-top">
              <Card/>
              <Card/>
            </div>
            <div className="Cards-container-bot">
              <Card/>
              <Card/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
