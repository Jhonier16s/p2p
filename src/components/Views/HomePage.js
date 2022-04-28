import React from "react";
import HomePageCard from "../HomePageCard";
import user from "../../assets/user.png";
import money from "../../assets/money-transfer.png";
import dollar from "../../assets/dollar.png";
import percent from "../../assets/percent.png";

const HomePage = () => {
  return (
    <>
      <HomePageCard img1={user} name1="Perfil" name2="Historial" img2={money} link1="/Profile" link2="/History"/>
      <HomePageCard img1={dollar} name1="Vender Sparklife" name2="Comprar Sparklife" img2={dollar} link1="/SellSps" link2="/BuySps" />
      <HomePageCard img1={percent} name1="Nueva Oferta de compra" name2="Nueva oferta de venta" img2={percent}  link1="/BuyOffers" link2="/BuyOffers" />
    </>
  );
};

export default HomePage;
