import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import logo from "../assets/logosparlife.png"


const NavBar = () => {
  return (
    <>
      <div className="NavBar-Main-container"> 
          <ul className="NavBar-container">
             <img src={logo} width="100px" height="60px" alt="logo"/> 
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/BuySps">Comprar</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/SellSps">Vender</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/SellOffers">Oferta de Venta</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/BuyOffers">Oferta de Compra</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/History">Historial de transacciones</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => (isActive ? "active":"NavBar-item")} to="/Profile">Perfil</NavLink>
            </li>
          </ul>
      </div>
    </>
  );
};

export default NavBar;
