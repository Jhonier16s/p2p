import React from "react";
import "../styles/Offers.css";
import { Link } from "react-router-dom";

const Offers = ({ option, typeTrade, coin, currency, infoPay, city, id, pricetrade, buy_sell  }) => {
  
  

  return (
    <>
      <div className="Main-offers-container">
        <div className="Offers-container">
          <div className="Card-top">
            <h2>Tipo: {typeTrade}</h2>
            <h2>Coin: {coin}</h2>
            <h2>Divisa: {currency}</h2>
            <div className="Card-top-info">
              <h3>$ {pricetrade}</h3>
              <p>4.1% por debajo del mercado</p>
            </div>
          </div>
          <div className="Card-bottom">
            <h3>7,600 transacciones</h3>
            <h3>ID Trade: {id}</h3>
            <h3>{city}</h3>
            <h3>$1K a 25k</h3>
            <Link to={buy_sell+id}>
              <button className="Offers-button">{option}</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;
