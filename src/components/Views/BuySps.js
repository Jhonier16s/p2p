import React, { useState, useEffect } from "react";
import Users from "../../Services/Users";
import "../../styles/BuySps.css";
import Offers from "../Offers";
import OptionsBar from "../OptionsBar";

const BuySps = () => {
  const URL = "https://sps-p2p.herokuapp.com/trades/list/buy.json";

  const [buyTrades, setBuyTrades] = useState([]);
  useEffect(() => {
    getBuyTrades();
  }, []);

  function getBuyTrades() {
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        const data = response;
        console.log(response);
        setBuyTrades(data);
      });
  }

  return (
    <>
      <OptionsBar tittleBar="Comprar Sparklife" />
      {buyTrades.map((trade, index) => {
        return (
          <Offers
            key={index}
            option="Comprar"
            typeTrade={trade.typetrade}
            coin={trade.coin}
            currency={trade.currency}
            city={trade.city}
            id={trade.id}
          />
        );
      })}
    </>
  );
};

export default BuySps;
