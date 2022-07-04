import React, { useState, useEffect } from "react";
// import Users from "../../Services/Users";
import "../../styles/BuySps.css";
import Offers from "../Offers";
import OptionsBar from "../OptionsBar";
import web3Utils from '../../Utils/web-utils'
import { BallTriangle } from  'react-loader-spinner'

var isLoading = true
var notRecords = false
const BuySps = () => {
  if (typeof window.ethereum !== 'undefined') {
    //console.log('MetaMask is installed!');
    if(window.ethereum.networkVersion !== '97'){ // 56 es la default para Binance
      console.log("no 97 network")
    }
  }
  else{
    alert('Necesitas instalar MetaMask');
  }
    
  // Listado tipo sell to buy typetrade=0 - para usuario final comprar
  const parseList = (response) => {
    let result = []
    let totalRows = response[0].length

    for(let i = 0; i < totalRows; i++){
      if(response[2][i] != 0) {
        result[i] = {}
        result[i]["id"] = parseInt(response[4][i])
        result[i]["typetrade"] = "Buy"
        result[i]["coin"] = "SPS"
        result[i]["city"] = "dwad"
        result[i]["country_id"] = 1
        result[i]["currency"] = "COP"
        result[i]["user_first"] = ""
        result[i]["user_second"] = ""
        result[i]["payment_method_id"] = 1
        result[i]["extra_info_payment"] = "Nequi"
        result[i]["status_trade"] = window.web3.utils.toAscii(response[3][i])
        result[i]["created_at"] = "2022-04-28T17:38:52.347Z"
        result[i]["updated_at"] = "2022-04-28T17:38:52.347Z"
        result[i]["pricetrade"] = response[2][i]/1000000000000000000
        result[i]["seller"] = response[0][i]
      }
    }
    return result
  }
  
  const [buyTrades, setBuyTrades] = useState([]);
  useEffect(() => {
    const getBuyTrades = async () => {
      const p2pContract = await new window.web3.eth.Contract(web3Utils.p2pAbi, '0x47fFb97892f263F7a37E74a0F5818A09a48296aF');
      return await p2pContract.methods
        .marketBuyOrSellOrders(5, 1)
        .call()
        .then(result => {
          console.log(result);
          isLoading = false
          if(result[0].length == 0)
            notRecords = true
          setBuyTrades(parseList(result));
        })
        .catch(err => {
          console.log(err);
        });
    };
    
    getBuyTrades();
  }, []);

  

  return (
    <>
      <OptionsBar tittleBar="Comprar Sparklife" />
      {isLoading===true?
      <div style={{left:"45%", position:"absolute"}}>
      <BallTriangle
        heigth="100"
        width="100"
        color="grey"
        ariaLabel="loading-indicator"
      /></div>:""}
      {notRecords?<h1 style={{color:"white", textAlign:"center"}}>Sin Registros</h1>:""}
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
            pricetrade={trade.pricetrade}
            seller={trade.seller}
            swBuyOrSell="0"
            buy_sell="/BuyConfirm/"
          />
        );
      })}
    </>
  );
};

export default BuySps;
