import React, { useState, useEffect } from "react";
import OptionsBar from "../OptionsBar";
import Offers from "../Offers";

const SellSps = () => {
  const URL = "https://sps-p2p.herokuapp.com/trades/list/sell.json";

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
      <OptionsBar tittleBar="Vender Sparklife" />
      {buyTrades.map((trade, index) => {
        return (
          <Offers
            key={index}
            option="Vender"
            typeTrade={trade.typetrade}
            coin={trade.coin}
            currency={trade.currency}
            city={trade.city}
            id={trade.id}
            pricetrade={trade.pricetrade}
            buy_sell="/sellConfirm/"
          />
        );
      })}
    </>
  );
};

export default SellSps;
